import './SendMessage.css';
import { SendIcon } from '../../utilities/Icons';
import useUser from '../../hooks/useUser';
import Swal from 'sweetalert2';
import useTheme from '../../hooks/useTheme';
import { toast } from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const SendMessage = ({ receiverId, setStatusText, socket, handleSetNewMessage }) => {
    const { isDarkTheme } = useTheme();
    const { axiosSecure } = useAxiosSecure();
    const { userId: senderId } = useUser();
    const [roomId, setRoomId] = useState('');
    
    //connect to socket.io target room
    useEffect(() => {
        let roomId;
        if(senderId){
            roomId = [senderId, receiverId].sort().join('_');
            socket.emit('joinRoom', {roomId: roomId})
            setRoomId(roomId);
        }
        return () => {
            if(roomId){
                socket.emit('leaveRoom', {roomId: roomId})
            }
        }
    }, [senderId, receiverId]) //omitting socket as dependency for now


    const handleSendMessage = async (event) => {
        event.preventDefault();
        const form = event.target;
        const text = form.text.value;
        const image = form.fileUpload.files[0];

        const newMessage = {
            senderId,
            receiverId,
            text,
            contentType: 'text',
            image: null,
            reactions: [],
            status: 'sent',
            participants: [senderId, receiverId],
            moderation: {
                isReported: false,
                reportedBy: null,
                reportedAt: null,
                reportedText: null,
            }
        }

        //if user try to send an image handle that
        if (image) {
            if (!image.type.startsWith('image') || !(image.type.includes('jpeg') || image.type.includes('png'))) {
                Swal.fire({ text: 'Only jpeg or png Image is supported for now.', confirmButtonColor: isDarkTheme && 'var(--gray-light)' });
                return;
            }
            const formData = new FormData();
            formData.append('image', image);
            newMessage.contentType = image.type;
            setStatusText('Uploading image...');

            try {
                const res = await fetch(`https://api.imgbb.com/1/upload/bistro-boss?key=${import.meta.env.VITE_imgUploadKey}`, {
                    method: 'POST',
                    body: formData
                })
                const data = await res.json();
                if (data.success) {
                    //update newMessage object upon successful image upload
                    newMessage.image = data.data.display_url;
                    newMessage.deleteImgUrl = data.data.delete_url;
                } else {
                    Swal.fire({ text: 'Some error occurred. Please try again.', confirmButtonColor: isDarkTheme && 'var(--gray-light)' });
                    setStatusText(null);
                    return;
                }
            }
            catch (error) {
                Swal.fire({ text: error.message, confirmButtonColor: isDarkTheme && 'var(--gray-light)' });
                setStatusText(null);
                return;
            }
        }

        //finally send the newMessage obj to database for insertion
        setStatusText('Sending message...');
        try {
            const res = await axiosSecure.post('/messages', newMessage);

            if (res && res.data && res.data.insertedId) {
                setStatusText('Message sent');
                // this _id is temporary, used only for updating message in offline version
                newMessage._id = uuidv4();////
                handleSetNewMessage(newMessage);
                socket.emit('sendMessage', {newMessage, roomId});
                form.reset();
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className='send_message_container'>
            <form onSubmit={handleSendMessage}>
                <div className='send_message_form'>
                    <textarea name="text" rows="1"></textarea>
                    <button
                        type='submit'
                    >
                        <div className='send_icon'><SendIcon /></div>
                        <p>Send Message</p>
                    </button>
                </div>
                <div className='file_div'>
                    <label htmlFor="fileUpload" className='file_label'>Send a photo:</label>
                    <input id='fileUpload' name='fileUpload' type="file" />
                </div>
            </form>
        </div>
    );
};

export default SendMessage;
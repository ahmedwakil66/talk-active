import './Conversation.css';
import { useParams } from "react-router-dom";
import SendMessage from '../../components/SendMessage/SendMessage';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUser from '../../hooks/useUser';
import SingleMessage from '../../components/SingleMessage/SingleMessage';
import { useEffect, useRef, useState } from 'react';


const Conversation = () => {
    const { loading } = useAuth();
    const chatContainerRef = useRef();
    const [statusText, setStatusText] = useState(null);
    const { data: user, userId, isLoading: isUserLoading } = useUser();
    const { axiosSecure } = useAxiosSecure();
    const receiverId = useParams().receiverId;

    //get _id, name, email and image of receiver
    const { data: receiver, isLoading } = useQuery({
        queryKey: ['receiver', receiverId],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/basic-info/${receiverId}`);
            return res.data;
        }
    });


    //get the conversation between the user and receiver
    const { data: messages = [], refetch } = useQuery({
        enabled: !isUserLoading,
        queryKey: [`${receiverId}`, receiverId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/messages/${userId}+${receiverId}`);
            setStatusText(null);
            return res.data;
        }
    })


    //auto scroll to the bottom of chat
    useEffect(() => {
        if (!loading && !isLoading && receiver) {
            const chatContainer = chatContainerRef.current;
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages.length])


    if (loading || isLoading) {
        return <div style={loadingStyle} className='loading-text'>Loading...</div>
    }

    if (!receiver) {
        return <div style={loadingStyle} className='loading-text'>User not found</div>
    }

    return (
        <div className='right_panel'>
            <div className='top_bar'>
                <p>Conversation with <b>{receiver.name}</b></p>
                {statusText === null || <p className='status_text'>{statusText}</p>}
            </div>

            <div className="conversation_container" ref={chatContainerRef}>
                <div className='messages' >
                    {
                        [...messages].reverse().map(message => <SingleMessage key={message._id} message={message} userId={userId} receiver={receiver} user={user}/>)
                    }
                </div>
            </div>

            <div
                className='send_container'
            >
                <SendMessage receiverId={receiverId} refetchMessage={refetch} setStatusText={setStatusText} />
            </div>
        </div>
    );
};



const loadingStyle = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.1rem',
    fontWeight: '600'
}

export default Conversation;
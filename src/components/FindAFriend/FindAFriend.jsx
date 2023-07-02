import { useRef, useState } from 'react';
import './FindAFriend.css';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Badge from '../Badge/Badge';
import useUser from '../../hooks/useUser';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

const FindAFriend = ({ title }) => {
    const { user } = useAuth();
    const { axiosSecure } = useAxiosSecure();
    const [foundUser, setFoundUser] = useState(null);
    const [errMsg, setErrMsg] = useState(null);
    const searchBtnRef = useRef();

    const handleSearch = async (event) => {
        event.preventDefault();
        setErrMsg('Searching...');
        const queryEmail = event.target.query.value;
        const res = await axiosSecure.get(`/users/find-by-email/${queryEmail}?finderEmail=${user?.email}`);
        if (res.data && !res.data.error) {
            setErrMsg('');
            setFoundUser(res.data);
        }
        else if (res.data && res.data.error) {
            setErrMsg(res.data.message);
            setFoundUser(null);
        }
        else {
            setErrMsg('Could not find the user!');
            setFoundUser(null);
        }
    }

    return (
        <div className='find_a_friend'>
            {title && <h2 className='title-sec' style={{ marginBottom: '1rem' }}>Find a New Friend</h2>}
            <form onSubmit={handleSearch} className='search_field'>
                <input type="email" name='query' className='person-name' placeholder='Enter user Email' />
                <button type='submit' ref={searchBtnRef}>Search</button>
            </form>

            {errMsg && <p style={{ textAlign: 'center', marginTop: '1rem' }}>{errMsg}</p>}

            {foundUser && <FoundUserCard foundUser={foundUser} searchBtn={searchBtnRef.current}/>}
        </div>
    );
};


const FoundUserCard = ({ foundUser, searchBtn }) => {
    const { axiosSecure } = useAxiosSecure();
    const [disable, setDisable] = useState(false);
    const { userId: senderId } = useUser();
    const receiverId = foundUser._id;

    const handleSendFriendRequest = async () => {
        setDisable(true);
        const toastId = toast.loading('Checking');
        const res = await axiosSecure.patch('/users/friend-request', {senderId, receiverId});
        if(res.data && res.data.modifiedCount > 1){
            toast.remove(toastId);
            searchBtn.click();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Friend request sent',
                showConfirmButton: false,
                timer: 1500
              })
        }
        else{
            toast.error('Some error occurred! Please try again.', {id: toastId})
        }
    }

    return (
        <div className='found_friend sub-section'>
            <img src={foundUser?.image} alt="" />
            <h4 className='person-name'>{foundUser?.name}</h4>
            {
                (foundUser?.isALreadyFriend || foundUser?.finderSentFriendRequest || foundUser?.finderReceivedFriendRequest) ||
                <button
                disabled={disable}
                    onClick={handleSendFriendRequest}
                    className='my-btn-sm'
                >
                    Send Friend Request
                </button>
            }

            {
                foundUser?.isALreadyFriend && <Badge text="You are already friends." type="success" />
            }

            {
                foundUser?.finderSentFriendRequest && <Badge text="Friend request sent" />
            }

            {
                foundUser?.finderReceivedFriendRequest && <button className='my-btn-sm'> Accept Friend Request </button>
            }
        </div>
    )
}

export default FindAFriend;
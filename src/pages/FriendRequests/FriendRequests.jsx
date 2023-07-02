import './FriendRequests.css';
import { useQuery } from '@tanstack/react-query';
import FindAFriend from '../../components/FindAFriend/FindAFriend';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUser from '../../hooks/useUser';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

const FriendRequests = () => {
    const { data: user, isLoading } = useUser();
    const { axiosSecure } = useAxiosSecure();

    const { data: friendRequestsReceived = [], refetch } = useQuery({
        enabled: !isLoading,
        queryKey: ['received-friend-requests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/friend-requests?email=${user?.email}`);
            return res.data;
        }
    })


    const handleConfirmFriend = async (requestorId) => {
        if (user._id) {
            const acceptorId = user._id;
            const toastId = toast.loading('Confirming');
            const res = await axiosSecure.patch(`/users/accept-friend-request`, { acceptorId, requestorId });
            if (res.data && res.data.modifiedCount > 0) {
                refetch();
                toast.remove(toastId);
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Request is accepted',
                    showConfirmButton: false,
                    timer: 1500
                })
            } 
            else{
                toast.error('Some error occurred! Please try again.', {id: toastId})
            }
        }
    }



    return (
        <div className="friends_page">
            <details>
                <summary className='title-sec' style={{ cursor: 'pointer', userSelect: 'none' }}>Find a New Friend</summary>
                <FindAFriend title={false} />
            </details>

            <div>
                <h2 className="title-sec">Friends Requests {'('}{friendRequestsReceived.length}{')'}</h2>
                <div className="friend_requests_container">
                    {
                        friendRequestsReceived.map(person => {
                            const { _id, name, image, email } = person;
                            return (
                                <div key={_id} className='friend_request_card'>
                                    <img src={image} alt={name} title={name} />
                                    <h4 className='person-name'>{name}</h4>
                                    <p>{email}</p>
                                    <button onClick={() => handleConfirmFriend(_id)} className='my-btn-sm'>Accept Request</button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default FriendRequests;
import FriendCardMini from "../../components/FriendCards/FriendCardMini";
import useFriends from "../../hooks/useFriends";
import './Friends.css';


const Friends = () => {
    const { data: friends } = useFriends();

    return (
        <div className="friends_page">
            <div>
                <h2 className="title-sec">All Friends {'('}{friends.length}{')'}</h2>
                <div className="friends_container">
                    {
                        friends.map(friend => <FriendCardMini key={friend._id} friend={friend} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default Friends;
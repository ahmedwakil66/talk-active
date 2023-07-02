import './FriendCards.css';
import { Link } from 'react-router-dom';
import { PageContext } from '../../providers/PageProvider';
import { useContext } from 'react';

const FriendCardMini = ({ friend }) => {
    const { _id, name, image } = friend;
    const { setHideSidePanel } = useContext(PageContext);

    return (
        <Link
            to={`/chat/${_id}`}
            className='friend_card_mini'
            onClick={() => setHideSidePanel(true)}
        >
            <img src={image} alt={name} title={name} />
            <h4 className='person-name'>{name}</h4>
        </Link>
    );
};

export default FriendCardMini;
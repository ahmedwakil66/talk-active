import './Conversations.css';
import { useContext } from "react";
import { Link } from "react-router-dom";
import { PageContext } from "../../providers/PageProvider";
import useUser from "../../hooks/useUser";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Conversations = () => {
    const { setHideSidePanel } = useContext(PageContext);
    const { axiosSecure } = useAxiosSecure();

    const { userId, isLoading: userIdLoading } = useUser();
    const { data: conversations = [], isLoading, isError, error } = useQuery({
        enabled: !userIdLoading,
        queryKey: ['conversations', userId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/messages/list/${userId}`);
            return res.data;
        }
    })


    return (
        <div>
            <h2 className='title-sec'>All Conversations</h2>

            {isLoading && <h5 className='loading-text'>Loading...</h5>}

            {isError && <p className='loading-text'>Error: {error.message}</p>}

            <ul className='conversation_link_ul'>
                {
                    conversations.map(conversation => <ConversationList key={conversation._id} conversation={conversation} setHideSidePanel={setHideSidePanel} />)
                }
            </ul>
        </div>
    );
};


const ConversationList = ({ conversation, setHideSidePanel }) => {
    const { _id, name, image } = conversation;

    return (
        <li className='conversation_link_list'>
            <Link
                onClick={() => setHideSidePanel(true)}
                className="conversation_link"
                to={`/chat/${_id}`}
            >
                <img src={image} alt={name} />
                <h4 className='person-name'>{name}</h4>
            </Link>
        </li>
    )
}

export default Conversations;
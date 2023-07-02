import './SingleMessage.css';


const SingleMessage = ({ message, user, userId, receiver }) => {
    const { senderId, text, contentType, image } = message;

    return (
        <>
            {
                userId === senderId ?
                    <div className='single_message_wrapper user' style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'flex-end'}}>
                        <div>
                            <img className='profile_image' src={user.image} alt={user.name} title={user.name} />
                        </div>
                        <div
                            className={`single_message user_text`}
                        >
                            <div>
                                {contentType === 'text' && <p>{text}</p>}

                                {
                                    contentType.startsWith('image') && <>
                                        <img className='image' src={image} alt="" />
                                        <p>{text}</p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div className='single_message_wrapper friend' style={{display: 'flex', alignItems: 'flex-start'}}>
                        <div>
                            <img className='profile_image' src={receiver.image} alt={receiver.name} title={receiver.name} />
                        </div>
                        <div
                            className={`single_message friend_text`}
                        >
                            <div>
                                {contentType === 'text' && <p>{text}</p>}

                                {
                                    contentType.startsWith('image') && <>
                                        <img className='image' src={image} alt="" />
                                        <p>{text}</p>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
            }
        </>
    )
};

export default SingleMessage;
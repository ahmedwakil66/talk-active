import './ProfilePage.css';
import useUser from "../../hooks/useUser";
import getTime from '../../utilities/getTime';

const ProfilePage = () => {
    const {data: user} = useUser();
    const {name, image, email, created} = user;
    const {month, day, year} = getTime(created);
    
    return (
        <div className="profile_page">
            <img src={image} alt={name} title={name} />
            <h4 className='person-name'>{name}</h4>
            <p>Email: {email}</p>
            <p>Joined at {day} {month} {year}</p>
        </div>
    );
};

export default ProfilePage;
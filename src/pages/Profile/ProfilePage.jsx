import './ProfilePage.css';
import useUser from "../../hooks/useUser";
import getTime from '../../utilities/getTime';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import useTheme from '../../hooks/useTheme';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ProfilePage = () => {
    const { data: user, refetch } = useUser();
    const { isDarkTheme } = useTheme();
    const { axiosSecure } = useAxiosSecure();
    const { _id, name, image, email, created } = user;
    const { month, day, year } = getTime(created);

    const handleUpdatePic = async (event) => {
        const image = event.target.files[0];

        if (image && !image.type.startsWith('image')) {
            Swal.fire({ icon: 'error', text: 'Please select an image file.', confirmButtonColor: isDarkTheme && 'var(--gray-light)' });
            event.target.value = '';
            return;
        }

        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            const toastId = toast.loading('Uploading image')
            try {
                const res = await fetch(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgUploadKey}`, {
                    method: 'POST',
                    body: formData
                })
                const data = await res.json();
                
                if (data.success) {
                    toast.loading('Updating', {id: toastId})
                    const updatedDoc = { image: data.data.display_url };
                    const res = await axiosSecure.post(`/users/update-profile?userId=${_id}`, updatedDoc);

                    if(res.data && res.data.modifiedCount > 0){
                        toast.success('Profile picture updated', {id: toastId});
                        refetch();
                    } else{
                        toast.error('Something went wrong, please try again.', {id: toastId})
                    }
                }
            }
            catch (error) {
                Swal.fire({ icon: 'error', text: error.message, confirmButtonColor: isDarkTheme && 'var(--gray-light)' });
                toast.remove(toastId);
            }
            finally{
                event.target.value = '';
            }
        }


    }

    return (
        <div className="profile_page">
            <div className='image_div'>
                <img src={image} alt={name} title={name} />
                <form onChange={handleUpdatePic} className='change_image'>
                    <label htmlFor="changeImg">Change Picture</label>
                    <input type="file" id='changeImg' name='changeImg' />
                </form>
            </div>
            <h4 className='person-name'>{name}</h4>
            <p>Email: {email}</p>
            <p>Joined at {day} {month} {year}</p>
        </div>
    );
};

export default ProfilePage;
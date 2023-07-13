import { Link, useNavigate } from "react-router-dom";
import { SignInIcon, SignOutIcon } from "../../utilities/Icons";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import { toast } from "react-hot-toast";

const SignInUpToggle = () => {
    const navigate = useNavigate();
    const { user, logOut } = useAuth();
    const { theme } = useContext(ThemeContext);

    const themeStyle = {
        color: theme.secondaryColor,
    }

    const handleLogOut = () => {
        logOut()
        .then(() => {
            toast.success('You have been logged out.');
            navigate('/sign-in');
        })
        .catch(error => {
            console.log(error);
            toast.error(error.message);
        })
    }

    return (
        <>
            {
                user ?
                    <li>
                        <button onClick={handleLogOut} className='nav-btn' style={themeStyle} title="Log out">
                            <SignOutIcon size={30} />
                        </button>
                    </li> :
                    <li>
                        <Link to='/sign-in'  style={themeStyle} title="Sign in">
                            <button className='nav-btn'><SignInIcon size={30} /></button>
                        </Link>
                    </li>
            }
        </>
    );
};

export default SignInUpToggle;
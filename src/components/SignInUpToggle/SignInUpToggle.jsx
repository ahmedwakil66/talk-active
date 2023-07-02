import { Link } from "react-router-dom";
import { SignInIcon, SignOutIcon } from "../../utilities/Icons";
import useAuth from "../../hooks/useAuth";
import { useContext } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";

const SignInUpToggle = () => {
    const { user } = useAuth();
    const { theme } = useContext(ThemeContext);

    const themeStyle = {
        color: theme.secondaryColor,
    }

    return (
        <>
            {
                user ?
                    <li>
                        <button className='nav-btn'  style={themeStyle} title="Log out">
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
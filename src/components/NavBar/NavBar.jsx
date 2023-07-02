import './NavBar.css'
import { useContext } from 'react';
import { PageContext } from '../../providers/PageProvider';
import { ChatLeftTextIcon, PeopleIcon, PersonPlusIcon, UserIcon } from '../../utilities/Icons';
import { ThemeContext } from '../../providers/ThemeProvider';
import SignInUpToggle from '../SignInUpToggle/SignInUpToggle';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

const NavBar = () => {
    const { page, setPage, setHideSidePanel } = useContext(PageContext);
    const { theme } = useContext(ThemeContext);

    const themeStyle = {
        color: theme.secondaryColor,
    }

    return (
        <>
            <ul className="nav-ul">
                <li>
                    <button className={`nav-btn ${page === 'profile' && 'active'}`} onClick={() => { setPage('profile'); setHideSidePanel(false) }} style={themeStyle} title='Profile'>
                        <UserIcon />
                    </button>
                </li>
                
                <li>
                    <button className={`nav-btn ${page === 'home' && 'active'}`} onClick={() => { setPage('home'); setHideSidePanel(false) }} style={themeStyle} title='Show chats'>
                        <ChatLeftTextIcon />
                    </button>
                </li>

                <li>
                    <button className={`nav-btn ${page === 'friends' && 'active'}`} onClick={() => { setPage('friends'); setHideSidePanel(false) }} style={themeStyle} title='Show friends'>
                        <PeopleIcon />
                    </button>
                </li>

                <li>
                    <button className={`nav-btn ${page === 'friendRequests' && 'active'}`} onClick={() => { setPage('friendRequests'); setHideSidePanel(false) }} style={themeStyle} title='Friend Requests'>
                        <PersonPlusIcon />
                    </button>
                </li>
            </ul>

            <ul className='nav-ul'>
                <ThemeToggler />
                <SignInUpToggle />
            </ul>
        </>
    );
};

export default NavBar;
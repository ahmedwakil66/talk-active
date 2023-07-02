import './layout_second.css';
import { Outlet } from 'react-router-dom';
import Conversations from '../pages/Conversations/Conversations';
import { useContext } from 'react';
import { PageContext } from '../providers/PageProvider';
import ProfilePage from '../pages/Profile/ProfilePage';
import { ThemeContext } from '../providers/ThemeProvider';
import Friends from '../pages/Friends/Friends';
import FriendRequests from '../pages/FriendRequests/FriendRequests';

const SecondLayout = () => {
    const {page, hideSidePanel} = useContext(PageContext);
    const {theme} = useContext(ThemeContext);

    const panelTheme = {
        backgroundColor: theme.bgSecondary,
        color: theme.secondaryColor
    }


    return (
        <div className="second-layout">
            <div className={`side-panel ${hideSidePanel && 'd-none-sm'}`} style={panelTheme}>
                {
                    page === 'home' ?
                    <Conversations /> :
                    page === 'friends' ?
                    <Friends /> :
                    page === 'profile' ?
                    <ProfilePage /> :
                    page === 'friendRequests' ?
                    <FriendRequests /> :
                    <h2>Welcome</h2>
                }
            </div>
            <div className='second-outlet'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default SecondLayout;
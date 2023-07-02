import './layout_first.css';
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import useTheme from '../hooks/useTheme';

const FirstLayout = () => {
    const { theme } = useTheme();

    const headerTheme = {
        backgroundColor: theme.bgPrimary,
        borderColor: theme.secondaryColor,
    }

    
    return (
        <div className="body">
            <header className="header" style={headerTheme}>
                <NavBar />
            </header>

            <div className="first-outlet">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default FirstLayout;

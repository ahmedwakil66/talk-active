import { useContext } from "react";
import { ThemeContext } from "../../providers/ThemeProvider";
import { MoonStarsIcon, SunIcon } from "../../utilities/Icons";

const ThemeToggler = () => {
    const {theme, isDarkTheme, toggleTheme} = useContext(ThemeContext);

    return (
        <div>
            {
                isDarkTheme ?
                <button onClick={toggleTheme} className="nav-btn" style={{color: theme.secondaryColor}} title="Light mode">
                    <SunIcon />
                </button>:
                <button onClick={toggleTheme} className="nav-btn" style={{color: theme.secondaryColor}} title="Dark mode">
                    <MoonStarsIcon />
                </button>
            }
        </div>
    );
};

export default ThemeToggler;
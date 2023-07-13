import { createContext, useEffect, useState } from "react";
import { lightTheme, darkTheme } from "../utilities/theme";

export const ThemeContext = new createContext(null);

const ThemeProvider = ({children}) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(previous => {
            localStorage.setItem('isTalkActiveDarkTheme', JSON.stringify({isDarkTheme: !previous}));
            return !previous
        })
    }

    // persist theme on page reload
    useEffect( () => {
        const localValue = localStorage.getItem('isTalkActiveDarkTheme');
        if(localValue){
            const localTheme = JSON.parse(localValue);
            setIsDarkTheme(localTheme.isDarkTheme);
        }
    }, [])

    //handle theme change
    useEffect(() => {
        const link = document.createElement('link');
        link.href = isDarkTheme ? '/darkTheme.css' : '/lightTheme.css';
        link.rel = 'stylesheet';
        link.type = 'text/css';

        // Remove the previous theme if exists
        const prevTheme = document.querySelector('link[data-theme]');
        if (prevTheme) {
            prevTheme.remove();
        }

        // Add the new theme
        document.head.appendChild(link);

        // Set the data-theme attribute to identify the current theme
        link.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');

    }, [isDarkTheme])


    const theme = isDarkTheme ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{theme, isDarkTheme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
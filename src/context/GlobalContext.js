import { debounce } from 'lodash';
import React, { useState, useContext, useEffect } from 'react'

export const GlobalContext = React.createContext();

export const GlobalStateProvider = props => {

    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('isDarkmode')==='true'?(true):(false)
    )

    const [screeenType, setScreenType] = useState('large')

    const settingTheme = () =>{
        setIsDarkMode(!isDarkMode)
        localStorage.setItem('isDarkmode', !isDarkMode)
    }

    const settingScreenType = () =>{
        if(window.innerWidth<=767){
            setScreenType(0) //Mobile
        }else if(window.innerWidth > 767 && window.innerWidth<=1023){
            setScreenType(1) //Tablet
        }else if(window.innerWidth > 1023 && window.innerWidth<=1279){
            setScreenType(2) //Desktop
        }else if(window.innerWidth > 1279){
            setScreenType(3) //Desktop Big
        }
    }

    useEffect(() => {
        window.addEventListener('resize', settingScreenType);
        settingScreenType();

        return () => window.removeEventListener('resize', settingScreenType);
    }, []);

    return (
        <GlobalContext.Provider value={{
            isDarkMode,
            setIsDarkMode,
            settingTheme,

            screeenType, 
            setScreenType,
            settingScreenType
        }}>
            <div className={isDarkMode?('app-global-dark'):('app-global')}>
                {props.children}
            </div>
        </GlobalContext.Provider>
    )
}
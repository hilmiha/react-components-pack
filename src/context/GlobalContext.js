import React, { useState, useContext, useEffect } from 'react'

export const GlobalContext = React.createContext();

export const GlobalStateProvider = props => {

    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('isDarkmode')==='true'?(true):(false)
    )

    const settingTheme = () =>{
        setIsDarkMode(!isDarkMode)
        localStorage.setItem('isDarkmode', !isDarkMode)
    }
    return (
        <GlobalContext.Provider value={{
            isDarkMode,
            setIsDarkMode,
            settingTheme
        }}>
            <div className={isDarkMode?('app-global-dark'):('app-global')}>
                {props.children}
            </div>
        </GlobalContext.Provider>
    )
}
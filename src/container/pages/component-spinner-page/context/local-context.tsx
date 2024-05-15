import React, { useState } from 'react'

export type LocalContextType = {
    tabSelected:string,
    setTabSelected:React.Dispatch<React.SetStateAction<string>>
}
export const LocalContext = React.createContext<LocalContextType | null>(null);

const LocalContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [tabSelected, setTabSelected] = useState('')

    return (
        <LocalContext.Provider value={{ 
            tabSelected,
            setTabSelected
        }}>
            {children}
        </LocalContext.Provider>
    );
}

export default LocalContextProvider;

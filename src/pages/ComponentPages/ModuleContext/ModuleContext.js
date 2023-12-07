import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import sidebarMenuList from '../data/sidebarMenuList.json'

export const ModuleContext = React.createContext();

export const ModuleStateProvider = props => {

    const navigate = useNavigate()
    const [isShowMenuDrawer, setShowMenuDarwer] = useState(false)
    const [sideMenu, setSideMenu] = useState(sidebarMenuList)

    const onClickSideMenuItem = (menuItem) =>{
        const menuKey = menuItem.key?(menuItem.key):(menuItem)

        let jsonString = JSON.stringify(sideMenu).replace('"isActive":true', '').replace(/\,\}/g, '}').replace(/\,\,/g,',')
        jsonString = jsonString.replace(`"key":"${menuKey}"`, `"key":"${menuKey}","isActive":true,`).replace(/\,\}/g, '}').replace(/\,\,/g,',')
        setSideMenu(JSON.parse(jsonString))
        setTimeout(()=>{
            setShowMenuDarwer(false)
        },[100])
    
        if(menuItem.goTo){
            navigate(menuItem.goTo)
        }
    }

    return (
        <ModuleContext.Provider value={{
            isShowMenuDrawer, 
            setShowMenuDarwer,
            sideMenu, 
            setSideMenu,
            onClickSideMenuItem
        }}>
            {props.children}
        </ModuleContext.Provider>
    )
}
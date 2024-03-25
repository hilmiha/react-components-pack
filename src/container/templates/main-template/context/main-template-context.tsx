import React, { useState, useEffect } from 'react'
import { Props as DropdownMenuItemType} from '../../../../components/dropdown-menu-item' 
import { Props as DropdownMenuGroupItemType } from '../../../../components/dropdown-menu-item-group'
type sidebarMenuListItemType  = DropdownMenuItemType & {
    id:string,
    to?:string
}
type sidebarMenuListType = {
    id:string
    txtLabel?:string
    menuList:sidebarMenuListItemType[]
}

export type MainTemplateContextType = {
    sidebarMenuList:sidebarMenuListType[]
    setSidebarManuList:React.Dispatch<React.SetStateAction<sidebarMenuListType[]>>
    sidebarMenuListSelected:string, 
    setSidebarMenuListSelected:React.Dispatch<React.SetStateAction<string>>
}
export const MainTemplateContext = React.createContext<MainTemplateContextType | null>(null);

const MainTemplateProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [sidebarMenuList, setSidebarManuList] = useState<sidebarMenuListType[]>([])
    const [sidebarMenuListSelected, setSidebarMenuListSelected] = useState('')

    return (
        <MainTemplateContext.Provider value={{ 
            sidebarMenuList, 
            setSidebarManuList,
            sidebarMenuListSelected, 
            setSidebarMenuListSelected
        }}>
            {children}
        </MainTemplateContext.Provider>
    );
}

export default MainTemplateProvider;

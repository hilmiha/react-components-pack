import React, { useRef, useState } from 'react'
import { Props as DropdownMenuItemType} from '../../../../components/dropdown-menu-item'
export type sidebarMenuListItemType  = DropdownMenuItemType & {
    id:string,
    menuList?: (DropdownMenuItemType & {id:string,to?:string})[]
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
    contentPageRef:React.MutableRefObject<HTMLDivElement | null>
    scrollToTop:()=>void
}
export const MainTemplateContext = React.createContext<MainTemplateContextType | null>(null);

const MainTemplateProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {

    const [sidebarMenuList, setSidebarManuList] = useState<sidebarMenuListType[]>([])
    const [sidebarMenuListSelected, setSidebarMenuListSelected] = useState('')

    const contentPageRef = useRef<null | HTMLDivElement>(null)
    const scrollToTop = () =>{
        if(contentPageRef.current){
            contentPageRef.current.scrollTo({
                top:0,
                behavior:'smooth'
            })
        }
    }

    return (
        <MainTemplateContext.Provider value={{ 
            sidebarMenuList, 
            setSidebarManuList,
            sidebarMenuListSelected, 
            setSidebarMenuListSelected,
            contentPageRef,
            scrollToTop
        }}>
            {children}
        </MainTemplateContext.Provider>
    );
}

export default MainTemplateProvider;

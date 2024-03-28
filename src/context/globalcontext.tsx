import React, { useState, useEffect } from 'react'
import { modalButtonType, modalInfoType } from '../components/modal'
import { Props as DropdownMenuItemType} from '../components/dropdown-menu-item'


type mediaSizeType = 0 | 1 | 2 | 3  // phone || lanscape-phone/tablet || lanscape-tablet/small-laptop || desktop
type sidebarMenuListItemType  = DropdownMenuItemType & {
    id:string
}
type sidebarMenuListType = {
    id:string
    txtLabel?:string
    menuList:sidebarMenuListItemType[]
}
type globalModalProps = {
    id?:string
    type?:modalInfoType,
    txtTitle?:string,
    txtContent?:string,
    buttonList?:modalButtonType[]
    isCloseClickOutside?:boolean,
    onClickButton?:(idButton:string)=>void
} | undefined
export type GlobalContextType = {
    isDarkmode: boolean
    setIsDarkmode: React.Dispatch<React.SetStateAction<boolean>>
    changeTheme:()=>void
    mediaSize: mediaSizeType
    setMediaSize: React.Dispatch<React.SetStateAction<mediaSizeType>>
    
    isShowGlobalModal: boolean
    setIsShowGlobalModal: React.Dispatch<React.SetStateAction<boolean>>
    globalModal: globalModalProps
    setGlobalModal: React.Dispatch<React.SetStateAction<globalModalProps>>
    sidebarMenuList:sidebarMenuListType[]
    setSidebarManuList:React.Dispatch<React.SetStateAction<sidebarMenuListType[]>>
}
export const GlobalContext = React.createContext<GlobalContextType | null>(null);

const GlobalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [isDarkmode, setIsDarkmode] = useState(localStorage.getItem('theme')!=='dark') 
    const [mediaSize, setMediaSize] = useState<mediaSizeType>(0)

    const changeTheme = () =>{
		if(isDarkmode){
			document.documentElement.setAttribute('data-theme', 'light')
            localStorage.setItem('theme', 'light')
			setIsDarkmode(false)
		}else{
			document.documentElement.setAttribute('data-theme', 'dark')
            localStorage.setItem('theme', 'dark')
			setIsDarkmode(true)
		}
	}

    useEffect(() => {
        changeTheme()
        
        function handleResize() {
            const { innerWidth: width } = window;
            if(width<=767){
                setMediaSize(0)
            }

            if(width>=768 && width<=1023){
                setMediaSize(1)
            }

            if(width>=1024 && width<=1279){
                setMediaSize(2)
            }

            if(width>=1280){
                setMediaSize(3)
            }
        }
        
        handleResize()
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(()=>{
        console.log('mediaSize', mediaSize)
    },[mediaSize])

    const [isShowGlobalModal, setIsShowGlobalModal] = useState(false)
    const [globalModal, setGlobalModal] = useState<globalModalProps>(undefined)

    const [sidebarMenuList, setSidebarManuList] = useState<sidebarMenuListType[]>([])

    return (
        <GlobalContext.Provider value={{ 
            isDarkmode, 
            setIsDarkmode,
            changeTheme,
            mediaSize,
            setMediaSize,

            isShowGlobalModal, 
            setIsShowGlobalModal,
            globalModal, 
            setGlobalModal,

            sidebarMenuList, 
            setSidebarManuList,
        }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;

import './styles.css'
import { useContext, useEffect } from 'react'
import { ModuleContext } from '../../ModuleContext/ModuleContext'

const MenuButtonPage = () =>{
    const {
        onClickSideMenuItem
    } = useContext(ModuleContext)

    useEffect(()=>{
        onClickSideMenuItem("menu-menu-button")
    },[])

    return(
        <>Button Page</>
    )
} 

export default MenuButtonPage
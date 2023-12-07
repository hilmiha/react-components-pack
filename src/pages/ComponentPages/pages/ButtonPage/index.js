import './styles.css'
import { useContext, useEffect } from 'react'
import { ModuleContext } from '../../ModuleContext/ModuleContext'

const ButtonPage = () =>{
    const {
        onClickSideMenuItem
    } = useContext(ModuleContext)

    useEffect(()=>{
        onClickSideMenuItem("menu-button")
    },[])

    return(
        <>Button Page</>
    )
} 

export default ButtonPage
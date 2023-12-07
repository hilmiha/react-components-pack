import './styles.css'
import { useContext, useEffect } from 'react'
import { ModuleContext } from '../../ModuleContext/ModuleContext'

const IconPage = () =>{
    const {
        onClickSideMenuItem
    } = useContext(ModuleContext)

    useEffect(()=>{
        onClickSideMenuItem("menu-icon")
    },[])

    return(
        <>Form Input Page</>
    )
} 

export default IconPage
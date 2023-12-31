import './styles.css'
import { useContext, useEffect } from 'react'
import { ModuleContext } from '../../ModuleContext/ModuleContext'

const FormInputPage = () =>{
    const {
        onClickSideMenuItem
    } = useContext(ModuleContext)

    useEffect(()=>{
        onClickSideMenuItem("menu-form-input")
    },[])

    return(
        <>Form Input Page</>
    )
} 

export default FormInputPage
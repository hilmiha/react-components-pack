import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentButtonPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('button')
    },[])
    
    return(
        <DetailTemplate 
            title="Button" 
            subTitle="A button triggers an event or action. They let users know what will happen next."
        >
            <>
                ini isi button
            </>
        </DetailTemplate>
    )
}   

export default ComponentButtonPage
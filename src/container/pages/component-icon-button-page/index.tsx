import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentIconButtonPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('icon-button')
    },[])
    return(
        <DetailTemplate 
            title="Icon Button" 
            subTitle="An icon-only button lets people take a common and recognizable action where space is limited."
        >
            <>
                ini isi Icon Button
            </>
        </DetailTemplate>
    )
}   

export default ComponentIconButtonPage
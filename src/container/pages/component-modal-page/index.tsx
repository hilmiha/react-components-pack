import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentModalPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('modal')
    },[])
    
    return(
        <DetailTemplate 
            title="Modal" 
            subTitle="A modal displays content that requires user interaction, in a layer above the page."
        >
            <>
                ini isi modal
            </>
        </DetailTemplate>
    )
}   

export default ComponentModalPage
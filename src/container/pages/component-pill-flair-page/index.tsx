import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentPillFlairPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('pill-flair')
    },[])
    
    return(
        <DetailTemplate 
            title="Pill and Flair" 
            subTitle="A labels UI objects for quick recognition."
        >
            <>
                ini isi pill and flair
            </>
        </DetailTemplate>
    )
}   

export default ComponentPillFlairPage
import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentImagePage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('image')
    },[])

    return(
        <DetailTemplate 
            title="Image" 
            subTitle="An image that changes in light or dark themes."
        >
            <>
                ini isi Image
            </>
        </DetailTemplate>
    )
}   

export default ComponentImagePage
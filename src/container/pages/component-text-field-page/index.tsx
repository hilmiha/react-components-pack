import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentTextFieldPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('text-field')
    },[])
    return(
        <DetailTemplate 
            title="Text Field" 
            subTitle="A form allows users to input text information."
        >
            <>
                ini isi Text Field
            </>
        </DetailTemplate>
    )
}   

export default ComponentTextFieldPage
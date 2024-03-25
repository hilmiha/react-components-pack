import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentFormFieldPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('form-field')
    },[])
    return(
        <DetailTemplate 
            title="Form Field" 
            subTitle="A form allows users to input information."
        >
            <>
                ini isi form field
            </>
        </DetailTemplate>
    )
}   

export default ComponentFormFieldPage
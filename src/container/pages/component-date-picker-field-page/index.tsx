import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentDatePickerFieldPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('date-picker-field')
    },[])
    return(
        <DetailTemplate 
            title="Date Picker Field" 
            subTitle="A form allows users to input date information."
        >
            <>
                ini isi form Date Picker Field
            </>
        </DetailTemplate>
    )
}   

export default ComponentDatePickerFieldPage
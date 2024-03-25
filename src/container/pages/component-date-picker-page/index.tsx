import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentDatePickerPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('date-picker')
    },[])
    
    return(
        <DetailTemplate 
            title="Date Picker" 
            subTitle="A date picker allows the user to select an associated date."
        >
            <>
                ini isi date-picker
            </>
        </DetailTemplate>
    )
}   

export default ComponentDatePickerPage
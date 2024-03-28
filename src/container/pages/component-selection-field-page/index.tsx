import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentSelectionFieldPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('selection-field')
    },[])
    return(
        <DetailTemplate 
            title="Selection Field" 
            subTitle="A form allows users to input selections of value list."
        >
            <>
                ini isi form Selection Field
            </>
        </DetailTemplate>
    )
}   

export default ComponentSelectionFieldPage
import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentTablePage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('table')
    },[])
    
    return(
        <DetailTemplate 
            title="Table" 
            subTitle="A table displays rows of data with built-in pagination and sorting functionality."
        >
            <>
                ini isi table
            </>
        </DetailTemplate>
    )
}   

export default ComponentTablePage
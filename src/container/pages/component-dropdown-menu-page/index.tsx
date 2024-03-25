import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentDropdownMenuPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('dropdown-menu')
    },[])

    return(
        <DetailTemplate 
            title="Dropdown Menu" 
            subTitle="A dropdown menu displays a list of actions or options to a user."
        >
            <>
                ini isi dropdown menu
            </>
        </DetailTemplate>
    )
}   

export default ComponentDropdownMenuPage
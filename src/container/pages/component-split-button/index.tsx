import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentSplitButtonPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('split-button')
    },[])
    return(
        <DetailTemplate 
            title="Split Button" 
            subTitle="A split button lets people perform an action or choose from a small group of similar actions."
        >
            <>
                ini isi Split Button
            </>
        </DetailTemplate>
    )
}   

export default ComponentSplitButtonPage
import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";

const ComponentDrawerPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('drawer')
    },[])

    return(
        <DetailTemplate 
            title="Drawer" 
            subTitle="A drawer is a panel that slides in from the left side of the screen."
        >
            <>
                ini isi drawer
            </>
        </DetailTemplate>
    )
}   

export default ComponentDrawerPage
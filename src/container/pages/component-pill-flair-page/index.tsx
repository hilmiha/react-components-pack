import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import PillFlair from "../../../components/pill-flair";
import { PiCheck, PiInfo, PiStarFourFill, PiWarning, PiXCircle } from "react-icons/pi";

const ComponentPillFlairPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('pill-flair')
    },[])
    
    return(
        <DetailTemplate 
            title="Pill and Flair" 
            subTitle="A labels UI objects for quick recognition."
        >
            <div className="component-section">
                <span className="font-title">Pill and Its Colors</span>
                <div className="preview-box">
                    <PillFlair txtLabel="Info" type="pill" color="info" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Success" type="pill" color="success" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Warning" type="pill" color="warning" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Danger" type="pill" color="danger" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Default" type="pill" IconBefore={<PiStarFourFill/>}/>
                </div>
            </div>


            <div className="component-section">
                <span className="font-title">Status and Its Colors</span>
                <div className="preview-box">
                    <PillFlair txtLabel="Info" type="status" color="info"/>
                    <PillFlair txtLabel="Success" type="status" color="success"/>
                    <PillFlair txtLabel="Warning" type="status" color="warning"/>
                    <PillFlair txtLabel="Danger" type="status" color="danger"/>
                    <PillFlair txtLabel="Default" type="status"/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Text and Its Colors</span>
                <div className="preview-box">
                    <PillFlair txtLabel="Info" type="text" color="info" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Success" type="text" color="success" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Warning" type="text" color="warning" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Danger" type="text" color="danger" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Default" type="text" IconBefore={<PiStarFourFill/>}/>
                </div>
            </div>
        </DetailTemplate>
    )
}   

export default ComponentPillFlairPage
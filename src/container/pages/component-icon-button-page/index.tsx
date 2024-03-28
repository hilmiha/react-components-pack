import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import { PiStarFourFill } from "react-icons/pi";
import IconButton from "../../../components/icon-button";

const ComponentIconButtonPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('icon-button')
    },[])
    return(
        <DetailTemplate 
            title="Icon Button" 
            subTitle="An icon-only button lets people take a common and recognizable action where space is limited."
        >
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <IconButton Icon={PiStarFourFill}/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Color Accent</span>
                <div className="preview-box">
                    <IconButton Icon={PiStarFourFill}/>
                    <IconButton Icon={PiStarFourFill} appearance="primary"/>
                    <IconButton Icon={PiStarFourFill} appearance="warning"/>
                    <IconButton Icon={PiStarFourFill} appearance="danger"/>
                    <IconButton Icon={PiStarFourFill} appearance="subtle"/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Selected</span>
                <div className="preview-box">
                    <IconButton Icon={PiStarFourFill} isSelected/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Spacing</span>
                <div className="preview-box">
                    <IconButton Icon={PiStarFourFill} spacing="default"/>
                    <IconButton Icon={PiStarFourFill} spacing="compact" />
                </div>
            </div>
        </DetailTemplate>
    )
}   

export default ComponentIconButtonPage
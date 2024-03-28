import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import Button from '../../../components/button';
import { PiStarFourFill } from 'react-icons/pi';

const ComponentButtonPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('button')
    },[])
    
    return(
        <DetailTemplate 
            title="Button" 
            subTitle="A button triggers an event or action. They let users know what will happen next."
        >
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <Button txtLabel='Default Button'/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Color Accent</span>
                <div className="preview-box">
                    <Button txtLabel='Default Button'/>
                    <Button txtLabel='Primary Button' appearance='primary'/>
                    <Button txtLabel='Warning Button' appearance='warning'/>
                    <Button txtLabel='Danger Button' appearance='danger'/>
                    <Button txtLabel='Subtle Button' appearance='subtle'/>
                    <Button txtLabel='Link Button' appearance='link'/>
                    <Button txtLabel='Subtle-Link Button' appearance='subtle-link'/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Selected</span>
                <div className="preview-box">
                    <Button txtLabel='Default Button' isSelected/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Spacing</span>
                <div className="preview-box">
                    <Button txtLabel='Default' spacing='default'/>
                    <Button txtLabel='Compact' spacing='compact'/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Fill Container Width</span>
                <div className="preview-box">
                    <Button txtLabel='Default' spacing='default' isFillContainer/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Icon Before</span>
                <div className="preview-box">
                    <Button txtLabel='Default' spacing='default' IconBefore={PiStarFourFill}/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Icon After</span>
                <div className="preview-box">
                    <Button txtLabel='Default' spacing='default' IconAfter={PiStarFourFill}/>
                </div>
            </div>
        </DetailTemplate>
    )
}   

export default ComponentButtonPage
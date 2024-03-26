import { useContext, useEffect, useState } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import Drawer from "../../../components/drawer";
import Button from "../../../components/button";

const ComponentDrawerPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('drawer')
    },[])

    const [isDrawerOpenRight, setiIsDrawerOpenRight] = useState(false)
    const [isDrawerOpenLeft, setiIsDrawerOpenLeft] = useState(false)

    return(
        <DetailTemplate 
            title="Drawer" 
            subTitle="A drawer is a panel that slides in from the left side of the screen."
        >
            <div className="component-section">
                <span className="font-title">Drawer Right</span>
                <div className="preview-box">
                    <Button txtLabel='Open Drawer Right' onClick={()=>{setiIsDrawerOpenRight(!isDrawerOpenRight)}}/>
                    <Drawer
                        id="right-1"
                        isOpen={isDrawerOpenRight}
                        setIsOpen={setiIsDrawerOpenRight}
                        drawerSide="right"
                        txtTitle="Right Drawer Title"
                        txtSubtitle="Subtitle for right drawer"
                        contentPage={
                            <div style={{color:'hsl(var(--color-neutral-1100))'}}> 
                                {"<-- Drawer Content Here -->"}
                            </div>
                        }
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Drawer Left</span>
                <div className="preview-box">
                    <Button txtLabel='Open Drawer Left' onClick={()=>{setiIsDrawerOpenLeft(!isDrawerOpenLeft)}}/>
                    <Drawer
                        id="left-1"
                        isOpen={isDrawerOpenLeft}
                        setIsOpen={setiIsDrawerOpenLeft}
                        drawerSide="left"
                        txtTitle="Left Drawer Title"
                        txtSubtitle="Subtitle for left drawer"
                        contentPage={
                            <div style={{color:'hsl(var(--color-neutral-1100))'}}> 
                                {"<-- Drawer Content Here -->"}
                            </div>
                        }
                    />
                </div>
            </div>
        </DetailTemplate>
    )
}   

export default ComponentDrawerPage
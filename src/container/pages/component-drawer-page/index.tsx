import { useContext, useEffect, useState } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import Drawer, { drawerSizeType } from "../../../components/drawer";
import Button from "../../../components/button";


type Props = {
    setDrawerSize:React.Dispatch<React.SetStateAction<drawerSizeType>>
}
const DrawerContent = ({
    setDrawerSize
}:Props) =>{
    useEffect(()=>{
        setDrawerSize('small')
    },[])
    return(
        <>
            <div style={{color:'hsl(var(--color-neutral-1100))', display:'flex', gap:'var(--size-8)', marginBottom:'20px'}}> 
                <Button txtLabel="Small" onClick={()=>{setDrawerSize('small')}}/>
                <Button txtLabel="Medium"  onClick={()=>{setDrawerSize('medium')}}/>
                <Button txtLabel="Full"  onClick={()=>{setDrawerSize('full')}}/>
            </div>
            <p className="font-text">{"<-- Drawer Content Here -->"}</p>
        </>
        
    )
}

const ComponentDrawerPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('drawer')
    },[])

    const [isDrawerOpenRight, setiIsDrawerOpenRight] = useState(false)
    const [isDrawerOpenLeft, setiIsDrawerOpenLeft] = useState(false)
    const [isDrawerOpenSize, setiIsDrawerOpenSize] = useState(false)


    const [drawerSize, setDrawerSize] = useState<drawerSizeType>('small')

    return(
        <DetailTemplate 
            title="Drawer" 
            subTitle="A drawer is a panel that slides in from the left side of the screen."
        >
            <div className="component-section">
                <span className="font-title">Sizes</span>
                <div className="preview-box">
                    <Button txtLabel='Open Drawer' onClick={()=>{setiIsDrawerOpenSize(!isDrawerOpenSize)}}/>
                    <Drawer
                        id="right-1"
                        isOpen={isDrawerOpenSize}
                        setIsOpen={setiIsDrawerOpenSize}
                        drawerSide="right"
                        drawerSize={drawerSize}
                        txtTitle="Right Drawer Title"
                        txtSubtitle="Subtitle for right drawer"
                        contentPage={
                            <DrawerContent setDrawerSize={setDrawerSize}/>
                        }
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Drawer Drirection</span>
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
        </DetailTemplate>
    )
}   

export default ComponentDrawerPage
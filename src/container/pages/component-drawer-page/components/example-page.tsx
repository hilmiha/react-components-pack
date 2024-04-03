import { useContext, useEffect, useState } from "react"
import Button from "../../../../components/button"
import { PiStarFourFill } from "react-icons/pi"
import { LocalContext, LocalContextType } from "../context/local-context";
import Drawer, { drawerSizeType } from "../../../../components/drawer";
import DrawerContent from "./drawer-content";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [isDrawerOpenRight, setiIsDrawerOpenRight] = useState(false)
    const [isDrawerOpenLeft, setiIsDrawerOpenLeft] = useState(false)
    const [isDrawerOpenSize, setiIsDrawerOpenSize] = useState(false)

    const [drawerSize, setDrawerSize] = useState<drawerSizeType>('small')

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    
    return(
        <div className="tab-content">
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
        </div>
    )
}
export default ExamplePage
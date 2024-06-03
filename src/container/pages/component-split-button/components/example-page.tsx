import { useContext, useEffect, useMemo } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import SplitButton from "../../../../components/split-button";
import { listOfMenu } from "../data/menuList";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const menuList = useMemo(()=>(listOfMenu),[])

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <SplitButton 
                        txtLabel="Main Button"
                        menuList={menuList}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <SplitButton 
                        txtLabel="Main Button"
                        isDisabled
                        menuList={menuList}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <SplitButton 
                        txtLabel="Main Button"
                        isLoading
                        menuList={menuList}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Appearance</span>
                <div className="preview-box">
                    <SplitButton 
                        txtLabel="Default Button"
                        appearance="default"
                        menuList={menuList}
                        
                    />
                    <SplitButton 
                        txtLabel="Primary Button" 
                        appearance="primary"
                        menuList={menuList}
                    />
                    <SplitButton 
                        txtLabel="Warning Button" 
                        appearance="warning"
                        menuList={menuList}
                    />
                    <SplitButton 
                        txtLabel="Danger Button" 
                        appearance="danger"
                        menuList={menuList}
                    />
                    <SplitButton 
                        txtLabel="Subtle Button" 
                        appearance="subtle"
                        menuList={menuList}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Spacing</span>
                <div className="preview-box">
                    <SplitButton 
                        txtLabel="Default Button" 
                        menuList={menuList}
                        spacing="default"
                    />
                    <SplitButton 
                        txtLabel="Compact Button" 
                        menuList={menuList}
                        spacing="compact"
                    />
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
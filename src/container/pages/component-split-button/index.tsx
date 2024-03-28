import { useContext, useEffect, useMemo } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import SplitButton from "../../../components/split-button";

const ComponentSplitButtonPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const menuList = useMemo(()=>([
        {
            id:'menu1',
            menu:[
                {
                    id:"menu1-1",
                    txtLabel:"Sub Menu 1-1"
                },
                {
                    id:"menu1-2",
                    txtLabel:"Sub Menu 1-2"
                }
            ]
        },
        {
            id:'menu2',
            menu:[
                {
                    id:"menu2-1",
                    txtLabel:"Sub Menu 2-1"
                }
            ]
        },
    ]),[])

    useEffect(()=>{
        setSidebarMenuListSelected('split-button')
    },[])
    return(
        <DetailTemplate 
            title="Split Button" 
            subTitle="A split button lets people perform an action or choose from a small group of similar actions."
        >
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
        </DetailTemplate>
    )
}   

export default ComponentSplitButtonPage
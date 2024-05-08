import { useContext, useEffect, useState } from "react"
import Button from "../../../../components/button"
import { PiMoon, PiStarFourFill, PiSun } from "react-icons/pi"
import { LocalContext, LocalContextType } from "../context/local-context";
import Image from "../../../../components/image";
import IconButton from "../../../../components/icon-button";
import { GlobalContext, GlobalContextType } from "../../../../context/globalcontext";
import Tabs from "../../../../components/tabs";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [selectedTab, setSelectedTab] = useState('tabs-satu')
    const [selectedTabDis, setSelectedTabDis] = useState('tabs-satu')


    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <Tabs
                        selected={selectedTab}
                        setSelected={setSelectedTab}
                        tabList={[
                            {
                                id:"tabs-satu",
                                txtLabel:'Tab Satu',
                            },
                            {
                                id:"tabs-dua",
                                txtLabel:'Tab Dua'
                            },
                            {
                                id:"tabs-tiga",
                                txtLabel:'Tab Tiga'
                            },
                            {
                                id:"tabs-empat",
                                txtLabel:'Tab empat'
                            }
                        ]}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Disabled Item</span>
                <div className="preview-box">
                    <Tabs
                        selected={selectedTabDis}
                        setSelected={setSelectedTabDis}
                        tabList={[
                            {
                                id:"tabs-satu",
                                txtLabel:'Tab Satu',
                            },
                            {
                                id:"tabs-dua",
                                txtLabel:'Tab Dua'                            
                            },
                            {
                                id:"tabs-tiga",
                                txtLabel:'Tab Tiga',
                                isDisabled:true
                            },
                            {
                                id:"tabs-empat",
                                txtLabel:'Tab empat',
                                isDisabled:true
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
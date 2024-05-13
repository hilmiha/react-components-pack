import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import Switch from "../../../../components/switch";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [isSwitchSelected, setIsSwitchSelected] = useState(true)
    const [isSwitchSelectedT, setIsSwitchSelectedT] = useState(true)

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <Switch
                        isSelected={isSwitchSelected}
                        txtLabel="Option"
                        txtSubLabel="Option sub label."
                        onClick={()=>{setIsSwitchSelected(!isSwitchSelected)}}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Disabled</span>
                <div className="preview-box">
                    <Switch
                        isSelected={false}
                        txtLabel="Option Disabled"
                        txtSubLabel="Option sub label."
                        isDisabled={true}
                    />
                    <Switch
                        isSelected={true}
                        txtLabel="Option Disabled"
                        txtSubLabel="Option sub label."
                        isDisabled={true}
                    />
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import Checkbox from "../../../../components/checkbox";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [isCheckboxSelected, setIsCheckboxSelected] = useState(true)
    const [isCheckboxSelectedT, setIsCheckboxSelectedT] = useState(true)

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <Checkbox
                        isSelected={isCheckboxSelected}
                        txtLabel="Option"
                        txtSubLabel="Option sub label."
                        onClick={()=>{setIsCheckboxSelected(!isCheckboxSelected)}}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Interminate</span>
                <div className="preview-box">
                    <Checkbox
                        isSelected={isCheckboxSelectedT}
                        isIndeterminate={true}
                        txtLabel="Option"
                        txtSubLabel="Option sub label."
                        onClick={()=>{setIsCheckboxSelectedT(!isCheckboxSelectedT)}}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Disabled</span>
                <div className="preview-box">
                    <Checkbox
                        isSelected={false}
                        txtLabel="Option Disabled"
                        txtSubLabel="Option sub label."
                        isDisabled={true}
                    />
                    <Checkbox
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
import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import Radio from "../../../../components/radio";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [isRadioSelected, setIsRadioSelected] = useState(true)
    const [isRadioSelectedT, setIsRadioSelectedT] = useState(true)

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <Radio
                        isSelected={isRadioSelected}
                        txtLabel="Option"
                        txtSubLabel="Option sub label."
                        onClick={()=>{setIsRadioSelected(!isRadioSelected)}}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Disabled</span>
                <div className="preview-box">
                    <Radio
                        isSelected={false}
                        txtLabel="Option Disabled"
                        txtSubLabel="Option sub label."
                        isDisabled={true}
                    />
                    <Radio
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
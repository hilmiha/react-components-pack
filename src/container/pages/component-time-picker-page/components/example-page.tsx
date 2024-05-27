import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import TimePicker, { timePickerValueType } from "../../../../components/time-picker";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [twentyFourHValue, setTwentyFourHValue] = useState<timePickerValueType>({
        hour:undefined,
        minute:undefined,
        second:undefined
    })
    const [ampmValue, setAmpmValue] = useState<timePickerValueType>({
        hour:undefined,
        minute:undefined,
        second:undefined
    })

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <TimePicker
                        type='24hr'
                        value={twentyFourHValue}
                        onChange={setTwentyFourHValue}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">AM/PM Variant</span>
                <div className="preview-box">
                    <TimePicker
                        type='ampm'
                        value={ampmValue}
                        onChange={setAmpmValue}
                    />
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
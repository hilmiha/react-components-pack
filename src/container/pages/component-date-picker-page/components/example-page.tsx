import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import DatePicker, { datePickerValueType } from "../../../../components/date-picker";
import { sub } from "date-fns";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [selected, setSelected] = useState<datePickerValueType>(new Date())
    const [selectedMultiple, setSelectedMultiple] = useState<datePickerValueType>([
        new Date(), 
        sub(new Date(), {days:17}), 
        sub(new Date(), {days:13}), 
        sub(new Date(), {days:8}), 
        sub(new Date(), {days:5}),
        sub(new Date(), {days:3}) 
    ])
    const [selectedRange, setSelectedRange] = useState<datePickerValueType>({from:sub(new Date(), {days:5}), to:new Date()})

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Single Select</span>
                <div className="preview-box">
                    <DatePicker
                        type="single"
                        value={selected}
                        onchange={(newValue)=>{setSelected(newValue)}}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Multiple Select</span>
                <div className="preview-box">
                    <DatePicker
                        type="multiple"
                        value={selectedMultiple}
                        onchange={(newValue)=>{setSelectedMultiple(newValue)}}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Range Select</span>
                <div className="preview-box">
                    <DatePicker
                        type="range"
                        value={selectedRange}
                        onchange={(newValue)=>{setSelectedRange(newValue)}}
                    />
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
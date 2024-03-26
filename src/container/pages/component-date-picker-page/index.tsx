import { useContext, useEffect, useState } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import DatePicker, { datePickerValueType } from "../../../components/date-picker";
import { DateRange } from "react-day-picker";
import { add, sub } from "date-fns";

const ComponentDatePickerPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('date-picker')
    },[])

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
    
    return(
        <DetailTemplate 
            title="Date Picker" 
            subTitle="A date picker allows the user to select an associated date."
        >
            <div className="component-section">
                <span className="font-title">Single Select</span>
                <div className="preview-box">
                    <DatePicker
                        type="single"
                        value={selected}
                        onchange={setSelected}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Multiple Select</span>
                <div className="preview-box">
                    <DatePicker
                        type="multiple"
                        value={selectedMultiple}
                        onchange={setSelectedMultiple}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Range Select</span>
                <div className="preview-box">
                    <DatePicker
                        type="range"
                        value={selectedRange}
                        onchange={setSelectedRange}
                    />
                </div>
            </div>
        </DetailTemplate>
    )
}   

export default ComponentDatePickerPage
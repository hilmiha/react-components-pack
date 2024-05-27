import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import { generateErrorState } from "../../../../helper";
import useFormHook from "../../../../hook/useFormHook";
import TimePickerField from "../../../../components/time-picker-field";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [form, setForm] = useState({
        time:{hour:undefined, minute:undefined, second:undefined},
        timeAmpm:{hour:undefined, minute:undefined, second:undefined},
        timeDisabled:{hour:12, minute:45, second:32}
    })

    const [formError, setFormError] = useState(generateErrorState(form))

    const {
        onChange,
        onValidate
    } = useFormHook({
        form,
        setForm,
        formError,
        setFormError
    })

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <TimePickerField
                        type='24hr'
                        txtLabel='Form Time'
                        value={form['time']}
                        onChange={(newValue)=>{onChange('time', newValue)}}
                        onValidate={(errorResult)=>{onValidate('time',errorResult)}}
                        error={formError['time']}
                        txtPlaceholder='Select Time'
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">AM/PM Variant</span>
                <div className="preview-box">
                    <TimePickerField
                        type='ampm'
                        txtLabel='Form Time'
                        value={form['timeAmpm']}
                        onChange={(newValue)=>{onChange('timeAmpm', newValue)}}
                        onValidate={(errorResult)=>{onValidate('timeAmpm',errorResult)}}
                        error={formError['timeAmpm']}
                        txtPlaceholder='Select Time'
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Disabled</span>
                <div className="preview-box">
                    <TimePickerField
                        type='24hr'
                        txtLabel='Form Time'
                        value={form['timeDisabled']}
                        onChange={(newValue)=>{onChange('timeDisabled', newValue)}}
                        onValidate={(errorResult)=>{onValidate('timeDisabled',errorResult)}}
                        error={formError['timeDisabled']}
                        txtPlaceholder='Select Time'
                        isDisabled
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
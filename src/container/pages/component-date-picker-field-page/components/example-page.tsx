import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import DatePicker, { datePickerValueType } from "../../../../components/date-picker";
import { sub } from "date-fns";
import { errorType } from "../../../../components/text-field";
import { generateErrorState } from "../../../../helper";
import useFormHook from "../../../../hook/useForm";
import DatePickerField from "../../../../components/date-picker-field";

export type formType = {
    selection:datePickerValueType
    multiSelection:datePickerValueType
    rangeSelection:datePickerValueType
}

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [form, setForm] = useState<formType>({
        selection:undefined,
        multiSelection:[],
        rangeSelection:undefined
    })
    const [formError, setFormError] = useState<Record<keyof formType, errorType>>(generateErrorState(form))

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
                <span className="font-title">Single Selection</span>
                <div className="preview-box">
                    <DatePickerField
                        txtLabel="Single Selection"
                        txtPlaceholder="Select date..."
                        type="single"
                        value={form['selection']}
                        error={formError['selection']}
                        onChange={(newValue)=>{onChange('selection', newValue)}}
                        onValidate={(errorResult)=>{onValidate('selection', errorResult)}}
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Multiple Selection</span>
                <div className="preview-box">
                    <DatePickerField
                        txtLabel="Multiple Selection"
                        txtPlaceholder="Select dates..."
                        type="multiple"
                        value={form['multiSelection']}
                        error={formError['multiSelection']}
                        onChange={(newValue)=>{onChange('multiSelection', newValue)}}
                        onValidate={(errorResult)=>{onValidate('multiSelection', errorResult)}}
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Range Selection</span>
                <div className="preview-box">
                    <DatePickerField
                        txtLabel="Range Selection"
                        txtPlaceholder="Select dates..."
                        type="range"
                        value={form['rangeSelection']}
                        error={formError['rangeSelection']}
                        onChange={(newValue)=>{onChange('rangeSelection', newValue)}}
                        onValidate={(errorResult)=>{onValidate('rangeSelection', errorResult)}}
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
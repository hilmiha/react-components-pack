import { useContext, useEffect, useState } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import { datePickerValueType } from "../../../components/date-picker";
import { errorType } from "../../../components/text-field";
import { generateErrorState } from "../../../helper";
import useFormHook from "../../../helper/useForm";
import DatePickerField from "../../../components/date-picker-field";

export type formType = {
    selection:datePickerValueType
    multiSelection:datePickerValueType
    rangeSelection:datePickerValueType
}

const ComponentDatePickerFieldPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const [form, setForm] = useState<formType>({
        selection:undefined,
        multiSelection:[],
        rangeSelection:{from:undefined, to:undefined}
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
        setSidebarMenuListSelected('date-picker-field')
    },[])

    useEffect(()=>{
        console.log(form)
    },[form])
    return(
        <DetailTemplate 
            title="Date Picker Field" 
            subTitle="A form allows users to input date information."
        >
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
                        config={{

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
                        config={{

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
                        config={{

                        }}
                    />
                </div>
            </div>
        </DetailTemplate>
    )
}   

export default ComponentDatePickerFieldPage
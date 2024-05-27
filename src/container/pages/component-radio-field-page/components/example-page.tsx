import { useContext, useEffect, useMemo, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import TextField, { errorType } from "../../../../components/text-field";
import { generateErrorState } from "../../../../helper";
import useFormHook from "../../../../hook/useFormHook";
import SelectionField, { selectionValueType } from "../../../../components/selection-field";
import CheckboxField, { valueCheckboxField } from "../../../../components/checkbox-field";
import { optionList } from "../data/option-list";
import RadioFiled, { valueRadioField } from "../../../../components/radio-field";

export type formType = {
    checkbox:valueRadioField
}

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [form, setForm] = useState<formType>({
        checkbox:''
    })

    const [formError, setFormError] = useState<Record<keyof formType, errorType>>(generateErrorState(form))
    const listValue = useMemo(()=>{
        return(optionList)
    },[])

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
                    <RadioFiled
                        txtLabel="Form Checkbox"
                        value={form['checkbox']}
                        error={formError['checkbox']}
                        onChange={(newValue)=>{onChange('checkbox', newValue)}}
                        onValidate={(errorResult)=>{onValidate('checkbox', errorResult)}}
                        valueList={listValue}
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Disabled</span>
                <div className="preview-box">
                    <RadioFiled
                        txtLabel="Form Checkbox"
                        value={''}
                        valueList={listValue}
                        config={{
                            isMandatory:true
                        }}
                        isDisabled
                    />
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
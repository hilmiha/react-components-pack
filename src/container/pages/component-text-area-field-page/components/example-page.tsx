import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import TextField, { errorType } from "../../../../components/text-field";
import { generateErrorState } from "../../../../helper";
import useFormHook from "../../../../hook/useFormHook";
import SelectionField, { selectionValueType } from "../../../../components/selection-field";
import TextAreaField from "../../../../components/text-area-field";

export type formType = {
    textAreaField:string
    textNoSpaceAreaField:string
    textFullNumberAreaField:string
}

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [form, setForm] = useState<formType>({
        textAreaField:'',
        textNoSpaceAreaField:'',
        textFullNumberAreaField:''
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
                <span className="font-title">Text</span>
                <div className="preview-box">
                    <TextAreaField
                        type="text"
                        txtLabel="Form Text Area Label"
                        txtPlaceholder="Form placeholder..."
                        value={form['textAreaField']}
                        error={formError['textAreaField']}
                        onChange={(newValue)=>{onChange('textAreaField', newValue)}}
                        onValidate={(errorResult)=>{onValidate('textAreaField', errorResult)}}
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">No Space</span>
                <div className="preview-box">
                    <TextAreaField
                        type="text-no-space"
                        txtLabel="Form Text Area Label"
                        txtPlaceholder="Form placeholder..."
                        value={form['textNoSpaceAreaField']}
                        error={formError['textNoSpaceAreaField']}
                        onChange={(newValue)=>{onChange('textNoSpaceAreaField', newValue)}}
                        onValidate={(errorResult)=>{onValidate('textNoSpaceAreaField', errorResult)}}
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Full Number</span>
                <div className="preview-box">
                    <TextAreaField
                        type="text-only-number"
                        txtLabel="Form Text Area Label"
                        txtPlaceholder="Form placeholder..."
                        value={form['textFullNumberAreaField']}
                        error={formError['textFullNumberAreaField']}
                        onChange={(newValue)=>{onChange('textFullNumberAreaField', newValue)}}
                        onValidate={(errorResult)=>{onValidate('textFullNumberAreaField', errorResult)}}
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Disabled</span>
                <div className="preview-box">
                    <TextAreaField
                        type="text"
                        txtLabel="Form Text Area Label"
                        txtPlaceholder="Form placeholder..."
                        value={''}
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
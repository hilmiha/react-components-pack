import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import TextField, { errorType } from "../../../../components/text-field";
import { generateErrorState } from "../../../../helper";
import useFormHook from "../../../../hook/useFormHook";
import SelectionField, { selectionValueType } from "../../../../components/selection-field";
import TextAreaField from "../../../../components/text-area-field";

export type formType = {
    textAreaField:string
}

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [form, setForm] = useState<formType>({
        textAreaField:''
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
                <span className="font-title">Default</span>
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
        </div>
    )
}
export default ExamplePage
import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import TextField, { errorType } from "../../../../components/text-field";
import { generateErrorState } from "../../../../helper";
import useFormHook from "../../../../hook/useFormHook";
import SelectionField, { selectionValueType } from "../../../../components/selection-field";
import Switch from "../../../../components/switch";

export type formType = {
    textField:string
    noSpaceField:string,
    numberFiled:string,
    numberFloatField:string,
    numberOnly:string
}

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [form, setForm] = useState<formType>({
        textField:'',
        noSpaceField:'',
        numberFiled:'',
        numberFloatField:'',
        numberOnly:''
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
    
    useEffect(()=>{
        console.log(form)
    },[form])
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Text</span>
                <div className="preview-box">
                    <TextField
                        type="text"
                        txtLabel="Form Text Label"
                        txtPlaceholder="Form placeholder..."
                        value={form['textField']}
                        error={formError['textField']}
                        onChange={(newValue)=>{onChange('textField', newValue)}}
                        onValidate={(errorResult)=>{onValidate('textField', errorResult)}}
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">No Space</span>
                <div className="preview-box">
                    <TextField
                        txtLabel="Form No Space Label"
                        txtPlaceholder="Form placeholder..."
                        type="text-no-space"
                        value={form['noSpaceField']}
                        error={formError['noSpaceField']}
                        onChange={(newValue)=>{onChange('noSpaceField', newValue)}}
                        onValidate={(errorResult)=>{onValidate('noSpaceField', errorResult)}}
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Number</span>
                <div className="preview-box">
                    <TextField
                        txtLabel="Form Number"
                        txtPlaceholder="Form placeholder..."
                        type="text-number"
                        value={form['numberFiled']}
                        error={formError['numberFiled']}
                        onChange={(newValue)=>{onChange('numberFiled', newValue)}}
                        onValidate={(errorResult)=>{onValidate('numberFiled', errorResult)}}
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Float Number</span>
                <div className="preview-box">
                    <TextField
                        txtLabel="Form Number Label"
                        txtPlaceholder="Form placeholder..."
                        type="text-number-float"
                        value={form['numberFloatField']}
                        error={formError['numberFloatField']}
                        onChange={(newValue)=>{onChange('numberFloatField', newValue)}}
                        onValidate={(errorResult)=>{onValidate('numberFloatField', errorResult)}}
                        config={{
                            isMandatory:true,
                            integralDigit:0
                        }}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Full Number</span>
                <div className="preview-box">
                    <TextField
                        txtLabel="Form Full Number Label"
                        txtPlaceholder="Form placeholder..."
                        type="text-only-number"
                        value={form['numberOnly']}
                        error={formError['numberOnly']}
                        onChange={(newValue)=>{onChange('numberOnly', newValue)}}
                        onValidate={(errorResult)=>{onValidate('numberOnly', errorResult)}}
                        config={{
                            isMandatory:true
                        }}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Disabled</span>
                <div className="preview-box">
                    <TextField
                        type="text"
                        txtLabel="Form Text Label"
                        txtPlaceholder="Form placeholder..."
                        value={''}
                        isDisabled={true}
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
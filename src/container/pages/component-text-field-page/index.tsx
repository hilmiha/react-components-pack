import { useContext, useEffect, useState } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import TextField, { errorType } from "../../../components/text-field";
import { generateErrorState } from "../../../helper";
import useFormHook from "../../../helper/useForm";

export type formType = {
    textField:string
    noSpaceField:string,
    numberFiled:string,
    numberOnly:string,
    barebone:string
}

const ComponentTextFieldPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const [form, setForm] = useState<formType>({
        textField:'',
        noSpaceField:'',
        numberFiled:'',
        numberOnly:'',
        barebone:''
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
        setSidebarMenuListSelected('text-field')
    },[])

    return(
        <DetailTemplate 
            title="Text Field" 
            subTitle="A form allows users to input text information."
        >   
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
                        txtLabel="Form Number Label"
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
        </DetailTemplate>
    )
}   

export default ComponentTextFieldPage
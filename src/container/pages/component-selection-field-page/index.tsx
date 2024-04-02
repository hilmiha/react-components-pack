import { useContext, useEffect, useState } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import SelectionField, { selectionValueType } from "../../../components/selection-field";
import { errorType } from "../../../components/text-field";
import useFormHook from "../../../helper/useForm";
import { generateErrorState } from "../../../helper";

export type formType = {
    selection:selectionValueType
    multiSelection:selectionValueType
}

const ComponentSelectionFieldPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const [form, setForm] = useState<formType>({
        selection:[],
        multiSelection:[]
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
        setSidebarMenuListSelected('selection-field')
    },[])
    return(
        <DetailTemplate 
            title="Selection Field" 
            subTitle="A form allows users to input selections of value list."
        >
            <div className="component-section">
                <span className="font-title">Single Selection</span>
                <div className="preview-box">
                    <SelectionField
                        txtLabel="Single Selection"
                        txtPlaceholder="Form placeholder..."
                        type="selection"
                        value={form['selection']}
                        error={formError['selection']}
                        onChange={(newValue)=>{onChange('selection', newValue)}}
                        valueList={[
                            {
                                id:'1',
                                menu:[
                                    {
                                        id:'small-0',
                                        txtLabel:'Smallest',
                                        value:'small-0'
                                    },
                                    {
                                        id:'small-1',
                                        txtLabel:'Small',
                                        value:'small-1'
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Multiple Selection</span>
                <div className="preview-box">
                    <SelectionField
                        txtLabel="Multiple Selection"
                        txtPlaceholder="Form placeholder..."
                        type="multi-selection"
                        value={form['multiSelection']}
                        error={formError['multiSelection']}
                        onChange={(newValue)=>{onChange('multiSelection', newValue)}}
                        valueList={[
                            {
                                id:'1',
                                menu:[
                                    {
                                        id:'small-0',
                                        txtLabel:'Smallest',
                                        value:'small-0'
                                    },
                                    {
                                        id:'small-1',
                                        txtLabel:'Small',
                                        value:'small-1'
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            </div>
        </DetailTemplate>
    )
}   

export default ComponentSelectionFieldPage
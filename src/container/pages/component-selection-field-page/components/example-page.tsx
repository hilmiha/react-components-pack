import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import { errorType } from "../../../../components/text-field";
import { generateErrorState } from "../../../../helper";
import useFormHook from "../../../../hook/useForm";
import SelectionField, { selectionValueType } from "../../../../components/selection-field";

export type formType = {
    selection:selectionValueType
    multiSelection:selectionValueType
    mobileSelection:selectionValueType

}

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [form, setForm] = useState<formType>({
        selection:[],
        multiSelection:[],
        mobileSelection:[]
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
                        config={{
                            isMandatory:true,
                            isWithSearch:true
                        }}
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
                        onValidate={(errorResult)=>{onValidate('multiSelection', errorResult)}}
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
                        config={{
                            isMandatory:true,
                            isWithSearch:true
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
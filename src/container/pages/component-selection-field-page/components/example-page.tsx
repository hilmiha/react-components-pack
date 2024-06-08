import { useContext, useEffect, useMemo, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import { errorType } from "../../../../components/text-field";
import { generateErrorState } from "../../../../helper";
import useFormHook from "../../../../hook/useFormHook";
import SelectionField, { selectionValueType, valueList, valueListItem } from "../../../../components/selection-field";
import { sortBy } from "lodash";
import { kota, provinsiList } from "../data/provinsi-list";
import * as contorller from "../controller/controller";

export type formType = {
    selection:selectionValueType
    multiSelection:selectionValueType
    asyncList:selectionValueType

}

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

	const listProv = useMemo(()=>{return provinsiList},[])
    const [listAsync, setListAsync] = useState<valueListItem[]>([])

    const [form, setForm] = useState<formType>({
        selection:[],
        multiSelection:[],
        asyncList:[]
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
                        txtLabel="Single Selection Label"
                        txtPlaceholder="Form placeholder..."
                        type="selection"
                        value={form['selection']}
                        error={formError['selection']}
                        onChange={(newValue)=>{onChange('selection', newValue)}}
                        valueList={listProv}
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
                        txtLabel="Multiple Selection Label"
                        txtPlaceholder="Form placeholder..."
                        type="multi-selection"
                        value={form['multiSelection']}
                        error={formError['multiSelection']}
                        onChange={(newValue)=>{onChange('multiSelection', newValue)}}
                        onValidate={(errorResult)=>{onValidate('multiSelection', errorResult)}}
                        valueList={listProv}
                        config={{
                            isMandatory:true,
                            isWithSearch:true
                        }}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Async List Value</span>
                <div className="preview-box">
                    <SelectionField
                        txtLabel="Selection Label"
                        txtPlaceholder="Form placeholder..."
                        type="multi-selection"
                        value={form['asyncList']}
                        error={formError['asyncList']}
                        onChange={(newValue)=>{onChange('asyncList', newValue)}}
                        onValidate={(errorResult)=>{onValidate('asyncList', errorResult)}}
                        getListAsync = {(page, searchKey)=>{return contorller.getValueListAsync(page,searchKey)}}
                        valueList={listAsync}
                        setValueList={setListAsync}
                        config={{
                            isMandatory:true,
                            isWithSearch:true
                        }}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Disabled</span>
                <div className="preview-box">
                    <SelectionField
                        txtLabel="Form  Label"
                        txtPlaceholder="Form placeholder..."
                        type="selection"
                        value={[]}
                        valueList={listProv}
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

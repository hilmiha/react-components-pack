import { useMemo, useState } from "react"
import DatePickerField from "../../../../components/date-picker-field"
import SelectionField, { selectionValueType } from "../../../../components/selection-field"
import { FilterPageProps } from "../../../../components/table_new"
import { datePickerValueType } from "../../../../components/date-picker"
import useTableFilterHook from "../../../../hook/useTableFilterHook"
import { groupList, statusList } from "../data/tableData"
import FilterPopupTemplate from "../../../templates/filter-popup-template"

type formType = {
    group:selectionValueType,
    status:selectionValueType,
    lastUpdateDt:datePickerValueType
}

const FilterForm = ({filterValue, onApplyFilter, onCloseModal}:FilterPageProps) =>{

    const [form, setForm] = useState<formType>({
        group:[],
        status:[],
        lastUpdateDt:undefined
    })

    const tableFilterGroupList = useMemo(()=>{
        return([...groupList])
    },[])

    const tableFilterStatusList = useMemo(()=>{
        return([...statusList])
    },[])

    const {
        onChange,
        onClickApply,
        onClickReset,
        onCancel,
        isFormChange
    } = useTableFilterHook({
        filterValue,
        form,
        setForm,
        onApplyFilter,
        onCloseModal
    })

    const onThisOnClickButton = (idButton:string) =>{
        switch (idButton) {
            case '*apply*':
                onClickApply()
                break;

            case '*cancel*':
                onCancel()
                break;

            case '*reset*':
                onClickReset()
                break;

            default:
                break;
        }
    }

    return(
        <FilterPopupTemplate
            onClickButton={onThisOnClickButton}
            isApplyDisable={!isFormChange}
        >
            <SelectionField
                type="multi-selection"
                txtLabel="Group"
                txtPlaceholder="Select group type..."
                value={form['group']}
                onChange={(newValue)=>{onChange('group', newValue)}}
                valueList={tableFilterGroupList}
            />
            <SelectionField
                type="multi-selection"
                txtLabel="Status"
                txtPlaceholder="Select status type..."
                value={form['status']}
                onChange={(newValue)=>{onChange('status', newValue)}}
                valueList={tableFilterStatusList}
            />
            <DatePickerField
                txtLabel="Last Update"
                txtPlaceholder="Select last update date..."
                type="range"
                value={form['lastUpdateDt']}
                onChange={(newValue)=>{onChange('lastUpdateDt', newValue)}}
                config={{
                    fromDate:new Date('5/1/2024'),
                    toDate:new Date('5/5/2024')
                }}
            />
        </FilterPopupTemplate>
    )
}

export default FilterForm
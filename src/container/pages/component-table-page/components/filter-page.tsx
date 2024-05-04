import { useContext, useEffect, useMemo, useState } from "react"
import Drawer from "../../../../components/drawer"
import SelectionField, { selectionValueType } from "../../../../components/selection-field"
import useFormHook from "../../../../hook/useFormHook"
import { tableFilterType } from "../../../../components/table_new"
import { GlobalContext, GlobalContextType } from "../../../../context/globalcontext"
import { datePickerValueType } from "../../../../components/date-picker"
import DatePickerField from "../../../../components/date-picker-field"

type Props = {
    filterValue:tableFilterType
    isFilterDrawerOpen: boolean,
    setIsFilterDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
    onApplyFilter:(valueFilter:tableFilterType)=>void
}

type formType = {
    group:selectionValueType,
    status:selectionValueType,
    lastUpdateDt:datePickerValueType
}
const TableFilter = ({
    filterValue, 
    isFilterDrawerOpen, 
    setIsFilterDrawerOpen, 
    onApplyFilter
}:Props) =>{

    const {
        mediaSize
    } = useContext(GlobalContext) as GlobalContextType
    
    const [form, setForm] = useState<formType>({
        group:(filterValue?.group)?(filterValue.group as selectionValueType):([]),
        status:(filterValue?.status)?(filterValue.status as selectionValueType):([]),
        lastUpdateDt:(filterValue?.lastUpdateDt)?(filterValue.lastUpdateDt as datePickerValueType):(undefined),
    })

    const [applyedForm, setApplyedForm] = useState<formType>({
        group:(filterValue?.group)?(filterValue.group as selectionValueType):([]),
        status:(filterValue?.status)?(filterValue.status as selectionValueType):([]),
        lastUpdateDt:(filterValue?.lastUpdateDt)?(filterValue.lastUpdateDt as datePickerValueType):(undefined),
    })

    const isFormChange = useMemo(()=>{
        return(JSON.stringify(form)!==JSON.stringify(applyedForm))
    },[form, applyedForm])

    const formDefault = useMemo(():formType=>{return({
        group:[],
        status:[],
        lastUpdateDt:undefined
    })},[])

    const {
        onChange
    } = useFormHook({
        form,
        setForm
    })

    const onClickApply = () =>{
        setApplyedForm({...form})
        onApplyFilter({...form})
    }

    const onClickReset = () =>{
        setForm({...formDefault})
    }

    const thisOnClcikButtonDrawer = (idButton:string) =>{
        if(idButton==='apply-filter'){
            onClickApply()
            setIsFilterDrawerOpen(false)
            return
        }
        if(idButton==='reset-filter'){
            onClickReset()
            return
        }
        if(idButton==='cancel-filter'){
            setForm({
                group:(filterValue?.group)?(filterValue.group as selectionValueType):([]),
                status:(filterValue?.status)?(filterValue.status as selectionValueType):([]),
                lastUpdateDt:(filterValue?.lastUpdateDt)?(filterValue.lastUpdateDt as datePickerValueType):(undefined)
            })
            setIsFilterDrawerOpen(false)
        }
    }

    useEffect(()=>{
        console.log('openned')
    },[])

    return(
        <Drawer
            id='filter-drawer'
            txtTitle="Filter"
            drawerSize="medium"
            isOpen={isFilterDrawerOpen}
            setIsOpen={setIsFilterDrawerOpen}
            onClickButton={thisOnClcikButtonDrawer}
            buttonList={[
                {
                    id:'apply-filter',
                    txtLabel:'Apply Filter',
                    appearance:"primary",
                    isDisabled:!isFormChange
                },
                {
                    id:'cancel-filter',
                    txtLabel:'Cancel',
                    appearance:"default"
                },
                {
                    id:'reset-filter',
                    txtLabel:'Reset',
                    appearance:"subtle"
                },
            ]}
            contentPage={
                <div style={{display:'grid', gridTemplateColumns:(mediaSize<1)?('1fr'):('1fr 1fr'), gap:'var(--size-6)'}}>
                    <SelectionField
                        type="multi-selection"
                        txtLabel="Group"
                        txtPlaceholder="Select group type..."
                        value={form['group']}
                        onChange={(newValue)=>{onChange('group', newValue)}}
                        valueList={[
                            {
                                id:'group',
                                menu:[
                                    {
                                        id:'admin',
                                        txtLabel:'Admin',
                                        value:'admin'
                                    },
                                    {
                                        id:'business',
                                        txtLabel:'Business',
                                        value:'business'
                                    },
                                    {
                                        id:'it',
                                        txtLabel:'IT',
                                        value:'it'
                                    },
                                    {
                                        id:'sales',
                                        txtLabel:'Sales',
                                        value:'sales'
                                    },
                                ]
                            }
                        ]}
                    />
                    <SelectionField
                        type="multi-selection"
                        txtLabel="Status"
                        txtPlaceholder="Select status type..."
                        value={form['status']}
                        onChange={(newValue)=>{onChange('status', newValue)}}
                        valueList={[
                            {
                                id:'status',
                                menu:[
                                    {
                                        id:'active',
                                        txtLabel:'Active',
                                        value:'0'
                                    },
                                    {
                                        id:'inactive',
                                        txtLabel:'Inactive',
                                        value:'3'
                                    },
                                    {
                                        id:'suspended',
                                        txtLabel:'Suspended',
                                        value:'1'
                                    },
                                    {
                                        id:'locked',
                                        txtLabel:'Locked',
                                        value:'2'
                                    }
                                ]
                            }
                        ]}
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
                </div>
            }
        />
    )
}

export default TableFilter
import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import './styles.scss'
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import TimeField from '../../../components/time-picker/__index';
import TimePicker from '../../../components/time-picker/_index';
import useFormHook from '../../../hook/useFormHook';
import TimePickerField from '../../../components/time-picker-field';
import { generateErrorState } from '../../../helper';
// import TimePicker from '../../../components/time-picker';

const PlaygroundPage = () =>{
    const {
        changeTheme,
        setGlobalModal,
		setIsShowGlobalModal,
    } = React.useContext(GlobalContext) as GlobalContextType;

    const {
        setSidebarManuList,
        setShowSubMenuDrawer
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarManuList([])
        setShowSubMenuDrawer('playground')
    },[])

    const [form, setForm] = useState({
        time:{hour:undefined, minute:undefined, second:undefined},
        timeAmpm:{hour:undefined, minute:undefined, second:undefined}
    })

    const [formError, setFormError] = useState(generateErrorState(form))

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
        console.log(form.time)
        console.log(form.timeAmpm)
    },[form])

	return (
		<div style={{padding:"8px", display:'grid', gap:'40px'}}>
            <TimePickerField
                type='24hr'
                txtLabel='Start Time'
                value={form['time']}
                onChange={(newValue)=>{onChange('time', newValue)}}
                onValidate={(errorResult)=>{onValidate('time',errorResult)}}
                error={formError['time']}
                txtPlaceholder='Select Time'
                config={{
                    isMandatory:true
                }}
            />
            <TimePickerField
                type='ampm'
                txtLabel='Start Time'
                value={form['timeAmpm']}
                onChange={(newValue)=>{onChange('timeAmpm', newValue)}}
                onValidate={(errorResult)=>{onValidate('timeAmpm',errorResult)}}
                error={formError['timeAmpm']}
                txtPlaceholder='Select Time'
                config={{
                    isMandatory:true
                }}
            />
		</div>
	)
}

export default PlaygroundPage
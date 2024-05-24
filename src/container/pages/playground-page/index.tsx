import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import './styles.scss'
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import TimeField from '../../../components/time-picker';
import TimePicker from '../../../components/time-picker/_index';
import useFormHook from '../../../hook/useFormHook';
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

    const {
        onChange
    } = useFormHook({
        form,
        setForm
    })

    useEffect(()=>{
        console.log(form.time)
        console.log(form.timeAmpm)
    },[form])

	return (
		<div style={{padding:"8px"}}>
            <TimeField
                value={form['time']}
                onChange={(newValue)=>{onChange('time', newValue)}}
                type='ampm'
                txtLabel='Time AM/PM'
                config={{
                    isShowSecond:true
                }}
            />
            <TimeField
                value={form['timeAmpm']}
                onChange={(newValue)=>{onChange('timeAmpm', newValue)}}
                type='24hr'
                txtLabel='Time'
                config={{
                    isShowSecond:true
                }}
            />
		</div>
	)
}

export default PlaygroundPage
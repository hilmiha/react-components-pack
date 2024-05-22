import React, { useContext, useEffect } from 'react';
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import './styles.scss'
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import TimeField from '../../../components/time-picker';
import TimePicker from '../../../components/time-picker/_index';
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

	return (
		<div style={{padding:"8px"}}>
            <TimeField
                type='24hr'  
                txtLabel='Time'
            />
            <TimePicker/>
		</div>
	)
}

export default PlaygroundPage
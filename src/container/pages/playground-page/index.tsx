import React, { useContext, useEffect } from 'react';
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import './styles.scss'
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import Spinner from '../../../components/spinner';

type formType = {
    checkboxValue:string[],
    radioValue:string
}
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
            <p className='font-text'>Playground</p>
		</div>
	)
}

export default PlaygroundPage
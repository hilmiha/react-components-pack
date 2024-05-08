import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import './styles.scss'
import IconButton from '../../../components/icon-button';
import SplitButton from '../../../components/split-button';
import ButtonGroup from '../../../components/button-group';
import { PiDotsThreeOutlineVerticalFill, PiPencilSimpleLine, PiStarFourFill } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import SelectionField, { selectionValueType } from '../../../components/selection-field';
import { datePickerValueType } from '../../../components/date-picker';
import { generateErrorState } from '../../../helper';
import TextField from '../../../components/text-field';
import DatePickerField from '../../../components/date-picker-field';
import Image from '../../../components/image';
import Button from '../../../components/button';
import Drawer from '../../../components/drawer';
import DropdownMenu from '../../../components/dropdown-menu';
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import Checkbox from '../../../components/checkbox';
import Radio from '../../../components/radio';
import Toggle from '../../../components/toggle';

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

    const [selected, setSelected] = useState(false)

	return (
		<div style={{padding:"8px"}}>
            <div style={{display:'grid', gap:'8px'}}>
                <Checkbox isSelected={true}/>
                <Checkbox asButton={true} isSelected={selected} txtLabel='Checkbox' onClick={()=>{setSelected(!selected)}}/>
                <Checkbox asButton={true} isSelected={selected} txtLabel='Checkbox' onClick={()=>{setSelected(!selected)}} isDisabled/>
            </div>

            <div style={{display:'grid', gap:'8px',  marginTop:'20px'}}>
                <Radio isSelected={true}/>
                <Radio asButton={true} isSelected={selected} txtLabel='Radio' onClick={()=>{setSelected(!selected)}}/>
                <Radio asButton={true} isSelected={selected} txtLabel='Radio' onClick={()=>{setSelected(!selected)}} isDisabled/>
            </div>

            <div style={{display:'grid', gap:'8px',  marginTop:'20px'}}>
                <Toggle isSelected={true}/>
                <Toggle asButton={true} isSelected={selected} txtLabel='Toggle' onClick={()=>{setSelected(!selected)}}/>
                <Toggle asButton={true} isSelected={selected} txtLabel='Toggle' onClick={()=>{setSelected(!selected)}} isDisabled/>
            </div>
			
            
		</div>
	)
}

export default PlaygroundPage
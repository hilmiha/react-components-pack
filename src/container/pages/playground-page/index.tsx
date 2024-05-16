import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import './styles.scss'
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import Slider, { valueSliderType } from '../../../components/slider';
import ReactSlider from 'react-slider';

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

    const [values, setValue] = useState<valueSliderType>(50)
    const [valuesV, setValueV] = useState<valueSliderType>(50)

	return (
		<div style={{padding:"8px"}}>
            <p className='font-text'>Playground</p>
            <div style={{width:'500px'}}>
                <Slider
                    value={values}
                    onChange={setValue}
                />
            </div>
            <div style={{height:'500px'}}>
                <Slider
                    value={valuesV}
                    onChange={setValueV} 
                    orientation='vertical' 
                />
            </div>
            
		</div>
	)
}

export default PlaygroundPage
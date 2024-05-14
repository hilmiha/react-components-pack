import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import './styles.scss'
import { generateErrorState } from '../../../helper';
import { errorType } from '../../../components/text-field';
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import Checkbox from '../../../components/checkbox';
import Radio from '../../../components/radio';
import Switch from '../../../components/switch';
import CheckboxField from '../../../components/checkbox-field';
import useFormHook from '../../../hook/useFormHook';
import RadioFiled from '../../../components/radio-field';
import Accordion from '../../../components/accordion';
import AccordionItem from '../../../components/accordionItem';

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

    const [selected, setSelected] = useState(false)

    const [form, setForm] = useState<formType>({
        checkboxValue:[],
        radioValue:''
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

    const [isOpen, setIsOpen] = useState(['1'])
    
    useEffect(()=>{
        console.log(form)
    },[form])

    useEffect(()=>{
        console.log(formError)
    },[formError])

	return (
		<div style={{padding:"8px"}}>
            <Accordion
                accordionOpen={isOpen}
                setAccordionOpen={setIsOpen}
                isAllowMultipleOpen={false}
            >
                <AccordionItem
                    id='one'
                    txtLabel='Hello World'      
                    txtSublabel='asdad ahdgas hgasj'
                    contentPage={
                        <p className='font-text'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                        </p>
                    }
                />
                <AccordionItem
                    id='two'
                    txtLabel='Hello World'                    
                    contentPage={
                        <p className='font-text'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                        </p>
                    }
                />
                <AccordionItem
                    id='three'
                    txtLabel='Hello World'                    
                    contentPage={
                        <p className='font-text'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                        </p>
                    }
                />
            </Accordion>
		</div>
	)
}

export default PlaygroundPage
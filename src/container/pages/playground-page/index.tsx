import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import './styles.scss'
import { generateErrorState } from '../../../helper';
import { errorType } from '../../../components/text-field';
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import Checkbox from '../../../components/checkbox';
import Radio from '../../../components/radio';
import Toggle from '../../../components/toggle';
import CheckboxField from '../../../components/checkbox-field';
import useFormHook from '../../../hook/useFormHook';
import RadioFiled from '../../../components/radio-field';

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

    useEffect(()=>{
        console.log(form)
    },[form])

    useEffect(()=>{
        console.log(formError)
    },[formError])

	return (
		<div style={{padding:"8px"}}>
            <div style={{display:'grid', gap:'8px'}}>
                <Checkbox isSelected={true}/>
                <Checkbox isSelected={selected} txtLabel='Checkbox' onClick={()=>{setSelected(!selected)}}/>
                <Checkbox isSelected={selected} txtLabel='Checkbox' onClick={()=>{setSelected(!selected)}} isDisabled/>
            </div>

            <div style={{display:'grid', gap:'8px',  marginTop:'20px'}}>
                <Radio isSelected={true}/>
                <Radio isSelected={selected} txtLabel='Radio' onClick={()=>{setSelected(!selected)}}/>
                <Radio isSelected={selected} txtLabel='Radio' onClick={()=>{setSelected(!selected)}} isDisabled/>
            </div>

            <div style={{display:'grid', gap:'8px',  marginTop:'20px'}}>
                <Toggle isSelected={true}/>
                <Toggle isSelected={selected} txtLabel='Toggle' onClick={()=>{setSelected(!selected)}}/>
                <Toggle isSelected={selected} txtLabel='Toggle' onClick={()=>{setSelected(!selected)}} isDisabled/>
            </div>

            <div style={{display:'grid', gap:'8px',  marginTop:'20px'}}>
                <CheckboxField
                    value={form['checkboxValue']}
                    txtLabel='Checkbox'
                    valueList={[
                        {
                            id:'parents1',
                            txtLabel:'Parents 1',
                            value:'parents1',
                            childMenu:[
                                {
                                    id:'option-one',
                                    txtLabel:'Option One',
                                    txtSublabel:"ini option one",
                                    value:'option-one',
                                },
                                {
                                    id:'option-two',
                                    txtLabel:'Option Two',
                                    txtSublabel:"ini option two lorem",
                                    value:'option-two'
                                }
                            ]
                        },
                        {
                            id:'parents2',
                            txtLabel:'Parents 2',
                            value:'parents2'
                        },
                        {
                            id:'parents3',
                            txtLabel:'Parents 3',
                            value:'parents3'
                        }
                    ]}
                    onChange={(newValue)=>{onChange('checkboxValue', newValue)}}
                    onValidate={(errorResult)=>{onValidate('checkboxValue', errorResult)}}
                    error={formError['checkboxValue']}
                    config={{
                        isMandatory:true,
                        maxSelection:3
                    }}
                />
            </div>

            <div style={{display:'grid', gap:'8px',  marginTop:'20px'}}>
                <RadioFiled
                    value={form['radioValue']}
                    txtLabel='Radio'
                    valueList={[
                        {
                            id:'parents1',
                            txtLabel:'Parents 1',
                            txtSublabel:"ini option one",
                            value:'parents1',
                        },
                        {
                            id:'parents2',
                            txtLabel:'Parents 2',
                            value:'parents2'
                        },
                        {
                            id:'parents3',
                            txtLabel:'Parents 3',
                            value:'parents3'
                        }
                    ]}
                    onChange={(newValue)=>{onChange('radioValue', newValue)}}
                    onValidate={(errorResult)=>{onValidate('radioValue', errorResult)}}
                    error={formError['radioValue']}
                    config={{
                        isMandatory:true,
                    }}
                />
            </div>
			
            
		</div>
	)
}

export default PlaygroundPage
import { PiWarningDiamondFill } from 'react-icons/pi'
import { formatText, processClassname } from '../../helper'
import './styles.scss'
import { IconType } from 'react-icons'
import { useState } from 'react'
import { FloatingFocusManager, autoUpdate, flip, offset, shift, size, useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react'
import DropdownManuItem from '../dropdown-menu-item'
import { menuList } from '../dropdown-menu'
import DropdownMenuItemGroup from '../dropdown-menu-item-group'

type textFieldType = 'text' | 'text-no-space' | 'text-only-number' | 'text-number'
type valueType = string
export type errorType = {isError: boolean, errorMessage:string}
export type valueListItem = {id:string, txtLabel:string, txtSublabel?:string, value?:any, isDisabled?:boolean}
export type valueList = valueListItem[] | []


type Props = {
    className?: string
    type?:textFieldType
    value?: valueType
    txtLabel?:string
    onChange?: (newValue:valueType) => void,
    onValidate?: (errorResult:errorType, newValue:valueType, config?:Record<any, any>) => void,
    error?: errorType
    config?: {
        placeholder?: string
        prefix?: string | JSX.Element,
        sufix?: string | JSX.Element,
        maxLength?: number,
        isMandatory?: boolean,
        minValue?:number,
        maxValue?:number,
        regex?:RegExp | [RegExp, string]
    }
}

const TextField = ({
    className,
    type = 'text',
    txtLabel,
    value,
    onChange,
    onValidate,
    config,
    error
}:Props) =>{
    const [isFieldTouched, setIsFieldTouched] = useState(false);
    const isMandatory = config?.isMandatory===true
    const prefix = config?.prefix
    const sufix = config?.sufix

    const processValue = (isForMask:boolean, newValue?:valueType) =>{
        let tampValue = newValue?newValue:''
        let tampMaskedValue = newValue?newValue:''
        
        if(type==='text-no-space' && typeof tampValue === 'string'){
            const tamp = formatText(type, tampValue.slice(0,(config?.maxLength)?(config.maxLength):(tampValue.length)))
            tampValue = tamp.realValue
            tampMaskedValue= tamp.formatedText
        }else if(type==='text-only-number' && typeof tampValue === 'string'){
            const tamp = formatText(type, tampValue.slice(0,(config?.maxLength)?(config.maxLength):(tampValue.length)))
            tampValue = tamp.realValue
            tampMaskedValue= tamp.formatedText
        }else if(type==='text-number'){
            const tampTamp =  (tampValue?(tampValue):('')).toString().replace(/[^0-9]+/g, "")
            const tamp = formatText(type, tampTamp.slice(0,(config?.maxLength)?(config.maxLength):(tampTamp.length)))
            tampValue = tamp.formatedText.replace(/[^0-9]+/g, "")
            tampMaskedValue= tamp.formatedText
        }else{
            tampValue = (typeof tampValue === 'string')?(tampValue.slice(0,(config?.maxLength)?(config.maxLength):(tampValue.length))):(tampValue)
            tampMaskedValue = tampValue?tampValue.toString():''
        }
        
        return((isForMask)?(tampMaskedValue):(tampValue))
    }

    const validateField = (value:valueType) =>{
        let tampError:errorType = {isError:false, errorMessage:''}
        let error = false

        if(isMandatory && !error){
            if(typeof value==='string' && !value){
                error=true
            }else if(typeof value==='number' && value===undefined){
                error=true
            }

            if(error){
                tampError.isError = true
                tampError.errorMessage = "This field can't be empty!"
            }
        }
        
        if((config?.regex !== undefined) && typeof value === 'string' && !error){
            if(!((Array.isArray(config.regex))?(config.regex[0].test(value)):(config.regex.test(value)))){
                tampError.isError = true
                tampError.errorMessage = Array.isArray(config.regex)?config.regex[1]:"This field value does not have the correct format!"
            }
        }
        
        if(((config?.minValue)!==undefined) && typeof value==='number' && !error){
            if(value<config.minValue){
                error=true
            }
            if(error){
                tampError.isError = true
                tampError.errorMessage = `This field value must more than ${formatText('text-number',config.minValue).formatedText}!`
            }
        }

        if(((config?.maxValue)!==undefined) && typeof value==='number' && !error){
            if(value>config.maxValue){
                error=true
            }
            if(error){
                tampError.isError = true
                tampError.errorMessage = `This field value must less than ${formatText('text-number',config.maxValue).formatedText}!`
            }
        }

        return tampError
    }

    const thisOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = processValue(false, event.target.value)

        if(onChange && newValue!==value){
            onChange(newValue)
        }

        if(!isFieldTouched){
            setIsFieldTouched(true)
        }
    }

    const thisOnBlur = (event: React.ChangeEvent<HTMLInputElement> | string) =>{
        const processedValue = processValue(false, (typeof event === 'string')?event:event.target.value)

        const valueTrim = typeof processedValue === 'string'?processedValue.trim():processedValue
        
        if(onChange && valueTrim!==value){
            onChange(valueTrim)
        }

        if(onValidate && isFieldTouched){
            const configTamp = config
            onValidate(validateField(valueTrim), valueTrim, configTamp)
        }
    }

    return(
        <>
            <div 
                className={
                    processClassname(`text-field field
                    ${className?(className):('')}`)  
                }
            >
                {
                    (txtLabel)&&(
                        <>
                            <span className='field-label'>{txtLabel}{isMandatory&&(<span className='field-label-asteric'>*</span>)}</span>
                        </>
                    )
                }
                <div className='text-field-input-container field-container'>
                    {(prefix)&&(
                        <span className='field-prefix-sufix'>{prefix}</span>
                    )}
                    <input
                        placeholder={config?.placeholder}
                        className={'text-field-input'}
                        value={processValue(true, value)}
                        onBlur={thisOnBlur}
                        onChange={thisOnChange}
                        type={(type==='text-number'|| type==='text-only-number')?'tel':'text'}
                    />
                    {(sufix)&&(
                        <span className='field-prefix-sufix'>{sufix}</span>
                    )}
                </div>
                {
                    (error?.isError)&&(
                        <span className='field-error-message'>
                            <PiWarningDiamondFill/> {error.errorMessage}
                        </span>
                    )
                }
            </div>
        </>
    )
}

export default TextField
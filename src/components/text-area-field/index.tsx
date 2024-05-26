import { PiWarningDiamondFill } from 'react-icons/pi'
import { formatText, processClassname } from '../../helper'
import './styles.scss'
import { useEffect, useRef, useState } from 'react'
import { errorType } from '../text-field'

type textAreaFieldType = 'text' | 'text-no-space' | 'text-only-number'
type valueType = string

export type textFieldConfig = {
    maxLength?: number,
    isMandatory?: boolean,
    initialLine?: number
    regex?:RegExp | [RegExp, string]
}

export type TextFieldProps = {
    className?: string
    type:textAreaFieldType
    value?: valueType
    txtLabel?:string
    txtPlaceholder?:string
    onChange?: (newValue:valueType) => void,
    onPressEnter?: ()=>void
    onValidate?: (errorResult:errorType, newValue:valueType, config?:textFieldConfig) => void,
    error?: errorType
    config?: textFieldConfig
}

const TextAreaField = ({
    className,
    type = 'text',
    txtLabel,
    txtPlaceholder,
    value = '',
    onChange,
    onPressEnter,
    onValidate,
    config,
    error
}:TextFieldProps) =>{
    const [isFieldTouched, setIsFieldTouched] = useState(false);
    const growContainer = useRef<HTMLInputElement>(null)
    const isMandatory = config?.isMandatory===true
    const initialLine = config?.initialLine?(config.initialLine):(3)

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

        return tampError
    }

    const thisOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
        const newValue = processValue(false, event.target.value)

        if(onChange && newValue!==value){
            onChange(newValue)
        }

        if(!isFieldTouched){
            setIsFieldTouched(true)
        }
    }

    const thisOnBlur = (event: React.ChangeEvent<HTMLTextAreaElement>) =>{
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

    useEffect(()=>{
        if(growContainer.current){
            growContainer.current.setAttribute('data-replicated-value', value)
        }
    },[growContainer, value])

    return(
        <>
            <div 
                className={
                    processClassname(`text-area-field field
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
                <div 
                    className={
                        processClassname(`text-area-field-input-container field-container
                        ${(error?.isError)?('error'):('')}`)  
                    }
                >
                    <div className="grow-wrap" ref={growContainer}>
                        <textarea 
                            placeholder={txtPlaceholder}
                            className='text-field-input' 
                            onChange={thisOnChange} 
                            onBlur={thisOnBlur}
                            value={processValue(true, value)}
                            rows={initialLine}
                        ></textarea>
                    </div>
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

export default TextAreaField
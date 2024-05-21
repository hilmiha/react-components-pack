import { PiWarningDiamondFill } from 'react-icons/pi'
import { formatText, processClassname } from '../../helper'
import './styles.scss'
import { useState } from 'react'

type textFieldType = 'text' | 'text-no-space' | 'text-only-number' | 'text-number' | 'text-number-float'
type valueType = string
export type errorType = {isError: boolean, errorMessage:string}

export type textFieldConfig = {
    prefix?: string | JSX.Element,
    sufix?: string | JSX.Element,
    maxLength?: number,
    isMandatory?: boolean,
    minValue?:number,
    maxValue?:number,
    regex?:RegExp | [RegExp, string]
    integralDigit?: 0 | 1 | 2 | 3
}

export type TextFieldProps = {
    className?: string
    type:textFieldType
    value?: valueType
    txtLabel?:string
    txtPlaceholder?:string
    onChange?: (newValue:valueType) => void,
    onPressEnter?: ()=>void
    onValidate?: (errorResult:errorType, newValue:valueType, config?:textFieldConfig) => void,
    error?: errorType
    config?: textFieldConfig
}

const TextField = ({
    className,
    type = 'text',
    txtLabel,
    txtPlaceholder,
    value,
    onChange,
    onPressEnter,
    onValidate,
    config,
    error
}:TextFieldProps) =>{
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
        }else if(type==='text-number-float'){
            const tampTampSplit =  (tampValue?(tampValue):('')).toString().replace(/[^0-9,\.]+/g, "").split(',')
            let tampTamp = ''
            if(tampTampSplit.length>1){
                tampTamp = tampTampSplit[0]+','+tampTampSplit[1].slice(0,(config?.integralDigit)?(config.integralDigit):(2))
            }else{
                tampTamp = tampTampSplit[0]
            }
            const tamp = formatText(type, tampTamp)
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
        
        if(((config?.minValue)!==undefined) && type==='text-number' && !error){
            if(parseFloat(value)<config.minValue){
                error=true
            }
            if(error){
                tampError.isError = true
                tampError.errorMessage = `This field value must more than ${formatText('text-number',config.minValue).formatedText}!`
            }
        }

        if(((config?.maxValue)!==undefined) && type==='text-number' && !error){
            if(parseFloat(value)>config.maxValue){
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
        let processedValue = ''

        if(type==='text-number-float'){
            let valAr = ((typeof event === 'string')?event:event.target.value).split(',')
            let valStr = ''
            
            const oDigit = Array((config?.integralDigit?(config.integralDigit + 1):(3))).join("0")

            if(valAr.length === 1){
                if(valAr[0]){
                    valStr = valAr[0]+','+'0'
                }else{
                    valStr = valAr[0]
                }
            }else{
                valAr[1] = valAr[1]+oDigit
                if(parseFloat(valAr[1])===0){
                    valAr[1] = '0'
                }
                valStr = valAr[0] + ',' + valAr[1]
            }
            processedValue = processValue(false, valStr)
        }else{
            processedValue = processValue(false, (typeof event === 'string')?event:event.target.value)
        }

        const valueTrim = typeof processedValue === 'string'?processedValue.trim():processedValue
        
        if(onChange && valueTrim!==value){
            onChange(valueTrim)
        }

        if(onValidate && isFieldTouched){
            const configTamp = config
            onValidate(validateField(valueTrim), valueTrim, configTamp)
        }
    }

    const thisOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>{
        if(event.key === 'Enter' && onPressEnter){
            onPressEnter()
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
                <div 
                    className={
                        processClassname(`text-field-input-container field-container
                        ${(error?.isError)?('error'):('')}`)  
                    }
                >
                    {(prefix)&&(
                        <span className='field-prefix-sufix'>{prefix}</span>
                    )}
                    <input
                        placeholder={txtPlaceholder}
                        className={'text-field-input'}
                        value={processValue(true, value)}
                        onBlur={thisOnBlur}
                        onChange={thisOnChange}
                        onKeyDown={thisOnKeyDown}
                        type={(type==='text-number'|| type==='text-only-number' || type==='text-number-float')?'tel':'text'}
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
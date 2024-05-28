import { PiWarningDiamondFill, PiX } from 'react-icons/pi'
import { formatText, processClassname } from '../../helper'
import './styles.scss'
import { LegacyRef, useRef, useState } from 'react'
import IconButton from '../icon-button'

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
    inputRef?: React.MutableRefObject<HTMLInputElement | undefined>
    className?: string
    type:textFieldType
    value?: valueType
    txtLabel?:string
    txtPlaceholder?:string
    onChange?: (newValue:valueType) => void,
    onFocus?: (event:React.ChangeEvent<HTMLInputElement>) => void,
    onBlur?: (event:React.ChangeEvent<HTMLInputElement>) => void,
    onKeyDown?: (event:React.KeyboardEvent<HTMLInputElement>)=>void
    onKeyUp?: (event:React.KeyboardEvent<HTMLInputElement>)=>void
    onValidate?: (errorResult:errorType, newValue:valueType, config?:textFieldConfig) => void,
    error?: errorType
    config?: textFieldConfig
    isDisabled?:boolean
    isShowClear?:boolean
}

const TextField = ({
    inputRef,
    className,
    type = 'text',
    txtLabel,
    txtPlaceholder,
    value,
    onChange,
    onFocus,
    onBlur,
    onKeyDown,
    onKeyUp,
    onValidate,
    config,
    error,
    isDisabled = false,
    isShowClear = true
}:TextFieldProps) =>{
    const [isFieldTouched, setIsFieldTouched] = useState(false);
    const inputDefRef = useRef(null)
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
        if(!isDisabled){
            const newValue = processValue(false, event.target.value)

            if(onChange && newValue!==value){
                onChange(newValue)
            }

            if(!isFieldTouched){
                setIsFieldTouched(true)
            }
        }
    }

    const thisOnClear = () =>{
        if(onChange){
            onChange('')
        }
        
        if(inputRef?.current){
            let formField = inputRef.current as HTMLInputElement
            setTimeout(() => {
                formField.focus()
            }, 10);
        }else if(inputDefRef.current){
            let formField = inputDefRef.current as HTMLInputElement
            setTimeout(() => {
                formField.focus()
            }, 10);
        }
    }

    const thisOnFocus = (event: React.ChangeEvent<HTMLInputElement>) =>{
        if(onFocus){
            onFocus(event)
        }
    }

    const thisOnBlur = (event: React.ChangeEvent<HTMLInputElement>) =>{
        let processedValue = ''

        if(type==='text-number-float'){
            let valAr = (event.target.value).split(',')
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

        if(onBlur){
            onBlur(event)
        }
    }

    const thisOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) =>{
        if(onKeyDown){
            onKeyDown(event)
        }
    }
    const thisOnKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) =>{
        if(onKeyUp){
            onKeyUp(event)
        }
    }

    return(
        <div 
            className={
                processClassname(`text-field field
                ${className?(className):('')}`)  
            }
        >
            {
                (txtLabel)&&(
                    <>
                        <span 
                            className={
                                processClassname(`field-label
                                ${(isDisabled)?('disabled'):('')}`)  
                            }
                        >
                            {txtLabel}{isMandatory&&(<span className='field-label-asteric'>*</span>)}
                        </span>
                    </>
                )
            }
            <div style={{position:'relative'}}>
                <div 
                    className={
                        processClassname(`text-field-input-container field-container
                        ${(isShowClear)?('is-show-clear'):('')}
                        ${(error?.isError)?('error'):('')}
                        ${(isDisabled)?('disabled'):('')}`)  
                    }
                >
                    {(prefix)&&(
                        <span className='field-prefix-sufix'>{prefix}</span>
                    )}
                    <input
                        ref={inputRef?(inputRef as LegacyRef<HTMLInputElement>):inputDefRef}
                        placeholder={txtPlaceholder}
                        className={'text-field-input'}
                        value={processValue(true, value)}
                        onBlur={thisOnBlur}
                        onFocus={thisOnFocus}
                        onChange={thisOnChange}
                        onKeyDown={thisOnKeyDown}
                        onKeyUp={thisOnKeyUp}
                        type={(type==='text-number'|| type==='text-only-number' || type==='text-number-float')?'tel':'text'}
                        disabled={isDisabled}
                    />
                    {(sufix)&&(
                        <span className='field-prefix-sufix'>{sufix}</span>
                    )}
                </div>
                {
                    (value && !isDisabled && isShowClear)&&(
                        <IconButton
                            className="clear-button"
                            appearance="subtle"
                            spacing="compact"
                            onClick={thisOnClear}
                            Icon={PiX}
                        />
                    )
                }
            </div>
            
            {
                (error?.isError && error.errorMessage)&&(
                    <span className='field-error-message'>
                        <PiWarningDiamondFill/> {error.errorMessage}
                    </span>
                )
            }
        </div>
    )
}

export default TextField
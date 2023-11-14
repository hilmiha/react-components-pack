import './styles.css'
import { TEXTSIZES } from '../../constant/theme'
import { useEffect, useRef, useState } from 'react'
import Text from '../Text'
import { formatText } from '../../untils/textFormatterUtils'

const InputText = ({
    //props
    type,
    className,
    value,

    //functions
    onChangeField,
    onBlurField,
    onFocusField,

    //conditions
    maxLength,
    maxNumber,
    isDisabled,
    isDisabledTyping,
    isError,    
    isMinNumberZero,

    //styles and looks
    placeholder,
    prefix,
    sufix,
    isShowCounter,
    isRounded,
    isFullWidth
}) =>{
    const inputRef = useRef(null)
    const [isRendered, setIsRendered] = useState(false)
    const [isFocus, setIsFocus] = useState(false)

    const getValue = (newValue, isGetMasked) =>{
        let tampValue = ''
        let tampMaskedValue = ''

        if(type==='text-no-space'){
            const tamp = formatText('text-no-space', newValue.slice(0,(maxLength)?(maxLength):(newValue.length)))
            tampValue = tamp[1]
            tampMaskedValue= tamp[0]
        }else if(type==='text-number'){
            const tamp = formatText('number', newValue)
            if(tamp[1] > maxNumber){
                tampValue = value
                tampMaskedValue= formatText('number', value)[0]
            }else if(newValue==='' && isMinNumberZero){
                tampValue = 0
                tampMaskedValue= '0'
            }else{
                tampValue = tamp[1]
                tampMaskedValue= tamp[0]
            }
        }else if(type==='text-money'){
            if(newValue==='' && !isRendered){
                tampValue = ''
                tampMaskedValue = ''
            }else{
                const tamp = formatText('number', newValue)
                if(isFocus){
                    if(tamp[1] > maxNumber){
                        tampValue = value
                        tampMaskedValue= formatText('number', value)[0]
                    }else if(newValue==='' && isMinNumberZero){
                        tampValue = 0
                        tampMaskedValue= (isRendered)?('0'):('0.00')
                    }else{
                        tampValue = tamp[1]
                        tampMaskedValue= (isRendered)?(tamp[0]):(`${tamp[0]}.00`)
                    }
                }else{
                    if(newValue===''){
                        tampValue = (isMinNumberZero)?(0):('')
                        tampMaskedValue = (isMinNumberZero)?('0.00'):('')
                    }else{
                        tampValue = tamp[1]
                        tampMaskedValue = `${tamp[0]}.00`
                    }
                }
            }
        }else if(type==='text-number-dashed'){
            const tamp = formatText('number-dashed', newValue.toString().replace(/[^0-9]+/g, "").slice(0,(maxLength)?(maxLength):(newValue.length)))
            tampValue = tamp[1]
            tampMaskedValue= tamp[0]
        }else if(type==='text-number-string'){
            const tamp = formatText('number-string', newValue.toString().replace(/[^0-9]+/g, "").slice(0,(maxLength)?(maxLength):(newValue.length)))
            tampValue = tamp[1]
            tampMaskedValue= tamp[0]
        }else{
            tampValue = newValue.slice(0,(maxLength)?(maxLength):(newValue.length))
            tampMaskedValue= tampValue
        }

        return ((isGetMasked)?(tampMaskedValue):(tampValue))
    }
    
    const onChange = (event) =>{
        if(!isDisabled && !isDisabledTyping && onChangeField){
            const newValue = (event.target)?(event.target.value):(event)
            onChangeField(getValue(newValue))
        }
    }

    const onFocus = () =>{
        setIsFocus(true)
        if(onFocusField){
            onFocusField()
        }
    }

    const onBlur = () =>{
        setIsFocus(false)

        if(onBlurField){
            onBlurField()
        }
        
        if(
            !isDisabled && onChangeField &&
            type!=='text-number' &&
            type!=='text-money'
        ){
            const newValue = value?.trim()
            if(newValue!==value){
                onChange(newValue)
            }
        }
    }

    const focusInput = () =>{
        inputRef.current.focus()
    }

    useEffect(()=>{
        if(!isRendered){
            setIsRendered(true)
        }
    },[])

    useEffect(()=>{
        if(isFocus && !isDisabledTyping){
            inputRef.current.focus()
        }
    },[isDisabledTyping])
    
    return(
        <div 
            className={`input-text-wrapper  ${(className)?(className):('')}`}
            style={{
                borderRadius:(isRounded)?('20px'):('6px'),
                padding: (isRounded)?('0px 16px'):('0px 10px'),
                borderColor: (isDisabled)?('var(--neutral300)'):(isError)?('var(--red500)'):(isFocus)?('var(--brand300)'):('var(--neutral400)'),
                boxShadow: (isFocus && !isDisabled)?(`0px 0px 2px 2px ${(isError)?('var(--red100)'):('var(--brand100)')}`):('none'),
                backgroundColor: (isDisabled)?('var(--neutral200)'):('var(--neutral0)'),
                maxWidth: (isFullWidth)?('100%'):('300px'),
                cursor: (isDisabled)?('default'):('text')
            }}
            onClick={focusInput}
        > 
            {
                (prefix)&&(
                    <div onClick={focusInput}>
                        <Text
                            className={'input-text-prefix'}
                            textLabel={prefix}
                            color={'gray500'}
                        />
                    </div>
                )
            }
            <input
                ref={inputRef}
                type={
                    (
                        type==='text-number'||
                        type==='text-money'||
                        type==='text-number-dashed'||
                        type==='text-number-string'
                    )?('tel'):('text')
                }
                className='input-text-input'
                style={{
                    fontSize:TEXTSIZES.small
                }}
                placeholder={placeholder}
                value={getValue(value, true)}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                disabled={isDisabled}
            />
            {
                (sufix)&&(
                    <div onClick={focusInput}>
                        <Text
                            className={'input-text-sufix'}
                            textLabel={sufix}
                            color={'var(--neutral500)'}
                        />
                    </div>
                )
            }
            {
                (maxLength && isShowCounter && !isDisabled && !sufix && type!=='text-number-dashed')&&(
                    <div onClick={focusInput}>
                        <Text
                            className={'input-text-count'}
                            textLabel={`${value.length}/${maxLength}`}
                            size={'xSmall'}
                            color={'var(--neutral500)'}
                        />
                    </div>
                )
            }
            {
                (maxNumber && isShowCounter && !isDisabled && !sufix)&&(
                    <div onClick={focusInput}>
                        <Text
                            className={'input-text-count'}
                            textLabel={`max. ${formatText('number', maxNumber)[0]}`}
                            size={'xSmall'}
                            color={'var(--neutral500)'}
                        />
                    </div>
                )
            }
            
        </div>
    )
}

export default InputText
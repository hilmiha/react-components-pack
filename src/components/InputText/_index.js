import './styles.css'
import { COLORS, TEXTSIZES } from '../../constant/theme'
import { useEffect, useRef, useState } from 'react'
import Text from '../Text'
import { formatText } from '../../untils/textFormatterUtils'

const InputText = ({
    //props
    className,
    value,
    inputType,

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

    //styles and looks
    placeholder,
    prefix,
    sufix,
    isHideCounter,
    isRounded,
    isFullWidth
}) =>{
    const inputRef = useRef(null)
    const [isFocus, setIsFocus] = useState(false)

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
    }
    
    const onChange = (event) =>{
        if(!isDisabled && !isDisabledTyping && onChangeField){
            const newValue = event.target.value
            onChangeField(newValue)
        }
    }

    const focusInput = () =>{
        inputRef.current.focus()
    }

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
                borderColor: (isDisabled)?(COLORS.gray400):(isError)?(COLORS.danger400):(isFocus)?(COLORS.primary400):(COLORS.gray400),
                boxShadow: (isFocus && !isDisabled)?(`0px 0px 2px 2px ${(isError)?(COLORS.danger100):(COLORS.primary100)}`):('none'),
                backgroundColor: (isDisabled)?(COLORS.gray100):('white'),
                maxWidth: (isFullWidth)?('100%'):('300px')
            }}
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
                type={inputType}
                className='input-text-input'
                style={{
                    fontSize:TEXTSIZES.small
                }}
                placeholder={placeholder}
                value={value}
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
                            color={'gray500'}
                        />
                    </div>
                )
            }
            {
                (maxLength && !isHideCounter && !isDisabled)&&(
                    <div onClick={focusInput}>
                        <Text
                            className={'input-text-count'}
                            textLabel={`${value.length}/${maxLength}`}
                            size={'xSmall'}
                            color={'gray400'}
                        />
                    </div>
                )
            }
            {
                (maxNumber && !isHideCounter && !isDisabled)&&(
                    <div onClick={focusInput}>
                        <Text
                            className={'input-text-count'}
                            textLabel={`max. ${formatText('number', maxNumber)[0]}`}
                            size={'xSmall'}
                            color={'gray400'}
                        />
                    </div>
                )
            }
            
        </div>
    )
}

export default InputText
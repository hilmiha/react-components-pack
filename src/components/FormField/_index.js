import './styles.css'
import Icons from '../Icons'
import InputText from '../InputText'
import Text from '../Text'
import Tooltip from '../Tooltip'
import { useEffect, useState } from 'react'
import { formatText } from '../../untils/textFormatterUtils'
import InputSelect from '../InputSelect'
import InputSelectMultiple from '../InputSelectMultiple'
import { join, map } from 'lodash'
import CheckBox from '../CheckBox'

const FormField = ({
    // props
    config,
    value,
    onChangeField,
    formErrorStatus,
    onValidateFileld,
    onLoadMoreOption,
    onSearchOption,
}) =>{
    const [isRendered, setIsRendered] = useState(false)
    const [isFieldTouched, setIsFieldTouched] = useState(false)
    const [maskedValue, setMaskedValue] = useState('')

    const onChange = (newValue, onTyping) =>{
        if(onChangeField){
            let tampValue = ''
            let tampMaskedValue = ''

            if(config.type==='text-no-space'){
                const tamp = formatText('text-no-space', newValue.slice(0,(config.maxLength)?(config.maxLength):(newValue.length)))
                tampValue = tamp[1]
                tampMaskedValue= tamp[0]
            }else if(config.type==='text-number'){
                const tamp = formatText('number', newValue)
                if(tamp[1] > config.maxNumber){
                    tampValue = value
                    tampMaskedValue= maskedValue
                }else if(newValue==='' && config.isMinNumberZero){
                    tampValue = 0
                    tampMaskedValue= '0'
                }else{
                    tampValue = tamp[1]
                    tampMaskedValue= tamp[0]
                }
            }else if(config.type==='text-money'){
                if(newValue==='' && !isRendered){
                    tampValue = ''
                    tampMaskedValue = ''
                }else{
                    const tamp = formatText('number', newValue)

                    if(tamp[1] > config.maxNumber){
                        tampValue = value
                        tampMaskedValue= maskedValue
                    }else if(newValue==='' && config.isMinNumberZero){
                        tampValue = 0
                        tampMaskedValue= (isRendered)?('0'):('0.00')
                    }else{
                        tampValue = tamp[1]
                        tampMaskedValue= (isRendered)?(tamp[0]):(`${tamp[0]}.00`)
                    }
                }
            }else if(config.type==='text-number-dashed'){
                const tamp = formatText('number-dashed', newValue.toString().replace(/[^0-9]+/g, "").slice(0,(config.maxLength)?(config.maxLength):(newValue.length)))
                tampValue = tamp[1]
                tampMaskedValue= tamp[0]
            }else if(config.type==='text-number-string'){
                const tamp = formatText('number-string', newValue.toString().replace(/[^0-9]+/g, "").slice(0,(config.maxLength)?(config.maxLength):(newValue.length)))
                tampValue = tamp[1]
                tampMaskedValue= tamp[0]
            }else{
                tampValue = newValue.slice(0,(config.maxLength)?(config.maxLength):(newValue.length))
                tampMaskedValue= tampValue
            }

            if(onTyping){
                setIsFieldTouched(true)
                onChangeField(tampValue)
                setMaskedValue(tampMaskedValue)
            }else{
                setMaskedValue(tampMaskedValue)
            }
        }
    }

    const onSelect = (newValue) =>{
        onChangeField(newValue)
        if(config.type==='select'){
            onValidateFileld(newValue)
        }
    }

    const onCloseDropdown = (newValue) =>{
        onValidateFileld(newValue)
    }

    const onBlur = () =>{
        if(onValidateFileld && isFieldTouched){
            onValidateFileld(value)
        }

        if(
            !config.isDisabled && onChangeField &&
            config.type!=='text-number'
        ){
            if(config.type==='text-money'){
                if(value!=='' && value!==null && value!==undefined){
                    setMaskedValue(`${maskedValue}.00`)
                }
            }else{
                const newValue = value?.trim()
                if(newValue!==value){
                    onChange(newValue)
                }
            }
            
        }
    }

    const onFocus = () =>{
        if(config.type==='text-money'){
            if(value!=='' || value!==null || value!==undefined){
                setMaskedValue(maskedValue.split('.')[0])
            }
        }
    }

    useEffect(()=>{
        if(!isRendered){
            setIsRendered(true)
        }
    },[])

    useEffect(()=>{
        if(
            config.type!=='select' &&
            config.type!=='select-multi'
        ){
            onChange(value)
        }
    },[value])

    return(
        <div className={`form-field-wrapper ${config.className?(config.className):('')}`}>
            {
                (config.formLabel)&&(
                    <div className='form-field-label-wraper'>
                        <Text textLabel={config.formLabel} isEllipsistatic={true}/>
                        {
                            (config.validationList?.includes('mandatory'))&&(
                                <Text textLabel={' *'} color={'danger500'}/>
                            )
                        }
                        {
                            (config.formTooltip)&&(
                                <Tooltip
                                    label={config.formTooltip}
                                    placement={'right-end'}
                                >
                                    <Icons className={'form-field-label-tooltip'} iconName={'info'} color={'gray400'}/>
                                </Tooltip>
                            )
                        }
                    </div>
                )
            }
            {
                (
                    config.type==='text' ||
                    config.type==='text-no-space' || 
                    config.type==='text-number' || 
                    config.type==='text-money' ||
                    config.type==='text-number-dashed' ||
                    config.type==='text-number-string'
                )&&(
                    <InputText
                        placeholder={config.placeholder}
                        value={maskedValue} 
                        onChangeField={(newValue)=>{onChange(newValue, true)}} 
                        onBlurField={onBlur}
                        onFocusField={onFocus}
                        maxLength={config.maxLength}
                        maxNumber={config.maxNumber}
                        isRounded={config.isRounded}
                        isDisabled={config.isDisabled}
                        isDisabledTyping={config.isDisabledTyping}
                        isError={formErrorStatus?.status}
                        isFullWidth={config.isFullWidth}
                        isHideCounter={
                            !config.isShowCounter || 
                            config.prefix ||
                            config.sufix ||
                            config.type==='text-number-dashed'
                        }
                        prefix={config.prefix}
                        sufix={config.sufix}
                        inputType={
                            (
                                config.type==='text-number'||
                                config.type==='text-money'||
                                config.type==='text-number-dashed'||
                                config.type==='text-number-string'
                            )?('tel'):('text')
                        }
                    />
                )
            }
            {
                (
                    config.type==='select' 
                )&&(
                    <InputSelect
                        placeholder={config.placeholder}
                        selectionList={config.selectionList?(config.selectionList):([])}
                        value={value} 
                        onSelectOption={onSelect}
                        onLoadMoreOption={onLoadMoreOption}
                        isRounded={config.isRounded}
                        isDisabled={config.isDisabled}
                        isError={formErrorStatus?.status}
                        isFullWidth={config.isFullWidth}
                        isAllOptionNotLoaded={config.isAllOptionNotLoaded}
                        onSearchOption={onSearchOption}
                        isOptionReady={config.isOptionReady}
                    />
                )
            }
            {
                (
                    config.type==='select-multi' 
                )&&(
                    <InputSelectMultiple
                        placeholder={config.placeholder}
                        selectionList={config.selectionList?(config.selectionList):([])}
                        value={value} 
                        onSelectOption={onSelect}
                        onLoadMoreOption={onLoadMoreOption}
                        isRounded={config.isRounded}
                        isDisabled={config.isDisabled}
                        isError={formErrorStatus?.status}
                        isFullWidth={config.isFullWidth}
                        isAllOptionNotLoaded={config.isAllOptionNotLoaded}
                        onSearchOption={onSearchOption}
                        isOptionReady={config.isOptionReady}
                        maxSelect={config.maxSelect}
                        onCloseDropdown={onCloseDropdown}
                    />
                )
            }
            {
                (
                    config.type==='check-box' 
                )&&(
                    <CheckBox/>
                )
            }
            {
                (formErrorStatus?.status)&&(
                    <Text className={'form-field-error-message'} textLabel={formErrorStatus.message} color={'danger500'} size={'xSmall'}/>
                )
            }
        </div>
    )
}

export default FormField
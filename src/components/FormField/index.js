import './styles.css'
import Icons from '../Icons'
import InputText from '../InputText'
import Text from '../Text'
import Tooltip from '../Tooltip'
import { useEffect, useState } from 'react'
import InputSelect from '../InputSelect'
import InputSelectMultiple from '../InputSelectMultiple'
import InputCheckbox from '../InputCheckbox'
import InputCheckBoxGroup from '../InputCheckboxGroup'
import InputDatePicker from '../InputDatePicker'

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

    const onChange = (newValue) =>{
        if(onChangeField){
            onChangeField(newValue)
        }

        if(!isFieldTouched){
            setIsFieldTouched(true)
        }
    }

    const onSelect = (newValue) =>{
        onChangeField(newValue)
        if(!isFieldTouched){
            setIsFieldTouched(true)
        }
        if(
            (config.type==='select' ||
            config.type==='check-box'||
            config.type==='check-box-group')
            && isFieldTouched && onValidateFileld
        ){
            onValidateFileld(newValue, config.validationList)
        }
    }

    const onCloseDropdown = (newValue) =>{
        if(onValidateFileld && isFieldTouched){
            onValidateFileld(newValue, config.validationList)
        }
    }

    const onBlur = () =>{
        if(onValidateFileld && isFieldTouched){
            onValidateFileld(value, config.validationList)
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

    return(
        <div className={`form-field-wrapper ${config.className?(config.className):('')}`}>
            {
                (config.formLabel)&&(
                    <div className='form-field-label-wraper'>
                        <Text textLabel={config.formLabel} isEllipsistatic={true}/>
                        {
                            (config.validationList?.includes('mandatory'))&&(
                                <Text textLabel={' *'} color={'var(--red500)'}/>
                            )
                        }
                        {
                            (config.formTooltip)&&(
                                <Tooltip
                                    label={config.formTooltip}
                                    placement={'right-end'}
                                >
                                    <Icons className={'form-field-label-tooltip'} iconName={'info'} color={'var(--neutral400)'}/>
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
                        type={config.type}
                        placeholder={config.placeholder}
                        value={value} 
                        onChangeField={onChange} 
                        onBlurField={onBlur}
                        onFocusField={onFocus}
                        maxLength={config.maxLength}
                        maxNumber={config.maxNumber}
                        isRounded={config.isRounded}
                        isDisabled={config.isDisabled}
                        isDisabledTyping={config.isDisabledTyping}
                        isError={formErrorStatus?.status}
                        isFullWidth={config.isFullWidth}
                        isShowCounter={config.isShowCounter}
                        isMinNumberZero={config.isMinNumberZero}
                        prefix={config.prefix}
                        prefixIconName={config.prefixIconName}
                        sufix={config.sufix}
                        sufixIconName={config.sufixIconName}
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
                        prefix={config.prefix}
                        prefixIconName={config.prefixIconName}
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
                        prefix={config.prefix}
                        prefixIconName={config.prefixIconName}
                    />
                )
            }
            {
                (
                    config.type==='check-box' 
                )&&(
                    <InputCheckbox
                        value={value}
                        isDisabled={config.isDisabled}
                        label={config.label}
                        onSelectOption={onSelect}
                        isDash={false}
                        isEllipsistatic={config.isEllipsistatic}
                    />
                )
            }
            {
                (
                    config.type==='check-box-group' 
                )&&(
                    <InputCheckBoxGroup
                        value={value}
                        listCheckbox={config.listCheckbox}
                        onSelectOption={onSelect}
                        isEllipsistatic={config.isEllipsistatic}
                    />
                )
            }
            {
                (
                    config.type==='date-picker' 
                )&&(
                    <InputDatePicker
                        value={value}
                        type={config.typeDatepicker}
                        maxSelect={config.maxSelect}
                        onSelectOption={onSelect}
                        onCloseDropdown={onCloseDropdown}
                        dayOpenBeforeToday={config.dayOpenBeforeToday}
                        dayOpenAfterToday={config.dayOpenAfterToday}
                        isDisabled={config.isDisabled}
                        isError={formErrorStatus?.status}
                        placeholder={config.placeholder}
                        isFullWidth={config.isFullWidth}
                        isRounded={config.isRounded}
                    />
                )
            }
            {
                (formErrorStatus?.status)&&(
                    <div className='form-field-error-message-wrapper'>
                        <Icons iconName={'danger-fill'} color={'var(--red500)'}/>
                        <Text className={'form-field-error-message'} textLabel={formErrorStatus.message} color={'var(--red500)'} size={'xSmall'}/>
                    </div>
                )
            }
        </div>
    )
}

export default FormField
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
import CheckBoxGroup from '../CheckBoxGroup'

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
        if(
            config.type==='select' ||
            config.type==='check-box'||
            config.type==='check-box-group'
        ){
            onValidateFileld(newValue, config.validationList)
        }
    }

    const onCloseDropdown = (newValue) =>{
        if(onValidateFileld){
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
                        sufix={config.sufix}
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
                    <CheckBox
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
                    <CheckBoxGroup
                        value={value}
                        listCheckbox={config.listCheckbox}
                        onSelectOption={onSelect}
                        isEllipsistatic={config.isEllipsistatic}
                    />
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
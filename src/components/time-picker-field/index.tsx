import { processClassname } from '../../helper'
import './styles.scss'
import { errorType } from '../text-field'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, autoUpdate, flip, offset, shift, useDismiss, useFloating, useInteractions } from '@floating-ui/react'
import { PiWarningDiamondFill, PiX, PiXBold } from 'react-icons/pi'
import { GlobalContext, GlobalContextType } from '../../context/globalcontext'
import IconButton from '../icon-button'
import { useLocation, useNavigate } from 'react-router-dom'
import TimePicker, { timePickerValueType } from '../time-picker'

export type TimePickerFieldProps = {
    className?: String
    type:'ampm' | '24hr'
    txtLabel?:string
    txtPlaceholder?:string
    value:timePickerValueType
    onChange?:(newValue:timePickerValueType) => void ,
    onValidate?: (errorResult:errorType, newValue:timePickerValueType, config?:Record<any, any>) => void,
    error?: errorType
    isDisabled?:boolean
    isShowClear?:boolean
    config?: {
        isMandatory?: boolean,
        isHideSecond?:boolean,
        hourList?:number[]
        minuteList?:number[]
        secondList?:number[]
    }
}

const TimePickerField = ({
    className,
    type = 'ampm',
    value,
    txtLabel,
    txtPlaceholder,
    onChange,
    onValidate,
    error,
    config,
    isDisabled = false,
    isShowClear = true
}:TimePickerFieldProps) =>{
    const navigate = useNavigate()
    const location = useLocation()
    
    const [isFieldTouched, setIsFieldTouched] = useState(false);
    const isMandatory = config?.isMandatory
    const isHideSecond = config?.isHideSecond
    
    const {
        mediaSize
    } = useContext(GlobalContext) as GlobalContextType;

    //---- Start of Popup thingy 
    const [isOpenDropdown,setIsOpenDropdown] = useState(false)
    const { refs, floatingStyles, context } = useFloating({
        placement:'bottom-start',
        open: isOpenDropdown,
        onOpenChange: ()=>{onCloseDropdown()},
        middleware: [
            offset(8),
            shift(),
            flip({
                fallbackPlacements:['bottom-start', 'bottom-end', "bottom", 'top-start', 'top-end', "top", "right-start", 'right-end', "left-start", "left-end"],
                padding: 1,
            })
        ],
        whileElementsMounted: autoUpdate
    }); 

    const dismiss = useDismiss(context,{
        outsidePressEvent: 'click'
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        dismiss
    ]);
    // ----- End of Popup Thingy

    const validateField = (value:timePickerValueType) =>{
        let tampError:errorType = {isError:false, errorMessage:''}
        let error = false
        
        if(isMandatory && !error){
            if(
                value.hour===undefined ||
                value.minute===undefined ||
                value.second===undefined 
            ){
                error = true
            }

            if(error){
                tampError.isError = true
                tampError.errorMessage = "This field can't be empty!"
            }
        }

        return tampError
    }

    const thisOnChange = (newValue:timePickerValueType) =>{
        if(!isDisabled){
            if(onChange){
                onChange(newValue)
            }
    
            if(!isFieldTouched){
                setIsFieldTouched(true)
            }
        }
    }

    const processValue = () =>{
        
        const convertHour = (hour:number | undefined) =>{
            if(type==='ampm' && hour!==undefined){
                if(hour===0){
                    return('12')
                }if(hour===12){
                    return('12')
                }else if(hour>12){
                    return(`${(hour-12)}`.length===1?(`0${(hour-12)}`):(`${(hour-12)}`))
                }else{
                    return(`${(hour)}`.length===1?(`0${(hour)}`):(`${(hour)}`))
                }
            }else if(type==='24hr' && hour!==undefined){
                return(`${(hour)}`.length===1?(`0${(hour)}`):(`${(hour)}`))
            }else{
                return('--')
            }
        }

        const convertMinute = (minute:number | undefined) =>{
            if( minute!==undefined){
                return(`${(minute)}`.length===1?(`0${(minute)}`):(`${(minute)}`))
            }else{
                return('--')
            }
        }

        const isAmPm = (hour:number | undefined) =>{
            if(hour!==undefined){
                if(hour===0){
                    return('AM')
                }if(hour===12){
                    return('PM')
                }else if(hour>12){
                    return('PM')
                }else{
                    return('AM')
                }
            }else{
                return('AM')
            }
        }
        if(
            value.hour!==undefined &&
            value.minute!==undefined &&
            value.second!==undefined 
        ){
            const tamp = `${convertHour(value.hour)} : ${convertMinute(value.minute)}${isHideSecond?(''):(` : ${convertMinute(value.second)}`)}${type==='ampm'?(` ${isAmPm(value.hour)}`):('')}`
            return tamp
        }

        return('')
    }
    const valueText = useMemo(()=>{
        return processValue()
    },[value])

    const onClickInputField = () =>{
        if(!isDisabled){
            setIsOpenDropdown(!isOpenDropdown)
            if(mediaSize<1){
                navigate(`${location.hash}#modal-selection-open`)
            }
        }
    }

    const onCloseDropdown = () =>{
        setIsOpenDropdown(false)
        if(location.hash.includes('#modal-selection-open')){
            navigate(-1)
        }
    }

    useEffect(()=>{
        if(onValidate && isFieldTouched && !isOpenDropdown){
            const configTamp = config
            onValidate(validateField(value), value, configTamp)
        }
    },[isOpenDropdown])

    useEffect(()=>{
        if(!location.hash.includes('#modal-selection-open')){
            setIsOpenDropdown(false)
        }
    },[location])

    useEffect(()=>{
        if(mediaSize<1 && !location.hash.includes('#modal-selection-open') && isOpenDropdown){
            navigate(`${location.hash}#modal-selection-open`)
        }
    },[mediaSize])

    const clearSelection = (isFormButton?:boolean) =>{
        thisOnChange({
            hour:undefined,
            minute:undefined,
            second:undefined
        })
        if(isFormButton){
            let formField = refs.domReference.current as HTMLButtonElement
            setTimeout(() => {
                formField.focus()
            }, 10);
        }
    }
    const calendarContent = () =>{
        return(
            <>
                <div className="search-container">
                    <button
                        className={
                            processClassname(`field-option-clear-selection
                            ${(
                                (
                                    value.hour===undefined &&
                                    value.minute===undefined &&
                                    value.second===undefined
                                )
                            )?('disabled'):('')}`)  
                        }
                        onClick={()=>{clearSelection()}}
                        disabled={
                            Array.isArray(value)?(
                                value.length===0
                            ):(
                                value===undefined
                            )
                        }
                    >
                        Clear Selection
                    </button>
                </div>
                <div
                    className={
                        processClassname(`time-picker-popup-content
                        ${mediaSize<1?('mobile'):('')}`)  
                    }
                    // style={{display:'flex', justifyContent:'center'}}
                >
                    <TimePicker
                        value={value}
                        onChange={thisOnChange}
                        type={type}
                        isHideSecond={isHideSecond}
                        hourListConst={config?.hourList}
                        minuteListConst={config?.minuteList}
                        secondListConst={config?.secondList}
                        error={{
                            hour:(error?.isError && value.hour===undefined && isMandatory),
                            minute:(error?.isError && value.minute===undefined && isMandatory),
                            second:(error?.isError && value.second===undefined && isMandatory)
                        }}
                    />
                </div>
            </>
        )
    }
    return(
        <div
            className={
                processClassname(`time-picker-field field
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
                <button 
                    className={
                        processClassname(`selection-field-input-container field-container
                        ${(isShowClear)?('is-show-clear'):('')}
                        ${(error?.isError)?('error'):('')}
                        ${(isDisabled)?('disabled'):('')}`)  
                    }
                    ref={refs.setReference} {...getReferenceProps()}
                    onClick={onClickInputField}
                    disabled={isDisabled}
                >
                    <div className="selection-field-input">
                        {
                            (txtPlaceholder && !valueText)&&(
                                <span className='field-placeholder'>{txtPlaceholder}</span>
                            )
                        }
                        {
                            (valueText)&&(
                                <span className='selection-field-input-value'>{valueText}</span>
                            )
                        }
                    </div>
                </button>
                {
                    (valueText && !isOpenDropdown && !isDisabled && isShowClear)&&(
                        <IconButton
                            className="clear-button"
                            appearance="subtle"
                            spacing="compact"
                            onClick={()=>{clearSelection(true)}}
                            Icon={<PiX/>}
                        />
                    )
                }
            </div>
            

            {(isOpenDropdown && mediaSize>0) && (
                <FloatingPortal>
                    <FloatingFocusManager
                        initialFocus={-1}
                        context={context} 
                        order={['reference', 'content']}
                        modal={true}
                        closeOnFocusOut={true}
                    >
                        <div className='time-picker-field-dropdown'>
                            <div className='field-option-dropdown-menu' ref={refs.setFloating} {...getFloatingProps()} style={{...floatingStyles}}>
                                {calendarContent()}
                            </div>
                        </div>
                    </FloatingFocusManager>
                </FloatingPortal>
            )}
            {(isOpenDropdown && mediaSize<1) && (
                <FloatingPortal>
                    <FloatingOverlay className="dropdown-menu-date-picker-mobile-overlay" lockScroll>
                        <FloatingFocusManager context={context}>
                            <div
                                className={
                                    processClassname(`dropdown-menu-selection-mobile-box`)  
                                }
                                ref={refs.setFloating}
                                {...getFloatingProps()}
                            >
                                <div className="dropdown-menu-mobile-header">
                                    <span className="dropdown-menu-mobile-header-title">{txtLabel?txtLabel:'Options'}</span>
                                    <IconButton
                                        Icon={<PiXBold/>}
                                        appearance="subtle"
                                        spacing="compact"
                                        onClick={onCloseDropdown}
                                    />
                                </div>
                                <div className="dropdown-menu-mobile-content time-picker-mobile-view">
                                    {calendarContent()}
                                </div>
                            </div>
                        </FloatingFocusManager>
                    </FloatingOverlay>
                </FloatingPortal>
            )}
            {
                    (error?.isError)&&(
                        <span className='field-error-message'>
                            <PiWarningDiamondFill/> {error.errorMessage}
                        </span>
                    )
                }
        </div>
    )
}

export default TimePickerField
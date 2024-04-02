import { processClassname } from '../../helper'
import './styles.scss'
import DatePicker, { datePickerType, datePickerValueType } from '../date-picker'
import { isDateRange } from 'react-day-picker'
import { errorType } from '../text-field'
import { useContext, useEffect, useMemo, useState } from 'react'
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, autoUpdate, flip, offset, shift, useDismiss, useFloating, useInteractions } from '@floating-ui/react'
import { PiWarningDiamondFill, PiXBold } from 'react-icons/pi'
import { format, isDate } from 'date-fns'
import { GlobalContext, GlobalContextType } from '../../context/globalcontext'
import IconButton from '../icon-button'
import { useLocation, useNavigate } from 'react-router-dom'

type Props = {
    className?: String
    type?:datePickerType
    txtLabel?:string
    txtPlaceholder?:string
    value?:datePickerValueType
    onChange?: (newValue:datePickerValueType) => void,
    // onValidate?: (errorResult:errorType, newValue:multiSelectiomValueType, config?:Record<any, any>) => void,
    error?: errorType
    config?: {
        prefix?: string | JSX.Element,
        sufix?: string | JSX.Element,
        isMandatory?: boolean,
        daysAfterToday?: number,
        daysBeforeToday?: number,
        maxSelection?: number
    }
}

const DatePickerField = ({
    className,
    type = 'single',
    value,
    txtLabel,
    txtPlaceholder,
    onChange,
    error,
    config
}:Props) =>{
    const navigate = useNavigate()
    const location = useLocation()
    
    const isMandatory = config?.isMandatory
    const prefix = config?.prefix
    const sufix = config?.sufix

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
                padding: 20,
            })
        ],
        whileElementsMounted: autoUpdate
    }); 

    const dismiss = useDismiss(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        dismiss
    ]);
    // ----- End of Popup Thingy

    const thisOnChange = (newValue:datePickerValueType) =>{
        if(onChange){
            onChange(newValue)
        }
    }

    const processValue = () =>{
        if(type==='single' && isDate(value)){ 
            return(format(new Date(value), 'dd MMM yyyy'))
        }else if(type==='multiple' && Array.isArray(value)){
            return(value.map((itm)=>(format(new Date(itm), 'dd MMM yyyy'))).join(', '))
        }else if(type==='range' && isDateRange(value)){
            const from = value.from
            const to = value.to
            if(from || to){
                return(`${from?(format(new Date(from), 'dd MMM yyyy')):('')} - ${to?(`${format(new Date(to), 'dd MMM yyyy')}`):('')}`)
            }
        }
        return('')
    }
    const valueText = useMemo(()=>{
        return processValue()
    },[value])

    const onClickInputField = () =>{
        setIsOpenDropdown(!isOpenDropdown)
        if(mediaSize<1){
            navigate(`${location.hash}#modal-selection-open`)
        }
    }

    const onCloseDropdown = () =>{
        if(type==='range' && isDateRange(value) && onChange){
            if(value.from && !value.to){
                onChange({...value, to:value.from})
            }
        }
        setIsOpenDropdown(false)
        if(location.hash.includes('#modal-selection-open')){
            navigate(-1)
        }
    }

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

    const calendarContent = () =>{
        return(
            <DatePicker
                type={type}
                value={value}
                daysAfterToday={config?.daysAfterToday}
                daysBeforeToday={config?.daysBeforeToday}
                maxSelection={config?.maxSelection}
                onchange={(newValue)=>{thisOnChange(newValue)}}
            />
        )
    }
    return(
        <div
            className={
                processClassname(`date-picker-field field
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
            <button 
                className='selection-field-input-container field-container'
                ref={refs.setReference} {...getReferenceProps()}
                onClick={onClickInputField}
            >
                {(prefix)&&(
                    <span className='field-prefix-sufix'>{prefix}</span>
                )}
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
                {(sufix)&&(
                    <span className='field-prefix-sufix'>{sufix}</span>
                )}
            </button>

            {(isOpenDropdown && mediaSize>0) && (
                <FloatingFocusManager
                    initialFocus={-1}
                    context={context} 
                    order={['reference', 'content']}
                    modal={true}
                    closeOnFocusOut={true}
                >
                    <div className='field-option-dropdown-menu' ref={refs.setFloating} {...getFloatingProps()} style={{...floatingStyles}}>
                        {calendarContent()}
                    </div>
                </FloatingFocusManager>
                
            )}
            {(isOpenDropdown && mediaSize<1) && (
                <FloatingPortal>
                    <FloatingOverlay className="dropdown-menu-mobile-overlay" lockScroll>
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
                                        Icon={PiXBold}
                                        appearance="subtle"
                                        spacing="compact"
                                        onClick={onCloseDropdown}
                                    />
                                </div>
                                <div className="dropdown-menu-mobile-content datepicker-mobile-view">
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

export default DatePickerField
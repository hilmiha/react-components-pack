import { processClassname } from '../../helper'
import './styles.scss'
import DatePicker, { datePickerType, datePickerValueType } from '../date-picker'
import { isDateRange } from 'react-day-picker'
import { errorType } from '../text-field'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, autoUpdate, flip, offset, shift, useDismiss, useFloating, useInteractions } from '@floating-ui/react'
import { PiWarningDiamondFill, PiXBold } from 'react-icons/pi'
import { format, isDate } from 'date-fns'
import { GlobalContext, GlobalContextType } from '../../context/globalcontext'
import IconButton from '../icon-button'
import { useLocation, useNavigate } from 'react-router-dom'
import { sortBy } from 'lodash'

export type DatePickerFieldProps = {
    className?: String
    type:datePickerType
    txtLabel?:string
    txtPlaceholder?:string
    value:datePickerValueType
    onChange:(newValue:datePickerValueType) => void ,
    onValidate?: (errorResult:errorType, newValue:datePickerValueType, config?:Record<any, any>) => void,
    error?: errorType
    config?: {
        prefix?: string | JSX.Element,
        sufix?: string | JSX.Element,
        isMandatory?: boolean,
        daysAfterToday?: number,
        daysBeforeToday?: number,
        maxSelection?: number,
        fromDate?:Date,
        toDate?:Date,
        defaultMonth?:Date
    }
}

const DatePickerField = ({
    className,
    type = 'single',
    value,
    txtLabel,
    txtPlaceholder,
    onChange,
    onValidate,
    error,
    config
}:DatePickerFieldProps) =>{
    const navigate = useNavigate()
    const location = useLocation()
    
    const [isFieldTouched, setIsFieldTouched] = useState(false);
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

    const dismiss = useDismiss(context,{
        outsidePressEvent: 'click'
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        dismiss
    ]);
    // ----- End of Popup Thingy

    const validateField = (value:datePickerValueType) =>{
        let tampError:errorType = {isError:false, errorMessage:''}
        let error = false
        
        if(isMandatory && !error){
            if(!value){
                error = true
            }

            if(Array.isArray(value) && value.length===0 && !error){
                error = true
            }

            if(isDateRange(value) && !value.from && !value.to && !error){
                error = true
            }

            if(error){
                tampError.isError = true
                tampError.errorMessage = "This field can't be empty!"
            }
        }

        return tampError
    }

    const thisOnChange = (newValue:datePickerValueType) =>{
        if(onChange){
            onChange(newValue)
        }

        if(!isFieldTouched){
            setIsFieldTouched(true)
        }
    }

    const processValue = () =>{
        if(type==='single' && isDate(value)){ 
            return(format(new Date(value), 'dd MMM yyyy'))
        }else if(type==='multiple' && Array.isArray(value)){
            return(sortBy(value).map((itm)=>(format(new Date(itm), 'dd MMM yyyy'))).join(', '))
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

    const placeholderElementRef = useRef(null)
    const [resized, setResized] = useState(false)
    const [hidden, setHidden] = useState(0)
    
    function getTitleSuffix() {
        let element:any = placeholderElementRef.current
        var count = 0;

        if(element){
            var text = valueText
            element.innerHTML = '';
            for (var i = 0; i < text.length; i++) {
                var newNode = document.createElement('span');
                newNode.appendChild(document.createTextNode(text.charAt(i)));
                element.appendChild(newNode);
                if (newNode.offsetLeft < element.offsetWidth) {
                    count++;
                }
            }
            element.innerHTML = valueText;
        }

        let substr = valueText;
        substr = substr.substring(count - 4);
        let sisa = substr.split(',').length - 1;

        setHidden(sisa);
    }

    useEffect(()=>{
        getTitleSuffix()
    },[value, resized])


    useEffect(()=>{
        if (!placeholderElementRef.current) {
            return;
        }
        var doit:any;

        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(doit);
            doit = setTimeout(function() {
                setResized((prv)=>{return !prv})
            }, 20);
        });

        resizeObserver.observe(placeholderElementRef.current);
        
        return function cleanup() {
            clearTimeout(doit);
            resizeObserver.disconnect();
        }
    },[])

    const clearSelection = () =>{
        thisOnChange(undefined)
    }
    const calendarContent = () =>{
        return(
            <>
                {
                    (type!=='single')&&(
                        <div className="search-container">
                            <button
                                className={
                                    processClassname(`field-option-clear-selection
                                    ${(
                                        Array.isArray(value)?(
                                            value.length===0
                                        ):(
                                            value===undefined
                                        )
                                    )?('disabled'):('')}`)  
                                }
                                onClick={clearSelection}
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
                    )
                }
                
                <DatePicker
                    type={type}
                    value={value}
                    daysAfterToday={config?.daysAfterToday}
                    daysBeforeToday={config?.daysBeforeToday}
                    fromDate={config?.fromDate}
                    toDate={config?.toDate}
                    defaultMonth={config?.defaultMonth}
                    maxSelection={config?.maxSelection}
                    onchange={(newValue)=>{thisOnChange(newValue)}}
                />
            </>
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
                className={
                    processClassname(`selection-field-input-container field-container
                    ${(error?.isError)?('error'):('')}`)  
                }
                ref={refs.setReference} {...getReferenceProps()}
                onClick={onClickInputField}
            >
                {(prefix)&&(
                    <span className='field-prefix-sufix'>{prefix}</span>
                )}
                <div className="selection-field-input">
                    {
                        (type!=='multiple')&&(
                            <>
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
                            </>
                        )
                    }
                    {
                        (type==='multiple')&&(
                            <>
                                <span style={{float:"right", color:(hidden===0)?("transparent"):('hsl(var(--color-neutral-1100))')}}>{`and ${hidden} more`}</span>
                                <div ref={placeholderElementRef} className='selection-field-input-value'>{valueText}</div>
                                <span className='field-placeholder' style={{display:`${value!==undefined && (Array.isArray(value)?(value.length>0):(false))?('none'):('unset')}`}}>{txtPlaceholder}</span>
                            </>
                        )
                    }
                </div>
                {(sufix)&&(
                    <span className='field-prefix-sufix'>{sufix}</span>
                )}
            </button>

            {(isOpenDropdown && mediaSize>0) && (
                <FloatingPortal>
                    <FloatingFocusManager
                        initialFocus={-1}
                        context={context} 
                        order={['reference', 'content']}
                        modal={true}
                        closeOnFocusOut={true}
                    >
                        <div className='date-picker-field-dropdown'>
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
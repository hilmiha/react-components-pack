import { useEffect, useMemo, useRef, useState } from 'react'
import './TimePickerWheelStyles.scss'
import { useFocusController, useFocusState } from 'react-focus-lock'
import { processClassname } from '../../helper';
import { timePickerValueType } from './index';
import { intersection } from 'lodash';

type TimePickerProps = {
    type: 'ampm'|'24hr'
    isAmPm?:boolean
    value?:timePickerValueType
    onChange?:(newValue:timePickerValueType)=>void
    isHideSecond?:boolean
    hourListConst?:number[]
    minuteListConst?:number[]
    secondListConst?:number[]
}

const ButtonOption = ({
    label, 
    value,
    isAutoFocus,
    isSelected,
    isDisabled,
    onClick
}:{
    label:string,
    value:string | number,
    isAutoFocus?:boolean,
    isSelected?:boolean,
    isDisabled?:boolean,
    onClick?:(itmValue: string | number, buttonRef:React.RefObject<HTMLButtonElement>)=>void
}) =>{
    const { active, onFocus, ref } = useFocusState();

    const thisOnClick = (value:string|number) =>{
        if(onClick){
            onClick(value, ref as React.RefObject<HTMLButtonElement>)
        }
    }

    return(
        <section className='time-picker-option-section'>
            <button 
                className={
                    processClassname(`time-picker-option
                    ${isSelected?('selected'):('')}
                    ${isDisabled?('disabled'):('')}`)  
                } 
                tabIndex={(active || isAutoFocus) ? undefined : -1} 
                onFocus={onFocus} 
                ref={ref as React.RefObject<HTMLButtonElement>}
                onClick={()=>{thisOnClick(value)}}
                disabled={isDisabled}
            >
                {label}
            </button>
        </section>
    )
}

const DivOptions = ({
    list,
    value,
    onSelect
}:{
    list:number[],
    value:number | undefined,
    onSelect:(newValue:number | string)=>void
}) =>{
    const divRef = useRef<HTMLDivElement>(null)
    const { focusNext, focusPrev } = useFocusController(divRef)

    const onKey = (event:React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            focusNext({ onlyTabbable: false });
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault();
            focusPrev({ onlyTabbable: false });
        }
    };

    const thisOnClick = (newValue:number | string, buttonRef:React.RefObject<HTMLButtonElement>) =>{
        onSelect(newValue)
    }
    const [isRendered, setIsRendered] = useState(false)

    useEffect(()=>{
        setIsRendered(true)
    },[])

    useEffect(()=>{
        if(value){
            if(divRef.current){
                const elementButton = (divRef.current.querySelector('.selected') as HTMLButtonElement)
                if(elementButton){
                    divRef.current.scrollTo({
                        top: elementButton.offsetTop,
                        left: 0,
                        behavior: ((isRendered)?"smooth":undefined)
                    })
                }
            }
        }else{
            if(divRef.current){
                divRef.current.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: ((isRendered)?"smooth":undefined)
                })
            }
        }
    },[value])
    return(
        <div className='options-list-container' ref={divRef} onKeyDown={onKey}>
            {
                (true)&&(
                    list.map((itm, index)=>(
                        <ButtonOption 
                            key={index} 
                            label={`${`${itm}`.length===1?(`0${itm}`):(`${itm}`)}`} 
                            value={itm} 
                            isAutoFocus={value!==undefined?(value===itm):(index===0)} 
                            isSelected={value===itm} 
                            onClick={(newValue, buttonRef)=>{thisOnClick(newValue, buttonRef)}}
                        />
                    ))
                )
            }
            <ButtonOption label='-' value={''} isDisabled/>
            <ButtonOption label='-' value={''} isDisabled/>
        </div>
    )
}

const TimePickerWheel = ({
    type = 'ampm',
    value,
    onChange,
    isHideSecond = false,
    hourListConst = Array.apply(null, Array(24)).map(function (x, i) { return i; }),
    minuteListConst = Array.apply(null, Array(60)).map(function (x, i) { return i; }),
    secondListConst = Array.apply(null, Array(60)).map(function (x, i) { return i; })
}:TimePickerProps) =>{

    const hourList = useMemo(()=>{
        return intersection(
            Array.apply(null, Array(type==='ampm'?(12):(24))).map(function (x, i) { return type==='ampm'?(i+1):(i); }),
            hourListConst
        )
    },[type, hourListConst])
    const minuteList = useMemo(()=>{
        return intersection(
            Array.apply(null, Array(60)).map(function (x, i) { return i; }),
            minuteListConst
        )
    },[minuteListConst])
    const secondList = useMemo(()=>{
        return intersection(
            Array.apply(null, Array(60)).map(function (x, i) { return i; }),
            secondListConst
        )
    },[secondListConst])

    const thisOnChange = (inputType:'hour'|'minute'|'second', newValue:number | string | undefined) =>{
        if(onChange && (typeof newValue==='number' || newValue===undefined)){
            const tamp:timePickerValueType = {
                hour:value?.hour,
                minute:value?.minute,
                second:value?.second,
            }
            tamp[inputType] = newValue
            onChange(tamp)
        }
    }

    const valueHourToForm = (hour:number | undefined) =>{
        if(type==='ampm' && hour!==undefined){
            if(hour===0){
                return(12)
            }if(hour===12){
                return(12)
            }else if(hour>12){
                return(hour-12)
            }else{
                return(hour)
            }
        }else{
            return(hour)
        }
    }

    return(
        <div className='time-picker-wheel'>
            <DivOptions list={hourList} value={valueHourToForm(value?.hour)} onSelect={(newValue)=>{thisOnChange('hour', newValue)}}/>
            <span style={{color:"transparent"}}>:</span>
            <DivOptions list={minuteList} value={value?.minute} onSelect={(newValue)=>{thisOnChange('minute', newValue)}}/>
            {
                (!isHideSecond)&&(
                    <>
                        <span style={{color:"transparent"}}>:</span>
                        <DivOptions list={secondList} value={value?.second} onSelect={(newValue)=>{thisOnChange('second', newValue)}}/>
                    </>
                )
            }
        </div>
    )
}

export default TimePickerWheel
import { useEffect, useRef, useState } from 'react'
import './_styles.scss'
import { MoveFocusInside, useFocusController, useFocusState } from 'react-focus-lock'
import FocusLock, { AutoFocusInside } from 'react-focus-lock';
import { processClassname } from '../../helper';
import { timeFieldValueType } from './__index';

type TimePickerProps = {
    type: 'ampm'|'24hr'
    isAmPm?:boolean
    value?:timeFieldValueType
    onChange?:(newValue:timeFieldValueType)=>void
    isHideSecond?:boolean
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
                    ${isSelected?('selected'):('')}`)  
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
            <ButtonOption label='-' value={''}/>
            <ButtonOption label='-' value={''}/>
        </div>
    )
}

const TimePickerWheel = ({
    type = 'ampm',
    value,
    onChange,
    isHideSecond = false
}:TimePickerProps) =>{

    const hourList = Array.apply(null, Array(type==='ampm'?(12):(24))).map(function (x, i) { return type==='ampm'?(i+1):(i); })
    const minuteList = Array.apply(null, Array(60)).map(function (x, i) { return i; })
    const secondList = Array.apply(null, Array(60)).map(function (x, i) { return i; })

    const thisOnChange = (inputType:'hour'|'minute'|'second', newValue:number | string | undefined) =>{
        if(onChange && (typeof newValue==='number' || newValue===undefined)){
            const tamp:timeFieldValueType = {
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
            <DivOptions list={minuteList} value={value?.minute} onSelect={(newValue)=>{thisOnChange('minute', newValue)}}/>
            {
                (!isHideSecond)&&(
                    <DivOptions list={secondList} value={value?.second} onSelect={(newValue)=>{thisOnChange('second', newValue)}}/>
                )
            }
        </div>
    )
}

export default TimePickerWheel
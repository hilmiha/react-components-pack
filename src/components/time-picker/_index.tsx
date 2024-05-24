import { useEffect, useRef, useState } from 'react'
import './_styles.scss'
import { MoveFocusInside, useFocusController, useFocusState } from 'react-focus-lock'
import FocusLock, { AutoFocusInside } from 'react-focus-lock';
import { processClassname } from '../../helper';

type TimePickerProps = {
    isAmPm?:boolean
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
    value:number,
    onSelect:(newValue:number | string)=>void
}) =>{
    const divRef = useRef(null)
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

        if(divRef.current && buttonRef.current){
            console.log((divRef.current as HTMLElement).scrollHeight)
            const divComp = (divRef.current as HTMLElement)
            divComp.scrollTo({
                top: buttonRef.current.offsetTop,
                left: 0,
                behavior: "smooth",
            })

        }
    }

    return(
        <div className='options-list-container' ref={divRef} onKeyDown={onKey}>
            {
                (true)&&(
                    list.map((itm, index)=>(
                        <ButtonOption 
                            key={index} 
                            label={`${`${itm}`.length===1?(`0${itm}`):(`${itm}`)}`} 
                            value={itm} 
                            isAutoFocus={value===itm} 
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

const TimePicker = ({
    isAmPm = true
}:TimePickerProps) =>{

    const hourList = Array.apply(null, Array(isAmPm?(12):(24))).map(function (x, i) { return i; })
    const minuteList = Array.apply(null, Array(60)).map(function (x, i) { return i; })
    const secondList = Array.apply(null, Array(60)).map(function (x, i) { return i; })

    const [valueHour, setValueHour] = useState(0)
    const [valueMinute, setValueMinute] = useState(0)
    const [valueSecond, setValueSecond] = useState(0)

    const thisOnSelect = (type:'hour' | 'minute' | 'second', newValue:number|string) =>{
        if(type==='hour' && typeof newValue === 'number'){
            setValueHour(newValue)
        }
        if(type==='minute' && typeof newValue === 'number'){
            setValueMinute(newValue)
        }
        if(type==='second' && typeof newValue === 'number'){
            setValueSecond(newValue)
        }
    }

    return(
        <div className='time-picker'>
            <DivOptions list={hourList} value={valueHour} onSelect={(newValue)=>{thisOnSelect('hour', newValue)}}/>
            <DivOptions list={minuteList} value={valueMinute} onSelect={(newValue)=>{thisOnSelect('minute', newValue)}}/>
            <DivOptions list={secondList} value={valueSecond} onSelect={(newValue)=>{thisOnSelect('second', newValue)}}/>
            
            {
                (isAmPm)&&(
                    <div className='options-list-container'>AM</div>
                )
            }
        </div>
    )
}

export default TimePicker
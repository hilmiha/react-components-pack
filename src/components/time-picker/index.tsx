import { LegacyRef, useEffect, useMemo, useRef, useState } from 'react'
import './styles.scss'
import TextField from '../text-field'
import useFormHook from '../../hook/useFormHook'
import TimePickerWheel from './TimePickerWheel'
import ButtonGroup from '../button-group'
import Button from '../button'

export type timePickerValueType = {
    hour:number | undefined
    minute:number | undefined
    second:number | undefined
}

type TimePickerProps = {
    value:timePickerValueType,
    onChange?:(newValue:timePickerValueType)=>void
    type:'ampm'|'24hr',
    isHideSecond?:boolean
    error?:{
        hour?:boolean
        minute?:boolean
        second?:boolean
    }
    hourListConst?:number[]
    minuteListConst?:number[]
    secondListConst?:number[]
}

const TimePicker = ({
    value,
    onChange,
    type,
    isHideSecond,
    error,
    hourListConst,
    minuteListConst,
    secondListConst
}:TimePickerProps) =>{

    const hourInputRef = useRef<HTMLInputElement>()
    const minuteInputRef = useRef<HTMLInputElement>()
    const secondInputRef = useRef<HTMLInputElement>()
    const containerInputRef = useRef<HTMLDivElement>()

    const [isRendered, setIsRendered] = useState(false)
    const [isAm, setIsAm]=useState((value?.hour)?(value.hour>12?(false):(true)):(true))

    const [isFieldFocus, setIsFieldFocus] = useState(false)

    const valueHourToForm = (hour:number | undefined) =>{
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
        }else{
            return(`${(hour)}`.length===1?(`0${(hour)}`):(`${(hour)}`))
        }
    }

    const formToValueHour = (hour:number | undefined) =>{
        if(type==='ampm' && hour!==undefined){
            if(hour){
                if(isAm){
                    if(hour===12){
                        return(0)
                    }else{
                        return(hour)
                    }
                }else{
                    if(hour===12){
                        return(12)
                    }else{
                        return(hour+12)
                    }
                }
            }
        }else{
            if(hour!==undefined){
                return(hour)
            }else{
                return(undefined)
            }
        }
    }

    const [form, setForm] = useState({
        hour:(value?.hour!==undefined)?(valueHourToForm(value.hour)):('--'),
        minute:(value?.minute!==undefined)?(`${value.minute}`.length===1?(`0${value.minute}`):(`${value.minute}`)):('--'),
        second:(value?.second!==undefined)?(`${value.second}`.length===1?(`0${value.second}`):(`${value.second}`)):('--'),
    })

    const {
        onChange:onChangeFormTime
    } = useFormHook({
        form,
        setForm
    })

    // const prevValue = useMemo(()=>{
    //     return({
    //         hour:(value?.hour!==undefined)?(valueHourToForm(value.hour)):('--'),
    //         minute:(value?.minute!==undefined)?(`${value.minute}`.length===1?(`0${value.minute}`):(`${value.minute}`)):('--'),
    //         second:(value?.second!==undefined)?(`${value.second}`.length===1?(`0${value.second}`):(`${value.second}`)):('--'),
    //     })
    // },[value])

    // const prevAmPm = useMemo(()=>{
    //     return(isAm)
    // },[value])

    useEffect(()=>{
        const tamp = {
            hour:(value?.hour!==undefined)?(valueHourToForm(value.hour)):('--'),
            minute:(value?.minute!==undefined)?(`${value.minute}`.length===1?(`${value.minute}`):(`${value.minute}`)):('--'),
            second:(value?.second!==undefined)?(`${value.second}`.length===1?(`${value.minute}`):(`${value.second}`)):('--'),
        }

        if(JSON.stringify(tamp)!==JSON.stringify(form) && !isFieldFocus){
            setForm({
                hour:(value?.hour!==undefined)?(valueHourToForm(value.hour)):('--'),
                minute:(value?.minute!==undefined)?(`${value.minute}`.length===1?(`0${value.minute}`):(`${value.minute}`)):('--'),
                second:(value?.second!==undefined)?(`${value.second}`.length===1?(`0${value.second}`):(`${value.second}`)):('--'),
            })
        }
    },[value])

    const checkIfFocus = () =>{
        if(containerInputRef.current){
            setIsFieldFocus(containerInputRef.current.matches(':focus-within:not(:focus)'))
        }
    }

    const thisOnChangeHour = (inputType:'hour' | 'minute' | 'second', newValue:string) =>{
        let maxValue = 0
        let minValue = 0
        let newValueNumber = parseInt(newValue.replace(/\-/g, ""))

        if(inputType==='hour'){
            if(type==='24hr'){
                maxValue = 23
                minValue = 0
            }else{
                maxValue = 12
                minValue = 0
            }
        }else{
            maxValue = 59
        }
        
        if(newValueNumber || newValueNumber===0){
            if(inputType==='hour' && type==='ampm' && newValueNumber===0 && newValue.length>1){

            }else{
                if(newValueNumber<=maxValue && newValueNumber>=minValue){
                    const tamp = newValue.replace(/[^0-9]+/g, "")
                    onChangeFormTime(inputType, tamp.substring(tamp.length===3?(1):(0)))
                }
            }
        }else{
            onChangeFormTime(inputType, '')
        }
    }

    useEffect(()=>{
        if(isHideSecond){
            if(!isNaN(parseInt(form.minute)) && form.second!=='00'){
                onChangeFormTime('second', '00')
            }else if(isNaN(parseInt(form.minute)) && form.second!=='--'){
                onChangeFormTime('second', '--')
            }
        }
    },[form.minute])

    const thisOnFocus = (inputType:'hour' | 'minute' | 'second') => {
        if(inputType==='hour'){
            if(hourInputRef.current){
                hourInputRef.current.type = 'tel'
            }
            hourInputRef.current?.select()
        }else if(inputType==='minute'){
            if(minuteInputRef.current){
                minuteInputRef.current.type = 'tel'
            }
            minuteInputRef.current?.select()
        }else if(inputType==='second'){
            if(secondInputRef.current){
                secondInputRef.current.type = 'tel'
            }
            secondInputRef.current?.select()
        }
        checkIfFocus()
    }

    const thisOnKeyDown = (event:React.KeyboardEvent<HTMLInputElement>, inputType:'hour' | 'minute' | 'second' | 'ampm') =>{
        const isKeyNumber = parseInt(event.key)
        const isSelectAll = (event.target as HTMLInputElement).selectionStart !== (event.target as HTMLInputElement).selectionEnd

        if(inputType==='hour' && (event.keyCode===8 || event.keyCode===32 || event.keyCode===39 || event.keyCode===37 || !isNaN(isKeyNumber))){
            if(event.keyCode===32){
                setTimeout(() => {
                    minuteInputRef.current?.focus()
                }, 10);
            }else if(event.keyCode===39 && (form.hour.length===(event.target as HTMLInputElement).selectionEnd || form.hour.length===(event.target as HTMLInputElement).selectionStart)){
                setTimeout(() => {
                    minuteInputRef.current?.focus()
                }, 10);
            }else if(!isNaN(isKeyNumber) && form.hour.length>1 && form.hour[0]!=='0' && !isSelectAll){
                setTimeout(() => {
                    minuteInputRef.current?.focus()
                    thisOnChangeHour('minute', `${isKeyNumber}`)
                }, 10);
            }
        }else if(inputType==='minute' && (event.keyCode===8 || event.keyCode===32 || event.keyCode===39 || event.keyCode===37 || !isNaN(isKeyNumber))){
            if(event.keyCode===32){
                setTimeout(() => {
                    secondInputRef.current?.focus()
                }, 10);
            }else if(event.keyCode===8 && !(event.target as HTMLInputElement).value){
                setTimeout(() => {
                    hourInputRef.current?.focus()
                }, 10);
            }else if(event.keyCode===39 && (form.minute.length===(event.target as HTMLInputElement).selectionEnd || form.minute.length===(event.target as HTMLInputElement).selectionStart)){
                setTimeout(() => {
                    secondInputRef.current?.focus()
                }, 10);
            }else if(event.keyCode===37 && ((event.target as HTMLInputElement).selectionEnd===0 || (event.target as HTMLInputElement).selectionStart===0)){
                setTimeout(() => {
                    hourInputRef.current?.focus()
                }, 10);
            }else if(!isNaN(isKeyNumber) && form.minute.length>1 && form.minute[0]!=='0' && !isSelectAll && !isHideSecond){
                setTimeout(() => {
                    secondInputRef.current?.focus()
                    thisOnChangeHour('second', `${isKeyNumber}`)
                }, 10);
            }
        }else if(inputType==='second' && (event.keyCode===8 || event.keyCode===32 || event.keyCode===39 || event.keyCode===37)){
            if(event.keyCode===8 && !(event.target as HTMLInputElement).value){
                setTimeout(() => {
                    minuteInputRef.current?.focus()
                }, 10);
            }else if(event.keyCode===37 && ((event.target as HTMLInputElement).selectionEnd===0 || (event.target as HTMLInputElement).selectionStart===0)){
                setTimeout(() => {
                    minuteInputRef.current?.focus()
                }, 10);
            }
        }
    }

    const thisOnValidateHour = (inputType:'hour' | 'minute' | 'second', newValue:string) =>{
        if(hourInputRef.current && inputType==='hour'){
            hourInputRef.current.type = 'text'
        }
        if(minuteInputRef.current && inputType==='minute'){
            minuteInputRef.current.type = 'text'
        }
        if(secondInputRef.current && inputType==='second'){
            secondInputRef.current.type = 'text'
        }

        if(newValue){
            if(type==='ampm' && newValue==='0' && inputType==='hour'){
                onChangeFormTime(inputType, '--')
            }else{
                onChangeFormTime(inputType, (newValue.length===1?(`0${newValue}`):(newValue)))
            }
        }else{
            onChangeFormTime(inputType, '--')
        }

        checkIfFocus()
    }

    const onChangeField = (newValue?:timePickerValueType):timePickerValueType =>{
        if(newValue){
            return({
                hour:(newValue.hour===undefined?(undefined):(newValue.hour===value.hour?(newValue.hour):(formToValueHour(newValue.hour)))),
                minute:newValue.minute,
                second:newValue.second
            })
        }else{
            return({
                hour:(isNaN(parseInt(form.hour))?(undefined):(formToValueHour(parseInt(form.hour)))),
                minute:(isNaN(parseInt(form.minute))?(undefined):(parseInt(form.minute))),
                second:(isNaN(parseInt(form.second))?(undefined):(parseInt(form.second)))
            })
        }
        
    }

    const thisOnChange = (valuePicker?:timePickerValueType) =>{
        if(onChange && !valuePicker){
            onChange(onChangeField())
        }else if(onChange && valuePicker){
            const tamp = {...valuePicker}
            if(tamp.minute!==undefined && isHideSecond){
                tamp.second = 0
            }else if(tamp.minute===undefined && isHideSecond){
                tamp.second = undefined
            }
            onChange(onChangeField(tamp))
            setForm({
                hour:(tamp?.hour!==undefined)?(valueHourToForm(tamp.hour)):('--'),
                minute:(tamp?.minute!==undefined)?(`${tamp.minute}`.length===1?(`0${tamp.minute}`):(`${tamp.minute}`)):('--'),
                second:(tamp?.second!==undefined)?(`${tamp.second}`.length===1?(`0${tamp.second}`):(`${tamp.second}`)):('--'),
            })
        }
    }

    useEffect(()=>{
        const tamp = {
            hour:(value?.hour!==undefined)?(valueHourToForm(value.hour)):('--'),
            minute:(value?.minute!==undefined)?(`${value.minute}`.length===1?(`${value.minute}`):(`${value.minute}`)):('--'),
            second:(value?.second!==undefined)?(`${value.second}`.length===1?(`${value.minute}`):(`${value.second}`)):('--'),
        }
        if(JSON.stringify(form)!==JSON.stringify(tamp) && isFieldFocus && isRendered){
            thisOnChange()
        }
    },[form])

    useEffect(()=>{
        if(!isFieldFocus && isRendered){
            thisOnChange()
        }
    },[isAm])

    useEffect(()=>{
        setIsRendered(true)
    },[])

    return(
        <div className="time-picker">
            <div className='time-pick-input'>
                <div ref={containerInputRef as LegacyRef<HTMLInputElement>} className='time-pick-input'>
                    <TextField
                        inputRef={hourInputRef}
                        type="text-no-space"
                        value={form['hour']}
                        onChange={(newValue)=>{thisOnChangeHour('hour', `${newValue}`)}}
                        onFocus={()=>{thisOnFocus('hour')}}
                        onKeyDown={(e)=>{thisOnKeyDown(e, 'hour')}}
                        onBlur={(e)=>{thisOnValidateHour('hour', e.target.value.trim())}}
                        config={{
                            maxLength:3
                        }}
                        error={{isError:(error?.hour===true), errorMessage:''}}
                        isDisabled={(hourListConst!==undefined || minuteListConst!==undefined || secondListConst!==undefined)}
                    />
                    <span className='font-text'>:</span>
                    <TextField
                        inputRef={minuteInputRef}
                        type="text-no-space"
                        value={form['minute']}
                        onChange={(newValue)=>{thisOnChangeHour('minute', `${newValue}`)}}
                        onFocus={()=>{thisOnFocus('minute')}}
                        onKeyDown={(e)=>{thisOnKeyDown(e, 'minute')}}
                        onBlur={(e)=>{thisOnValidateHour('minute', e.target.value.trim())}}
                        config={{
                            maxLength:3
                        }}
                        error={{isError:(error?.minute===true), errorMessage:''}}
                        isDisabled={(hourListConst!==undefined || minuteListConst!==undefined || secondListConst!==undefined)}
                    />
                    {
                        (!isHideSecond)&&(
                            <>
                                <span className='font-text'>:</span>
                                <TextField
                                    inputRef={secondInputRef}
                                    type="text-no-space"
                                    value={form['second']}
                                    onChange={(newValue)=>{thisOnChangeHour('second', `${newValue}`)}}
                                    onFocus={()=>{thisOnFocus('second')}}
                                    onKeyDown={(e)=>{thisOnKeyDown(e, 'second')}}
                                    onBlur={(e)=>{thisOnValidateHour('second', e.target.value.trim())}}
                                    config={{
                                        maxLength:3
                                    }}
                                    error={{isError:(error?.second===true), errorMessage:''}}
                                    isDisabled={(hourListConst!==undefined || minuteListConst!==undefined || secondListConst!==undefined)}
                                />
                            </>
                            
                        )
                    }
                </div>
                {
                    (
                        type==='ampm'
                    )&&(
                        <ButtonGroup>
                            <Button txtLabel='AM' onClick={()=>{setIsAm(true)}} isSelected={isAm}/>
                            <Button txtLabel='PM'onClick={()=>{setIsAm(false)}} isSelected={!isAm}/>
                        </ButtonGroup>
                    )
                }
            </div>
            <div>
                <TimePickerWheel
                    type={type}
                    value={value}
                    isHideSecond={isHideSecond}
                    onChange={(newValue)=>{thisOnChange(newValue)}}
                    hourListConst={hourListConst}
                    minuteListConst={minuteListConst}
                    secondListConst={secondListConst}
                />
            </div>
        </div>
    )
}

export default TimePicker
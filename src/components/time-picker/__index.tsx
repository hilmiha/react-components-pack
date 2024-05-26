import { PiWarningDiamondFill } from "react-icons/pi"
import { processClassname } from "../../helper"
import TextField, { errorType } from "../text-field"
import './__styles.scss'
import { LegacyRef, useEffect, useMemo, useRef, useState } from "react"
import useFormHook from "../../hook/useFormHook"
import TimePickerWheel from "./_index"

type timeFieldType = 'ampm' | '24hr'
export type timeFieldValueType = {
    hour:number | undefined
    minute:number | undefined
    second:number | undefined
}
export type timeFieldConfig = {
    minTime?:Date,
    maxTime?:Date,
    isMandatory?:boolean,
    isShowSecond?:boolean
}
type TimeFieldProps = {
    type:timeFieldType
    className?:string
    txtLabel?:string
    value?:timeFieldValueType
    onChange?: (newValue:timeFieldValueType) => void,
    onValidate?: (errorResult:errorType, newValue:timeFieldValueType, config?:timeFieldConfig) => void,
    error?: errorType
    config?: timeFieldConfig

}

const TimeField = ({
    type='24hr',
    className,
    txtLabel,
    value,
    onChange,
    onValidate,
    error,
    config
}:TimeFieldProps) =>{
    const isMandatory = config?.isMandatory===true
    const isShowSecond = config?.isShowSecond===true

    const hourInputRef = useRef<HTMLInputElement>()
    const minuteInputRef = useRef<HTMLInputElement>()
    const secondInputRef = useRef<HTMLInputElement>()
    const ampmInputRef = useRef<HTMLInputElement>()
    const containerRef = useRef<HTMLDivElement>()

    const [isAm, setIsAm]=useState((value?.hour)?(value.hour>12?(false):(true)):(true))
    const [isFieldFocus, setIsFieldFocus] = useState(true)

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

    const prevValue = useMemo(()=>{
        return({
            hour:(value?.hour!==undefined)?(valueHourToForm(value.hour)):('--'),
            minute:(value?.minute!==undefined)?(`${value.minute}`.length===1?(`0${value.minute}`):(`${value.minute}`)):('--'),
            second:(value?.second!==undefined)?(`${value.second}`.length===1?(`0${value.second}`):(`${value.second}`)):('--'),
        })
    },[value])

    const prevAmPm = useMemo(()=>{
        return(isAm)
    },[value])

    const onChangeField = ():timeFieldValueType =>{
        return({
            hour:(isNaN(parseInt(form.hour))?(undefined):(formToValueHour(parseInt(form.hour)))),
            minute:(isNaN(parseInt(form.minute))?(undefined):(parseInt(form.minute))),
            second:(isNaN(parseInt(form.second))?(undefined):(parseInt(form.second)))
        })
    }

    const thisOnChange = (valuePicker?:timeFieldValueType) =>{
        if(onChange && !valuePicker){
            onChange(onChangeField())
        }else if(onChange && valuePicker){
            onChange(valuePicker)
            setForm({
                hour:(valuePicker?.hour!==undefined)?(valueHourToForm(valuePicker.hour)):('--'),
                minute:(valuePicker?.minute!==undefined)?(`${valuePicker.minute}`.length===1?(`0${valuePicker.minute}`):(`${valuePicker.minute}`)):('--'),
                second:(valuePicker?.second!==undefined)?(`${valuePicker.second}`.length===1?(`0${valuePicker.second}`):(`${valuePicker.second}`)):('--'),
            })
        }
    }

    useEffect(()=>{
        if(!isFieldFocus && onChange){
            if((JSON.stringify(prevValue)!==JSON.stringify(form)) || (prevAmPm !== isAm)){
                thisOnChange()
            }else{

            }
        }
    },[isFieldFocus])

    const {
        onChange:onChangeFormTime
    } = useFormHook({
        form,
        setForm
    })

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

    const checkIfFocus = () =>{
        if(containerRef.current){
            setIsFieldFocus(containerRef.current.matches(':focus-within:not(:focus)'))
        }
    }

    const thisOnValidateHour = (inputType:'hour' | 'minute' | 'second' | 'ampm', newValue:string) =>{
        if(inputType!=='ampm'){
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
        }else{

        }
        

        checkIfFocus()
    }

    const thisOnChangeAmPm = (newValue:string) =>{
        if(isAm && newValue.toLowerCase().includes('p')){
            setIsAm(false)
        }else if(!isAm && newValue.toLowerCase().includes('a')){
            setIsAm(true)
        }
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
            }else if(!isNaN(isKeyNumber) && form.minute.length>1 && form.minute[0]!=='0' && !isSelectAll){
                setTimeout(() => {
                    secondInputRef.current?.focus()
                    thisOnChangeHour('second', `${isKeyNumber}`)
                }, 10);
            }
        }else if(inputType==='second' && (event.keyCode===8 || event.keyCode===32 || event.keyCode===39 || event.keyCode===37)){
            if(event.keyCode===32){
                setTimeout(() => {
                    ampmInputRef.current?.focus()
                }, 10);
            }else if(event.keyCode===8 && !(event.target as HTMLInputElement).value){
                setTimeout(() => {
                    minuteInputRef.current?.focus()
                }, 10);
            }else if(event.keyCode===39 && (form.second.length===(event.target as HTMLInputElement).selectionEnd || form.second.length===(event.target as HTMLInputElement).selectionStart)){
                setTimeout(() => {
                    ampmInputRef.current?.focus()
                }, 10);
            }else if(event.keyCode===37 && ((event.target as HTMLInputElement).selectionEnd===0 || (event.target as HTMLInputElement).selectionStart===0)){
                setTimeout(() => {
                    minuteInputRef.current?.focus()
                }, 10);
            }
        }else if(inputType==='ampm' && (event.keyCode===8 || event.keyCode===37)){
            if((event.keyCode===37 || event.keyCode===8)){
                setTimeout(() => {
                    secondInputRef.current?.focus()
                }, 10);
            }
        }
    }

    const thisOnFocus = (inputType:'hour' | 'minute' | 'second' | 'ampm') => {
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
        }else if(inputType==='ampm'){
            ampmInputRef.current?.select()
        }
        checkIfFocus()
    }

    return(
        <div 
            className={
                processClassname(`time-field field
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
            <div 
                ref={containerRef as LegacyRef<HTMLInputElement>}
                className={
                    processClassname(`text-field-input-container field-container
                    ${(error?.isError)?('error'):('')}`)  
                }
            >
                <div className="hour-container">
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
                    />
                </div>
                <span className="font-text">:</span>
                <div className="hour-container">
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
                    />
                </div>
                {
                    (isShowSecond)&&(
                        <>
                            <span className="font-text">:</span>
                            <div className="hour-container">
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
                                />
                            </div>
                        </>
                    )
                }
                {
                    (type==='ampm')&&(
                        <>
                            <span className="font-text">:</span>
                            <div className="ampm-container">
                                <TextField
                                    inputRef={ampmInputRef}
                                    type="text-no-space"
                                    value={isAm?('AM'):('PM')}
                                    onChange={(newValue)=>{thisOnChangeAmPm(newValue)}}
                                    onFocus={()=>{thisOnFocus('ampm')}}
                                    onKeyDown={(e)=>{thisOnKeyDown(e, 'ampm')}}
                                    onBlur={(e)=>{thisOnValidateHour('ampm', e.target.value.trim())}}
                                    config={{
                                        maxLength:3
                                    }}
                                />
                            </div>
                        </>
                    )
                }
                <div 
                    style={{height:'32px', flexGrow:'1'}} 
                    onClick={()=>{hourInputRef.current?.focus()}}
                >
                    
                </div>
            </div>
            {
                (error?.isError)&&(
                    <span className='field-error-message'>
                        <PiWarningDiamondFill/> {error.errorMessage}
                    </span>
                )
            }
            <TimePickerWheel
                type={type}
                value={value}
                onChange={(newValue)=>{thisOnChange(newValue)}}
            />
        </div>
    )
}

export default TimeField
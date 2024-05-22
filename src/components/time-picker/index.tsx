import { PiWarningDiamondFill } from "react-icons/pi"
import { processClassname } from "../../helper"
import TextField, { errorType } from "../text-field"
import './styles.scss'
import { useEffect, useRef, useState } from "react"
import useFormHook from "../../hook/useFormHook"

type timeFieldType = 'ampm' | '24hr'
type timeFieldValueType = Date
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
    onChange?: (newValue:timeFieldValueType) => void,
    onValidate?: (errorResult:errorType, newValue:timeFieldValueType, config?:timeFieldConfig) => void,
    error?: errorType
    config?: timeFieldConfig

}

const TimeField = ({
    type='24hr',
    className,
    txtLabel,
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


    const [form, setForm] = useState({
        hour:'00',
        minute:'00',
        second:'00',
        ampm:'AM'
    })

    const {
        onChange:onChangeFormTime
    } = useFormHook({
        form,
        setForm
    })

    const thisOnChangeHour = (inputType:'hour' | 'minute' | 'second', newValue:string) =>{
        let maxValue = 0
        if(inputType==='hour'){
            if(type==='24hr'){
                maxValue = 24
            }else{
                maxValue = 12
            }
        }else{
            maxValue = 59
        }

        if(newValue){
            if(parseInt(newValue)<=maxValue){
                onChangeFormTime(inputType, newValue)
            }
        }else{
            onChangeFormTime(inputType, '')
        }
    }
    const thisOnValidateHour = (inputType:'hour' | 'minute' | 'second', newValue:string) =>{
        let maxValue = 0
        if(inputType==='hour'){
            maxValue = 12
        }else{
            maxValue = 59
        }

        if(newValue){
            if(parseInt(newValue)<=maxValue){
                onChangeFormTime(inputType, (newValue.length===1?(`0${newValue}`):(newValue)))
            }
        }else{
            onChangeFormTime(inputType, '00')
        }
    }

    const thisOnChangeAmpm = (newValue:string) =>{
        console.log(newValue)
        if(newValue.toLocaleLowerCase().includes('p') && form['ampm']==='AM'){
            onChangeFormTime('ampm', 'PM')
        }else if(newValue.toLocaleLowerCase().includes('a') && form['ampm']==='PM'){
            onChangeFormTime('ampm', 'AM')
        }
    }

    useEffect(()=>{
        if(hourInputRef.current){
            hourInputRef.current.onfocus = ()=>{
                hourInputRef.current?.select()
            }
        }
    },[hourInputRef])
    useEffect(()=>{
        if(minuteInputRef.current){
            minuteInputRef.current.onfocus = ()=>{
                minuteInputRef.current?.select()
            }
        }
    },[minuteInputRef])
    useEffect(()=>{
        if(secondInputRef.current){
            secondInputRef.current.onfocus = ()=>{
                secondInputRef.current?.select()
            }
        }
    },[secondInputRef])
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
                className={
                    processClassname(`text-field-input-container field-container
                    ${(error?.isError)?('error'):('')}`)  
                }
            >
                <div className="hour-container">
                    <TextField
                        inputRef={hourInputRef}
                        type="text-only-number"
                        value={form['hour']}
                        onChange={(newValue)=>{thisOnChangeHour('hour', newValue)}}
                        onValidate={(x, newValue)=>{thisOnValidateHour('hour', newValue)}}
                        config={{
                            maxLength:2
                        }}
                    />
                </div>
                <span className="font-text">:</span>
                <div className="hour-container">
                    <TextField
                        inputRef={minuteInputRef}
                        type="text-only-number"
                        value={form['minute']}
                        onChange={(newValue)=>{thisOnChangeHour('minute', newValue)}}
                        onValidate={(x, newValue)=>{thisOnValidateHour('minute', newValue)}}
                        config={{
                            maxLength:2
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
                                    type="text-only-number"
                                    value={form['second']}
                                    onChange={(newValue)=>{thisOnChangeHour('second', newValue)}}
                                    onValidate={(x, newValue)=>{thisOnValidateHour('second', newValue)}}
                                    config={{
                                        maxLength:2
                                    }}
                                />
                            </div>
                        </>
                    )
                }
                {
                    (type==='ampm')&&(
                        <div className="ampm-container">
                            <TextField
                                inputRef={ampmInputRef}
                                type="text-no-space"
                                value={form['ampm']}
                                onChange={(newValue)=>{thisOnChangeAmpm(newValue)}}
                                config={{
                                    maxLength:3
                                }}
                            />
                        </div>
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
        </div>
    )
}

export default TimeField
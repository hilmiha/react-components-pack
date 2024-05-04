import { DayContent, DayContentProps, DayPicker, DateRange, isDateRange } from 'react-day-picker';
import { addDays, format, isDate, subDays } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { processClassname } from '../../helper'
import './styles.scss'
import { useMemo } from 'react';

export type datePickerType = "single" | "range" | "multiple"
export type datePickerValueType = Date | Date[] | DateRange | undefined

type Props = {
    className?: string,
    value?: datePickerValueType,
    type: datePickerType,
    onchange?: (newValue:datePickerValueType)=>void
    daysAfterToday?: number,
    daysBeforeToday?: number,
    fromDate?:Date,
    toDate?:Date,
    defaultMonth?:Date
    maxSelection?: number
}
const DatePicker = ({
    className,
    type = 'single',
    value,
    onchange,
    daysAfterToday,
    daysBeforeToday,
    fromDate,
    toDate,
    maxSelection
}:Props) =>{

    function DateTime(props: DayContentProps) {
        const dateTime = format(props.date, 'yyyy-MM-dd');
        return (
            <time dateTime={dateTime}>
                <DayContent {...props} />
            </time>
        );
    }

    const thisOnChange = (newSelected: datePickerValueType) =>{
        if(onchange){
            onchange(newSelected)
        }
    }

    const fromDateMemo = useMemo(()=>{
        if(fromDate && !daysBeforeToday){
            return fromDate
        }else if(daysBeforeToday){
            return subDays(new Date(), daysBeforeToday)
        }else{
            return undefined
        }
    },[])

    const toDateMemo = useMemo(()=>{
        if(toDate && !daysAfterToday){
            return toDate
        }else if(daysAfterToday){
            return addDays(new Date(), daysAfterToday)
        }else{
            return undefined
        }
    },[])

    return(
        <div
            className={
                processClassname(`date-picker
                ${className?(className):('')}`)  
            } 
        >
            {
                (type==='single' && (isDate(value) || !value))&&(
                    <DayPicker 
                        defaultMonth={(fromDateMemo)?(fromDateMemo):(undefined)}
                        mode={'single'}
                        selected={value}
                        onSelect={(newSelected)=>{thisOnChange(newSelected)}}
                        components={{ DayContent: DateTime }} 
                        fromDate={fromDateMemo}
                        toDate={toDateMemo}
                    />
                )
            }
            {
                (type==='range' && (isDateRange(value) || !value))&&(
                    <DayPicker 
                        defaultMonth={(fromDateMemo)?(fromDateMemo):(undefined)}
                        mode={'range'}
                        selected={value}
                        onSelect={(newSelected)=>{thisOnChange(newSelected)}}
                        components={{ DayContent: DateTime }}
                        fromDate={fromDateMemo}
                        toDate={toDateMemo}
                        max={maxSelection}
                    />
                )
            }
            {
                (type==='multiple' && (Array.isArray(value) || !value))&&(
                    <DayPicker 
                        defaultMonth={(fromDateMemo)?(fromDateMemo):(undefined)}
                        mode={'multiple'}
                        selected={value}
                        onSelect={(newSelected)=>{thisOnChange(newSelected)}}
                        components={{ DayContent: DateTime }}
                        fromDate={fromDateMemo}
                        toDate={toDateMemo}
                        max={maxSelection}
                    />
                )
            }
        </div>
    )
}

export default DatePicker
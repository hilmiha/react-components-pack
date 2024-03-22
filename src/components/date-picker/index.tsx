import { DayContent, DayContentProps, DayPicker, DateRange, isDateRange } from 'react-day-picker';
import { addDays, format, isDate, subDays } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { processClassname } from '../../helper'
import './styles.scss'
import { useEffect, useState } from 'react';

export type datePickerType = "single" | "range" | "multiple"
export type datePickerValueType = Date | Date[] | DateRange | undefined

type Props = {
    className?: string,
    value?: datePickerValueType,
    type: datePickerType,
    onchange?: (newValue:datePickerValueType)=>void
    daysAfterToday?: number,
    daysBeforeToday?: number,
    maxSelection?: number
}
const DatePicker = ({
    className,
    type = 'single',
    value,
    onchange,
    daysAfterToday,
    daysBeforeToday,
    maxSelection
}:Props) =>{
    // const [selected, setSelected] = useState<Date>()
    // const [selectedMulti, setSelectedMulti] = useState<Date[]>()
    // const [selectedRange, setSelectedRange] = useState<DateRange>()


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

    // useEffect(()=>{
    //     console.log(selected)
    // },[selected])

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
                        mode={'single'}
                        selected={value}
                        onSelect={(newSelected)=>{thisOnChange(newSelected)}}
                        components={{ DayContent: DateTime }} 
                        fromDate={(daysBeforeToday!==undefined)?(subDays(new Date(), daysBeforeToday)):(undefined)}
                        toDate={(daysAfterToday!==undefined)?(addDays(new Date(), daysAfterToday)):(undefined)}
                    />
                )
            }
            {
                (type==='range' && (isDateRange(value) || !value))&&(
                    <DayPicker 
                        mode={'range'}
                        selected={value}
                        onSelect={(newSelected)=>{thisOnChange(newSelected)}}
                        components={{ DayContent: DateTime }}
                        fromDate={(daysBeforeToday!==undefined)?(subDays(new Date(), daysBeforeToday)):(undefined)}
                        toDate={(daysAfterToday!==undefined)?(addDays(new Date(), daysAfterToday)):(undefined)}
                        max={maxSelection}
                    />
                )
            }
            {
                (type==='multiple' && (Array.isArray(value) || !value))&&(
                    <DayPicker 
                        mode={'multiple'}
                        selected={value}
                        onSelect={(newSelected)=>{thisOnChange(newSelected)}}
                        components={{ DayContent: DateTime }}
                        fromDate={(daysBeforeToday!==undefined)?(subDays(new Date(), daysBeforeToday)):(undefined)}
                        toDate={(daysAfterToday!==undefined)?(addDays(new Date(), daysAfterToday)):(undefined)}
                        max={maxSelection}
                    />
                )
            }
        </div>
    )
}

export default DatePicker
import { DayContent, DayContentProps, DayPicker, DateRange, isDateRange, DayOfWeek, isDayOfWeekType } from 'react-day-picker';
import { addDays, areIntervalsOverlapping, eachDayOfInterval, format, formatDate, isDate, isMonday, isSaturday, isSunday, isTuesday, subDays } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { processClassname } from '../../helper'
import './styles.scss'
import { useEffect, useMemo } from 'react';

export type datePickerType = "single" | "range" | "multiple"
export type datePickerValueType = Date | Date[] | DateRange | undefined
export type datePickerDisabledDateType = Date | {from:Date, to:Date} | DayOfWeek
type Props = {
    className?: string,
    value?: datePickerValueType,
    type: datePickerType,
    onchange?: (newValue:datePickerValueType)=>void
    fromDate?:Date,
    toDate?:Date,
    disabledDate?:datePickerDisabledDateType[]
    defaultMonth?:Date
    maxSelection?: number
}
const DatePicker = ({
    className,
    type = 'single',
    value,
    onchange,
    fromDate,
    toDate,
    disabledDate,
    maxSelection
}:Props) =>{

    const thisOnChange = (newSelected: datePickerValueType) =>{
        if(onchange){
            onchange(newSelected)

            // THIS WILL FILTER DISABLED DATE BETWEEN DATE RANGE AS THE VALUE... NEED MORE EXPLORATION ON BUSINESS RULES
            // if(type==='range' && disabledDate && disabledDate?.length>0 && isDateRange(newSelected)){
            //     if(newSelected.from){
            //         const datesBetween = eachDayOfInterval({ start: newSelected.from, end: newSelected.to?(newSelected.to):(newSelected.from) });
            //         const dateToDisabled:Number[] = []
                    
            //         disabledDate.forEach((itmDis)=>{
            //             if(isDate(itmDis)){
            //                 if(newSelected.from && areIntervalsOverlapping({start:itmDis, end:itmDis},{start:newSelected.from, end:newSelected.to?(newSelected.to):(newSelected.from)})){
            //                     dateToDisabled.push(itmDis.getTime())
            //                 }
            //             }else if(isDateRange(itmDis)){
            //                 if(newSelected.from && areIntervalsOverlapping({start:itmDis.from, end:itmDis.to},{start:newSelected.from, end:newSelected.to?(newSelected.to):(newSelected.from)})){
            //                     eachDayOfInterval({start:itmDis.from, end:itmDis.to}).forEach((itm)=>{dateToDisabled.push(itm.getTime())})
            //                 }
            //             }else{
            //                 datesBetween.forEach((itm)=>{
            //                     itmDis.dayOfWeek.forEach((day)=>{
            //                         if(day === parseInt(formatDate(itm,'e'))-1){
            //                             dateToDisabled.push(itm.getTime())
            //                         }
            //                     })
            //                 })
            //             }
            //         })
                    
            //         if(dateToDisabled.length>0){
            //             onchange(datesBetween.filter((itm)=>{
            //                 if(dateToDisabled.includes(itm.getTime())){
            //                     return false
            //                 }else{
            //                     return true
            //                 }
            //             }))
            //         }else{
            //             onchange(newSelected)
            //         }
                    
            //     }else{
            //         onchange(undefined)
            //     }
            // }else{
            //     onchange(newSelected)
            // }
            // THIS WILL FILTER DISABLED DATE BETWEEN DATE RANGE AS THE VALUE... NEED MORE EXPLORATION ON BUSINESS RULES
        }
    }

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
                        defaultMonth={(fromDate && toDate)?(fromDate):(new Date())}
                        mode={'single'}
                        selected={value}
                        onSelect={(newSelected)=>{thisOnChange(newSelected)}}
                        disabled={disabledDate}
                        fromDate={fromDate}
                        toDate={toDate}
                    />
                )
            }
            {
                (type==='range' && (isDateRange(value) || Array.isArray(value) || !value))&&(
                    <DayPicker 
                        defaultMonth={(fromDate && toDate)?(fromDate):(new Date())}
                        mode={'range'}
                        selected={value?(Array.isArray(value)?({from:value[0], to:value[value.length-1]}):(value)):(undefined)}
                        onSelect={(newSelected)=>{thisOnChange(newSelected)}}
                        fromDate={fromDate}
                        toDate={toDate}
                        disabled={disabledDate}
                        max={maxSelection}
                    />
                )
            }
            {
                (type==='multiple' && (Array.isArray(value) || !value))&&(
                    <DayPicker 
                        defaultMonth={(fromDate && toDate)?(fromDate):(new Date())}
                        mode={'multiple'}
                        selected={value}
                        onSelect={(newSelected)=>{thisOnChange(newSelected)}}
                        fromDate={fromDate}
                        toDate={toDate}
                        max={maxSelection}
                    />
                )
            }
        </div>
    )
}

export default DatePicker
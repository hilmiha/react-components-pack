import './styles.css'
import 'react-day-picker/dist/style.css';
import { useEffect, useRef, useState } from 'react'
import Text from '../Text'
import { createPopper } from '@popperjs/core'
import Icons from '../Icons'
import { DayPicker } from 'react-day-picker'
import { addDays, format, isThisMonth, subDays, subMonths } from 'date-fns';
import { debounce } from 'lodash';

const InputDatePicker = ({
    className,
    type='date-range',
    value,

    //functions
    onSelectOption,
    onCloseDropdown,

    //conditions
    dayOpenBeforeToday,
    dayOpenAfterToday,
    isDisabled,
    isError,
    maxSelect,
    
    //styles and looks
    placeholder,
    isRounded,
    isFullWidth,
}) =>{

    const [isRendered, setIsRendered] = useState(false)
    const targetRef = useRef(null)
    const dropdownRef = useRef(null)
    const [calendarSize, setCalendarSize] = useState(1)
    const [isFocus, setIsFocus] = useState(false)
    const [isDropdownShow,setIsDropdownShow] = useState(false)
    const [month, setMonth] = useState(new Date())

    const onFocus = () =>{
        setIsFocus(true)
    }

    const onBlur = () =>{
        setIsFocus(false)
    }

    function show() {
        if(dropdownRef.current){
            setIsDropdownShow(true)
            dropdownRef.current.setAttribute('data-show', '');
            createPopper(targetRef.current, dropdownRef.current, {
                placement: 'bottom-end',
                modifiers: [
                    {
                        name: 'flip',
                        options: {
                            fallbackPlacements: ['bottom-start', 'bottom', 'top-end', 'top-start', 'top', 'right', 'left'],
                        },
                    },
                    {
                        name: 'offset',
                        options: {
                            offset: [0, 4],
                        },
                    },
                ],
            }).forceUpdate()
        }   
    }

    function hide() {
        if(dropdownRef.current){
            dropdownRef.current?.removeAttribute('data-show'); 
            setIsDropdownShow(false)
        }
    }

    const onChange = (newValue) =>{
        if(onSelectOption && !isDisabled){
            if(newValue){
                onSelectOption(newValue)
            }else{
                onSelectOption('')

            }
        }
    }

    const clearSelection = () =>{
        if(onSelectOption){
            // onSelectOption('')
        }
    }

    const onClickOpenDropdown = () =>{
        if(dropdownRef.current.hasAttribute("data-show")){
            hide()
        }else{
            show()
        }
    }

    useEffect(()=>{
        setIsRendered(true)
        createPopper(targetRef.current, dropdownRef.current, {
            placement: 'bottom-end',
            modifiers: [
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements: ['bottom-start', 'bottom', 'top-end', 'top-start', 'top', 'right', 'left'],
                    },
                },
                {
                    name: 'offset',
                    options: {
                        offset: [0, 4],
                    },
                },
            ],
        });
    },[])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if(!targetRef.current.contains(event.target) && !dropdownRef.current.contains(event.target)){
                hide()
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(()=>{
        if(!isDropdownShow && isRendered){
            let tampValue = value

            if(value?.from && !value?.to){
                onChange({from:value.from, to:value.from})
                tampValue = {from:value.from, to:value.from}
            }

            if(onCloseDropdown){
                onCloseDropdown(tampValue)
            }

        }
        if(isDropdownShow){
            let elementButton = dropdownRef.current.querySelector(".rdp-nav_button_previous")
            if(elementButton){
                elementButton.innerHTML = '<svg stroke="currentColor" fill="var(--neutral900)" stroke-width="0" viewBox="0 0 256 256" color="var(--neutral900)" height="14px" width="14px" xmlns="http://www.w3.org/2000/svg" style="color: rgb(17, 24, 39);"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg>'
            }
            let elementButtonRight = dropdownRef.current.querySelector(".rdp-nav_button_next")
            if(elementButtonRight){
                elementButtonRight.innerHTML = '<svg stroke="currentColor" fill="var(--neutral900)" stroke-width="0" viewBox="0 0 256 256" color="var(--neutral900)" height="14px" width="14px" xmlns="http://www.w3.org/2000/svg" style="color: rgb(17, 24, 39);"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>'
            }
        }

        if(!isDropdownShow){
            setMonth(
                (type==='date-range')?(
                    (calendarSize===2)?(
                        (value?.from)?(
                            (isThisMonth(value.from))?(
                                subMonths(value.from, 1)
                            ):(
                                value.from
                            )
                        ):(
                            subMonths(new Date(), 1)
                        )
                    ):(
                        (value?.from)?(
                            value.from
                        ):(
                            new Date()
                        )
                    )
                ):(
                    value?(value):(new Date())
                )
            )
        }
    },[isDropdownShow, value, calendarSize])

    useEffect(() => {        


        let debounce_fun = debounce(function () {
            hide()
            if(window.innerWidth > 500 && type==='date-range'){
                setCalendarSize(2);
            }else{
                setCalendarSize(1);
            }
        }, 500);

        debounce_fun()
        window.addEventListener('resize', debounce_fun);
        return () => {
            window.removeEventListener('resize', debounce_fun);
        };
    }, []);

    return(
        <div className={`input-datepicker-wrapper ${(className)?(className):('')}`}>
            <button 
                ref={targetRef}
                className={'input-datepicker-button'}
                style={{
                    borderRadius:(isRounded)?('20px'):('6px'),
                    padding: (isRounded)?('0px 16px'):('0px 10px'),
                    borderColor: (isDisabled)?('var(--neutral300)'):(isError && !isFocus && !isDropdownShow)?('var(--red500)'):(isFocus)?('var(--brand300)'):('var(--neutral400)'),
                    outline:(isFocus && !isDisabled)?('3px solid var(--brand200)'):('0px'),
                    backgroundColor: (isDisabled)?('var(--neutral200)'):('var(--neutral0)'),
                    maxWidth: (isFullWidth)?('100%'):('300px')
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                onClick={(!isDisabled)?(onClickOpenDropdown):(undefined)}
            > 
                {
                    (value)?(
                        <>
                            {(value.from)?(
                                <div style={{display:'flex'}}>
                                    <Text textLabel={`${format(value.from, 'dd MMM yyyy')}${value.to?(` - ${format(value.to, 'dd MMM yyyy')}`):('')}`} isEllipsistatic={true}/>
                                </div>
                            ):(
                                <Text textLabel={format(value, 'dd MMM yyyy')} isEllipsistatic={true}/>
                            )}
                        </>
                    ):(
                        <Text textLabel={placeholder} color={'var(--neutral400)'} isEllipsistatic={true}/>
                    )
                }
                <Icons className={'input-datepicker-button-icon'} iconName={(isDropdownShow)?('caret-up'):('caret-down')}/>
            </button>
            <div 
                ref={dropdownRef} 
                className='input-datepicker-dropdown-wrapper'
            >
                <DayPicker
                    month={month}
                    onMonthChange={setMonth}
                    mode={(type==='date-range')?("range"):("single")}
                    numberOfMonths={calendarSize}
                    selected={value}
                    onSelect={onChange}
                    modifiers={{ today: [new Date()] }}
                    modifiersStyles={{ today: {border:'1px solid var(--neutral400)'} }}
                    fromDate={
                        (value?.from)?(value.from):
                        (dayOpenBeforeToday)?(subDays(new Date(), dayOpenBeforeToday)):
                        (undefined)
                    }
                    toDate={(dayOpenAfterToday!==undefined)?(addDays(new Date(), dayOpenAfterToday)):(undefined)}
                    max={maxSelect}
                />
                
            </div>
        </div>

        
    )
}

export default InputDatePicker
import { useEffect, useRef, useState } from 'react'
import './styles.css'
import Text from '../Text'
import { createPopper } from '@popperjs/core'
import Icons from '../Icons'
import Spinner from '../Spinner'
import { debounce } from '../../untils/othersUtils'
import FormField from '../FormField'
import { join, map, orderBy, remove, some } from 'lodash'

const InputSelectMultiple = ({
    className,
    value,
    selectionList,

    //functions
    onSelectOption,
    onCloseDropdown,
    onLoadMoreOption,
    onSearchOption,

    //conditions
    isDisabled,
    isError,
    isOptionReady,
    isAllOptionNotLoaded,
    maxSelect,

    //styles and looks
    placeholder,
    prefix,
    prefixIconName,
    isRounded,
    isFullWidth,
}) =>{
    const [isRendered, setIsRendered] = useState(false)
    const targetRef = useRef(null)
    const dropdownListRef = useRef(null)
    const dropdownRef = useRef(null)

    const [isFocus, setIsFocus] = useState(false)
    const [isDropdownShow,setIsDropdownShow] = useState(false)
    const [targetWidth, setTargetWidth] = useState('')

    const [searchResultList, setSearchResultList] = useState(undefined)
    const [searchKey, setSearchKey] = useState('')
    
    const onChangeSearchKey = (newValue) =>{
        setSearchKey(newValue)
    }
    
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
                placement: 'bottom',
                modifiers: [
                    {
                        name: 'flip',
                        options: {
                            fallbackPlacements: ['bottom', 'top', 'right', 'left'],
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
        dropdownListRef.current.scrollTop = 0 
        if(dropdownRef.current){
            dropdownRef.current?.removeAttribute('data-show'); 
            setIsDropdownShow(false)
            onChangeSearchKey('')
        }
    }

    const onChange = (item) =>{
        if(onSelectOption){
            let tampValue = (value)?([...value]):([])
            if(some(tampValue, {'value' : item.value})){
                tampValue = remove(tampValue, (itemValue)=>itemValue.value!=item.value)
            }else{
                tampValue.push(item)
            }

            if((maxSelect)?(tampValue.length<=maxSelect):(true)){
                onSelectOption((tampValue.length)?(tampValue):(''))
            }
        }
    }

    const clearSelection = () =>{
        if(onSelectOption){
            onSelectOption('')
        }
    }

    const onClickSelectButton = () =>{
        if(dropdownRef.current.hasAttribute("data-show")){
            hide()
        }else{
            settingTargetWidth()
            show()
        }
    }

    const settingTargetWidth = () =>{
        setTargetWidth(targetRef.current?.clientWidth)
    }
    
    const onScrollDropdownBox = debounce((event) => {
        if(isAllOptionNotLoaded && onLoadMoreOption){ 
            const element = event.target
            if(Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 1){
                element.scrollTop = element.scrollTop - 1
                onLoadMoreOption()
            }
        }
    }, 800);

    const onSearchManual = () =>{
        if(searchKey){
            const tampSearchResult = selectionList.filter((item)=>item.label.toLowerCase().includes(searchKey.toLowerCase()))
            setSearchResultList(tampSearchResult)
        }else{
            setSearchResultList(undefined)
        }
    }

    useEffect(()=>{
        setIsRendered(true)
        createPopper(targetRef.current, dropdownRef.current, {
            placement: 'bottom',
            modifiers: [
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements: ['bottom', 'top', 'right', 'left'],
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
        let delayDebounceFn
        if(isRendered && onSearchOption){
            dropdownListRef.current.scrollTop = 0
            if(searchKey){
                delayDebounceFn = setTimeout(() => {
                    onSearchOption(searchKey)
                }, 800)
            }else{
                onSearchOption(searchKey)
            }
        }else if(isRendered){
            onSearchManual()
        }
        
        return () => clearTimeout(delayDebounceFn)
    },[searchKey])

    useEffect(()=>{
        dropdownListRef.current.scrollTop = 0
    },[searchResultList])

    useEffect(()=>{
        if(!isDropdownShow && isRendered && onCloseDropdown){
            onCloseDropdown(value)
        }
    },[isDropdownShow])
    return(
        <div className={`input-select-multi-wrapper ${(className)?(className):('')}`}>
            <button 
                ref={targetRef}
                className={'input-select-multi-button'}
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
                onClick={onClickSelectButton}
            > 
                {
                    (prefixIconName)&&(
                        <Icons 
                            className={'input-select-multi-button-prefix'}
                            iconName={prefixIconName} 
                            color={'gray500'}
                        />
                    )
                }
                {
                    (prefix)&&(
                        <Text
                            className={'input-select-multi-button-prefix'}
                            textLabel={prefix}
                            color={'gray500'}
                        />
                    )
                }
                {
                    (value)?(
                        <Text className={'input-select-multi-button-value'} textLabel={join(map(orderBy(value, ['label'], ['asc']),(item)=>{return item.label}), ', ')} isEllipsistatic={true}/>
                    ):(
                        <Text className={'input-select-multi-button-value'} textLabel={placeholder} color={'var(--neutral400)'}/>
                    )
                }
                <Icons className={'input-select-multi-button-icon'} iconName={(isDropdownShow)?('caret-up'):('caret-down')}/>
            </button>
            <div 
                ref={dropdownRef} 
                className='input-select-multi-dropdown-wrapper' 
                style={{ 
                    width:targetWidth?(targetWidth):('300px'),
                }}
            >  
                <div className='input-select-multi-dropdown-search-bar'>
                    {
                        ((onSearchOption) || (!onSearchOption && selectionList.length > 10))&&(
                            <FormField
                                config={{
                                    type:'text',
                                    placeholder:'Search',
                                    isDisabledTyping:!isOptionReady,
                                    isFullWidth:true
                                }}
                                value={searchKey}
                                onChangeField={onChangeSearchKey}
                            />          
                        )
                    }
                    {
                        ((searchResultList)?(searchResultList.length!==0):(!selectionList.length!==0))&&(
                            <Text
                                className={'input-select-multi-dropdown-clear-selection'}
                                onClick={
                                    (value)?(clearSelection):(undefined)
                                } 
                                textLabel={'Clear selection'} 
                                color={(value)?('var(--brand400)'):('var(--neutral400)')}
                            />
                        )
                    }
                    
                </div>
                
                <div
                    ref={dropdownListRef}
                    className='input-select-multi-dropdown-list-wrapper'
                    onScroll={onScrollDropdownBox}
                >
                    {
                        (isOptionReady)&&(
                            <>
                                {
                                    ((searchResultList)?(searchResultList):(selectionList)).map((item, index)=>{
                                        const selected =  some(value, { 'value':item.value });
                                        return(
                                            <button 
                                                key={item.id}
                                                className={`input-select-multi-dropdown-item ${(selected)?('item-selected'):('')}`}
                                                onClick={(item.disabled)?(undefined):(()=>{onChange(item)})}
                                                disabled={
                                                    item.disabled || ((selected)?(false):(maxSelect && value.length>=maxSelect)?(true):(false))
                                                }
                                            >
                                                <div 
                                                    className='input-select-multi-dropdown-item-check-box'
                                                    style={{
                                                        borderColor:(
                                                            (selected)?('var(--neutral400)'):
                                                            (maxSelect && value.length>=maxSelect || item.disabled)?('var(--neutral100)'):('var(--neutral400)')
                                                        ),
                                                        backgroundColor:(
                                                            (selected)?('var(--neutral0)'):
                                                            (maxSelect && value.length>=maxSelect || item.disabled)?('var(--neutral100)'):('var(--neutral0)')
                                                        )
                                                    }}
                                                >
                                                    <Icons 
                                                        iconName={'checked'} 
                                                        color={(selected)?('var(--brand700)'):('transparent')}
                                                    />
                                                </div>
                                                <Text 
                                                    textLabel={item.label} 
                                                    isEllipsistatic={true}
                                                    color={(
                                                        (selected)?('var(--neutral900)'):
                                                        (maxSelect && value.length>=maxSelect || item.disabled)?('var(--neutral300)'):('var(--neutral900)')
                                                    )}
                                                />
                                            </button>
                                        )
                                    })
                                }
                                {
                                    ((searchResultList)?(!searchResultList.length):(!selectionList.length))&&(
                                        <div className='input-select-multi-empty'>
                                            <Text textLabel={'Empty'} color={'var(--neutral400)'} />
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                    {
                        (isAllOptionNotLoaded || !isOptionReady)&&(
                            <div className='input-select-multi-dropdown-spinner-wrapper'>
                                <Spinner/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default InputSelectMultiple
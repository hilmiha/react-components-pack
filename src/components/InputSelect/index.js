import { useEffect, useRef, useState } from 'react'
import { COLORS } from '../../constant/theme'
import './styles.css'
import Text from '../Text'
import { createPopper } from '@popperjs/core'
import Icons from '../Icons'
import Spinner from '../Spinner'
import { debounce } from '../../untils/othersUtils'
import FormField from '../FormField'

const InputSelect = ({
    className,
    value,
    selectionList,

    //functions
    onSelectOption,
    onLoadMoreOption,
    onSearchOption,
    isShowSearch,

    //conditions
    isDisabled,
    isError,
    isOptionReady,
    isAllOptionNotLoaded,

    //styles and looks
    placeholder,
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
            onSelectOption((item.value)?(item):(''))
            targetRef.current.focus()
        }
        hide()
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
            if(Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 1 && isDropdownShow){
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

    return(
        <div className={`input-select-wrapper ${(className)?(className):('')}`}>
            <button 
                ref={targetRef}
                className={'input-select-button'}
                style={{
                    borderRadius:(isRounded)?('20px'):('6px'),
                    padding: (isRounded)?('0px 16px'):('0px 10px'),
                    borderColor: (isDisabled)?(COLORS.gray400):(isError)?(COLORS.danger400):(isFocus)?(COLORS.primary400):(COLORS.gray400),
                    boxShadow: (isFocus && !isDisabled)?(`0px 0px 2px 2px ${(isError)?(COLORS.danger100):(COLORS.primary100)}`):('none'),
                    backgroundColor: (isDisabled)?(COLORS.gray100):('white'),
                    maxWidth: (isFullWidth)?('100%'):('300px')
                }}
                onFocus={onFocus}
                onBlur={onBlur}
                onClick={onClickSelectButton}
            > 
                {
                    (value.value)?(
                        <Text textLabel={value.label} isEllipsistatic={true}/>
                    ):(
                        <Text textLabel={placeholder} color={'gray400'}/>
                    )
                }
                <Icons className={'input-select-button-icon'} iconName={(isDropdownShow)?('caret-up'):('caret-down')}/>
            </button>
            <div 
                ref={dropdownRef} 
                className='input-select-dropdown-wrapper' 
                style={{ 
                    width:targetWidth?(targetWidth):('300px'), 
                    borderColor:COLORS.gray400
                }}
            >  
                {
                    ((onSearchOption) || (!onSearchOption && selectionList.length > 10))&&(
                        <div className='input-select-dropdown-search-bar'>
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
                        </div>
                    )
                }
                
                <div
                    ref={dropdownListRef}
                    className='input-select-dropdown-list-wrapper'
                    onScroll={onScrollDropdownBox}
                >
                    <div style={{scrollSnapAlign: 'start', height:'1px', width:'100%'}}></div>
                    {
                        (isOptionReady)&&(
                            <>
                                {
                                    ((searchResultList)?(searchResultList):(selectionList)).map((item, index)=>(
                                        <button 
                                            key={item.id}
                                            className={`input-select-dropdown-item ${(value.value===item.value || value === item.value)?('item-selected'):('')}`}
                                            onClick={(item.disabled)?(undefined):(()=>{onChange(item)})}
                                            disabled={item.disabled}
                                        >
                                            <Text textLabel={item.label} isEllipsistatic={true}/>
                                            <Icons iconName={'checked'} color={(value.value===item.value || value === item.value)?('gray900'):('transparent')}/>
                                        </button>
                                    ))
                                }
                                {
                                    ((searchResultList)?(!searchResultList.length):(!selectionList.length))&&(
                                        <div className='input-select-empty'>
                                            <Text textLabel={'Not Found'} color={'gray400'} />
                                        </div>
                                    )
                                }
                            </>
                        )
                    }
                    {
                        (isAllOptionNotLoaded || !isOptionReady)&&(
                            <div className='input-select-dropdown-spinner-wrapper'>
                                <Spinner/>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default InputSelect
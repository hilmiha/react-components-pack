import { PiCaretDown, PiClover, PiCloverBold, PiListMagnifyingGlass, PiMagnifyingGlassBold, PiWarningDiamondFill, PiX, PiXBold } from "react-icons/pi"
import { processClassname } from "../../helper"
import TextField, { errorType } from "../text-field"
import './styles.scss'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, autoUpdate, flip, offset, shift, size, useDismiss, useFloating, useInteractions } from "@floating-ui/react"
import DropdownMenuItemGroup from "../dropdown-menu-item-group"
import DropdownSelectionItem from "../dropdown-selection-item"
import { GlobalContext, GlobalContextType } from "../../context/globalcontext"
import IconButton from "../icon-button"
import { useLocation, useNavigate } from "react-router-dom"
import { debounce, difference, sortBy } from "lodash"
import Skeleton from "../skeleton"

type selectionFieldType = 'selection' | "multi-selection"
export type itemSelectionValue = string
export type selectionValueType = itemSelectionValue[]
export type valueListItem = {id:string, txtLabel:string, txtSublabel?:string, txtInFiled?:string, value:string, isDisabled?:boolean}
export type valueList = {id:string, title?:string, menu:valueListItem[]}[]

type Props = {
    className?: string
    type:selectionFieldType
    value?: selectionValueType
    txtLabel?:string
    txtPlaceholder?:string
    onChange?: (newValue:selectionValueType) => void,
    getListAsync?: (pageNumber:number, searchKey?:string)=>Promise<{list: valueListItem[]; pageNumber:number;  searchKey:string|undefined; totalPage: number}>
    onValidate?: (errorResult:errorType, newValue:selectionValueType, config?:Record<any, any>) => void,
    valueList:valueList | valueListItem[],
    setValueList?:React.Dispatch<React.SetStateAction<valueListItem[]>>
    error?: errorType
    config?: {
        prefix?: string | JSX.Element,
        maxSelection?: number,
        isMandatory?: boolean,
        isWithSearch?:boolean,
        isForceMobile?:boolean
    }
    isDisabled?:boolean
    isShowClear?:boolean
}
const SelectionField = ({
    className,
    type = 'selection',
    value = [],
    txtLabel,
    txtPlaceholder,
    onChange,
    getListAsync,
    onValidate,
    valueList = [],
    setValueList,
    error,
    config,
    isDisabled=false,
    isShowClear=true
}:Props) => {
    const navigate = useNavigate()
    const location = useLocation()

    const valueListProcessed = useMemo(()=>{
        if(valueList.length>0){
            if((valueList as valueList)[0].menu){
                return valueList as valueList
            }else{
                return([{
                    id:'o',
                    menu: valueList as valueListItem[]
                }])
            }
        }else{
            return([])
        }
    },[valueList])

    const [isFieldTouched, setIsFieldTouched] = useState(false);
    const isMandatory = config?.isMandatory
    const prefix = config?.prefix
    const [hidden, setHidden] = useState(0)

    const {
        mediaSize
    } = useContext(GlobalContext) as GlobalContextType;

    const [searchFieldValue, setSearchFieldValue] = useState('')
    const [searchResult, setSearchResult] = useState<valueList>([])
    const [resized, setResized] = useState(false)

    //---- Start of Popup thingy 
    const [isOpenDropdown,setIsOpenDropdown] = useState(false)
    const { refs, floatingStyles, context } = useFloating({
        placement:'bottom-start',
        open: isOpenDropdown,
        onOpenChange: ()=>{onCloseDropdown()},
        middleware: [
            offset(8),
            shift(),
            flip({
                fallbackPlacements:['bottom-start', 'bottom-end', "bottom", 'top-start', 'top-end', "top", "right-start", 'right-end', "left-start", "left-end"],
                padding: 10,
            }),
            size((config?.isForceMobile)?(undefined):mediaSize>0?(
                {
                    apply({rects, elements}) {
                        Object.assign(elements.floating.style, {
                            width: `${rects.reference.width}px`,
                        });
                    },
                }
            ):(undefined))
        ],
        whileElementsMounted: autoUpdate
    }); 
    
    const dismiss = useDismiss(context,{
        outsidePressEvent: 'click'
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        dismiss
    ]);
    // ----- End of Popup Thingy

    const placeholderElementRef = useRef(null)
    
    function getTitleSuffix() {
        let element:any = placeholderElementRef.current
        let count = 0;

        let fullHidden = 0 
        if(element){
            var text = valueText
            element.innerHTML = '';
            for (var i = 0; i < text.length; i++) {
                var newNode = document.createElement('span');
                newNode.appendChild(document.createTextNode(text.charAt(i)));
                element.appendChild(newNode);
                if (newNode.offsetLeft < element.offsetWidth) {
                    count++;
                }else{
                    fullHidden++
                }
            }
            element.innerHTML = valueText;
        }

        let substr = valueText;
        substr = substr.substring(count - 4);
        let sisa = substr.split(',').length - 1;

        if(fullHidden > 1){
            setHidden(sisa);
        }else{
            setHidden(0);
        }
    }

    const onClickInputField = () =>{
        if(!isDisabled){
            setIsOpenDropdown(!isOpenDropdown)
            if(mediaSize<1){
                navigate(`${location.hash}#modal-selection-open`)
            }
        }
    }
    const validateField = (value:selectionValueType) =>{
        let tampError:errorType = {isError:false, errorMessage:''}
        let error = false
        
        if(isMandatory && !error){
            if(value.length===0){
                error=true
            }

            if(error){
                tampError.isError = true
                tampError.errorMessage = "This field can't be empty!"
            }
        }

        return tampError
    }
    const onCloseDropdown = () =>{
        setIsOpenDropdown(false)
        if(location.hash.includes('#modal-selection-open')){
            navigate(-1)
        }
    }

    const thisOnClickManuItem = (itemValue:valueListItem) =>{
        if(type==='selection'){
            if(onChange){
                if(itemValue.value){
                    let tampNewItem:itemSelectionValue = itemValue.value
                    onChange([tampNewItem])
                }else{
                    onChange([])
                }
            }
            onCloseDropdown()
        }else{
            if(onChange){
                let tampNewValue = [...value]
                if(isSelected(itemValue.value)){
                    tampNewValue = tampNewValue.filter((itm)=>(itm!==itemValue.value))
                    onChange(tampNewValue)
                }else{
                    tampNewValue.push(itemValue.value)
                    onChange(tampNewValue)
                }
            }
        }

        if(!isFieldTouched){
            setIsFieldTouched(true)
        }
    }

    const isSelected = (toCheckValue:string) =>{
        return(value.includes(toCheckValue))
    }

    const valueText = useMemo(()=>{
        if(value.length>0){
            let tamp:valueListItem[] = []
            
            if(valueList.length>0 && (valueList as valueList)[0].menu){
                (valueList as valueList).forEach((itm)=>{
                    itm.menu.forEach((itmValue)=>{
                        if(value.includes(itmValue.value)){
                            tamp.push(itmValue)
                        }
                    })
                    
                })
            }else{
                (valueList as valueListItem[]).forEach((itm)=>{
                    if(value.includes(itm.value)){
                        tamp.push(itm)
                    }
                })
            }

            let tampValueLoadingString = difference(value, (tamp.map(itm=>itm.value)))
            tampValueLoadingString.map(itm=>{
                tamp.push({
                    id:`tamp-${itm}`,
                    txtLabel:itm,
                    value:itm
                })
            })
            
            const tampString = sortBy(tamp, ['txtLabel']).map((itm)=>{
                return(itm.txtInFiled?itm.txtInFiled:itm.txtLabel)
            }).join(', ')

            return tampString
        }else{
            return ' '
        }
    },[value, valueList])

    //Async Functions ====
    const refLoader = useRef<HTMLDivElement>(null)
    const refListConatinet = useRef<HTMLDivElement>(null)

    const [doGetListAsync, setDoGetListAsync] = useState(true)
    const [isAsyncListReady, setIsAsyncListReady] = useState(false)

    const [asyncListConfig, setAsyncListConfig] = useState({
        page:1,
        maxPage:0,
    })
    const [asyncListSearchConfig, setAsyncListSearchConfig] = useState({
        page:1,
        maxPage:0,
    })
    const [isValueListCompleted, setIsValueListCompleted] = useState(getListAsync?(false):(true))
    const [isValueListSearchCompleted, setIsValueListSearchCompleted] = useState(getListAsync?(false):(true))

    const onThisLoadMore = debounce(()=>{
        const element= refListConatinet.current
        if(searchFieldValue.length<=2){
            if(
                element && 
                !isValueListCompleted &&
                Math.abs(element.scrollHeight - (element.scrollTop + element.clientHeight)) <= 320 &&
                element.scrollTop!==0 &&
                isAsyncListReady
            ){
                const tampAsyncListConfig = {...asyncListConfig}
                tampAsyncListConfig.page = asyncListConfig.page + 1
                setAsyncListConfig(tampAsyncListConfig)
                setIsAsyncListReady(false)
                setDoGetListAsync(true)
            }
        }else{
            if(
                element && 
                !isValueListSearchCompleted &&
                Math.abs(element.scrollHeight - (element.scrollTop + element.clientHeight)) <= 320 &&
                element.scrollTop!==0 &&
                isAsyncListReady
            ){
                const tampAsyncListConfig = {...asyncListSearchConfig}
                tampAsyncListConfig.page = asyncListSearchConfig.page + 1
                setAsyncListSearchConfig(tampAsyncListConfig)
                setIsAsyncListReady(false)
                setDoGetListAsync(true)
            }
        }
    },300)

    useEffect(()=>{
        if(getListAsync && doGetListAsync && setValueList){
            getListAsync((searchFieldValue.length>2)?(asyncListSearchConfig.page):(asyncListConfig.page), searchFieldValue).then(({list, pageNumber, searchKey, totalPage})=>{
                console.log(list)

                if(searchFieldValue.length<=2){
                    let tamp = []
                    if(valueListProcessed.length){            
                        tamp = [...valueListProcessed[0].menu, ...list]
                    }else{
                        tamp = [...list]
                    }

                    if(tamp.length>0){
                        setValueList(tamp)
                    }else{
                        setValueList([])
                    }
                    

                    if(pageNumber===totalPage|| tamp.length===0){
                        setIsValueListCompleted(true)
                    }
                }else{
                    let tamp = []
                    if(pageNumber>1 && searchResult.length && searchResult[0].menu.length>1){
                        tamp = [...searchResult[0].menu, ...list]
                    }else{
                        tamp = [...list]
                    }
                    
                    if(tamp.length>0){
                        setSearchResult([
                            {
                                id:"1",
                                menu:tamp
                            }
                        ])
                    }else{
                        setSearchResult([])
                    }

                    if(pageNumber===totalPage || tamp.length===0){
                        setIsValueListSearchCompleted(true)
                    }
                }
                setIsAsyncListReady(true)
                setDoGetListAsync(false)
            })
        }
    },[doGetListAsync])
    //Async Functions =====

    const clearSelection = (isFormButton?:boolean) =>{
        if(onChange){
            onChange([])
        }
        if(isFormButton){
            let formField = refs.domReference.current as HTMLButtonElement
            setTimeout(() => {
                formField.focus()
            }, 10);
        }

        setSearchFieldValue('')
        setSearchResult([])
    }

    const thisOnSearch = (isClear:boolean) =>{
        setAsyncListSearchConfig({
            page:1,
            maxPage:0
        })
        if(isClear){
            setSearchResult([])
            setIsValueListSearchCompleted(false)
        }else{
            setSearchResult([])
            setIsValueListSearchCompleted(false)
            setIsAsyncListReady(false)
            setDoGetListAsync(true)
        }
    }
    const debounceFn = useCallback(debounce(thisOnSearch, 500), []);

    const onChangeSearch = (newSearchKey:string) =>{
        if(!getListAsync){
            setSearchFieldValue(newSearchKey)
            let tampSearchResult:valueList = []
            if(newSearchKey.length>2){
                valueListProcessed.forEach((valueGroup)=>{
                    const tampItemMenu = valueGroup.menu.filter((itm)=>(
                        itm.txtLabel.toLocaleLowerCase().includes(newSearchKey.toLocaleLowerCase())||
                        itm.txtSublabel?.toLocaleLowerCase().includes(newSearchKey.toLocaleLowerCase())
                    ))
                    if(tampItemMenu.length){
                        tampSearchResult.push({
                            ...valueGroup,
                            menu:[...tampItemMenu]
                        })
                    }
                })
                setSearchResult(tampSearchResult)
            }else{
                setSearchResult(tampSearchResult)
            }
            setIsValueListSearchCompleted(true)
        }else{
            if(isAsyncListReady){
                setSearchFieldValue(newSearchKey)
                debounceFn(newSearchKey.length<=2)

                if(newSearchKey.length===0 && searchResult){
                    setTimeout(() => {
                        setSearchResult([])
                        setIsValueListSearchCompleted(false)
                        refListConatinet.current?.scrollTo(0,0)
                    }, 10);
                }
            }
        }
    }

    useEffect(()=>{
        if(!location.hash.includes('#modal-selection-open')){
            setIsOpenDropdown(false)
        }
    },[location])

    useEffect(()=>{
        if(mediaSize<1 && !location.hash.includes('#modal-selection-open') && isOpenDropdown){
            navigate(`${location.hash}#modal-selection-open`)
        }
    },[mediaSize])

    useEffect(()=>{
        getTitleSuffix()
    },[value, resized])

    useEffect(()=>{
        if(!isOpenDropdown){
            getTitleSuffix()

            if(onValidate && isFieldTouched){
                const configTamp = config
                onValidate(validateField(value), value, configTamp)
            }
        }
    },[isOpenDropdown])

    useEffect(()=>{
        if (!placeholderElementRef.current) {
            return;
        }
        var doit:any;

        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(doit);
            doit = setTimeout(function() {
                setResized((prv)=>{return !prv})
            }, 20);
        });

        resizeObserver.observe(placeholderElementRef.current);
        
        return function cleanup() {
            clearTimeout(doit);
            resizeObserver.disconnect();
        }
    },[])

    useEffect(()=>{
        // if(onAsyncSearch){
        //     if(searchResult){
        //         onChangeSearch('')
        //     }
        // }else{
            setSearchFieldValue('')
            setSearchResult([])
            setIsValueListSearchCompleted(false)
        // }
    },[isOpenDropdown])

    const selectionContent = () =>{
        return(
            <>
                {
                    (config?.isWithSearch || getListAsync || type==="multi-selection")&&(
                        <div className="search-container">
                            {
                                (config?.isWithSearch || getListAsync)&&(
                                    <TextField
                                        type="text"
						                txtPlaceholder='Search list'
                                        value={searchFieldValue}
                                        onChange={(newValue)=>{onChangeSearch(newValue)}}
                                        config={{
                                            sufix:<PiMagnifyingGlassBold />
                                        }}
                                        isShowClear={false}
                                    />
                                )
                            }
                            
                            {
                                (type==="multi-selection")&&(
                                    <button
                                        className={
                                            processClassname(`field-option-clear-selection
                                            ${value.length===0?('disabled'):('')}`)  
                                        }
                                        onClick={()=>{clearSelection()}}
                                        disabled={value.length===0}
                                    >
                                        Clear Selection
                                    </button>
                                )
                            }
                        </div>
                    )
                }
                <div ref={refListConatinet} className="item-selection-container" onScroll={()=>{onThisLoadMore()}}>
                    {
                        (searchFieldValue.length>2)?(
                            <>
                                {
                                    searchResult.map((itmValueGroup, index)=>(
                                        <DropdownMenuItemGroup 
                                            key={itmValueGroup.id}
                                            txtLabel={itmValueGroup.title}
                                            isHasSeparator={index > 0}
                                        >
                                            {
                                                itmValueGroup.menu.map((itmValue, index)=>(
                                                    <DropdownSelectionItem
                                                        className='field-option-dropdown-item-menu'
                                                        key={itmValue.id}
                                                        txtLabel={itmValue.txtLabel}
                                                        txtSublabel={itmValue.txtSublabel}
                                                        onClick={()=>{thisOnClickManuItem(itmValue)}}
                                                        isSelected={isSelected(itmValue.value)}
                                                        isDisabled={itmValue.isDisabled}
                                                        isWithCheckbox={type==='multi-selection'}
                                                    />
                                                ))
                                            }
                                        </DropdownMenuItemGroup>
                                    ))
                                }
                                {
                                    (searchResult.length===0 && isValueListSearchCompleted)&&(
                                        <div className="item-selection-empty">
                                            <PiListMagnifyingGlass size={40}/>
                                            <p className="font-title">No Result Found</p>
                                            <p className="font-text">Try another search</p>
                                        </div>
                                    )
                                }
                            </>
                        ):(
                            valueListProcessed.map((itmValueGroup, index)=>(
                                <DropdownMenuItemGroup 
                                    key={itmValueGroup.id}
                                    txtLabel={itmValueGroup.title}
                                    isHasSeparator={index > 0}
                                >
                                    {
                                        itmValueGroup.menu.map((itmValue, index)=>(
                                            <DropdownSelectionItem
                                                className='field-option-dropdown-item-menu'
                                                key={itmValue.id}
                                                txtLabel={itmValue.txtLabel}
                                                txtSublabel={itmValue.txtSublabel}
                                                onClick={()=>{thisOnClickManuItem(itmValue)}}
                                                isSelected={isSelected(itmValue.value)}
                                                isDisabled={itmValue.isDisabled}
                                                isWithCheckbox={type==='multi-selection'}
                                            />
                                        ))
                                    }
                                </DropdownMenuItemGroup>
                            ))
                        )
                    }
                    {
                        ((searchFieldValue.length>2 && getListAsync)?(!isValueListSearchCompleted):(!isValueListCompleted))&&(
                            <div ref={refLoader} className="skeleton-container-options">
                                {
                                    (type==='multi-selection')?(
                                        <>
                                            <div className="skeleton-option-item">
                                                <Skeleton width={18} height={18}/><Skeleton/>
                                            </div>
                                            <div className="skeleton-option-item">
                                                <Skeleton width={18} height={18}/><Skeleton/>
                                            </div>
                                            <div className="skeleton-option-item">
                                                <Skeleton width={18} height={18}/><Skeleton/>
                                            </div>
                                            <div className="skeleton-option-item">
                                                <Skeleton width={18} height={18}/><Skeleton/>
                                            </div>
                                        </>
                                    ):(
                                        <>
                                            <div className="skeleton-option-item">
                                                <Skeleton/>
                                            </div>
                                            <div className="skeleton-option-item">
                                                <Skeleton/>
                                            </div>
                                            <div className="skeleton-option-item">
                                                <Skeleton/>
                                            </div>
                                            <div className="skeleton-option-item">
                                                <Skeleton/>
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </>
        )
    }

    return(
        <div
            className={
                processClassname(`selection-field field
                ${className?(className):('')}`)  
            }
        >
            {
                (txtLabel)&&(
                    <>
                        <span 
                            className={
                                processClassname(`field-label
                                ${(isDisabled)?('disabled'):('')}`)  
                            }
                        >
                            {txtLabel}{isMandatory&&(<span className='field-label-asteric'>*</span>)}
                        </span>
                    </>
                )
            }
            <div style={{position:'relative'}}>
                <button 
                    className={
                        processClassname(`field-container selection-field-input-container
                        ${(isShowClear)?('is-show-clear'):('')}
                        ${(error?.isError)?('error'):('')}
                        ${(isDisabled)?('disabled'):('')}`)  
                    }
                    ref={refs.setReference} 
                    {...getReferenceProps()}
                    onClick={onClickInputField}
                    disabled={isDisabled}
                >
                    {(prefix)&&(
                        <span className='field-prefix-sufix'>{prefix}</span>
                    )}
                    <div className="selection-field-input">
                        <span style={{float:"right", color:(hidden===0)?("transparent"):('hsl(var(--color-neutral-1100))')}}>{`and ${hidden} more`}</span>
                        <div ref={placeholderElementRef} className='selection-field-input-value'>{valueText}</div>
                        <span className='field-placeholder' style={{display:`${value.length>0?('none'):('unset')}`}}>{txtPlaceholder}</span>
                    </div>
                </button>
                {
                    (value.length>0 && !isOpenDropdown && !isDisabled && isShowClear)&&(
                        <IconButton
                            className="clear-button"
                            appearance="subtle"
                            spacing="compact"
                            onClick={()=>{clearSelection(true)}}
                            Icon={<PiX/>}
                        />
                    )
                }
                <div className="caret-selection">
                    <PiCaretDown/>
                </div>
            </div>
            

            {(isOpenDropdown && mediaSize>0 && !config?.isForceMobile) && (
                <FloatingPortal>
                    <FloatingFocusManager
                        order={['reference', 'content']}
                        modal={true}
                        context={context} 
                        closeOnFocusOut={true}
                        returnFocus={true}
                    >
                        <div className="field-option-dropdown">
                            <div className='field-option-dropdown-menu' ref={refs.setFloating} {...getFloatingProps()} style={{...floatingStyles}}>
                                {selectionContent()}
                            </div>
                        </div>
                    </FloatingFocusManager>
                </FloatingPortal>
            )}
            {(isOpenDropdown && (mediaSize<1 || config?.isForceMobile)) && (
                <FloatingPortal>
                    <FloatingOverlay className="dropdown-menu-selection-mobile-overlay" lockScroll>
                        <FloatingFocusManager context={context}>
                            <div
                                className={
                                    processClassname(`dropdown-menu-selection-mobile-box`)  
                                }
                                ref={refs.setFloating}
                                {...getFloatingProps()}
                            >
                                <div className="dropdown-menu-mobile-header">
                                    <span className="dropdown-menu-mobile-header-title">{txtLabel?txtLabel:'Options'}</span>
                                    <IconButton
                                        Icon={<PiXBold/>}
                                        appearance="subtle"
                                        spacing="compact"
                                        onClick={onCloseDropdown}
                                    />
                                </div>
                                <div className="dropdown-menu-mobile-content">
                                    {selectionContent()}
                                </div>
                            </div>
                        </FloatingFocusManager>
                    </FloatingOverlay>
                </FloatingPortal>
            )}
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

export default SelectionField

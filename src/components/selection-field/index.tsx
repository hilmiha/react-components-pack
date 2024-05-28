import { PiMagnifyingGlassBold, PiWarningDiamondFill, PiX, PiXBold } from "react-icons/pi"
import { processClassname } from "../../helper"
import TextField, { errorType } from "../text-field"
import './styles.scss'
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, autoUpdate, flip, offset, shift, size, useDismiss, useFloating, useInteractions } from "@floating-ui/react"
import DropdownMenuItemGroup from "../dropdown-menu-item-group"
import DropdownSelectionItem from "../dropdown-selection-item"
import { GlobalContext, GlobalContextType } from "../../context/globalcontext"
import IconButton from "../icon-button"
import { useLocation, useNavigate } from "react-router-dom"
import { sortBy } from "lodash"

type selectionFieldType = 'selection' | "multi-selection"
export type itemSelectionValue = {txtLabel:string, txtSublabel?:string, txtInFiled?:string, value:string}
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
    onValidate?: (errorResult:errorType, newValue:selectionValueType, config?:Record<any, any>) => void,
    valueList:valueList
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
    onValidate,
    valueList = [],
    error,
    config,
    isDisabled=false,
    isShowClear=true
}:Props) =>{
    const navigate = useNavigate()
    const location = useLocation()

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

    const thisOnClickManuItem = (itemValue:itemSelectionValue) =>{
        if(type==='selection'){
            if(onChange){
                if(itemValue.value){
                    let tampNewItem:itemSelectionValue = {
                        txtLabel:itemValue.txtLabel,
                        value:itemValue.value,
                    }
                    if(itemValue.txtInFiled){
                        tampNewItem.txtInFiled = itemValue.txtInFiled
                    }
                    if(itemValue.txtSublabel){
                        tampNewItem.txtSublabel = itemValue.txtSublabel
                    }
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
                    tampNewValue = tampNewValue.filter((itm)=>(itm.value!==itemValue.value))
                }else{
                    let tampNewItem:itemSelectionValue = {
                        txtLabel:itemValue.txtLabel,
                        value:itemValue.value,
                    }
                    if(itemValue.txtInFiled){
                        tampNewItem.txtInFiled = itemValue.txtInFiled
                    }
                    if(itemValue.txtSublabel){
                        tampNewItem.txtSublabel = itemValue.txtSublabel
                    }
                    tampNewValue.push(tampNewItem)
                }

                onChange(tampNewValue)
            }
            
        }

        if(!isFieldTouched){
            setIsFieldTouched(true)
        }
    }

    const isSelected = (toCheckValue:string) =>{
        const valueToString = JSON.stringify(value);
        return valueToString.includes(`"value":"${toCheckValue}"`)
    }

    const valueText = useMemo(()=>{
        if(value.length>0){
            const tamp = sortBy(value, ['txtLabel']).map((itm)=>{
                return(itm.txtInFiled?itm.txtInFiled:itm.txtLabel)
            }).join(', ')
    
            return tamp
        }else{
            return ' '
        }
    },[value])

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

    const onChangeSearch = (newSearchKey:string) =>{
        setSearchFieldValue(newSearchKey)

        let tampSearchResult:valueList = []
        if(newSearchKey.length>2){
            valueList.forEach((valueGroup)=>{
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
        setSearchFieldValue('')
        setSearchResult([])
    },[isOpenDropdown])

    const selectionContent = () =>{
        return(
            <>
                {
                    (config?.isWithSearch || type==="multi-selection")&&(
                        <div className="search-container">
                            {
                                (config?.isWithSearch)&&(
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
                <div className="item-selection-container">
                    {
                        (searchFieldValue.length>2)?(
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
                        ):(
                            valueList.map((itmValueGroup, index)=>(
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
                        processClassname(`selection-field-input-container field-container
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
                            Icon={PiX}
                        />
                    )
                }
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
                                        Icon={PiXBold}
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
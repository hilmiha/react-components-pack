import { PiWarningDiamondFill } from 'react-icons/pi'
import { formatText, processClassname } from '../../helper'
import './styles.scss'
import { IconType } from 'react-icons'
import { useState } from 'react'
import { FloatingFocusManager, autoUpdate, flip, offset, shift, size, useClick, useDismiss, useFloating, useInteractions, useRole } from '@floating-ui/react'
import DropdownManuItem from '../dropdown-menu-item'
import { menuList } from '../dropdown-menu'
import DropdownMenuItemGroup from '../dropdown-menu-item-group'

type textFieldType = 'text' | 'text-no-space' | 'text-only-number' | 'text-number'
type valueType = string | undefined
type errorType = {isError: boolean, errorMessage:string}
export type valueListItem = {id:string, txtLabel:string, txtSublabel?:string, value?:any, isDisabled?:boolean}
export type valueList = valueListItem[] | []


type Props = {
    className?: string
    type:textFieldType
    value?: valueType
    txtLabel?:string
    onChange?: (newValue:valueType) => void,
    onValidate?: (errorResult:errorType, newValue:valueType, config?:Record<any, any>) => void,
    isFixedValue?:boolean
    valueList?:valueList
    error?: errorType
    config?: {
        prefix?: string | JSX.Element,
        sufix?: string | JSX.Element,
        maxLength?: number,
        isMandatory?: boolean,
        minValue?:number,
        maxValue?:number,
        regex?:RegExp | [RegExp, string]
    }
}

const TextField = ({
    className,
    type,
    txtLabel,
    value,
    onChange,
    onValidate,
    isFixedValue = false,
    valueList = [],
    config,
    error
}:Props) =>{
    const [prevValue, setPrevValue] = useState<valueType>('')
    const [isFieldTouched, setIsFieldTouched] = useState(false);
    const [isOpenDropdown, setIsOpenDropdown] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        placement:'bottom-start',
        open: isOpenDropdown,
        onOpenChange: setIsOpenDropdown,
        middleware: [
            offset(6),
            shift(),
            flip({
                fallbackPlacements:['bottom-start', 'bottom-end', "bottom", 'top-start', 'top-end', "top", "right-start", 'right-end', "left-start", "left-end"],
                padding: 100,
            }),
            size({
                apply({rects, elements}) {
                    Object.assign(elements.floating.style, {
                        width: `${rects.reference.width}px`,
                    });
                },
            })
        ],
        whileElementsMounted: autoUpdate
    }); 

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        dismiss
    ]);

    const isMandatory = config?.isMandatory===true
    const prefix = config?.prefix
    const sufix = config?.sufix

    const processValue = (isForMask:boolean, newValue?:valueType) =>{
        let tampValue = newValue?newValue:''
        let tampMaskedValue = newValue?newValue:''
        
        if(type==='text-no-space' && typeof tampValue === 'string'){
            const tamp = formatText(type, tampValue.slice(0,(config?.maxLength)?(config.maxLength):(tampValue.length)))
            tampValue = tamp.realValue
            tampMaskedValue= tamp.formatedText
        }else if(type==='text-only-number' && typeof tampValue === 'string'){
            const tamp = formatText(type, tampValue.slice(0,(config?.maxLength)?(config.maxLength):(tampValue.length)))
            tampValue = tamp.realValue
            tampMaskedValue= tamp.formatedText
        }else if(type==='text-number'){
            const tampTamp =  (tampValue?(tampValue):('')).toString().replace(/[^0-9]+/g, "")
            const tamp = formatText(type, tampTamp.slice(0,(config?.maxLength)?(config.maxLength):(tampTamp.length)))
            tampValue = tamp.formatedText.replace(/[^0-9]+/g, "")
            tampMaskedValue= tamp.formatedText
        }else{
            tampValue = (typeof tampValue === 'string')?(tampValue.slice(0,(config?.maxLength)?(config.maxLength):(tampValue.length))):(tampValue)
            tampMaskedValue = tampValue?tampValue.toString():''
        }
        
        return((isForMask)?(tampMaskedValue):(tampValue))
    }

    const validateField = (value:valueType) =>{
        let tampError:errorType = {isError:false, errorMessage:''}
        let error = false

        if(isMandatory && !error){
            if(typeof value==='string' && !value){
                error=true
            }else if(typeof value==='number' && value===undefined){
                error=true
            }

            if(error){
                tampError.isError = true
                tampError.errorMessage = "This field can't be empty!"
            }
        }
        
        if((config?.regex !== undefined) && typeof value === 'string' && !error){
            if(!((Array.isArray(config.regex))?(config.regex[0].test(value)):(config.regex.test(value)))){
                tampError.isError = true
                tampError.errorMessage = Array.isArray(config.regex)?config.regex[1]:"This field value does not have the correct format!"
            }
        }
        
        if(((config?.minValue)!==undefined) && typeof value==='number' && !error){
            if(value<config.minValue){
                error=true
            }
            if(error){
                tampError.isError = true
                tampError.errorMessage = `This field value must more than ${formatText('text-number',config.minValue).formatedText}!`
            }
        }

        if(((config?.maxValue)!==undefined) && typeof value==='number' && !error){
            if(value>config.maxValue){
                error=true
            }
            if(error){
                tampError.isError = true
                tampError.errorMessage = `This field value must less than ${formatText('text-number',config.maxValue).formatedText}!`
            }
        }

        return tampError
    }

    const thisOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const newValue = processValue(false, event.target.value)

        if(onChange && newValue!==value){
            onChange(newValue)
        }

        if(!isFieldTouched){
            setIsFieldTouched(true)
        }
    }

    const thisOnBlur = (event: React.ChangeEvent<HTMLInputElement> | string) =>{
        const processedValue = processValue(false, (typeof event === 'string')?event:event.target.value)

        const valueTrim = typeof processedValue === 'string'?processedValue.trim():processedValue
        
        if(onChange && valueTrim!==value){
            onChange(valueTrim)
        }

        if(onChange && isFixedValue && valueTrim){
            const found = valueList.find((itmToSearch)=>(`${itmToSearch.txtLabel}${itmToSearch.txtSublabel?(` | ${itmToSearch.txtSublabel}`):('')}`===valueTrim))
            console.log(found)
            if(!found){
                onChange(prevValue)
            }
        }

        if(onValidate && isFieldTouched){
            const configTamp = config
            onValidate(validateField(valueTrim), valueTrim, configTamp)
        }
    }

    const thisOnClickManuItem = (valueItem:valueListItem) =>{
        if(onChange){
            onChange(`${valueItem.txtLabel}${valueItem.txtSublabel?(` | ${valueItem.txtSublabel}`):('')}`)
        }
        setIsOpenDropdown(false)
    }

    const thisOnFocus = () =>{
        setPrevValue(value)
        setIsOpenDropdown(true)
    }

    return(
        <>
            <div 
                className={
                    processClassname(`text-field
                    ${className?(className):('')}`)  
                }
            >
                {
                    (txtLabel)&&(
                        <>
                            <span className='text-field-label'>{txtLabel}{isMandatory&&(<span className='text-field-label-asteric'>*</span>)}</span>
                        </>
                    )
                }
                <div className='text-field-input-container' ref={refs.setReference} {...getReferenceProps()} onClick={thisOnFocus}>
                    {(prefix)&&(
                        <span className='text-field-prefix-sufix'>{prefix}</span>
                    )}
                    <input
                        className={'text-field-input'}
                        value={processValue(true, value)}
                        onBlur={thisOnBlur}
                        onFocus={thisOnFocus}
                        onChange={thisOnChange}
                        type={(type==='text-number'|| type==='text-only-number')?'tel':'text'}
                    />
                    {(sufix)&&(
                        <span className='text-field-prefix-sufix'>{sufix}</span>
                    )}
                </div>
                {
                    (error?.isError)&&(
                        <span className='text-field-error-message'>
                            <PiWarningDiamondFill/> {error.errorMessage}
                        </span>
                    )
                }

                {(isOpenDropdown && valueList.length > 0) && (
                    <FloatingFocusManager
                        initialFocus={-1}
                        context={context} 
                        modal={false}
                        closeOnFocusOut={true}
                    >
                        <div className='field-option-dropdown-menu' ref={refs.setFloating} {...getFloatingProps()} style={{...floatingStyles}}>
                            {
                                valueList.map((itemValue, index)=>(
                                    <DropdownManuItem
                                        className='field-option-dropdown-item-menu'
                                        key={itemValue.id}
                                        txtLabel={itemValue.txtLabel}
                                        txtSublabel={itemValue.txtSublabel}
                                        spacing={'default'}
                                        onClick={()=>{thisOnClickManuItem(itemValue)}}
                                        isDisabled={itemValue.isDisabled}
                                    />
                                ))
                            }
                        </div>
                    </FloatingFocusManager>
                    
                )}
            </div>
        </>
    )
}

export default TextField
import './styles.scss'
import { processClassname } from "../../helper"
import { errorType } from '../text-field'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { PiWarningDiamondFill } from 'react-icons/pi'
import Checkbox from '../checkbox'
import { intersection, pullAll, union } from 'lodash'

export type valueCheckboxField = string[]
export type valueListItemCheckboxField = {id:string, txtLabel:string, txtSublabel?:string,  isDisabled?:boolean, value:string}
export type valueListCheckboxField = {id:string, txtLabel:string, txtSublabel?:string, isDisabled?:boolean, value:string, childMenu?:valueListItemCheckboxField[]}[]

type CheckboxFieldProps = {
    className?: String
    txtLabel?:string
    value:valueCheckboxField
    onChange?:(newValue:valueCheckboxField) => void ,
    onValidate?: (errorResult:errorType, newValue:valueCheckboxField, config?:Record<any, any>) => void,
    valueList:valueListCheckboxField
    error?: errorType
    isDisabled?:boolean
    config?: {
        isMandatory?: boolean,
        maxSelection?: number
    }
}

type CheckboxGroup = {
    txtLabel:string
    txtSublabel?:string
    childMenu:valueListItemCheckboxField[]
    onClick?:(valueClicked:string | {valueParents:string[], isWillSelectAll:boolean})=>void
    value:valueCheckboxField
    isDisabled?:boolean
    isError?:boolean
}

const CheckboxGroup = ({
    txtLabel,
    txtSublabel,
    childMenu,
    onClick,
    value,
    isDisabled=false,
    isError=false
}:CheckboxGroup) =>{
    const childListValues = useMemo(()=>{
        return childMenu.map((itm)=>itm.value)
    },[childMenu])

    const isSelectedParent = useMemo(()=>{
        return intersection(childListValues, value).length > 0
    },[value, childMenu])

    const isSelectedAll = useMemo(()=>{
        return childListValues.length === intersection(childListValues, value).length
    },[value, childMenu])

    const thisOnClick = (valueClicked:string) =>{
        if(onClick){
            onClick(valueClicked)
        }
    }

    const thisOnClickParents = () =>{
        if(onClick){
            onClick({valueParents:childListValues, isWillSelectAll:!isSelectedAll})
        }
    }
    

    return(
        <Fragment>
            <Checkbox 
                isSelected={isSelectedParent}
                isIndeterminate={!isSelectedAll}
                txtLabel={txtLabel} 
                txtSubLabel={txtSublabel}
                isDisabled={isDisabled}
                isError={isError}
                onClick={()=>{thisOnClickParents()}}
            />
            <div className='checkbox-child-options'>
                {
                    (childMenu.map((itmChild)=>{
                        return(
                            <Checkbox 
                                key={itmChild.id}
                                isSelected={value.includes(itmChild.value)} 
                                txtLabel={itmChild.txtLabel} 
                                txtSubLabel={itmChild.txtSublabel}
                                isDisabled={isDisabled}
                                isError={isError}
                                onClick={()=>{thisOnClick(itmChild.value)}}
                            />
                        )
                    }))
                }
            </div>
        </Fragment>
    )
}

const CheckboxField = ({
    className,
    txtLabel,
    value = [],
    onChange,
    onValidate,
    valueList = [],
    isDisabled = false,
    error,
    config
}:CheckboxFieldProps) =>{
    const isMandatory = config?.isMandatory
    const maxSelection = config?.maxSelection

    const validateField = (newValue:valueCheckboxField) =>{
        let tampError:errorType = {isError:false, errorMessage:''}
        let isError = false

        if(isMandatory && !isError){
            if(newValue.length===0){
                isError=true
            }

            if(isError){
                tampError.isError = true
                tampError.errorMessage = "This field can't be empty!"
            }
        }

        if(maxSelection && !isError){
            if(newValue.length > maxSelection){
                isError=true
            }

            if(isError){
                tampError.isError = true
                tampError.errorMessage = `Can't select more than ${maxSelection}`
            }
        }

        return tampError
    }

    const thisOnClick = (valueClicked:string | {valueParents:string[], isWillSelectAll:boolean}) =>{
        let tampValue:string[] = []

        if(onChange){
            if(typeof valueClicked !== 'string'){
                if(valueClicked.isWillSelectAll){
                    tampValue = union([...value], valueClicked.valueParents)
                    onChange(tampValue)
                }else{
                    tampValue = pullAll([...value], valueClicked.valueParents)
                    onChange(tampValue)
                }
            }else{
                if(value.includes(valueClicked)){
                    tampValue = value.filter((itm)=>itm!==valueClicked)
                    onChange(tampValue)
    
                }else{
                    tampValue = [...value]
                    tampValue.push(valueClicked)
                    onChange(tampValue)
                }
            }
        }

        if(onValidate){
            const configTamp = config 
            onValidate(validateField(tampValue), tampValue, configTamp)
        }
    }

    return(
        <div
            className={
                processClassname(`checkbox-field field
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
            <div className='checkbox-options'>
                {
                    valueList.map((itmParents, index)=>{
                        if(itmParents.childMenu){
                            return(
                                <CheckboxGroup 
                                    key={itmParents.id}
                                    childMenu={itmParents.childMenu}
                                    txtLabel={itmParents.txtLabel}
                                    txtSublabel={itmParents.txtSublabel}
                                    value={value}
                                    isDisabled={itmParents.isDisabled || isDisabled}
                                    isError={error?.isError}
                                    onClick={(valueClicked)=>{thisOnClick(valueClicked)}}
                                />
                            )
                        }else{
                            return(
                                <Checkbox
                                    key={itmParents.id}
                                    txtLabel={itmParents.txtLabel}
                                    txtSubLabel={itmParents.txtSublabel}
                                    isDisabled={itmParents.isDisabled || isDisabled}
                                    isSelected={value.includes(itmParents.value)}
                                    isError={error?.isError}
                                    onClick={()=>{thisOnClick(itmParents.value)}}
                                />
                            )
                        }
                    })
                }
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

export default CheckboxField
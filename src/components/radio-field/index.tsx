import './styles.scss'
import { processClassname } from "../../helper"
import { errorType } from '../text-field'
import { PiWarningDiamondFill } from 'react-icons/pi'
import Radio from '../radio'

export type valueRadioField = string
export type valueListRadioField = {id:string, txtLabel:string, txtSublabel?:string, isDisabled?:boolean, value:string}[]

type RadioFieldProps = {
    className?: String
    txtLabel?:string
    value:valueRadioField
    onChange?:(newValue:valueRadioField) => void ,
    onValidate?: (errorResult:errorType, newValue:valueRadioField, config?:Record<any, any>) => void,
    valueList:valueListRadioField
    error?: errorType
    isDisabled?:boolean
    config?: {
        isMandatory?: boolean
    }
}

const RadioFiled = ({
    className,
    txtLabel,
    value = '',
    onChange,
    onValidate,
    valueList = [],
    isDisabled = false,
    error,
    config
}:RadioFieldProps) =>{
    const isMandatory = config?.isMandatory

    const validateField = (newValue:valueRadioField) =>{
        let tampError:errorType = {isError:false, errorMessage:''}
        let error = false
        
        if(isMandatory && !error){
            if(newValue.length===0){
                error=true
            }

            if(error){
                tampError.isError = true
                tampError.errorMessage = "This field can't be empty!"
            }
        }

        return tampError
    }

    const thisOnClick = (valueClicked:string) =>{
        let tampValue:string = ''

        if(onChange){
            if(value !== valueClicked){
                tampValue = valueClicked
                onChange(valueClicked)
            }else{
                tampValue = ''
                onChange('')
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
                processClassname(`radio-field field
                ${className?(className):('')}`)  
            }
        >
            {
                (txtLabel)&&(
                    <>
                        <span className='field-label'>{txtLabel}{isMandatory&&(<span className='field-label-asteric'>*</span>)}</span>
                    </>
                )
            }
            <div className='radio-options'>
                {
                    valueList.map((itmParents, index)=>(
                        <Radio
                            key={itmParents.id}
                            txtLabel={itmParents.txtLabel}
                            txtSubLabel={itmParents.txtSublabel}
                            isDisabled={itmParents.isDisabled || isDisabled}
                            isSelected={value.includes(itmParents.value)}
                            isError={error?.isError}
                            onClick={()=>{thisOnClick(itmParents.value)}}
                        />
                    ))
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

export default RadioFiled
import './styles.scss'
import { PiCheckBold, PiMinus, PiMinusBold } from "react-icons/pi"
import { processClassname } from "../../helper"
import { Fragment, useEffect, useMemo } from 'react'


type CheckboxProps = {
    isSelected:boolean
    isIndeterminate?:boolean
    isError?:boolean
    isDisabled?:boolean
    txtLabel?:string
    txtSubLabel?:string,
    onClick?:()=>void
}
const Checkbox = ({
    isSelected,
    isIndeterminate = false,
    isError = false,
    isDisabled,
    txtLabel,
    txtSubLabel,
    onClick
}:CheckboxProps) =>{

    const thisOnClick = () =>{
        if(onClick && !isDisabled){
            onClick()
        }
    }

    const componentInside = useMemo(()=>{
        return(
            <Fragment>
                <div className={
                    processClassname(`checkbox
                    ${isError?('error'):('')}
                    ${isDisabled?('disabled'):('')}
                    ${(isSelected)?('selected'):('')}`)
                }>
                    {
                        (!isIndeterminate)?(
                            <PiCheckBold/>
                        ):(
                            <PiMinusBold/>
                        )
                    }
                </div>
                {
                    (txtLabel || txtSubLabel)&&(
                        <div className='checkbox-text'>
                            {
                                (txtLabel)&&(
                                    <span className='checkbox-label'>
                                        {txtLabel}
                                    </span>
                                )
                            }
                            {
                                (txtSubLabel)&&(
                                    <span className='checkbox-sublabel'>
                                        {txtSubLabel}
                                    </span>
                                )
                            }
                        </div>
                    )
                }
            </Fragment>
        )
    },[isSelected, isIndeterminate, txtLabel, txtSubLabel, isDisabled, isError])

    if(onClick){
        return(
            <button 
                className='checkbox-container as-button' 
                style={{gridTemplateColumns:(txtLabel||txtSubLabel)?"min-content 1fr":"min-content"}} 
                onClick={thisOnClick} disabled={isDisabled}
            >
                {componentInside}
            </button>
            
        )
    }else{
        return(
            <div className='checkbox-container as-div' style={{gridTemplateColumns:(txtLabel||txtSubLabel)?"min-content 1fr":"min-content"}}>
                {componentInside}
            </div>
        )
    }
    
}

export default Checkbox
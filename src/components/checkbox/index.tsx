import './styles.scss'
import { PiCheckBold } from "react-icons/pi"
import { processClassname } from "../../helper"
import { Fragment, useMemo } from 'react'


type CheckboxProps = {
    isSelected:boolean
    isDisabled?:boolean
    asButton?:boolean
    txtLabel?:string
    textSubLabel?:string,
    onClick?:()=>void
}
const Checkbox = ({
    isSelected,
    isDisabled,
    txtLabel,
    textSubLabel,
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
                    ${isDisabled?('disabled'):('')}
                    ${isSelected?('selected'):('')}`)
                }>
                    <PiCheckBold/>
                </div>
                {
                    (txtLabel || textSubLabel)&&(
                        <div className='checkbox-text'>
                            {
                                (txtLabel)&&(
                                    <span className='checkbox-label'>
                                        {txtLabel}
                                    </span>
                                )
                            }
                            {
                                (textSubLabel)&&(
                                    <span className='checkbox-sublabel'>
                                        {textSubLabel}
                                    </span>
                                )
                            }
                        </div>
                    )
                }
            </Fragment>
        )
    },[isSelected, txtLabel, textSubLabel, isDisabled])

    if(onClick){
        return(
            <button 
                className='checkbox-container as-button' 
                style={{gridTemplateColumns:(txtLabel||textSubLabel)?"min-content 1fr":"min-content"}} 
                onClick={thisOnClick} disabled={isDisabled}
            >
                {componentInside}
            </button>
            
        )
    }else{
        return(
            <div className='checkbox-container' style={{gridTemplateColumns:(txtLabel||textSubLabel)?"min-content 1fr":"min-content"}}>
                {componentInside}
            </div>
        )
    }
    
}

export default Checkbox
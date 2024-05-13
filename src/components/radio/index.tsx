import './styles.scss'
import { processClassname } from "../../helper"
import { Fragment, useMemo } from 'react'
import { PiDotFill } from 'react-icons/pi';


type RadioProps = {
    isSelected:boolean
    isError?:boolean
    isDisabled?:boolean
    asButton?:boolean
    txtLabel?:string
    txtSubLabel?:string,
    onClick?:()=>void
}
const Radio = ({
    isSelected,
    isError,
    isDisabled,
    txtLabel,
    txtSubLabel,
    onClick
}:RadioProps) =>{

    const thisOnClick = () =>{
        if(onClick && !isDisabled){
            onClick()
        }
    }


    const componentInside = useMemo(()=>{
        return(
            <Fragment>
                <div className={
                    processClassname(`radio
                    ${isError?('error'):('')}
                    ${isDisabled?('disabled'):('')}
                    ${isSelected?('selected'):('')}`)
                }>
                    <PiDotFill />
                </div>
                {
                    (txtLabel || txtSubLabel)&&(
                        <div className='radio-text'>
                            {
                                (txtLabel)&&(
                                    <span className='radio-label'>
                                        {txtLabel}
                                    </span>
                                )
                            }
                            {
                                (txtSubLabel)&&(
                                    <span className='radio-sublabel'>
                                        {txtSubLabel}
                                    </span>
                                )
                            }
                        </div>
                    )
                }
            </Fragment>
        )
    },[isSelected, txtLabel, txtSubLabel, isDisabled, isError])

    if(onClick){
        return(
            <button 
                className='radio-container as-button' 
                style={{gridTemplateColumns:(txtLabel||txtSubLabel)?"min-content 1fr":"min-content"}} 
                onClick={thisOnClick} disabled={isDisabled}
            >
                {componentInside}
            </button>
            
        )
    }else{
        return(
            <div className='radio-container' style={{gridTemplateColumns:(txtLabel||txtSubLabel)?"min-content 1fr":"min-content"}}>
                {componentInside}
            </div>
        )
    }
    
}

export default Radio
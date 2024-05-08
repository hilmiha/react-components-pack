import './styles.scss'
import { processClassname } from "../../helper"
import { Fragment, useMemo } from 'react'
import { PiDotFill } from 'react-icons/pi';


type RadioProps = {
    isSelected:boolean
    isDisabled?:boolean
    asButton?:boolean
    txtLabel?:string
    textSubLabel?:string,
    onClick?:()=>void
}
const Radio = ({
    isSelected,
    isDisabled,
    txtLabel,
    textSubLabel,
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
                    ${isDisabled?('disabled'):('')}
                    ${isSelected?('selected'):('')}`)
                }>
                    <PiDotFill />
                </div>
                {
                    (txtLabel || textSubLabel)&&(
                        <div className='radio-text'>
                            {
                                (txtLabel)&&(
                                    <span className='radio-label'>
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
                className='radio-container as-button' 
                style={{gridTemplateColumns:(txtLabel||textSubLabel)?"min-content 1fr":"min-content"}} 
                onClick={thisOnClick} disabled={isDisabled}
            >
                {componentInside}
            </button>
            
        )
    }else{
        return(
            <div className='radio-container' style={{gridTemplateColumns:(txtLabel||textSubLabel)?"min-content 1fr":"min-content"}}>
                {componentInside}
            </div>
        )
    }
    
}

export default Radio
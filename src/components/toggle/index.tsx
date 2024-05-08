import './styles.scss'
import { BsToggleOff } from "react-icons/bs";
import { processClassname } from "../../helper"
import { Fragment, useMemo } from 'react'


type ToggleProps = {
    isSelected:boolean
    isDisabled?:boolean
    asButton?:boolean
    txtLabel?:string
    textSubLabel?:string,
    onClick?:()=>void
}
const Toggle = ({
    isSelected,
    isDisabled,
    txtLabel,
    textSubLabel,
    onClick
}:ToggleProps) =>{

    const thisOnClick = () =>{
        if(onClick && !isDisabled){
            onClick()
        }
    }


    const componentInside = useMemo(()=>{
        return(
            <Fragment>
                <div 
                    className={
                        processClassname(`toggle
                        ${isDisabled?('disabled'):('')}
                        ${isSelected?('selected'):('')}`)
                    }
                >
                    <div className='toggle-circle'></div>
                </div>
                {
                    (txtLabel || textSubLabel)&&(
                        <div className='toggle-text'>
                            {
                                (txtLabel)&&(
                                    <span className='toggle-label'>
                                        {txtLabel}
                                    </span>
                                )
                            }
                            {
                                (textSubLabel)&&(
                                    <span className='toggle-sublabel'>
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
                className='toggle-container as-button' 
                style={{gridTemplateColumns:(txtLabel||textSubLabel)?"min-content 1fr":"min-content"}} 
                onClick={thisOnClick} disabled={isDisabled}
            >
                {componentInside}
            </button>
            
        )
    }else{
        return(
            <div className='toggle-container' style={{gridTemplateColumns:(txtLabel||textSubLabel)?"min-content 1fr":"min-content"}}>
                {componentInside}
            </div>
        )
    }
    
}

export default Toggle
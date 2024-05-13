import './styles.scss'
import { processClassname } from "../../helper"
import { Fragment, useMemo } from 'react'


type SwitchProps = {
    isSelected:boolean
    isDisabled?:boolean
    asButton?:boolean
    txtLabel?:string
    txtSubLabel?:string,
    onClick?:()=>void
}
const Switch = ({
    isSelected,
    isDisabled,
    txtLabel,
    txtSubLabel,
    onClick
}:SwitchProps) =>{

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
                        processClassname(`switch
                        ${isDisabled?('disabled'):('')}
                        ${isSelected?('selected'):('')}`)
                    }
                >
                    <div className='switch-circle'></div>
                </div>
                {
                    (txtLabel || txtSubLabel)&&(
                        <div className='switch-text'>
                            {
                                (txtLabel)&&(
                                    <span className='switch-label'>
                                        {txtLabel}
                                    </span>
                                )
                            }
                            {
                                (txtSubLabel)&&(
                                    <span className='switch-sublabel'>
                                        {txtSubLabel}
                                    </span>
                                )
                            }
                        </div>
                    )
                }
            </Fragment>
        )
    },[isSelected, txtLabel, txtSubLabel, isDisabled])

    if(onClick){
        return(
            <button 
                className='switch-container as-button' 
                style={{gridTemplateColumns:(txtLabel||txtSubLabel)?"min-content 1fr":"min-content"}} 
                onClick={thisOnClick} disabled={isDisabled}
            >
                {componentInside}
            </button>
            
        )
    }else{
        return(
            <div className='switch-container as-div' style={{gridTemplateColumns:(txtLabel||txtSubLabel)?"min-content 1fr":"min-content"}}>
                {componentInside}
            </div>
        )
    }
    
}

export default Switch
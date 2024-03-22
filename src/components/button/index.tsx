import { IconType } from 'react-icons';
import './styles.scss';
import { ExtendedRefs, ReferenceType } from '@floating-ui/react';
import React from 'react';

export type spacingButton = "default" | "compact"
export type appearanceButton = "default" | "primary" | "subtle" | "link" | "subtle-link" | "warning" | "danger"

export interface Props{
    className?: string,
    txtLabel?: string,
    spacing?: spacingButton,
    appearance?: appearanceButton,
    isFillContainer?: boolean,
    isDisabled?: boolean,
    isSelected?: boolean,
    IconBefore?: IconType,
    IconAfter?: IconType,
    onClick?: () => void,

    floatingUi_ref?:ExtendedRefs<ReferenceType>,
    floatingUi_getReferenceProps?: Record<string, unknown>
}

const Button = ({
    className,
    txtLabel,
    spacing = 'default',
    appearance = 'default',
    isFillContainer = false,
    isDisabled = false,
    isSelected = false,
    IconBefore,
    IconAfter,
    onClick,

    floatingUi_ref,
    floatingUi_getReferenceProps
}:Props) =>{
    
    const thisOnClick = () =>{
        if(!isDisabled && onClick){
            onClick()
        }
    }
    
    return(
        <button 
            ref={floatingUi_ref?.setReference}
            className={
                processClassname(`button
                ${className?(className):('')}
                ${spacing?(`${spacing}-spacing`):('')}
                ${appearance?(`${appearance}-appearance`):('')}
                ${isFillContainer?('fill-Container'):('')}
                ${isDisabled?('disabled'):('')}
                ${isSelected?('selected'):('')}`)  
            } 
            onClick={thisOnClick}
            disabled={isDisabled}
            {...floatingUi_getReferenceProps}
        >   
            {
                (IconBefore)&&(
                    <IconBefore className='button-icon-before'/>
                )
            }
            {txtLabel}
            {
                (IconAfter)&&(
                    <IconAfter className='button-icon-after'/>
                )
            }
        </button>
    )
}

export default Button

const processClassname = (className:string):string =>{
    return className.replace(/\n/g,' ').replace(/\s+/g,' ').trim()
}
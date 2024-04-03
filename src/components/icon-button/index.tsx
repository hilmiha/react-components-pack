import { IconType } from 'react-icons';
import './styles.scss';
import { processClassname } from '../../helper';
import { ExtendedRefs, ReferenceType } from '@floating-ui/react';
import { spacingButtonType } from '../button';

export type appearanceIconButton = "default" | "primary" | "subtle" | "warning" | "danger"

interface Props{
    className?: string
    spacing?:spacingButtonType
    appearance?:appearanceIconButton
    isDisabled?: boolean
    isSelected?: boolean
    Icon: IconType
    onClick?: () => void

    floatingUi_ref?:ExtendedRefs<ReferenceType>,
    floatingUi_getReferenceProps?: Record<string, unknown>
}

const IconButton = ({
    className,
    Icon,
    spacing = 'default',
    appearance = 'default',
    isDisabled = false,
    isSelected = false,
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
                processClassname(`icon-button
                ${className?(className):('')}
                ${spacing?(`${spacing}-spacing`):('')}
                ${appearance?(`${appearance}-appearance`):('')}
                ${isDisabled?('disabled'):('')}
                ${isSelected?('selected'):('')}`)
            } 
            onClick={thisOnClick}
            disabled={isDisabled}

            {...floatingUi_getReferenceProps}
        >
            <Icon/>
        </button>
    )
}

export default IconButton
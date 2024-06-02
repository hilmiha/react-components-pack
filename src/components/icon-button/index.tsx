import './styles.scss';
import { processClassname } from '../../helper';
import { ExtendedRefs, ReferenceType } from '@floating-ui/react';
import { spacingButtonType } from '../button';
import { GlobalContext, GlobalContextType } from 'context/globalcontext';
import { useContext } from 'react';
import Spinner from 'components/spinner';

export type appearanceIconButtonType = "default" | "primary" | "subtle" | "warning" | "danger"

interface Props{
    className?: string
    spacing?:spacingButtonType
    appearance?:appearanceIconButtonType
    isDisabled?: boolean
    isSelected?: boolean
    isLoading?:boolean
    Icon: JSX.Element
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
    isLoading = false,
    onClick,

    floatingUi_ref,
    floatingUi_getReferenceProps
}:Props) =>{
    const{ isDarkmode } = useContext(GlobalContext) as GlobalContextType

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
                ${(isDisabled||isLoading)?('disabled'):('')}
                ${isSelected?('selected'):('')}`)
            } 
            onClick={thisOnClick}
            disabled={isDisabled || isLoading}

            {...floatingUi_getReferenceProps}
        >
            {
                (isLoading)?(
                    <Spinner size='small' theme={isDarkmode?('light'):('dark')}/>
                ):(
                    Icon
                )
            }
        </button>
    )
}

export default IconButton
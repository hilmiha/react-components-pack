import './styles.scss';
import { ExtendedRefs, ReferenceType } from '@floating-ui/react';
import { useContext } from 'react';
import Spinner from 'components/spinner';
import { GlobalContext, GlobalContextType } from 'context/globalcontext';

export type spacingButtonType = "default" | "compact" | "none"
export type appearanceButtonType = "default" | "primary" | "subtle" | "link" | "subtle-link" | "warning" | "danger"

export interface Props{
    className?: string,
    txtLabel: string,
    spacing?: spacingButtonType,
    appearance?: appearanceButtonType,
    isFullWidth?: boolean,
    isDisabled?: boolean,
    isSelected?: boolean,
    isLoading?: boolean,
    IconBefore?: JSX.Element,
    IconAfter?: JSX.Element,
    onClick?: () => void,

    floatingUi_ref?:ExtendedRefs<ReferenceType>,
    floatingUi_getReferenceProps?: Record<string, unknown>
}

const Button = ({
    className,
    txtLabel = "",
    spacing = 'default',
    appearance = 'default',
    isFullWidth = false,
    isDisabled = false,
    isSelected = false,
    isLoading = false,
    IconBefore,
    IconAfter,
    onClick,

    floatingUi_ref,
    floatingUi_getReferenceProps
}:Props) =>{
    const{ isDarkmode } = useContext(GlobalContext) as GlobalContextType
    const thisOnClick = () =>{
        if(!isDisabled && !isLoading && onClick){
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
                ${isFullWidth?('full-width'):('')}
                ${(isDisabled||isLoading)?('disabled'):('')}
                ${isSelected?('selected'):('')}`)  
            } 
            onClick={thisOnClick}
            disabled={isDisabled || isLoading}
            {...floatingUi_getReferenceProps}
        >   
            <div 
                className={
                    processClassname(`button-label
                    ${(isLoading)?('loading'):('')}`)
                }
            >
                {
                    (IconBefore)&&(
                        <span className='button-icon-before'>{IconBefore}</span>
                    )
                }
                <span>{txtLabel}</span>
                {
                    (IconAfter)&&(
                        <span className='button-icon-after'>{IconAfter}</span>
                    )
                }
                {
                    (isLoading)&&(
                        <div className='spinner-container'>
                            <Spinner size='small' theme={isDarkmode?('light'):('dark')}/>
                        </div>
                    )
                }
            </div>
        </button>
    )
}

export default Button

const processClassname = (className:string):string =>{
    return className.replace(/\n/g,' ').replace(/\s+/g,' ').trim()
}
import { processClassname } from '../../helper'
import './styles.scss'
import { spacingButtonType } from '../button'

export type Props = {
    className?: string
    txtLabel?: string
    txtSublabel?: string
    IconBefore?: JSX.Element
    isDisabled?: boolean
    isSelected?: boolean
    spacing?: spacingButtonType
    onClick?: () => void
}

const DropdownManuItem = ({
    className,
    txtLabel,
    txtSublabel,
    IconBefore,
    isDisabled = false,
    isSelected = false,
    spacing = 'default',
    onClick
}:Props) =>{
    const thisOnClick = () =>{
        if(!isDisabled && onClick){
            onClick()
        }
    }
    return(
        <button
            className={
                processClassname(`dropdown-button-item subtle-appearance
                ${className?(className):('')}
                ${isDisabled?('disabled'):('')}
                ${spacing?(spacing):('')}
                ${isSelected?('selected'):('')}`)
            }
            onClick={thisOnClick}
            disabled={isDisabled}
        >
            {
                (IconBefore)&&(
                    <div className='dropdown-button-item-icon-container'>
                        {
                            IconBefore
                        }
                    </div>
                )
            }
            <div className='dropdown-button-item-label-container'>
                {(txtLabel)&&(<span className='dropdown-button-item-label'>{txtLabel}</span>)}
                {(txtSublabel)&&(<span className='dropdown-button-item-sublabel'>{txtSublabel}</span>)}
            </div>
        </button>
    )
}

export default DropdownManuItem
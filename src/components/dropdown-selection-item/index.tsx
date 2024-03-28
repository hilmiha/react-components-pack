import './styles.scss'
import { processClassname } from '../../helper'
import { PiCheckBold } from 'react-icons/pi'

type Props = {
    className?: string
    txtLabel?: string
    txtSublabel?: string
    isDisabled?: boolean
    isSelected?: boolean
    isWithCheckbox?: boolean
    onClick?: () => void
}

const DropdownSelectionItem = ({
    className,
    txtLabel,
    txtSublabel,
    isDisabled = false,
    isSelected = false,
    isWithCheckbox = false,
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
                processClassname(`dropdown-button-selection-item subtle-appearance
                ${className?(className):('')}
                ${isDisabled?('disabled'):('')}
                ${isSelected?('selected'):('')}`)
            }
            onClick={thisOnClick}
            disabled={isDisabled}
        >
            {
                (isWithCheckbox)&&(
                    <div className={
                        processClassname(`dropdown-button-selection-item-checkbox-container
                        ${isSelected?('selected'):('')}`)
                    }>
                        <PiCheckBold/>
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

export default DropdownSelectionItem
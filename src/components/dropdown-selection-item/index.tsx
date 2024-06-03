import './styles.scss'
import { processClassname } from '../../helper'
import { PiCheckBold } from 'react-icons/pi'
import Checkbox from '../checkbox'

type Props = {
    className?: string
    txtLabel?: string
    txtSublabel?: string
    isDisabled?: boolean
    isSelected?: boolean
    isWithCheckbox?: boolean
    spacing?:'compact'|'default'
    onClick?: () => void
}

const DropdownSelectionItem = ({
    className,
    txtLabel,
    txtSublabel,
    isDisabled = false,
    isSelected = false,
    isWithCheckbox = false,
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
                processClassname(`dropdown-button-selection-item subtle-appearance
                ${className?(className):('')}
                ${spacing?(spacing):('')}
                ${isDisabled?('disabled'):('')}
                ${isSelected?('selected'):('')}`)
            }
            onClick={thisOnClick}
            disabled={isDisabled}
        >
            {
                (isWithCheckbox)&&(
                    <Checkbox isSelected={isSelected}/>
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
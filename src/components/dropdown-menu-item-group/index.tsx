import { processClassname } from '../../helper'
import './styles.scss'

interface Props{
    className?: string
    txtLabel?: string
    isHasSeparator?: boolean
    children: string | JSX.Element | JSX.Element[]
}

const DropdownMenuItemGroup = ({
    className,
    txtLabel,
    isHasSeparator = false,
    children = <></>
}:Props) =>{
    return(
        <div 
            className={
                processClassname(`dropdown-menu-item-group
                ${className?(className):('')}`)
            }
        >
            {(isHasSeparator)&&(<div className="dropdown-menu-item-group-separator"></div>)}
            {
                (txtLabel)&&(
                    <span className='dropdown-menu-item-group-title'>{txtLabel}</span>
                )
            }
            {(children)&&(children)}
        </div>
    )
}

export default DropdownMenuItemGroup
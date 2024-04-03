import { PiCaretDownBold } from "react-icons/pi"
import { processClassname } from "../../helper"
import Button, { spacingButtonType } from "../button"
import DropdownMenu, { menuListType } from "../dropdown-menu"
import { appearanceIconButtonType } from "../icon-button"
import './styles.scss'

type Props = {
    className?: string
    txtLabel: string
    spacing?: spacingButtonType
    appearance?: appearanceIconButtonType
    menuList: menuListType
    isCloseAfterSelect?:boolean
    onClick?: ()=>void
    onClickItem?: (idButton:string)=>void
    test?: JSX.Element[]
}

const SplitButton = ({
    className,
    txtLabel,
    spacing = 'default',
    appearance,
    menuList = [],
    isCloseAfterSelect = false,
    onClick,
    onClickItem
}:Props) =>{

    const thisOnClick = () =>{
        if(onClick){
            onClick()
        }
    }

    const thisOnClickItem = (idButton:string) =>{
        if(onClickItem){
            onClickItem(idButton)
        }
    }
    return(
        <div 
            className={
                processClassname(`split-button
                ${className?(className):('')}
                ${appearance?(`${appearance}-appearance`):('')}`)
            } 
        >
            <Button 
                className="split-button-button"
                txtLabel={txtLabel}
                appearance={appearance}
                spacing={spacing}
                onClick={()=>{thisOnClick()}}
            />
            <DropdownMenu
                IconLabel={PiCaretDownBold}
                menuList={menuList}
                appearance={appearance}
                spacing={spacing}
                isCloseAfterSelect={isCloseAfterSelect}
                onClickItem={(buttonId)=>{thisOnClickItem(buttonId)}}
                txtLabel="More options"
            />
        </div>
    )
}

export default SplitButton
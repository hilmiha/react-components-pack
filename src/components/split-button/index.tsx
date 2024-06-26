import { PiCaretDownBold } from "react-icons/pi"
import { processClassname } from "../../helper"
import Button, { spacingButtonType } from "../button"
import DropdownMenu, { menuListItemType, menuListType } from "../dropdown-menu"
import { appearanceIconButtonType } from "../icon-button"
import './styles.scss'

type Props = {
    className?: string
    txtLabel: string
    altTxtLabel?: string
    spacing?: "default" | "compact"
    appearance?: appearanceIconButtonType
    menuList: menuListType | menuListItemType[]
    isCloseAfterSelect?:boolean
    isOnScrollClose?:boolean
    isLoading?:boolean
    isDisabled?:boolean
    IconBefore?:JSX.Element
    onClick?: ()=>void
    onClickItem?: (idButton:string)=>void
}

const SplitButton = ({
    className,
    txtLabel,
    altTxtLabel,
    spacing = 'default',
    appearance,
    menuList = [],
    isCloseAfterSelect = false,
    isOnScrollClose = false,
    isLoading=false,
    isDisabled=false,
    IconBefore,
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
                isDisabled={isDisabled}
                isLoading={isLoading}
                IconBefore={IconBefore}
                onClick={()=>{thisOnClick()}}
            />
            <DropdownMenu
                menuList={menuList}
                appearance={appearance}
                spacing={spacing}
                isCloseAfterSelect={isCloseAfterSelect}
                isOnScrollClose={isOnScrollClose}
                isDisabled={isLoading || isDisabled}
                onClickItem={(buttonId)=>{thisOnClickItem(buttonId)}}
                TxtLabelOrIcon={<PiCaretDownBold/>}
                altTxtLabel={altTxtLabel}
            />
        </div>
    )
}

export default SplitButton

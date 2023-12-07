import './styles.css'
import { useEffect, useState } from "react"
import { has } from 'lodash'
import MenuButton from '../MenuButton'

const MenuButtonGroup = ({
    parentItem,
    label,
    subLabel,
    iconLeftName,
    listSubmenu,
    level,
    isActive,
    isParentInteractive,
    onClick
}) =>{
    const [isOpen, setIsOpen] = useState(JSON.stringify(listSubmenu).includes('"isActive":true'))

    const onClickChild = (itemButton) =>{
        if(onClick && itemButton.key && ((!isActive && itemButton.key === parentItem.key && isParentInteractive) || itemButton.key !== parentItem.key)){
            onClick(itemButton)
        }
        if(itemButton.key === parentItem.key){
            if(isParentInteractive){
                setTimeout(()=>{
                    setIsOpen(true)
                },200)
            }else{
                setIsOpen(!isOpen)
            }
        }
    }

    useEffect(()=>{
        if(!JSON.stringify(listSubmenu).includes('"isActive":true') && !isActive){
            setTimeout(()=>{
                setIsOpen(false)
            },100)
        }
    },[listSubmenu])

    return(
        <div className="menu-button-gorup-wrapper">
            <MenuButton 
                label={label} 
                subLabel={subLabel}
                onClick={()=>{onClickChild(parentItem)}}
                onClickRightIcon={()=>{setIsOpen(!isOpen)}}
                iconLeftName={iconLeftName} 
                iconRightName={(isOpen)?('caret-up'):('caret-down')} 
                level={level}
                isActiveSub={JSON.stringify(listSubmenu).includes('"isActive":true')}
                isActive={isActive}
            />
            {
                (isOpen)&&(
                    <div className="menu-button-gorup-children-wrapper">
                        {
                            listSubmenu?.map((item)=>{
                                if(has(item, 'listSubmenu')){
                                    return(
                                        <MenuButtonGroup 
                                            key={item.key} 
                                            parentItem={item}
                                            label={item.label} 
                                            subLabel={item.subLabel}
                                            listSubmenu={item.listSubmenu} 
                                            isActive={item.isActive}
                                            level={level!==undefined?(level+1):0}
                                            onClick={(itemButton)=>{onClickChild(itemButton)}}
                                            isParentInteractive={item.isParentInteractive}
                                        />
                                    )
                                }else{
                                    return(
                                        <MenuButton 
                                            key={item.key} 
                                            label={item.label} 
                                            subLabel={item.subLabel}
                                            level={level!==undefined?(level+1):0} 
                                            isActive={item.isActive}
                                            onClick={()=>{onClickChild(item)}}
                                        />
                                    )
                                }
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default MenuButtonGroup
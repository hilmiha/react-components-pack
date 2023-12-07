import './styles.css'
import { useEffect, useState } from "react"
import ButtonMenu from "../buttonMenu"
import { has, isObject } from 'lodash'

const ButtonMenuGroup = ({
    parentKey,
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

    const onClickChild = (key) =>{
        console.log(isParentInteractive)
        if(onClick && key && ((!isActive && key === parentKey && isParentInteractive) || key !== parentKey)){
            onClick(key)
        }
        if(key === parentKey){
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
        <div className="button-menu-group-wrapper">
            <ButtonMenu 
                label={label} 
                subLabel={subLabel}
                onClick={()=>{onClickChild(parentKey)}}
                onClickRightIcon={()=>{setIsOpen(!isOpen)}}
                iconLeftName={iconLeftName} 
                iconRightName={(isOpen)?('caret-up'):('caret-down')} 
                level={level}
                isActiveSub={JSON.stringify(listSubmenu).includes('"isActive":true')}
                isActive={isActive}
            />
            {
                (isOpen)&&(
                    <div className="button-menu-group-children-wrapper">
                        {
                            listSubmenu?.map((item)=>{
                                if(has(item, 'listSubmenu')){
                                    return(
                                        <ButtonMenuGroup 
                                            key={item.key} 
                                            parentKey={item.key}
                                            label={item.label} 
                                            subLabel={item.subLabel}
                                            listSubmenu={item.listSubmenu} 
                                            isActive={item.isActive}
                                            level={level!==undefined?(level+1):0}
                                            onClick={onClickChild}
                                        />
                                    )
                                }else{
                                    return(
                                        <ButtonMenu 
                                            key={item.key} 
                                            label={item.label} 
                                            subLabel={item.subLabel}
                                            level={level!==undefined?(level+1):0} 
                                            isActive={item.isActive}
                                            onClick={()=>{onClickChild(item.key)}}
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

export default ButtonMenuGroup
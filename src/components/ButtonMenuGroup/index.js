import './styles.css'
import { useEffect, useState } from "react"
import ButtonMenu from "../buttonMenu"
import { has, isObject } from 'lodash'

const ButtonMenuGroup = ({
    label,
    subLabel,
    iconLeftName,
    listSubmenu,
    level,
    onClick
}) =>{
    const [isOpen, setIsOpen] = useState(false)

    const onClickChild = (key) =>{
        if(onClick){
            onClick(key)
        }
    }
    return(
        <div className="button-menu-group-wrapper">
            <ButtonMenu 
                label={label} 
                subLabel={subLabel}
                onClick={()=>{setIsOpen(!isOpen)}} 
                iconLeftName={iconLeftName} 
                iconRightName={(isOpen)?('caret-up'):('caret-down')} 
                level={level}
                isActiveSub={JSON.stringify(listSubmenu).includes('"isActive":true')}
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
                                            label={item.label} 
                                            subLabel={item.subLabel}
                                            listSubmenu={item.listSubmenu} 
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
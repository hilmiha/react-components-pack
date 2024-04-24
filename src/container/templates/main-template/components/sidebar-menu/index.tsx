import { Fragment, useContext, useState } from "react";
import { MainTemplateContext, MainTemplateContextType, sidebarMenuListItemType } from "../../context/main-template-context";
import DropdownMenuItemGroup from "../../../../../components/dropdown-menu-item-group";
import DropdownManuItem from "../../../../../components/dropdown-menu-item";
import { PiCaretDown } from "react-icons/pi";

type Props = {
    onClcikHeaderMenu:(to?:string)=>void
}

const TemplateSidebarMenu = ({
    onClcikHeaderMenu
}:Props) =>{
    const {
        sidebarMenuList,
        sidebarMenuListSelected,
        showSubSubMenu,
        setShowSubSubMenu
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const onClickOpenMenu = (idButton:string) =>{
        if(showSubSubMenu===idButton){
            setShowSubSubMenu('')
        }else{
            setShowSubSubMenu(idButton)
        }
    }

    const onClickMenu = (itmMenu:sidebarMenuListItemType) =>{
        onClcikHeaderMenu(itmMenu.to)
        onClickOpenMenu(itmMenu.id)
    }

    return(
        <div>
            {
                sidebarMenuList.map((itmGroupMenu, index)=>(
                    <DropdownMenuItemGroup txtLabel={itmGroupMenu.txtLabel} key={itmGroupMenu.id}>
                        {
                            itmGroupMenu.menuList.map((itmMenu, index)=>(
                                <Fragment key={itmMenu.id}> 
                                    <div style={{position:'relative'}}>
                                        <DropdownManuItem  
                                            key={itmMenu.id} 
                                            txtLabel={itmMenu.txtLabel} 
                                            isDisabled={itmMenu.isDisabled} 
                                            isSelected={itmMenu.id===sidebarMenuListSelected}
                                            onClick={()=>{onClickMenu(itmMenu)}}
                                        />
                                        {
                                            (itmMenu.menuList)&&(
                                                <div 
                                                    className="font-text"
                                                    style={{
                                                        position:'absolute',
                                                        top:'0',
                                                        right:'var(--size-4)',
                                                        display:'flex',
                                                        alignItems:'center',
                                                        height:'100%'
                                                    }}
                                                >
                                                    <PiCaretDown/>
                                                </div>
                                            )
                                        }
                                    </div>
                                    
                                    {
                                        (itmMenu.menuList && showSubSubMenu===itmMenu.id)&&(
                                            <div 
                                                style={{
                                                    margin: '0px 4px 4px 28px',
                                                    paddingLeft: '4px', 
                                                    borderLeft:'1px solid hsl(var(--color-neutral-400))'
                                                }}
                                            >
                                                {itmMenu.menuList.map((itmSubMenu)=>(
                                                    <DropdownManuItem  
                                                        key={itmSubMenu.id} 
                                                        txtLabel={itmSubMenu.txtLabel} 
                                                        isDisabled={itmSubMenu.isDisabled} 
                                                        isSelected={itmSubMenu.id===sidebarMenuListSelected}
                                                        onClick={()=>{onClcikHeaderMenu(itmSubMenu.to)}}
                                                    />
                                                ))}
                                            </div>
                                        )
                                    }
                                </Fragment>
                            ))
                        }
                    </DropdownMenuItemGroup>
                ))
            }
        </div>
    )
}

export default TemplateSidebarMenu;
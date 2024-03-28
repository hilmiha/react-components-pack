import { PiCaretDown, PiList } from "react-icons/pi"
import IconButton from "../../../../../components/icon-button"
import { useContext, useEffect, useState } from "react"
import Drawer from "../../../../../components/drawer"
import { listHeaderMenu } from '../../data/list-header-menu';
import { useNavigate } from "react-router-dom";
import DropdownMenuItemGroup from "../../../../../components/dropdown-menu-item-group";
import DropdownManuItem from "../../../../../components/dropdown-menu-item";
import { MainTemplateContext, MainTemplateContextType } from "../../context/main-template-context";
import Button from "../../../../../components/button";

type Props = {
    onClcikHeaderMenu:(to?:string)=>void
}
const TemplateDrawerMenu = ({
    onClcikHeaderMenu
}:Props) =>{

    const {
        sidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const [isMainMenuDrawerOpen, setIsMainMenuDrawerOpen] = useState(false)
    const [showSubMenuDrawer, setShowSubMenuDrawer] = useState('')

    const onClickOpenMoreMenu = (id:string) =>{
        if(showSubMenuDrawer===id){
            setShowSubMenuDrawer('')
        }else{
            setShowSubMenuDrawer(id)
        }
    }   

    return(
        <>
            <IconButton
                Icon={PiList}
                spacing='compact'
                onClick={()=>{setIsMainMenuDrawerOpen(!isMainMenuDrawerOpen)}}
            />
            <Drawer
                id='main-menu'
                isOpen={isMainMenuDrawerOpen}
                setIsOpen={setIsMainMenuDrawerOpen}
                drawerSide='left'
                contentPage={()=>{
                    return(
                        <div style={{display:'flex', flexDirection:'column', gap:"var(--size-4)"}}>
                            {
                                listHeaderMenu.map((itmHeaderMenu:{id:string, txtLabel:string, to:string, subMenu?:{id?:string, txtLabel?:string, menuList:{id?:string, txtLabel?:string, isDisabled?:boolean, to?:string}[]}[]})=>(
                                    <div style={{display:'flex', flexDirection:'column'}}>
                                        <div style={{display:'flex', gap:"var(--size-2)"}}>
                                            <Button
                                                key={itmHeaderMenu.id} 
                                                txtLabel={itmHeaderMenu.txtLabel}
                                                spacing='compact'
                                                // appearance='subtle'
                                                onClick={()=>{onClcikHeaderMenu(itmHeaderMenu.to)}}
                                            />
                                            {
                                                (itmHeaderMenu.subMenu)&&(
                                                    <IconButton
                                                        Icon={PiCaretDown}
                                                        spacing='compact'
                                                        onClick={()=>{onClickOpenMoreMenu(itmHeaderMenu.id)}}
                                                    />
                                                )
                                            }
                                        </div>
                                        <div>
                                            {
                                                (itmHeaderMenu.subMenu && showSubMenuDrawer===itmHeaderMenu.id)&&(
                                                    <>
                                                        {
                                                            itmHeaderMenu.subMenu.map((itmGroupMenu)=>(
                                                                <div style={{paddingLeft:"var(--size-4)"}}>
                                                                    <DropdownMenuItemGroup txtLabel={itmGroupMenu.txtLabel} key={itmGroupMenu.id}>
                                                                        {
                                                                            itmGroupMenu.menuList.map((itmMenu, index)=>(
                                                                                <DropdownManuItem  
                                                                                    key={itmMenu.id} 
                                                                                    txtLabel={itmMenu.txtLabel} 
                                                                                    isDisabled={itmMenu.isDisabled}
                                                                                    isSelected={itmMenu.id===sidebarMenuListSelected}
                                                                                    onClick={()=>{onClcikHeaderMenu(itmMenu.to)}}
                                                                                />
                                                                            ))
                                                                        }
                                                                    </DropdownMenuItemGroup>
                                                                </div>
                                                            ))
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }}
            />
        </>
    )
}

export default TemplateDrawerMenu;
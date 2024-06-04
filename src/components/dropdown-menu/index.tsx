import { PiCaretDownBold, PiXBold } from "react-icons/pi"
import Button, { spacingButtonType } from "../button"
import React, { useEffect, useMemo, useState } from "react"
import { 
    useFloating,
    autoUpdate,
    offset,
    flip,
    useDismiss,
    useRole,
    useClick,
    useInteractions,
    FloatingFocusManager,
    shift,
    FloatingPortal,
    FloatingOverlay
} from "@floating-ui/react";
import './styles.scss'
import IconButton, { appearanceIconButtonType } from "../icon-button";
import DropdownMenuItemGroup from "../dropdown-menu-item-group";
import { processClassname } from "../../helper";
import { GlobalContext, GlobalContextType } from "../../context/globalcontext";
import { useLocation, useNavigate } from "react-router-dom";
import DropdownSelectionItem from "../dropdown-selection-item";

export type menuListItemType = {
    id:string, 
    txtLabel:string, 
    txtSublabel?:string
    isDisabled?:boolean
    IconBefore?:JSX.Element
    value?:string | number | boolean
}
export type menuListType = {id:string, title?:string, menu:menuListItemType[]}[]

type Props = {
    className?: string
    TxtLabelOrIcon: string | JSX.Element
    altTxtLabel?: string
    menuList: menuListType | menuListItemType[]
    menuListSelected?: string[]
    appearance?:appearanceIconButtonType
    spacing?: 'compact' | 'default'
    isDisabled?:boolean
    isSelected?:boolean
    isCloseAfterSelect?:boolean,
    isOnScrollClose?:boolean
    isWithCheckbox?:boolean
    onClickItem?: (buttonId:string, value?:string | number | boolean)=>void
}

const DropdownMenu = ({
    className,
    TxtLabelOrIcon,
    altTxtLabel,
    menuList = [],
    menuListSelected = [],
    appearance = 'default',
    spacing = 'default',
    isCloseAfterSelect = false,
    isOnScrollClose = false,
    isDisabled = false,
    isSelected = false,
    isWithCheckbox = false,
    onClickItem
}:Props) =>{
    const navigate = useNavigate()
    const location = useLocation()
    const [isRendered, setIsRendered] = useState(false)

    const menuListProcessed = useMemo(()=>{
        if(menuList.length>0){
            if((menuList as menuListType)[0].menu){
                return menuList as menuListType
            }else{
                return([
                    {
                        id:'o',
                        menu:menuList as menuListItemType[]
                    }
                ])
            }
        }else{
            return([])
        }
    },[menuList])

    const {
        mediaSize
    } = React.useContext(GlobalContext) as GlobalContextType;

    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        placement:(typeof TxtLabelOrIcon === 'string')?('bottom-end'):('bottom-start'),
        open: isOpen,
        onOpenChange: setIsOpen,
        middleware: [
            offset(8),
            shift(),
            flip({
                fallbackPlacements:['bottom-end', 'bottom-start', "bottom", 'top-end', 'top-start', "top", "right-start", 'right-end', "left-start", "left-end"],
                padding: 10,
            })
        ],
        whileElementsMounted: autoUpdate
    }); 

    const click = useClick(context);
    const dismiss = useDismiss(context,{
        outsidePressEvent: 'click',
        ancestorScroll: isOnScrollClose,
    });
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role
    ]);
    
    const thisOnClick = (buttonId:string, value?:string|number|boolean) =>{
        if(onClickItem){
            onClickItem(buttonId, value)
        }
        if(isCloseAfterSelect || (mediaSize<1 && !isWithCheckbox)){
            setIsOpen(false)
        }
    }

    const onOpenDropdown = () =>{
        navigate(`${location.hash}#dropdown-menu-open`)
    }

    const onCloseDropdown = () =>{
        if(location.hash.includes(`#dropdown-menu-open`)){
            navigate(-1)
        }
    }

    useEffect(()=>{
        if(!isOpen && isRendered){
            onCloseDropdown()
        }
        
        if(isOpen && mediaSize<1){
            onOpenDropdown()
        }
    },[isOpen])

    useEffect(()=>{
        if(!location.hash.includes(`#dropdown-menu-open`)){
            setIsOpen(false)
        }
    },[location])

    useEffect(()=>{
        if(mediaSize<1 && !location.hash.includes('#dropdown-menu-open') && isOpen){
            navigate(`${location.hash}#dropdown-menu-open`)
        }
    },[mediaSize])

    useEffect(()=>{
        setIsRendered(true)
    },[])


    return(
        <>  
            {typeof TxtLabelOrIcon !== 'string' ?(
                <IconButton
                    className={
                        processClassname(`dropdown-menu-button
                        ${className?(className):('')}`)  
                    } 
                    appearance={appearance}
                    floatingUi_ref={refs}
                    floatingUi_getReferenceProps = {{...getReferenceProps()}}
                    spacing={spacing}
                    Icon={TxtLabelOrIcon}
                    isDisabled={isDisabled}
                    isSelected={isOpen || isSelected}
                />
            ):(
                <Button
                    className={
                        processClassname(`dropdown-menu-button
                        ${className?(className):('')}`)  
                    } 
                    appearance={appearance}
                    floatingUi_ref={refs}
                    floatingUi_getReferenceProps = {{...getReferenceProps()}}
                    txtLabel={TxtLabelOrIcon}
                    spacing={spacing}
                    IconAfter={<PiCaretDownBold/>}
                    isDisabled={isDisabled}
                    isSelected={isOpen || isSelected}
                />
            )}

            {(isOpen && mediaSize>0 && !isDisabled) && (
                <FloatingPortal>
                    <FloatingFocusManager 
                        context={context} 
                        order={['reference', 'content']}
                        modal={true}
                    >
                        <div
                            ref={refs.setFloating}
                            className="dropdown-menu"
                            style={{
                                ...floatingStyles,
                                color:'hsl(var(--color-neutral-1100))'
                            }}
                            {...getFloatingProps()}
                        >
                            {
                                menuListProcessed.map((itmMenuList, index)=>(
                                    <DropdownMenuItemGroup 
                                        key={itmMenuList.id}
                                        txtLabel={itmMenuList.title}
                                        isHasSeparator={index > 0}
                                    >
                                        {
                                            itmMenuList.menu.map((itmMenu, index)=>(
                                                <DropdownSelectionItem
                                                    key={itmMenu.id}
                                                    txtLabel={itmMenu.txtLabel}
                                                    onClick={()=>{thisOnClick(itmMenu.id, itmMenu.value)}}
                                                    isDisabled={itmMenu.isDisabled}
                                                    isWithCheckbox={isWithCheckbox}
                                                    isSelected={menuListSelected.includes(itmMenu.id)}
                                                    IconBefore={itmMenu.IconBefore}
                                                    txtSublabel={itmMenu.txtSublabel}
                                                    spacing={spacing}
                                                />
                                            ))
                                        }
                                    </DropdownMenuItemGroup>
                                ))
                            }
                        </div>
                    </FloatingFocusManager>
                </FloatingPortal>
            )}
            {(isOpen && mediaSize<1 && !isDisabled) && (
                <FloatingPortal>
                    <FloatingOverlay className="dropdown-menu-mobile-overlay" lockScroll>
                        <FloatingFocusManager context={context}>
                            <div
                                className={
                                    processClassname(`dropdown-menu-mobile-box`)  
                                }
                                ref={refs.setFloating}
                                {...getFloatingProps()}
                            >
                                <div className="dropdown-menu-mobile-header">
                                    <div style={{display:'flex', gap:"var(--size-2)", alignItems:'center'}}>
                                        {
                                            (typeof TxtLabelOrIcon !== 'string') && (
                                                TxtLabelOrIcon
                                            )
                                        }
                                        <span className="dropdown-menu-mobile-header-title">{typeof TxtLabelOrIcon === 'string' ? TxtLabelOrIcon : altTxtLabel ? altTxtLabel : 'Options'}</span>
                                    </div>
                                    <IconButton
                                        Icon={<PiXBold/>}
                                        appearance="subtle"
                                        spacing="compact"
                                        onClick={()=>{setIsOpen(false)}}
                                    />
                                </div>
                                <div className="dropdown-menu-mobile-content">
                                    {
                                        menuListProcessed.map((itmMenuList, index)=>(
                                            <DropdownMenuItemGroup 
                                                key={itmMenuList.id}
                                                txtLabel={itmMenuList.title}
                                                isHasSeparator={index > 0}
                                            >
                                                {
                                                    itmMenuList.menu.map((itmMenu, index)=>(
                                                        <DropdownSelectionItem
                                                            key={itmMenu.id}
                                                            txtLabel={itmMenu.txtLabel}
                                                            onClick={()=>{thisOnClick(itmMenu.id, itmMenu.value)}}
                                                            isDisabled={itmMenu.isDisabled}
                                                            isWithCheckbox={isWithCheckbox}
                                                            isSelected={menuListSelected.includes(itmMenu.id)}
                                                            IconBefore={itmMenu.IconBefore}
                                                            txtSublabel={itmMenu.txtSublabel}
                                                        />
                                                    ))
                                                }
                                            </DropdownMenuItemGroup>
                                        ))
                                    }
                                </div>
                            </div>
                        </FloatingFocusManager>
                    </FloatingOverlay>
                </FloatingPortal>
            )}
        </>
    )
}

export default DropdownMenu
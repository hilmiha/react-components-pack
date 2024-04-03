import { PiCaretDownBold, PiXBold } from "react-icons/pi"
import Button, { spacingButtonType } from "../button"
import React, { useEffect, useState } from "react"
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
import { IconType } from "react-icons";
import IconButton from "../icon-button";
import DropdownMenuItemGroup from "../dropdown-menu-item-group";
import DropdownManuItem from "../dropdown-menu-item";
import { processClassname } from "../../helper";
import { GlobalContext, GlobalContextType } from "../../context/globalcontext";
import { useLocation, useNavigate } from "react-router-dom";

type appearance = "default" | "primary" | "subtle" | "warning" | "danger"

export type menuList = {id:string, title?:string, menu:{id:string, txtLabel:string, isDisabled?:boolean, isSelected?:boolean, value?:string | number}[]}[] | []

type Props = {
    className?: string
    txtLabel?: string
    menuList?: menuList
    IconLabel?: IconType
    appearance?:appearance
    spacing?: spacingButtonType
    isWithCaret?: boolean
    isDisabled?:boolean
    isCloseAfterSelect?:boolean,
    onClickItem?: (buttonId:string, value?:string | number)=>void
}

const DropdownMenu = ({
    className,
    txtLabel,
    menuList = [],
    IconLabel,
    appearance,
    spacing = 'default',
    isWithCaret = false,
    isCloseAfterSelect = false,
    isDisabled,
    onClickItem
}:Props) =>{
    const navigate = useNavigate()
    const location = useLocation()
    const [isRendered, setIsRendered] = useState(false)

    const {
        mediaSize
    } = React.useContext(GlobalContext) as GlobalContextType;

    const [isOpen, setIsOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        placement:'bottom-start',
        open: isOpen,
        onOpenChange: setIsOpen,
        // onOpenChange: ()=>{onCloseDropdown()},
        middleware: [
            offset(8),
            shift(),
            flip({
                fallbackPlacements:['bottom-start', 'bottom-end', "bottom", 'top-start', 'top-end', "top", "right-start", 'right-end', "left-start", "left-end"],
                padding: 10,
            })
        ],
        whileElementsMounted: autoUpdate
    }); 

    const click = useClick(context);
    const dismiss = useDismiss(context);
    const role = useRole(context);

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role
    ]);
    
    const thisOnClick = (buttonId:string, value?:string|number) =>{
        if(onClickItem){
            onClickItem(buttonId, value)
        }
        if(isCloseAfterSelect || mediaSize<1){
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
            {IconLabel?(
                <IconButton
                    className="dropdown-menu-button"
                    appearance={appearance}
                    floatingUi_ref={refs}
                    floatingUi_getReferenceProps = {{...getReferenceProps()}}
                    spacing={spacing}
                    Icon={IconLabel}
                    isDisabled={isDisabled}
                />
            ):(txtLabel)?(
                <Button
                    className="dropdown-menu-button"
                    appearance={appearance}
                    floatingUi_ref={refs}
                    floatingUi_getReferenceProps = {{...getReferenceProps()}}
                    txtLabel={txtLabel}
                    spacing={spacing}
                    IconAfter={(isWithCaret)?(PiCaretDownBold):(undefined)}
                    isDisabled={isDisabled}
                />
            ):(null)}

            {(isOpen && mediaSize>0) && (
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
                            menuList.map((itmMenuList, index)=>(
                                <DropdownMenuItemGroup 
                                    key={itmMenuList.id}
                                    txtLabel={itmMenuList.title}
                                    isHasSeparator={index > 0}
                                >
                                    {
                                        itmMenuList.menu.map((itmMenu, index)=>(
                                            <DropdownManuItem
                                                key={itmMenu.id}
                                                txtLabel={itmMenu.txtLabel}
                                                spacing={spacing}
                                                onClick={()=>{thisOnClick(itmMenu.id, itmMenu?.value)}}
                                                isDisabled={itmMenu.isDisabled}
                                                isSelected={itmMenu.isSelected}
                                            />
                                        ))
                                    }
                                </DropdownMenuItemGroup>
                            ))
                        }
                    </div>
                </FloatingFocusManager>
            )}
            {(isOpen && mediaSize<1) && (
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
                                    <span className="dropdown-menu-mobile-header-title">{txtLabel?txtLabel:'Options'}</span>
                                    <IconButton
                                        Icon={PiXBold}
                                        appearance="subtle"
                                        spacing="compact"
                                        onClick={()=>{setIsOpen(false)}}
                                    />
                                </div>
                                <div className="dropdown-menu-mobile-content">
                                    {
                                        menuList.map((itmMenuList, index)=>(
                                            <DropdownMenuItemGroup 
                                                key={itmMenuList.id}
                                                txtLabel={itmMenuList.title}
                                                isHasSeparator={index > 0}
                                            >
                                                {
                                                    itmMenuList.menu.map((itmMenu, index)=>(
                                                        <DropdownManuItem
                                                            key={itmMenu.id}
                                                            txtLabel={itmMenu.txtLabel}
                                                            spacing={spacing}
                                                            onClick={()=>{thisOnClick(itmMenu.id)}}
                                                            isDisabled={itmMenu.isDisabled}
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
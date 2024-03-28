import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useDismiss, useFloating, useInteractions } from '@floating-ui/react'
import { processClassname } from '../../helper'
import './styles.scss'
import IconButton from '../icon-button'
import { PiArrowsOut, PiXBold } from 'react-icons/pi'
import ButtonGroup from '../button-group'
import Button, { appearanceButton } from '../button'
import { useContext, useEffect, useState } from 'react'
import { GlobalContext, GlobalContextType } from '../../context/globalcontext'
import { useLocation, useNavigate } from 'react-router-dom'

export type drawerSizeType = 'small' | 'medium' | 'full'
type drawerSideType = 'left' | 'right'
type modalButtonType = {
    id: string
    txtLabel: string
    appearance?: appearanceButton
    isDisabled?: boolean
}

type Props = {
    id:string
    className?:string
    drawerSize?:drawerSizeType
    drawerSide?:drawerSideType
    txtTitle?:string
    txtSubtitle?:string
    contentPage?:JSX.Element | ((props?:Record<any,any>)=>JSX.Element)
    isCloseClickOutside?:boolean
    isOpen:boolean
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
    buttonList?:modalButtonType[]
    onClickButton?:(idButton:string)=>void

}
const Drawer = ({
    id,
    className,
    drawerSize='small',
    drawerSide='right',
    txtTitle,
    txtSubtitle,
    contentPage,
    isCloseClickOutside = true,
    buttonList,
    isOpen,
    setIsOpen,
    onClickButton
}:Props) =>{
    const navigate = useNavigate()
    const location = useLocation()
    const [isRendered, setIsRendered] = useState(false)

    const {
        mediaSize
    } = useContext(GlobalContext) as GlobalContextType;

    const [isMaximize, setIsMaximize] = useState(false)
    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: ()=>{onCloseDropdown()},
    });

    const dismiss = useDismiss(context, {
        escapeKey:false,
        outsidePress: (event)=>{
            if(isCloseClickOutside){
                if(id){
                    if((event.target as HTMLInputElement).id === id){
                        return true
                    }else{
                        return false
                    }
                }else{
                    return true
                }
            }else{
                return false
            }
            
        }
    });

    const { getFloatingProps } = useInteractions([
        dismiss
    ]);

    const thisOnClickButton = (idButton:string) =>{
        if(onClickButton){
            onClickButton(idButton)
        }

        if(idButton==='*close*'){
            setIsOpen(false)
        }
    }

    const onClickMaximize = () =>{
        setIsMaximize(!isMaximize)
    }

    const onOpenDropdown = () =>{
        navigate(`${location.hash}#drawer-open${(id)?(`-${id}`):('')}`)
    }

    const onCloseDropdown = () =>{
        if(location.hash.includes(`#drawer-open${(id)?(`-${id}`):('')}`)){
            navigate(-1)
        }
    }

    useEffect(()=>{
        if(!isOpen && isRendered){
            onCloseDropdown()
        }
        
        if(isOpen){
            setIsMaximize(false)
            onOpenDropdown()
        }
    },[isOpen])

    useEffect(()=>{
        if(!location.hash.includes(`#drawer-open${(id)?(`-${id}`):('')}`)){
            setIsOpen(false)
        }
    },[location])

    useEffect(()=>{
        setIsRendered(true)
    },[])

    return(
        <>
            {isOpen && (
                <FloatingPortal>
                    <FloatingOverlay 
                        className={
                            processClassname(`drawer-overlay 
                            ${drawerSide==='left'?('drawer-overlay-for-on-left'):('drawer-overlay-for-on-right')}`)
                        } 
                        lockScroll
                        id={id}
                    >
                        <FloatingFocusManager context={context} modal={true} >
                            <div
                                className={
                                    processClassname(`drawer-box
                                    ${className?(className):('')}
                                    ${
                                        (isMaximize)?('full'):((mediaSize>0)?((drawerSize)?(drawerSize):('small')):('full'))
                                    }
                                    ${drawerSide==='left'?('on-left'):('on-right')}`)  
                                } 
                                ref={refs.setFloating}
                                {...getFloatingProps()}
                            >
                                <div 
                                    className={processClassname(`drawer-header`)}
                                >
                                    <div className='drawer-title-box'>
                                        {(txtTitle)&&(<span className='drawer-header-title'>{txtTitle}</span>)}
                                        {(txtSubtitle)&&(<span className='drawer-header-subtitle'>{txtSubtitle}</span>)}
                                    </div>
                                    <ButtonGroup>
                                        <>
                                            {
                                                (mediaSize>0)&&(
                                                    <IconButton
                                                        Icon={PiArrowsOut}
                                                        spacing='compact'
                                                        appearance='subtle'
                                                        onClick={onClickMaximize}
                                                    />
                                                )
                                            }
                                            <IconButton
                                                Icon={PiXBold}
                                                spacing='compact'
                                                appearance='subtle'
                                                onClick={()=>{thisOnClickButton('*close*')}}
                                            />
                                        </>
                                    </ButtonGroup>
                                </div>
                                <div 
                                    className={processClassname(`drawer-content`)}
                                >
                                    {
                                        (contentPage && typeof contentPage === 'function')&&(
                                            contentPage()
                                        )
                                    }
                                    {
                                        (contentPage && typeof contentPage !== 'function')&&(
                                            contentPage
                                        )
                                    }
                                </div>
                                {(buttonList?.length)&&(
                                    <div className='drawer-button'>
                                        <ButtonGroup>
                                            {buttonList.map((itemButton)=>(
                                                <Button
                                                    key={itemButton.id}
                                                    txtLabel={itemButton.txtLabel}
                                                    appearance={itemButton.appearance}
                                                    onClick={()=>{thisOnClickButton(itemButton.id)}}
                                                />
                                            ))}
                                        </ButtonGroup>
                                    </div>
                                )}
                                
                            </div>
                        </FloatingFocusManager>
                    </FloatingOverlay>
                </FloatingPortal>
            )}
        </>
            
        
    )
}

export default Drawer
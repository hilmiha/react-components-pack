import { useContext, useEffect, useState } from 'react'
import './styles.scss'
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useDismiss, useFloating, useInteractions, } from '@floating-ui/react'
import Button, { appearanceButtonType } from '../button'
import { processClassname } from '../../helper'
import { PiXBold } from 'react-icons/pi'
import IconButton from '../icon-button'
import ButtonGroup from '../button-group'
import { GlobalContext, GlobalContextType } from '../../context/globalcontext'
import { useLocation, useNavigate } from 'react-router-dom'

export type modalInfoType = 'info' | 'success' | 'warning' | 'danger'
export type modalSizeType = 'small' | "large"
export type modalButtonType = {
    id: string
    txtLabel: string
    appearance?: appearanceButtonType
    isDisabled?: boolean,
    isSelected?:boolean
}

type Props = {
    id?: string
    size?:modalSizeType
    className?: string
    txtTitle?:string
    iconTitle?: JSX.Element
    txtContent?:string,
    contentPage?:JSX.Element | ((props?:Record<any,any>)=>JSX.Element),    
    buttonList?:modalButtonType[]
    isCloseClickOutside?:boolean
    isOpen:boolean
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
    onClickButton?:(idButton:string)=>void
    onCloseModal?:()=>void
}

const Modal = ({
    id,
    size = 'small',
    className,
    txtTitle,
    iconTitle,
    txtContent,
    contentPage,
    buttonList,
    isCloseClickOutside = true,
    isOpen,
    setIsOpen,
    onClickButton,
    onCloseModal
}:Props) =>{
    const navigate = useNavigate()
    const location = useLocation()
    const [isRendered, setIsRendered] = useState(false)

    const {
        mediaSize
    } = useContext(GlobalContext) as GlobalContextType;
    

    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
    });

    const dismiss = useDismiss(context, {
        outsidePressEvent: 'click',
        escapeKey:false,
        outsidePress: (event)=>{
            if(isCloseClickOutside){
                if(!id){
                    return true
                }

                if((event.target as HTMLInputElement).id === id){
                    thisOnClickButton('*close*')
                    return true
                }else{
                    return false
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

    const onOpenModal = () =>{
        navigate(`${location.hash}#modal-open${(id)?(`-${id}`):('')}`)
    }

    const thisOnCloseModal = () =>{
        if(location.hash.includes(`#modal-open${(id)?(`-${id}`):('')}`)){
            navigate(-1)
        }
        if(onCloseModal){
            onCloseModal()
        }
    }

    useEffect(()=>{
        if(!isOpen && isRendered){
            thisOnCloseModal()
        }
        
        if(isOpen){
            onOpenModal()
        }
    },[isOpen])

    useEffect(()=>{
        if(!location.hash.includes(`#modal-open${(id)?(`-${id}`):('')}`)){
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
                    <FloatingOverlay className="modal-overlay" lockScroll id={id}>
                        <FloatingFocusManager context={context}>
                            <div
                                className={
                                    processClassname(`modal-box
                                    ${className?(className):('')}
                                    ${mediaSize<1?('full'):(size)}`)  
                                }
                                ref={refs.setFloating}
                                {...getFloatingProps()}
                            >
                                <div 
                                    className={'modal-header'}
                                >
                                    <div className='modal-header-title'>
                                        {
                                            (iconTitle && typeof iconTitle !== 'function')&&(
                                                iconTitle
                                            )
                                        }
                                        {
                                            (txtTitle && typeof txtTitle === 'string')&&(
                                                <span className='font-title'>{txtTitle}</span>
                                            )
                                        }
                                        
                                    </div>
                                    <IconButton
                                        Icon={<PiXBold/>}
                                        spacing='compact'
                                        appearance='subtle'
                                        onClick={()=>{thisOnClickButton('*close*')}}
                                    />
                                </div>
                                <div className='modal-content'>
                                    {
                                        (txtContent)&&(
                                            <div className='modal-txt-content'>{txtContent}</div>
                                        )
                                    }
                                    {
                                        (contentPage)&&(
                                            <div className='modal-page-content'>
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
                                        )
                                    }
                                    {
                                        (buttonList?.length)&&(
                                            <ButtonGroup className='modal-button-list'>
                                                {buttonList.map((itemButton)=>(
                                                    <Button
                                                        key={itemButton.id}
                                                        txtLabel={itemButton.txtLabel}
                                                        appearance={itemButton.appearance}
                                                        onClick={()=>{thisOnClickButton(itemButton.id)}}
                                                        isDisabled={itemButton.isDisabled}
                                                        isSelected={itemButton.isSelected}
                                                    />
                                                ))}
                                            </ButtonGroup>
                                        )
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

export default Modal
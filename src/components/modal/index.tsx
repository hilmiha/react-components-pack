import { useContext, useEffect, useState } from 'react'
import './styles.scss'
import { FloatingFocusManager, FloatingOverlay, FloatingPortal, useDismiss, useFloating, useInteractions, } from '@floating-ui/react'
import Button, { appearanceButton } from '../button'
import { processClassname } from '../../helper'
import { PiCheckCircleBold, PiInfoBold, PiWarningCircleBold, PiXBold, PiXCircleBold } from 'react-icons/pi'
import IconButton from '../icon-button'
import ButtonGroup from '../button-group'
import { GlobalContext, GlobalContextType } from '../../context/globalcontext'
import { useLocation, useNavigate } from 'react-router-dom'

export type modalInfoType = 'info' | 'success' | 'warning' | 'danger'
export type modalButtonType = {
    id: string
    txtLabel: string
    appearance?: appearanceButton
    isDisabled?: boolean
}

type Props = {
    id?: string
    type?:modalInfoType,
    className?: string
    txtTitle?:string,
    txtContent?:string,
    contentPage?:JSX.Element,    
    buttonList?:modalButtonType[]
    isCloseClickOutside?:boolean
    isOpen:boolean
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>
    onClickButton?:(idButton:string)=>void
}

const Modal = ({
    id,
    type,
    className,
    txtTitle,
    txtContent,
    contentPage,
    buttonList,
    isCloseClickOutside = false,
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
    

    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: setIsOpen,
    });

    const dismiss = useDismiss(context, {
        escapeKey:false,
        outsidePress: (event)=>{
            if(isCloseClickOutside){
                if((event.target as HTMLInputElement).id === id){
                    return true
                }else{
                    return false
                }
            }else{
                return true
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

    const onCloseModal = () =>{
        if(location.hash.includes(`#modal-open${(id)?(`-${id}`):('')}`)){
            navigate(-1)
        }
    }

    useEffect(()=>{
        if(!isOpen && isRendered){
            onCloseModal()
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
                                    ${mediaSize<1?('full'):(`small`)}`)  
                                }
                                ref={refs.setFloating}
                                {...getFloatingProps()}
                            >
                                {
                                    (type)&&(
                                        <div 
                                            className={processClassname(`modal-header
                                            ${type==='danger'?('danger'):('')}
                                            ${type==='success'?('success'):('')}
                                            ${type==='warning'?('warning'):('')}
                                            ${type==='info'?('info'):('')}`)}
                                        >
                                            {
                                                (type==='danger')&&(
                                                    <PiXCircleBold />
                                                )
                                            }
                                            {
                                                (type==='success')&&(
                                                    <PiCheckCircleBold />
                                                )
                                            }
                                            {
                                                (type==='warning')&&(
                                                    <PiWarningCircleBold />
                                                )
                                            }
                                            {
                                                (type==='info')&&(
                                                    <PiInfoBold />
                                                )
                                            }
                                            <IconButton
                                                Icon={PiXBold}
                                                spacing='compact'
                                                appearance='subtle'
                                                onClick={()=>{thisOnClickButton('*close*')}}
                                            />
                                        </div>
                                    )
                                }
                                <div className='modal-content'>
                                    <div className='modal-txt-title'>
                                        {
                                            (txtTitle)&&(
                                                <span>{txtTitle}</span>
                                            )
                                        }
                                        {
                                            (!type)&&(
                                                <IconButton
                                                    Icon={PiXBold}
                                                    appearance='subtle'
                                                    spacing='compact'
                                                />
                                            )
                                        }
                                    </div>
                                    {
                                        (txtContent)&&(
                                            <div className='modal-txt-content'>{txtContent}</div>
                                        )
                                    }
                                    {
                                        (contentPage)&&(
                                            <div className='modal-page-content'>
                                                {contentPage}
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
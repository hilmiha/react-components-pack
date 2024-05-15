import { PiCaretLeftBold } from 'react-icons/pi'
import { processClassname } from '../../helper'
import './styles.scss'
import { useState } from 'react'

export type AccordionItemItemType = {
    className?: string,
    id:string,
    isDisabled?:boolean
    isOpen?:boolean,
    onClick?:(id:string)=>void
    txtLabel?:string,
    txtSublabel?:string,
    contentPage: JSX.Element | JSX.Element[] | ((props?:Record<any,any>)=>JSX.Element)
}
const AccordionItem = ({
    className,
    id,
    isDisabled,
    isOpen,
    onClick,
    txtLabel,
    txtSublabel,
    contentPage    
}:AccordionItemItemType) =>{

    const thisClickOpen = () =>{
        if(onClick && !isDisabled){
            onClick(id)
        }
    }
    return(
        <div 
            className={
                processClassname(`accordion-item 
                ${className?(className):('')}
                ${isDisabled?('disabled'):('')}`)  
            }
        >
            <button className='accordion-item-button' onClick={thisClickOpen} disabled={isDisabled}>
                <div className='accordion-item-title-div'>
                    <p className='font-title'>{txtLabel}</p>
                    {
                        (txtSublabel)&&(
                            <p className='font-text accordion-item-sub-label'>{txtSublabel}</p>
                        )
                    }
                </div>
                <div
                    className={
                        processClassname(`icon-caret 
                        ${isOpen?('isOpen'):('')}`)  
                    } 
                >
                    <PiCaretLeftBold/>
                </div>
            </button>
            {
                (!isDisabled)&&(
                    <div 
                        className={
                            processClassname(`accordion-item-content 
                            ${isOpen?('isOpen'):('')}`)  
                        } 
                    >
                        <div>
                            {
                                (typeof contentPage !== 'function')?(
                                    contentPage
                                ):(
                                    contentPage()
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AccordionItem
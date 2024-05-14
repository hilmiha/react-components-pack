import { PiCaretLeftBold } from 'react-icons/pi'
import { processClassname } from '../../helper'
import './styles.scss'
import React, { Fragment, useState } from 'react'
import { AccordionItemItemType } from '../accordionItem'

type AccordionType = {
    isAllowMultipleOpen?:boolean
    accordionOpen:string[],
    setAccordionOpen:React.Dispatch<React.SetStateAction<string[]>>
    children: JSX.Element[] | JSX.Element
}
const Accordion = ({
    isAllowMultipleOpen = false,
    accordionOpen,
    setAccordionOpen,
    children
}:AccordionType) =>{

    
    const thisOnClickItem = (id:string) =>{
        if(accordionOpen.includes(id)){
            if(!isAllowMultipleOpen){
                setAccordionOpen([])
            }else{
                setAccordionOpen((prev)=>{
                    const tamp = [...prev].filter(itm=>itm!==id)
                    return tamp
                })
            }
        }else{
            if(!isAllowMultipleOpen){
                setAccordionOpen([id])
            }else{
                setAccordionOpen((prev)=>{
                    const tamp = [...prev]
                    tamp.push(id)
                    return tamp
                })
            }
            
        }
    }

    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            return React.cloneElement<AccordionItemItemType>(child, {
                isOpen: accordionOpen.includes(child.props.id),
                onClick: thisOnClickItem,
            });
        });
    };

    return(
        <Fragment>
            {
                renderChildren()
            }
        </Fragment>
    )
}

export default Accordion
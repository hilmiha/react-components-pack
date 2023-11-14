import './styles.css'
import { TEXTSIZES } from '../../constant/theme'
import Icons from '../Icons'
import { useEffect, useRef, useState } from 'react'
import { createPopper } from '@popperjs/core';

const Text = ({
    //props
    className,
    textLabel,
    iconLeftName,
    iconRightName,

    //style
    size,
    color,
    isBold,
    isEllipsistatic,

    //function
    onClick,
}) =>{

    const textRef = useRef(null)
    const toolTipRef = useRef(null)
    const fontSize = size?(`${TEXTSIZES[size]}px`):(`${TEXTSIZES.small}px`)

    const [isEllipsisActive, setIsElipsisActive] = useState(false)
    
    let timeOut

    function show() {
        if(toolTipRef.current){
            clearTimeout(timeOut)

            toolTipRef.current.setAttribute('data-show', '');
            createPopper(textRef.current, toolTipRef.current, {
                placement: 'bottom-start',
            }).forceUpdate()
        }   
    }

    function hide() {
        if(toolTipRef.current){
            timeOut = setTimeout(() => {
                toolTipRef.current?.removeAttribute('data-show');  
            }, 200);
        }   
    }

    const cekElipsisActive = () => {
        if(textRef.current){
            setIsElipsisActive(textRef.current.offsetWidth < textRef.current.scrollWidth);
        }
    }

    const onClickWithFocus = (e) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
            e.preventDefault();
            onClick();
        }
    }

    useEffect(()=>{
        if(isEllipsistatic){
            createPopper(textRef.current, toolTipRef.current, {
                placement: 'bottom-start',
            });
            textRef.current?.addEventListener("mouseover", cekElipsisActive);
            
            return () => {
                textRef.current?.removeEventListener("mouseover", cekElipsisActive);
            };
        }
    },[])

    useEffect(()=>{
        if(isEllipsistatic){
            cekElipsisActive()
        }
    },[textLabel])

    return(
        <div 
            className={`text-wrapper ${(className)?(className):('')} ${onClick?('text-wrapper-has-onclick'):('')}`}
            onClick={(onClick)&&(onClick)}
            tabIndex={(onClick)?(0):(-1)}
            onKeyDown={(onClick)&&(onClickWithFocus)}
        >
            {
                (iconLeftName)&&(
                    <Icons className={'text-icon-left'} iconName={iconLeftName} color={color} size={size}/>
                )
            }
            {
                (textLabel)&&(
                    <>
                        <span
                            ref={textRef}
                            className='text-text'
                            style={{
                                whiteSpace:(!isEllipsistatic?('normal'):('pre')),
                                overflowWrap:(!isEllipsistatic)?('break-word'):('unset'),
                                fontSize:fontSize,
                                fontWeight:(isBold)?('500'):('normal'),
                                color:(color)?(color):('')
                            }}
                            onMouseEnter={()=>{show()}}
                            onMouseLeave={()=>{hide()}}
                        >
                            {textLabel}
                        </span>
                    </>
                )
            }
            {
                (iconRightName)&&(
                    <Icons className={'text-icon-right'} iconName={iconRightName} color={color} size={size}/>
                )
            }
            {
                (isEllipsisActive)&&(
                    <div 
                        ref={toolTipRef} 
                        className={`text-tooltip-wrapper`} 
                        style={{
                            fontSize:TEXTSIZES.xSmall,
                        }}
                        onMouseEnter={()=>{show()}}
                        onMouseLeave={()=>{hide()}}
                    >
                        {textLabel}
                    </div>
                )
            }
        </div>
    )
}

export default Text
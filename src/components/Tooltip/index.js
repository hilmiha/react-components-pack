import './styles.css'
import { createPopper } from "@popperjs/core"
import { useEffect, useRef } from "react"
import { TEXTSIZES } from '../../constant/theme'

const Tooltip = ({
    children,
    label,
    placement
}) =>{
    const targetRef = useRef(null)
    const tooltipRef = useRef(null)

    let timeOut

    function show() {

        if(tooltipRef.current){
            clearTimeout(timeOut)

            tooltipRef.current.setAttribute('data-show', '');
            createPopper(targetRef.current, tooltipRef.current, {
                placement: (placement)?(placement):('bottom'),
                modifiers: [
                    {
                        name: 'flip',
                        options: {
                            fallbackPlacements: ['bottom', 'right', 'right-end', 'top'],
                        },
                    },
                ],
            }).forceUpdate()
        }   
    }

    function hide() {
        if(tooltipRef.current){
            timeOut = setTimeout(() => {
                tooltipRef.current.removeAttribute('data-show');  
            }, 200);
        }   
    }

    useEffect(()=>{
        createPopper(targetRef.current, tooltipRef.current, {
            placement: (placement)?(placement):('bottom'),
            modifiers: [
                {
                    name: 'flip',
                    options: {
                        fallbackPlacements: ['bottom', 'right', 'right-end', 'top'],
                    },
                },
            ],
        });
    },[])

    return(
        <>
            <div 
                ref={targetRef}
                onMouseEnter={()=>{show()}}
                onMouseLeave={()=>{hide()}}
            >
                {children}
            </div>
            <div 
                ref={tooltipRef} 
                className={`tooltip-wrapper`} 
                style={{
                    borderColor:'var(--neutral400)',
                    fontSize:TEXTSIZES.xSmall
                }}
                onMouseEnter={()=>{show()}}
                onMouseLeave={()=>{hide()}}
            >
                {label}
            </div>
        </>
        
    )
}

export default Tooltip
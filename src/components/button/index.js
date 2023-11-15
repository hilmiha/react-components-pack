import { useEffect, useRef, useState } from 'react'
import Text from '../Text'
import './styles.css'

const Button = ({
    type, // primary, secondary, tertiary, text
    size, // small, medium, large
    color,
    label,
    iconLeftName,
    iconRightName,
    isDisabled,
    isRounded,
    isCompact,
    onClick
}) =>{
    const buttonRef = useRef(null)
    const [isHover, setIsHover] = useState(false)
    const [isFocus, setIsFocus] = useState(false)

    const [classNameDefaul, setClassnameDefault] = useState(generateClassNameDefault(type, color))

    useEffect(()=>{
        setClassnameDefault(generateClassNameDefault(type, color))
    },[color, type])
    return(
        <button
            ref={buttonRef}
            className={`button ${classNameDefaul}`}
            style={{
                height:(size==='large')?('42px'):(size==='small')?('24px'):('32px'),
                padding:
                (label)?(
                    (size==='large')?(`0px ${isCompact?('12px'):('28px')}`):(size==='small')?(`0px ${isCompact?('8px'):('16px')}`):(`0px ${isCompact?('8px'):('20px')}`)
                ):(
                    (size==='large')?('0px 10px'):(size==='small')?('0px 4px'):('0px 8px')
                ),
                borderRadius:(isRounded)?('200px'):('6px')
            }}
            onClick={onClick}
            disabled={isDisabled}
            onMouseEnter={()=>{setIsHover(true)}}
            onMouseLeave={()=>{setIsHover(false)}}
            onFocus={()=>{setIsFocus(true)}}
            onBlur={()=>{setIsFocus(false)}}
        >   
            <Text 
                className={`button-text `}
                textLabel={label} 
                iconLeftName={iconLeftName} 
                iconRightName={iconRightName} 
                size={(size==='large')?('large'):('small')}
                // color={(!isFocus && !isHover)?(
                //     (type==='text' || type==='secondary')?('gray600'):(`${(color)?(color):('primary')}50`)
                // ):(
                //     (type==='secondary')?(`${(color)?(color):('primary')}600`):(type==='text')?('gray600'):(`${(color)?(color):('primary')}50`)
                // )}
                isEllipsistatic={true}
                isBold={true}
            />
        </button>
    )
}

export default Button


const generateClassNameDefault = (type, color) =>{
    let tamp = ''
    const buttonType = type
    const buttonColor = color

    switch (buttonType) {
        case 'primary':
            tamp = 'button-primary'
            break;
        case 'secondary':
            tamp = 'button-secondary'
            break;
        case 'tertiary':
            tamp = 'button-tertiary'
            break;
        case 'text':
            tamp = 'button-text'
            break;
    
        default:
            tamp = 'button-tertiary'
            break;
    }

    switch (buttonColor) {
        case 'brand':
            tamp = `${tamp} button-color-brand`
            break;
        case 'danger':
            tamp = `${tamp} button-color-danger`
            break;
        case 'warning':
            tamp = `${tamp} button-color-warning`
            break;
        case 'success':
            tamp = `${tamp} button-color-success`
            break;
    
        default:
            break;
    }

    return(tamp)
}
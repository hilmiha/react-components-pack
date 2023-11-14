import { useState } from 'react'
import { COLORS } from '../../constant/theme'
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
    onClick
}) =>{
    const [isHover, setIsHover] = useState(false)
    const [isFocus, setIsFocus] = useState(false)

    return(
        // <button
        //     className='button'
        //     style={{
        //         cursor:(isDisabled)?('default'):('pointer'),
        //         border:(type!=='text')?(`1px solid`):('1px solid transparent'),
        //         height:(size==='large')?('42px'):(size==='small')?('24px'):('32px'),
        //         padding:(label)?(
        //             (size==='large')?('0px 28px'):(size==='small')?('0px 16px'):('0px 20px')
        //         ):(
        //             (size==='large')?('0px 10px'):(size==='small')?('0px 4px'):('0px 8px')
        //         ),
        //         borderColor:(!isFocus && !isHover)?(
        //             (type==='text')?('transparent'):(type==='secondary')?(COLORS[`${(color)?(`${color}500`):('gray400')}`]):(COLORS[`${(color)?(color):('primary')}50`])
        //         ):(
        //             (COLORS[`${(color)?(color):('primary')}500`])
        //         ),
        //         backgroundColor:(!isFocus && !isHover)?(
        //             (type==='text')?('transparent'):(type==='secondary')?('white'):(COLORS[`${(color)?(color):('primary')}500`])
        //         ):(
        //             (type==='text' || type==='secondary')?(COLORS.gray50):(COLORS[`${(color)?(color):('primary')}600`])
        //         ),
        //         boxShadow: (isFocus && !isDisabled)?(`0px 0px 2px 2px ${COLORS[`${(color)?(color):('primary')}100`]}`):('none'),
        //         borderRadius:(isRounded)?('200px'):('6px')
        //     }}
        //     onClick={onClick}
        //     disabled={isDisabled}
        //     onMouseEnter={()=>{setIsHover(true)}}
        //     onMouseLeave={()=>{setIsHover(false)}}
        //     onFocus={()=>{setIsFocus(true)}}
        //     onBlur={()=>{setIsFocus(false)}}
        // >
        <button
            className={`button ${(size==='large')?('button-large'):(size==='small')?('button-small'):('button-medium')} ${(type==='text')?('button-text'):(type==='secondary')?('button-secondary'):(type==='primary')?('button-primary'):('button-tertiary')}`}
            style={{
                height:(size==='large')?('42px'):(size==='small')?('24px'):('32px'),
                padding:(label)?(
                    (size==='large')?('0px 28px'):(size==='small')?('0px 16px'):('0px 20px')
                ):(
                    (size==='large')?('0px 10px'):(size==='small')?('0px 4px'):('0px 8px')
                ),
                // borderColor:(!isFocus && !isHover)?(
                //     (type==='text')?('transparent'):(type==='secondary')?(COLORS[`${(color)?(`${color}500`):('gray400')}`]):(COLORS[`${(color)?(color):('primary')}50`])
                // ):(
                //     (COLORS[`${(color)?(color):('primary')}500`])
                // ),
                // backgroundColor:(!isFocus && !isHover)?(
                //     (type==='text')?('transparent'):(type==='secondary')?('white'):(COLORS[`${(color)?(color):('primary')}500`])
                // ):(
                //     (type==='text' || type==='secondary')?(COLORS.gray50):(COLORS[`${(color)?(color):('primary')}600`])
                // ),
                // boxShadow: (isFocus && !isDisabled)?(`0px 0px 2px 2px ${COLORS[`${(color)?(color):('primary')}100`]}`):('none'),
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
            />
        </button>
    )
}

export default Button
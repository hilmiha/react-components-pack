import './styles.css'
import { 
    PiInfo, 
    PiSmileyBlank,
    PiCheck,
    PiCaretDown,
    PiCaretUp,
    PiCheckBold,
    PiMinusBold,
    PiCaretLeft,
    PiCaretRight
} from 'react-icons/pi';
import { ImCheckmark, ImMinus } from "react-icons/im";
import { COLORS, TEXTSIZES } from '../../constant/theme';

const Icons = ({
    //props
    className,
    iconName,

    //styles
    size,
    color
}) =>{
    const fontSize = size?(`${TEXTSIZES[size]}px`):(`${TEXTSIZES.small}px`)
    const fontColor = color?(COLORS[color]):(COLORS.gray900)

    return(
        <div
            className={`icons-wrapper ${(className)?(className):('')}`}
            style={{
                width:fontSize,
                height:fontSize
            }}
        >
            {
                (iconName==='blank')&&(
                    <PiSmileyBlank size={fontSize} color={fontColor}/>
                )
            }
            {
                (iconName==='info')&&(
                    <PiInfo size={fontSize} color={fontColor}/>
                )
            }
            {
                (iconName==='checked')&&(
                    <PiCheckBold size={fontSize} color={fontColor}/>
                )
            }
            {
                (iconName==='minus')&&(
                    <PiMinusBold size={fontSize} color={fontColor}/>
                )
            }
            {
                (iconName==='caret-down')&&(
                    <PiCaretDown size={fontSize} color={fontColor}/>
                )
            }
            {
                (iconName==='caret-up')&&(
                    <PiCaretUp size={fontSize} color={fontColor}/>
                )
            }
            {
                (iconName==='caret-left')&&(
                    <PiCaretLeft size={fontSize} color={fontColor}/>
                )
            }
            {
                (iconName==='caret-right')&&(
                    <PiCaretRight size={fontSize} color={fontColor}/>
                )
            }
        </div>
    )
}

export default Icons
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
    PiCaretRight,
    PiWarningDiamond,
    PiWarningDiamondFill
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

    return(
        <div
            className={`icons-wrapper ${(className)?(className):('')}`}
            style={{
                width:fontSize,
                height:fontSize
            }}
        >
            {
                (iconName==='danger-fill')&&(
                    <PiWarningDiamondFill size={fontSize} color={color}/>
                )
            }
            {
                (iconName==='blank')&&(
                    <PiSmileyBlank size={fontSize} color={color}/>
                )
            }
            {
                (iconName==='info')&&(
                    <PiInfo size={fontSize} color={color}/>
                )
            }
            {
                (iconName==='checked')&&(
                    <PiCheckBold size={fontSize} color={color}/>
                )
            }
            {
                (iconName==='minus')&&(
                    <PiMinusBold size={fontSize} color={color}/>
                )
            }
            {
                (iconName==='caret-down')&&(
                    <PiCaretDown size={fontSize} color={color}/>
                )
            }
            {
                (iconName==='caret-up')&&(
                    <PiCaretUp size={fontSize} color={color}/>
                )
            }
            {
                (iconName==='caret-left')&&(
                    <PiCaretLeft size={fontSize} color={color}/>
                )
            }
            {
                (iconName==='caret-right')&&(
                    <PiCaretRight size={fontSize} color={color}/>
                )
            }
        </div>
    )
}

export default Icons
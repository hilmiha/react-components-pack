import { PiCircleFill } from 'react-icons/pi'
import { processClassname } from '../../helper'
import './styles.scss'
import { IconType } from 'react-icons'

type pillFlairType = 'text' | 'pill' | 'status'
type pillFlairColor = 'info' | 'success' | 'warning' | 'danger'


type Props = {
    className?:string
    type:pillFlairType
    color?:pillFlairColor
    txtLabel:string
    IconBefore?:JSX.Element,
    isBold?:boolean
}
const PillFlair = ({
    className,
    type,
    color,
    txtLabel,
    IconBefore,
    isBold
}:Props) =>{

    return(
        <>
            {(type==='pill')&&(
                <div
                    className={
                        processClassname(`pill-flair-pill
                        ${className?(className):('')}
                        ${isBold?('bold'):('')}
                        ${color?(color):('')}`)  
                    } 
                >
                    {IconBefore}
                    {txtLabel}
                </div>
            )}
            {(type==='status')&&(
                <span
                    className={
                        processClassname(`pill-flair-status
                        ${className?(className):('')}
                        ${isBold?('bold'):('')}
                        ${color?(color):('')}`)  
                    } 
                >
                    {IconBefore?IconBefore:<PiCircleFill/>}
                    {txtLabel}
                </span>
            )}
            {(type==='text')&&(
                <span
                    className={
                        processClassname(`pill-flair-text
                        ${className?(className):('')}
                        ${isBold?('bold'):('')}
                        ${color?(color):('')}`)  
                    } 
                >
                    {IconBefore}
                    {txtLabel}
                </span>
            )}
        </>
    )
}

export default PillFlair
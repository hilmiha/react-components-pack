import { PiCircleFill } from 'react-icons/pi'
import { processClassname } from '../../helper'
import './styles.scss'

type pillFlairApperanceType = 'text' | 'pill' | 'status'
type pillFlairColor = 'info' | 'success' | 'warning' | 'danger'


type Props = {
    className?:string
    appearance:pillFlairApperanceType
    color?:pillFlairColor
    txtLabel:string
    IconBefore?:JSX.Element,
    isBold?:boolean
}
const PillFlair = ({
    className,
    appearance,
    color,
    txtLabel,
    IconBefore,
    isBold
}:Props) =>{

    return(
        <>
            {(appearance==='pill')&&(
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
            {(appearance==='status')&&(
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
            {(appearance==='text')&&(
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
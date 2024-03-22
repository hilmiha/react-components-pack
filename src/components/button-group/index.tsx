import { processClassname } from '../../helper'
import './styles.scss'

type Props = {
    className?:string
    children: JSX.Element[] | JSX.Element
}

const ButtonGroup = ({
    className,
    children
}:Props) =>{
    return(
        <div 
            className={processClassname(`button-group
            ${className?(className):('')}`)}
        >
            {children}
        </div>
    )
}

export default ButtonGroup
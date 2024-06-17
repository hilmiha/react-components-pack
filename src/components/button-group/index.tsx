import { processClassname } from '../../helper'
import './styles.scss'

type Props = {
    className?:string
    layout?:'start' | 'end'
    children: JSX.Element[] | JSX.Element
}

const ButtonGroup = ({
    className,
    layout='start',
    children
}:Props) =>{
    return(
        <div 
            className={processClassname(`button-group
            ${layout==='end'?('layout-end'):('')}
            ${className?(className):('')}`)}
        >
            {children}
        </div>
    )
}

export default ButtonGroup

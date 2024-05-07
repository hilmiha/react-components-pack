import { Fragment } from "react"
import { processClassname } from "../../../helper"
import './styles.scss'
import ButtonGroup from "../../../components/button-group"
import Button from "../../../components/button"

type Props = {
    className?:string
    isApplyDisable?:boolean
    onClickButton:(idButton:string)=>void
    children: JSX.Element[] | JSX.Element
}

const FilterPopupTemplate = ({
    className,
    isApplyDisable,
    onClickButton,
    children
}:Props) =>{

    return(
        <Fragment>
            <div
                className={processClassname(`filter-popup-content
                ${className?(className):('')}`)}
            >
                {children}
            </div>
            <ButtonGroup className='modal-button-list'>
                <Button
                    txtLabel='Apply Filter'
                    appearance='primary'
                    onClick={()=>{onClickButton('*apply*')}}
                    isDisabled={isApplyDisable}
                />
                <Button
                    txtLabel='Cancel'
                    appearance='default'
                    onClick={()=>{onClickButton('*cancel*')}}
                />
                <Button
                    txtLabel='Reset'
                    appearance='subtle'
                    onClick={()=>{onClickButton('*reset*')}}
                />
            </ButtonGroup>
        </Fragment>
    )
}

export default FilterPopupTemplate
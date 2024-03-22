import { PiCaretDoubleLeftBold, PiCaretDoubleRightBold, PiCaretDown, PiCaretDownBold, PiCaretLeftBold, PiCaretRightBold, PiCaretUp, PiCaretUpDown, PiCheckBold, PiMinusBold, PiPlusBold } from 'react-icons/pi'
import { processClassname } from '../../helper'
import './styles.scss'
import React, { useEffect, useRef, useState } from 'react'
import IconButton, { appearanceIconButton } from '../icon-button'
import DropdownMenu, { menuList } from '../dropdown-menu'
import { IconType } from 'react-icons'
import Button from '../button'
import ButtonGroup from '../button-group'
import { GlobalContext, GlobalContextType } from '../../context/globalcontext'

export type tableColumType = {
    key:string,
    txtLabel:string,
    size:string,
    isCanSort?:boolean,
    isAlignTxtRight?:boolean
}
export type tableConfigType = {
    maxRow:number,
    page:number,
    maxPage:number,
    sortBy:string,
    isDesc:boolean
}
export type tableButtonActionType = {
        id:string
        type:'icon-button' | 'button' | 'dropdown-menu'
        isDisabled?:boolean
        Icon?:IconType
        txtLabel?:string
        appearance?:appearanceIconButton
        menuList?:menuList
    }
export type tableDataType = {
    id?:string,
    expandPage?: ()=>JSX.Element
    to?:string
    isChecked?:boolean
    actionButton?: tableButtonActionType[] 
    [key: string]:any;
}

type expandableType = boolean | 'single'

type Props = {
    className?:string,
    tableColums:tableColumType[]
    tableData:tableDataType[]
    tableConfig?:tableConfigType,
    doSortTable?:(keyColumn:string, isDesc:boolean)=>void
    isExpandable?:expandableType
    isHidaPagination?:boolean
    isFillContainer?:boolean
    isCheckbox?:boolean
    isActionButtons?:boolean
    onCheckedItem?:(itmRow:tableDataType, isChecked:boolean)=>void
    onCheckedAll?:()=>void
    onClickAction?:(idButton:string, itmRow:tableDataType)=>void
}

const Table = ({
    className,
    tableColums,
    tableData,
    tableConfig,
    doSortTable,
    isExpandable,
    isHidaPagination,
    isFillContainer,
    isCheckbox,
    isActionButtons,
    onCheckedItem,
    onCheckedAll,
    onClickAction
}:Props) =>{
    const {
        mediaSize
    } = React.useContext(GlobalContext) as GlobalContextType;

    const tableContentRef = useRef<HTMLDivElement>(null)
    const [isContentScoll, setIsContentScroll] = useState(false)

    const [rowExpanded, setRowExpanded] = useState<string[]>([])
    
    const generateStyleColumn = () =>{
        let tamp = []
        if(isExpandable){
            tamp.push('44px')
        }
        if(isCheckbox){
            tamp.push('50px')
        }
        tableColums.forEach((itmColumn)=>{
            tamp.push(itmColumn.size)
        })
        if(isActionButtons){
            tamp.push('150px')
        }
        

        return tamp.join(' ')
    }

    const thisOnClickColumn = (columnKey:string) =>{
        if(doSortTable && tableConfig){
            let tampIsDesc = tableConfig.isDesc

            if(columnKey===tableConfig.sortBy){
                tampIsDesc = !tableConfig.isDesc
            }else{
                tampIsDesc = false
            }

            doSortTable(columnKey, tampIsDesc)
        }
    }

    const onExpandClick = (rowId:string) =>{
        setRowExpanded((prevState)=>{
            let tamp:string[] = []

            if(isExpandable===true){
                if(prevState.includes(rowId)){
                    tamp = prevState.filter((itm)=>(itm!==rowId))
                }else{
                    tamp = [...prevState]
                    tamp.push(rowId)
                }
            }else if(isExpandable==='single'){
                if(prevState.length){
                    if(prevState[0]!==rowId){
                        tamp.push(rowId)
                    }
                }else{
                    tamp.push(rowId)
                }
            }
            

            return tamp
        })
    }

    const onClickRowClick = (event:React.MouseEvent<HTMLDivElement, MouseEvent>, itmRow:object) =>{
        if ((event.target as Element).classList.contains('row-main-item')) {
            console.log(itmRow)
        }
    }

    const onClickRowSpace = (event:React.KeyboardEvent<HTMLDivElement>, itmRow:object) =>{
        if (event.target == event.currentTarget && event.keyCode===32) {
            console.log(itmRow)
        }
    }

    const thisOnCheckedItem = (itmRow:Record<any, any>) =>{
        if(onCheckedItem){
            let tampIsChecked = itmRow?.isChecked

            if(itmRow?.isChecked !== undefined){
                if(itmRow.isChecked){
                    tampIsChecked = false
                }else{
                    tampIsChecked = true
                }
            }else{
                tampIsChecked = true
            }
            onCheckedItem(itmRow, tampIsChecked)
        }
    }

    const thisOnCheckedAll = () =>{
        if(onCheckedAll){
            onCheckedAll()
        }
    }

    const thisOnClickAction = (idButton:string, itmRow:tableDataType) =>{
        if(onClickAction){
            onClickAction(idButton, itmRow)
        }
    }

    useEffect(()=>{
        if (!tableContentRef.current) {
            return;
        }
        var doit:any;

        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(doit);
            doit = setTimeout(function() {
                let element = tableContentRef.current
                if(element){
                    if(element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth){
                        setIsContentScroll(true)
                    }else{
                        setIsContentScroll(false)
                    }
                }
            }, 10);
        });

        resizeObserver.observe(tableContentRef.current);
        
        return function cleanup() {
            clearTimeout(doit);
            resizeObserver.disconnect();
        }
    },[])

    return(
        <>
        <div
            className={
                processClassname(`table
                ${className?(className):('')}
                ${isFillContainer?('fill-container'):('')}`)  
            } 
        >
            <div className='table-header' style={{gridTemplateColumns:generateStyleColumn(), scrollbarGutter:(isContentScoll)?('stable'):('unset')}}>
                {
                    (isExpandable)&&(
                        <div></div>
                    )
                }
                {
                    (isCheckbox)&&(
                        <div className='row-main-item-checkbox'>
                            <button 
                                className={
                                    processClassname(`checkbox-container
                                    ${tableData.filter((row)=>(row?.isChecked===true)).length?('selected'):('')}`)
                                }
                                onClick={()=>{thisOnCheckedAll()}}
                            >
                                {
                                    (tableData.filter((row)=>(row?.isChecked===true)).length === tableData.length)&&(
                                        <PiCheckBold/>
                                    )
                                }
                                {
                                    (tableData.filter((row)=>(row?.isChecked===true)).length !== tableData.length)&&(
                                        <PiMinusBold/>
                                    )
                                }
                            </button>
                        </div>
                    )
                }
                {
                    tableColums.map((itmColumn)=>(
                        <div 
                            key={itmColumn.key} 
                            className={
                                processClassname(`table-header-column
                                ${className?(className):('')}
                                ${itmColumn.isAlignTxtRight?('align-right'):('')}`)  
                            }
                        >
                            <button 
                                className='table-header-column-text'
                                disabled={!itmColumn.isCanSort}
                                onClick={()=>{thisOnClickColumn(itmColumn.key)}}
                            >
                                {itmColumn.txtLabel}
                                {
                                    (itmColumn.isCanSort)&&(
                                        <span 
                                            className='table-header-column-caret'
                                            style={{
                                                color:`${(itmColumn.key!==tableConfig?.sortBy)?('hsla(var(--color-neutral-1100), 0.2)'):('hsl(var(--color-blue-700))')}`
                                            }}
                                        >
                                            {
                                                (itmColumn.key!==tableConfig?.sortBy)&&(
                                                    <PiCaretUpDown/>
                                                )
                                            }
                                            {
                                                (((itmColumn.key===tableConfig?.sortBy) && !tableConfig.isDesc))&&(
                                                    <PiCaretDown size={12}/>
                                                )
                                            }
                                            {
                                                (((itmColumn.key===tableConfig?.sortBy) && tableConfig.isDesc))&&(
                                                    <PiCaretUp size={12}/>
                                                )
                                            }
                                        </span>
                                    )
                                }
                            </button>
                        </div>
                    ))
                }
                {
                    (isActionButtons)&&(
                        <div></div>
                    )
                }
                
            </div>
            <div className='table-content' ref={tableContentRef}>
                {
                    tableData.map((itmRow, index)=>{
                        const itmRowId:string = (itmRow?.id)?(itmRow.id):(`${index}`)
                        return(
                            <div className='table-item-row' key={itmRowId}>
                                <div 
                                    className={
                                        processClassname(`row-main
                                        ${(itmRow?.isChecked)?('selected-row'):('')}`)
                                    } 
                                    style={{gridTemplateColumns:generateStyleColumn()}} 
                                    role="button"
                                    tabIndex={itmRow.to?(0):(-1)}
                                    aria-pressed="false" 
                                    onClick={(itmRow?.to)?(event)=>{onClickRowClick(event, itmRow)}:undefined} 
                                    onKeyDown={(itmRow?.to)?(event)=>{onClickRowSpace(event, itmRow)}:undefined}
                                >
                                    {
                                        (isExpandable) &&(
                                            <div className='row-main-item-expand'>
                                                {
                                                    (typeof itmRow.expandPage === 'function')&&(
                                                        <IconButton
                                                            Icon={rowExpanded.includes(itmRowId)?PiMinusBold:PiPlusBold}
                                                            appearance='subtle'
                                                            spacing='compact'
                                                            onClick={()=>{onExpandClick(itmRowId)}}
                                                            isDisabled={typeof itmRow.expandPage !== 'function'}
                                                        />
                                                    )
                                                }
                                            </div>
                                        )
                                    }
                                    {
                                        (isCheckbox)&&(
                                            <div className='row-main-item-checkbox'>
                                                <button 
                                                    className={
                                                        processClassname(`checkbox-container
                                                        ${(itmRow?.isChecked)?('selected'):('')}`)
                                                    }
                                                    onClick={()=>{thisOnCheckedItem(itmRow)}}
                                                >
                                                    <PiCheckBold/>
                                                </button>
                                            </div>
                                        )
                                    }
                                    {
                                        tableColums.map((itmColumn, indexCell)=>{
                                            if(Array.isArray(itmRow[itmColumn.key])){
                                                return(
                                                    (
                                                        <div
                                                            key={`${itmRowId}-${indexCell}`}
                                                            className={
                                                                processClassname(`row-main-item
                                                                ${className?(className):('')}
                                                                ${itmColumn.isAlignTxtRight?('align-right'):('')}`)  
                                                            }
                                                        >
                                                            {
                                                                itmRow[itmColumn.key].map((textCell:string,index:number)=>(
                                                                    <p className={index===0?('cell-text'):('cell-sub-text')} key={index}>{textCell}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                )
                                            }else{
                                                return(
                                                    (
                                                        <div
                                                            key={`${itmRowId}-${indexCell}`}
                                                            className={
                                                                processClassname(`row-main-item
                                                                ${className?(className):('')}
                                                                ${itmColumn.isAlignTxtRight?('align-right'):('')}`)  
                                                            }
                                                        >
                                                            {itmRow[itmColumn.key]}
                                                        </div>
                                                    )
                                                )
                                            }
                                            
                                        })
                                    }
                                    {
                                        (isActionButtons && itmRow.actionButton)&&(
                                            <div className='row-main-item-action'>
                                                {
                                                    itmRow.actionButton.map((itmButton)=>{
                                                        if(itmButton.type==='button'){
                                                            return(
                                                                <Button
                                                                    key={itmButton.id}
                                                                    spacing='compact'
                                                                    appearance={itmButton.appearance}
                                                                    txtLabel={itmButton.txtLabel}
                                                                    IconBefore={itmButton.Icon as IconType}
                                                                    onClick={()=>{thisOnClickAction(itmButton.id, itmRow)}}
                                                                    isDisabled={itmButton.isDisabled}
                                                                />
                                                            )
                                                        }
                                                        if(itmButton.type==='icon-button'){
                                                            return(
                                                                <IconButton
                                                                    key={itmButton.id}
                                                                    spacing='compact'
                                                                    appearance={itmButton.appearance}
                                                                    Icon={itmButton.Icon as IconType}
                                                                    onClick={()=>{thisOnClickAction(itmButton.id, itmRow)}}
                                                                    isDisabled={itmButton.isDisabled}
                                                                />
                                                            )
                                                        }
                                                        if(itmButton.type==='dropdown-menu'){
                                                            return(
                                                                <DropdownMenu
                                                                    IconLabel={itmButton.Icon as IconType}
                                                                    txtLabel={itmButton.txtLabel}
                                                                    appearance={itmButton.appearance}
                                                                    menuList={itmButton.menuList}
                                                                    spacing='compact'
                                                                    onClickItem={(buttonId)=>{thisOnClickAction(buttonId, itmRow)}}
                                                                    isCloseAfterSelect
                                                                    isDisabled={itmButton.isDisabled}
                                                                />
                                                            )
                                                        }
                                                    })
                                                }
                                                
                                            </div>
                                        )
                                    }
                                    
                                </div>
                                {
                                    (rowExpanded.includes(itmRowId) && typeof itmRow.expandPage === 'function')&&(
                                        <div className='row-expandable'>
                                            {itmRow.expandPage()}
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
                
            </div>
            
        </div>
        {
            (!isHidaPagination)&&(
                <div 
                    className={
                        processClassname(`table-footer
                        ${(mediaSize===0)?('mobile'):('')}
                        ${(mediaSize===1)?('tablet'):('')}
                        ${(mediaSize>=2)?(''):('')}`)
                    } 
                >
                    <div className='table-footer-count'>1-10 / 30</div>
                    <div className='table-footer-pagination'>
                        <IconButton
                            Icon={PiCaretDoubleLeftBold}
                            appearance='subtle'
                            spacing='compact'
                        />
                        <IconButton
                            Icon={PiCaretLeftBold}
                            appearance='subtle'
                            spacing='compact'
                        />
                        Page 1 / 3
                        <IconButton
                            Icon={PiCaretRightBold}
                            appearance='subtle'
                            spacing='compact'
                        />
                        <IconButton
                            Icon={PiCaretDoubleRightBold}
                            appearance='subtle'
                            spacing='compact'
                        />
                    </div>
                    <div className='table-footer-maxrow'>
                        Show 10 Item
                        <DropdownMenu
                            IconLabel={PiCaretDownBold}
                            appearance='subtle'
                            spacing='compact'
                            menuList={[
                                {
                                    id:'maxRowSelection',
                                    menu:[
                                        {id:'item100', txtLabel:'10'},
                                        {id:'item100', txtLabel:'50'},
                                        {id:'item100', txtLabel:'100'}
                                    ]
                                }
                            ]}
                        />
                    </div>
                </div>
            )
        }
        </>
    )
}

export default Table
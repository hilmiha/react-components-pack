import { PiCaretDoubleLeft, PiCaretDoubleRight, PiCaretDown, PiCaretLeft, PiCaretRight, PiCaretUp, PiCaretUpDown, PiCheckBold, PiFolderDashed, PiMinus, PiMinusBold, PiPlus } from 'react-icons/pi'
import { processClassname } from '../../helper'
import './styles.scss'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
    isDesc:boolean,
    totalData:number
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
    id:string,
    expandPage?: JSX.Element | (()=>JSX.Element) | undefined
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
    tableDataSelected?:string[]
    setTableDataSelected?:React.Dispatch<React.SetStateAction<string[]>>
    tableConfig?:tableConfigType,
    isExpandable?:expandableType
    isHidaPagination?:boolean
    isFillContainer?:boolean
    isCheckbox?:boolean
    isActionButtons?:boolean,
    onClickRow?:(itmRow:tableDataType)=>void
    onClickAction?:(idButton:string, itmRow:tableDataType)=>void
    onClickPagination?:(idButton:string)=>void
    onChangeMaxRow?:(newMaxRow:number)=>void
    onClickColumn?:(keyColumn:string, isDesc:boolean)=>void
}

const Table = ({
    className,
    tableColums,
    tableData,
    tableDataSelected = [],
    setTableDataSelected,
    tableConfig,
    isExpandable,
    isHidaPagination,
    isFillContainer,
    isCheckbox,
    isActionButtons,
    onClickRow,
    onClickAction,
    onClickPagination,
    onChangeMaxRow,
    onClickColumn,
}:Props) =>{
    const {
        mediaSize
    } = React.useContext(GlobalContext) as GlobalContextType;

    const tableContentRef = useRef<HTMLDivElement>(null)
    const [isContentScoll, setIsContentScroll] = useState(false)

    const [rowExpanded, setRowExpanded] = useState<string[]>([])
    const tableRow:[number, number] = useMemo(()=>{
        if(tableConfig){
            const startAt = tableConfig.totalData?((tableConfig.page*tableConfig.maxRow)-tableConfig.maxRow+1):0
            const endAt = Math.min((tableConfig.page*tableConfig.maxRow),tableConfig.totalData)
            return([startAt,endAt])
        }
        return([0,0])
    },[tableConfig])
    
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
            tamp.push('90px')
        }
        return tamp.join(' ')
    }

    const thisOnClickColumn = (columnKey:string) =>{
        if(onClickColumn && tableConfig){
            let tampIsDesc = tableConfig.isDesc

            if(columnKey===tableConfig.sortBy){
                tampIsDesc = !tableConfig.isDesc
            }else{
                tampIsDesc = false
            }

            onClickColumn(columnKey, tampIsDesc)
        }
    }

    const thisOnClickPagination = (idButton:string) =>{
        if(onClickPagination){
            onClickPagination(idButton)
            setRowExpanded([])
        }
    }

    const thisOnChangeMaxRow = (value?:number) =>{
        if(onChangeMaxRow && value){
            onChangeMaxRow(value)
            setRowExpanded([])
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

    const onClickRowClick = (event:React.MouseEvent<HTMLDivElement, MouseEvent>, itmRow:tableDataType) =>{
        if ((event.target as Element).classList.contains('row-main-item')) {
            if(onClickRow){
                onClickRow(itmRow)
            }
        }
    }

    const onClickRowSpace = (event:React.KeyboardEvent<HTMLDivElement>, itmRow:tableDataType) =>{
        if (event.target == event.currentTarget && event.keyCode===32) {
            if(onClickRow){
                onClickRow(itmRow)
            }
        }
    }

    const thisOnCheckedItem = (itmRowId:string) =>{
        if(tableDataSelected && setTableDataSelected){
            let tampIsChecked = tableDataSelected.includes(itmRowId)
            if(tampIsChecked){
                setTableDataSelected((prev)=>{
                    const tamp = [...prev]
                    return tamp.filter((x)=>x!==itmRowId)
                })
            }else{
                setTableDataSelected((prev)=>{
                    const tamp = [...prev]
                    tamp.push(itmRowId)
                    return tamp
                })
            }
        }
    }

    const thisOnCheckedAll = () =>{
        if(tableDataSelected && setTableDataSelected){
            if(tableDataSelected.length !== tableData.length){
                setTableDataSelected(tableData.map((itm)=>itm.id))
            }else{
                setTableDataSelected([])
            }
        }
    }

    useEffect(()=>{
        if(setTableDataSelected){
            setTableDataSelected([])
        }
    },[tableConfig])

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
                                    ${tableDataSelected.length?('selected'):('')}`)
                                }
                                onClick={()=>{thisOnCheckedAll()}}
                                disabled={tableData.length===0}
                            >
                                {
                                    (tableDataSelected.length === tableData.length)&&(
                                        <PiCheckBold/>
                                    )
                                }
                                {
                                    (tableDataSelected.length !== tableData.length)&&(
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
                                disabled={!itmColumn.isCanSort || tableData.length===0}
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
                                                (itmColumn.key!==tableConfig?.sortBy && tableData.length!==0)&&(
                                                    <PiCaretUpDown/>
                                                )
                                            }
                                            {
                                                ((itmColumn.key===tableConfig?.sortBy) && !tableConfig.isDesc && tableData.length!==0)&&(
                                                    <PiCaretDown size={12}/>
                                                )
                                            }
                                            {
                                                ((itmColumn.key===tableConfig?.sortBy) && tableConfig.isDesc && tableData.length!==0)&&(
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
                    (tableData.length===0)&&(
                        <div className='table-empty-state'>
                            <PiFolderDashed size={48} className='font-text'/>
                            <p className='font-text'>Table Empty</p>
                        </div>
                    )
                }
                {
                    tableData.map((itmRow, index)=>{
                        const itmRowId:string = (itmRow?.id)?(itmRow.id):(`${index}`)
                        return(
                            <div className='table-item-row' key={itmRowId}>
                                <div 
                                    className={
                                        processClassname(`row-main
                                        ${(tableDataSelected.includes(itmRowId))?('selected-row'):('')}`)
                                    } 
                                    style={{
                                        gridTemplateColumns:generateStyleColumn()
                                    }} 
                                    role="button"
                                    tabIndex={itmRow.to?(0):(-1)}
                                    aria-pressed="false" 
                                    onClick={(onClickRow)?(event)=>{onClickRowClick(event, itmRow)}:undefined} 
                                    onKeyDown={(onClickRow)?(event)=>{onClickRowSpace(event, itmRow)}:undefined}
                                >
                                    {
                                        (isExpandable) &&(
                                            <div className='row-main-item-expand'>
                                                <IconButton
                                                    Icon={rowExpanded.includes(itmRowId)?PiMinus:PiPlus}
                                                    appearance='subtle'
                                                    spacing='compact'
                                                    onClick={()=>{onExpandClick(itmRowId)}}
                                                    isDisabled={itmRow.expandPage===undefined}
                                                />
                                            </div>
                                        )
                                    }
                                    {
                                        (isCheckbox)&&(
                                            <div className='row-main-item-checkbox'>
                                                <button 
                                                    className={
                                                        processClassname(`checkbox-container
                                                        ${(tableDataSelected.includes(itmRowId))?('selected'):('')}`)
                                                    }
                                                    onClick={()=>{thisOnCheckedItem(itmRowId)}}
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
                                                            style={{cursor:(onClickRow)?('pointer'):('default')}}
                                                        >
                                                            {
                                                                itmRow[itmColumn.key].map((textCell:string,index:number)=>(
                                                                    <p className={index===0?('cell-text'):('cell-sub-text')} key={index}>{textCell}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                )
                                            }else if(typeof itmRow[itmColumn.key] === 'function'){
                                                return(
                                                    (
                                                        <div
                                                            key={`${itmRowId}-${indexCell}`}
                                                            className={
                                                                processClassname(`row-main-item
                                                                ${className?(className):('')}
                                                                ${itmColumn.isAlignTxtRight?('align-right'):('')}`)  
                                                            }
                                                            style={{cursor:(onClickRow)?('pointer'):('default')}}
                                                        >
                                                            {itmRow[itmColumn.key]()}
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
                                                            style={{cursor:(onClickRow)?('pointer'):('default')}}
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
                                                                    key={itmButton.id}
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
                                    (rowExpanded.includes(itmRowId) && itmRow.expandPage &&  typeof itmRow.expandPage === 'function')&&(
                                        <div className='row-expandable'>
                                            {itmRow.expandPage()}
                                        </div>
                                    )
                                }
                                {
                                    (rowExpanded.includes(itmRowId)&& itmRow.expandPage && typeof itmRow.expandPage !== 'function')&&(
                                        <div className='row-expandable'>
                                            {itmRow.expandPage}
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
            (tableConfig)&&(
                <div 
                    className={
                        processClassname(`table-footer
                        ${(mediaSize===0)?('mobile'):('')}
                        ${(mediaSize===1)?('tablet'):('')}
                        ${(mediaSize>=2)?(''):('')}`)
                    } 
                >
                    <div className='table-footer-count'>
                        {
                            (tableConfig.totalData!==0)&&(
                                `${tableRow[0]}-${tableRow[1]} / ${tableConfig.totalData}`
                            )
                        }
                    </div>
                    <div className='table-footer-pagination'>
                        <IconButton
                            Icon={PiCaretDoubleLeft}
                            appearance='subtle'
                            spacing='compact'
                            onClick={()=>{thisOnClickPagination('first')}}
                            isDisabled={tableData.length===0}
                        />
                        <IconButton
                            Icon={PiCaretLeft}
                            appearance='subtle'
                            spacing='compact'
                            onClick={()=>{thisOnClickPagination('prev')}}
                            isDisabled={tableData.length===0}
                        />
                        {`Page ${tableConfig.page} / ${tableConfig.maxPage}`}
                        <IconButton
                            Icon={PiCaretRight}
                            appearance='subtle'
                            spacing='compact'
                            onClick={()=>{thisOnClickPagination('next')}}
                            isDisabled={tableData.length===0}
                        />
                        <IconButton
                            Icon={PiCaretDoubleRight}
                            appearance='subtle'
                            spacing='compact'
                            onClick={()=>{thisOnClickPagination('last')}}
                            isDisabled={tableData.length===0}
                        />
                    </div>
                    <div className='table-footer-maxrow'>
                        {`Show ${tableConfig.maxRow} item`}
                        <DropdownMenu
                            IconLabel={PiCaretDown}
                            appearance='subtle'
                            spacing='compact'
                            menuList={[
                                {
                                    id:'maxRowSelection',
                                    menu:[
                                        {id:'item10', txtLabel:'10', isSelected:10===tableConfig.maxRow, value:10},
                                        {id:'item50', txtLabel:'50', isSelected:50===tableConfig.maxRow, value:50},
                                        {id:'item100', txtLabel:'100', isSelected:100===tableConfig.maxRow, value:100}
                                    ]
                                }
                            ]}
                            onClickItem={(idButton, value)=>{if(typeof value === 'number'){thisOnChangeMaxRow(value)}}}
                        />
                    </div>
                </div>
            )
        }
        </>
    )
}

export default Table
import { processClassname } from '../../helper'
import './styles.scss'
import IconButton, { appearanceIconButtonType } from '../icon-button'
import DropdownMenu, { menuListType } from '../dropdown-menu'
import { Fragment, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { GlobalContext, GlobalContextType } from '../../context/globalcontext'
import { PiCaretDoubleLeft, PiCaretDoubleRight, PiCaretDown, PiCaretLeft, PiCaretRight, PiCaretUp, PiCaretUpDown, PiCheckBold, PiColumns, PiFunnel, PiMagnifyingGlass, PiMinus, PiMinusBold, PiPlus, PiRows, PiX } from 'react-icons/pi'
import { VscCollapseAll, VscExpandAll } from "react-icons/vsc";
import Button from '../button'
import TextField from '../text-field'
import useFormHook from '../../hook/useFormHook'
import Modal from '../modal'
import { selectionValueType } from '../selection-field'
import { datePickerValueType } from '../date-picker'
import Checkbox from '../checkbox'

export type tableColumType = {
    key:string,
    txtLabel:string,
    size:string | {size:string, min:string, max?:string},
    isCanSort?:boolean,
    isDefaultSort?:boolean,
    isAlignTxtRight?:boolean,
    isHideable?:boolean
}
export type tableFilterType = Record<string, string | selectionValueType | datePickerValueType> | undefined

export type tableConfigType = {
    maxRow:number,
    page:number,
    maxPage:number,
    sortBy:string,
    isDesc:boolean,
    totalData:number,
    hiddenColumn:string[]
    filter:tableFilterType,
    searchKey:string
}
export type tableButtonActionType = {
        id:string
        type:'icon-button' | 'button' | 'dropdown-menu'
        isDisabled?:boolean
        IconBefore?:JSX.Element
        IconAfter?:JSX.Element
        txtLabelOrIcon:string | JSX.Element
        appearance?:appearanceIconButtonType
        menuList?:menuListType
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

export type FilterPageProps = {
    filterValue:tableFilterType
    onApplyFilter:(valueFilter:tableFilterType)=>void
    onCloseModal:()=>void
}
export type paginationTableButtonType = "first" | "prev" | "next" | "last"
type Props = {
    className?:string,
    tableColums:tableColumType[]
    tableData:tableDataType[]
    tableDataSelected?:string[]
    tableConfig?:tableConfigType,
    isExpandable?:expandableType
    isHidaPagination?:boolean
    isFillContainer?:boolean
    isCheckbox?:boolean
    isActionButtons?:boolean,
    searchBarPlaceholder?:string,
    onClickRow?:(itmRow:tableDataType)=>void
    onClickAction?:(idButton:string, itmRow:tableDataType)=>void
    onClickPagination?:(idButton:paginationTableButtonType)=>void
    onChangeMaxRow?:(newMaxRow:number)=>void
    onClickColumn?:(keyColumn:string, isDesc:boolean)=>void
    onClickSelect?:(itmRowId:string)=>void,
    onClickSelectAll?:()=>void,
    onHideColumn?:(tableColumnKey:string)=>void
    onDoSearch?:(searchKey:string)=>void
    FilterPage?: (props:FilterPageProps)=>JSX.Element
    onApplyFilter?:(filter:tableFilterType)=>void
}

const Table = ({
    className,
    tableColums,
    tableData = [],
    tableDataSelected = [],
    tableConfig,
    isExpandable,
    isHidaPagination,
    isFillContainer,
    isCheckbox,
    isActionButtons,
    searchBarPlaceholder,
    onClickRow,
    onClickAction,
    onClickPagination,
    onChangeMaxRow,
    onClickColumn,
    onClickSelect,
    onClickSelectAll,
    onHideColumn,
    onDoSearch,
    FilterPage,
    onApplyFilter
}:Props) =>{
    const {
        mediaSize
    } = useContext(GlobalContext) as GlobalContextType;

    const tableContentRef = useRef<HTMLDivElement>(null)
    const tableDataListRef = useRef<HTMLDivElement>(null)

    const [isContentScoll, setIsContentScroll] = useState([false, false])

    const [rowExpanded, setRowExpanded] = useState<string[]>([])

    const [isShowFilterDrawer, setIsShowFilterDrawer] = useState(false)

    const tableRow:[number, number] = useMemo(()=>{
        if(tableConfig){
            const startAt = tableConfig.totalData?((tableConfig.page*tableConfig.maxRow)-tableConfig.maxRow+1):0
            const endAt = Math.min((tableConfig.page*tableConfig.maxRow),tableConfig.totalData)
            return([startAt,endAt])
        }
        return([0,0])
    },[tableConfig])

    const cloumnGridSize = useMemo(()=>{
        let tamp = []
        if(isExpandable){
            tamp.push('44px')
        }
        if(isCheckbox){
            tamp.push('50px')
        }

        let isFirst = true
        tableColums.forEach((itmColumn, index)=>{
            if(tableConfig?.hiddenColumn && tableConfig.hiddenColumn.length>0){
                if(!tableConfig?.hiddenColumn.includes(itmColumn.key)){
                    if(typeof itmColumn.size === 'string'){
                        tamp.push(isFirst?(`minmax(${itmColumn.size}, 1fr)`):(itmColumn.size))
                    }else{
                        tamp.push(`minmax(${itmColumn.size.min}, ${isFirst?('1fr'):(itmColumn.size.size)})`)
                    }
                }
                isFirst = false
            }else{
                if(typeof itmColumn.size === 'string'){
                    tamp.push(itmColumn.size)
                }else{
                    tamp.push(`minmax(${itmColumn.size.min}, ${(itmColumn.size.size)})`)
                }
            }
        })

        return tamp.join(' ')
    },[tableConfig?.hiddenColumn])

    type formType = {
        search:string
    }

    const [form, setForm] = useState<formType>({search:''})

    const {onChange} = useFormHook({
        form,
        setForm
    })

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

    const thisOnClickPagination = (idButton:paginationTableButtonType) =>{
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
        if ((event.target as Element).classList.contains('data-cell-clickable')) {
            if(onClickRow){
                onClickRow(itmRow)
            }
        }
    }

    const onClickRowSpace = (event:React.KeyboardEvent<HTMLDivElement>, itmRow:tableDataType) =>{
        if (event.target === event.currentTarget && event.keyCode===32) {
            event.preventDefault();
            if(onClickRow){
                onClickRow(itmRow)
            }
        }
    }

    const thisOnExpandRow = () =>{
        if(rowExpanded.length===0){
            const tamp:string[] = []
            tableData.forEach((itm)=>{
                tamp.push(itm.id)
            })
            setRowExpanded(tamp)
        }else{
            setRowExpanded([])
        }
    }

    const thisOnCheckedItem = (itmRowId:string) =>{
        if(tableDataSelected && onClickSelect){
            onClickSelect(itmRowId)
        }

    }

    const thisOnCheckedAll = () =>{
        if(tableDataSelected && onClickSelectAll){
            onClickSelectAll()
        }
    }

    const thisOnHideColumn = (tableColumnKey:string, isHideable:any) =>{
        if(onHideColumn && isHideable!==false){
            onHideColumn(tableColumnKey)
        }
    }

    const thisOnClickAction = (idButton:string, itmRow:tableDataType) =>{
        if(onClickAction){
            onClickAction(idButton, itmRow)
        }
    }

    const thisDoSearchKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) =>{
        if(event.key === 'Enter'){
            thisOnDoSearch()
        }
    }
    const thisOnDoSearch = (searchKey?:string) =>{
        if(onDoSearch){
            if(searchKey !== undefined){
                onChange('search', searchKey)

                if(tableConfig?.searchKey !== searchKey){
                    onDoSearch(searchKey)
                }                
            }else{
                if(tableConfig?.searchKey !== form['search']){
                    onDoSearch(form['search'])
                }
            }
        }
    }

    useEffect(()=>{
        if(form.search === ''){
            thisOnDoSearch('')
        }
    },[form.search])

    useEffect(()=>{
        if (!tableContentRef.current || !tableDataListRef.current) {
            return;
        }
        var doit:any;

        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(doit);
            doit = setTimeout(function() {
                let xyScroll = [false, false]
                let element = tableContentRef.current
                if(element){
                    if(element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth){
                        xyScroll[0] = true
                    }else{
                        xyScroll[0] = false
                    }
                }

                let elementList = tableDataListRef.current
                if(elementList){
                    if(elementList.scrollHeight > elementList.clientHeight || elementList.scrollWidth > elementList.clientWidth){
                        xyScroll[1] = true
                    }else{
                        xyScroll[1] = false
                    }
                }

                setIsContentScroll(xyScroll)                
            }, 20);
        });

        resizeObserver.observe(tableContentRef.current);
        
        return function cleanup() {
            clearTimeout(doit);
            resizeObserver.disconnect();
        }
    },[])

    return(
        <div
            className={
                processClassname(`table
                ${className?(className):('')}
                ${isFillContainer?('fill-container'):('')}`)  
            } 
            style={{
                gridTemplateRows:(onDoSearch || onHideColumn || (FilterPage && onApplyFilter))?('max-content 1fr max-content'):('1fr max-content')
            }}
        >
            {
                (
                    onDoSearch ||
                    onHideColumn ||
                    (FilterPage && onApplyFilter)
                )&&(
                    <div className='table-top'>
                        <div style={{minWidth:'200px', width:'100%', maxWidth:'500px', display:'flex', gap:'var(--size-2)'}}>
                            {
                                (onDoSearch)&&(
                                    <Fragment>
                                        <TextField
                                            type='text'
                                            txtPlaceholder={searchBarPlaceholder!==undefined?(searchBarPlaceholder):('Search')}
                                            value={form['search']}
                                            onChange={(newValue)=>{onChange('search', newValue)}}
                                            onKeyDown={(e)=>{thisDoSearchKeyDown(e)}}
                                            isShowClear={false}
                                            config={{
                                                sufix:((!form['search'])?(<></>):(<IconButton className='clear-button' Icon={<PiX/>} spacing='compact' appearance='subtle' onClick={()=>{thisOnDoSearch('')}}/>))
                                            }}
                                        />
                                        <IconButton
                                            Icon={<PiMagnifyingGlass/>}
                                            isDisabled={false}
                                            onClick={thisOnDoSearch}
                                        />
                                    </Fragment>
                                )
                            }
                            
                        </div>
                        <div style={{display:'flex', gap:'var(--size-2)'}}>
                            {
                                (FilterPage && onApplyFilter)&&(
                                    <>
                                        <IconButton
                                            Icon={<PiFunnel/>}
                                            isDisabled={false}
                                            isSelected={(tableConfig?.filter)?(true):(false)}
                                            onClick={()=>{setIsShowFilterDrawer(true)}}
                                        />
                                        <Modal
                                            id="modal-filter"
                                            isOpen={isShowFilterDrawer}
                                            setIsOpen={setIsShowFilterDrawer}
                                            txtTitle="Filter"
                                            iconTitle={<PiFunnel/>}
                                            size="large"
                                            isCloseClickOutside={true}
                                            contentPage={
                                                <FilterPage 
                                                    filterValue={tableConfig?.filter} 
                                                    onApplyFilter={onApplyFilter}
                                                    onCloseModal={()=>{setIsShowFilterDrawer(false)}}
                                                />
                                            }
                                        />
                                    </>
                                )
                            }
                            {
                                (onHideColumn)&&(
                                    <DropdownMenu
                                        isWithCheckbox={true}
                                        TxtLabelOrIcon={<PiColumns/>}
                                        altTxtLabel='Column Shown'
                                        onClickItem={(buttonId, isHideable)=>{thisOnHideColumn(buttonId, isHideable)}}
                                        isCloseAfterSelect={false}
                                        isSelected={(tableConfig?.hiddenColumn)?(tableConfig.hiddenColumn.length > 0):(false)}
                                        menuList={[
                                            {
                                                id:'table-column',
                                                menu:tableColums.map((item)=>{return({
                                                    id:item.key,
                                                    txtLabel:item.txtLabel,
                                                    value:item.isHideable,
                                                })})
                                            }
                                        ]}
                                        menuListSelected={tableColums.filter((itm)=>!tableConfig?.hiddenColumn?.includes(itm.key)).map(itm=>itm.key)}
                                    />
                                )
                            }
                        </div>
                    </div>
                )
            }
            <div className='table-content'  ref={tableContentRef}>
                <div 
                    className='table-header'
                    style={{
                        display:'grid',
                        gridTemplateColumns:(isActionButtons?('1fr 90px'):('1fr')),
                        paddingRight:(isContentScoll[1])?('var(--scroll-width)'):('0px')
                    }}
                    
                >
                    <div style={{display:'grid', gridTemplateColumns:cloumnGridSize}}>
                        {
                            (isExpandable)&&(
                                <div className='header-cell'>
                                    <IconButton
                                        spacing='compact'
                                        appearance='subtle'
                                        Icon={rowExpanded.length===0?(<VscExpandAll/>):(<VscCollapseAll/>)}
                                        onClick={thisOnExpandRow}
                                        isDisabled={tableData.length===0}
                                    />
                                </div>
                            )
                        }
                        {
                            (isCheckbox)&&(
                                <div className='header-cell header-cell-checkbox'>
                                    <Checkbox
                                        isSelected={tableDataSelected.length > 0}
                                        isIndeterminate={tableDataSelected.length !== tableData.length}
                                        onClick={()=>{thisOnCheckedAll()}}
                                        isDisabled={tableData.length===0}
                                    />
                                </div>
                            )
                        }
                        {
                            tableColums.map((itmColumn)=>(
                                <div 
                                    key={itmColumn.key} 
                                    className={
                                        processClassname(`header-cell
                                        ${className?(className):('')}
                                        ${itmColumn.isAlignTxtRight?('align-right'):('')}`)  
                                    }
                                    style={{
                                        display:((tableConfig?.hiddenColumn.includes(itmColumn.key))?('none'):('flex'))
                                    }}
                                >
                                    <button 
                                        className='header-button'
                                        disabled={!itmColumn.isCanSort || tableData.length===0}
                                        onClick={()=>{thisOnClickColumn(itmColumn.key)}}
                                    >
                                        {itmColumn.txtLabel}
                                        {
                                            (itmColumn.isCanSort)&&(
                                                <span 
                                                    className='header-button-caret'
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
                    </div>
                    
                    {
                        (isActionButtons)&&(
                            <div className='header-cell align-right'>
                                
                            </div>
                        )
                    }
                </div>
                <div className='table-datas' ref={tableDataListRef}>
                    {
                        tableData.map((itmRow, index)=>{
                            const itmRowId:string = (itmRow?.id)?(itmRow.id):(`${index}`)
                            return(
                                <Fragment key={itmRowId}>
                                    <div 
                                        className={
                                            processClassname(`table-data-row
                                            ${(onClickRow)?('has-hover'):('')}
                                            ${(tableDataSelected.includes(itmRowId))?('selected-row'):('')}`)
                                        }
                                        style={{
                                            gridTemplateColumns:(isActionButtons?('1fr 90px'):('1fr'))
                                        }}
                                        role="button"
                                        tabIndex={itmRow.to?(0):(-1)}
                                        aria-pressed="false" 
                                        onClick={(onClickRow)?(event)=>{onClickRowClick(event, itmRow)}:undefined} 
                                        onKeyDown={(onClickRow)?(event)=>{onClickRowSpace(event, itmRow)}:undefined}
                                    >
                                        <div style={{display:'grid', gridTemplateColumns:cloumnGridSize}}>
                                            {
                                                (isExpandable) &&(
                                                    <div 
                                                        className='data-cell'
                                                    >
                                                        <IconButton
                                                            Icon={rowExpanded.includes(itmRowId)?<PiMinus/>:<PiPlus/>}
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
                                                    <div className='data-cell header-cell-checkbox'>
                                                        <Checkbox
                                                            isSelected={tableDataSelected.includes(itmRowId)}
                                                            onClick={()=>{thisOnCheckedItem(itmRowId)}}
                                                        />
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
                                                                        processClassname(`data-cell data-cell-clickable
                                                                        ${className?(className):('')}
                                                                        ${itmColumn.isAlignTxtRight?('align-right'):('')}`)  
                                                                    }
                                                                    style={{
                                                                        cursor:(onClickRow)?('pointer'):('default'),
                                                                        display:((tableConfig?.hiddenColumn.includes(itmColumn.key))?('none'):('flex'))
                                                                    }}
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
                                                                        processClassname(`data-cell data-cell-clickable
                                                                        ${className?(className):('')}
                                                                        ${itmColumn.isAlignTxtRight?('align-right'):('')}`)  
                                                                    }
                                                                    style={{
                                                                        cursor:(onClickRow)?('pointer'):('default'),
                                                                        display:((tableConfig?.hiddenColumn.includes(itmColumn.key))?('none'):('flex'))
                                                                    }}
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
                                                                        processClassname(`data-cell data-cell-clickable
                                                                        ${className?(className):('')}
                                                                        ${itmColumn.isAlignTxtRight?('align-right'):('')}`)  
                                                                    }
                                                                    style={{
                                                                        cursor:(onClickRow)?('pointer'):('default'),
                                                                        display:((tableConfig?.hiddenColumn.includes(itmColumn.key))?('none'):('flex'))
                                                                    }}
                                                                >
                                                                    {itmRow[itmColumn.key]}
                                                                </div>
                                                            )
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        {
                                            (isActionButtons)&&(
                                                <div className='data-cell align-right'>
                                                    {
                                                        itmRow.actionButton?.map((itmButton)=>{
                                                            if(itmButton.type==='button' && typeof itmButton.txtLabelOrIcon === 'string'){
                                                                return(
                                                                    <Button
                                                                        key={itmButton.id}
                                                                        spacing='compact'
                                                                        appearance={itmButton.appearance}
                                                                        txtLabel={itmButton.txtLabelOrIcon}
                                                                        IconBefore={itmButton.IconBefore}
                                                                        IconAfter={itmButton.IconAfter}
                                                                        onClick={()=>{thisOnClickAction(itmButton.id, itmRow)}}
                                                                        isDisabled={itmButton.isDisabled}
                                                                    />
                                                                )
                                                            }else if(itmButton.type==='icon-button' && typeof itmButton.txtLabelOrIcon !== 'string'){
                                                                return(
                                                                    <IconButton
                                                                        key={itmButton.id}
                                                                        spacing='compact'
                                                                        appearance={itmButton.appearance}
                                                                        Icon={itmButton.txtLabelOrIcon}
                                                                        onClick={()=>{thisOnClickAction(itmButton.id, itmRow)}}
                                                                        isDisabled={itmButton.isDisabled}
                                                                    />
                                                                )
                                                            }else if(itmButton.type==='dropdown-menu'){
                                                                return(
                                                                    <DropdownMenu
                                                                        key={itmButton.id}
                                                                        TxtLabelOrIcon={itmButton.txtLabelOrIcon}
                                                                        appearance={itmButton.appearance}
                                                                        menuList={itmButton.menuList?itmButton.menuList:[]}
                                                                        spacing='compact'
                                                                        onClickItem={(buttonId)=>{thisOnClickAction(buttonId, itmRow)}}
                                                                        isCloseAfterSelect
                                                                        isDisabled={itmButton.isDisabled}
                                                                        isOnScrollClose={true}
                                                                    />
                                                                )
                                                            }else{
                                                                return(undefined)
                                                            }
                                                        })
                                                    }
                                                    
                                                </div>
                                            )
                                        }
                                    </div>
                                    {
                                        (rowExpanded.includes(itmRowId) && itmRow.expandPage &&  typeof itmRow.expandPage === 'function')&&(
                                            <div className='table-data-row-expandable'>
                                                {itmRow.expandPage()}
                                            </div>
                                        )
                                    }
                                    {
                                        (rowExpanded.includes(itmRowId)&& itmRow.expandPage && typeof itmRow.expandPage !== 'function')&&(
                                            <div className='table-data-row-expandable'>
                                                {itmRow.expandPage}
                                            </div>
                                        )
                                    }
    
                                </Fragment>
                            )
                        })
                    }
                </div>
            </div>
            {
                (tableConfig && !isHidaPagination)&&(
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
                                (tableConfig.totalData!==0 && tableData.length!==0)&&(
                                    `${tableRow[0]}-${tableRow[1]} / ${tableConfig.totalData}`
                                )
                            }
                        </div>
                        <div className='table-footer-pagination'>
                            <IconButton
                                Icon={<PiCaretDoubleLeft/>}
                                spacing='compact'
                                onClick={()=>{thisOnClickPagination('first')}}
                                isDisabled={tableData.length===0}
                            />
                            <IconButton
                                Icon={<PiCaretLeft/>}
                                spacing='compact'
                                onClick={()=>{thisOnClickPagination('prev')}}
                                isDisabled={tableData.length===0}
                            />
                            {`Page ${tableConfig.page} / ${tableConfig.maxPage}`}
                            <IconButton
                                Icon={<PiCaretRight/>}
                                spacing='compact'
                                onClick={()=>{thisOnClickPagination('next')}}
                                isDisabled={tableData.length===0}
                            />
                            <IconButton
                                Icon={<PiCaretDoubleRight/>}
                                spacing='compact'
                                onClick={()=>{thisOnClickPagination('last')}}
                                isDisabled={tableData.length===0}
                            />
                        </div>
                        <div className='table-footer-maxrow'>
                            {
                                (tableData.length!==0)&&(
                                    <>
                                        
                                        {(mediaSize >= 1)&&(`Show ${tableConfig.maxRow} item`)}
                                        <DropdownMenu
                                            TxtLabelOrIcon={(mediaSize >= 1)?(<PiCaretDown/>):(<PiRows/>)}
                                            altTxtLabel='Maximum Row Shown'
                                            spacing='compact'
                                            menuList={[
                                                {id:'10', txtLabel:'10', value:10},
                                                {id:'50', txtLabel:'50', value:50},
                                                {id:'100', txtLabel:'100', value:100}
                                            ]}
                                            menuListSelected={[`${tableConfig.maxRow}`]}
                                            onClickItem={(idButton, value)=>{if(typeof value === 'number'){thisOnChangeMaxRow(value)}}}
                                            isDisabled={tableData.length===0}
                                        />
                                    </>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Table
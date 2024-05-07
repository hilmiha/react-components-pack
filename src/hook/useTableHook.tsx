import { useEffect, useMemo, useState } from "react"
import { tableColumType, tableConfigType, tableDataType, tableFilterType } from "../components/table";

type useTableProps = {
    getTableList: (tableConfig:tableConfigType) => Promise<{dataTamp: tableDataType[]; totalData: number; totalPage: number}>,
    tableColumns: tableColumType[]
}

const useTableHook = ({
    getTableList,
    tableColumns
}: useTableProps) =>{
    const [tableData, setTableData] = useState<tableDataType[]>([])
    const [tableDataSelected, setTableDataSelected] = useState<string[]>([])

    const [doGetData, setDoGetData] = useState(true)

    const sortByDefault = useMemo(()=>{
        const found = tableColumns.find((element) => element.isDefaultSort);
        if(found){
            return(found.key)
        }else{
            return ''
        }
    },[])

    const [tableConfig, setTableConfig] = useState<tableConfigType>({
        totalData:0,
        maxRow:10,
        page:1,
        maxPage:1,
        sortBy:sortByDefault,
        isDesc:false,
        hiddenColumn:[],
        filter:undefined,
        searchKey:''
    })

    const onClickSelect = (itmRowId:string) =>{
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

    const onClickSelectAll = () =>{
        if(tableDataSelected.length !== tableData.length){
            setTableDataSelected(tableData.map((itm)=>itm.id))
        }else{
            setTableDataSelected([])
        }
    }

    const onHideColumn = (tableColumnKey:string) =>{
        let tampIsChecked = tableConfig.hiddenColumn.includes(tableColumnKey)
        const tableConfigTamp = {...tableConfig}

        if(tampIsChecked){
            tableConfigTamp.hiddenColumn = [...tableConfig.hiddenColumn].filter((x)=>x!==tableColumnKey)
        }else{
            tableConfigTamp.hiddenColumn = [...tableConfig.hiddenColumn]
            tableConfigTamp.hiddenColumn.push(tableColumnKey)
        }
        setTableConfig(tableConfigTamp)
    }

    const onClickColumn = (columnKey:string, isDesc:boolean) =>{
        const tableConfigTamp = {...tableConfig}
        tableConfigTamp.page = 1
        tableConfigTamp.sortBy = columnKey
        tableConfigTamp.isDesc = isDesc
        setTableConfig(tableConfigTamp)
        setDoGetData(true)
    }

    const onChangeMaxRow = (newMaxRow:number) =>{
        const tableConfigTamp = {...tableConfig}
        tableConfigTamp.page = 1
        tableConfigTamp.maxRow = newMaxRow
        setTableConfig(tableConfigTamp)
        setDoGetData(true)
    }

    const onApplyFilter = (filter:tableFilterType) =>{
        const tableConfigTamp = {...tableConfig}
        tableConfigTamp.page = 1
        tableConfigTamp.filter = filter
        tableConfigTamp.sortBy = sortByDefault
        tableConfigTamp.isDesc = false
        setTableConfig(tableConfigTamp)
        setDoGetData(true)
    }

    const onClickPagination = (idButton:string) =>{
        const tableConfigTamp = {...tableConfig}
        switch (idButton) {
            case 'next':
                if(tableConfigTamp.page + 1 <= tableConfigTamp.maxPage){
                    tableConfigTamp.page = tableConfigTamp.page + 1
                    setTableConfig(tableConfigTamp)
                    setDoGetData(true)
                }
                break;
    
            case 'prev':
                if(tableConfigTamp.page - 1 > 0){
                    tableConfigTamp.page = tableConfigTamp.page - 1
                    setTableConfig(tableConfigTamp)
                    setDoGetData(true)
                }
                break;
    
            case 'first':
                if(tableConfigTamp.page !== 1){
                    tableConfigTamp.page = 1
                    setTableConfig(tableConfigTamp)
                    setDoGetData(true)
                }
                break;
    
            case 'last':
                if(tableConfigTamp.page !== tableConfigTamp.maxPage){
                    tableConfigTamp.page = tableConfigTamp.maxPage
                    setTableConfig(tableConfigTamp)
                    setDoGetData(true)
                }
                break;
        
            default:
                break;
        }
    }

    const onDoSearch = (searchKey:string) =>{
        const tableConfigTamp = {...tableConfig}
        tableConfigTamp.searchKey = searchKey
        tableConfigTamp.page = 1
        tableConfigTamp.sortBy = sortByDefault
        tableConfigTamp.isDesc = false
        setTableConfig(tableConfigTamp)
        setDoGetData(true)
    }

    useEffect(()=>{
        if(doGetData){
            getTableList(tableConfig).then(({dataTamp, totalData,  totalPage})=>{
                const tableConfigTamp = {...tableConfig}
                tableConfigTamp.totalData = totalData
                tableConfigTamp.maxPage = totalPage
            
                setTableConfig(tableConfigTamp)
                setTableData(dataTamp)
            })
            setDoGetData(false)
        }
    },[doGetData])

    useEffect(()=>{
        setTableDataSelected([])
    },[tableConfig])

    return({
        tableData,
        setTableData,
        tableConfig,
        tableDataSelected, 
        setTableDataSelected,
        onDoSearch,
        onClickColumn,
        onChangeMaxRow,
        onClickPagination,
        onClickSelect,
        onClickSelectAll,
        onHideColumn,
        onApplyFilter
    })
}

export default useTableHook
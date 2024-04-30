import { useEffect, useState } from "react"
import { tableConfigType, tableDataType } from "../components/table"

type useTableProps = {
    getTableList: (tableConfig:tableConfigType) => Promise<{dataTamp: tableDataType[]; totalData: number; totalPage: number}>
}

const useTableHook = ({
    getTableList
}: useTableProps) =>{
    const [tableData, setTableData] = useState<tableDataType[]>([])
    const [tableDataSelected, setTableDataSelected] = useState<string[]>([])

    const [doGetData, setDoGetData] = useState(true)

    const [tableConfig, setTableConfig] = useState<tableConfigType>({
        totalData:0,
        maxRow:10,
        page:1,
        maxPage:1,
        sortBy:'status',
        isDesc:false,
    })

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

    return({
        tableData,
        setTableData,
        tableConfig,
        tableDataSelected, 
        setTableDataSelected,
        onClickColumn,
        onChangeMaxRow,
        onClickPagination
    })
}

export default useTableHook
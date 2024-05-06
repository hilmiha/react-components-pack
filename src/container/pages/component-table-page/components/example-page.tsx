import { useContext, useEffect, useMemo, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import Table, { tableColumType, tableConfigType, tableDataType } from "../../../../components/table";
import { tableColumsDummnyNew } from "../data/tableData";
import useTableHook from "../../../../hook/useTableHook";
import * as contorller from "../controller/controller";
import TableNew from "../../../../components/table_new";
import TableFilter from "./filter-page";
import Drawer from "../../../../components/drawer";
import { useNavigate } from "react-router-dom";

export type getStateTypes = {
    tableData: tableDataType[]
    tableDataSelected: string[] 
    setTableDataSelected: React.Dispatch<React.SetStateAction<string[]>>,
    tableConfig: tableConfigType
}

const ExamplePage = () =>{
    const navigate = useNavigate()
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [tableColumnsNew, setTableColumnsNew] = useState([...tableColumsDummnyNew])
    const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

    const {
        tableData,
        tableDataSelected,
        setTableDataSelected,
        tableConfig,
        onDoSearch,
        onClickColumn,
        onChangeMaxRow,
        onClickPagination,
        onClickSelect,
        onClickSelectAll,
        onApplyFilter,
        onHideColumn,
    } = useTableHook({
        getTableList: (newTableConfig)=>{return contorller.getTableDataApi(newTableConfig)},
        tableColumns:tableColumnsNew
    })

    const getState = () =>{
        return({
            tableData,
            tableDataSelected,
            setTableDataSelected,
            tableConfig,
        })
    }

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <div style={{width:'100%', height:'600px'}}>
                        <TableNew
                            tableColums={tableColumnsNew}
                            tableData={tableData}
                            tableDataSelected={tableDataSelected}
                            tableConfig={tableConfig}
                            
                            isExpandable={true}
                            isCheckbox={true}
                            isActionButtons={true}

                            onClickRow={(itmRow)=>{contorller.onClickRowItem(itmRow)}}
                            onClickAction={(idButton, itmRow)=>{contorller.onClickAction(idButton, itmRow, getState())}}

                            searchBarPlaceholder={'Search User or Email...'}
                            onDoSearch={onDoSearch}
                            onClickPagination={onClickPagination}
                            onChangeMaxRow={onChangeMaxRow}
                            onClickColumn={onClickColumn}
                            onClickSelect={onClickSelect}
                            onClickSelectAll={onClickSelectAll}
                            onHideColumn={onHideColumn}
                            onClickOpenFilter={()=>{setIsFilterDrawerOpen(true)}}
                        />
                        <TableFilter
                            filterValue={tableConfig.filter}
                            isFilterDrawerOpen={isFilterDrawerOpen}
                            setIsFilterDrawerOpen={setIsFilterDrawerOpen}
                            onApplyFilter={onApplyFilter}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
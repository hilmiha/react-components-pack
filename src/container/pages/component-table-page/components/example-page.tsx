import { useContext, useEffect, useMemo } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import { tableColumsDummny } from "../data/tableData";
import useTableHook from "../../../../hook/useTableHook";
import * as contorller from "../controller/controller";
import Table, { tableConfigType, tableDataType } from "../../../../components/table";
import FilterForm from "./filter-form";

export type getStateTypes = {
    tableData: tableDataType[]
    tableDataSelected: string[] 
    setTableDataSelected: React.Dispatch<React.SetStateAction<string[]>>,
    tableConfig: tableConfigType
}

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const tableColumns = useMemo(()=>{return [...tableColumsDummny]},[])

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
        tableColumns:tableColumns
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
                    <div style={{width:'100%', height:'500px'}}>
                        <Table
                            tableColums={tableColumns}
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

                            FilterPage={FilterForm}
                            onApplyFilter={onApplyFilter}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
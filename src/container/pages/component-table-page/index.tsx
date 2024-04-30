import { useContext, useEffect, useMemo, useState } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import { tableColumsDummny } from "./data/tableData";
import Table, { tableColumType, tableConfigType, tableDataType } from "../../../components/table";
import * as contorller from "./controller/controller";
import useTableHook from "../../../hook/useTableHook";

export type getStateTypes = {
    tableData: tableDataType[]
    // setTableData: React.Dispatch<React.SetStateAction<tableDataType[]>>
    tableDataSelected: string[] 
    setTableDataSelected: React.Dispatch<React.SetStateAction<string[]>>,
    tableConfig: tableConfigType
    // setTableConfig: React.Dispatch<React.SetStateAction<tableConfigType>>
    // doGetData:boolean
    // setDoGetData:React.Dispatch<React.SetStateAction<boolean>>
}

const ComponentTablePage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const tableColums:tableColumType[] = useMemo(()=>([...tableColumsDummny]), [])

    const {
        tableData,
        tableDataSelected,
        setTableDataSelected,
        tableConfig,
        onClickColumn,
        onChangeMaxRow,
        onClickPagination
    } = useTableHook({
        getTableList: (tableConfig)=>{return contorller.getTableDataApi(tableConfig)}
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
        console.log(getState())
    },[tableData])
    
    return(
        <DetailTemplate 
            title="Table" 
            subTitle="A table displays rows of data with built-in pagination and sorting functionality."
        >
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <div style={{width:'100%'}}>
                        <Table
                            tableColums={tableColums}
                            tableData={tableData}
                            tableDataSelected={tableDataSelected}
                            setTableDataSelected={setTableDataSelected}
                            tableConfig={tableConfig}
                            isExpandable={true}
                            isCheckbox={true}
                            isActionButtons={true}
                            
                            onClickRow={(itmRow)=>{contorller.onClickRowItem(itmRow)}}
                            onClickAction={(idButton, itmRow)=>{contorller.onClickAction(idButton, itmRow, getState())}}
                            onClickPagination={onClickPagination}
                            onChangeMaxRow={onChangeMaxRow}
                            onClickColumn={onClickColumn}
                        />
                    </div>
                    
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Empty Table</span>
                <div className="preview-box">
                    <div style={{width:'100%'}}>
                        <Table
                            tableColums={tableColums}
                            tableData={[]}
                            tableDataSelected={[]}
                            tableConfig={{
                                totalData:0,
                                maxRow:10,
                                page:1,
                                maxPage:1,
                                sortBy:'status',
                                isDesc:false,
                            }}
                            isExpandable={true}
                            isCheckbox={true}
                            isActionButtons={true}
                        />
                    </div>
                    
                </div>
            </div>
            
        </DetailTemplate>
    )
}   

export default ComponentTablePage
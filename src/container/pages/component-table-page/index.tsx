import { useContext, useEffect, useMemo, useState } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import { tableColumsDummny, tableDataDummy } from "./data/tableData";
import Table, { tableColumType, tableConfigType, tableDataType } from "../../../components/table";
import * as contorller from "./controller/controller";

export type getStateTypes = {
    tableData: tableDataType[]
    setTableData: React.Dispatch<React.SetStateAction<tableDataType[]>>
    tableDataSelected: string[] 
    setTableDataSelected: React.Dispatch<React.SetStateAction<string[]>>,
    tableConfig: tableConfigType
    setTableConfig: React.Dispatch<React.SetStateAction<tableConfigType>>
    doGetData:boolean
    setDoGetData:React.Dispatch<React.SetStateAction<boolean>>
}

const ComponentTablePage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const tableColums:tableColumType[] = useMemo(()=>([...tableColumsDummny]), [])
    const [doGetData, setDoGetData] = useState(true)
    const [tableData, setTableData] = useState<tableDataType[]>([])
    const [tableDataSelected, setTableDataSelected] = useState<string[]>([])
    const [tableConfig, setTableConfig] = useState<tableConfigType>({
        totalData:0,
        maxRow:10,
        page:1,
        maxPage:1,
        sortBy:'status',
        isDesc:false,
    })

    const getState = ():getStateTypes =>{
        return({
            tableData, 
            setTableData,
            doGetData, 
            setDoGetData,
            tableConfig,
            setTableConfig,
            tableDataSelected, 
            setTableDataSelected
        })
    }    

    useEffect(()=>{
        setSidebarMenuListSelected('table')
    },[])

    useEffect(()=>{
        if(doGetData){
            contorller.getTableData(getState())
            setDoGetData(false)
        }
    },[doGetData])

    useEffect(()=>{
        console.log(tableConfig)
    },[tableConfig])
    
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
                            
                            onClickRow={(itmRow)=>{console.log(itmRow)}}
                            onClickAction={(idButton, itmRow)=>{contorller.onClickAction(idButton, itmRow, getState())}}
                            onClickPagination={(idButton)=>{contorller.onClickPagination(idButton, getState())}}
                            onChangeMaxRow={(newMaxRow)=>{contorller.onChangeMaxRow(newMaxRow, getState())}}
                            onClickColumn={(columnKey, isDesc)=>{contorller.onClickColumn(columnKey, isDesc, getState())}}
                        />
                    </div>
                    
                </div>
            </div>
            
        </DetailTemplate>
    )
}   

export default ComponentTablePage
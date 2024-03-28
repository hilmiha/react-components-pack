import { PiDotsThreeBold } from "react-icons/pi";
import { getStateTypes } from ".."
import PillFlair from "../../../../components/pill-flair";
import { tableDataType } from "../../../../components/table"
import { tableDataDummy } from "../data/tableData";

export const asyncTimeout = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

const simulateBackEndProcess = (getState:getStateTypes) =>{
    const allData = [...tableDataDummy].sort((a, b) => {
        let fa = a[getState.tableConfig.sortBy].toLowerCase(),
            fb = b[getState.tableConfig.sortBy].toLowerCase();
        
        if(getState.tableConfig.isDesc){
            if (fa > fb) {
                return -1;
            }
            if (fa < fb) {
                return 1;
            }
            return 0;
        }else{
            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        }
        
    });
    

    const startData = ((getState.tableConfig.page*getState.tableConfig.maxRow)-getState.tableConfig.maxRow+1)
    const endData = Math.min((getState.tableConfig.page*getState.tableConfig.maxRow),allData.length)

    return({
        data:allData.slice(startData-1, endData),
        totalData:allData.length,
        totalPage:Math.ceil(allData.length / getState.tableConfig.maxRow)
    })
}

export const getTableData = async(getState:getStateTypes) =>{
    const response = simulateBackEndProcess(getState)
    const dataTamp:tableDataType[] = response.data.map((itm)=>{
        return({
            id:itm.id,
            user:[itm.user, itm.email],
            group:itm.group,
            status:()=>{
                let tamp:JSX.Element | undefined = undefined
                switch (itm.status) {

                    case '0':
                        tamp = (<PillFlair color="success" txtLabel={'Active'} type="pill"/>)
                        break;

                    case '1':
                        tamp = (<PillFlair color="warning" txtLabel={'Suspended'} type="pill"/>)
                        break;

                    case '2':
                        tamp = (<PillFlair color="danger" txtLabel={'Locked'} type="pill"/>)
                        break;

                    case '3':
                        tamp = (<PillFlair txtLabel={'Inactive'} type="pill"/>)
                        break;
                
                    default:
                        break;
                }
                
                return(tamp)
            },
            expandPage:(itm.detail)?(()=>{
                return(
                    <span className="font-text">{itm.detail}</span>
                )
            }):(undefined),
            actionButton:[
                {
                    id:'delete3', 
                    type:'dropdown-menu', 
                    Icon:PiDotsThreeBold, 
                    appearance:'default',
                    menuList:[
                        {
                            id:'menu', 
                            menu:[
                                {id:'edit', txtLabel:"Edit"}, 
                                {id:'report', txtLabel:"Report"}, 
                            ]}
                        ]
                }
            ],
            to:'#',
        })
    })

    const tableConfigTamp = {...getState.tableConfig}
    tableConfigTamp.totalData = response.totalData
    tableConfigTamp.maxPage = response.totalPage

    getState.setTableConfig(tableConfigTamp)

    getState.setTableData(dataTamp)
}

export const onClickPagination = (idButton:string, getState:getStateTypes) =>{
    const tableConfigTamp = {...getState.tableConfig}
    console.log(idButton)
    switch (idButton) {
        case 'next':
            if(tableConfigTamp.page + 1 <= tableConfigTamp.maxPage){
                tableConfigTamp.page = tableConfigTamp.page + 1
                getState.setTableConfig(tableConfigTamp)
                getState.setDoGetData(true)
            }
            break;

        case 'prev':
            if(tableConfigTamp.page - 1 > 0){
                tableConfigTamp.page = tableConfigTamp.page - 1
                getState.setTableConfig(tableConfigTamp)
                getState.setDoGetData(true)
            }
            break;

        case 'first':
            if(tableConfigTamp.page !== 1){
                tableConfigTamp.page = 1
                getState.setTableConfig(tableConfigTamp)
                getState.setDoGetData(true)
            }
            break;

        case 'last':
            if(tableConfigTamp.page !== tableConfigTamp.maxPage){
                tableConfigTamp.page = tableConfigTamp.maxPage
                getState.setTableConfig(tableConfigTamp)
                getState.setDoGetData(true)
            }
            break;
    
        default:
            break;
    }
}

export const onChangeMaxRow = (newMaxRow:number, getState:getStateTypes) =>{
    const tableConfigTamp = {...getState.tableConfig}
    tableConfigTamp.page = 1
    tableConfigTamp.maxRow = newMaxRow
    getState.setTableConfig(tableConfigTamp)
    getState.setDoGetData(true)
}

export const onClickColumn = (columnKey:string, isDesc:boolean, getState:getStateTypes) =>{
    const tableConfigTamp = {...getState.tableConfig}
    tableConfigTamp.page = 1
    tableConfigTamp.sortBy = columnKey
    tableConfigTamp.isDesc = isDesc
    getState.setTableConfig(tableConfigTamp)
    getState.setDoGetData(true)
}

export const onClickAction = (idButton:string, itmRow:tableDataType, getState:getStateTypes) =>{
    console.log(idButton, itmRow)
}
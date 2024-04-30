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

const simulateBackEndProcess = (viewState:getStateTypes) =>{
    const allData = [...tableDataDummy].sort((a, b) => {
        let fa = a[viewState.tableConfig.sortBy].toLowerCase(),
            fb = b[viewState.tableConfig.sortBy].toLowerCase();
        
        if(viewState.tableConfig.isDesc){
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
    

    const startData = ((viewState.tableConfig.page*viewState.tableConfig.maxRow)-viewState.tableConfig.maxRow+1)
    const endData = Math.min((viewState.tableConfig.page*viewState.tableConfig.maxRow),allData.length)

    return({
        data:allData.slice(startData-1, endData),
        totalData:allData.length,
        totalPage:Math.ceil(allData.length / viewState.tableConfig.maxRow)
    })
}

export const getTableData = async(viewState:getStateTypes) =>{
    const response = simulateBackEndProcess(viewState)
    const dataTamp:tableDataType[] = response.data.map((itm)=>{
        return({
            id:itm.id,
            user:[itm.user, itm.email],
            group:itm.group,
            status:()=>{
                let tamp:JSX.Element | undefined = undefined
                switch (itm.status) {

                    case '0':
                        tamp = (<PillFlair color="success" txtLabel={'Active'} appearance="pill"/>)
                        break;

                    case '1':
                        tamp = (<PillFlair color="warning" txtLabel={'Suspended'} appearance="pill"/>)
                        break;

                    case '2':
                        tamp = (<PillFlair color="danger" txtLabel={'Locked'} appearance="pill"/>)
                        break;

                    case '3':
                        tamp = (<PillFlair txtLabel={'Inactive'} appearance="pill"/>)
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
                    txtLabelOrIcon:PiDotsThreeBold, 
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

    const tableConfigTamp = {...viewState.tableConfig}
    tableConfigTamp.totalData = response.totalData
    tableConfigTamp.maxPage = response.totalPage

    viewState.setTableConfig(tableConfigTamp)

    viewState.setTableData(dataTamp)
}

export const onClickPagination = (idButton:string, viewState:getStateTypes) =>{
    const tableConfigTamp = {...viewState.tableConfig}
    console.log(idButton)
    switch (idButton) {
        case 'next':
            if(tableConfigTamp.page + 1 <= tableConfigTamp.maxPage){
                tableConfigTamp.page = tableConfigTamp.page + 1
                viewState.setTableConfig(tableConfigTamp)
                viewState.setDoGetData(true)
            }
            break;

        case 'prev':
            if(tableConfigTamp.page - 1 > 0){
                tableConfigTamp.page = tableConfigTamp.page - 1
                viewState.setTableConfig(tableConfigTamp)
                viewState.setDoGetData(true)
            }
            break;

        case 'first':
            if(tableConfigTamp.page !== 1){
                tableConfigTamp.page = 1
                viewState.setTableConfig(tableConfigTamp)
                viewState.setDoGetData(true)
            }
            break;

        case 'last':
            if(tableConfigTamp.page !== tableConfigTamp.maxPage){
                tableConfigTamp.page = tableConfigTamp.maxPage
                viewState.setTableConfig(tableConfigTamp)
                viewState.setDoGetData(true)
            }
            break;
    
        default:
            break;
    }
}

export const onChangeMaxRow = (newMaxRow:number, viewState:getStateTypes) =>{
    const tableConfigTamp = {...viewState.tableConfig}
    tableConfigTamp.page = 1
    tableConfigTamp.maxRow = newMaxRow
    viewState.setTableConfig(tableConfigTamp)
    viewState.setDoGetData(true)
}

export const onClickColumn = (columnKey:string, isDesc:boolean, viewState:getStateTypes) =>{
    const tableConfigTamp = {...viewState.tableConfig}
    tableConfigTamp.page = 1
    tableConfigTamp.sortBy = columnKey
    tableConfigTamp.isDesc = isDesc
    viewState.setTableConfig(tableConfigTamp)
    viewState.setDoGetData(true)
}

export const onClickAction = (idButton:string, itmRow:tableDataType, viewState:getStateTypes) =>{
    console.log(idButton, itmRow)
}
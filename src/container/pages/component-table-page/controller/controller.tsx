import { PiDotsThreeBold } from "react-icons/pi";
import { getStateTypes } from "../components/example-page"
import PillFlair from "../../../../components/pill-flair";
import { tableDataDummy } from "../data/tableData";
import { tableConfigType, tableDataType } from "../../../../components/table";
import { selectionValueType } from "../../../../components/selection-field";
import { capitalize } from "lodash";
import { endOfDay, format, startOfDay } from "date-fns";
import { DateRange } from "react-day-picker";

export const asyncTimeout = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

const simulateBackEndProcess = (tableConfig:tableConfigType) =>{
    const groupFilter = (tableConfig.filter?.group)?((tableConfig.filter.group as selectionValueType).map((itm)=>itm.value)):([])
    const statusFilter = (tableConfig.filter?.status)?((tableConfig.filter.status as selectionValueType).map((itm)=>itm.value)):([])
    const lastUpdateFilter = (tableConfig.filter?.lastUpdateDt)?(tableConfig.filter.lastUpdateDt as DateRange):(undefined)
    const searchKeyFilter = (tableConfig.searchKey)?((tableConfig.searchKey as string).toLowerCase()):('')

    const filtered = [...tableDataDummy].filter((item)=>{
        return(
            ((groupFilter.length>0)?(groupFilter.includes(item.group)):(true)) &&
            ((statusFilter.length>0)?(statusFilter.includes(item.status)):(true)) &&
            ((lastUpdateFilter && lastUpdateFilter.from && lastUpdateFilter.to)?(
                startOfDay(lastUpdateFilter.from).getTime() <= new Date(parseInt(item.lastUpdateDt)).getTime() &&
                endOfDay(lastUpdateFilter.to).getTime() >= new Date(parseInt(item.lastUpdateDt)).getTime()
            ):(true)) &&
            ((searchKeyFilter!=='')?(item.user.toLowerCase().includes(searchKeyFilter) || item.email.toLowerCase().includes(searchKeyFilter)):(true))
        )
    })
    let allData = (tableConfig.sortBy)?(
        filtered.sort((a, b) => {
            let fa = a[tableConfig.sortBy].toLowerCase(),
                fb = b[tableConfig.sortBy].toLowerCase();
            
            if(tableConfig.isDesc){
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
        })
    ):(
        filtered
    )

    const startData = ((tableConfig.page*tableConfig.maxRow)-tableConfig.maxRow+1)
    const endData = Math.min((tableConfig.page*tableConfig.maxRow),allData.length)

    return({
        data:allData.slice(startData-1, endData),
        totalData:allData.length,
        totalPage:Math.ceil(allData.length / tableConfig.maxRow)
    })
}

export const getTableDataApi = async(tableConfig:tableConfigType) =>{
    const response = simulateBackEndProcess(tableConfig)
    const dataTamp:tableDataType[] = response.data.map((itm)=>{
        return({
            id:itm.id,
            user:[itm.user, itm.email],
            group:()=>{
                let tamp = ''

                switch (itm.group) {
                    case 'it':
                        tamp = 'IT'
                        break;

                    default:
                        tamp = capitalize(itm.group)
                        break;
                }

                return tamp
            },
            lastUpdateDt:[format(new Date(parseInt(itm.lastUpdateDt)), 'dd MMMM yyyy'), format(new Date(parseInt(itm.lastUpdateDt)), 'HH:mm:ss')],
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

    return {
        dataTamp: dataTamp,
        totalData: response.totalData,
        totalPage: response.totalPage
    }
}

export const onClickAction = (idButton:string, itmRow:tableDataType, viewState:getStateTypes) =>{
    console.log(idButton, itmRow)
}

export const onClickRowItem = (itmRow:tableDataType) =>{
    console.log(itmRow)
}
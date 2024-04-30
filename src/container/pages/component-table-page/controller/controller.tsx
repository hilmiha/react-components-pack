import { PiDotsThreeBold } from "react-icons/pi";
import { getStateTypes } from "../components/example-page"
import PillFlair from "../../../../components/pill-flair";
import { tableConfigType, tableDataType } from "../../../../components/table"
import { tableDataDummy } from "../data/tableData";

export const asyncTimeout = (ms: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};

const simulateBackEndProcess = (tableConfig:tableConfigType) =>{
    const allData = [...tableDataDummy].sort((a, b) => {
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
        
    });
    

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
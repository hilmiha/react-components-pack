import { useNavigate } from "react-router-dom"
import Button from "../components/button"
import Table, { tableColumType, tableConfigType, tableDataType } from "../components/table"
import React, { useState } from "react"
import { GlobalContext, GlobalContextType } from "../context/globalcontext"
import { PiCheck, PiCheckBold, PiDotsThree, PiDotsThreeBold, PiSpinnerGap, PiSpinnerGapBold, PiTrashBold } from "react-icons/pi"
import PillFlair from "../components/pill-flair"

const TablePage = () =>{
    const {
        changeTheme,
    } = React.useContext(GlobalContext) as GlobalContextType;

	const navigate = useNavigate()

    const tableColums:tableColumType[] = [
        {
            key:'username',
            txtLabel:'Username',
            size:'0.5fr',
            isCanSort:true
        },
        {
            key:'name',
            txtLabel:'Name',
            size:'1fr',
            isCanSort:true
        },
        {
            key:'group',
            txtLabel:'Group',
            size:'0.5fr',
            isCanSort:true
        },
        {
            key:'status',
            txtLabel:'Status',
            size:'0.5fr',
            isCanSort:true
        }
    ]

    const tableColumsChild:tableColumType[] = [
        {
            key:'trxType',
            txtLabel:'Transaction',
            size:'1fr',
        },
        {
            key:'amount',
            txtLabel:'Amount',
            size:'1fr',
            isAlignTxtRight:true
        }
    ]

    const [tableData, setTableData] = useState<tableDataType[]>([
        {
            id:'1',
            username:'red.eagle',
            name:['Hilmi Hidayat Arfisko', 'hellos', 'asdasdad asdasdas asdasdas'],
            group:'Admin',
            status:<PillFlair type="pill" txtLabel="Active" color="danger"/>,
            to:'#',
            actionButton:[
                {id:'delete3', type:'dropdown-menu', Icon:PiDotsThreeBold, appearance:'default', menuList:[{id:'menu', menu:[{id:'edit', txtLabel:"Edit"}, {id:'edit', txtLabel:"Edit"}, {id:'edit', txtLabel:"Edit"}, {id:'edit', txtLabel:"Edit"}, {id:'edit', txtLabel:"Edit"}]}]},
                {id:'delete2', type:'icon-button', Icon:PiTrashBold, appearance:'default'},

            ]
        },
        {
            id:'2',
            username:'blue.sky.budi',
            name:['Budi Surya', 'hellos', 'asdasdad asdasdas asdasdas'],
            group:'Admin',
            status:<PillFlair type="pill" txtLabel="Active" color="success" IconBefore={<PiCheckBold/>}/>,
            to:'#',
            actionButton:[
                {id:'delete3', type:'dropdown-menu', Icon:PiDotsThreeBold, appearance:'default', menuList:[{id:'menu', menu:[{id:'edit', txtLabel:"Edit"}]}]},
                {id:'delete2', type:'icon-button', Icon:PiTrashBold, appearance:'default'}
            ],
            expandPage:()=>(
                <>Hello</>
            )
        },
        {
            id:'3',
            username:'balck.canary',
            name:['Jesica Yao', 'hellos', 'asdasdad asdasdas asdasdas'],
            group:'Business',
            status:<PillFlair type="status" txtLabel="Active" color="warning" IconBefore={<PiSpinnerGapBold />}/>,
            to:'#',
            actionButton:[
                {id:'delete3', type:'dropdown-menu', Icon:PiDotsThreeBold, appearance:'default', menuList:[{id:'menu', menu:[{id:'edit', txtLabel:"Edit"}]}]},
                {id:'delete2', type:'icon-button', Icon:PiTrashBold, appearance:'default', isDisabled:true}
            ]
        },
        {
            id:'4',
            username:'green.arrow',
            name:['Oliver', 'Green', 'asdasdad asdasdas asdasdas'],
            group:'Business',
            status:<PillFlair type="status" txtLabel="Active" color="danger"/>,
            to:'#',
            actionButton:[
                {id:'delete3', type:'dropdown-menu', Icon:PiDotsThreeBold, appearance:'default', menuList:[{id:'menu', menu:[{id:'edit', txtLabel:"Edit"}]}]},
                {id:'delete2', type:'icon-button', Icon:PiTrashBold, appearance:'default', isDisabled:true}
            ]
        },
        {
            id:'5',
            username:'flash.red',
            name:['Barry', 'Allen', 'asdasdad asdasdas asdasdas'],
            group:'IT',
            status:<PillFlair type="text" txtLabel="Active"/>,
            to:'#',
            actionButton:[
                {id:'delete3', type:'dropdown-menu', Icon:PiDotsThreeBold, appearance:'default', menuList:[{id:'menu', menu:[{id:'edit', txtLabel:"Edit"}]}]},
                {id:'delete2', type:'icon-button', Icon:PiTrashBold, appearance:'default', isDisabled:true}
            ]
        }
    ])

    const onCheckedItem = (itmRow:tableDataType, isChecked:boolean) =>{
        setTableData((prevValue)=>{
            return prevValue.map((row)=>{
                if(row.id === itmRow.id){
                    return {...row, isChecked:isChecked}
                }else{
                    return row
                }
            })
        })
    }

    const onCheckedAll = () =>{
        setTableData((prevValue)=>{
            const isUnCheckedAll = prevValue.filter((row)=>(row.isChecked===true))

            if(isUnCheckedAll.length === prevValue.length){
                return prevValue.map((row)=>{
                    return {...row, isChecked:false}
                })
            }else{
                return prevValue.map((row)=>{
                    return {...row, isChecked:true}
                })
            }
            
        })
    }

    const onClickAction = (idButton:string, itmRow:tableDataType) =>{
        console.log(idButton, itmRow)
    }

    const [tableConfig, setTableConfig] = useState<tableConfigType>({
        maxRow:10,
        page:1,
        maxPage:10,
        sortBy:'username',
        isDesc:false
    })
    
    const doSortTable = (columnKey:string, isDesc:boolean) =>{
        setTableConfig((prevState)=>{
            return({
                ...prevState,
                sortBy:columnKey,
                isDesc:isDesc
            })
        })
    }

    return(
        <div style={{
                padding:'0px 18px',
                maxHeight:'100vh',
                display:'flex', 
                flexDirection:'column'
            }}
        >
            <div style={{marginBottom:'18px', display:"flex", gap:'20px'}}>
                <Button
                    txtLabel='Go to /Playground'
                    onClick={()=>{navigate('/playground')}}
                />
                <Button 
					txtLabel='Hello World'
					onClick={()=>{changeTheme()}}
				/>
            </div>
            <Table
                tableColums={tableColums}
                tableData={tableData}
                tableConfig={tableConfig}
                doSortTable={(columnKey, isDesc)=>{doSortTable(columnKey, isDesc)}}
                // isExpandable={true}
                isCheckbox={true}
                isActionButtons={true}
                isFillContainer={false}
                onCheckedItem={(itmRow, isChecked)=>{onCheckedItem(itmRow, isChecked)}}
                onCheckedAll={()=>{onCheckedAll()}}
                onClickAction={(idButton, itmRow)=>{onClickAction(idButton, itmRow)}}
            />
        </div>
    )
}

export default TablePage
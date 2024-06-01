import './styles.scss'
import { processClassname } from "../../helper"
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

export type tabListItemType = {
    id:string
    txtLabel:string,
    to?:string,
    isDisabled?:boolean
}
export type tabListType = tabListItemType[]
type TabsProps = {
    className?:string
    tabList:tabListType,
    selected:string
    setSelected:React.Dispatch<React.SetStateAction<string>>
}

const Tabs = ({
    className,
    tabList = [],
    selected,
    setSelected
}:TabsProps) =>{
    const tabRef = useRef(null)

    const navigate = useNavigate()
    
    const onClickItemTab = (tabItem:tabListItemType) =>{
        if(setSelected){
            setSelected(tabItem.id)
        }
        
        if(tabItem.to){
            navigate(tabItem.to)
        }
    }
    return(
        <div
            ref={tabRef}
            className={
                processClassname(`tabs
                ${className?(className):('')}`)  
            } 
        >
            {
                tabList.map((itmTab, index)=>(
                    <button 
                        className={
                            processClassname(`tab-item
                            ${selected===itmTab.id?('selected'):('')}
                            ${itmTab.isDisabled?('disabled'):('')}`)    
                        } 
                        onClick={()=>{onClickItemTab(itmTab)}}
                        key={itmTab.id}
                        disabled={itmTab.isDisabled}
                    
                    >
                        {itmTab.txtLabel}
                    </button>
                ))
            }
        </div>
    )
}

export default Tabs
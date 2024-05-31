import { useEffect, useRef } from 'react'
import Tabs, { tabListItemType } from '../../../components/tabs'
import './styles.scss'
import Button from '../../../components/button'
import ButtonGroup from '../../../components/button-group'

type Props = {
    title?:string
    subTitle?:string
    headerAdditionaContent?:JSX.Element | JSX.Element[]
    tabList?:tabListItemType[]
    selectedTab?:string
    setSelectedTab?: React.Dispatch<React.SetStateAction<string>>
    children?:JSX.Element | JSX.Element[]
}

const DetailTemplate = ({
    title,
    subTitle,
    headerAdditionaContent,
    tabList,
    selectedTab,
    setSelectedTab,
    children
}:Props) =>{
    return(
        <>
            <div className="detail-template-header">
                <span className='detail-template-header-title'>{title}</span>
                <span className='detail-template-header-subtitle'>{subTitle}</span>
                {
                    (headerAdditionaContent)&&(
                        <div className="detail-template-header-adition">
                            {
                                headerAdditionaContent
                            }
                        </div>
                    )
                }
                
            </div>
            {
                (tabList && selectedTab!==undefined && setSelectedTab)&&(
                    <div className='detail-template-tabs'>
                        <Tabs tabList={tabList} selected={selectedTab} setSelected={setSelectedTab}/>
                    </div>
                )
            }
            
            <div className="detail-template-content">
                {
                    children
                }
            </div>
            
        </>
        
    )
}

export default DetailTemplate
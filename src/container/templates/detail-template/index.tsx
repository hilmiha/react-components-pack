import Tabs, { tabListItemType } from '../../../components/tabs'
import './styles.scss'

type Props = {
    title?:string
    subTitle?:string
    tabList?:tabListItemType[]
    selectedTab?:string
    setSelectedTab?: React.Dispatch<React.SetStateAction<string>>
    children?:JSX.Element | JSX.Element[]
}

const DetailTemplate = ({
    title,
    subTitle,
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
            </div>
            {
                (tabList)&&(
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
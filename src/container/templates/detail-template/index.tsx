import './styles.scss'

type Props = {
    title?:string,
    subTitle?:string
    children?:JSX.Element | JSX.Element[]
}

const DetailTemplate = ({
    title,
    subTitle,
    children
}:Props) =>{
    return(
        <>
            <div className="detail-template-header">
                <span className='detail-template-header-title'>{title}</span>
                <span className='detail-template-header-subtitle'>{subTitle}</span>
            </div>
            <div className="detail-template-content">
                {
                    children
                }
            </div>
            
        </>
        
    )
}

export default DetailTemplate
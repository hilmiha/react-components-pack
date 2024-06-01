import './styles.scss'
export type listCompPropsDetail = {
    id:string,
    propName:string
    isMandatory?:boolean,
    type?:string
    typeAdition?: string | JSX.Element
    default?:string
    desc?:string | JSX.Element
}
type props = {
    listProps:listCompPropsDetail[]
}
const ComponentPropsDetailTemplate = ({
    listProps
}:props) =>{
    return(
        <>
            {
                listProps.map((itm)=>(
                    <div key={itm.id} className="component-props-detail-template">
                        <div className='prop-title'>
                            <p>
                                <span className="font-code">{itm.propName}</span>
                                {
                                    (itm.isMandatory)&&(
                                        <span style={{color:'hsl(var(--color-blue-900))'}}>*</span>
                                    )
                                }
                            </p>
                            
                        </div>
                        <div className='prop-detail'>
                            {
                                (itm.type)&&(
                                    <div className='prop-detail-row'>
                                        <span className='font-title'>Type</span>
                                        <div className='prop-detail-row-content' style={{maxWidth:'100%', overflow:'auto'}}>
                                            <span className='font-code'>{itm.type}</span>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                (itm.typeAdition)&&(
                                    <div className='prop-detail-row'>
                                        <span className='font-title'></span>
                                        <div className='prop-detail-row-content' style={{maxWidth:'100%', overflow:'auto'}}>
                                            {
                                                (typeof itm.typeAdition === 'string')?(
                                                    <span className='font-text'>{itm.typeAdition}</span>
                                                ):(
                                                    <>{itm.typeAdition}</>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            {
                                (itm.default)&&(
                                    <div className='prop-detail-row'>
                                        <span className='font-title'>Default</span>
                                        <div className='prop-detail-row-content' style={{maxWidth:'100%', overflow:'auto'}}>
                                            <span className='font-code'>{itm.default}</span>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                (itm.desc)&&(
                                    <div className='prop-detail-row'>
                                        <span className='font-title'>Description</span>
                                        <div className='prop-detail-row-content' style={{maxWidth:'100%', overflow:'auto'}}>
                                            {
                                                (typeof itm.desc === 'string')?(
                                                    <span className='font-text'>{itm.desc}</span>
                                                ):(
                                                    <>{itm.desc}</>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        
                        
                    </div>
                ))
            }
        </>
    )
}

export default ComponentPropsDetailTemplate
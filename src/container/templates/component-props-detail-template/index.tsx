import Accordion from 'components/accordion'
import './styles.scss'
import AccordionItem from 'components/accordionItem'
import { useState } from 'react'
export type listCompPropsDetail = {
    id:string,
    propName:string
    isMandatory?:boolean,
    type?:string
    default?:string
    desc?:string | JSX.Element
    additionInfo?: string | JSX.Element
}
type props = {
    listProps:listCompPropsDetail[]
}
const ComponentPropsDetailTemplate = ({
    listProps
}:props) =>{

    const [isShowAddInfo, setIsShowAddInfo] = useState<string[]>([])

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
                                        <span style={{color:'hsl(var(--color-red-800))', marginLeft:"var(--size-6)"}}>Required</span>
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
                            {
                                (itm.additionInfo)&&(
                                    <div className='prop-detail-row-content' style={{maxWidth:'100%', overflow:'auto', marginTop:'var(--size-2)', padding:'2px'}}>
                                        <Accordion
                                            accordionOpen={isShowAddInfo}
                                            setAccordionOpen={setIsShowAddInfo}
                                        >
                                            <AccordionItem
                                                id='o'
                                                contentPage={
                                                    (typeof itm.additionInfo === 'string')?(
                                                        <span className='font-text'>{itm.additionInfo}</span>
                                                    ):(itm.additionInfo)
                                                }
                                                txtLabel='Addtional information'
                                            />
                                        </Accordion>
                                        
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
import { useContext, useEffect, useMemo } from "react";
import { LocalContext, LocalContextType } from "../../context/local-context";
import { accordionApiRefList, accordionItemApiRefList} from "../../data/api-ref-list";
import ComponentPropsDetailTemplate from "container/templates/component-props-detail-template";

const ApiRefPage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const accordionPropsList = useMemo(()=>{
        return(accordionApiRefList)
    },[])

    const accordionItemPropsList = useMemo(()=>{
        return(accordionItemApiRefList)
    },[])
    
    useEffect(()=>{
        setTabSelected('api')
    },[])

    return(
        <div className="content">
            <div className="component-section">
                <p className="font-title-large" >Accordion props</p>
                <div style={{paddingLeft:'var(--size-6)'}}>
                    <ComponentPropsDetailTemplate
                        listProps={accordionPropsList}
                    />
                </div>
            </div>
            <div className="component-section">
                <p className="font-title-large" style={{marginBottom:'var(--size-4)'}}>AccordionItem props</p>
                <div style={{paddingLeft:'var(--size-6)'}}>
                    <ComponentPropsDetailTemplate
                        listProps={accordionItemPropsList}
                    />
                </div>
            </div>
        </div>
    )
}
export default ApiRefPage
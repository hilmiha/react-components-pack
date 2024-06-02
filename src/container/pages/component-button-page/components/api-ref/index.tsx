import { useContext, useEffect, useMemo } from "react";
import { LocalContext, LocalContextType } from "../../context/local-context";
import { buttonApiRefList} from "../../data/api-ref-list";
import ComponentPropsDetailTemplate from "container/templates/component-props-detail-template";

const ApiRefPage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const buttonPropsList = useMemo(()=>{
        return(buttonApiRefList)
    },[])
    
    useEffect(()=>{
        setTabSelected('api')
    },[])

    return(
        <div className="content">
            <div className="component-section">
                <p className="font-title-large" >Button props</p>
                <div style={{paddingLeft:'var(--size-6)'}}>
                    <ComponentPropsDetailTemplate
                        listProps={buttonPropsList}
                    />
                </div>
            </div>
        </div>
    )
}
export default ApiRefPage
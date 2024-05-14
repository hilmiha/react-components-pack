import { useContext, useEffect } from "react";
import { LocalContext, LocalContextType } from "../context/local-context";
import PillFlair from "../../../../components/pill-flair";

const PropsPage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    useEffect(()=>{
        setTabSelected('props')
    },[])

    return(
        <div className="tab-content">
            <div style={{marginBottom:'var(--size-5)', maxWidth:'800px'}}>
                <p className="font-title-large">Main Props</p>
            </div>
        </div>
    )
}
export default PropsPage
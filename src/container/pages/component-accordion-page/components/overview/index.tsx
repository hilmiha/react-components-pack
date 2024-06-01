import { useContext, useEffect } from "react"
import { LocalContext, LocalContextType } from "../../context/local-context";
import PreviewSection from "./section/preview-section";
import MultipleExpanded from "./section/multiple-expanded";
import SublabelItemSection from "./section/sublabel-item-section";
import DisableItemSection from "./section/disabl-item-section";
import KeyboardInteractionSection from "./section/keyboard-interaction-section";


const OverviewPage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;


    useEffect(()=>{
        setTabSelected('overview')
    },[])
    
    return(
        <div className="content">
            <PreviewSection/>
            <MultipleExpanded/>
            <SublabelItemSection/>
            <DisableItemSection/>
            <KeyboardInteractionSection/>
        </div>
    )
}
export default OverviewPage
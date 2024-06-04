import { useContext, useEffect } from "react"
import { LocalContext, LocalContextType } from "../../context/local-context";
import PreviewSection from "./section/preview-section";
import KeyboardInteractionSection from "./section/keyboard-interaction-section";
import LabelSublabelSection from "./section/label-sublabel-section";
import StatesSection from "./section/states-section";


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
            <LabelSublabelSection/>
            <StatesSection/>
            <KeyboardInteractionSection/>
        </div>
    )
}
export default OverviewPage
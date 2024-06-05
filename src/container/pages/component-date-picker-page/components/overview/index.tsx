import { useContext, useEffect } from "react"
import { LocalContext, LocalContextType } from "../../context/local-context";
import PreviewSection from "./section/preview-section";
import KeyboardInteractionSection from "./section/keyboard-interaction-section";
import MultipleSelectionSection from "./section/multiple-selection-section";
import RangeSelectionSection from "./section/range-selection-section";
import SelcetableDisableSection from "./section/selectable-and-disabled";


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
            <MultipleSelectionSection/>
            <RangeSelectionSection/>
            <SelcetableDisableSection/>
            <KeyboardInteractionSection/>
        </div>
    )
}
export default OverviewPage
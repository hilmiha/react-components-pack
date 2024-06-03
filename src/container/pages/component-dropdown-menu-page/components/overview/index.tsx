import { useContext, useEffect } from "react"
import { LocalContext, LocalContextType } from "../../context/local-context";
import PreviewSection from "./section/preview-section";
import ApperanceVariationSection from "./section/apperance-variation-section";
import ButtonStatesSection from "./section/button-states-section";
import SpacingSection from "./section/spacing-section";
import KeyboardInteractionSection from "./section/keyboard-interaction-section";
import IconAsButtonSection from "./section/icon-as-label-section";
import AsSelectionSection from "./section/as-selection-section";


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
            <IconAsButtonSection/>
            <ApperanceVariationSection/>
            <ButtonStatesSection/>
            <SpacingSection/>
            <AsSelectionSection/>
            <KeyboardInteractionSection/>
        </div>
    )
}
export default OverviewPage
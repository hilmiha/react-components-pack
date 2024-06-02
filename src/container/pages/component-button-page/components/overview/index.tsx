import { useContext, useEffect } from "react"
import { LocalContext, LocalContextType } from "../../context/local-context";
import PreviewSection from "./section/preview-section";
import ApperanceVariationSection from "./section/apperance-variation-section";
import ButtonStatesSection from "./section/button-states-section";
import FullWidthSection from "./section/full-width-section";
import SpacingSection from "./section/spacing-section";
import ButtonWithIconSection from "./section/button-with-icon";
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
            <ApperanceVariationSection/>
            <ButtonStatesSection/>
            <FullWidthSection/>
            <SpacingSection/>
            <ButtonWithIconSection/>
            <KeyboardInteractionSection/>
        </div>
    )
}
export default OverviewPage
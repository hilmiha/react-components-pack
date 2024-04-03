import { useContext, useEffect } from "react"
import { PiStarFourFill } from "react-icons/pi"
import { LocalContext, LocalContextType } from "../context/local-context";
import IconButton from "../../../../components/icon-button";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <IconButton Icon={PiStarFourFill}/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Color Accent</span>
                <div className="preview-box">
                    <IconButton Icon={PiStarFourFill}/>
                    <IconButton Icon={PiStarFourFill} appearance="primary"/>
                    <IconButton Icon={PiStarFourFill} appearance="warning"/>
                    <IconButton Icon={PiStarFourFill} appearance="danger"/>
                    <IconButton Icon={PiStarFourFill} appearance="subtle"/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Selected</span>
                <div className="preview-box">
                    <IconButton Icon={PiStarFourFill} isSelected/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Spacing</span>
                <div className="preview-box">
                    <IconButton Icon={PiStarFourFill} spacing="default"/>
                    <IconButton Icon={PiStarFourFill} spacing="compact" />
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
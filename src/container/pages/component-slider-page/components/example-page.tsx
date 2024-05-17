import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import { GlobalContext, GlobalContextType } from "../../../../context/globalcontext";
import Slider, { valueSliderType } from "../../../../components/slider";
import { PiStarFour, PiStarFourFill } from "react-icons/pi";

const ExamplePage = () =>{
    const {
        isDarkmode,
        changeTheme
    } = useContext(GlobalContext) as GlobalContextType;

    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [sliderValue, setSliderValue] = useState<valueSliderType>(70)
    const [sliderValueRange, setSliderValueRange] = useState<valueSliderType>([30,70])
    const [sliderValueSt, setSliderValueSt] = useState<valueSliderType>(70)
    const [sliderValueStep, setSliderValueStep] = useState<valueSliderType>(70)



    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <Slider
                        value={sliderValue}
                        onChange={(newValue)=>{setSliderValue(newValue)}}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Vertical</span>
                <div className="preview-box">
                    <Slider
                        orientation="vertical"
                        value={sliderValue}
                        onChange={(newValue)=>{setSliderValue(newValue)}}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Range</span>
                <div className="preview-box">
                    <Slider
                        value={sliderValueRange}
                        onChange={(newValue)=>{setSliderValueRange(newValue)}}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Start & End Content</span>
                <div className="preview-box">
                    <Slider
                        startContent={
                            <PiStarFour size={24} color="white"/>
                        }
                        endContent={
                            <PiStarFourFill size={24} color="white"/>
                        }
                        value={sliderValueSt}
                        onChange={(newValue)=>{setSliderValueSt(newValue)}}
                    />
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Marker & Step</span>
                <div className="preview-box">
                    <Slider
                        value={sliderValueStep}
                        onChange={(newValue)=>{setSliderValueStep(newValue)}}
                        step={10}
                        markers={[
                            {
                                value:10,
                                txtLabel:'10'
                            },
                            {
                                value:30,
                                txtLabel:'30'
                            },
                            {
                                value:50,
                                txtLabel:'50'
                            },
                            {
                                value:70,
                                txtLabel:'70'
                            },
                            {
                                value:90,
                                txtLabel:'90'
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
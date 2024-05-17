import ReactSlider from "react-slider"
import './styles.scss'
import { processClassname } from "../../helper"
import { Key, useEffect, useMemo } from "react"

export type valueSliderType = number | [number, number]
type sliderMarkerType = {
    value:number,
    txtLabel:string
} 
type listSliderMaker = sliderMarkerType[]
type SliderProps = {
    className?:string
    orientation?: "vertical" | "horizontal"
    value: valueSliderType
    onChange?:(newValue:valueSliderType)=>void
    isFillContainer?:boolean
    startContent?: string | JSX.Element | JSX.Element[] | ((props?:Record<any,any>)=>JSX.Element)
    endContent?: string | JSX.Element | JSX.Element[] | ((props?:Record<any,any>)=>JSX.Element)
    minRange?: number
    maxRange?: number
    markers?:listSliderMaker
    step?:number
    isDisabled?:boolean
}

const SliderMarker = ({props, value, markers}:any) =>{
    let isSelected = useMemo(()=>{
        if(typeof props.key === 'number'){
            if(typeof value === 'number'){
                return(props.key <= value)
            }else{
                return(props.key >= value[0] && props.key<= value[1])
            }
        }
    },[value])

    let label = useMemo(()=>{
        return markers.find((itm:any)=>(itm.value===props.key)).txtLabel
    },[markers])

    return(
        <div {...props}>
            <div className="marker-container">
                <div className="marker"></div>
            </div>
            <div className="maker-label-container">
                <p className={`font-text${isSelected?(' selected'):('')}`}>{label}</p>
            </div>
            
        </div>
    )
}
const Slider = ({
    className,
    orientation = 'horizontal',
    value,
    onChange,
    isFillContainer,
    startContent,
    endContent,
    minRange = 0,
    maxRange = 100,
    markers,
    step = 0.1,
    isDisabled = false
}:SliderProps) =>{
    const isRange = useMemo(()=>{
        if(typeof value !== 'number'){
            return true
        }else{
            return false
        }
    },[])

    const sliderMarkerValues = useMemo(()=>{
        if(markers){
            return markers.map((itm)=>{return itm.value})
        }else{
            return false
        }
    },[markers])

    const thisOnChange = (newValue:number | [number, number]) => {
        if(onChange){
            onChange(newValue)
        }
    }
    return(
        <div
            className={
                processClassname(`slider
                ${className?(className):('')}
                ${orientation?(orientation):('')}
                ${isFillContainer?('fill-container'):('')}
                ${isDisabled?('disabled'):('')}
                ${isRange?('range'):('')}
                `)  
            }
            style={{
                gridTemplateColumns:(orientation==='horizontal')?(`${startContent?('max-content'):('')} 1fr ${endContent?('max-content'):('')}`):('unset'),
                gridTemplateRows:(orientation==='vertical')?(`${startContent?('max-content'):('')} 1fr ${endContent?('max-content'):('')}`):('unset')
            }}
        >   
            {
                (startContent)&&(
                    <div className="min-label-container">
                        {
                            (typeof startContent === 'function')?(
                                startContent()
                            ):(typeof startContent === 'string')?(
                                <span className="font-text">{startContent}</span>
                            ):(
                                startContent
                            )
                        }
                    </div>
                )
            }
            <ReactSlider
                disabled={isDisabled}
                value={value}
                onChange={(newValue)=>{thisOnChange(newValue)}}
                className={`slider-input`}
                thumbClassName="slider-thumb"
                trackClassName="slider-track"
                renderThumb={(props, state) => <div {...props}><div className="slider-thumb-inner"></div></div>}
                orientation={orientation}
                invert={orientation==='vertical'}
                step={step}
                marks={sliderMarkerValues}
                min={minRange}
                max={maxRange}
                markClassName="slider-mark"
                renderMark={(props) => <SliderMarker key={props.key} props={{...props}} value={value} markers={markers}/>}
            />
            {
                (endContent)&&(
                    <div className="max-label-container">
                        {
                            (typeof endContent === 'function')?(
                                endContent()
                            ):(typeof endContent === 'string')?(
                                <span className="font-text">{endContent}</span>
                            ):(
                                endContent
                            )
                        }
                    </div>
                )
            }
        </div>
        
        
    )
}

export default Slider
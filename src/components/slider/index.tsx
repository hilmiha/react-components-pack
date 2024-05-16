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
    minLabel?:string
    maxLabel?:string
    minRange?: number
    maxRange?: number
    markers?:listSliderMaker
    step?:number
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
    minLabel,
    maxLabel,
    minRange = 0,
    maxRange = 100,
    markers,
    step = 0.1
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
                ${isRange?('range'):('')}
                `)  
            }
            style={{
                gridTemplateColumns:(orientation==='horizontal')?(`${minLabel?('max-content'):('')} 1fr ${maxLabel?('max-content'):('')}`):('unset'),
                gridTemplateRows:(orientation==='vertical')?(`${minLabel?('max-content'):('')} 1fr ${maxLabel?('max-content'):('')}`):('unset')
            }}
        >   
            {
                (minLabel)&&(
                    <div className="min-label-container"><span className="font-text">{minLabel}</span></div>
                )
            }
            <ReactSlider
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
                (maxLabel)&&(
                    <div className="max-label-container"><span className="font-text">{maxLabel}</span></div>
                )
            }
        </div>
        
        
    )
}

export default Slider
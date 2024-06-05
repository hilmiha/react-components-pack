import DatePicker, { datePickerValueType } from "components/date-picker"
import PreviewNCode from "components/preview-n-code"
import { useState } from "react"
import { codePreviewRangeSelect } from "../../../data/code-list"

const RangeSelectionSection = () =>{
    const [selected, setSelected] = useState<datePickerValueType>(undefined)

    return(
        <div className="component-section">
            <span className="font-title-large">Range date selection</span>
            <p className="font-text">Date picker component supports selecting a date range when the <span className="font-code">type</span> prop is set to <span className="font-code">true</span>. This allows users to pick a start date and an end date.</p>
            <PreviewNCode
                code={codePreviewRangeSelect}
                language="tsx"
            >
                <DatePicker
                    type="range"
                    value={selected}
                    onchange={(newValue:datePickerValueType)=>{setSelected(newValue)}}
                />
            </PreviewNCode>
        </div>
    )
}

export default RangeSelectionSection
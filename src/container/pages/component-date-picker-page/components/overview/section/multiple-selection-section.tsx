import DatePicker, { datePickerValueType } from "components/date-picker"
import PreviewNCode from "components/preview-n-code"
import { useState } from "react"
import { codePreviewMultipleSelect } from "../../../data/code-list"


const MultipleSelectionSection = () =>{
    const [selected, setSelected] = useState<datePickerValueType>(undefined)

    return(
        <div className="component-section">
            <span className="font-title-large">Multiple date selection</span>
            <p className="font-text">Date picker component supports selecting multiple dates when the <span className="font-code">type</span> prop is set to <span className="font-code">true</span>. This allows users to pick multiple dates within a single date picker interface, which is particularly useful for applications that require selecting non-consecutive days.</p>
            <PreviewNCode
                code={codePreviewMultipleSelect}
                language="tsx"
            >
                <DatePicker
                    type="multiple"
                    value={selected}
                    onchange={(newValue:datePickerValueType)=>{setSelected(newValue)}}
                />
            </PreviewNCode>
        </div>
    )
}

export default MultipleSelectionSection
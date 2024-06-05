import { codePreview } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import { useState } from "react"
import DatePicker, { datePickerValueType } from "components/date-picker"

const PreviewSection = () =>{

    const [selected, setSelected] = useState<datePickerValueType>(undefined)

    return(
        <div className="component-section">
            <PreviewNCode
                code={codePreview}
                language="tsx"
            >
                <DatePicker
                    type="single"
                    value={selected}
                    onchange={(newValue:datePickerValueType)=>{setSelected(newValue)}}
                />
            </PreviewNCode>
        </div>
    )
}

export default PreviewSection
import DatePicker, { datePickerValueType } from "components/date-picker"
import PreviewNCode from "components/preview-n-code"
import { useState } from "react"
import { codePreviewSelectabelDisable } from "../../../data/code-list"
import { addDays, addMonths, subMonths } from "date-fns"

const SelcetableDisableSection = () =>{
    const [selected, setSelected] = useState<datePickerValueType>(undefined)

    return(
        <div className="component-section">
            <span className="font-title-large">Selectable date limits and disabled dates</span>
            <p className="font-text">Date picker component allows you to restrict the selectable date range (using <span className="font-code">fromDate</span> and <span className="font-code">toDate</span> prop) and disable specific dates (using <span className="font-code">disabledDate</span> prop). This ensures users can only pick dates within a specified period and avoids invalid date selections.</p>
            <PreviewNCode
                code={codePreviewSelectabelDisable}
                language="tsx"
            >
                <DatePicker
                    type="single"
                    value={selected}
                    onchange={(newValue:datePickerValueType)=>{setSelected(newValue)}}
                    fromDate={subMonths(new Date(), 1)}
                    toDate={addMonths(new Date(), 1)}
                    disabledDate={[{dayOfWeek:[0,6]}]}
                />
            </PreviewNCode>
        </div>
    )
}

export default SelcetableDisableSection
export const codePreview = `import DatePicker, { datePickerValueType } from "compon
import { useState } from "react"

const Example = () =>{

	const [selected, setSelected] = useState<datePickerValueType>(undefined)

	return(
		<DatePicker
			type="single"
			value={selected}
			onchange={(newValue:datePickerValueType)=>{setSelected(newValue)}}
		/>
	)
}
`

export const codePreviewMultipleSelect =`import DatePicker, { datePickerValueType } from "compon
import { useState } from "react"

const Example = () =>{

	const [selected, setSelected] = useState<datePickerValueType>(undefined)

	return(
		<DatePicker
			type="multiple" // use type "multiple" for allow multiple selected date
			value={selected}
			onchange={(newValue:datePickerValueType)=>{setSelected(newValue)}}
		/>
	)
}
`

export const codePreviewRangeSelect =`import DatePicker, { datePickerValueType } from "compon
import { useState } from "react"

const Example = () =>{

	const [selected, setSelected] = useState<datePickerValueType>(undefined)

	return(
		<DatePicker
			type="range" // use type "range" for allow select date range
			value={selected}
			onchange={(newValue:datePickerValueType)=>{setSelected(newValue)}}
		/>
	)
}
`

export const codePreviewSelectabelDisable = `import DatePicker, { datePickerValueType } from "compon
import { useState } from "react"

const Example = () =>{

	const [selected, setSelected] = useState<datePickerValueType>(undefined)

	return(
		<DatePicker
			type="single"
			value={selected}
			onchange={(newValue:datePickerValueType)=>{setSelected(newValue)}}
			fromDate={subMonths(new Date(), 1)}
			toDate={addMonths(new Date(), 1)}
			disabledDate={[{dayOfWeek:[0,6]}]}
		/>
	)
}	
`



export const codePreviewLabelSublabel = `import Checkbox from "components/checkbox"
import { useState } from "react"

const Example = () =>{

	const [isSelected, setIsSelected] = useState(false)

	return(
		<Checkbox
			isSelected={isSelected}
			onClick={()=>{setIsSelected(!isSelected)}}
			txtLabel="Checkbox label Text"
			txtSubLabel="Sublabel text"
		/>
	)
}`

export const codePreviewIsIndeterminateCheckbox = `import Checkbox from "components/checkbox"

const Example = () =>{

	const [isSelected, setIsSelected] = useState(true)

	return(
		<Checkbox
			isSelected={isSelected}
			onClick={()=>{setIsSelected(!isSelected)}}
			txtLabel="Checkbox label Text"
			isIndeterminate={true}
		/>
	)
}`

export const codePreviewIsDisabledCheckbox = `import Checkbox from "components/checkbox"

const Example = () =>{

	return(
		<Checkbox
			txtLabel="Checkbox label"
			isDisabled={true}
		/>
	)
}`
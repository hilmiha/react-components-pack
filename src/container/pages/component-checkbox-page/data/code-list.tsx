export const codePreview = `import Checkbox from "components/checkbox"
import { useState } from "react"

const Example = () =>{

	const [isSelected, setIsSelected] = useState(false)

	return(
		<Checkbox
			isSelected={isSelected}
			onClick={()=>{setIsSelected(!isSelected)}}
		/>
	)
}`

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
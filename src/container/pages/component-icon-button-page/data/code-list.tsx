export const codePreview = `import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<IconButton
			Icon={<PiStarFourFill/>}
		/>
	)
}`

export const codePreviewDefaultButtonIcon = `import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<IconButton
			Icon={<PiStarFourFill/>}
			appearance="default"
		/>
	)
}`

export const codePreviewPrimaryButtonIcon = `import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<IconButton
			Icon={<PiStarFourFill/>}
			appearance="primary"
		/>
	)
}`

export const codePreviewWarningButtonIcon = `import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<IconButton
			Icon={<PiStarFourFill/>}
			appearance="warning"
		/>
	)
}`

export const codePreviewDangerButtonIcon = `import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<IconButton
			Icon={<PiStarFourFill/>}
			appearance="danger"
		/>
	)
}`

export const codePreviewSubtleButtonIcon = `import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<IconButton
			Icon={<PiStarFourFill/>}
			appearance="subtle"
		/>
	)
}`

export const codePreviewIsSelectedButton = `import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<IconButton
			Icon={<PiStarFourFill/>}
			isSelected={true}
		/>
	)
}`

export const codePreviewIsLoadingButton = `import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<IconButton
			Icon={<PiStarFourFill/>}
			isLoading={true}
		/>
	)
}`

export const codePreviewIsDisabledButton = `import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<IconButton
			Icon={<PiStarFourFill/>}
			isDisabled={true}
		/>
	)
}`

export const codePreviewIsFullWidthdButton = `import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<IconButton
			Icon={<PiStarFourFill/>}
			isFullWidth={true}
		/>
	)
}`

export const codePreviewIsSpacingButton = `import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<div
			style={{
				display:'flex',
				justifyContent:'center',
				alignItems:'center',
				flexWrap:'wrap',
				gap:'12px'
			}}
		>
			<IconButton
				txtLabel="Default"
				spacing="default" //set button padding to be default
			/>
			<IconButton
				txtLabel="Compact"
				spacing="compact" //set button padding to be compact
			/>
			<IconButton
				txtLabel="None"
				spacing="none" //set button padding to be none
			/>
		</div>
	)
}`
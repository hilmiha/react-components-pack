export const codePreview = `import Button from "components/button"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
		/>
	)
}`

export const codePreviewDefaultButton = `import Button from "components/button"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			appearance="default"
		/>
	)
}`

export const codePreviewPrimaryButton = `import Button from "components/button"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			appearance="primary"
		/>
	)
}`

export const codePreviewWarningButton = `import Button from "components/button"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			appearance="warning"
		/>
	)
}`

export const codePreviewDangerButton = `import Button from "components/button"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			appearance="danger"
		/>
	)
}`

export const codePreviewSubtleButton = `import Button from "components/button"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			appearance="subtle"
		/>
	)
}`

export const codePreviewLinkButton = `import Button from "components/button"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			appearance="link"
		/>
	)
}`

export const codePreviewSubtleLinkButton = `import Button from "components/button"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			appearance="subtle-link"
		/>
	)
}`

export const codePreviewIsSelectedButton = `import Button from "components/button"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			isSelected={true}
		/>
	)
}`

export const codePreviewIsLoadingButton = `import Button from "components/button"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			isLoading={true}
		/>
	)
}`

export const codePreviewIsDisabledButton = `import Button from "components/button"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			isDisabled={true}
		/>
	)
}`

export const codePreviewIsFullWidthdButton = `import Button from "components/button"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			isFullWidth={true}
		/>
	)
}`

export const codePreviewIsSpacingButton = `import Button from "components/button"

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
			<Button
				txtLabel="Default"
				spacing="default" //set button padding to be default
			/>
			<Button
				txtLabel="Compact"
				spacing="compact" //set button padding to be compact
			/>
			<Button
				txtLabel="None"
				spacing="none" //set button padding to be none
			/>
		</div>
	)
}`

export const codePreviewButtonWithIconAfter = `import Button from "components/button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			IconAfter={<PiStarFourFill/>}
		/>
	)
}`

export const codePreviewButtonWithIconBefore = `import Button from "components/button"
import { PiStarFourFill } from "react-icons/pi"

const Example = () =>{

	return(
		<Button
			txtLabel="Button"
			IconBefore={<PiStarFourFill/>}
		/>
	)
}`
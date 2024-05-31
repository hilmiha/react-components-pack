export const codePreview = `const Example = () =>{

	const [opened, setOpened] = useState<string[]>([])

	return(
		<Accordion
			accordionOpen={opened}
			setAccordionOpen={setOpened}
		>
			<AccordionItem
				id='accord-one'
				txtLabel='Accordion One Label'
				contentPage={
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
				}
			/>
			<AccordionItem
				id='accord-two'
				txtLabel='Accordion Two Lable'
				contentPage={
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
				}
			/>
			<AccordionItem
				id='accord-three'
				txtLabel='Accordion Three Label'
				contentPage={
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
				}
			/>
		</Accordion>
	)
}`

export const codeMultiExtendedPreview = `const Example = () =>{

	const [opened, setOpened] = useState<string[]>([])

	return(
		<Accordion
			accordionOpen={opened}
			setAccordionOpen={setOpened}
			isAllowMultipleOpen={true} //use isAllowMultipleOpen prop to allow multiple panel expande
		>
			<AccordionItem
				id='accord-one'
				txtLabel='Accordion One Label'
				contentPage={
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
				}
			/>
			<AccordionItem
				id='accord-two'
				txtLabel='Accordion Two Lable'
				contentPage={
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
				}
			/>
			<AccordionItem
				id='accord-three'
				txtLabel='Accordion Three Label'
				contentPage={
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
				}
			/>
		</Accordion>
	)
}`

export const codeSublabelPreview = `const Example = () =>{

	const [opened, setOpened] = useState<string[]>([])

	return(
		<Accordion
			accordionOpen={opened}
			setAccordionOpen={setOpened}
		>
			<AccordionItem
				id='accord-one'
				txtLabel='Accordion One Label'
				txtSublabel="Accordion one sublabel" // use txtSublabel prop to ass sublabel to accordion item.
				contentPage={
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
				}
			/>
		</Accordion>
	)
}`

export const codeDisabledPreview = `const Example = () =>{

	const [opened, setOpened] = useState<string[]>([])

	return(
		<Accordion
			accordionOpen={opened}
			setAccordionOpen={setOpened}
		>
			<AccordionItem
				id='accord-one'
				txtLabel='Accordion One Label'
				contentPage={
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
				}
			/>
			<AccordionItem
				id='accord-two'
				txtLabel='Accordion Two Lable'
				contentPage={
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
				}
			/>
			<AccordionItem
				id='accord-three'
				txtLabel='Accordion Three Label Disabled'
				isDisabled={true} // use isDisabled prop to disabled accordion item.
				contentPage={
					<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit...</p>
				}
			/>
		</Accordion>
	)
}`
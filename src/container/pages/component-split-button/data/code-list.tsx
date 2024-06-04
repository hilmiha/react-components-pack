export const codePreview = `import SplitButton from "components/split-button"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	onst listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Action One"
		},
		{
			id:"itm-2",
			txtLabel:"Action Two"
		},
		{
			id:"itm-3",
			txtLabel:"Action Three"
		}
	]

	return(
		<SplitButton
			txtLabel="Main Action"
			menuList={listMenu}
		/>
	)
}`

export const codePreviewDefaultButton = `import SplitButton from "components/split-button"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	onst listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Action One"
		},
		{
			id:"itm-2",
			txtLabel:"Action Two"
		},
		{
			id:"itm-3",
			txtLabel:"Action Three"
		}
	]

	return(
		<SplitButton
			txtLabel="Main Action"
			appearance="default" // set button apperance to default
			menuList={listMenu}
		/>
	)
}`

export const codePreviewPrimaryButton = `import SplitButton from "components/split-button"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	onst listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Action One"
		},
		{
			id:"itm-2",
			txtLabel:"Action Two"
		},
		{
			id:"itm-3",
			txtLabel:"Action Three"
		}
	]

	return(
		<SplitButton
			txtLabel="Main Action"
			appearance="primary" // set button apperance to primary
			menuList={listMenu}
		/>
	)
}`

export const codePreviewWarningButton = `import SplitButton from "components/split-button"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	onst listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Action One"
		},
		{
			id:"itm-2",
			txtLabel:"Action Two"
		},
		{
			id:"itm-3",
			txtLabel:"Action Three"
		}
	]

	return(
		<SplitButton
			txtLabel="Main Action"
			appearance="warning" // set button apperance to warning
			menuList={listMenu}
		/>
	)
}`

export const codePreviewDangerButton = `import SplitButton from "components/split-button"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	onst listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Action One"
		},
		{
			id:"itm-2",
			txtLabel:"Action Two"
		},
		{
			id:"itm-3",
			txtLabel:"Action Three"
		}
	]

	return(
		<SplitButton
			txtLabel="Main Action"
			appearance="danger" // set button apperance to danger
			menuList={listMenu}
		/>
	)
}`

export const codePreviewSubtleButton = `import SplitButton from "components/split-button"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	onst listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Action One"
		},
		{
			id:"itm-2",
			txtLabel:"Action Two"
		},
		{
			id:"itm-3",
			txtLabel:"Action Three"
		}
	]

	return(
		<SplitButton
			txtLabel="Main Action"
			appearance="subtle" // set button apperance to subtle
			menuList={listMenu}
		/>
	)
}`

export const codePreviewIsLoadingButton = `import SplitButton from "components/split-button"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	onst listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Action One"
		},
		{
			id:"itm-2",
			txtLabel:"Action Two"
		},
		{
			id:"itm-3",
			txtLabel:"Action Three"
		}
	]

	return(
		<SplitButton
			txtLabel="Main Action"
			menuList={listMenu}
			isLoading={true}
		/>
	)
}`

export const codePreviewIsDisabledButton = `import SplitButton from "components/split-button"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	onst listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Action One"
		},
		{
			id:"itm-2",
			txtLabel:"Action Two"
		},
		{
			id:"itm-3",
			txtLabel:"Action Three"
		}
	]

	return(
		<SplitButton
			txtLabel="Main Action"
			menuList={listMenu}
			isDisabled={true}
		/>
	)
}`

export const codePreviewIsSpacingButton = `import SplitButton from "components/split-button"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{
	
	onst listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Action One"
		},
		{
			id:"itm-2",
			txtLabel:"Action Two"
		},
		{
			id:"itm-3",
			txtLabel:"Action Three"
		}
	]

	return(
		<div
			style={{
				display:"flex",
				justifyContent:"center",
				alignItems:"center",
				flexWrap:"wrap",
				gap:"12px"
			}}
		>
			<SplitButton
				txtLabel="Main Action"
				menuList={listMenu}
				spacing="default" //set button padding to be default
			/>
			<SplitButton
				txtLabel="Main Action"
				menuList={listMenu}
				spacing="compact" //set button padding to be compact
			/>
		</div>
	)
}`

export const menuListItemTypeExample = `type menuListItemType = {
    id:string, 
    txtLabel:string, 
    txtSublabel?:string
    isDisabled?:boolean
    IconBefore?:JSX.Element
    value?:string | number | boolean
};

const menuListItemExample:menuListItemType[] = [
    {
        id: "item1",
        txtLabel: "Label Item 1",
        txtSublabel: "Sublabel Item 1",
        isDisabled: false,
        IconBefore: <SomeIconComponent/>,
        value: "value1"
    },
    {
        id: "item2",
        txtLabel: "Label Item 2",
        isDisabled: false,
        value: 42
    },
    {
        id: "item3",
        txtLabel: "Label Item 3",
        value: true
    }
]
`

export const menuListTypeExample = `type menuListType = {
    id: string;
    title?: string;
    menu: menuListItemType[];
}[];

const menuListExample:menuListType = [
    {
        id: "group1",
        title: "Group 1",
        menu:[
            {
                id: "item1",
                txtLabel: "Label Item 1",
                txtSublabel: "Sublabel Item 1",
                isDisabled: false,
                IconBefore: <SomeIconComponent/>,
                value: "value1"
            },
            {
                id: "item2",
                txtLabel: "Label Item 2",
                isDisabled: false,
                value: 42
            }
        ]
    },
    {
        id: "group2",
        title: "Group 2",
        menu:[
            {
                id: "item3",
                txtLabel: "Label Item 3",
                value: true
            }
        ]
    }
]
`
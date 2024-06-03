export const codePreview = `import DropdownMenu from "components/dropdown-menu"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	const listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Menu One"
		},
		{
			id:"itm-2",
			txtLabel:"Menu Two"
		},
		{
			id:"itm-3",
			txtLabel:"Menu Three"
		}
	]

	return(
		<DropdownMenu
			TxtLabelOrIcon="Open Menu"
			menuList={listMenu}
		/>
	)
}`

export const codePreviewIconAsLabel = `import DropdownMenu from "components/dropdown-menu"
import { PiStarFourFill } from "react-icons/pi"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	const listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Menu One"
		},
		{
			id:"itm-2",
			txtLabel:"Menu Two"
		},
		{
			id:"itm-3",
			txtLabel:"Menu Three"
		}
	]

	return(
		<DropdownMenu
			TxtLabelOrIcon={<PiStarFourFill/>}
			menuList={listMenu}
		/>
	)
}`

export const codePreviewDefaultButton = `import DropdownMenu from "components/dropdown-menu"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	const listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Menu One"
		},
		{
			id:"itm-2",
			txtLabel:"Menu Two"
		},
		{
			id:"itm-3",
			txtLabel:"Menu Three"
		}
	]

	return(
		<DropdownMenu
			TxtLabelOrIcon="Open Menu"
			appearance="default" // set button apperance to default
			menuList={listMenu}
		/>
	)
}`

export const codePreviewPrimaryButton = `import DropdownMenu from "components/dropdown-menu"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	const listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Menu One"
		},
		{
			id:"itm-2",
			txtLabel:"Menu Two"
		},
		{
			id:"itm-3",
			txtLabel:"Menu Three"
		}
	]

	return(
		<DropdownMenu
			TxtLabelOrIcon="Open Menu"
			appearance="primary" // set button apperance to primary
			menuList={listMenu}
		/>
	)
}`

export const codePreviewWarningButton = `import DropdownMenu from "components/dropdown-menu"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	const listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Menu One"
		},
		{
			id:"itm-2",
			txtLabel:"Menu Two"
		},
		{
			id:"itm-3",
			txtLabel:"Menu Three"
		}
	]

	return(
		<DropdownMenu
			TxtLabelOrIcon="Open Menu"
			appearance="warning" // set button apperance to warning
			menuList={listMenu}
		/>
	)
}`

export const codePreviewDangerButton = `import DropdownMenu from "components/dropdown-menu"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	const listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Menu One"
		},
		{
			id:"itm-2",
			txtLabel:"Menu Two"
		},
		{
			id:"itm-3",
			txtLabel:"Menu Three"
		}
	]

	return(
		<DropdownMenu
			TxtLabelOrIcon="Open Menu"
			appearance="danger" // set button apperance to danger
			menuList={listMenu}
		/>
	)
}`

export const codePreviewSubtleButton = `import DropdownMenu from "components/dropdown-menu"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	const listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Menu One"
		},
		{
			id:"itm-2",
			txtLabel:"Menu Two"
		},
		{
			id:"itm-3",
			txtLabel:"Menu Three"
		}
	]

	return(
		<DropdownMenu
			TxtLabelOrIcon="Open Menu"
			appearance="subtle" // set button apperance to subtle
			menuList={listMenu}
		/>
	)
}`

export const codePreviewIsSelectedButton = `import DropdownMenu from "components/dropdown-menu"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	const listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Menu One"
		},
		{
			id:"itm-2",
			txtLabel:"Menu Two"
		},
		{
			id:"itm-3",
			txtLabel:"Menu Three"
		}
	]

	return(
		<DropdownMenu
			TxtLabelOrIcon="Open Menu"
			menuList={listMenu}
			isSelected={true}
		/>
	)
}`

export const codePreviewIsDisabledButton = `import DropdownMenu from "components/dropdown-menu"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	const listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Menu One"
		},
		{
			id:"itm-2",
			txtLabel:"Menu Two"
		},
		{
			id:"itm-3",
			txtLabel:"Menu Three"
		}
	]

	return(
		<DropdownMenu
			TxtLabelOrIcon="Open Menu"
			menuList={listMenu}
			isDisabled={true}
		/>
	)
}`

export const codePreviewIsSpacingButton = `import DropdownMenu from "components/dropdown-menu"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{
	
	const listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Menu One"
		},
		{
			id:"itm-2",
			txtLabel:"Menu Two"
		},
		{
			id:"itm-3",
			txtLabel:"Menu Three"
		}
	]

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
			<DropdownMenu
				TxtLabelOrIcon="Open Menu"
				menuList={listMenu}
				spacing="default" //set button padding to be default
			/>
			<DropdownMenu
				TxtLabelOrIcon="Open Menu"
				menuList={listMenu}
				spacing="compact" //set button padding to be compact
			/>
			/>
		</div>
	)
}`

export const codePreviewAsSelection = `import DropdownMenu from "components/dropdown-menu"
import { menuListItemType } from "components/dropdown-menu";

const Example = () =>{

	const listMenu: menuListItemType[] = [
		{
			id:"itm-1",
			txtLabel:"Menu One"
		},
		{
			id:"itm-2",
			txtLabel:"Menu Two"
		},
		{
			id:"itm-3",
			txtLabel:"Menu Three"
		}
	]

	const [menuSelected, setMenuSelected] = useState<string[]>([])

    const onMenuSelected = (buttonId:string) =>{
        setMenuSelected((prev)=>{
            if(prev.includes(buttonId)){
                return(prev.filter((itm)=>itm!==buttonId))
            }else{
                return([...prev, buttonId])
            }
        })
    }

	return(
		<DropdownMenu
			TxtLabelOrIcon="Open Menu"
			menuList={listMenu}
			menuListSelected={menuSelected}
			isWithCheckbox={true}
			onClickItem={(buttonId)=>{onMenuSelected(buttonId)}}
		/>
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
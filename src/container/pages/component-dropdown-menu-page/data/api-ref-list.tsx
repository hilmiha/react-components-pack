import { listCompPropsDetail } from "container/templates/component-props-detail-template"
import ManuListPropInfo from "../components/api-ref/additional-info/menuList-prop-info"

export const apiRefList:listCompPropsDetail[] = [
    {
        id:'1',
        propName:'TxtLabelOrIcon',
        isMandatory:true,
        type:`string | JSX.Element`,
        default:'-',
        desc:<p className="font-text">The text or Icon component displayed on the dropdown button.</p>
    },
    {
        id:'2',
        propName:'menuList',
        isMandatory:true,
        type:`menuListType | menuListItemType[]`,
        default:'[]',
        desc:<p className="font-text">List of menu items to display in the dropdown menu.</p>,
        additionInfo:<ManuListPropInfo/>,
    },
    {
        id:'3',
        propName:'appearance',
        isMandatory:false,
        type:`"default" | "primary" | "warning" | "danger" | "subtle" `,
        default:'"default"',
        desc:<p className="font-text">Determines the visual style of the dropdown button of <span className="font-code">{`<DropdownMenu/>`}</span> component.</p>
    },
    {
        id:'4',
        propName:'isSelected',
        isMandatory:false,
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, the dropdown button will indicates it is selected or active.</p>
    },
    {
        id:'5',
        propName:'isDisabled',
        isMandatory:false,
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, the dropdown button will be inactive and cannot be clicked.</p>
    },
    {
        id:'6',
        propName:'spacing',
        isMandatory:false,
        type:`"default" | "compact"`,
        default:'"default"',
        desc:<p className="font-text">Adjusts the padding of the <span className="font-code">{`<DropdownMenu/>`}</span> component.</p>
    },
    {
        id:'8',
        propName:'altTxtLabel',
        isMandatory:false,
        type:`string`,
        default:'-',
        desc:<p className="font-text">Overrides the default "Options" label in the header when the dropdown menu is displayed as a drawer on mobile view.</p>,
    },
    {
        id:'9',
        propName:'isOnScrollClose',
        isMandatory:false,
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, closes the dropdown menu when the screen is scrolled.</p>,
    },
    {
        id:'10',
        propName:'isCloseAfterSelect',
        isMandatory:false,
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, closes the dropdown menu when a menu item is clicked.</p>,
    },
    {
        id:'11',
        propName:'isWithCheckbox',
        isMandatory:false,
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, adds a checkbox to each menu item.</p>,
    },
    {
        id:'12',
        propName:'menuListSelected',
        isMandatory:false,
        type:`string[]`,
        default:'-',
        desc:<p className="font-text">An array of menu item IDs that will have a selected appearance. Items will also be checked if <span className="font-code">isWithCheckbox</span> is set to <span className="font-code">true</span>.</p>,
    },
    {
        id:'7',
        propName:'onClickItem',
        isMandatory:false,
        type:`(buttonId:string, value?:string | number | boolean) => void`,
        default:'-',
        desc:<p className="font-text">Callback function triggered when the dropdown menu item is clicked.</p>,
    },
]
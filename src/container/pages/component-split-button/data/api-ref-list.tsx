import { listCompPropsDetail } from "container/templates/component-props-detail-template"
import ManuListPropInfo from "../components/api-ref/additional-info/menuList-prop-info"

export const apiRefList:listCompPropsDetail[] = [
    {
        id:'1',
        propName:'txtLabel',
        isMandatory:true,
        type:`string`,
        default:'-',
        desc:<p className="font-text">The text displayed on the main action button of <span className="font-code">{`<SplitButton/>`}</span> component.</p>
    },
    {
        id:'2',
        propName:'menuList',
        isMandatory:true,
        type:`menuListType | menuListItemType[]`,
        default:'[]',
        desc:<p className="font-text">List of menu items to display in the dropdown menu. Type is imported from <span className="font-code">"components/dropdown-menu"</span></p>,
        additionInfo:<ManuListPropInfo/>,
    },
    {
        id:'3',
        propName:'appearance',
        isMandatory:false,
        type:`"default" | "primary" | "warning" | "danger" | "subtle" `,
        default:'"default"',
        desc:<p className="font-text">Determines the visual style of the <span className="font-code">{`<SplitButton/>`}</span> component.</p>
    },
    {
        id:'4',
        propName:'isLoading',
        isMandatory:false,
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, the main action button of <span className="font-code">{`<SplitButton/>`}</span> component will show a spinner on to indicate a background process and dropdown button will be inactive and cannot be clicked.</p>
    },
    {
        id:'5',
        propName:'isDisabled',
        isMandatory:false,
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, the <span className="font-code">{`<SplitButton/>`}</span> component will be inactive and cannot be clicked.</p>
    },
    {
        id:'6',
        propName:'spacing',
        isMandatory:false,
        type:`"default" | "compact"`,
        default:'"default"',
        desc:<p className="font-text">Adjusts the padding of the <span className="font-code">{`<SplitButton/>`}</span> component.</p>
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
        id:'7',
        propName:'onClick',
        isMandatory:false,
        type:`() => void`,
        default:'-',
        desc:<p className="font-text">Callback function triggered when the main action button is clicked.</p>,
    },
    {
        id:'7',
        propName:'onClickItem',
        isMandatory:false,
        type:`(buttonId:string, value?:string | number | boolean) => void`,
        default:'-',
        desc:<p className="font-text">Callback function triggered when the dropdown menu item is clicked. Receives the <span className="font-code">buttonId</span> and an optional <span className="font-code">value</span> of the clicked menu item.</p>,
    },
]
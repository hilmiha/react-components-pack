import { listCompPropsDetail } from "container/templates/component-props-detail-template"

export const apiRefList:listCompPropsDetail[] = [
    {
        id:'1',
        propName:'Icon',
        isMandatory:true,
        type:`JSX.Element`,
        default:'-',
        desc:<p className="font-text">The icon displayed on the <span className="font-code">{`<IconButton/>`}</span> component. Icon components are imported from the <a className="font-link" href="https://react-icons.github.io/react-icons/" target="_blank" rel="noopener noreferrer">react-icons</a> library.</p>
    },
    {
        id:'2',
        propName:'appearance',
        isMandatory:false,
        type:`"default" | "primary" | "warning" | "danger" | "subtle"`,
        default:'"default"',
        desc:<p className="font-text">Determines the visual style of the <span className="font-code">{`<IconButton/>`}</span> component.</p>
    },
    {
        id:'3',
        propName:'isSelected',
        isMandatory:false,
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, the <span className="font-code">{`<IconButton/>`}</span> component will indicates it is selected or active.</p>
    },
    {
        id:'4',
        propName:'isLoading',
        isMandatory:false,
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, the <span className="font-code">{`<IconButton/>`}</span> component will show a spinner on to indicate a background process.</p>
    },
    {
        id:'5',
        propName:'isDisabled',
        isMandatory:false,
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, the <span className="font-code">{`<IconButton/>`}</span> component will be inactive and cannot be clicked.</p>
    },
    {
        id:'6',
        propName:'spacing',
        isMandatory:false,
        type:`"default" | "compact" | "none"`,
        default:'"default"',
        desc:<p className="font-text">Adjusts the padding of the <span className="font-code">{`<IconButton/>`}</span> component.</p>
    },
    {
        id:'7',
        propName:'onClick',
        isMandatory:false,
        type:`() => void`,
        default:'-',
        desc:<p className="font-text">Callback function triggered when the <span className="font-code">{`<IconButton/>`}</span> component is clicked.</p>
    }
]
import CodeBlock from "components/code-block"
import { listCompPropsDetail } from "container/templates/component-props-detail-template"

export const buttonApiRefList:listCompPropsDetail[] = [
    {
        id:'3',
        propName:'isSelected',
        isMandatory:true,
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, the <span className="font-code">{`<Checkbox/>`}</span> component will indicates it is selected.</p>
    },
    {
        id:'1',
        propName:'txtLabel',
        isMandatory:false,
        type:`string`,
        default:'-',
        desc:<p className="font-text">The text displayed next after the <span className="font-code">{`<Checkbox/>`}</span> component.</p>
    },
    {
        id:'1',
        propName:'txtSubLabel',
        isMandatory:false,
        type:`string`,
        default:'-',
        desc:<p className="font-text">The text displayed below <span className="font-code">txtLabel</span> of the <span className="font-code">{`<Checkbox/>`}</span> component.</p>
    },
    {
        id:'5',
        propName:'isDisabled',
        isMandatory:false,
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, the <span className="font-code">{`<Checkbox/>`}</span> component will be inactive and cannot be clicked.</p>
    },
    {
        id:'10',
        propName:'onClick',
        isMandatory:false,
        type:`() => void`,
        default:'-',
        desc:<p className="font-text">Callback function that can be used to change the <span className="font-code">isSelected</span> prop value when <span className="font-code">{`<Checkbox/>`}</span> component clicked.</p>,
    }
]
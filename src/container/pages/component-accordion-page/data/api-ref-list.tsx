import { listCompPropsDetail } from "container/templates/component-props-detail-template"

export const accordionApiRefList:listCompPropsDetail[] = [
    {
        id:'1',
        propName:'accordionOpen',
        isMandatory:true,
        type:`string[]`,
        default:'-',
        desc:<p className="font-text">List of expanded accordion item id's.</p>
    },
    {
        id:'2',
        propName:'setAccordionOpen',
        isMandatory:true,
        type:`React.Dispatch<React.SetStateAction<string[]>>`,
        default:'-',
        desc:<p className="font-text">React set-state that change value of<span className="font-code">accordionOpen</span>.</p>
    },
    {
        id:'3',
        propName:'children',
        isMandatory:true,
        type:`JSX.Element | JSX.Element[]`,
        default:'-',
        desc:<p className="font-text">Lis of <span className="font-code">{`<AccordionItem/>`}</span> components.</p>
    },
    {
        id:'4',
        propName:'isAllowMultipleOpen',
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">When <span className="font-code">true</span>, allow to expand multiple <span className="font-code">{`<AccordionItem/>`}</span> at a time</p>
    }
]

export const accordionItemApiRefList:listCompPropsDetail[] = [
    {
        id:'1',
        propName:'id',
        isMandatory:true,
        type:`string`,
        default:'-',
        desc:<p className="font-text">Identifier to be used for distinguish expanded and collapsed element.</p>
    },
    {
        id:'2',
        propName:'txtLabel',
        isMandatory:true,
        type:`string`,
        default:'-',
        desc:<p className="font-text">Label of <span className="font-code">{`<AccordionItem/>`}</span> header.</p>
    },
    {
        id:'3',
        propName:'contentPage',
        isMandatory:true,
        type:`JSX.Element | JSX.Element[] | ((props?:Record<any,any>)=>JSX.Element)`,
        default:'-',
        desc:<p className="font-text">Content of <span className="font-code">{`<AccordionItem/>`}</span>.</p>
    },
    {
        id:'4',
        propName:'txtSublabel',
        isMandatory:false,
        type:`string`,
        default:'-',
        desc:<p className="font-text">Sublabel of <span className="font-code">{`<AccordionItem/>`}</span> header.</p>
    },
    {
        id:'5',
        propName:'isDisabled',
        isMandatory:false,
        type:`boolean`,
        default:'-',
        desc:<p className="font-text">When <span className="font-code">true</span> interaction and focus for the element will be disabled.</p>
    },
    {
        id:'6',
        propName:'isOpen',
        isMandatory:false,
        type:`boolean`,
        default:'-',
        desc:<p className="font-text">When <span className="font-code">true</span> element will show it's <span className="font-code">contentPage</span>. This prop will be automatically manage by <span className="font-code">{`<Accordion/>`}</span> component.</p>
    },
    {
        id:'7',
        propName:'onClick',
        isMandatory:false,
        type:`function`,
        typeAdition:<span className="font-code">{`(id: string) => void`}</span>,
        default:'-',
        desc:<p className="font-text">Function that will change the value of <span className="font-code">isOpen</span>. This prop will be automatically manage by <span className="font-code">{`<Accordion/>`}</span> component.</p>
    },
    
]
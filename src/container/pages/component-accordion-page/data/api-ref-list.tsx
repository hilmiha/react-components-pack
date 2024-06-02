import { listCompPropsDetail } from "container/templates/component-props-detail-template"

export const accordionApiRefList:listCompPropsDetail[] = [
    {
        id:'1',
        propName:'accordionOpen',
        isMandatory:true,
        type:`string[]`,
        default:'-',
        desc:<p className="font-text">Array of IDs for the expanded <span className="font-code">{`<AccordionItem/>`}</span> components. Controls which items are open.</p>
    },
    {
        id:'2',
        propName:'setAccordionOpen',
        isMandatory:true,
        type:`React.Dispatch<React.SetStateAction<string[]>>`,
        default:'-',
        // 
        desc:<p className="font-text">State setter function to update the <span className="font-code">{`accordionOpen`}</span> array, managing the expanded state of <span className="font-code">{`<AccordionItem/>`}</span> components.</p>
    },
    {
        id:'3',
        propName:'children',
        isMandatory:true,
        type:`JSX.Element | JSX.Element[]`,
        default:'-',
        desc:<p className="font-text">The <span className="font-code">{`<AccordionItem/>`}</span> components to be rendered within the <span className="font-code">{`<Accordion/>`}</span>. Each child represents an individual item in the accordion.</p>
    },
    {
        id:'4',
        propName:'isAllowMultipleOpen',
        type:`boolean`,
        default:'false',
        desc:<p className="font-text">Allows multiple <span className="font-code">{`<AccordionItem/>`}</span> components to be expanded simultaneously when set to <span className="font-code">{`true`}</span>.</p>
    }
]

export const accordionItemApiRefList:listCompPropsDetail[] = [
    {
        id:'1',
        propName:'id',
        isMandatory:true,
        type:`string`,
        default:'-',
        desc:<p className="font-text">A unique identifier for the <span className="font-code">{`<AccordionItem/>`}</span> component. This ID is used to manage the expanded state within the parent <span className="font-code">{`<Accordion/>`}</span> component.</p>
    },
    {
        id:'2',
        propName:'txtLabel',
        isMandatory:true,
        type:`string`,
        default:'-',
        desc:<p className="font-text">This label is displayed as the header or title of the item, which users click to expand or collapse the content.</p>
    },
    {
        id:'3',
        propName:'contentPage',
        isMandatory:true,
        type:`JSX.Element | JSX.Element[] | ((props?:Record<any,any>)=>JSX.Element)`,
        default:'-',
        desc:<p className="font-text">The content to be displayed when the <span className="font-code">{`<AccordionItem/>`}</span> is expanded.</p>
    },
    {
        id:'4',
        propName:'txtSublabel',
        isMandatory:false,
        type:`string`,
        default:'-',
        desc:<p className="font-text">n additional text sublabel for the <span className="font-code">{`<AccordionItem/>`}</span>. This sublabel provides supplementary information and is typically displayed below the main label.</p>
    },
    {
        id:'5',
        propName:'isDisabled',
        isMandatory:false,
        type:`boolean`,
        default:'-',
        desc:<p className="font-text">When true, the <span className="font-code">{`<AccordionItem/>`}</span> is disabled and cannot be expanded or collapsed by user interaction.</p>
    }
]
import CodeBlock from "components/code-block"
import { menuListItemTypeExample, menuListTypeExample } from "../../../data/code-list"

const ManuListPropInfo = () =>{
    return(
        <>
            <div className="component-section">
                <div style={{display:'grid', gap:'var(--size-2)', maxHeight:'300px'}}>
                    <span className="font-title font-code">menuListType</span>
                    <p className="font-text">List grouped menus.</p>
                    <CodeBlock
                        code={menuListTypeExample}
                        language="jsx"
                    />
                </div>
            </div>
            <div className="component-section">
                <div style={{display:'grid', gap:'var(--size-2)', maxHeight:'300px'}}>
                    <span className="font-title font-code">{`menuListItemType[]`}</span>
                    <p className="font-text">List of menu item.</p>
                    <CodeBlock
                        code={menuListItemTypeExample}
                        language="jsx"
                    />
                </div>
            </div>
        </>
    )
}

export default ManuListPropInfo
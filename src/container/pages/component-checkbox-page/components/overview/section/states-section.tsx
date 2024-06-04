import { codePreviewIsDisabledCheckbox, codePreviewIsIndeterminateCheckbox } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import Checkbox from "components/checkbox"
import { useState } from "react"

const StatesSection = () =>{
    
    const [isSelected, setIsSelected] = useState(true)

    return(
        <div className="component-section">
            <span className="font-title-large">States of the checkbox</span>
            <p className="font-text">Checkbox can represent various states to provide visual feedback and improve user interaction. Each state indicates specific conditions and affects the checkbox's behavior.</p>
            <div style={{marginLeft:'var(--size-4)', display:'grid', gap:'var(--size-6)'}}>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Indeterminate state</span>
                    <p className="font-text">The checkbox component supports an indeterminate state, controlled by the <span className="font-code">isIndeterminate</span> prop. When set to <span className="font-code">true</span>, the checkbox displays a dash instead of the usual check icon. This is useful for representing a partially selected state, such as when some but not all sub-items are selected.</p>
                    <PreviewNCode
                        code={codePreviewIsIndeterminateCheckbox}
                        language=""
                    >
                        <Checkbox
                            txtLabel="Checkbox label"
                            isSelected={isSelected}
                            onClick={()=>{setIsSelected(!isSelected)}}
                            isIndeterminate={true}
                        />
                    </PreviewNCode>
                </div>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Disabled state</span>
                    <p className="font-text">Indicating the checkbox is inactive and cannot be clicked using <span className="font-code">isDisabled</span> prop.</p>
                    <PreviewNCode
                        code={codePreviewIsDisabledCheckbox}
                        language=""
                    >
                        <Checkbox
                            txtLabel="Checkbox label"
                            isSelected={false}
                            isDisabled={true}
                        />
                    </PreviewNCode>
                </div>
            </div>
        </div>
    )
}

export default StatesSection
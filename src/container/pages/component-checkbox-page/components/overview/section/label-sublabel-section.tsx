import Checkbox from "components/checkbox"
import PreviewNCode from "components/preview-n-code"
import { codePreviewLabelSublabel } from "container/pages/component-checkbox-page/data/code-list"
import { useState } from "react"

const LabelSublabelSection = () =>{

    const [isSelected, setIsSelected] = useState(false)

    return(
        <div className="component-section">
            <span className="font-title-large">Label and sublabel</span>
            <p className="font-text">Using <span className="font-code">txtLabel</span> and <span className="font-code">txtSubLabel</span> prop to to add label and sublabel next the checkbox component.</p>
            <PreviewNCode
                code={codePreviewLabelSublabel}
                language="tsx"
            >
                <Checkbox
                    isSelected={isSelected}
                    onClick={()=>{setIsSelected(!isSelected)}}
                    txtLabel="Checkbox label"
                    txtSubLabel="Checkbox sublabel"
                />
            </PreviewNCode>
        </div>
    )
}

export default LabelSublabelSection
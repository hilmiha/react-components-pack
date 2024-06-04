import { codePreview } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import Checkbox from "components/checkbox"
import { useState } from "react"

const PreviewSection = () =>{

    const [isSelected, setIsSelected] = useState(false)

    return(
        <div className="component-section">
            <PreviewNCode
                code={codePreview}
                language=""
            >
                <Checkbox
                    isSelected={isSelected}
                    onClick={()=>{setIsSelected(!isSelected)}}
                />
            </PreviewNCode>
        </div>
    )
}

export default PreviewSection
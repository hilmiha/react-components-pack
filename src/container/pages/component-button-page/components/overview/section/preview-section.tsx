import { codePreview } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import Button from "components/button"

const PreviewSection = () =>{

    return(
        <div className="component-section">
            <PreviewNCode
                code={codePreview}
                language=""
            >
                <Button
                    txtLabel="Button"
                    onClick={()=>{console.log('CLICK')}}
                />
            </PreviewNCode>
        </div>
    )
}

export default PreviewSection
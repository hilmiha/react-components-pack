import { codePreviewIsFullWidthdButton } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import Button from "components/button"

const FullWidthSection = () =>{

    return(
        <div className="component-section">
            <span className="font-title-large">Full width button</span>
            <p className="font-text">Using <span className="font-code">isFullWidth</span> prop to make the Button component expand to fill its container width.</p>
            <PreviewNCode
                code={codePreviewIsFullWidthdButton}
                language=""
            >
                <Button
                    txtLabel="Button"
                    isFullWidth={true}
                />
            </PreviewNCode>
        </div>
    )
}

export default FullWidthSection
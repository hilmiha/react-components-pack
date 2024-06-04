import { codePreview } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import { listMenu } from "../../../data/menuList"
import SplitButton from "components/split-button"

const PreviewSection = () =>{

    return(
        <div className="component-section">
            <PreviewNCode
                code={codePreview}
                language=""
            >
                <SplitButton
                    txtLabel="Main Action"
                    menuList={listMenu}
                />
            </PreviewNCode>
        </div>
    )
}

export default PreviewSection
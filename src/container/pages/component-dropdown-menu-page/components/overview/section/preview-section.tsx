import { codePreview } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import DropdownMenu from "components/dropdown-menu"
import { listMenu } from "../../../data/menuList"

const PreviewSection = () =>{

    return(
        <div className="component-section">
            <PreviewNCode
                code={codePreview}
                language=""
            >
                <DropdownMenu
                    TxtLabelOrIcon={'Open Menu'}
                    menuList={listMenu}
                />
            </PreviewNCode>
        </div>
    )
}

export default PreviewSection
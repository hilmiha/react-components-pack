import { codePreviewIconAsLabel } from "../../../data/code-list"
import { PiStarFourFill } from "react-icons/pi"
import { listMenu } from "../../../data/menuList"
import PreviewNCode from "components/preview-n-code"
import DropdownMenu from "components/dropdown-menu"

const IconAsButtonSection = () =>{
    
    return(
        <div className="component-section">
            <span className="font-title-large">Icon as label</span>
            <p className="font-text">Dropdown menu button label can be also an icon instate of a string. Icon components are imported from the <a className="font-link" href="https://react-icons.github.io/react-icons/" target="_blank" rel="noopener noreferrer">react-icons</a> library.</p>
            <PreviewNCode
                code={codePreviewIconAsLabel}
                language=""
            >
                <DropdownMenu
                    TxtLabelOrIcon={<PiStarFourFill/>}
                    menuList={listMenu}
                />
            </PreviewNCode>
        </div>
    )
}

export default IconAsButtonSection
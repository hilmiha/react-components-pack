import { codePreviewIsDisabledButton, codePreviewIsSelectedButton } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import DropdownMenu from "components/dropdown-menu"
import { listMenu } from "../../../data/menuList"

const ButtonStatesSection = () =>{

    return(
        <div className="component-section">
            <span className="font-title-large">States of the dropdown menu button</span>
            <p className="font-text">Dropdown menu button can represent various states to provide visual feedback and improve user interaction. Each state indicates specific conditions and affects the button's behavior.</p>
            <div style={{marginLeft:'var(--size-4)', display:'grid', gap:'var(--size-6)'}}>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Selected state</span>
                    <p className="font-text">Indicating the dropdown menu is currently chosen or active using <span className="font-code">isSelected</span> prop.</p>
                    <PreviewNCode
                        code={codePreviewIsSelectedButton}
                        language=""
                    >
                        <DropdownMenu
                            TxtLabelOrIcon="Open Menu"
                            menuList={listMenu}
                            isSelected={true}
                        />
                    </PreviewNCode>
                </div>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Disabled state</span>
                    <p className="font-text">Indicating the dropdown menu is inactive and cannot be clicked using <span className="font-code">isDisabled</span> prop.</p>
                    <PreviewNCode
                        code={codePreviewIsDisabledButton}
                        language=""
                    >
                        <DropdownMenu
                            TxtLabelOrIcon="Open Menu"
                            menuList={listMenu}
                            isDisabled={true}
                        />
                    </PreviewNCode>
                </div>
            </div>
        </div>
    )
}

export default ButtonStatesSection
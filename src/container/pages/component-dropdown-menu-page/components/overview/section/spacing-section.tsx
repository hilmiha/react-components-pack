import { codePreviewIsSpacingButton } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import { listMenu } from "../../../data/menuList"
import DropdownMenu from "components/dropdown-menu"

const SpacingSection = () =>{

    return(
        <div className="component-section">
            <span className="font-title-large">Dropdown menu spacing/padding</span>
            <p className="font-text">Using <span className="font-code">spacing</span> prop to adjust the padding of the the dropdown menu component.This feature enables fine-tuning of the spacing around the button and its menu item to better fit design requirements.</p>
            <PreviewNCode
                code={codePreviewIsSpacingButton}
                language=""
            >
                <div
                    style={{
                        display:'flex',
                        justifyContent:'center',
                        alignItems:'center',
                        flexWrap:'wrap',
                        gap:'12px'
                    }}
                >
                    <DropdownMenu
                        TxtLabelOrIcon={'Open Menu'}
                        menuList={listMenu}
                        spacing="default"
                    />
                    <DropdownMenu
                        TxtLabelOrIcon={'Open Menu'}
                        menuList={listMenu}
                        spacing="compact"
                    />
                    <DropdownMenu
                        TxtLabelOrIcon={'Open Menu'}
                        menuList={listMenu}
                        spacing="none"
                    />
                </div>
            </PreviewNCode>
        </div>
    )
}

export default SpacingSection

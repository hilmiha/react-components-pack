import { codePreviewIsDisabledButton,codePreviewIsLoadingButton } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import DropdownMenu from "components/dropdown-menu"
import { listMenu } from "../../../data/menuList"
import SplitButton from "components/split-button"

const ButtonStatesSection = () =>{

    return(
        <div className="component-section">
            <span className="font-title-large">States of split button button</span>
            <p className="font-text">Split button button can represent various states to provide visual feedback and improve user interaction. Each state indicates specific conditions and affects the button's behavior.</p>
            <div style={{marginLeft:'var(--size-4)', display:'grid', gap:'var(--size-6)'}}>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Loading state</span>
                    <p className="font-text">Showing a spinner to indicate a background process using <span className="font-code">isLoading</span> prop.</p>
                    <PreviewNCode
                        code={codePreviewIsLoadingButton}
                        language=""
                    >
                        <SplitButton
                            txtLabel="Main Action"
                            menuList={listMenu}
                            isLoading={true}
                        />
                    </PreviewNCode>
                </div>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Disabled state</span>
                    <p className="font-text">Indicating the split button menu is inactive and cannot be clicked using <span className="font-code">isDisabled</span> prop.</p>
                    <PreviewNCode
                        code={codePreviewIsDisabledButton}
                        language=""
                    >
                        <SplitButton
                            txtLabel="Main Action"
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
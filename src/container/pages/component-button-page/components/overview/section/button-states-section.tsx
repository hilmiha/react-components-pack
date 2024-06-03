import { codePreviewIsDisabledButton, codePreviewIsLoadingButton, codePreviewIsSelectedButton } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import Button from "components/button"

const ButtonStatesSection = () =>{

    return(
        <div className="component-section">
            <span className="font-title-large">States of the button</span>
            <p className="font-text">Button can represent various states to provide visual feedback and improve user interaction. Each state indicates specific conditions and affects the button's behavior.</p>
            <div style={{marginLeft:'var(--size-4)', display:'grid', gap:'var(--size-6)'}}>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Selected state</span>
                    <p className="font-text">Indicating the button is currently chosen or active using <span className="font-code">isSelected</span> prop.</p>
                    <PreviewNCode
                        code={codePreviewIsSelectedButton}
                        language=""
                    >
                        <Button
                            txtLabel="Button"
                            isSelected={true}
                        />
                    </PreviewNCode>
                </div>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Loading state</span>
                    <p className="font-text">Showing a spinner to indicate a background process using <span className="font-code">isLoading</span> prop.</p>
                    <PreviewNCode
                        code={codePreviewIsLoadingButton}
                        language=""
                    >
                        <Button
                            txtLabel="Button"
                            isLoading={true}
                        />
                    </PreviewNCode>
                </div>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Disabled state</span>
                    <p className="font-text">Indicating the button is inactive and cannot be clicked using <span className="font-code">isDisabled</span> prop.</p>
                    <PreviewNCode
                        code={codePreviewIsDisabledButton}
                        language=""
                    >
                        <Button
                            txtLabel="Button"
                            isDisabled={true}
                        />
                    </PreviewNCode>
                </div>
            </div>
        </div>
    )
}

export default ButtonStatesSection
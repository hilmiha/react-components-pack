import { codePreviewIsDisabledButton, codePreviewIsLoadingButton, codePreviewIsSelectedButton } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import Button from "components/button"
import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const ButtonStatesSection = () =>{

    return(
        <div className="component-section">
            <span className="font-title-large">States of the button</span>
            <p className="font-text">Icon Button can represent various states to provide visual feedback and improve user interaction. Each state indicates specific conditions and affects the button's behavior.</p>
            <div style={{marginLeft:'var(--size-4)', display:'grid', gap:'var(--size-6)'}}>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Selected state</span>
                    <p className="font-text">Indicating the button is currently chosen or active</p>
                    <PreviewNCode
                        code={codePreviewIsSelectedButton}
                        language=""
                    >
                        <IconButton
                            Icon={<PiStarFourFill/>}
                            isSelected={true}
                        />
                    </PreviewNCode>
                </div>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Loading state</span>
                    <p className="font-text">Showing a spinner to indicate a background process.</p>
                    <PreviewNCode
                        code={codePreviewIsLoadingButton}
                        language=""
                    >
                        <IconButton
                            Icon={<PiStarFourFill/>}
                            isLoading={true}
                        />
                    </PreviewNCode>
                </div>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Disabled state</span>
                    <p className="font-text">Indicating the button is inactive and cannot be clicked.</p>
                    <PreviewNCode
                        code={codePreviewIsDisabledButton}
                        language=""
                    >
                        <IconButton
                            Icon={<PiStarFourFill/>}
                            isDisabled={true}
                        />
                    </PreviewNCode>
                </div>
            </div>
        </div>
    )
}

export default ButtonStatesSection
import { codePreviewIsSpacingButton } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const SpacingSection = () =>{

    return(
        <div className="component-section">
            <span className="font-title-large">Icon Button spacing/padding</span>
            <p className="font-text">Using <span className="font-code">spacing</span> prop to adjust the padding of the the Icon Button component.This feature enables fine-tuning of the spacing around the button to better fit design requirements.</p>
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
                    <IconButton
                        Icon={<PiStarFourFill/>}
                        spacing="default"
                    />
                    <IconButton
                        Icon={<PiStarFourFill/>}
                        spacing="compact"
                    />
                    <IconButton
                        Icon={<PiStarFourFill/>}
                        spacing="none"
                    />
                </div>
            </PreviewNCode>
        </div>
    )
}

export default SpacingSection
import { codePreviewButtonWithIconAfter, codePreviewButtonWithIconBefore } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import Button from "components/button"
import { PiStarFourFill } from "react-icons/pi"

const ButtonWithIconSection = () =>{
    
    return(
        <div className="component-section">
            <span className="font-title-large">Button with icon</span>
            <p className="font-text">Buttons may include an icon before or after the text label. For an icon-only button, see <a className="font-link" href="/components/icon-button/example">Icon Button</a> component. Icon components are imported from the <a className="font-link" href="https://react-icons.github.io/react-icons/" target="_blank" rel="noopener noreferrer">react-icons</a> library.</p>
            <div style={{marginLeft:'var(--size-4)', display:'grid', gap:'var(--size-6)'}}>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Icon before</span>
                    <p className="font-text">Display an icon before the text.</p>
                    <PreviewNCode
                        code={codePreviewButtonWithIconBefore}
                        language=""
                    >
                        <Button
                            txtLabel="Button"
                            IconBefore={<PiStarFourFill/>}
                        />
                    </PreviewNCode>
                </div>
                <div style={{display:'grid', gap:'var(--size-2)'}}>
                    <span className="font-title">Icon after</span>
                    <p className="font-text">Display an icon after the text.</p>
                    <PreviewNCode
                        code={codePreviewButtonWithIconAfter}
                        language=""
                    >
                        <Button
                            txtLabel="Button"
                            IconAfter={<PiStarFourFill/>}
                        />
                    </PreviewNCode>
                </div>
            </div>
        </div>
    )
}

export default ButtonWithIconSection
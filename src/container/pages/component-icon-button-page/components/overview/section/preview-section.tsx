import { codePreview } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const PreviewSection = () =>{

    return(
        <div className="component-section">
            <PreviewNCode
                code={codePreview}
                language=""
            >
                <IconButton
                    Icon={<PiStarFourFill/>}
                />
            </PreviewNCode>
            <p className="font-text">Icon components are imported from the <a className="font-link" href="https://react-icons.github.io/react-icons/" target="_blank" rel="noopener noreferrer">react-icons</a> library.</p>
        </div>
    )
}

export default PreviewSection
import Accordion from "components/accordion"
import AccordionItem from "components/accordionItem"
import { useState } from "react"
import PreviewNCode from "components/preview-n-code"
import { codePreviewDangerButtonIcon, codePreviewDefaultButtonIcon, codePreviewPrimaryButtonIcon, codePreviewSubtleButtonIcon, codePreviewWarningButtonIcon } from "../../../data/code-list"
import IconButton from "components/icon-button"
import { PiStarFourFill } from "react-icons/pi"

const ApperanceVariationSection = () =>{

    const [open, setOpen] = useState<string[]>([])

    return(
        <div className="component-section">
            <span className="font-title-large">Apperance variation</span>
            <p className="font-text">Icon Button component supports various appearance styles through the <span className="font-code">appearance</span> prop, allowing customization of its look to fit different contexts. Below are examples of each variation:</p>
            <Accordion
                accordionOpen={open}
                setAccordionOpen={setOpen}
                isAllowMultipleOpen={true}
            >
                <AccordionItem
                    id='default'
                    txtLabel='Default Apperance'
                    contentPage={
                        <PreviewNCode
                            code={codePreviewDefaultButtonIcon}
                            language=""
                        >
                            <IconButton
                                Icon={<PiStarFourFill/>}
                                appearance="default"
                            />
                        </PreviewNCode>
                    }
                />
                <AccordionItem
                    id='primary'
                    txtLabel='Primary Apperance'
                    contentPage={
                        <PreviewNCode
                            code={codePreviewPrimaryButtonIcon}
                            language=""
                        >
                            <IconButton
                                Icon={<PiStarFourFill/>}
                                appearance="primary"
                            />
                        </PreviewNCode>
                    }
                />
                <AccordionItem
                    id='warning'
                    txtLabel='Warning Apperance'
                    contentPage={
                        <PreviewNCode
                            code={codePreviewWarningButtonIcon}
                            language=""
                        >
                            <IconButton
                                Icon={<PiStarFourFill/>}
                                appearance="warning"
                            />
                        </PreviewNCode>
                    }
                />
                <AccordionItem
                    id='danger'
                    txtLabel='Danger Apperance'
                    contentPage={
                        <PreviewNCode
                            code={codePreviewDangerButtonIcon}
                            language=""
                        >
                            <IconButton
                                Icon={<PiStarFourFill/>}
                                appearance="danger"
                            />
                        </PreviewNCode>
                    }
                />
                <AccordionItem
                    id='subtle'
                    txtLabel='Subtle Apperance'
                    contentPage={
                        <PreviewNCode
                            code={codePreviewSubtleButtonIcon}
                            language=""
                        >
                            <IconButton
                                Icon={<PiStarFourFill/>}
                                appearance="subtle"
                            />
                        </PreviewNCode>
                    }
                />
            </Accordion>
        </div>
    )
}

export default ApperanceVariationSection
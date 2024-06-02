import Accordion from "components/accordion"
import AccordionItem from "components/accordionItem"
import { codePreviewDangerButton, codePreviewDefaultButton, codePreviewLinkButton, codePreviewPrimaryButton, codePreviewSubtleButton, codePreviewSubtleLinkButton, codePreviewWarningButton } from "../../../data/code-list"
import { useState } from "react"
import PreviewNCode from "components/preview-n-code"
import Button from "components/button"

const ApperanceVariationSection = () =>{

    const [open, setOpen] = useState<string[]>([])

    return(
        <div className="component-section">
            <span className="font-title-large">Apperance variation</span>
            <p className="font-text">Button component supports various appearance styles through the <span className="font-code">appearance</span> prop, allowing you to customize its look to fit different contexts. Below are examples of each variation:</p>
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
                            code={codePreviewDefaultButton}
                            language=""
                        >
                            <Button
                                txtLabel="Button"
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
                            code={codePreviewPrimaryButton}
                            language=""
                        >
                            <Button
                                txtLabel="Button"
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
                            code={codePreviewWarningButton}
                            language=""
                        >
                            <Button
                                txtLabel="Button"
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
                            code={codePreviewDangerButton}
                            language=""
                        >
                            <Button
                                txtLabel="Button"
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
                            code={codePreviewSubtleButton}
                            language=""
                        >
                            <Button
                                txtLabel="Button"
                                appearance="subtle"
                            />
                        </PreviewNCode>
                    }
                />
                <AccordionItem
                    id='link'
                    txtLabel='Link Apperance'
                    contentPage={
                        <PreviewNCode
                            code={codePreviewLinkButton}
                            language=""
                        >
                            <Button
                                txtLabel="Button"
                                appearance="link"
                            />
                        </PreviewNCode>
                    }
                />
                <AccordionItem
                    id='subtle-link'
                    txtLabel='Subtle link Apperance'
                    contentPage={
                        <PreviewNCode
                            code={codePreviewSubtleLinkButton}
                            language=""
                        >
                            <Button
                                txtLabel="Button"
                                appearance="subtle-link"
                            />
                        </PreviewNCode>
                    }
                />
            </Accordion>
        </div>
    )
}

export default ApperanceVariationSection
import { useState } from "react"
import Accordion from "components/accordion"
import AccordionItem from "components/accordionItem"
import { codePreviewDangerButton, codePreviewDefaultButton, codePreviewPrimaryButton, codePreviewSubtleButton, codePreviewWarningButton } from "../../../data/code-list"
import PreviewNCode from "components/preview-n-code"
import DropdownMenu from "components/dropdown-menu"
import { listMenu } from "../../../data/menuList"
import SplitButton from "components/split-button"

const ApperanceVariationSection = () =>{

    const [open, setOpen] = useState<string[]>([])

    return(
        <div className="component-section">
            <span className="font-title-large">Apperance variation</span>
            <p className="font-text">Split button component supports various appearance styles through the <span className="font-code">appearance</span> prop, allowing customization of its look to fit different contexts. Below are examples of each variation:</p>
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
                            <SplitButton
                                txtLabel="Main Action"
                                appearance="default"
                                menuList={listMenu}
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
                            <SplitButton
                                txtLabel="Main Action"
                                appearance="primary"
                                menuList={listMenu}
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
                            <SplitButton
                                txtLabel="Main Action"
                                appearance="warning"
                                menuList={listMenu}
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
                            <SplitButton
                                txtLabel="Main Action"
                                appearance="danger"
                                menuList={listMenu}
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
                            <SplitButton
                                txtLabel="Main Action"
                                appearance="subtle"
                                menuList={listMenu}
                            />
                        </PreviewNCode>
                    }
                />
            </Accordion>
        </div>
    )
}

export default ApperanceVariationSection
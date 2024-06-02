import Accordion from "components/accordion"
import AccordionItem from "components/accordionItem"
import { codeSublabelPreview } from "../../../data/code-list"
import { useState } from "react"
import PreviewNCode from "components/preview-n-code"

const SublabelItemSection = () =>{

    const [open, setOpen] = useState<string[]>([])

    return(
        <div className="component-section">
            <span className="font-title-large">Sublabel item header</span>
            <p className="font-text">Use the <span className="font-code">txtSublabel</span> prop on the Accordion Item component to add sublabel on the header.</p>
            <PreviewNCode
                code={codeSublabelPreview}
                language="tsx"
            >
                <Accordion
                    accordionOpen={open}
                    setAccordionOpen={setOpen}
                    isAllowMultipleOpen={false}
                >
                    <AccordionItem
                        id='one'
                        txtLabel='Accordion One Lable'
                        txtSublabel="Accordion one sublabel"
                        contentPage={
                            <p className='font-text'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                            </p>
                        }
                    />
                </Accordion>
            </PreviewNCode>
        </div>
    )
}

export default SublabelItemSection
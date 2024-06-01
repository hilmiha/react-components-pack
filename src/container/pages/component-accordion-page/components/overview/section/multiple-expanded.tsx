import Accordion from "components/accordion"
import AccordionItem from "components/accordionItem"
import { codeMultiExtendedPreview } from "../../../data/code-list"
import { useState } from "react"
import PreviewNCode from "components/preview-n-code"

const MultipleExpanded = () =>{

    const [open, setOpen] = useState<string[]>([])

    return(
        <div className="component-section">
            <span className="font-title-large">Multiple item extended at a time</span>
            <div className="desc-box">
                <p className="font-text">Use the <span className="font-code">isAllowMultipleOpen</span> prop on the Accordion component to allow multiple panel of Accordion Item to be expanded at a time.</p>
            </div>
            <PreviewNCode
                code={codeMultiExtendedPreview}
                language="tsx"
            >
                <Accordion
                    accordionOpen={open}
                    setAccordionOpen={setOpen}
                    isAllowMultipleOpen={true}
                >
                    <AccordionItem
                        id='one'
                        txtLabel='Accordion One Lable'
                        contentPage={
                            <p className='font-text'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                            </p>
                        }
                    />
                    <AccordionItem
                        id='two'
                        txtLabel='Accordion Two Lable'
                        contentPage={
                            <p className='font-text'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                            </p>
                        }
                    />
                    <AccordionItem
                        id='three'
                        txtLabel='Accordion Three'
                        contentPage={
                            <p className='font-text'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                            </p>
                        }
                    />
                </Accordion>
            </PreviewNCode>
        </div>
    )
}

export default MultipleExpanded
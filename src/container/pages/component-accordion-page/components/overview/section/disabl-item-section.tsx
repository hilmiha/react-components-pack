import Accordion from "components/accordion"
import AccordionItem from "components/accordionItem"
import { codeDisabledPreview} from "../../../data/code-list"
import { useState } from "react"
import PreviewNCode from "components/preview-n-code"

const DisableItemSection = () =>{

    const [open, setOpen] = useState<string[]>([])

    return(
        <div className="component-section">
            <span className="font-title-large">Disabled item header</span>
            <p className="font-text">Use the <span className="font-code">isDisabled</span> prop on the Accordion Item component to disable interaction and focus.</p>
            <PreviewNCode
                code={codeDisabledPreview}
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
                        txtLabel='Accordion Three Lable Disabled'
                        isDisabled
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

export default DisableItemSection
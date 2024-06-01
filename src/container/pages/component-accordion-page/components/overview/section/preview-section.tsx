import Accordion from "components/accordion"
import AccordionItem from "components/accordionItem"
import { codePreview } from "../../../data/code-list"
import { useState } from "react"
import PreviewNCode from "components/preview-n-code"

const PreviewSection = () =>{

    const [open, setOpen] = useState<string[]>([])

    return(
        <div className="component-section">
            <PreviewNCode
                code={codePreview}
                language=""
            >
                <Accordion
                    accordionOpen={open}
                    setAccordionOpen={setOpen}
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
                        txtLabel='Accordion Three Lable'
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

export default PreviewSection
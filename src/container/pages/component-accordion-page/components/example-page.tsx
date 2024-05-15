import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import Checkbox from "../../../../components/checkbox";
import Accordion from "../../../../components/accordion";
import AccordionItem from "../../../../components/accordionItem";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [opened, setOpened] = useState<string[]>([])
    const [openedSectionTwo, setOpenedSectionTwo] = useState<string[]>([])


    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <Accordion
                        accordionOpen={opened}
                        setAccordionOpen={setOpened}
                        isAllowMultipleOpen={false}
                    >
                        <AccordionItem
                            id='one'
                            txtLabel='Accordion One'
                            contentPage={
                                <p className='font-text'>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                                </p>
                            }
                        />
                        <AccordionItem
                            id='two'
                            txtLabel='Accordion Two'
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
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                                </p>
                            }
                        />
                    </Accordion>
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">Disabled</span>
                <div className="preview-box">
                    <Accordion
                        accordionOpen={openedSectionTwo}
                        setAccordionOpen={setOpenedSectionTwo}
                        isAllowMultipleOpen={false}
                    >
                        <AccordionItem
                            id='one'
                            txtLabel='Accordion One'
                            isDisabled
                            contentPage={
                                <p className='font-text'>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                                </p>
                            }
                        />
                        <AccordionItem
                            id='two'
                            txtLabel='Accordion Two'
                            isDisabled
                            contentPage={
                                <p className='font-text'>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                                </p>
                            }
                        />
                        <AccordionItem
                            id='three'
                            txtLabel='Accordion Three'
                            isDisabled
                            contentPage={
                                <p className='font-text'>
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                                </p>
                            }
                        />
                    </Accordion>
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
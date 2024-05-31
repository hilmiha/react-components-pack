import { useContext, useEffect, useState } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import Accordion from "../../../../components/accordion";
import AccordionItem from "../../../../components/accordionItem";
import Tabs from "../../../../components/tabs";

import * as code from "../data/code-list";
import CodeBlock from "../../../../components/code-block";
import PillFlair from "../../../../components/pill-flair";
import Table from "../../../../components/table";

const OverviewPage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const [opened, setOpened] = useState<string[]>([])
    const [openedMultiple, setOpenedMultiple] = useState<string[]>([])
    const [openedDisabled, setOpenedDisabled] = useState<string[]>([])
    const [openedSublabel, setOpenedSublabel] = useState<string[]>([])
    
    const [tabPreviewOverview, setTabPreviewOverview] = useState('preview')
    const [tabPreviewMultiple, setTabPreviewMultiple] = useState('preview')
    const [tabPreviewDisabled, setTabPreviewDisabled] = useState('preview')
    const [tabPreviewSublabel, setTabPreviewSublabel] = useState('preview')


    useEffect(()=>{
        setTabSelected('overview')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <Tabs
                    selected={tabPreviewOverview}
                    setSelected={setTabPreviewOverview}
                    tabList={[{id:'preview', txtLabel:"Preview"}, {id:'code', txtLabel:'Code'}]}
                />
                {
                    (tabPreviewOverview==='preview')&&(
                        <div className="preview-box">
                            <Accordion
                                accordionOpen={opened}
                                setAccordionOpen={setOpened}
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
                        </div>
                    )
                }
                {
                    (tabPreviewOverview==='code')&&(
                        <div className="code-box">
                            <CodeBlock code={code.codePreview}/>
                        </div>
                    )
                }
            </div>
            <div className="component-section">
                <span className="font-title-large">Multiple item extended at a time</span>
                <div className="desc-box">
                    <p className="font-text">Use the <span className="font-code">isAllowMultipleOpen</span> prop on the Accordion component to allow multiple panel of Accordion Item to be expanded at a time.</p>
                </div>
                <Tabs
                    selected={tabPreviewMultiple}
                    setSelected={setTabPreviewMultiple}
                    tabList={[{id:'preview', txtLabel:"Preview"}, {id:'code', txtLabel:'Code'}]}
                />
                {
                    (tabPreviewMultiple==='preview')&&(
                        <div className="preview-box">
                            <Accordion
                                accordionOpen={openedMultiple}
                                setAccordionOpen={setOpenedMultiple}
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
                                    txtLabel='Accordion Three Disabled'
                                    contentPage={
                                        <p className='font-text'>
                                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore beatae placeat molestias fuga et excepturi nihil culpa, provident vel, enim voluptatum quam incidunt. Necessitatibus animi dolorum omnis minima, possimus ullam?
                                        </p>
                                    }
                                />
                            </Accordion>
                        </div>
                    )
                }
                {
                    (tabPreviewMultiple==='code')&&(
                        <div className="code-box">
                            <CodeBlock code={code.codeMultiExtendedPreview}/>
                        </div>
                    )
                }
            </div>
            <div className="component-section">
                <span className="font-title-large">Sublabel item header</span>
                <div className="desc-box">
                    <p className="font-text">Use the <span className="font-code">txtSublabel</span> prop on the Accordion Item component to add sublabel on the header.</p>
                </div>
                <Tabs
                    selected={tabPreviewSublabel}
                    setSelected={setTabPreviewSublabel}
                    tabList={[{id:'preview', txtLabel:"Preview"}, {id:'code', txtLabel:'Code'}]}
                />
                {
                    (tabPreviewSublabel==='preview')&&(
                        <div className="preview-box">
                            <Accordion
                                accordionOpen={openedSublabel}
                                setAccordionOpen={setOpenedSublabel}
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
                        </div>
                    )
                }
                {
                    (tabPreviewSublabel==='code')&&(
                        <div className="code-box">
                            <CodeBlock code={code.codeSublabelPreview}/>
                        </div>
                    )
                }
            </div>
            <div className="component-section">
                <span className="font-title-large">Disabled item header</span>
                <div className="desc-box">
                    <p className="font-text">Use the <span className="font-code">isDisabled</span> prop on the Accordion Item component to disable interaction and focus.</p>
                </div>
                <Tabs
                    selected={tabPreviewDisabled}
                    setSelected={setTabPreviewDisabled}
                    tabList={[{id:'preview', txtLabel:"Preview"}, {id:'code', txtLabel:'Code'}]}
                />
                {
                    (tabPreviewDisabled==='preview')&&(
                        <div className="preview-box">
                            <Accordion
                                accordionOpen={openedDisabled}
                                setAccordionOpen={setOpenedDisabled}
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
                        </div>
                    )
                }
                {
                    (tabPreviewDisabled==='code')&&(
                        <div className="code-box">
                            <CodeBlock code={code.codeDisabledPreview}/>
                        </div>
                    )
                }
            </div>
            <div className="component-section">
                <span className="font-title-large">Keyboard interaction</span>
                <div className="desc-box">
                    <p className="font-text">Use following keyboard keys to navigate through the component</p>
                </div>
                <Table
                    tableColums={[
                        {
                            key:'key',
                            txtLabel:'Key',
                            size:{size:'0.4fr', min:'140px'},
                        },
                        {
                            key:'desc',
                            txtLabel:'Description',
                            size:{size:'1fr', min:'100px'},
                        }
                    ]}
                    tableData={[
                        {
                            id:'key',
                            key:(<div><PillFlair txtLabel={'tab'} appearance="pill"/></div>),
                            desc:'Moves focus to the next focusable element.'
                        },
                        {
                            id:'key',
                            key:(<div><PillFlair txtLabel={'shift'} appearance="pill"/><span> + </span><PillFlair txtLabel={'tab'} appearance="pill"/></div>),
                            desc:'Moves focus to the previous focusable element.'
                        }
                    ]}
                />
            </div>
        </div>
    )
}
export default OverviewPage
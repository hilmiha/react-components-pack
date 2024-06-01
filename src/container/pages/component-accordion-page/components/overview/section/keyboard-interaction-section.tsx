import PillFlair from "components/pill-flair"
import Table from "components/table"

const KeyboardInteractionSection = () =>{
    return(
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
                            key:(<div style={{height:'100%'}}><PillFlair txtLabel={'Space'} appearance="pill"/></div>),
                            desc:'When focus is on an Accordion Item header of a collapsed section, expands the section. When focus is on an Accordion Item header of an expanded section, collapse the section.'
                        },
                        {
                            id:'key',
                            key:(<div style={{height:'100%'}}><PillFlair txtLabel={'Enter'} appearance="pill"/></div>),
                            desc:'When focus is on an Accordion Item header of a collapsed section, expands the section. When focus is on an Accordion Item header of an expanded section, collapse the section.'
                        },
                        {
                            id:'key',
                            key:(<div style={{height:'100%'}}><PillFlair txtLabel={'Tab'} appearance="pill"/></div>),
                            desc:'Moves focus to the next focusable element.'
                        },
                        {
                            id:'key',
                            key:(<div style={{height:'100%'}}><PillFlair txtLabel={'Shift'} appearance="pill"/><span> + </span><PillFlair txtLabel={'Tab'} appearance="pill"/></div>),
                            desc:'Moves focus to the previous focusable element.'
                        }
                    ]}
                />
            </div>
    )
}

export default KeyboardInteractionSection
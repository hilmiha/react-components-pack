import PillFlair from "components/pill-flair"
import Table from "components/table"

const KeyboardInteractionSection = () =>{
    return(
        <div className="component-section">
                <span className="font-title-large">Keyboard interaction</span>
                <p className="font-text">Use following keyboard keys to navigate through the component</p>
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
                            id:'space',
                            key:(<div style={{height:'100%'}}><PillFlair txtLabel={'Space'} appearance="pill"/></div>),
                            desc:<>
                                <p>When focused on the main action button, will fires the function on <span className="font-code">onClickItem</span> prop.</p>
                                <p>When focused on the dropdown button will toggle the dropdown menu, opening it if closed and closing it if open.</p>
                                <p>When focused on the dropdown menu item, will fires the function on <span className="font-code">onClickItem</span> prop.</p>
                            </>
                        },
                        {
                            id:'enter',
                            key:(<div style={{height:'100%'}}><PillFlair txtLabel={'Enter'} appearance="pill"/></div>),
                            desc:<>
                                <p>When focused on the main action button, will fires the function on <span className="font-code">onClickItem</span> prop.</p>
                                <p>When focused on the dropdown button will toggle the dropdown menu, opening it if closed and closing it if open.</p>
                                <p>When focused on the dropdown menu item, will fires the function on <span className="font-code">onClickItem</span> prop.</p>
                            </>
                        },
                        {
                            id:'esc',
                            key:(<div style={{height:'100%'}}><PillFlair txtLabel={'Esc'} appearance="pill"/></div>),
                            desc:<><p>When focused on the dropdown button or dropdown menu item, closing dropdown menu if it openned.</p></>
                        },
                        {
                            id:'tab',
                            key:(<div style={{height:'100%'}}><PillFlair txtLabel={'Tab'} appearance="pill"/></div>),
                            desc:'Moves focus to the next focusable element.'
                        },
                        {
                            id:'stab',
                            key:(<div style={{height:'100%'}}><PillFlair txtLabel={'Shift'} appearance="pill"/><span> + </span><PillFlair txtLabel={'Tab'} appearance="pill"/></div>),
                            desc:'Moves focus to the previous focusable element.'
                        }
                    ]}
                />
            </div>
    )
}

export default KeyboardInteractionSection
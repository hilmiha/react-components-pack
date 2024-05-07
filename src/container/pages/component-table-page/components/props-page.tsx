import { useContext, useEffect } from "react";
import { LocalContext, LocalContextType } from "../context/local-context";
import PillFlair from "../../../../components/pill-flair";

const PropsPage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    useEffect(()=>{
        setTabSelected('props')
    },[])

    return(
        <div className="tab-content">
            <div style={{marginBottom:'var(--size-5)', maxWidth:'800px'}}>
                <p className="font-title-large">Main Props</p>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="tableColums"/>
                    <PillFlair appearance="text" color="danger" txtLabel="required"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        List of columns and its key to be displayed on the table.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="tableColumType[ ]"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>Import from "/components/table"</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="tableData"/>
                    <PillFlair appearance="text" color="danger" txtLabel="required"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        List of data to be displayed on the table matching to its column key.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="tableDataType[ ]"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>Import from "/components/table"</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onClickRow"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function to be called on row item clicked.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( itmRow: tableDataType ) => void"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="tableConfig"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        State that contains state of table and its data.
                        <div>
                            [Total data, Max row shown, Page, Max page, Sort by, Is descending, List of hidden column, Filter and Search key]
                        </div>
                    </div>
                    
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="tableConfigType"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>Import from "/components/table"</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onClickPagination"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function to be called on pagination buttons clicked. Used to modified state of "tableConfig". Will give the buttonId of clicked pagination button on the table footer.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( idButton: paginationTableButtonType ) => void"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="isActionButtons"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Boolean variable to determine row item action is shown or not for all rows.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="boolean"/>
                    </div>
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onClickAction"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function to be called on action buttons of item row clicked. Will give the buttonId of clicked action button on the row of item and its item row data value.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( idButton: string, itmRow: tableDataType ) => void"}</p>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="isExpandable"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Boolean variable to determine button to show and hide row item expandable page is shown or not for all rows.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="boolean"/>
                    </div>
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="searchBarPlaceholder"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Costum placeholder on search text field. 
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="string"/>
                    </div>
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onDoSearch"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function to be called on search buttons clicked. Will give the search term inputed value.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( searchKey: string ) => void"}</p>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onClickColumn"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function to be called on action buttons of column clicked. Will give the keyColumn of clicked column and the new value of its state of isDesc.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( keyColumn: string, isDesc: boolean ) => void"}</p>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onClickColumn"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function to be called on action buttons of column clicked. Will give the keyColumn of clicked column and the new value of its state of isDesc.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( keyColumn: string, isDesc: boolean ) => void"}</p>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="isCheckbox"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Boolean variable to determine checkbox to select item row is shown or not for all rows.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="boolean"/>
                    </div>
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="tableDataSelected"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        React state to determine selected item row.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="string[ ]"/>
                    </div>
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onClickSelect"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function to be called on checkbox item row clicked. Will give the itmRowId of clicked item row to used to modified tableDataSelected state.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( itmRowId: string ) => void"}</p>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onClickSelectAll"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function to be called on checkbox on header table clicked. Used to modified tableDataSelected state to select all or deselect all item row.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( itmRowId: string ) => void"}</p>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onHideColumn"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function to be called to hide cetrain column in list of column. Will give the tableColumnKey to used to modided variable of hiddenTable on tableConfig.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( itmRowId: string ) => void"}</p>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="FilterForm"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function that return component containing filter page of the table.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( { filterValue, onApplyFilter, onCloseModal }: FilterPageProps ) => JSX.Element"}</p>
                        </div>
                    </div> 
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onApplyFilter"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function to be called to apply filter of the table. Will give filter variable to used for modified tableConfig.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( filter: tableFilterType ) => void"}</p>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}
export default PropsPage
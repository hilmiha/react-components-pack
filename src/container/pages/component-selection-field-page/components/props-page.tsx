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
                    <PillFlair appearance="pill" txtLabel="type"/>
                    <PillFlair appearance="text" color="danger" txtLabel="required"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Type of value of selection.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="datePickerType"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>One of {'<'}</p>
                            <PillFlair appearance="pill" color="info" txtLabel='"selection"'/>
                            <PillFlair appearance="pill" color="info" txtLabel='"multi-selection"'/>
                            <p>{'>'}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="value"/>
                    <PillFlair appearance="text" color="danger" txtLabel="required"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Value of the field.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="selectionValueType"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>Import from "/components/selection-field"</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="valueList"/>
                    <PillFlair appearance="text" color="danger" txtLabel="required"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        List of value to be select.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="valueList"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>Import from "/components/selection-field"</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onChange"/>
                    <PillFlair appearance="text" color="danger" txtLabel="required"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function that give new value to be use to change value state.
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
                            <p>{"( newValue: selectionValueType ) => void"}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onValidate"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Function that give error result based on the given field config.
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
                            <p>{"( errorResult: errorType, newValue: selectionValueType, config?: Record< any, any >  ) => void"}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="error"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Current state of error that the field have.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="errorType"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>Import from "/components/text-field"</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="txtLabel"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Label of the field.
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
                    <PillFlair appearance="pill" txtLabel="txtPlaceholder"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Input placeholder of the field.
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
                    <PillFlair appearance="pill" txtLabel="className"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        A string variable representing the class of the component for costum styling.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="string"/>
                    </div>
                </div>
            </div>
            
            <div style={{marginTop:'var(--size-10)', marginBottom:'var(--size-5)', maxWidth:'800px'}}>
                <p className="font-title-large">Config Props</p>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="isMandatory"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Validation purposes. Field must not be empty.
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
                    <PillFlair appearance="pill" txtLabel="maxSelection"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Number of dates can be selected. Only used when use type "multiple".
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="number"/>
                    </div>
                </div>
            </div>
            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="isWithSearch"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Enable search list of selection.
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
                    <PillFlair appearance="pill" txtLabel="prefix"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Enable string placeholder placed before input value.
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
                    <PillFlair appearance="pill" txtLabel="sufix"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Enable string placeholder placed after input value.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="boolean"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PropsPage
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
            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="type"/>
                    <PillFlair type="text" color="danger" txtLabel="required"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Type of value of date to be picked.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair type="pill" txtLabel="datePickerType"/>
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
                            <PillFlair type="pill" color="info" txtLabel='"single"'/>
                            <PillFlair type="pill" color="info" txtLabel='"multiple"'/>
                            <PillFlair type="pill" color="info" txtLabel='"range"'/>
                            <p>{'>'}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="value"/>
                    <PillFlair type="text" color="danger" txtLabel="required"/>
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
                        <PillFlair type="pill" txtLabel="datePickerValueType"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>Import from "/components/date-picker"</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="onChange"/>
                    <PillFlair type="text" color="danger" txtLabel="required"/>
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
                        <PillFlair type="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( newValue: datePickerValueType ) => void"}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="onValidate"/>
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
                        <PillFlair type="pill" txtLabel="function"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>{"( errorResult: errorType, newValue: datePickerValueType, config?: Record< any, any >  ) => void"}</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="error"/>
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
                        <PillFlair type="pill" txtLabel="errorType"/>
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
                    <PillFlair type="pill" txtLabel="txtLabel"/>
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
                        <PillFlair type="pill" txtLabel="string"/>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="txtPlaceholder"/>
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
                        <PillFlair type="pill" txtLabel="string"/>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="className"/>
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
                        <PillFlair type="pill" txtLabel="string"/>
                    </div>
                </div>
            </div>

            

            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="daysAfterToday"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Number of days after today that can be selected.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair type="pill" txtLabel="number"/>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="daysBeforeToday"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Number of days before today that can be selected.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair type="pill" txtLabel="number"/>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="maxSelection"/>
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
                        <PillFlair type="pill" txtLabel="number"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PropsPage
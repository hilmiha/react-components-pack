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
                    <PillFlair appearance="pill" txtLabel="Icon"/>
                    <PillFlair appearance="text" color="danger" txtLabel="required"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Places an icon within the button.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="IconType"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>Import from "react-icons"</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="onClick"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Handler to be called on click.
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
                            <p>{"() => void"}</p>
                        </div>
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

            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="appearance"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        The button style variation.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="appearanceIconButtonType"/>
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
                            <PillFlair appearance="pill" color="info" txtLabel='"default"'/>
                            <PillFlair appearance="pill" color="info" txtLabel='"primary"'/>
                            <PillFlair appearance="pill" color="info" txtLabel='"subtle"'/>
                            <PillFlair appearance="pill" color="info" txtLabel='"warning"'/>
                            <PillFlair appearance="pill" color="info" txtLabel='"danger"'/>
                            <p>{'>'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="spacing"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Controls the amount of padding in the button.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair appearance="pill" txtLabel="spacingButtonType"/>
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
                            <PillFlair appearance="pill" color="info" txtLabel='"default"'/>
                            <PillFlair appearance="pill" color="info" txtLabel='"compact"'/>
                            <p>{'>'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair appearance="pill" txtLabel="isSelected"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Indicates that the button is selected.
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
                    <PillFlair appearance="pill" txtLabel="isDisabled"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Disable the button to prevent user interaction.
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
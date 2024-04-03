import { useContext, useEffect } from "react";
import { LocalContext, LocalContextType } from "../context/local-context";
import PillFlair from "../../../../components/pill-flair";

const CodePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    useEffect(()=>{
        setTabSelected('code')
    },[])

    return(
        <div className="tab-content">
            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="txtLabel"/>
                    <PillFlair type="text" color="danger" txtLabel="required"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Text content to be rendered in the button. Required so that screen readers always have an accessible label provided for the button.
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
                    <PillFlair type="pill" txtLabel="onClick"/>
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
                            <p>{"() => void"}</p>
                        </div>
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
                    <PillFlair type="pill" txtLabel="iconBefore"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Places an icon within the button, before the button's text.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair type="pill" txtLabel="IconType"/>
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
                    <PillFlair type="pill" txtLabel="iconAfter"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Places an icon within the button, after the button's text.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair type="pill" txtLabel="IconType"/>
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
                    <PillFlair type="pill" txtLabel="appearance"/>
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
                        <PillFlair type="pill" txtLabel="appearanceButtonType"/>
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
                            <PillFlair type="pill" color="info" txtLabel='"default"'/>
                            <PillFlair type="pill" color="info" txtLabel='"primary"'/>
                            <PillFlair type="pill" color="info" txtLabel='"subtle"'/>
                            <PillFlair type="pill" color="info" txtLabel='"link"'/>
                            <PillFlair type="pill" color="info" txtLabel='"subtle-link"'/>
                            <PillFlair type="pill" color="info" txtLabel='"warning"'/>
                            <PillFlair type="pill" color="info" txtLabel='"danger"'/>
                            <p>{'>'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="spacing"/>
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
                        <PillFlair type="pill" txtLabel="spacingButtonType"/>
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
                            <PillFlair type="pill" color="info" txtLabel='"default"'/>
                            <PillFlair type="pill" color="info" txtLabel='"compact"'/>
                            <p>{'>'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="isSelected"/>
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
                        <PillFlair type="pill" txtLabel="boolean"/>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="isDisabled"/>
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
                        <PillFlair type="pill" txtLabel="boolean"/>
                    </div>
                </div>
            </div>

            <div className="props-section">
                <div className="props-title">
                    <PillFlair type="pill" txtLabel="isFillContainer"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Option to fit button width to its parent width.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair type="pill" txtLabel="boolean"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CodePage
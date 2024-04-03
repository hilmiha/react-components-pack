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
                    <PillFlair type="pill" txtLabel="menuList"/>
                    <PillFlair type="text" color="danger" txtLabel="required"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        List of dropdown menu item.
                    </div>
                </div>
                <div className="props-info-section">
                    <div className="title">Type</div>
                    <div className="info">
                        <PillFlair type="pill" txtLabel="menuListType"/>
                        <div 
                            style={{
                                paddingLeft:'var(--size-4)',
                                marginTop:'var(--size-2)',
                                display:'flex',
                                flexDirection:'column',
                                gap:'var(--size-2)'
                            }}
                        >
                            <p>Import from "/components/dropdown-menu"</p>
                        </div>
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
                        Handler to be called on main button click.
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
                    <PillFlair type="pill" txtLabel="onClickItem"/>
                </div>
                <div className="props-info-section">
                    <div className="title">Description</div>
                    <div className="info">
                        Handler to be called on dropdown menu item click.
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
                            <p>{"( idButton: string ) => void"}</p>
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
                        <PillFlair type="pill" txtLabel="appearanceIconButtonType"/>
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
        </div>
    )
}
export default PropsPage
import { useContext, useEffect } from "react"
import { LocalContext, LocalContextType } from "../context/local-context";
import Spinner from "../../../../components/spinner";
import IconButton from "../../../../components/icon-button";
import { PiMoon, PiSun } from "react-icons/pi";
import { GlobalContext, GlobalContextType } from "../../../../context/globalcontext";

const ExamplePage = () =>{
    const {
        isDarkmode,
        changeTheme
    } = useContext(GlobalContext) as GlobalContextType;

    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <Spinner/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Size</span>
                <div className="preview-box">
                    <Spinner size="small" />
                    <Spinner size="medium"/>
                    <Spinner size="large"/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Theme</span>
                <div className="preview-box" style={{flexDirection:'column'}}>
                    <IconButton
                        Icon={isDarkmode?(<PiMoon/>):(<PiSun/>)}
                        spacing='compact'
                        onClick={changeTheme}
                    />
                    <div
                        style={{display:"flex", gap:"var(--size-4)"}}
                    >
                        <div
                            style={{
                                padding:'var(--size-6)'
                            }}
                        >
                            <Spinner theme="default"/>
                        </div>
                        <div
                            style={{
                                padding:'var(--size-6)'
                            }}
                        >
                            <Spinner theme="primary"/>
                        </div>
                        <div
                            style={{
                                backgroundColor:'hsla(var(--def-color-neutral-dark-100))',
                                border:'1px solid hsla(var(--color-neutral-300))',
                                padding:'var(--size-6)',
                                borderRadius:'var(--size-2)'
                            }}
                        >
                            <Spinner theme="light"/>
                        </div>
                        <div
                            style={{
                                backgroundColor:'hsla(var(--def-color-neutral-100))',
                                border:'1px solid hsla(var(--color-neutral-300))',
                                padding:'var(--size-6)',
                                borderRadius:'var(--size-2)'
                            }}
                        >
                            <Spinner theme="dark"/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
import { useContext, useEffect, useState } from "react"
import Button from "../../../../components/button"
import { PiMoon, PiStarFourFill, PiSun } from "react-icons/pi"
import { LocalContext, LocalContextType } from "../context/local-context";
import Image from "../../../../components/image";
import IconButton from "../../../../components/icon-button";
import { GlobalContext, GlobalContextType } from "../../../../context/globalcontext";
import Modal from "../../../../components/modal";
import PillFlair from "../../../../components/pill-flair";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Pill and Its Colors</span>
                <div className="preview-box">
                    <PillFlair txtLabel="Info" appearance="pill" color="info" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Success" appearance="pill" color="success" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Warning" appearance="pill" color="warning" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Danger" appearance="pill" color="danger" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Default" appearance="pill" IconBefore={<PiStarFourFill/>}/>
                </div>
            </div>


            <div className="component-section">
                <span className="font-title">Status and Its Colors</span>
                <div className="preview-box">
                    <PillFlair txtLabel="Info" appearance="status" color="info"/>
                    <PillFlair txtLabel="Success" appearance="status" color="success"/>
                    <PillFlair txtLabel="Warning" appearance="status" color="warning"/>
                    <PillFlair txtLabel="Danger" appearance="status" color="danger"/>
                    <PillFlair txtLabel="Default" appearance="status"/>
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Text and Its Colors</span>
                <div className="preview-box">
                    <PillFlair txtLabel="Info" appearance="text" color="info" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Success" appearance="text" color="success" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Warning" appearance="text" color="warning" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Danger" appearance="text" color="danger" IconBefore={<PiStarFourFill/>}/>
                    <PillFlair txtLabel="Default" appearance="text" IconBefore={<PiStarFourFill/>}/>
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
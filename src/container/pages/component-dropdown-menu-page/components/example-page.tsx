import { useContext, useEffect, useMemo } from "react"
import Button from "../../../../components/button"
import { PiStarFourFill } from "react-icons/pi"
import { LocalContext, LocalContextType } from "../context/local-context";
import DropdownMenu from "../../../../components/dropdown-menu";
import { listOfMenu } from "../data/menuList";

const ExamplePage = () =>{
    const {
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    const menuList = useMemo(()=>(listOfMenu),[])

    useEffect(()=>{
        setTabSelected('example')
    },[])
    
    return(
        <div className="tab-content">
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabelOrIcon='Open Menu'
                        menuList={menuList}
                    />
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabelOrIcon={PiStarFourFill}
                        menuList={menuList} 
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Appearance</span>
                <div className="preview-box">
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabelOrIcon='Open Menu'
                        appearance="default"
                        menuList={menuList}
                    />
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabelOrIcon='Open Menu'
                        appearance="primary"
                        menuList={menuList}
                    />
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabelOrIcon='Open Menu'
                        appearance="warning"
                        menuList={menuList}
                    />
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabelOrIcon='Open Menu'
                        appearance="danger"
                        menuList={menuList}
                    />
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabelOrIcon='Open Menu'
                        appearance="subtle"
                        menuList={menuList}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Spacing</span>
                <div className="preview-box">
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabelOrIcon='Open Menu'
                        spacing="default"
                        menuList={menuList}
                    />
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabelOrIcon='Open Menu'
                        spacing="compact"
                        menuList={menuList}
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">With Charet</span>
                <div className="preview-box">
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabelOrIcon='Open Menu'
                        spacing="default"
                        isWithCaret
                        menuList={menuList} 
                    />
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import DropdownMenu from "../../../components/dropdown-menu";
import { PiDotsThreeOutlineVerticalFill, PiStarFourFill } from "react-icons/pi";

const ComponentDropdownMenuPage = () =>{
    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('dropdown-menu')
    },[])

    const menuList = [
        {
            id:'menu-1',
            menu:[
                {id:'edit', txtLabel:'Edit'}
            ]
        },
        {
            id:'menu-2',
            menu:[
                {id:'delete', txtLabel:'Delete'},
                {id:'report', txtLabel:'Report'}
            ]
        }
    ]

    return(
        <DetailTemplate 
            title="Dropdown Menu" 
            subTitle="A dropdown menu displays a list of actions or options to a user."
        >
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabel='Open Menu'
                        menuList={menuList}
                    />
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        IconLabel={PiStarFourFill}
                        menuList={menuList} 
                    />
                </div>
            </div>

            <div className="component-section">
                <span className="font-title">Appearance</span>
                <div className="preview-box">
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabel='Open Menu'
                        appearance="default"
                        menuList={menuList}
                    />
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabel='Open Menu'
                        appearance="primary"
                        menuList={menuList}
                    />
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabel='Open Menu'
                        appearance="warning"
                        menuList={menuList}
                    />
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabel='Open Menu'
                        appearance="danger"
                        menuList={menuList}
                    />
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabel='Open Menu'
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
                        txtLabel='Open Menu'
                        spacing="default"
                        menuList={menuList}
                    />
                    <DropdownMenu 
                        onClickItem={(buttonId)=>{console.log(buttonId)}}
                        txtLabel='Open Menu'
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
                        txtLabel='Open Menu'
                        spacing="default"
                        isWithCaret
                        menuList={menuList} 
                    />
                </div>
            </div>
        </DetailTemplate>
    )
}   

export default ComponentDropdownMenuPage
import { useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import Image from "../../../components/image";
import IconButton from "../../../components/icon-button";
import { GlobalContext, GlobalContextType } from "../../../context/globalcontext";
import { PiMoon, PiSun } from "react-icons/pi";

const ComponentImagePage = () =>{
    const {
        isDarkmode,
        changeTheme
    } = useContext(GlobalContext) as GlobalContextType;

    const {
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('image')
    },[])

    return(
        <DetailTemplate 
            title="Image" 
            subTitle="An image that changes in light or dark themes."
        >
            <div className="component-section">
                <span className="font-title">Default</span>
                <div className="preview-box">
                    <Image
						srcImage='https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg'
						alt='cat image'
						height={'300px'}
						width={'300px'}
						radius={'4'}
						objectFit='cover'
					/>
                </div>
            </div>
            <div className="component-section">
                <span className="font-title">With Darkmode Version</span>
                <div className="preview-box" style={{flexDirection:'column'}}>
                    <Image
						srcImage='https://www.thesprucepets.com/thmb/Pmt6S7VD7tdJ1cY6yBRoCAQA6EI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/twenty20_e47b3798-dd9b-40b1-91ef-1d820337966e-5aa3f798642dca00363b0df1.jpg'
						srcImageDark='https://mypetsays.co.uk/cdn/shop/articles/National_Black_Cat_Day.jpg?v=1695635944&width=800'
						alt='cat image'
						height={'300px'}
						width={'300px'}
						radius={'4'}
						objectFit='cover'
					/>
                    <IconButton
                        Icon={isDarkmode?(PiMoon):(PiSun)}
                        spacing='compact'
                        onClick={changeTheme}
                    />
                </div>
            </div>
        </DetailTemplate>
    )
}   

export default ComponentImagePage
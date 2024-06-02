import { useContext, useEffect } from "react"
import Button from "../../../../components/button"
import { PiMoon, PiStarFourFill, PiSun } from "react-icons/pi"
import { LocalContext, LocalContextType } from "../context/local-context";
import Image from "../../../../components/image";
import IconButton from "../../../../components/icon-button";
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
                    <IconButton
                        Icon={isDarkmode?(<PiMoon/>):(<PiSun/>)}
                        spacing='compact'
                        onClick={changeTheme}
                    />
                    <Image
						srcImage='https://www.thesprucepets.com/thmb/Pmt6S7VD7tdJ1cY6yBRoCAQA6EI=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/twenty20_e47b3798-dd9b-40b1-91ef-1d820337966e-5aa3f798642dca00363b0df1.jpg'
						srcImageDark='https://mypetsays.co.uk/cdn/shop/articles/National_Black_Cat_Day.jpg?v=1695635944&width=800'
						alt='cat image'
						height={'300px'}
						width={'300px'}
						radius={'4'}
						objectFit='cover'
					/>
                </div>
            </div>
        </div>
    )
}
export default ExamplePage
import { useContext } from 'react';
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import './styles.scss'
import { processClassname } from '../../../helper';
import IconButton from '../../../components/icon-button';
import { PiDevToLogo, PiMoon, PiSun } from 'react-icons/pi';
import PillFlair from '../../../components/pill-flair';
import { useNavigate } from 'react-router-dom';
import MainTemplateProvider, { MainTemplateContext, MainTemplateContextType } from './context/main-template-context';
import TemplateSidebarMenu from './components/sidebar-menu';
import TemplateDrawerMenu from './components/drawer-menu';
import TemplateHeaderMenu from './components/header-menu';
import Image from '../../../components/image';

type Props = {
    children?:JSX.Element
}

const MainTemplate = ({children}:Props) =>{

    const {
        mediaSize,
        isDarkmode,
        changeTheme
    } = useContext(GlobalContext) as GlobalContextType;
    
    const {
        contentPageRef
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const navigate = useNavigate()

    const onClcikHeaderMenu = (to?:string) =>{
        if(to){
            navigate(to)
        }
    }

    return(
        <div
            className={
                processClassname(`main-template
                ${mediaSize<2?('mobile'):('default')}`)
            } 
        >
            <div className='main-template-header' >
                <div className='header-theme' style={{display:`${mediaSize>1?('none'):('unset')}`}}>
                    <TemplateDrawerMenu onClcikHeaderMenu={onClcikHeaderMenu}/>
                </div>
                <div className='header-logo' style={{justifyContent:`${mediaSize>0?('start'):('center')}`}}>
                    <Image
                        srcImage='/assets/logo_personal.png'
                        height='32px'
                        width='32px'
                        radius='10px'
                    />
                    <div style={{display:`${mediaSize>0?('flex'):('none')}`, flexDirection:'column', justifyContent:'center'}}>
                        <p style={{fontSize:'12px', color:"hsl(var(--color-neutral-1100))"}}>Hilmi's</p>
                        <PillFlair type='text' txtLabel='React Component Collections' isBold color='info'/>
                    </div>
                </div>
                <div className='header-menu' style={{display:`${mediaSize>1?('unset'):('none')}`}}>
                    <TemplateHeaderMenu onClcikHeaderMenu={onClcikHeaderMenu}/>
                </div>
                <div className='header-theme'>
                    <IconButton
                        Icon={isDarkmode?(PiMoon):(PiSun)}
                        spacing='compact'
                        onClick={changeTheme}
                    />
                </div>
            </div>
            <div className='main-template-sidebar'>
                <TemplateSidebarMenu onClcikHeaderMenu={onClcikHeaderMenu}/>
            </div>
            <div ref={contentPageRef} className='main-template-content'>
                {children}
            </div>
        </div>
    )
}

const HocProvider = (x:{children:JSX.Element})=>{
    return(
        <MainTemplateProvider>
            <MainTemplate>
                {x.children}
            </MainTemplate>
        </MainTemplateProvider>
    )
}

export default HocProvider
import { useContext, useEffect } from 'react';
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import './styles.scss'
import { processClassname } from '../../../helper';
import { listHeaderMenu } from './data/list-header-menu';
import Button from '../../../components/button';
import ButtonGroup from '../../../components/button-group';
import IconButton from '../../../components/icon-button';
import { PiDevToLogo, PiMoon, PiSun } from 'react-icons/pi';
import PillFlair from '../../../components/pill-flair';
import DropdownMenuItemGroup from '../../../components/dropdown-menu-item-group';
import DropdownManuItem from '../../../components/dropdown-menu-item';
import { useNavigate } from 'react-router-dom';
import MainTemplateProvider, { MainTemplateContext, MainTemplateContextType } from './context/main-template-context';

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
        sidebarMenuList,
        sidebarMenuListSelected
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
                <div className='header-logo'>
                    <PiDevToLogo size={42} color='hsl(var(--color-neutral-1100))'/>
                    <div style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <p style={{fontSize:'12px', color:"hsl(var(--color-neutral-1100))"}}>Hilmi's</p>
                        <PillFlair type='text' txtLabel='React Component Collections' isBold color='info'/>
                    </div>
                </div>
                <div className='header-menu' style={{display:`${mediaSize>1?('unset'):('none')}`}}>
                    <ButtonGroup>
                        {
                            listHeaderMenu.map((itmMenu)=>(
                                <Button 
                                    key={itmMenu.id} 
                                    txtLabel={itmMenu.txtLabel}
                                    spacing='compact'
                                    appearance='subtle'
                                    onClick={()=>{onClcikHeaderMenu(itmMenu.to)}}
                                />
                            ))
                        }
                    </ButtonGroup>
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
                <div>
                    {
                        sidebarMenuList.map((itmGroupMenu, index)=>(
                            <DropdownMenuItemGroup txtLabel={itmGroupMenu.txtLabel} key={itmGroupMenu.id}>
                                {
                                    itmGroupMenu.menuList.map((itmMenu, index)=>(
                                        <DropdownManuItem  
                                            key={itmMenu.id} 
                                            txtLabel={itmMenu.txtLabel} 
                                            isDisabled={itmMenu.isDisabled} 
                                            isSelected={itmMenu.id===sidebarMenuListSelected}
                                            onClick={()=>{onClcikHeaderMenu(itmMenu.to)}}
                                        />
                                    ))
                                }
                            </DropdownMenuItemGroup>
                        ))
                    }
                </div>
            </div>
            <div className='main-template-content'>
                {children}
            </div>
        </div>
    )
}

export default (x:{children:JSX.Element})=>{
    return(
        <MainTemplateProvider>
            <MainTemplate>
                {x.children}
            </MainTemplate>
        </MainTemplateProvider>
    )
}
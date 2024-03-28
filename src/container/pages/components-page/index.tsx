import { Suspense, useContext, useEffect } from 'react';
import './styles.scss'
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import { Route, Routes, useLocation } from 'react-router-dom';
import ComponentButtonPage from '../component-button-page';
import ComponentDatePickerPage from '../component-date-picker-page';
import ComponentDrawerPage from '../component-drawer-page';
import ComponentDropdownMenuPage from '../component-dropdown-menu-page';
import ComponentFormFieldPage from '../component-form-field-page';
import ComponentImagePage from '../component-image-page';
import ComponentModalPage from '../component-modal-page';
import ComponentPillFlairPage from '../component-pill-flair-page';
import ComponentTablePage from '../component-table-page';
import route from './routes/routes';
import DetailTemplate from '../../templates/detail-template';
import { sidebarManuListDummy } from './data/menu-list';

const ComponentsPage = () =>{
    const {
        setSidebarManuList,
        setSidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const location = useLocation()

    useEffect(()=>{
        setSidebarManuList(sidebarManuListDummy)
    },[])

    useEffect(()=>{
        if(location.pathname==='/components'){
            setSidebarMenuListSelected('')
        }
    },[location])
    
    return(
        <Suspense fallback={<DetailTemplate title='.' subTitle='.'/>}>
            <Routes>
                {
                    route.map((itmRoute)=>(
                        <Route key={itmRoute.path} path={itmRoute.path} element={itmRoute.component}/>
                    ))         
                }
            </Routes>
        </Suspense>
        
    )
}

export default ComponentsPage
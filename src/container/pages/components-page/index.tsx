import { Suspense, useContext, useEffect } from 'react';
import './styles.scss'
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import { Route, Routes, useLocation } from 'react-router-dom';
import route from './routes/routes';
import DetailTemplate from '../../templates/detail-template';
import { sidebarManuListDummy } from './data/menu-list';

const ComponentsPage = () =>{
    const {
        setSidebarManuList,
        setSidebarMenuListSelected,
        setShowSubMenuDrawer
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const location = useLocation()

    useEffect(()=>{
        setSidebarManuList(sidebarManuListDummy)
        setShowSubMenuDrawer('components')
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
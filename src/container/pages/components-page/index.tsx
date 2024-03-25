import { useContext, useEffect } from 'react';
import './styles.scss'
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import { Route, Routes } from 'react-router-dom';
import ComponentButtonPage from '../component-button-page';
import ComponentDatePickerPage from '../component-date-picker-page';
import ComponentDrawerPage from '../component-drawer-page';
import ComponentDropdownMenuPage from '../component-dropdown-menu-page';
import ComponentFormFieldPage from '../component-form-field-page';
import ComponentImagePage from '../component-image-page';
import ComponentModalPage from '../component-modal-page';
import ComponentPillFlairPage from '../component-pill-flair-page';
import ComponentTablePage from '../component-table-page';

const ComponentsPage = () =>{
    const {
        setSidebarManuList,
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    
    
    useEffect(()=>{
        setSidebarManuList([
            {
                id:'components',
                txtLabel:'Components',
                menuList:[
                    {id:'button', txtLabel:'Button', to:'/components/button'},
                    {id:'date-picker', txtLabel:'Date Picker',to:'/components/date-picker'},
                    {id:'drawer', txtLabel:'Drawer', to:'/components/drawer'},
                    {id:'dropdown-menu', txtLabel:'Dropdown Menu', to:'/components/dropdown-menu'},
                    {id:'form-field', txtLabel:'Form Field', to:'/components/form-field'},
                    {id:'image', txtLabel:'Image', to:'/components/image'},
                    {id:'modal', txtLabel:'Modal', to:'/components/modal'},
                    {id:'pill-flair', txtLabel:'Pill and Flair', to:'/components/pill-flair'},
                    {id:'table', txtLabel:'Table', to:'/components/table'}
                ]
            },
            {
                id:'libraries',
                txtLabel:'Libraries',
                menuList:[
                    {id:'floating-ui', txtLabel:'Floating UI'},
                    {id:'react-day-picker', txtLabel:'React DayPicker'},
                ]
            }
        ])
    },[])

    return(
        <>
            <Routes>
                <Route path="/button" element={<ComponentButtonPage />}/>
                <Route path="/date-picker" element={<ComponentDatePickerPage />}/>
                <Route path="/drawer" element={<ComponentDrawerPage />}/>
                <Route path="/dropdown-menu" element={<ComponentDropdownMenuPage />}/>
                <Route path="/form-field" element={<ComponentFormFieldPage />}/>
                <Route path="/image" element={<ComponentImagePage />}/>
                <Route path="/modal" element={<ComponentModalPage />}/>
                <Route path="/pill-flair" element={<ComponentPillFlairPage />}/>
                <Route path="/table" element={<ComponentTablePage />}/>
            </Routes>
        </>
    )
}

export default ComponentsPage
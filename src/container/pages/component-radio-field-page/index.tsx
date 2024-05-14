import { Suspense, useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import LocalContextProvider, { LocalContext, LocalContextType } from "./context/local-context";
import { Navigate, Route, Routes } from "react-router-dom";
import route from "./routes/routes";

const ComponentRadioFieldPage = () =>{
    const {
        setSidebarMenuListSelected,
        setShowSubSubMenu,
        scrollToTop
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const {
        tabSelected,
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('radio-field')
        setShowSubSubMenu('form-field')
    },[])

    useEffect(()=>{
        scrollToTop()
    },[tabSelected])

    return(
        <DetailTemplate 
            title="Checkbox Field" 
            subTitle="A form allows users to input radio."
            tabList={[
                {id:'example', txtLabel:'Example', to:'example'},
                {id:'props', txtLabel:'Props', to:'props'},

            ]}
            selectedTab={tabSelected}
            setSelectedTab={setTabSelected}
        >   
            <Suspense fallback={<></>}>
                <Routes>
                    <Route key={''} path={'/'} element={<Navigate to="example" replace />}/>
                    {
                        route.map((itmRoute)=>(
                            <Route key={itmRoute.path} path={itmRoute.path} element={itmRoute.component}/>
                        ))
                    }     
                </Routes>
            </Suspense>
        </DetailTemplate>
    )
}

const HocProvider = ()=>{
    return(
        <LocalContextProvider>
            <ComponentRadioFieldPage/>
        </LocalContextProvider>
    )
}

export default HocProvider
import { Suspense, useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import LocalContextProvider, { LocalContext, LocalContextType } from "./context/local-context";
import { Navigate, Route, Routes } from "react-router-dom";
import route from "./routes/routes";

const ComponentSplitButtonPage = () =>{
    const {
        setSidebarMenuListSelected,
        scrollToTop,
        setShowSubSubMenu
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const {
        tabSelected,
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('split-button')
        setShowSubSubMenu('button-main')
    },[])

    useEffect(()=>{
        scrollToTop()
    },[tabSelected])
    return(
        <DetailTemplate 
            title="Split Button" 
            subTitle="A split button lets people perform an action or choose from a small group of similar actions."
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
            <ComponentSplitButtonPage/>
        </LocalContextProvider>
    )
}

export default HocProvider
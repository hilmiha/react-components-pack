import { Suspense, useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import { PiStarFourFill } from "react-icons/pi";
import IconButton from "../../../components/icon-button";
import LocalContextProvider, { LocalContext, LocalContextType } from "./context/local-context";
import { Navigate, Route, Routes } from "react-router-dom";
import route from "./routes/routes";

const ComponentIconButtonPage = () =>{
    const {
        setSidebarMenuListSelected,
        scrollToTop
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const {
        tabSelected,
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('icon-button')
    },[])

    useEffect(()=>{
        scrollToTop()
    },[tabSelected])

    return(
        <DetailTemplate 
            title="Icon Button" 
            subTitle="An icon-only button lets people take a common and recognizable action where space is limited."
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
            <ComponentIconButtonPage/>
        </LocalContextProvider>
    )
}

export default HocProvider
import { Suspense, useContext, useEffect, useState } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import Button from '../../../components/button';
import { PiStarFourFill } from 'react-icons/pi';
import LocalContextProvider, { LocalContext, LocalContextType } from "./context/local-context";
import { Navigate, Route, Routes } from "react-router-dom";
import ExamplePage from "./components/example-page";
import CodePage from "./components/props-page";
import route from "./routes/routes";

const ComponentButtonPage = () =>{
    const {
        setSidebarMenuListSelected,
        scrollToTop
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const {
        tabSelected,
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;

    useEffect(()=>{
        setSidebarMenuListSelected('button')
    },[])

    useEffect(()=>{
        scrollToTop()
    },[tabSelected])

    return(
        <DetailTemplate 
            title="Button" 
            subTitle="A button triggers an event or action. They let users know what will happen next."
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
            <ComponentButtonPage/>
        </LocalContextProvider>
    )
}

export default HocProvider
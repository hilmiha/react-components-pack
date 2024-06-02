import { Suspense, useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import LocalContextProvider, { LocalContext, LocalContextType } from "./context/local-context";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import route from "./routes/routes";
import ButtonGroup from "../../../components/button-group";
import Button from "../../../components/button";

const ComponentAccordionPage = () =>{
    const {
        setSidebarMenuListSelected,
        scrollToTop
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    const {
        tabSelected,
        setTabSelected
    } = useContext(LocalContext) as LocalContextType;
    
    const navigate = useNavigate()
    
    const onClickButton = (to:string) =>{
        setTabSelected(to)
        navigate(to)
    }

    useEffect(()=>{
        setSidebarMenuListSelected('accordion')
    },[])

    useEffect(()=>{
        scrollToTop()
    },[tabSelected])
    
    return(
        <DetailTemplate 
            title="Accordion" 
            subTitle="The Accordion component organizes content into collapsible sections with clickable headers, optimizing space and enhancing user navigation."
            headerAdditionaContent={
                <ButtonGroup>
                    <Button
                        txtLabel='Overview'
                        spacing='compact'
                        onClick={()=>{onClickButton('overview')}}
                        isSelected={tabSelected==='overview'}
                    />
                    <Button
                        txtLabel='API Reference'
                        spacing='compact'
                        onClick={()=>{onClickButton('api')}}
                        isSelected={tabSelected==='api'}
                    />
                </ButtonGroup>
            }
        >
            <Suspense fallback={<></>}>
                <Routes>
                    <Route key={''} path={'/*'} element={<Navigate to="overview" replace />}/>
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
            <ComponentAccordionPage/>
        </LocalContextProvider>
    )
}

export default HocProvider
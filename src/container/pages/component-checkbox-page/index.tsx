import { Suspense, useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import LocalContextProvider, { LocalContext, LocalContextType } from "./context/local-context";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import route from "./routes/routes";
import ButtonGroup from "components/button-group";
import Button from "components/button";

const ComponentCheckboxPage = () =>{
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
        setSidebarMenuListSelected('checkbox')
    },[])

    useEffect(()=>{
        scrollToTop()
    },[tabSelected])
    
    return(
        <DetailTemplate 
            title="Checkbox" 
            subTitle="Checkboxes allow users to select multiple items from a list of individual items, or to mark one individual item as selected."
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
            <ComponentCheckboxPage/>
        </LocalContextProvider>
    )
}

export default HocProvider
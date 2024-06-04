import { Suspense, useContext, useEffect } from "react";
import DetailTemplate from "../../templates/detail-template"
import { MainTemplateContext, MainTemplateContextType } from "../../templates/main-template/context/main-template-context";
import LocalContextProvider, { LocalContext, LocalContextType } from "./context/local-context";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import route from "./routes/routes";
import ButtonGroup from "components/button-group";
import Button from "components/button";

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

    const navigate = useNavigate()

    const onClickButton = (to:string) =>{
        setTabSelected(to)
        navigate(to)
    }

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
import { useContext, useState } from "react"
import { has } from "lodash"
import { Route, Routes } from "react-router-dom"
import { ModuleContext } from "./ModuleContext/ModuleContext"
import MainDashboardTemplate from "../../template/main-dashboard-template"
import Text from "../../components/Text"
import ButtonPage from "./pages/ButtonPage"
import FormInputPage from "./pages/FormInputPage"
import IconPage from "./pages/IconPage"
import MenuButtonGroup from "../../components/MenuButtonGroup"
import MenuButton from "../../components/MenuButton"
import HocProvider from "./HocProvider"
import MenuButtonPage from "./pages/MenuButtonPage"

const ComponentPages = () =>{

    const {
        isShowMenuDrawer, 
        setShowMenuDarwer,
        sideMenu,
        onClickSideMenuItem
    } = useContext(ModuleContext)

    return(
        <MainDashboardTemplate
            sidebarComponent={
                <div>
                    <Text className={'sidebar-menu-title'} textLabel={'Components'} isBold={true}/>
                    {
					sideMenu.map((itemSideMenu)=>{
						if(has(itemSideMenu, 'listSubmenu')){
							return(
								<MenuButtonGroup
									key={itemSideMenu.key} 
                                    parentItem={itemSideMenu}
									label={itemSideMenu.label}
									subLabel={itemSideMenu.subLabel}
									listSubmenu={itemSideMenu.listSubmenu}
									iconLeftName={itemSideMenu.iconLeftName}
                                    isActive={itemSideMenu.isActive}
                                    isParentInteractive={itemSideMenu.isParentInteractive}
									level={0}
									onClick={(itemSideMenu)=>{onClickSideMenuItem(itemSideMenu)}}
								/>
							)
						}else{
							return(
								<MenuButton 
									key={itemSideMenu.key} 
									label={itemSideMenu.label}
									subLabel={itemSideMenu.subLabel}
									isActive={itemSideMenu.isActive}
									iconLeftName={itemSideMenu.iconLeftName}
									onClick={()=>{onClickSideMenuItem(itemSideMenu)}}
								/>
							)
						}
					})
				}
                </div>
            }
            isShowDrawerSidebar={isShowMenuDrawer}
            setShowDrawerSidebar={setShowMenuDarwer}
			contentComponent={
				<Routes>
                    <Route path='button' element={<ButtonPage/>} />
                    <Route path='form-input' element={<FormInputPage/>} />
                    <Route path='form-input/text' element={<>Form Input Text</>} />
                    <Route path='form-input/number' element={<>Form Input Number</>} />
                    <Route path='form-input/money' element={<>Form Input Money</>} />
                    <Route path='form-input/selection' element={<>Form Input Select</>} />
                    <Route path='form-input/date' element={<>Form Input Date</>} />
                    <Route path='form-input/checkbox' element={<>Form Input Checkbox</>} />
                    <Route path='icon' element={<IconPage/>} />
                    <Route path='menu-button' element={<MenuButtonPage/>} />
				</Routes>
			}
        />
    )
}

export default HocProvider(ComponentPages)
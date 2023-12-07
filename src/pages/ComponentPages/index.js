import { useState } from "react"
import { has } from "lodash"
import { Route, Routes, useNavigate } from "react-router-dom"
import MainDashboardTemplate from "../../template/main-dashboard-template"
import sidebarMenuList from './data/sidebarMenuList.json'
import Text from "../../components/Text"
import ButtonPage from "./pages/ButtonPage"
import FormInputPage from "./pages/FormInputPage"
import IconPage from "./pages/IconPage"
import MenuButtonGroup from "../../components/MenuButtonGroup"
import MenuButton from "../../components/MenuButton"
import * as controller from './controller/controllerMain'

const ComponentPages = () =>{

	const navigate = useNavigate()

    const [isShowMenuDrawer, setShowMenuDarwer] = useState(false)
    const [sideMenu, setSideMenu] = useState(sidebarMenuList)

    const getState = () =>{
        return {
			navigate,
            isShowMenuDrawer, 
            setShowMenuDarwer,
            sideMenu, 
            setSideMenu,
        }
    }

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
									onClick={(menuKey)=>{controller.onClickSideMenuItem(menuKey, getState())}}
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
									onClick={()=>{controller.onClickSideMenuItem(itemSideMenu, getState())}}
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
                    <Route path='menu-button' element={<>Menu Button</>} />

				</Routes>
			}
        />
    )
}

export default ComponentPages
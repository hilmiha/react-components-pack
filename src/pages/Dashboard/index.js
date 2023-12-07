import { useState } from "react"
import { has } from "lodash"
import ButtonMenuGroup from "../../components/ButtonMenuGroup"
import ButtonMenu from "../../components/buttonMenu"
import MainDashboardTemplate from "../../template/main-dashboard-template"
import sidebarMenuList from './data/sidebarMenuList.json'
import * as controller from './controller/controllerMain'
import Text from "../../components/Text"

const Dashboard = () =>{

    const [isShowMenuDrawer, setShowMenuDarwer] = useState(false)
    const [sideMenu, setSideMenu] = useState(sidebarMenuList)

    const getState = () =>{
        return {
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
								<ButtonMenuGroup
									key={itemSideMenu.key} 
                                    parentKey={itemSideMenu.key}
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
								<ButtonMenu 
									key={itemSideMenu.key} 
									label={itemSideMenu.label}
									subLabel={itemSideMenu.subLabel}
									isActive={itemSideMenu.isActive}
									iconLeftName={itemSideMenu.iconLeftName}
									onClick={()=>{controller.onClickSideMenuItem(itemSideMenu.key, getState())}}
								/>
							)
						}
					})
				}
                </div>
            }
            isShowDrawerSidebar={isShowMenuDrawer}
            setShowDrawerSidebar={setShowMenuDarwer}
        />
    )
}

export default Dashboard
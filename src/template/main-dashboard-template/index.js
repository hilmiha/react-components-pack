import { useContext, useState } from 'react'
import Button from '../../components/button'
import './styles.css'
import { GlobalContext } from '../../context/GlobalContext'
import Drawer from '../../components/Drawer'

const MainDashboardTemplate = ({
    headerComponent,
    sidebarComponent,
    isShowDrawerSidebar, 
    setShowDrawerSidebar,
    contentComponent
}) =>{
    const {
        screeenType
    } = useContext(GlobalContext)

    return(
        <>
            <div 
                className="mdt-container"
                style={{
                    gridTemplateColumns:(screeenType>1)?('300px 1fr'):('0px 1fr')
                }}
            >
                <div className="mdt-header-container">
                    {headerComponent}
                    {
                        (screeenType<=1)&&(
                            <div className='mdt-header-expand-button-countiner'>
                                <Button type={'text'} iconLeftName={'list'} isDisabled={false} onClick={()=>{setShowDrawerSidebar(true)}}/>
                            </div>
                        )
                    }
                </div>
                {
                    (screeenType>1)&&(
                        <div className="mdt-sidebar-container">
                            {sidebarComponent}
                        </div>
                    )
                }
                <div className="mdt-content-container">
                    {contentComponent}
                </div>
            </div>
            {
                (isShowDrawerSidebar)&&(
                    <Drawer
                        drawerContent={sidebarComponent}
                        onClickClose={()=>{setShowDrawerSidebar(false)}}
                    />
                )
            }
            
        </>
    )
}

export default MainDashboardTemplate
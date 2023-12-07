export const onClickSideMenuItem = (menuKey, viewState) =>{
    let jsonString = JSON.stringify(viewState.sideMenu).replace('"isActive":true', '').replace(/\,\}/g, '}').replace(/\,\,/g,',')
    jsonString = jsonString.replace(`"key":"${menuKey}"`, `"key":"${menuKey}","isActive":true,`).replace(/\,\}/g, '}').replace(/\,\,/g,',')
    viewState.setSideMenu(JSON.parse(jsonString))
    setTimeout(()=>{
        viewState.setShowMenuDarwer(false)
    },[100])
}
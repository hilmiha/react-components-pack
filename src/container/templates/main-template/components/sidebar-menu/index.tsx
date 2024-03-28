import { useContext } from "react";
import { MainTemplateContext, MainTemplateContextType } from "../../context/main-template-context";
import DropdownMenuItemGroup from "../../../../../components/dropdown-menu-item-group";
import DropdownManuItem from "../../../../../components/dropdown-menu-item";
import { useNavigate } from "react-router-dom";

type Props = {
    onClcikHeaderMenu:(to?:string)=>void
}

const TemplateSidebarMenu = ({
    onClcikHeaderMenu
}:Props) =>{
    const {
        sidebarMenuList,
        sidebarMenuListSelected
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    return(
        <div>
            {
                sidebarMenuList.map((itmGroupMenu, index)=>(
                    <DropdownMenuItemGroup txtLabel={itmGroupMenu.txtLabel} key={itmGroupMenu.id}>
                        {
                            itmGroupMenu.menuList.map((itmMenu, index)=>(
                                <DropdownManuItem  
                                    key={itmMenu.id} 
                                    txtLabel={itmMenu.txtLabel} 
                                    isDisabled={itmMenu.isDisabled} 
                                    isSelected={itmMenu.id===sidebarMenuListSelected}
                                    onClick={()=>{onClcikHeaderMenu(itmMenu.to)}}
                                />
                            ))
                        }
                    </DropdownMenuItemGroup>
                ))
            }
        </div>
    )
}

export default TemplateSidebarMenu;
import { codePreviewAsSelection } from "../../../data/code-list"
import { listMenu } from "../../../data/menuList"
import PreviewNCode from "components/preview-n-code"
import DropdownMenu from "components/dropdown-menu"
import { useState } from "react"

const AsSelectionSection = () =>{
    
    const [menuSelected, setMenuSelected] = useState<string[]>([])

    const onMenuSelected = (buttonId:string) =>{
        setMenuSelected((prev)=>{
            if(prev.includes(buttonId)){
                return(prev.filter((itm)=>itm!==buttonId))
            }else{
                return([...prev, buttonId])
            }
        })
    }

    return(
        <div className="component-section">
            <span className="font-title-large">Dropdown menu as selection</span>
            <p className="font-text">A dropdown menu component can also functions as a selection field, allowing users to choose an item from a list when the menu is open.</p>
            <PreviewNCode
                code={codePreviewAsSelection}
                language=""
            >
                <DropdownMenu
                    TxtLabelOrIcon="Open Menu"
                    menuList={listMenu}
                    menuListSelected={menuSelected}
                    isSelected={menuSelected.length>0}
                    isWithCheckbox={true}
                    onClickItem={(buttonId)=>{onMenuSelected(buttonId)}}
                />
            </PreviewNCode>
        </div>
    )
}

export default AsSelectionSection
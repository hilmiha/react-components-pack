import Button from "../../../../../components/button"
import ButtonGroup from "../../../../../components/button-group"
import { listHeaderMenu } from "../../data/list-header-menu"

type Props = {
    onClcikHeaderMenu:(to?:string)=>void
}

const TemplateHeaderMenu = ({
    onClcikHeaderMenu
}:Props) =>{
    return(
        <ButtonGroup>
            {
                listHeaderMenu.map((itmMenu)=>(
                    <Button 
                        key={itmMenu.id} 
                        txtLabel={itmMenu.txtLabel}
                        spacing='compact'
                        appearance='subtle'
                        onClick={()=>{onClcikHeaderMenu(itmMenu.to)}}
                    />
                ))
            }
        </ButtonGroup>
    )
}

export default TemplateHeaderMenu;
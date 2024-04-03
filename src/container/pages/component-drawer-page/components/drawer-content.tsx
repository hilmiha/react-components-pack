import { useEffect } from "react"
import { drawerSizeType } from "../../../../components/drawer"
import Button from "../../../../components/button"

type Props = {
    setDrawerSize:React.Dispatch<React.SetStateAction<drawerSizeType>>
}
const DrawerContent = ({
    setDrawerSize
}:Props) =>{
    useEffect(()=>{
        setDrawerSize('small')
    },[])
    return(
        <>
            <div style={{color:'hsl(var(--color-neutral-1100))', display:'flex', gap:'var(--size-8)', marginBottom:'20px'}}> 
                <Button txtLabel="Small" onClick={()=>{setDrawerSize('small')}}/>
                <Button txtLabel="Medium"  onClick={()=>{setDrawerSize('medium')}}/>
                <Button txtLabel="Full"  onClick={()=>{setDrawerSize('full')}}/>
            </div>
            <p className="font-text">{"<-- Drawer Content Here -->"}</p>
        </>
        
    )
}

export default DrawerContent
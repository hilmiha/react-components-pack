import './styles.css'
import Button from "../Button"
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../context/GlobalContext'

const Drawer = ({
    drawerContent,
    size,
    isFromRight,
    onClickClose,
    buttonCloseName,
}) =>{
    
    const {
        screeenType
    } = useContext(GlobalContext)

    const [drawerGridColumns, setDrawerGridColums] = useState(undefined)
    const [drawerGridRow, setDrawerGridRows] = useState(undefined)

    const generateDrawerSize = () => {
        if(!isFromRight){
            if(screeenType < 1){
                setDrawerGridColums('0px 1fr 0px')
                setDrawerGridRows('56px 1fr')
            }else{
                if(size==='narrow'){
                    setDrawerGridColums('56px 420px 1fr')
                    setDrawerGridRows('0px 1fr')
                }else if(size==='medium'){
                    setDrawerGridColums('56px 60% 1fr')
                    setDrawerGridRows('0px 1fr')
                }else if(size==='full'){
                    setDrawerGridColums('56px 1fr 0px')
                    setDrawerGridRows('0px 1fr')
                }else{
                    setDrawerGridColums('56px 420px 1fr')
                    setDrawerGridRows('0px 1fr')
                }
            }
        }else{
            if(screeenType < 1){
                setDrawerGridColums('0px 1fr 0px')
                setDrawerGridRows('56px 1fr')
            }else{
                if(size==='narrow'){
                    setDrawerGridColums('1fr 56px 420px')
                    setDrawerGridRows('0px 1fr')
                }else if(size==='medium'){
                    setDrawerGridColums('1fr 56px 60%')
                    setDrawerGridRows('0px 1fr')
                }else if(size==='full'){
                    setDrawerGridColums('1fr 56px 1fr')
                    setDrawerGridRows('0px 1fr')
                }else{
                    setDrawerGridColums('1fr 56px 420px')
                    setDrawerGridRows('0px 1fr')
                }
            }
        }
        
    }

    useEffect(()=>{
        generateDrawerSize()
    },[screeenType])

    return(
        <div 
            className="drawer-container"
            style={{
                gridTemplateColumns:drawerGridColumns,
                gridTemplateRows:drawerGridRow,
                display:(drawerGridColumns && drawerGridRow)?('grid'):('none')
            }}
        >
            {
                (screeenType < 1)&&(
                    <div 
                        className="drawer-top-container"
                        style={{
                            gridColumn:'1 / 3'
                        }}
                    >
                        <Button type={'text'} iconLeftName={buttonCloseName?(buttonCloseName):('arrow-left')} onClick={(onClickClose)?(onClickClose):(undefined)}/>
                    </div>
                )
            }
            {
                (screeenType >= 1)&&(
                    <div 
                        className="drawer-side-container"
                        style={{
                            gridColumn:(isFromRight)?('2 / 3'):('1 / 2')
                        }}
                    >
                        <Button type={'text'} iconLeftName={buttonCloseName?(buttonCloseName):('arrow-left')} onClick={(onClickClose)?(onClickClose):(undefined)}/>
                    </div>
                )
            }
            <div 
                className="drawer-content-container"
                style={{
                    gridColumn:(isFromRight)?('3 / 4'):('2 / 3')
                }}
            >
                {drawerContent}
            </div>
            <div 
                className="drawer-void-container"
                style={{
                    gridColumn:(isFromRight)?('1 / 2'):('3 / 4')
                }}
                onClick={onClickClose}
            />
        </div>
    )
}

export default Drawer
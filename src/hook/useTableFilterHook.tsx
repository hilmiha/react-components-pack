import { useEffect, useMemo } from "react"
import { tableFilterType } from "../components/table_new"
import useFormHook from "./useFormHook"

type Props = {
    filterValue:tableFilterType,
    form:Record<any, any>
    setForm:React.Dispatch<any>
    onApplyFilter:(filterValue:tableFilterType)=>void
    onCloseModal:()=>void
}
const useTableFilterHook = ({
    filterValue,
    form,
    setForm,
    onApplyFilter,
    onCloseModal
}:Props) =>{

    const applyedForm = useMemo(()=>{
        if(filterValue){
            return({...filterValue})
        }else{
            return({...form})
        }
    },[])

    const emptyForm = useMemo(()=>{
        return({...form})
    },[])

    const {
        onChange
    } = useFormHook({
        form,
        setForm
    })

    const isFormChange = useMemo(()=>{
        console.log(JSON.stringify(form))
        console.log(JSON.stringify(applyedForm))
        return(JSON.stringify(form)!==JSON.stringify(applyedForm))
    },[form, applyedForm])

    const isFormEmpty = useMemo(()=>{
        return(JSON.stringify(form)===JSON.stringify(emptyForm))
    },[form])

    const onClickApply = () =>{
        if(isFormEmpty){
            onApplyFilter(undefined)
        }else{
            onApplyFilter({...form})
        }

        onCloseModal()
    }

    const onClickReset = () =>{
        setForm({...emptyForm})
    }

    const onCancel = () =>{
        onCloseModal()
    }

    useEffect(()=>{
        if(filterValue){
            setForm({...filterValue})
        }
    },[])

    return({
        onChange,
        isFormChange,
        onClickApply,
        onClickReset,
        onCancel
    })
}

export default useTableFilterHook
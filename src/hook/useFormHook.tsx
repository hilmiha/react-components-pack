import { formatText } from "helper";
import { errorType } from "../components/text-field";
import { useEffect, useState } from "react";

type Props = {
    form:Record<any, any>,
    setForm:React.Dispatch<React.SetStateAction<any>>,
    formError?:Record<any, errorType>,
    setFormError?:React.Dispatch<React.SetStateAction<Record<any, errorType>>>,
    formConfig?:Record<any, any>
    submitFunction?:()=>void
}
const useFormHook = ({
    form,
    setForm,
    formError,
    setFormError,
    submitFunction
}:Props) => {

    const [validateAllTrigger, setValidateAllTrigger] = useState< 0 | 1 >(0)
    const [submitClicked, setSubmitClicked] = useState(false)

    const onSubmit = () =>{
        setValidateAllTrigger(1)
        setSubmitClicked(true)
    }

    useEffect(()=>{
        if(validateAllTrigger!==0){
            setValidateAllTrigger(0)
        }
        if(submitClicked && validateAllTrigger===0 && submitFunction){
            let isFormHasError = false
            for (const key in formError) {
                if(formError[key].isError){
                    isFormHasError = true
                }
            }

            if(!isFormHasError){
                submitFunction()
            }
        }
    },[validateAllTrigger])

    const onChange = (key:string, newValue:any) =>{
        setForm((prev:Record<any,any>)=>{
            const tamp = {...prev}
            tamp[key] = newValue
            return tamp
        })

        if(formError && setFormError){
            if(formError[key].isError){
                setFormError((prev)=>{
                    const tamp = {...prev}
                    tamp[key] = {isError:false, errorMessage:''}
                    return tamp
                })
            }
        }
        
    }

    const onValidate = (key:string, errorResult:errorType) =>{
        if(formError && setFormError){
            setFormError((prev)=>{
                const tamp = {...prev}
                tamp[key] = errorResult
                return tamp
            })
        }
    }

    return({
        onChange,
        onValidate,
        onSubmit,
        validateAllTrigger
    })
}

export default useFormHook

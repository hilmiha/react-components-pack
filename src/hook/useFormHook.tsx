import { errorType } from "../components/text-field";

type Props = {
    form:Record<any, any>,
    setForm:React.Dispatch<React.SetStateAction<any>>,
    formError?:Record<any, errorType>,
    setFormError?:React.Dispatch<React.SetStateAction<Record<any, errorType>>>,
}
const useFormHook = ({
    form,
    setForm,
    formError,
    setFormError
}:Props) => {

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
        onValidate
    })
}

export default useFormHook
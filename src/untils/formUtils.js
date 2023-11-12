export const getInitialFormStatus = (form) =>{
    const tampFormErrorStatus = {}
    for (const key in form) {
        tampFormErrorStatus[key] = {status:false, message:''}
    }
    
    return(tampFormErrorStatus)
}
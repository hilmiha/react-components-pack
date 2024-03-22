export const processClassname = (className:string):string =>{
    return className.replace(/\n/g,' ').replace(/\s+/g,' ').trim()
}

type formatTextType = 'text' | 'text-no-space' | 'text-only-number' | 'text-number'

export const formatText = (type:formatTextType, value:string | number) =>{
    let formatedText:any = ''
    let realValue:any = ''

    switch (type) {
        case 'text-no-space':
            formatedText = (value && typeof value==='string')?value.replace(/\s/g, ''):''
            realValue = formatedText
            break;
        
        case 'text-only-number':
            formatedText = (value && typeof value==='string')?value.replace(/[^0-9]+/g, ""):''
            realValue = formatedText
            break;

        case 'text-number':
            let number = parseFloat(value.toString().replace(/[^0-9]+/g, "")).toString().slice(0,13).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            formatedText = (number==='NaN')?(''):(number)
            realValue = ((number==='NaN')?(undefined):(parseFloat(formatedText.replace(/[^0-9]+/g, ""))))
            break;
    
        default:
            formatedText = value?value:''
            realValue = formatedText
            break;
    }

    return({formatedText, realValue})
}

export const generateErrorState = (form:Record<any, any>) => {
    let tampError:Record<any, {isError:boolean, errorMessage:string}> = {}
    for (const property in form) {
        tampError[property] = {isError:false, errorMessage:''}
    }
    return tampError
}
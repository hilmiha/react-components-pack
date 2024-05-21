export const processClassname = (className:string):string =>{
    return className.replace(/\n/g,' ').replace(/\s+/g,' ').trim()
}

type formatTextType = 'text' | 'text-no-space' | 'text-only-number' | 'text-number' | 'text-number-float'

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
        
        case 'text-number-float':
            const valueSplit = value.toString().split(',')
            console.log(valueSplit)
            const frontNumber = valueSplit[0]?(parseFloat(valueSplit[0].toString().replace(/[^0-9]+/g, "")).toString().slice(0,13).replace(/\B(?=(\d{3})+(?!\d))/g, ".")):('')
            const isHasDot = value.toString().includes(',')
            const backNumber = valueSplit[1]?(valueSplit[1].toString().replace(/[^0-9]+/g, "").toString().slice(0,13).replace(/\B(?=(\d{3})+(?!\d))/g, ".")):('')
            
            if(parseFloat(frontNumber) === 0 && !backNumber){
                formatedText = isHasDot?('0,'):('0')
                realValue = formatedText
            }else{
                formatedText = `${frontNumber}${isHasDot?(','):('')}${backNumber}`
                realValue = formatedText
            }
            
            break;

        case 'text-number':
            let number = parseFloat(value.toString().replace(/[^0-9]+/g, "")).toString().slice(0,13).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
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
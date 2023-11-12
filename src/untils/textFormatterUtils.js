export const formatText = (type, value) =>{
    let formatedText = ''
    let realValue = ''
    switch (type) {
        case 'text-no-space':
            formatedText = value.replace(/\s/g, '')
            realValue = formatedText
            break;
        
        case 'money':
            let front = parseFloat(value.toString().replace(/[^0-9]+/g, "")).toString().slice(0,13).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            formatedText = (front==='NaN')?(''):(`${front}.00`)
            realValue = ((front==='NaN')?(''):(parseFloat(formatedText.replace(/[^0-9]+/g, ""))))
            break;

        case 'number':
            let number = parseFloat(value.toString().replace(/[^0-9]+/g, "")).toString().slice(0,13).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            formatedText = (number==='NaN')?(''):(number)
            realValue = ((number==='NaN')?(''):(parseFloat(formatedText.replace(/[^0-9]+/g, ""))))
            break;

        case 'number-string':
            formatedText = value.replace(/[^0-9]+/g, "")
            realValue = formatedText
            break;

        case 'number-dashed':
            let numberStringDash = (value.toString().replace(/[^0-9]+/g, "")).match(/.{1,4}/g)
            formatedText = (numberStringDash)?((value.replace(/[^0-9]+/g, "")).match(/.{1,4}/g).join('-')):('')
            realValue = formatedText
            break;

        case 'mobile':
            let mobile = value.replace(/[^0-9]+/g, "")
            formatedText =(
                (mobile.substring(0,2)?('+'+mobile.substring(0,2)):('')) + 
                (mobile.substring(2,5)?('-'+mobile.substring(2,5)):('')) +
                (mobile.substring(5,9)?('-'+mobile.substring(5,9)):('')) +
                (mobile.substring(9,13)?('-'+mobile.substring(9,13)):(''))
            )
            realValue = mobile
            break;

        case 'phone':
            let phone = value.replace(/[^0-9]+/g, "")
            formatedText =(
                (phone.substring(0,2)?('+'+phone.substring(0,2)):('')) + 
                (phone.substring(2,4)?('-'+phone.substring(2,4)):('')) +
                (phone.substring(4,8)?('-'+phone.substring(4,8)):('')) +
                (phone.substring(8,12)?('-'+phone.substring(8,12)):(''))
            )
            realValue = phone
            break;

        case 'ip':
            let ip = value.replace(/[^0-9.]+/g, "").replace(/^\./g,'0.').replace(/\.\.+/g,'.0.').slice(0,15).split('.')
            let finalIp = []
            ip.forEach((item)=>{
                if(item.length>3){
                    finalIp = [...finalIp, ...(item.match(/.{1,3}/g))]
                }else{
                    finalIp.push(item)
                }
            })

            if(finalIp.length>4){
                formatedText = undefined
            }else{
                formatedText = finalIp.slice(0, 4).join('.')
            }

            realValue = formatedText
            break;

        // case 'dateTime':
        //     let dateTime = new Date(value)
        //     console.log()
            
        //     formatedText = format(dateTime, 'dd MMM yyyy, HH:mm:ss')
        //     realValue = (dateTime)
        //     break;
    
        default:
            break;
    }
    return([formatedText, realValue])
}
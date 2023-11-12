import { colorListPage1, colorListPage2, colorListPage3, colorListSearchResultPag1, colorListSearchResultPag2 } from "../data/dropDownData"

export const onChangeFieldValue = (key, newValue, viewState) =>{
    if(key){
        const tampForm = {...viewState.form}
        if(newValue !== tampForm[key]){
            tampForm[key] = newValue 
            viewState.setForm(tampForm)

            const tampFormErrorStatus = {...viewState.formErrorStatus}
            tampFormErrorStatus[key].status = false
            tampFormErrorStatus[key].message = ''
            viewState.setFormErrorStatus(tampFormErrorStatus)
        }
        
    }
}

export const onValidateFileldValue = (key, newValue, validationList, viewState) =>{
    let tampStatus = false
    let tampErrorMessage = ''
    validationList?.every((validationType)=>{
        if(!tampStatus){
            if(validationType==='mandatory'){
                tampStatus = (newValue==='' || newValue===null || newValue===undefined)
                tampErrorMessage = (tampStatus)?('This Field Is Mandatory'):('')
            }
        }else{
            return false
        }
    })

    if(key){
        const tampFormErrorStatus = {...viewState.formErrorStatus}
        tampFormErrorStatus[key].status = tampStatus
        tampFormErrorStatus[key].message = tampErrorMessage
        viewState.setFormErrorStatus(tampFormErrorStatus)
    }
}

export const getColorList = async (viewState) =>{
    console.log('call api getColorList')

    //Simulasi Change With API CALL
    const tampColorListPaginationConfig = {...viewState.colorListPaginationConfig}
    if(tampColorListPaginationConfig.searchKey){
        tampColorListPaginationConfig.page = tampColorListPaginationConfig.page + 1
        tampColorListPaginationConfig.maxPage = 1
    }else{
        tampColorListPaginationConfig.page = tampColorListPaginationConfig.page + 1
        tampColorListPaginationConfig.maxPage = 3
    }

    await new Promise((resolve) => {
        setTimeout(() => {
            let tampColorList = []
            
            if(tampColorListPaginationConfig.searchKey){
                // if(tampColorListPaginationConfig.page===1){
                //     tampColorList = tampColorList.concat(colorListSearchResultPag1)
                // }else if(tampColorListPaginationConfig.page===2){
                //     tampColorList = [...viewState.colorList, ...colorListSearchResultPag2]
                // }
            }else{
                if(tampColorListPaginationConfig.page===1){
                    tampColorList.push({id:'_empty', label:'-- Select --', value:''},)
                    tampColorList = tampColorList.concat(colorListPage1)
                }else if(tampColorListPaginationConfig.page===2){
                    tampColorList = [...viewState.colorList, ...colorListPage2]
                }else{
                    tampColorList = [...viewState.colorList, ...colorListPage3]
                }
            }

            viewState.setColorListReady(true)
            viewState.setColorList(tampColorList)
            viewState.setColorListPaginationConfig(tampColorListPaginationConfig)

            resolve()
        }, 500);
    });	
}

export const loadMoreColorList = (viewState) =>{
	viewState.setDoGetColorList(true)
}

export const searchColorList = (searchKey, viewState) =>{
    const tampColorListPaginationConfig = {...viewState.colorListPaginationConfig}
    tampColorListPaginationConfig.searchKey = searchKey
    tampColorListPaginationConfig.page = 0
    tampColorListPaginationConfig.maxPage = 0
    viewState.setColorListPaginationConfig(tampColorListPaginationConfig)
    viewState.setColorListReady(false)
    viewState.setDoGetColorList(true)
}
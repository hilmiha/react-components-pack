import { valueListItem } from "../../../../components/selection-field"
import { kabupatenKotaSumatera } from "../data/provinsi-list"

type beExampleResponseType = {
    data:string[]
    totalData:number
    totalPage:number
}

const backEndSimulator = (currentPage:number, searchKey?:string) =>{
    console.log('call backend')    
    let allData = kabupatenKotaSumatera
    
    if(searchKey!==undefined){
        allData = allData.filter((itm)=>{return(itm.toLowerCase().includes(searchKey.toLowerCase().trim()))})
    }
    const maxRow = 20
    const startData = ((currentPage*maxRow)-maxRow+1)
    const endData = Math.min((currentPage*maxRow),allData.length)

    return new Promise<beExampleResponseType>((resolve, reject) => {
        setTimeout(() => {
            resolve({
                data:allData.slice(startData-1, endData),
                totalData:allData.length,
                totalPage:Math.ceil(allData.length / maxRow)
            });
        }, 500);
    });
}

export const getValueListAsync = async(pageNumber:number, searchKey?:string) =>{
    const response = await backEndSimulator(pageNumber, searchKey)
    
    const adition:valueListItem[] = response.data.map((itmRes, idx)=>{
        return({
            id:`${itmRes}`,
            txtLabel:`${itmRes}`,
            value:itmRes
        })
    })

    return({
        list:adition,
        pageNumber:pageNumber,
        searchKey:searchKey,
        totalPage:response.totalPage
    })
}
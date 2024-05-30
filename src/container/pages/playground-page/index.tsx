import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import './styles.scss'
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import SelectionField, { valueList, valueListItem } from '../../../components/selection-field';
import useFormHook from '../../../hook/useFormHook';
import Switch from '../../../components/switch';

const PlaygroundPage = () =>{
    const {
        changeTheme,
        setGlobalModal,
		setIsShowGlobalModal,
    } = React.useContext(GlobalContext) as GlobalContextType;

    const {
        setSidebarManuList,
        setShowSubMenuDrawer
    } = useContext(MainTemplateContext) as MainTemplateContextType;

    useEffect(()=>{
        setSidebarManuList([])
        setShowSubMenuDrawer('playground')
    },[])

    const [form, setForm] = useState({
        selection: [
            {
                "txtLabel": "sit",
                "value": "sit"
            },
            {
                "txtLabel": "amet",
                "value": "amet"
            },
            {
                "txtLabel": "voluptate",
                "value": "voluptate"
            },
            {
                "txtLabel": "reprehenderit",
                "value": "reprehenderit"
            },
            {
                "txtLabel": "anim",
                "value": "anim"
            },
            {
                "txtLabel": "ipsa",
                "value": "ipsa"
            },
            {
                "txtLabel": "ipsam",
                "value": "ipsam"
            }
        ]
    })

    const [valueList, setValueList] = useState<valueList>([])

    const {
        onChange,
        onValidate
    } = useFormHook({
        form:form,
        setForm:setForm,
    })

    type beResponse = {
        data:string[]
        totalData:number
        totalPage:number
    }
    const backEndSimulator = (currentPage:number, searchKey?:string) =>{
        console.log('call backend')
        const string = 'Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit, sed, do, eiusmod, tempor, incididunt, ut, labore, et, dolore, magna, aliqua, enim, ad, minim, veniam, quis, nostrud, exercitation, ullamco, laboris, nisi, aliquip, ex, ea, commodo, consequat, Duis, aute, irure, in, reprehenderit, voluptate, velit, esse, cillum, eu, fugiat, nulla, pariatur, Excepteur, sint, occaecat, cupidatat, non, proident, sunt, culpa, qui, officia, deserunt, mollit, anim, id, est, laborum, perspiciatis, unde, omnis, iste, natus, error, voluptatem, accusantium, doloremque, laudantium, totam, rem, aperiam, eaque, ipsa, quae, ab, illo, inventore, veritatis, quasi, architecto, beatae, vitae, dicta, explicabo, Nemo, ipsam, quia, voluptas, aspernatur, aut, odit, fugit, consequuntur, magni, dolores, eos, ratione, sequi, nesciunt, Neque, porro, quisquam, dolorem, adipisci, numquam, eius, modi, tempora, incidunt, magnam, aliquam, quaerat, minima, nostrum, exercitationem, ullam, corporis, suscipit, laboriosam, aliquid, commodi, consequatur, autem, vel, eum, iure, quam, nihil, molestiae, illum, quo, Lorem 0, Lorem 1, Lorem 2, Lorem 3, Lorem 4, Lorem 5, Lorem 6, Lorem 7, Lorem 8, Lorem 9, Lorem 10, Lorem 11, Lorem 12, Lorem 13, Lorem 14, Lorem 15, Lorem 16, Lorem 17, Lorem 18, Lorem 19, Lorem 20, Lorem 21, Lorem 22, Lorem 23'
        let allData = string.split(', ')
        
        if(searchKey!==undefined){
            allData = allData.filter((itm)=>{return(itm.toLowerCase().includes(searchKey.toLowerCase().trim()))})
        }
        const maxRow = 20
        const startData = ((currentPage*maxRow)-maxRow+1)
        const endData = Math.min((currentPage*maxRow),allData.length)

        return new Promise<beResponse>((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    data:allData.slice(startData-1, endData),
                    totalData:allData.length,
                    totalPage:Math.ceil(allData.length / maxRow)
                });
            }, 150);
        });
    }

    const getValueListN = async(pageNumber:number, searchKey?:string) =>{
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

	return (
		<div style={{padding:"8px"}}>
            <SelectionField
                type='multi-selection'
                valueList={valueList}
                setValueList={setValueList}
                value={form['selection']}
                onChange={(newValue)=>{onChange('selection', newValue)}}
                getListAsync = {(page, searchKey)=>{return getValueListN(page,searchKey)}}
                txtLabel='Label'
                txtPlaceholder='Select'
            />
		</div>
	)
}

export default PlaygroundPage
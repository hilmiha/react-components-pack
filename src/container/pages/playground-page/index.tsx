import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext, GlobalContextType } from '../../../context/globalcontext';
import './styles.scss'
import { MainTemplateContext, MainTemplateContextType } from '../../templates/main-template/context/main-template-context';
import SelectionField, { valueList } from '../../../components/selection-field';
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

    const [doGetData, setDoGetData] = useState(true)

    const [valueListConfig, setValueListConfig] = useState({
        searchKey:'',
        page:1,
        maxPage:1
    })
    const [isValueListCompleted, setIsValueListCompleted] = useState(false)

    type beResponse = {
        data:string[]
        totalData:number
        totalPage:number
    }
    const backEndSimulator = (currentPage:number, searchKey?:string) =>{
        console.log('call backend')
        const string = 'Lorem, ipsum, dolor, sit, amet, consectetur, adipiscing, elit, sed, do, eiusmod, tempor, incididunt, ut, labore, et, dolore, magna, aliqua, enim, ad, minim, veniam, quis, nostrud, exercitation, ullamco, laboris, nisi, aliquip, ex, ea, commodo, consequat, Duis, aute, irure, in, reprehenderit, voluptate, velit, esse, cillum, eu, fugiat, nulla, pariatur, Excepteur, sint, occaecat, cupidatat, non, proident, sunt, culpa, qui, officia, deserunt, mollit, anim, id, est, laborum, perspiciatis, unde, omnis, iste, natus, error, voluptatem, accusantium, doloremque, laudantium, totam, rem, aperiam, eaque, ipsa, quae, ab, illo, inventore, veritatis, quasi, architecto, beatae, vitae, dicta, explicabo, Nemo, ipsam, quia, voluptas, aspernatur, aut, odit, fugit, consequuntur, magni, dolores, eos, ratione, sequi, nesciunt, Neque, porro, quisquam, dolorem, adipisci, numquam, eius, modi, tempora, incidunt, magnam, aliquam, quaerat, minima, nostrum, exercitationem, ullam, corporis, suscipit, laboriosam, aliquid, commodi, consequatur, autem, vel, eum, iure, quam, nihil, molestiae, illum, quo'
        let allData = string.split(', ')
        
        if(searchKey){
            allData = allData.filter((itm)=>{return(itm.toLowerCase().includes(valueListConfig.searchKey.toLowerCase().trim()))})
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
            }, 200);
        });
    }
    
    const [isAsyncSearchReady, setIsAsyncSearchReady] = useState(false)

    const getValueList = async() =>{
        const response = await backEndSimulator(valueListConfig.page, valueListConfig.searchKey)
        
        const tampPaginationList = {
            ...valueListConfig,
            maxPage:response.totalPage
        }
        setValueListConfig(tampPaginationList)

        let tamp = []
        const adition = response.data.map((itmRes, idx)=>{
            return({
                id:`${itmRes}`,
                txtLabel:`${itmRes}`,
                value:itmRes
            })
        })

        if(valueList.length){            
            tamp = [...valueList[0].menu, ...adition]
        }else{
            tamp = [... adition]
        }

        setValueList([
            {
                id:"1",
                menu:tamp
            }
        ])
        setIsAsyncSearchReady(true)

        if(tampPaginationList.page === tampPaginationList.maxPage || tamp.length===0){
            setIsValueListCompleted(true)
        }
    }

    const onLoadMore = () =>{
        const tampPaginationList = {...valueListConfig}
        tampPaginationList.page = valueListConfig.page + 1
        setValueListConfig(tampPaginationList)
        setIsAsyncSearchReady(false)
        setDoGetData(true)
    }

    const onSearch = (searchKey:string) =>{
        setValueList([])
        const tampPaginationList = {...valueListConfig}
        tampPaginationList.page = 1
        tampPaginationList.maxPage = 1
        tampPaginationList.searchKey = searchKey
        setValueListConfig(tampPaginationList)
        setIsValueListCompleted(false)
        setIsAsyncSearchReady(false)
        setDoGetData(true)
    }

    useEffect(()=>{
        if(doGetData){
            getValueList()
            setDoGetData(false)
        }
    },[doGetData])

	return (
		<div style={{padding:"8px"}}>
            <SelectionField
                type='multi-selection'
                valueList={valueList}

                value={form['selection']}
                onChange={(newValue)=>{onChange('selection', newValue)}}

                onLoadMore={()=>{onLoadMore()}}
                isValueListCompleted={isValueListCompleted}

                onAsyncSearch={(searchKey)=>{onSearch(searchKey)}}
                isAsyncSearchReady={isAsyncSearchReady}

                txtLabel='Label'
                txtPlaceholder='Select'
            />
		</div>
	)
}

export default PlaygroundPage
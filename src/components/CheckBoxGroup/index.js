import './styles.css'
import { COLORS } from '../../constant/theme'
import Icons from '../Icons'
import Text from '../Text'
import { Fragment, useEffect, useState } from 'react'
import CheckBox from '../CheckBox'
import { compact, isEmpty, map } from 'lodash'



const listOfCheckBoxConfig = [
    {
        label:'Parent Alpabet',
        value:'parentAlpabet',
        disabled:false,
        children:[
            {
                label:'Children A',
                value:'children_a',
                disabled:false
            },
            {
                label:'Children B',
                value:'children_b',
                disabled:false
            },
            {
                label:'Children C',
                value:'children_c',
                disabled:false
            }
        ]
    },
    {
        label:'Parent Number',
        value:'paerent_number',
        disabled:false,
        children:[
            {
                label:'Label 1',
                value:'label_1',
                disabled:false
            },
            {
                label:'Label 2',
                value:'label_2',
                disabled:false
            },
        ]
    },
    {
        label:'Other',
        value:'other'
    }
]
const valueList = {
    parentAlpabet:['children_a', 'children_c'],
    other:['other']
}

const CheckBoxGroup = ({
    value,
    listCheckbox,
    onSelectOption,
    isEllipsistatic
}) =>{
    const onChange = (newValue) =>{
        onSelectOption(newValue)
    }
    const onClickParents = (parentKey, childrenList) =>{
        const tampValue = (value)?({...value}):({})

        if(tampValue[parentKey]){
            if(childrenList){
                if(childrenList.length === tampValue[parentKey].length){
                    // tampValue[parentKey] = []
                    tampValue[parentKey] = compact(map(childrenList, (itemChildren)=>{
                        if(itemChildren.disabled && tampValue[parentKey].includes(itemChildren.value)){
                            return itemChildren.value
                        }
                    }))
                }else{
                    tampValue[parentKey] = compact(map(childrenList, (itemChildren)=>{
                        if(!itemChildren.disabled){
                            return itemChildren.value
                        }else if(itemChildren.disabled && tampValue[parentKey].includes(itemChildren.value)){
                            return itemChildren.value
                        }
                    }))
                }
            }else{
                tampValue[parentKey] = []
            }
        }else{
            tampValue[parentKey] = []
            if(childrenList){
                tampValue[parentKey] = compact(map(childrenList, (itemChildren)=>{
                    if(!itemChildren.disabled){
                        return itemChildren.value
                    }else if(itemChildren.disabled && tampValue[parentKey].includes(itemChildren.value)){
                        return itemChildren.value
                    }
                }))
            }else{
                tampValue[parentKey].push(parentKey)
            }
        }

        if(!tampValue[parentKey].length){
            delete tampValue[parentKey];
        }
        if(isEmpty(tampValue)){
            onChange('')
        }else{
            onChange(tampValue)
        }
    }

    const onClickChildren = (isCheck, childrenValue, parentKey) =>{
        const tampValue = (value)?({...value}):({})
        if(tampValue[parentKey]){
            if(!isCheck){
                tampValue[parentKey] = value[parentKey].filter((item)=>item!==childrenValue)
            }else{
                tampValue[parentKey].push(childrenValue)
            }
        }else{
            tampValue[parentKey] = []
            tampValue[parentKey].push(childrenValue)
        }
        if(!tampValue[parentKey].length){
            delete tampValue[parentKey];
        }
        if(isEmpty(tampValue)){
            onChange('')
        }else{
            onChange(tampValue)
        }
    }

    return(
        <div>
            {
                listCheckbox.map((item, index)=>{
                    const selected = value[item.value]
                    return(
                        <Fragment key={index}>
                            <CheckBox
                                label={item.label}
                                isDisabled={item.disabled}
                                value={selected}
                                isDash={item.children?(item.children.length !== selected?.length):(false)}
                                onSelectOption={()=>{onClickParents(item.value, item.children)}}
                                isEllipsistatic={isEllipsistatic}
                            />
                            {
                                item.children?.map((itemchildren, index)=>{
                                    const selected = value[item.value]?.includes(itemchildren.value)
                                    return(
                                        <CheckBox
                                            key={index}
                                            className={'input-checkbox-chilred'}
                                            label={itemchildren.label}
                                            isDisabled={itemchildren.disabled || item.disabled}
                                            isEllipsistatic={isEllipsistatic}
                                            onSelectOption={(newValue)=>{onClickChildren(newValue, itemchildren.value, item.value)}}
                                            value={selected}
                                        />
                                    )
                                })
                            }
                        </Fragment>
                    )
                })
            }
        </div>
    )
}

export default CheckBoxGroup
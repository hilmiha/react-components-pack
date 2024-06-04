import { menuListItemType, menuListType } from "../../../../components/dropdown-menu";


export const listOfMenu:menuListType = [
    {
        id:'menu1',
        menu:[
            {
                id:"menu1-1",
                txtLabel:"Sub Menu 1-1"
            },
            {
                id:"menu1-2",
                txtLabel:"Sub Menu 1-2"
            }
        ]
    },
    {
        id:'menu2',
        menu:[
            {
                id:"menu2-1",
                txtLabel:"Sub Menu 2-1"
            }
        ]
    },
]

export const listMenu: menuListItemType[] = [
    {
        id:"itm-1",
        txtLabel:'Action One'
    },
    {
        id:"itm-2",
        txtLabel:'Action Two'
    },
    {
        id:"itm-3",
        txtLabel:'Action Three'
    }
]
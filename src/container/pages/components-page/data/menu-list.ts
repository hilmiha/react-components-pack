export const sidebarManuListDummy = [
    {
        id:'components',
        txtLabel:'Components',
        menuList:[
            {id:'button-main', txtLabel:'Button', menuList:[
                {id:'button', txtLabel:'Button', to:'/components/button'},
                {id:'icon-button', txtLabel:'Icon Button', to:'/components/icon-button'},
                {id:'split-button', txtLabel:'Split Button', to:'/components/split-button'},
            ]},
            {id:'date-picker', txtLabel:'Date Picker',to:'/components/date-picker'},
            {id:'drawer', txtLabel:'Drawer', to:'/components/drawer'},
            {id:'dropdown-menu', txtLabel:'Dropdown Menu', to:'/components/dropdown-menu'},
            {id:'form-field', txtLabel:'Form Field', menuList:[
                {id:'date-picker-field', txtLabel:'Date Picker Field', to:'/components/date-picker-field'},
                {id:'selection-field', txtLabel:'Selection Field', to:'/components/selection-field'},
                {id:'text-field', txtLabel:'Text Field', to:'/components/text-field'},
            ]},
            {id:'image', txtLabel:'Image', to:'/components/image'},
            {id:'modal', txtLabel:'Modal', to:'/components/modal'},
            {id:'pill-flair', txtLabel:'Pill and Flair', to:'/components/pill-flair'},
            {id:'table', txtLabel:'Table', to:'/components/table'}
        ]
    },
    {
        id:'libraries',
        txtLabel:'Libraries',
        menuList:[
            {id:'floating-ui', txtLabel:'Floating UI'},
            {id:'react-day-picker', txtLabel:'React DayPicker'},
        ]
    }
]
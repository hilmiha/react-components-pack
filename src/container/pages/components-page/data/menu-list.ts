export const sidebarManuListDummy = [
    {
        id:'components',
        txtLabel:'Components',
        menuList:[
            {id:'accordion', txtLabel:'Accordion',to:'/components/accordion'},
            {id:'button-main', txtLabel:'Button', menuList:[
                {id:'button', txtLabel:'Button', to:'/components/button'},
                {id:'icon-button', txtLabel:'Icon Button', to:'/components/icon-button'},
                {id:'split-button', txtLabel:'Split Button', to:'/components/split-button'},
            ]},
            {id:'checkbox', txtLabel:'Checkbox',to:'/components/checkbox'},
            {id:'date-picker', txtLabel:'Date Picker',to:'/components/date-picker'},
            {id:'drawer', txtLabel:'Drawer', to:'/components/drawer'},
            {id:'dropdown-menu', txtLabel:'Dropdown Menu', to:'/components/dropdown-menu'},
            {id:'form-field', txtLabel:'Form Field', menuList:[
                {id:'checkbox-field', txtLabel:'Checkbox Field', to:'/components/checkbox-field'},
                {id:'date-picker-field', txtLabel:'Date Picker Field', to:'/components/date-picker-field'},
                {id:'selection-field', txtLabel:'Selection Field', to:'/components/selection-field'},
                {id:'radio-field', txtLabel:'Radio Field', to:'/components/radio-field'},
                {id:'text-field', txtLabel:'Text Field', to:'/components/text-field'},
                {id:'text-area-field', txtLabel:'Text Area Field', to:'/components/text-area-field'},
            ]},
            {id:'image', txtLabel:'Image', to:'/components/image'},
            {id:'modal', txtLabel:'Modal', to:'/components/modal'},
            {id:'pill-flair', txtLabel:'Pill and Flair', to:'/components/pill-flair'},
            {id:'radio', txtLabel:'Radio',to:'/components/radio'},
            {id:'slider', txtLabel:'Slider',to:'/components/slider'},
            {id:'spinner', txtLabel:'Spinner',to:'/components/spinner'},
            {id:'switch', txtLabel:'Switch',to:'/components/switch'},
            {id:'table', txtLabel:'Table', to:'/components/table'},
            {id:'tabs', txtLabel:'Tabs', to:'/components/tabs'}
        ]
    },
    {
        id:'libraries',
        txtLabel:'Libraries',
        menuList:[
            {id:'react-icons', txtLabel:'React Icons'},
            {id:'floating-ui', txtLabel:'Floating UI'},
            {id:'react-day-picker', txtLabel:'React DayPicker'},
        ]
    }
]
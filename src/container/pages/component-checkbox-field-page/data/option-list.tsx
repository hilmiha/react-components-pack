import { valueListCheckboxField } from "../../../../components/checkbox-field"

export const optionList:valueListCheckboxField = [
    {
        id:'asia',
        txtLabel:'Asia',
        value:'asia',
        childMenu:[
            {
                id:"china",
                txtLabel:"China",
                txtSublabel:'Regional support.',
                value:"china"
            },
            {
                id:"india",
                txtLabel:"India",
                txtSublabel:'Regional support.',
                value:"india"
            },
            {
                id:"japan",
                txtLabel:"Japan",
                txtSublabel:'Regional support.',
                value:"japan"
            },
            {
                id:"singapore",
                txtLabel:"Singapore",
                txtSublabel:"HQ support",
                value:"singapore"
            }
        ]
    },
    {
        id:'europe',
        txtLabel:'Europe',
        value:'europe',
        childMenu:[
            {
                id:"french",
                txtLabel:"French",
                txtSublabel:'Regional support.',
                value:"french"
            },
            {
                id:"germany",
                txtLabel:"Germany",
                txtSublabel:"HQ support",
                value:"germany"
            },
            {
                id:"spain",
                txtLabel:"Spain",
                txtSublabel:'Regional support.',
                value:"spain"
            },
            {
                id:"sweden",
                txtLabel:"Sweden",
                txtSublabel:'Regional support.',
                value:"sweden"
            }
        ]
    },
    {
        id:'usa',
        txtLabel:'United State of America',
        value:'usa',
    }

]
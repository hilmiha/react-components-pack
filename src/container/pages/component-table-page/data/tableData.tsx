import { valueList } from "../../../../components/selection-field";
import { tableColumType } from "../../../../components/table"

export const tableColumsDummny:tableColumType[] = [
    {
        key:'user',
        txtLabel:'User',
        size:{size:'1fr', min:'250px'},
        isCanSort:true,
    },
    {
        key:'group',
        txtLabel:'Group',
        size:{size:'0.2fr', min:'120px'},
        isCanSort:true,
    },
    {
        key:'lastUpdateDt',
        txtLabel:'Last Update',
        size:{size:'0.4fr', min:'130px'},
        isCanSort:true,
    },
    {
        key:'status',
        txtLabel:'Status',
        size:{size:'0.2fr', min:'130px'},
        isCanSort:true,
        isDefaultSort:true,
        isAlignTxtRight:true
    }
]

export const groupList:valueList = [
    {
        id:'group',
        menu:[
            {
                id:'admin',
                txtLabel:'Admin',
                value:'admin'
            },
            {
                id:'business',
                txtLabel:'Business',
                value:'business'
            },
            {
                id:'it',
                txtLabel:'IT',
                value:'it'
            },
            {
                id:'sales',
                txtLabel:'Sales',
                value:'sales'
            },
        ]
    }
] 

export const statusList:valueList = [
    {
        id:'status',
        menu:[
            {
                id:'active',
                txtLabel:'Active',
                value:'0'
            },
            {
                id:'inactive',
                txtLabel:'Inactive',
                value:'3'
            },
            {
                id:'suspended',
                txtLabel:'Suspended',
                value:'1'
            },
            {
                id:'locked',
                txtLabel:'Locked',
                value:'2'
            }
        ]
    }
]

export const tableDataDummy:Record<any,any>[] = [
    {
        "id": "0013",
        "user": "Agnes Aryani",
        "email": "agnes.aryani@notrealemail.org",
        "group": "business",
        "status": "0",
        "detail": "Agnes Aryani aut odit aut fugit, sed quia consequuntur magni dolores.",
        "lastUpdateDt": "1714632787000"
    },
    {
        "id": "0020",
        "user": "Ana Andriani",
        "email": "ana.andriani@notrealemail.org",
        "group": "business",
        "status": "0",
        "detail": "Ana Andriani sed ut perspiciatis unde omnis iste natus error sit voluptatem.",
        "lastUpdateDt": "1714530623000"
    },
    {
        "id": "0007",
        "user": "Bella Wijayanti",
        "email": "bella.wijayanti@notrealemail.org",
        "group": "it",
        "status": "0",
        "detail": "Bella Wijayanti eum iure reprehenderit qui in ea voluptate.",
        "lastUpdateDt": "1714632787000"
    },
    {
        "id": "0010",
        "user": "Farhunnisa Nasyiah",
        "email": "farhunnisa.nasyiah@notrealemail.org",
        "group": "sales",
        "status": "0",
        "detail": "Farhunnisa Nasyiah voluptatem accusantium doloremque laudantium.",
        "lastUpdateDt": "1714530623000"
    },
    {
        "id": "0011",
        "user": "Gamanto Gunarto",
        "email": "gamanto.gunarto@notrealemail.org",
        "group": "admin",
        "status": "0",
        "detail": "Gamanto Gunarto quis nostrud exercitation ullamco laboris nisi ut aliquip ex.",
        "lastUpdateDt": "1714632787000"
    },
    {
        "id": "0017",
        "user": "Irwan Utama",
        "email": "irwan.utama@notrealemail.org",
        "group": "business",
        "status": "1",
        "detail": "Irwan Utama dolore magnam aliquam quaerat voluptatem.",
        "lastUpdateDt": "1714530623000"
    },
    {
        "id": "0025",
        "user": "Jane Purwanti",
        "email": "jane.purwanti@notrealemail.org",
        "group": "admin",
        "status": "0",
        "detail": "Jane Purwanti harum quidem rerum facilis est et expedita distinctio.",
        "lastUpdateDt": "1714632787000"
    },
    {
        "id": "0024",
        "user": "Kariman Ardianto",
        "email": "kariman.ardianto@notrealemail.org",
        "group": "sales",
        "status": "1",
        "detail": "Kariman Ardianto inventore veritatis et quasi architecto beatae vitae.",
        "lastUpdateDt": "1714530623000"
    },
    {
        "id": "0022",
        "user": "Kasiran Rajasa",
        "email": "kasiran.rajasa@notrealemail.org",
        "group": "it",
        "status": "0",
        "detail": "Kasiran Rajasa quos dolores et quas molestias excepturi sint.",
        "lastUpdateDt": "1714615814000"
    },
    {
        "id": "0002",
        "user": "Kasusra Maryadi",
        "email": "kasusra.maryadi@notrealemail.org",
        "group": "business",
        "status": "3",
        "detail": "Kasusra Maryadi sunt in culpa qui officia deserunt mollitia.",
        "lastUpdateDt": "1714878722000"
    },
    {
        "id": "0006",
        "user": "Kenari Saefullah",
        "email": "kenari.saefullah@notrealemail.org",
        "group": "sales",
        "status": "1",
        "detail": "Kenari Saefullah emporibus autem quibusdam et aut officiis debitis aut.",
        "lastUpdateDt": "1714615814000"
    },
    {
        "id": "0021",
        "user": "Laila Nuraini",
        "email": "laila.nuraini@notrealemail.org",
        "group": "admin",
        "status": "0",
        "detail": "Laila Nuraini facilis est et expedita distinctio.",
        "lastUpdateDt": "1714878722000"
    },
    {
        "id": "0023",
        "user": "Latif Mansur",
        "email": "latif.mansur@notrealemail.org",
        "group": "business",
        "status": "1",
        "detail": "Latif Mansur molestias excepturi sint occaecati cupiditate non provident.",
        "lastUpdateDt": "1714715104000"
    },
    {
        "id": "0014",
        "user": "Lidya Purwanti",
        "email": "lidya.purwanti@notrealemail.org",
        "group": "business",
        "status": "0",
        "detail": "Lidya Purwanti aut rerum necessitatibus saepe eveniet ut et voluptates.",
        "lastUpdateDt": "1714813843000"
    },
    {
        "id": "0019",
        "user": "Maria Lailasari",
        "email": "maria.lailasari@notrealemail.org",
        "group": "business",
        "status": "2",
        "detail": "Maria Lailasari dignissimos ducimus qui blanditiis praesentium voluptatum.",
        "lastUpdateDt": "1714715104000"
    },
    {
        "id": "0018",
        "user": "Nardi Sitompul",
        "email": "nardi.sitompul@notrealemail.org",
        "group": "business",
        "status": "3",
        "detail": "Nardi Sitompul Et harum quidem rerum facilis est et expedita.",
        "lastUpdateDt": "1714813843000"
    },
    {
        "id": "0008",
        "user": "Oliva Pudjiastuti",
        "email": "oliva.pudjiastuti@notrealemail.org",
        "group": "it",
        "status": "0",
        "detail": "Oliva Pudjiastuti id quod maxime placeat facere possimus, omnis voluptas.",
        "lastUpdateDt": "1714715104000"
    },
    {
        "id": "0004",
        "user": "Opan Hakim",
        "email": "opan.hakim@notrealemail.org",
        "group": "sales",
        "status": "0",
        "detail": "Opan Hakim et iusto odio dignissimos ducimus qui.",
        "lastUpdateDt": "1714813843000"
    },
    {
        "id": "0005",
        "user": "Padma Wahyuni",
        "email": "padma.wahyuni@notrealemail.org",
        "group": "sales",
        "status": "3",
        "detail": "Padma Wahyuni ducimus qui blanditiis praesentium voluptatum deleniti atque.",
        "lastUpdateDt": "1714548861000"
    },
    {
        "id": "0001",
        "user": "Rika Hassanah",
        "email": "rika.hassanah@notrealemail.org",
        "group": "it",
        "status": "0",
        "detail": "Rika Hassanah voluptas sit aspernatur aut odit aut fugit, sed quia.",
        "lastUpdateDt": "1714871383000"
    },
    {
        "id": "0015",
        "user": "Sadina Haryanti",
        "email": "sadina.haryanti@notrealemail.org",
        "group": "business",
        "status": "0",
        "detail": "Sadina Haryanti ipsum quia dolor sit amet, consectetur.",
        "lastUpdateDt": "1714548861000"
    },
    {
        "id": "0003",
        "user": "Surya Samosir",
        "email": "surya.samosir@notrealemail.org",
        "group": "sales",
        "status": "0",
        "detail": "Surya Samosir reprehenderit qui in ea voluptate velit esse quam.",
        "lastUpdateDt": "1714871383000"
    },
    {
        "id": "0009",
        "user": "Umaya Prayoga",
        "email": "umaya.prayoga@notrealemail.org",
        "group": "business",
        "status": "0",
        "detail": "Umaya Prayoga  Nam libero tempore, cum soluta nobis est eligendi optio.",
        "lastUpdateDt": "1714548861000"
    },
    {
        "id": "0016",
        "user": "Vicky Usamah",
        "email": "vicky.usamah@notrealemail.org",
        "group": "business",
        "status": "2",
        "detail": "Vicky Usamah quia consequuntur magni dolores eos qui ratione.",
        "lastUpdateDt": "1714626609000"
    },
    {
        "id": "0012",
        "user": "Victoria Lailasari",
        "email": "victoria.lailasari@notrealemail.org",
        "group": "it",
        "status": "1",
        "detail": "Victoria Lailasari Ut enim ad minima veniam, quis nostrum exercitationem ullam.",
        "lastUpdateDt": "1714550942000"
    }
]
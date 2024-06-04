export const cacheSence = {
    defaultSenceId: 'sence1',
    senceList: [
        {
            id: 'sence1',
            name: '默认方案',
            removable: false,
            inner: true,
            searchList: [
                {
                    id: '19eba15d3b7542318d32efcf467b3e3f1',
                    prop: 'name',
                    searchCondition: 'like',
                    searchVisible: true,
                    searchValue: ['123456'],
                },
            ],
        },
    ],
}



export const defaultSenceList = {
    defaultSenceId: 'sence1',
    senceList: [
        {
            id: 'sence1',
            name: '默认方案',
            removable: false,
            inner: true,
            searchList: [
                {
                    id: '19eba15d3b7542318d32efcf467b3e3f1',
                    prop: 'name',
                    searchCondition: 'like',
                    searchVisible: true,
                    searchValue: ['123456'],
                },
                {
                    id: '19eba15d3b7542318d32efcf467b3e3f1',
                    prop: 'name',
                    searchCondition: 'like',
                    searchVisible: true,
                    searchValue: ['123456'],
                },
                {
                    id: '19eba15d3b7542318d32efcf467b3e3f1',
                    prop: 'name',
                    searchCondition: 'like',
                    searchVisible: true,
                    searchValue: ['123456'],
                },
                {
                    id: '19eba15d3b7542318d32efcf467b3e3f1',
                    prop: 'name',
                    searchCondition: 'like',
                    searchVisible: true,
                    searchValue: ['123456'],
                },
            ],
        },
    ],
}

export const columnList = [
    {
        id: '3CauotUkqKKXKsr9xJ4pMo11a',
        label: '索引',
        prop: 'column1671615393407',
        type: 'index',
        width: '60px',
        hidden: false,
        fixed: true,
        align: 'left',
        sortable: false,
        columnType: 1,
        searchProps: {},
        i18nKey: '',
    },
    {
        columnType: 1,
        i18nKey: '',
        id: 'nxoUesBjMPNGAtcNu42snxz',
        item19999999999: '168558103273583',
        label: '',
        prop: 'check',
        reserveSelection: true,
        searchProps: { enable: false, componentType: 'text', supportConditionList: Array(6) },
        width: '100px',
        type: 'radio',
    },
    {
        columnType: 1,
        i18nKey: '',
        id: 'nxoUesBjMPNGAtcNu42snxz',
        item19999999999: '168558103273583',
        label: '',
        prop: 'check',
        reserveSelection: true,
        searchProps: { enable: false, componentType: 'text', supportConditionList: Array(6) },
        width: '100px',
        type: 'selection',
    },
    {
        id: '19eba15d3b7542318d32efcf467b3e3f1',
        label: '主表12',
        prop: 'name',
        i18nKey: '',
        hidden: false,
        align: 'left',
        sortable: true,
        columnType: 3,
        searchProps: {
            searchVisible: false, // 用于弹窗里该项选择后禁用
            enable: true,
            componentType: 'date',
            searchPropKey: 'ModifiedId2',
            supportConditionList: ['like', 'ge', 'gele'],
        },
    },
    {
        id: '2b1dada90122484387c333c25e9f3df62',
        label: '主表21',
        prop: 'entityName',
        i18nKey: '',
        width: '200px',
        hidden: false,
        align: 'left',
        sortable: false,
        columnType: 3,
        searchProps: {
            searchVisible: false,
            enable: true,
            componentType: 'date',
            realProp: 'userId',
            supportConditionList: ['ne', 'like', 'eq', 'isNull', 'notlike', 'isNotNull', 'gele'],

            //
            // enable: true,
            // componentType: 'select',
            // dataSourceProps: {"label":"name","value":"id"},
            // dataSource: [
            //     {
            //         name:'测试',
            //         id:"entityName0"
            //     },
            // ],
            // supportConditionList: ['isNull','isNotNull','notIn','in'],

        },
    },
    {
        id: 'e3c7160e609d455f9e76d9f32108e7bb',
        label: '主表3',
        prop: 'serviceName',
        i18nKey: '',
        width: '200px',
        hidden: false,
        align: 'left',
        sortable: false,
        columnType: 3,
        searchProps: {
            searchVisible: false,
            enable: true,
            componentType: 'time',
            realProp: 'userId',
            supportConditionList: ['in', 'ne', 'eq', 'notIn', 'gele', 'isNull'],
            dataSourceProps: { "label": "test","value": "id" },
            dataSource: (_params: any) => {
                return new Promise<any>(resolve => {
                    setTimeout(()=>{
                        console.log('请求接口')
                        return resolve({
                            code: 0,
                            msg: '',
                            data: [
                                { id: '1', test: '物料类型123456' },
                                { id: '2', test: '我的bb2' },
                            ],
                        })
                    },300)

                })
            },
        },
    },
    {
        columnType: 4,
        fixed: 'right',
        i18nKey: '',
        id: 'nxoUesBjMPNGAtcNu4snxz',
        label: '操作',
        prop: 'operate',
        width: '100px',
        searchProps: { enable: false, componentType: 'text', supportConditionList: [] },
    },
]

const tableConfig = {
    tableId: 'advTable1',
    senceId: 'advTable1_sence', //TODO delete
    rowKey: 'id',
    border: true,
    searchBarProps: {
        enable: true,
        isSenior: true,
        isToolColumn: true,
        senceInfo: defaultSenceList,
    },
}

export const useSearchData = () => {
    const staticData = []
    for (let i = 0; i < 10; i++) {
        staticData.push({
            id: `id${i}`,
            entityName: `entityName${i}`,
            serviceName: `1`,
        })
    }

    return {
        cacheSence,
        defaultSenceList,
        tableConfig,
        columnList,
        staticData,
    }
}

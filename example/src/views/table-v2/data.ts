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

export const localCacheSence = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('我要返回cacheSence数据拉')
            resolve(cacheSence)
        }, 500)
    })
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
                // {
                //     id: '19eba15d3b7542318d32efcf467b3e3f1',
                //     prop: 'name',
                //     searchCondition: 'like',
                //     searchVisible: true,
                //     searchValue: ['123456'],
                // },
                // {
                //     id: '19eba15d3b7542318d32efcf467b3e3f1',
                //     prop: 'name',
                //     searchCondition: 'like',
                //     searchVisible: true,
                //     searchValue: ['123456'],
                // },
                // {
                //     id: '19eba15d3b7542318d32efcf467b3e3f1',
                //     prop: 'name',
                //     searchCondition: 'like',
                //     searchVisible: true,
                //     searchValue: ['123456'],
                // },
                // {
                //     id: '19eba15d3b7542318d32efcf467b3e3f1',
                //     prop: 'name',
                //     searchCondition: 'like',
                //     searchVisible: true,
                //     searchValue: ['123456'],
                // },
            ],
        },
    ],
}

export const columnList = [
    {
        id: '3CauotUkqKKXKsr9xJ4pMo11a',
        key: '3CauotUkqKKXKsr9xJ4pMo11a',
        title: '索引',
        prop: 'index1',
        type: 'index',
        hidden: false,
        fixed: true,
        align: 'center',
        editable: false,
        sortable: true,
        columnType: 1,
        searchProps: {},
        i18nKey: '',
        width: 150,
    },
    {
        id: 'nxoUesBjMPNGAtcNu42snxz',
        key: 'nxoUesBjMPNGAtcNu42snxz',
        item19999999999: '168558103273583',
        title: '2222',
        prop: 'selection',
        sortable: true,
        reserveSelection: true,
        editable: false,
        searchProps: { enable: false, componentType: 'text', supportConditionList: Array(6) },
        type: 'selection',
        width: 100,
    },
    // {
    //     id: 'nxoUesBjMPNGAtcN4u42snxz3333',
    //     key: 'nxoUesBjMPNGAtcN4u42snxz3333',
    //     item19999999999: '1684558103273583',
    //     title: 'checkbox',
    //     prop: 'checkbox',
    //     reserveSelection: true,
    //     editable: false,
    //     searchProps: { enable: false, componentType: 'text', supportConditionList: Array(6) },
    //     type: 'checkbox',
    //     width: 100,
    // },
    {
        sortable: true,
        id: '334443',
        key: '334443',
        item19999999999: '443',
        title: 'serviceName2',
        label: 'serviceName2',
        dataKey: 'serviceName2',
        prop: 'serviceName2',
        searchProps: { enable: false, componentType: 'text', supportConditionList: Array(6) },
        width: 1200,
    },
    {
        id: '333',
        key: '333',
        item19999999999: '44',
        title: 'serviceName',
        label: 'serviceName',
        dataKey: 'serviceName',
        prop: 'radio',
        searchProps: { enable: false, componentType: 'text', supportConditionList: Array(6) },
        width: 300,
        type:'radio'
    },
]

const tableConfig = {
    tableId: 'advTable11',
    senceId: 'advTable11_sence', //TODO delete
    rowKey: 'id',
    hidden: false,
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
    for (let i = 0; i < 100; i++) {
        staticData.push({
            id: `05cb21734d34b13501${i}`,
            entityName: i,
            serviceName: `serviceName${i}`,
            name: `05cb21734d34b13501${i}`,
            serviceName2:Math.floor(Math.random() * 100) + 1,
            treeNode: `05cb21734d34b13501${i}`,
            createTime: new Date(2016, 9, 10, 9, 40),
            createDate: '2023-11-12',
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

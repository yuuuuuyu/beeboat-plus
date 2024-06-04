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
        label: '索引',
        prop: 'index1',
        type: 'index',
        width: '60px',
        hidden: false,
        fixed: true,
        align: 'left',
        editable: false,
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
        prop: 'radio',
        reserveSelection: true,
        editable: false,
        searchProps: { enable: false, componentType: 'text', supportConditionList: Array(6) },
        type: 'radio',
    },
    // {
    //     columnType: 1,
    //     i18nKey: '',
    //     id: 'nxoUesBjMPNGAtcNu42snxz',
    //     item19999999999: '168558103273583',
    //     label: '',
    //     prop: 'check',
    //     reserveSelection: true,
    //     editable: false,
    //     searchProps: { enable: false, componentType: 'text', supportConditionList: Array(6) },
    //     type: 'selection',
    // },
    {
        id: '19eba15d3b7542qwe213efcf467b3e3f1',
        label: '下2拉',
        prop: 'selectName',
        i18nKey: '',
        hidden: false,
        width: '215px', // 下拉需要的最小宽度/或者不设置
        align: 'left',
        sortable: true,
        columnType: 1,
        dictId: 'Bpm_ProcessInstanceStatus',
        searchProps: {
            enable: false,
        },
        editProps: {
            enable: true,
            componentType: 'select',
            selectProps: { showTooltip: true, placement: 'left' },
            dataSource: _params => {
                return new Promise(reslove => {
                    const arr = [
                        { name: 'aaaa', id: 111 },
                        { name: 'bbbb', id: 222 },
                    ]

                    reslove({
                        code: 0,
                        data: arr,
                        msg: '操作成功',
                        ok: true,
                        stackMsg: null,
                    })
                })
            },
            dataSourceProps: { label: 'name', value: 'id' },
        },
    },
    {
        id: '19eba15d3b7542318d3212213efcf467b3e3f1',
        label: '下拉树',
        prop: 'treeNode',
        i18nKey: '',
        hidden: false,
        width: '215px', // 下拉需要的最小宽度/或者不设置
        align: 'left',
        sortable: true,
        columnType: 1,
        searchProps: {
            enable: false,
        },
        editProps: {
            enable: true,
            componentType: 'text',
            dataSource: _params => {
                return new Promise(reslove => {
                    const arr = []
                    for (let i = 0; i < 100; i++) {
                        arr.push({
                            convertDenominator: null,
                            convertElement: null,
                            convertType: null,
                            decimalBit: 2,
                            id: `05cb21734d34b13501${i}`,
                            name: `name${i}`,
                            isBase: 1,
                            children: [
                                {
                                    id: `aaa${i}`,
                                    name: `aaa${i}`,
                                },
                            ],
                            remark: '1qq',
                            roundingType: '0',
                            status: 1,
                            unitCode: '`unit00019${i}`',
                            unitGroupId: 'f88605cb21734d34b13501c3e55751ab',
                            unitGroupName: '米',
                            unitName: `小米小米小米小米小米小米小米小米${i}`,
                        })
                    }
                    reslove({
                        code: 0,
                        data: arr,
                        msg: '操作成功',
                        ok: true,
                        stackMsg: null,
                    })
                })
            },
            dataSourceProps: { label: 'name', children: 'children', value: 'id' },
        },
    },
    {
        id: '2b1dada90122484387c333c25e9f3df62',
        label: '数字框',
        prop: 'entityName',
        i18nKey: '',
        width: '200px',
        hidden: false,
        align: 'left',
        sortable: true,
        edit: false,
        columnType: 3,
        searchProps: {
            searchVisible: false,
            enable: true,
            componentType: 'date',
            realProp: 'userId',
            supportConditionList: ['ne', 'like', 'eq', 'isNull', 'notlike', 'isNotNull', 'gele'],
        },
        editProps: {
            enable: true,
            componentType: 'number',
            componentProps: {
                max: 100,
                disabled: false,
                precision: 2,
            },
        },
    },
    {
        id: 'e3c7160e609d455f9e76d9f32108e7bb',
        label: '文本框',
        prop: 'serviceName',
        i18nKey: '',
        width: '140px',
        hidden: false,
        align: 'left',
        sortable: false,
        editable: false,
        columnType: 3,
        editProps: {
            enable: true,
            componentType: 'text',
            componentProps: {
                maxlength: 10,
            },
        },
        searchProps: {
            enable: true,
            componentType: 'month',
            supportConditionList: ['ne', 'like', 'eq', 'isNull', 'notlike', 'isNotNull', 'gele'],
        },
    },
    {
        id: '2b1dada90122412384387c333c25e9f3df62',
        label: '时间类型',
        prop: 'createTime',
        i18nKey: '',
        width: '240px',
        hidden: false,
        align: 'left',
        edit: false,
        columnType: 3,
        editProps: {
            enable: true,
            componentType: 'time',
        },
        searchProps: {
            searchVisible: false,
            enable: true,
            componentType: 'date',
            realProp: 'userId',
            supportConditionList: ['ne', 'like', 'eq', 'isNull', 'notlike', 'isNotNull', 'gele'],
        },
    },
    {
        id: '2b1dada84387c333c25e9f3df62',
        label: '日期',
        prop: 'createDate',
        i18nKey: '',
        width: '140px',
        hidden: false,
        align: 'left',
        edit: false,
        columnType: 3,
        editProps: {
            enable: true,
            componentType: 'date',
        },
        searchProps: {
            searchVisible: false,
            enable: true,
            componentType: 'date',
            realProp: 'userId',
            supportConditionList: ['ne', 'like', 'eq', 'isNull', 'notlike', 'isNotNull', 'gele'],
        },
    },
    {
        columnType: 4,
        fixed: 'right',
        i18nKey: '',
        id: 'nxoUesBjMPNGAtcNu4snxz',
        label: '操作',
        prop: 'operate',
        type: 'operate',
        editable: false,
        width: '200px',
        searchProps: { enable: false, componentType: 'text', supportConditionList: [] },
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
    editConfig: {
        dialogStatus: 'edit', // 当前弹窗的状态
        enable: true, // 当前表格开启行内编辑
        type: 'page',
        showBtn: true, // 是否显示内置的保存、取消按钮？？？false不使用内置，开发自定义,自定义后重写saveOrUpdate
        saveOrUpdate: data => {
            console.log('saveOrUpdate', data)
            // 保存后的刷新列表
            return new Promise<void>(resolve => {
                resolve({
                    code: 0,
                    msg: '保存成功',
                })
            })
        },
        delete: data => {
            console.log('delete data', data)
            return new Promise<void>(resolve => {
                resolve({
                    code: 0,
                    msg: '删除成功',
                })
            })
        },
        rules: {
            name: [
                {
                    required: true,
                    message: 'name 必填',
                },
            ],
            createTime: [
                {
                    required: true,
                    message: 'createTime 必填',
                },
                // {
                //     validator(rule, value, callback, source, options) {
                //         return value > '2023-10-10'
                //     },
                //     message: '时间值需要在2023-10-10之后',
                // },
            ],
            serviceName: [
                {
                    required: true,
                    message: 'serviceName必填',
                },
                // {
                //     // 正则
                //     pattern: /^[0-9]*$/,
                //     message: 'serviceName必须是数字',
                // },
            ],
            entityName: [
                {
                    required: true,
                    message: 'entityName必填',
                },
                {
                    // 正则
                    // pattern: /^[0-9]*$/,
                    type: 'number',
                    message: 'entityName必须是数字',
                },
                {
                    validator(rule, value, callback, source, options) {
                        // 自定义校验
                        // console.log('------------------')
                        // console.log(rule)
                        console.log(value, typeof value)
                        // console.log('------------------')
                        return value > 100
                    },
                    message: '值必须大于100',
                },
            ],
        },
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

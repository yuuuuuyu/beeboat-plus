export const columnList = [
    {
        id: 'index',
        prop: 'index',
        type: 'index',
        align: 'center',
        hidden: false,
    },
    {
        id: 'id',
        label: 'id',
        prop: 'id',
        columnType: 3,
        hidden: false,
    },
    {
        id: 'id2',
        label: 'id2',
        prop: 'id2',
        columnType: 3,
        hidden: false,
    },
    {
        id: 'selection',
        prop: 'selection',
        type: 'selection',
        reserveSelection: true,
        hidden: false,
    },
    {
        id: 'operate',
        prop: 'operate',
        columnType: 4,
        label: '操作',
        hidden: false,
    },
]

export const useSearchData = () => {
    const staticData = []
    for (let i = 0; i < 10001; i++) {
        staticData.push({
            id: `id${i}`,
            name: `name${i}`,
            name2: `name2${i}`,
        })
    }

    return {
        columnList,
        staticData,
    }
}

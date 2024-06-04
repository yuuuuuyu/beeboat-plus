const config: any = {
    // columnType字段类型：1选择框 2文本 3长文本 4短数字 5数字 6长数字 7浮点数 8时间 9日期 10日期时间 11对象
    typeObj: {
        1: 'select',
        2: 'text',
        3: 'text',
        4: 'number',
        5: 'number',
        6: 'number',
        7: 'number',
        8: 'datetime',
        9: 'date',
        10: 'datetime',
        11: 'text',
        12: 'select',
    },
    typeArr: ['select', 'text', 'date', 'datetime', 'number'],
    term: {
        config: {
            like: '包含',
            notlike: '不包含',
            eq: '等于',
            ne: '不等于',
            isNull: '为空',
            isNotNull: '不为空',
            gt: '大于',
            ge: '大于等于',
            lt: '小于',
            le: '小于等于',
            gele: '范围',
            in: '范围内',
            notIn: '范围外',
        },
        field: {
            // 时间 条件配置
            datetime: ['gele', 'eq', 'ne', 'gt', 'ge', 'lt', 'le', 'isNull', 'isNotNull'],
            // 文本 条件配置
            text: ['like', 'notlike', 'eq', 'ne', 'isNull', 'isNotNull'],
            // 数字 条件配置
            number: ['eq', 'ne', 'gt', 'ge', 'lt', 'le', 'isNull', 'isNotNull', 'gele'],
            // 下拉 条件配置
            select: ['in', 'notIn', 'isNull', 'isNotNull'],
            // 树状 条件配置
            tree: ['like', 'notlike', 'isnNull', 'isNotNull'],
        },
    },
}
export default config

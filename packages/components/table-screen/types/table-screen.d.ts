
export module TableScreen {


    // id: 'b38bfac5ef764ec5846d7fb9c2cd8763',
    // label: '类型', // 中午名
    // prop: 'serviceType', // 字段
    // hidden: 1, // 是否隐藏
    // align: 'left', // 对齐方式
    // sortable: 0, // 是否支持 排序
    // columnType: 3, // 列类型
    // dictId: '818b03c187e8ffcc4ca5d7e61b3840c7',
    // enableAdvSearch: 0, // 是否高级筛选

    // columnType字段类型：1选择框 2文本 3长文本 4短数字 5数字 6长数字 7浮点数 8时间 9日期date 10日期时间datetime 11对象
    type ConfigType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11
    // 是否高级筛选 0否 1是
    type EnableAdvSearch = 0 | 1
    /** 筛选条件 类型 */
    type ItemType = 'text' | 'number' | 'datetime' | 'select' | 'date'

    interface Condition {
        label: string;
        value: string;
    }

    type Config = {
        /** 唯一标识 */
        id: string;
        /** 表格列 字段 */
        prop: string;
        /** 中文名称 */
        label: string;
        /** 列类型 */
        propType?: number | string;
        /** 是否高级筛选 */
        enableAdvSearch?: number;
        /** 是否外露 */
        defaultSearchItem?: number;
        /** 数据字典 id */
        dictId?: string;
        /** 数据字典 请求接口地址 */
        dictUrl?: string;
        /** 下拉框数据 */
        selectData?: any[];
        /** 默认选中值 */
        value?: any;
        searchDefaultValue?: string | undefined;
        /** 标签 例子：input select 等 */
        searchPropType?: string | undefined;
        /** 表格列 字段 对应的筛选字段 */
        searchProp?: string;
        /** 筛选是否失效 */ 
        searchDisabled?: number | boolean 
        /** select option 赋值对象 { label: 'name', value: 'id' } */
        searchKeyProp?: any
        /** 下拉动态接口 */
        searchDynamicApi?: (params:any) => Promise<any>
    }
    type Term = Config & {
        /** 表格列类型 */
        propType: ConfigType;
        /** 筛选条件 操作符集合 */
        condition: Condition[];
        /** 选中的操作符 */
        conditionValue: string;
        /** 下拉动态数据Api */
        searchDynamicApi?: (params:any) => Promise<any>
    }
    
    interface currencyObject {
        [propName: string]: any
    }

    /** 返回参数 */
    type Parameter = {
        field: string;
        express: string;
        value: string | undefined;
    }
};

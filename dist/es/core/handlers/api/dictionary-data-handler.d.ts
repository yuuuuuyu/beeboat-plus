import { BTPBaseApiHandler } from '../base';
/**
 * 数据字典数据加载对象
 * @author Enmaai
 */
export default class BTPDictDataHandler extends BTPBaseApiHandler {
    readonly className: string;
    constructor();
    handle(): Promise<void>;
    /**
     * @description 格式化树数据
     * @param dataList 数据
     * @returns 树数据
     */
    formatDictData(dataList: any): any;
}

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { BTPBaseInitHandler } from '../base/index';
import BTPUtils from '../../utils-ex/utils-ex';
/**
 * 路由创建对象
 * @author Enmaai
 */
export default class BTPRemoteMethodLoadHandler extends BTPBaseInitHandler {
    constructor() {
        super(...arguments);
        this.className = 'BTPRemoteMethodLoadHandler';
    }
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield BTPUtils.getAppManager().loadMethodList();
            this.getCacheManager().cacheMethodList(data);
        });
    }
}

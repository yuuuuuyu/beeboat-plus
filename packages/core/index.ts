// app相关
import { BTPApplication, BTPBaseApplication } from './app'

// view视图相关
import {
    BTPViewContext,
    BTPBaseViewContext,
    BTPGlobalAppManager,
    BTPDialogViewContext,
} from './view'

// handlers
import {
    BTPBaseHandler,
    BTPBaseApiHandler,
    BTPBaseInitHandler,
    BTPBaseMountHandler,
    BTPBaseSetupHandler,
    BTPDictDataHandler,
    BTPMenuDataHandler,
    BTPUserDataHandler,
    BTPRouterCreateHandler,
    BTPRemoteMethodLoadHandler,
    BTPAppMountHandler,
    BTPCookieCreateHandler,
    BTPHttpCreateHandler,
    BTPStoreCreateHandler,
} from './handlers'

// 缓存信息
import BTPAppCacheManager from './cache/app-cache-manager'

// 逻辑事件
import BTPLogicExecutor from './logics/logic-executor'

import BTPUtils from './utils/btp-utils'
import { UseElementConfig } from './utils/use-element-config'
import { withInstall, withInstallFunction, withInstallDirective } from './utils/with-install'

// is
import {
    is,
    isFunction,
    isDef,
    isUnDef,
    isFirefox,
    isObject,
    isDate,
    isNumber,
    isAsyncFunction,
    isPromise,
    isString,
    isBoolean,
    isArray,
    isClient,
    isWindow,
    isElement,
    isServer,
    isImageDom,
    isNull,
    isNullAndUnDef,
    isNullOrUnDef,
} from './utils/is'
export {
    BTPApplication,
    BTPBaseApplication,
    BTPAppCacheManager,
    BTPViewContext,
    BTPBaseViewContext,
    BTPGlobalAppManager,
    BTPDialogViewContext,
    BTPLogicExecutor,
    BTPBaseHandler,
    BTPBaseApiHandler,
    BTPBaseInitHandler,
    BTPBaseMountHandler,
    BTPBaseSetupHandler,
    BTPDictDataHandler,
    BTPMenuDataHandler,
    BTPUserDataHandler,
    BTPRouterCreateHandler,
    BTPRemoteMethodLoadHandler,
    BTPAppMountHandler,
    BTPCookieCreateHandler,
    BTPHttpCreateHandler,
    BTPStoreCreateHandler,
    BTPUtils,
    UseElementConfig,
    withInstall,
    withInstallFunction,
    withInstallDirective,
    // 以下待考量
    is,
    isFunction,
    isDef,
    isUnDef,
    isFirefox,
    isObject,
    isDate,
    isNumber,
    isAsyncFunction,
    isPromise,
    isString,
    isBoolean,
    isArray,
    isClient,
    isWindow,
    isElement,
    isServer,
    isImageDom,
    isNull,
    isNullAndUnDef,
    isNullOrUnDef,
}

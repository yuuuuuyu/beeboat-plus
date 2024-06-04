export type EventType = string | symbol
/**
 * 发布、订阅模式
 */
class UseEventBus {
    /**
     * 消息队列集合
     *
     * @private
     * @type {Map<EventType, any>}
     * @memberof UseEventBus
     */
    queue: Map<EventType, any>
    /**
     * 构造函数
     */

    constructor() {
        this.queue = new Map()
    }
    /**
     *
     * @param type `{string|symbol}` 类型监听事件的类型，“*”表示所有事件
     * @param callBacks `{Function}` 回调函数
     */
    $on(type: EventType, callBacks) {
        const handlers = this.queue!.get(type)
        if (handlers) {
            handlers.push(callBacks)
        } else {
            this.queue!.set(type, [callBacks])
        }
    }
    /**
     *
     * @param type `{string|symbol}` 注销' callBacks '的事件类型(" *' '删除通配符处理程序)
     * @param callBacks `{Function}` 回调函数
     */
    $off(type: EventType, callBacks) {
        const handlers = this.queue!.get(type)
        if (handlers) {
            if (callBacks) {
                handlers.splice(handlers.indexOf(callBacks) >>> 0, 1)
            } else {
                this.queue!.set(type, [])
            }
        }
    }
    /**
     *
     * @param type `{string|symbol}` 调用的事件类型
     * @param evt `{...arg}` 扩展参数任何值
     */
    $emit(type: EventType, ...arg) {
        let handlers = this.queue!.get(type)
        if (handlers) {
            handlers.slice().map(handler => {
                handler(...arg)
            })
        }

        handlers = this.queue!.get('*')
        if (handlers) {
            handlers.slice().map(handler => {
                handler(type, ...arg)
            })
        }
    }
}
export default UseEventBus
export { UseEventBus }

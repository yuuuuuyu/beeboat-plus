export default class BTPWebsocketObserver {
    private listener;
    private socket;
    private socketTimeInterval;
    constructor(url: any, listener: any, retry?: number);
    /**
     * 关闭
     */
    close(): void;
    /**
     * 发送消息
     * @param message 消息
     */
    send(message: any): void;
    /**
     * 心跳
     */
    private keepAlive;
    /**
     * 收到消息
     * @param action 消息类型
     * @param message 消息
     */
    private receive;
}

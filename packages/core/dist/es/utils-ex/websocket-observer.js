export default class BTPWebsocketObserver {
    constructor(url, listener, retry = 10000) {
        this.listener = listener;
        this.socket = new WebSocket(url);
        this.socket.onmessage = (msg) => {
            this.receive('onmessage', msg);
        };
        this.socket.onopen = () => {
            this.keepAlive();
            this.receive('onopen', null);
        };
        this.socket.onclose = () => {
            this.receive('onclose', close);
        };
    }
    /**
     * 关闭
     */
    close() {
        if (this.socket) {
            this.socket.close();
        }
        if (this.socketTimeInterval) {
            clearInterval(this.socketTimeInterval);
        }
    }
    /**
     * 发送消息
     * @param message 消息
     */
    send(message) {
        if (this.socket) {
            this.socket.send(message);
        }
    }
    /**
     * 心跳
     */
    keepAlive() {
        this.socketTimeInterval = setInterval(function () {
            if (this.socket && this.socket.readyState == 1) {
                this.send('{code:0}');
            }
        }, 10000);
    }
    /**
     * 收到消息
     * @param action 消息类型
     * @param message 消息
     */
    receive(action, message) {
        console.log('连接close', action);
        if (this.listener) {
            if (action == 'onopen' && this.listener.onopen) {
                this.listener.onopen();
            }
            if (action == 'onclose' && this.listener.onclose) {
                this.listener.onclose();
            }
            if (action == 'onmessage' && this.listener.onmessage) {
                this.listener.onmessage(message);
            }
        }
    }
}

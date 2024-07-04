import 'nprogress/nprogress.css';
/**
 * nprogress的帮助类类
 */
declare class BtNProgress {
    constructor(params?: any);
    protected initParams: {
        easing: string;
        speed: number;
        showSpinner: boolean;
        trickleSpeed: number;
        minimum: number;
    };
    configure: any;
    /**
     * 开始
     */
    start(): void;
    /**
     * 结束
     * @param whether 默认false
     */
    done(whether?: boolean): void;
}
export default BtNProgress;
export { BtNProgress };

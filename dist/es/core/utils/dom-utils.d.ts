export interface ViewportOffsetResult {
    left: number;
    top: number;
    right: number;
    bottom: number;
    rightIncludeBody: number;
    bottomIncludeBody: number;
}
export declare function hasClass(el: Element, cls: string): boolean;
export declare function addClass(el: Element, cls: string): void;
export declare function removeClass(el: Element, cls: string): void;
export declare function getBoundingClientRect(element: Element): DOMRect | number;
/**
 * 获取当前元素的left、top偏移
 *   left：元素最左侧距离文档左侧的距离
 *   top:元素最顶端距离文档顶端的距离
 *   right:元素最右侧距离文档右侧的距离
 *   bottom：元素最底端距离文档底端的距离
 *   rightIncludeBody：元素最左侧距离文档右侧的距离
 *   bottomIncludeBody：元素最底端距离文档最底部的距离
 *
 * @description:
 */
export declare function getViewportOffset(element: Element): ViewportOffsetResult;
export declare const on: (element: HTMLElement | Document | Window, event: string, handler: EventListenerOrEventListenerObject, use?: boolean) => void;
export declare const off: (element: HTMLElement | Document | Window, event: string, handler: any, use?: boolean) => void;
export declare const getStyle: (element: Element | any, styleName: string) => any;
export declare function setStyle(element: Element | any, styleName: any, value: any): void;
export declare const isScroll: (el: Element, vertical: any) => any;
export declare const getScrollContainer: (el: Element, vertical?: any) => any;
export declare const isInContainer: (el: Element, container: any) => boolean;

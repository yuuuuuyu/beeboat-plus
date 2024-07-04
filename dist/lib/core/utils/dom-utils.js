"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInContainer = exports.getScrollContainer = exports.isScroll = exports.setStyle = exports.getStyle = exports.off = exports.on = exports.getViewportOffset = exports.getBoundingClientRect = exports.removeClass = exports.addClass = exports.hasClass = void 0;
const is_1 = require("./is");
const ieVersion = is_1.isServer ? 0 : Number(document.documentMode);
const SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
const MOZ_HACK_REGEXP = /^moz([A-Z])/;
const trim = function (string) {
    return (string || '').replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, '');
};
const camelCase = function (name) {
    return name
        .replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter;
    })
        .replace(MOZ_HACK_REGEXP, 'Moz$1');
};
function hasClass(el, cls) {
    if (!el || !cls)
        return false;
    if (cls.indexOf(' ') !== -1)
        throw new Error('className should not contain space.');
    if (el.classList) {
        return el.classList.contains(cls);
    }
    else {
        return ` ${el.className} `.indexOf(` ${cls} `) > -1;
    }
}
exports.hasClass = hasClass;
function addClass(el, cls) {
    if (!el)
        return;
    let curClass = el.className;
    const classes = (cls || '').split(' ');
    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName)
            continue;
        if (el.classList) {
            el.classList.add(clsName);
        }
        else if (!hasClass(el, clsName)) {
            curClass += ` ${clsName}`;
        }
    }
    if (!el.classList) {
        el.className = curClass;
    }
}
exports.addClass = addClass;
function removeClass(el, cls) {
    if (!el || !cls)
        return;
    const classes = cls.split(' ');
    let curClass = ` ${el.className} `;
    for (let i = 0, j = classes.length; i < j; i++) {
        const clsName = classes[i];
        if (!clsName)
            continue;
        if (el.classList) {
            el.classList.remove(clsName);
        }
        else if (hasClass(el, clsName)) {
            curClass = curClass.replace(` ${clsName} `, ' ');
        }
    }
    if (!el.classList) {
        el.className = trim(curClass);
    }
}
exports.removeClass = removeClass;
function getBoundingClientRect(element) {
    if (!element || !element.getBoundingClientRect) {
        return 0;
    }
    return element.getBoundingClientRect();
}
exports.getBoundingClientRect = getBoundingClientRect;
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
function getViewportOffset(element) {
    const doc = document.documentElement;
    const docScrollLeft = doc.scrollLeft;
    const docScrollTop = doc.scrollTop;
    const docClientLeft = doc.clientLeft;
    const docClientTop = doc.clientTop;
    const { pageXOffset } = window;
    const { pageYOffset } = window;
    const box = getBoundingClientRect(element);
    const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box;
    const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
    const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
    const offsetLeft = retLeft + pageXOffset;
    const offsetTop = rectTop + pageYOffset;
    const left = offsetLeft - scrollLeft;
    const top = offsetTop - scrollTop;
    const { clientWidth } = window.document.documentElement;
    const { clientHeight } = window.document.documentElement;
    return {
        left: left,
        top: top,
        right: clientWidth - rectWidth - left,
        bottom: clientHeight - rectHeight - top,
        rightIncludeBody: clientWidth - left,
        bottomIncludeBody: clientHeight - top,
    };
}
exports.getViewportOffset = getViewportOffset;
/* istanbul ignore next */
const on = function (element, event, handler, use = false) {
    if (element && event && handler) {
        element.addEventListener(event, handler, use);
    }
};
exports.on = on;
/* istanbul ignore next */
const off = function (element, event, handler, use = false) {
    if (element && event && handler) {
        element.removeEventListener(event, handler, use);
    }
};
exports.off = off;
/* istanbul ignore next */
exports.getStyle = ieVersion < 9
    ? function (element, styleName) {
        if (is_1.isServer)
            return;
        if (!element || !styleName)
            return null;
        styleName = camelCase(styleName);
        if (styleName === 'float') {
            styleName = 'styleFloat';
        }
        try {
            switch (styleName) {
                case 'opacity':
                    try {
                        return element.filters.item('alpha').opacity / 100;
                    }
                    catch (e) {
                        return 1.0;
                    }
                default:
                    return element.style[styleName] || element.currentStyle
                        ? element.currentStyle[styleName]
                        : null;
            }
        }
        catch (e) {
            return element.style[styleName];
        }
    }
    : function (element, styleName) {
        if (is_1.isServer)
            return;
        if (!element || !styleName)
            return null;
        styleName = camelCase(styleName);
        if (styleName === 'float') {
            styleName = 'cssFloat';
        }
        try {
            const computed = document.defaultView.getComputedStyle(element, '');
            return element.style[styleName] || computed ? computed[styleName] : null;
        }
        catch (e) {
            return element.style[styleName];
        }
    };
/* istanbul ignore next */
function setStyle(element, styleName, value) {
    if (!element || !styleName)
        return;
    if (typeof styleName === 'object') {
        for (const prop in styleName) {
            if (Object.prototype.hasOwnProperty.call(styleName, prop)) {
                setStyle(element, prop, styleName[prop]);
            }
        }
    }
    else {
        styleName = camelCase(styleName);
        if (styleName === 'opacity' && ieVersion < 9) {
            element.style.filter = isNaN(value) ? '' : `alpha(opacity=${value * 100})`;
        }
        else {
            element.style[styleName] = value;
        }
    }
}
exports.setStyle = setStyle;
/* istanbul ignore next */
const isScroll = (el, vertical) => {
    if (is_1.isServer)
        return;
    const determinedDirection = vertical !== null || vertical !== undefined;
    const overflow = determinedDirection
        ? vertical
            ? (0, exports.getStyle)(el, 'overflow-y')
            : (0, exports.getStyle)(el, 'overflow-x')
        : (0, exports.getStyle)(el, 'overflow');
    return overflow.match(/(scroll|auto)/);
};
exports.isScroll = isScroll;
/* istanbul ignore next */
const getScrollContainer = (el, vertical) => {
    if (is_1.isServer)
        return;
    let parent = el;
    while (parent) {
        if ([window, document, document.documentElement].includes(parent)) {
            return window;
        }
        if ((0, exports.isScroll)(parent, vertical)) {
            return parent;
        }
        parent = parent.parentNode;
    }
    return parent;
};
exports.getScrollContainer = getScrollContainer;
/* istanbul ignore next */
const isInContainer = (el, container) => {
    if (is_1.isServer || !el || !container)
        return false;
    const elRect = el.getBoundingClientRect();
    let containerRect;
    if ([window, document, document.documentElement, null, undefined].includes(container)) {
        containerRect = {
            top: 0,
            right: window.innerWidth,
            bottom: window.innerHeight,
            left: 0,
        };
    }
    else {
        containerRect = container.getBoundingClientRect();
    }
    return (elRect.top < containerRect.bottom &&
        elRect.bottom > containerRect.top &&
        elRect.right > containerRect.left &&
        elRect.left < containerRect.right);
};
exports.isInContainer = isInContainer;

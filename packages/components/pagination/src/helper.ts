/**
 * 显示分页布局
 * @param layout 默认auto
 * @returns pagination layout
 */
export function getLayout(layout: string) {
    switch (layout) {
        case '1':
            return 'prev, next, jumper'
        case '2':
            return 'total, prev, pager, next'
        case '3':
            return 'total, prev, pager, next, sizes'
        case '4':
            return 'total, prev, pager, next, sizes, jumper'
        default:
            return 'total, prev, pager, next, sizes, jumper'
    }
}

/**
 * 计算 布局
 * @param el
 * @returns
 */
export function getLayoutByAuto(width) {
    if (width <= 550) {
        return 'prev, next, jumper'
    } else if (width <= 650) {
        return 'total, prev, pager, next'
    } else if (width <= 760) {
        return 'total, prev, pager, next, sizes'
    } else if (width <= 850) {
        return 'total, prev, pager, next, sizes, jumper'
    } else {
        return 'total, prev, pager, next, sizes, jumper'
    }
}

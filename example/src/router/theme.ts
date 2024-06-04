/** 容器组件路由 */
export default [
    {
        name: 'theme',
        path: '/theme',
        component: () => import('@/views/theme/index.vue'),
        meta: {
            title: '主题组件',
            desc: '主题功能演示',
            author: '于基庆(Herry)',
        },
    },
    {
        name: 'theme-element',
        path: '/theme-element',
        component: () => import('@/views/theme/element.vue'),
        meta: {
            title: '主题组件-element',
            desc: '主题功能演示-element',
            author: '于基庆(Herry)',
        },
    },
]

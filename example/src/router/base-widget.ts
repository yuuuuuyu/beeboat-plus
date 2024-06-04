export default [
    {
        name: 'base-widget',
        path: '/base-widget',
        component: () => import('@/views/base-widget/index.vue'),
        meta: {
            title: '基础组件',
            desc: '基础组件，包含多基础组件示例',
            author: '修琨(mickey)',
        },
    },
    {
        name: 'button',
        path: '/button',
        component: () => import('@/views/button/index.vue'),
        meta: {
            title: '按钮组件',
            desc: '按钮组件',
            author: '于基庆',
        },
    },
]

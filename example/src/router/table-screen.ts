/** 容器组件路由 */
export default [
    {
        name: 'table-screen',
        path: '/table-screen',
        component: () => import('@/views/tabe-screen/index.vue'),
        meta: {
            title: '表格 高级筛选',
            desc: '表格高级筛选',
            author: '于基庆(Herry)',
        },
    },
]

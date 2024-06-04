/** 新表格组件 */
export default [
    {
        name: 'new-table',
        path: '/new-table',
        component: () => import('@/views/new-table/index.vue'),
        meta: {
            title: '新表格',
            desc: '新表格',
            author: '修琨',
        },
    },
]

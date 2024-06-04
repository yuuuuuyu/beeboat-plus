/** 文件导入 */
export default [
    {
        name: 'simple-excel-import',
        path: '/simple-excel-import',
        component: () => import('@/views/simple-excel-import/index.vue'),
        meta: {
            title: 'simple导入',
            desc: 'simple导入',
            author: '隋辉',
        },
    },
]

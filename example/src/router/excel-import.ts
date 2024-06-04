/** 文件导入 */
export default [
    {
        name: 'excel-import',
        path: '/excel-import',
        component: () => import('@/views/excel-import/index.vue'),
        meta: {
            title: '导入组件',
            desc: '导入组件',
            author: '隋辉',
        },
    },
]

/** 图片、视频预览组件 */
export default [
    {
        name: 'preview',
        path: '/preview',
        component: () => import('@/views/preview/demo.vue'),
        meta: {
            title: '图片、视频预览组件',
            desc: '图片、视频预览组件preview',
            author: '修琨(mickey)',
        },
    },
]

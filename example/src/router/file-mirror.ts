/** form表单组件路由 */
export default [
    {
        name: 'file-mirror',
        path: '/file-mirror',
        component: () => import('@/views/file-mirror/index.vue'),
        meta: {
            title: '文件差异对比',
            desc: '文件差异对比',
            author: 'yuzhiyong',
        },
    },
]

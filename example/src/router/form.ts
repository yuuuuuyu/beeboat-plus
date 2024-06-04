/** form表单组件路由 */
export default [
    {
        name: 'form',
        path: '/form',
        component: () => import('@/views/form/form-demo.vue'),
        meta: {
            title: 'form组件',
            desc: 'form组件form',
            author: '修琨(mickey)',
        },
    },
]

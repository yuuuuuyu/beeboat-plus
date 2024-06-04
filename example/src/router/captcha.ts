/** 验证码 */
export default [
    {
        name: 'captcha',
        path: '/captcha',
        component: () => import('@/views/captcha/index.vue'),
        meta: {
            title: '验证码组件',
            desc: '验证码组件',
            author: '修琨(mickey)',
        },
    },
]

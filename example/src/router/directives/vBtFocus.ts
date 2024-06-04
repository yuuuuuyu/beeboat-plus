/** v-btFocus聚焦指令 路由 */
export default [
    {
        name: 'vBtAuth',
        path: '/v-bt-auth',
        component: () => import('@/views/directives/vBtAuth.vue'),
        meta: {
            title: 'vBtAuth指令',
            desc: '自定义指令 vBtAuth角色权限',
            author: '修琨(mickey)',
        },
    },
    {
        name: 'vBtFocus',
        path: '/v-bt-focus',
        component: () => import('@/views/directives/vBtFocus.vue'),
        meta: {
            title: 'vBfFocus指令',
            desc: '自定义指令 vBfFocus聚焦',
            author: '修琨(mickey)',
        },
    },
]

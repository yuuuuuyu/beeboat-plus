import { createRouter, createWebHashHistory, Router } from 'vue-router'

const Layout = () => import('@/views/index.vue')

const base = [
    {
        path: '/',
        name: 'home',
        component: Layout,
        redirect: '/welcome',
        meta: {
            icon: 'home-filled',
            title: '首页',
            hidden: true,
        },
        children: [
            {
                path: '/welcome',
                name: 'welcome',
                component: () => import('@/views/home/welcome.vue'),
                meta: {
                    title: '首页',
                    hidden: true,
                },
            },
            {
                path: '/tables',
                name: 'tables',
                component: () => import('@/views/tables/index.vue'),
                meta: {
                    title: '表格',
                    hidden: true,
                },
            },
        ],
    },
]

export const router: Router = createRouter({
    history: createWebHashHistory(),
    routes: base,
})

export default router

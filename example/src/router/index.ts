export const routes = [
    {
        path: '/',
        name: 'home',
        component: import('@/views/index.vue'),
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

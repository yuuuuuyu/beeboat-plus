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
                    hidden: false,
                },
            },
            {
                path: '/dynamic',
                name: 'dynamic',
                component: () => import('@/views/layout/bt-view.vue'),
                meta: {
                    title: '动态数据页《模块表格》',
                    hidden: false,
                    viewId: 'ModuleTablePage',
                    viewModelId: 'ae96e0352e73edbc812fe26553278d7c',
                },
            },
            {
                path: '/button',
                name: 'button',
                component: () => import('@/views/button/index.vue'),
                meta: {
                    title: '按钮',
                    hidden: false,
                },
            },
        ],
    },
]

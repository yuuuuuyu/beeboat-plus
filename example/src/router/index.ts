export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/index.vue'),
        redirect: '/welcome',
        meta: {
            icon: 'home-filled',
            title: '首页',
            hidden: true,
        },
        children: [
            {
                path: '/dockpanel',
                name: 'dockpanel',
                component: () => import('@/views/dock-panel/index.vue'),
                meta: {
                    title: 'DockPanel',
                    hidden: false,
                },
            },
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
                path: '/logics',
                name: 'logics',
                component: () => import('@/views/logics/index.vue'),
                meta: {
                    title: '前端逻辑编排示例',
                    hidden: false,
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
                path: '/tables-edit',
                name: 'tables-edit',
                component: () => import('@/views/tables-edit/index.vue'),
                meta: {
                    title: '行内编辑表格',
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
            {
                path: '/switch',
                name: 'switch',
                component: () => import('@/views/switch/index.vue'),
                meta: {
                    title: '开关',
                    hidden: false,
                },
            },
            {
                path: '/input',
                name: 'input',
                component: () => import('@/views/input/index.vue'),
                meta: {
                    title: '输入框',
                    hidden: false,
                },
            },
            {
                path: '/tabs',
                name: 'tabs',
                component: () => import('@/views/tabs/index.vue'),
                meta: {
                    title: 'Tabs 标签页',
                    hidden: false,
                },
            },
            {
                path: '/tabs-anchor',
                name: 'tabs-anchor',
                component: () => import('@/views/tabs-anchor/index.vue'),
                meta: {
                    title: 'Tabs 定位标签页',
                    hidden: false,
                },
            },
            {
                path: '/card',
                name: 'card',
                component: () => import('@/views/card/index.vue'),
                meta: {
                    title: 'card',
                    hidden: false,
                },
            },
        ],
    },
]

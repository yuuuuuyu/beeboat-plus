/** 容器组件路由 */
export default [
    {
        name: 'table',
        path: '/table',
        component: () => import('@/views/table/demo.vue'),
        meta: {
            title: '分页表格组件',
            desc: '分页表格组件table',
            author: '修琨(mickey)',
        },
    },
    {
        name: 'tableex',
        path: '/tableex',
        component: () => import('@/views/table-ex/table-ex.vue'),
        meta: {
            title: 'table-ex',
            desc: 'table-ex',
            author: 'xiujiantao',
        },
    },

    {
        name: 'tableex-静态数据',
        path: '/tableex-static',
        component: () => import('@/views/table-ex/table-ex-static.vue'),
        meta: {
            title: 'table-ex-静态数据',
            desc: 'table-ex-静态数据',
            author: 'xiujiantao',
        },
    },
    {
        name: 'tableex-源生用法',
        path: '/tableex-native',
        component: () => import('@/views/table-ex/table-ex-native.vue'),
        meta: {
            title: 'table-ex-源生用法',
            desc: 'table-ex-源生用法',
            author: 'xiujiantao',
        },
    },
    {
        name: 'dockpanel',
        path: '/dockpanel',
        component: () => import('@/views/dockpanel/index.vue'),
        meta: {
            title: 'dockpanel',
            desc: 'dockpanel',
            author: 'xiujiantao',
        },
    },
    {
        name: 'tableex-动态数据',
        path: '/tableex-src',
        component: () => import('@/views/table-ex/table-ex-src.vue'),
        meta: {
            title: 'table-ex-动态数据',
            desc: 'table-ex-动态数据',
            author: 'liuhuaxun',
        },
    },
    {
        name: 'table-v2',
        path: '/table-v2',
        component: () => import('@/views/table-v2/table-v2.vue'),
        meta: {
            title: 'table-v2',
            desc: 'table-v2',
            author: 'xiujiantao',
        },
    },
    {
        name: 'table-v2-style',
        path: '/table-v2-style',
        component: () => import('@/views/table-v2/table-v2-style.vue'),
        meta: {
            title: 'table-v2-style',
            desc: 'table-v2-style',
            author: 'xiujiantao',
        },
    },
]

/** 容器组件路由 */
export default [
    {
        name: 'splitter',
        path: '/splitter',
        component: () => import('@/views/splitter.vue'),
        meta: {
            title: '容器组件',
            desc: '容器组件splitter、splitter-item',
            author: '修琨(mickey)',
        },
    },
    // {
    // 	name: 'router-tag',
    // 	path: '/router-tag',
    // 	component: () => import('@/views/router-tag/router-tag.vue'),
    // 	meta: {
    // 		title: '导航TAG组件',
    // 		desc: '导航TAG组件',
    // 		author: '于权礼/姚崇',
    // 	},
    // },
    // {
    // 	name: 'user-tool',
    // 	path: '/user-tool',
    // 	component: () => import('@/views/router-tag/router-tag.vue'),
    // 	meta: {
    // 		title: '个人中心组件',
    // 		desc: '个人中心组件',
    // 		author: '于权礼/姚崇',
    // 	},
    // },
    // {
    // 	name: 'home-header',
    // 	path: '/home-header',
    // 	component: () => import('@/views/router-tag/router-tag.vue'),
    // 	meta: {
    // 		title: '头部导航',
    // 		desc: '头部导航',
    // 		author: '于权礼',
    // 	},
    // },
]

/** event-bus 发布订阅工具类路由 */
export default [
    {
        name: 'event-bus',
        path: '/event-bus',
        component: () => import('@/views/event-bus/event-bus-demo.vue'),
        meta: {
            title: 'event-bus 发布订阅工具类',
            desc: 'event-bus 发布订阅工具类',
            author: '修琨(mickey)',
        },
    },
]

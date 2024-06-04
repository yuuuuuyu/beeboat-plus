import { createRouter, createWebHashHistory, Router } from 'vue-router'
import baseWidget from './base-widget'
import splitter from './splitter'
// import pageTable from './table'
import vBtFocus from './directives/vBtFocus'
import theme from './theme'
import tableScreen from './table-screen'
import captcha from './captcha'
import excelImport from './excel-import'
import tree from './tree'
import tree2 from './tree2'
import form from './form'
import newTable from './new-table'
import newTable2 from './new-table2'
import newAdvSearchbar from './new-adv-searchbar'
import preview from './preview'
import eventBus from './event-bus'
import formWidget from './form-widget'
import simpleExcelImport from './simple-excel-import'
import dropDown from './drop-down'
import dialog from './dialog'
import group from './group'
import tabsAnchor from './tabs-anchor'
import TableEx from './table'
import AutoComplete from './auto-complete'
import FileMirror from './file-mirror'
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
        ],
    },
    {
        name: 'login',
        path: '/login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录',
            hidden: true,
        },
    },
    {
        name: 'error',
        path: '/error',
        component: Layout,
        redirect: '/error/403',
        meta: {
            icon: 'information-line',
            title: '错误',
            hidden: true,
        },
        children: [
            {
                path: '/error/403',
                name: '403',
                component: () => import('@/views/login.vue'),
                meta: {
                    title: '错误',
                    hidden: true,
                },
            },
        ],
    },
    {
        name: 'picker',
        path: '/picker',
        component: () => import('@/views/picker/picker.vue'),
        meta: {
            title: '弹窗选择',
            desc: '弹窗选择',
            author: '修建涛',
        },
    },
]

export const baseConstRoutes: any = [
    ...base,
    ...baseWidget,
    ...splitter,
    // ...pageTable,
    ...form,
    ...newTable,
    ...newAdvSearchbar,
    ...preview,
    ...captcha,
    ...eventBus,
    ...vBtFocus,
    ...theme,
    ...tableScreen,
    ...excelImport,
    ...tree,
    ...formWidget,
    ...simpleExcelImport,
    ...dropDown,
    ...dialog,
    ...group,
    ...tabsAnchor,
    ...newTable2,
    ...tree2,
    ...TableEx,
    ...AutoComplete,
    ...FileMirror,
]

export const router: Router = createRouter({
    history: createWebHashHistory(),
    routes: baseConstRoutes,
    // strict: true,
})

export default router

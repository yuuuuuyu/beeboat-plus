<template>
    <div class="container">
        <bt-page-header />
        <div class="top">
            <div class="top-logo">logo</div>
            <div class="top-menu">
                <bt-home-header :menu-list="parentMenu" @switchParnetRouter="activeParnetMenu" />
            </div>
            <div class="top-user">
                <bt-user-tool />
            </div>
        </div>
        <div class="bottom">
            <div class="left">
                <bt-page-menu :route-list="menuList[0].children" />
                <!-- <el-menu :default-active="currentActive" unique-opened>
                    <el-sub-menu v-for="attr in menuList" :key="attr.path" :index="attr.path">
                        <template #title>
                            <span>{{ attr.name }}</span>
                        </template>
                        <template v-for="menu in attr.children" :key="menu.path">
                            <el-menu-item :index="menu.path" @click="activeMenu(menu)">
                                <span>{{ menu.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </el-menu> -->
            </div>
            <div class="right">
                <!-- 导航 -->
                <div class="navigation">
                    <bt-router-tag
                        ref="routerTagRef"
                        :tag-list="routerattr.List"
                        :init-menu-list="initMenu"
                        @switchRouter="activeMenu"
                        @close-router="removeRouter"
                        @activeRightMenu="handleInitMenu"
                    />
                </div>
                <!-- 内容 -->
                <div class="content">
                    <router-view />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
//import BtRouterTag from './router-tag.vue'

//菜单列表
let menuList = [
    {
        path: '1',
        name: '主应用1',
        children: [
            {
                path: '/business-managment',
                name: '商机管理哈哈哈',
                parentkey: '1',
            },
            {
                path: '/contact-change',
                name: '合同变更还好',
                parentkey: '1',
            },
            {
                path: '/contract-management',
                name: '合同管理加油加油',
                parentkey: '1',
            },
            {
                path: '/order-management',
                name: '订单管理',
                parentkey: '1',
            },
        ],
    },
    {
        path: '2',
        name: '主应用2',
        children: [
            {
                path: '/kkk',
                name: '111',
                parentkey: '1',
            },
            {
                path: '/llll',
                name: '3333',
                parentkey: '1',
            },
        ],
    },
]
let parentMenu = [
    {
        path: '1',
        name: '路由列表',
    },
    {
        path: '2',
        name: '测试1231',
    },
]
//自定义菜单
let initMenu = [
    {
        label: '关闭其他',
        value: 'close-other',
    },
    {
        label: '关闭左侧',
        value: 'close-left',
    },
    {
        label: '关闭右侧',
        value: 'close-right',
    },
]

//菜单当前激活项
let currentActive = ref('/business-managment')

//路由列表
let routerattr = reactive({ List: [] })

//路由组件
let routerTagRef = ref(null)

let router = useRouter()
//激活头部父级菜单
let activeParnetMenu = (menu: any) => {
    //todo这里要根据具体菜单数据返回结构去写
    if (menu.path == '1') {
        currentActive.value = '/business-managment'
    } else {
        currentActive.value = '/kkk'
    }
    let routerIndex = routerattr.List.findIndex(item => item.path == currentActive.value)
    if (routerIndex != -1) {
        routerTagRef.value.jumpTo(routerIndex)
        //激活当前路由列表
        routerTagRef.value.routerActive = routerIndex
    }
}
//激活菜单
let activeMenu = (menu: any) => {
    //修改激活项
    currentActive.value = menu.path
    //跳转路由
    //	router.push({ path: menu.path })
    //添加路由
    let index = routerattr.List.findIndex(item => item.path == menu.path)
    if (index == -1) {
        routerattr.List.push(menu)
    }
    //路由列表显示当前激活项
    //路由激活项的位置不一定与菜单渲染的位置一致
    let routerIndex = routerattr.List.findIndex(item => item.path == menu.path)
    if (routerIndex != -1) {
        routerTagRef.value.jumpTo(routerIndex)
        //激活当前路由列表
        routerTagRef.value.routerActive = routerIndex
    }
}

//删除路由
let removeRouter = (item: any, index: number) => {
    //要考虑的问题
    //1、删除当前激活菜单的路由 => 跳到前面的路由，修改锚点位置
    //2、删除当前激活菜单的左侧路由 => 不跳转，不用更新锚点位置
    //3、删除当前激活菜单的右侧路由 => 不跳转，不用更新锚点位置
    //4、全部删除 => 不允许全部删除
    //5、要考虑锚点位置的修改
    if (routerattr.List.length > 1) {
        if (item.path == currentActive.value) {
            //删除当前激活菜单的路由
            let menu = routerattr.List[index - 1]
            activeMenu(menu)
        }
        //删除路由
        routerattr.List.splice(index, 1)
        //更新 当前路由列表的激活项
        let activeIndex = routerattr.List.findIndex(e => e.path == currentActive.value)
        routerTagRef.value.routerActive = activeIndex
    }
}

//处理自定义菜单
let handleInitMenu = (current, value) => {
    // console.log(current, value)
    let index = routerattr.List.findIndex(item => item.path == current.path)
    switch (value) {
        case 'close-other':
            //关闭其他
            routerattr.List = [current]
            break
        case 'close-right':
            //关闭右侧
            routerattr.List = routerattr.List.slice(0, index + 1)
            break
        case 'close-left':
            //关闭左侧
            routerattr.List = routerattr.List.slice(index)
            break
    }
    //更新 当前路由列表的激活项
    let activeIndex = routerattr.List.findIndex(e => e.path == currentActive.value)
    routerTagRef.value.routerActive = activeIndex
}
</script>

<style scoped lang="scss">
.container {
    width: 100%;
    height: 940px;
}

.top {
    display: flex;
    width: 100%;
    height: 60px;
    font-size: 30px;
    text-align: center;
    background: #4b74e2;

    .top-logo {
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .top-user {
        width: 300px;
    }

    .top-menu {
        width: calc(100% - 500px);
    }
}

.bottom {
    display: flex;
    width: 100%;
    height: calc(100% - 60px);

    .left {
        width: 200px;
        height: 100%;
    }

    .right {
        width: 100%;
        height: 100%;
        background: #e2eaf7;

        .navigation {
            width: 100%;
            height: 44px;
            background: #ffffff;
        }

        .content {
            width: calc(100% - 20px);
            height: calc(100% - 64px);
            margin: 10px;
            background: #ffffff;
            border-radius: 5px;
        }
    }
}
</style>

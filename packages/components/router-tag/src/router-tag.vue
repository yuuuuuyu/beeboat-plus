<template>
    <div class="bt-router-tag">
        <!-- 路由向左移动 -->
        <div class="bt-router-tag__div--left" @click="moveTag(-1)"></div>
        <!-- 路由列表 -->
        <div id="routerTagList" class="router-tag__div--list">
            <!-- 路由项 -->
            <template v-for="(item, index) in tagList" :key="item[tagKey]">
                <div
                    class="router-tag-item"
                    :style="setTagActive(index)"
                    @mousemove="showCloseBtn(index)"
                    @mouseout="hideCloseBtn"
                    @contextmenu="initMenu($event, item)"
                >
                    <div class="item--name" @click="switchTag(item, index)">
                        {{ item[tagName] }}
                    </div>
                    <div
                        v-if="routerMove == index"
                        class="item--close"
                        @click="closeTag(item, index)"
                    ></div>
                    <!-- 用于占位 -->
                    <div v-else class="item--none"></div>
                </div>
            </template>
        </div>
        <!-- 路由向右移动 -->
        <div class="bt-router-tag__div--right" @click="moveTag(1)"></div>
    </div>
    <!-- 自定义菜单 -->
    <div v-show="showInitMenu" class="bt-router-tag__div--menu">
        <div
            v-for="item in initMenuList"
            :key="item.value"
            class="menu-item"
            @click="activeRightTag(item.value)"
        >
            {{ item.label }}
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtRouterTag',
}
</script>
<script setup lang="ts">
import { ref, nextTick, onMounted } from 'vue'
interface IProps {
    tagList?: any //路由列表
    tagName?: string //标签名
    tagKey?: string //唯一值
    initMenuList?: any //自定义菜单
}
const props = withDefaults(defineProps<IProps>(), {
    tagName: 'name',
    tagKey: 'path',
})

//emit
//switchRouter：切换路由    closeRouter：关闭路由   activeRightMenu：自定义右键菜单回调
let emit = defineEmits(['switchRouter', 'closeRouter', 'activeRightMenu'])

//mounted
onMounted(() => {
    //关闭自定义按钮
    document.addEventListener('click', () => {
        if (showInitMenu.value) {
            showInitMenu.value = false
        }
    })
    //只能监听点击事件，监听右键事件会导致菜单无法显示
    //如果想监听右键可以配合pinia再根节点页面添加事件监听
})

//记录鼠标移入路由的标识
let routerMove = ref(-1)
//记录当前激活项
let routerActive = ref(-1)
//记录锚点位置
let anchor = 0

//显示自定义菜单，默认隐藏
let showInitMenu = ref(false)
//记录当前右键点击的菜单
let currentRightTag = undefined

//关闭路由标签
let closeTag = (item: any, index: any) => {
    emit('closeRouter', item, index)
}

//切换路由
let switchTag = (item: any, index: any) => {
    //修改当前激活项
    routerActive.value = index
    //跟新锚点位置
    anchor = index
    emit('switchRouter', item, index)
}

//设置激活样式
let setTagActive = (index: any) => {
    if (routerActive.value == index) {
        return {
            backgroundColor: '#EEF2FF',
            fontWeight: 600,
            borderBottom: '1px solid #4B74E2',
        }
    }
    return {
        backgroundColor: '#ffffff',
        fontWeight: 500,
    }
}

//鼠标移入显示关闭按钮
let showCloseBtn = (index: any) => {
    //修改鼠标移入标识
    routerMove.value = index
}
//鼠标移出隐藏关闭按钮
let hideCloseBtn = () => {
    routerMove.value = -1
}

// //获取路由列表及子元素的dom
let getRouterListDom = () => {
    let attrDom = document.getElementById('routerTagList')
    let clientWidth = attrDom?.clientWidth || 0
    let attrList = attrDom?.children
    let tagList = Array.prototype.slice.call(attrList)
    return {
        clientWidth,
        tagList,
    }
}

// //获取路由列表最多完整显示几个（是完整显示）
let getMaxShowTag = () => {
    let { clientWidth, tagList } = getRouterListDom()
    //获取列表可视宽度
    let length = tagList?.length || 0
    //最大显示个数
    let maxNumber = 0
    for (let i = 0; i < length; i++) {
        let tagW = tagList[i].clientWidth
        if (tagW <= clientWidth) {
            maxNumber++
            clientWidth -= tagW
        } else {
            break
        }
    }
    return maxNumber
}

//移动标签
let moveTag = (type: any) => {
    let size = props.tagList.length
    let maxShow = getMaxShowTag()
    //存在标签并且标签显示不开时移动
    if (size > maxShow) {
        //锚点的位置要加减最大显示个数，比如最多显示两个，要显示第三个，应该加2
        let position = anchor + type * maxShow
        if (position > size - 1) {
            //向右移动超出边界
            position = size - 1
        } else if (position < 0) {
            //向左移动超出边界
            position = 0
        }
        //跳转
        jumpTo(position)
    }
}

//跳到指定锚点位置
let jumpTo = (index: any) => {
    nextTick(() => {
        //跟新锚点位置
        anchor = index
        let { tagList } = getRouterListDom()
        let tagDom = tagList[index]
        tagDom.scrollIntoView()
    })
}

//自定义右键菜单
let initMenu = (event, menu): void => {
    //阻止默认事件
    event.preventDefault()
    //显示自定义菜单
    showInitMenu.value = true
    //获取自定义菜单dom <HTMLImageElement>
    const initMenu = document.getElementsByClassName(
        'bt-router-tag__div--menu',
    )[0] as HTMLImageElement
    //修改菜单位置
    // 两个10是小三角占的位置
    initMenu.style.top = `${event.clientY + 10}px`
    initMenu.style.left = `${event.clientX - 10}px`
    //  console.log("右键：", event, menu)
    currentRightTag = menu
    //菜单禁用  暂时不考虑
}

//右键菜单激活
let activeRightTag = (value: any) => {
    //返回当前右键的菜单和点击的自定义菜单项
    emit('activeRightMenu', currentRightTag, value)
}

//Expose
defineExpose({
    jumpTo,
    routerActive,
})
</script>

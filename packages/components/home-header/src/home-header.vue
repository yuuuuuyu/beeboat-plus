<template>
    <div ref="nav" class="bt-home-header">
        <div>
            <p
                v-for="(item, i) in menuList"
                :key="item.path"
                :class="{ active: item.path == currentActive }"
                @click="switchTag(item, i)"
            >
                <span> {{ item.name }}</span>
            </p>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtHomeHeader',
}
</script>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
export interface IProps {
    menuList?: any //路由列表
}
const props = withDefaults(defineProps<IProps>(), {})
//菜单当前激活项
let currentActive = ref('1')
//switchRouter：切换路由    closeRouter：关闭路由   activeRightMenu：自定义右键菜单回调
let emit = defineEmits(['switchParentRouter'])
//mounted
onMounted(() => {
    console.log(props.menuList)
})
//切换路由
let switchTag = (item: any, index: any) => {
    //修改当前激活项
    currentActive.value = item.path
    emit('switchParentRouter', item, index)
}
</script>

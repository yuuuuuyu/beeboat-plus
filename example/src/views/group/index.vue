<template>
    <div>
        <div style="margin-bottom: 10px">
            group组件
            <el-button @click="getStatus">获取当前group状态</el-button>
        </div>
        <bt-group
            ref="groupRef"
            :title="state.title"
            :show-left-fold-button="state.showLeftFoldButton"
            :show-right-fold-button="state.showRightFoldButton"
            :show-title-icon="state.showTitleIcon"
        >
            <template #content>
                <bt-group
                    ref="groupRef2"
                    :title="state.title"
                    :show-left-fold-button="false"
                    :show-right-fold-button="false"
                    :show-title-icon="true"
                >
                    <template #content>
                        <div>
                            element is the generic container for flow content. It has no effect on
                            the content or layout until styled in some way using CSS
                        </div>
                        <div>
                            element is the generic container for flow content. It has no effect on
                            the content or layout until styled in some way using CSS
                        </div>
                    </template>
                </bt-group>
            </template>
        </bt-group>
        <div style="margin-bottom: 10px">
            group组件
            <el-button @click="getStatus">获取当前group状态</el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const groupRef = ref()
const state = reactive({
    title: '我是标题',
    showLeftFoldButton: true,
    showRightFoldButton: true,
    showTitleIcon: true,
    titleIcon: '',
})
const getStatus = () => {
    console.log(`group status: ${groupRef.value.getStatus()}`)
}
</script>
<style lang="scss">
.bt-group {
    > .bt-group-title {
        height: 16px;
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: bold;
    }
}
.bt-group.collapsable {
    > .bt-group-title {
        height: 40px;
        margin-bottom: 0px;
        font-size: 16px;
        font-weight: bold;
        background-color: #f6f9ff;
    }
    > .bt-group--content {
        > .bt-group--content-wrapper {
            padding: 16px 24px 32px 24px;
        }
    }
}
</style>

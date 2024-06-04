<template>
    <div class="bt-file-mirror__tree">
        <BtTree
            ref="btTreeTarget"
            v-bind="{ ...$props, ...$attrs }"
            :data="props.targetData"
            :expand-on-click-node="false"
            @sync-expanded="syncExpandOrigin"
        >
            <template #default="{ data }">
                <span
                    :class="{ 'is-diff': data.__isDiff__, 'is-add': data.__isAdd__ }"
                    style="flex: 1"
                    @dblclick="handleNodeDbClick(data, 'target')"
                >
                    {{ data.name }}
                </span>
            </template>
        </BtTree>
        <BtTree
            ref="btTreeOrigin"
            v-bind="{ ...$props, ...$attrs }"
            :data="props.originData"
            :expand-on-click-node="false"
            @sync-expanded="syncExpandTarget"
        >
            <template #default="{ data }">
                <span
                    :class="{ 'is-diff': data.__isDiff__, 'is-add': data.__isAdd__ }"
                    style="flex: 1"
                    @dblclick="handleNodeDbClick(data, 'source')"
                >
                    {{ data.name }}
                </span>
            </template>
        </BtTree>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useInitFileMirror } from './file-mirror'

const btTreeOrigin = ref()
const btTreeTarget = ref()

interface TreeProps {
    showFilterInput?: boolean
    props?: any
    nodeKey?: string
    showCheckbox?: boolean
    originData?: Array<any>
    targetData?: Array<any>
}
const props = withDefaults(defineProps<TreeProps>(), {})

const { syncExpandTarget, syncExpandOrigin, compareData, getDiffData, loadData } =
    useInitFileMirror(btTreeOrigin, btTreeTarget, props.originData, props.targetData)

// 比对树差异
compareData()
// 加载并排序数据/目前按code排序
loadData()

const emits = defineEmits(['open'])

const handleNodeDbClick = (data, type) => {
    emits('open', getDiffData(data, type))
}
</script>

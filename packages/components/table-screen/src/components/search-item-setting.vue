<template>
    <div class="bt-search-item-setting">
        <el-input v-model="name" clearable placeholder="搜索显示条件" @input="onInput" />
        <div>
            <div class="field-title">显示条件</div>
        </div>

        <el-scrollbar class="field-list">
            <div
                v-for="item in dataList"
                :key="`bt-search-${item.id}`"
                :class="[getVerify(item) ? 'field-items' : 'field-items-none']"
                @click="onAddSearchItem(item)"
            >
                <template v-if="getVerify(item)">
                    {{ item.label }}
                </template>
            </div>
        </el-scrollbar>
    </div>
</template>
<script lang="ts">
export default {
    name: 'SearchItemSetting',
    inheritAttrs: false,
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ list: any[] }>()
const emits = defineEmits(['visibleChange'])
const name = ref('') // 搜索项
let dataList = ref(props.list) // 列数据
let originList = ref([...dataList.value]) // 列数据
// 搜索列展示数据过滤校验
const getVerify = item => {
    return Boolean(item.defaultSearchItem) == false
}
// 过滤搜索
const onInput = val => {
    if (val) dataList.value = originList.value.filter(i => i.label?.indexOf(val) >= 0)
    else dataList.value = props.list
}
// 增加搜索项
const onAddSearchItem = item => {
    console.log(item, '增加搜索项')
    let columnList = dataList.value
    for (let i = 0; i < columnList.length; i++) {
        if (columnList[i].id == item.id) {
            columnList[i].defaultSearchItem = 1
            break
        }
    }
    name.value = ''
    dataList.value = props.list
    emits('visibleChange', false)
}
</script>

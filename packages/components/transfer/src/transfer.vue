<template>
    <div class="bt-transfer">
        <el-transfer
            v-model="data.defaultValue"
            :data="props.transferData"
            :target-order="targetOrder"
            :filterable="props.filterable"
            :filter-placeholder="filterPlaceholder"
            :filter-method="props.filterMethod"
            :left-default-checked="props.leftDefaultChecked"
            :right-default-checked="props.rightDefaultChecked"
            :titles="props.titles"
            :button-texts="props.buttonTexts"
            :render-content="props.renderContent"
            :format="props.format"
            :props="props.props"
            :validate-event="props.validateEvent"
            @change="handleChange"
        >
            <template #left-footer>
                <slot name="leftFooter"></slot>
            </template>
            <template #right-footer>
                <slot name="rightFooter"></slot>
            </template>
        </el-transfer>
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtTransfer',
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'

interface baseState {
    defaultValue?: Array<[]>
    transferData?: Array<[]>
    filterable?: boolean
    leftDefaultChecked?: Array<[]>
    rightDefaultChecked?: Array<[]>
    filterMethod?: any
    titles?: Array<[]>
    buttonTexts?: Array<[]>
    renderContent?: any
    format?: any
    props?: object
    targetOrder?: string
    filterPlaceholder?: string
    validateEvent?: boolean
}

const props = withDefaults(defineProps<baseState>(), {})

const data = reactive({ ...props })

const emit = defineEmits(['change'])
const handleChange = (value: number | string, direction: 'left' | 'right', moveKeys: string[] | number[]) => {
    emit('change', { value: value, direction: direction, moveKeys: moveKeys })
}

</script>

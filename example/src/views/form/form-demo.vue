<template>
    <div class="form-demo">
        <!-- <div :style="formStyle"> -->
        <button @click="toggleVisible">切换form</button>
        <button @click="toggleName1Disable">name1 disable设置</button>
        <!-- <bt-input-demo v-model="formData.name1" /> -->
        <div>
            <el-form
                ref="formRef"
                :inline="true"
                :model="formData"
                label-position="top"
                label-width="120px"
                :standard-width-mode="false"
                :columns="3"
                :rules="{
                    name2: [{ required: true, message: '必填~~' }],
                }"
                size="default"
                :config="formConfig"
                @validate="validateChange"
                @standardFormWidth="getStandardFormWidth"
            >
                <el-form-item
                    :visibility="true"
                    label="名称1名称1名称1名称"
                    prop="name1"
                    :disabled="name1Disable"
                    :spacing="2"
                    :rules="[{ required: true, message: '必填~~' }]"
                >
                    <bt-input v-model="formData.name1" placeholder="请输入" />
                    <el-button type="primary" @click="onSubmit">Query</el-button>
                </el-form-item>
                <bt-form-item label="date-picker" :disabled="name1Disable">
                    <bt-date-picker
                        v-model="date"
                        :format="'YYYY/MM/DD'"
                        :value-format="'YYYY-MM-DD'"
                        @visibleChange="dateVisibleChange"
                    />
                </bt-form-item>
                <bt-form-item label="名称2" prop="name2" :disabled="visible" placeholder="111">
                    <bt-input-demo v-model="formData.name2" />
                </bt-form-item>
                <bt-form-item label="禁用">
                    <el-input v-model="formData.name3" disabled placeholder="请输入" />
                </bt-form-item>
                <bt-form-item label="隐藏">
                    <el-input v-model="formData.name3" disabled placeholder="请输入" />
                </bt-form-item>
                <bt-form-item label="checkBox">
                    <BtCheckbox
                        v-model="checkDefaultValue"
                        :options="checkBoxOptions"
                        :border="true"
                    />
                </bt-form-item>
                <bt-form-item>
                    <el-button type="primary" @click="onSubmit">Query</el-button>
                </bt-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
const checkDefaultValue = ref(['多选一'])
const checkBoxOptions = [
    { id: '1', value: '1', label: '多选一' },
    { id: '2', value: '2', label: '多选二' },
    { id: '3', value: '3', label: '多选三' },
]
const visible = ref(true)
const toggleVisible = () => {
    visible.value = !visible.value
}
const formRef = ref()
const name1Disable = ref(true)
const toggleName1Disable = () => {
    name1Disable.value = !name1Disable.value
    console.log(name1Disable.value, 'name1Disable.value..')
}
const dateVisibleChange = val => {
    console.log(val, 'val..')
}
// const checkBoxOptions = [
//     { id: '1', value: '1', label: '多选一' },
//     { id: '2', value: '2', label: '多选二' },
//     { id: '3', value: '3', label: '多选三' },
// ]
// const checkDefaultValue = ref(['多选一'])
const date = ref('2023-03-06')
// const defaultValue = ref('1')
// const options = [
//     {
//         value: '1',
//         label: 11,
//     },
//     {
//         value: '2',
//         label: 22,
//     },
// ]
// switch
const switchDefaultValue = ref(true)

const formData = reactive({
    name1: '',
    name2: '',
    name3: '',
})
const formConfig = reactive({
    name2: new Map([
        [
            'click',
            [
                () => {
                    console.log('name2 click')
                },
            ],
        ],
        ['value', ['222']],
    ]),
})
const onSubmit = () => {
    if (!formRef.value) return
    formRef.value.validate(valid => {
        if (valid) {
            console.log('submit!')
        } else {
            console.log('error submit!')
            return false
        }
    })
}
let formStyle = ref('')
const getStandardFormWidth = obj => {
    console.log(formRef.value.getStandardFormWidth())
    if (obj) {
        formStyle.value = `width:${obj.width}`
    }
}
const validateChange = () => {
    console.log('validate 触发..')
}
</script>

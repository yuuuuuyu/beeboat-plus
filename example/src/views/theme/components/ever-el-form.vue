<template>
    <el-card class="box-card">
        <template #header>
            <div class="card-header">
                <span>Form 表单</span>
            </div>
        </template>
        <div>
            <el-row class="ever-el-row">
                <el-form
                    ref="formRef"
                    style="width: 100%"
                    :model="form"
                    label-width="120px"
                    label-position="top"
                    :rules="rules"
                >
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-divider content-position="center">输入框</el-divider>
                            <el-form-item label="输入框">
                                <el-input v-model="form.form1" placeholder="输入框" />
                            </el-form-item>
                            <el-form-item label="输入框验证" prop="form1">
                                <el-input v-model="form.form1" placeholder="输入框验证" />
                            </el-form-item>
                            <el-form-item label="输入框禁用">
                                <el-input v-model="form.form1" placeholder="输入框禁用" disabled />
                            </el-form-item>
                            <el-form-item label="输入框清空">
                                <el-input v-model="form.form1" placeholder="输入框清空" clearable />
                            </el-form-item>
                            <el-form-item label="密码框">
                                <el-input
                                    v-model="form.form1"
                                    placeholder="密码框"
                                    type="password"
                                />
                            </el-form-item>
                            <el-form-item label="带图标">
                                <el-input
                                    v-model="form.form1"
                                    placeholder="带图标"
                                    :suffix-icon="Calendar"
                                />
                            </el-form-item>
                            <el-form-item label="带图标">
                                <el-input
                                    v-model="form.form1"
                                    placeholder="带图标"
                                    :prefix-icon="Search"
                                />
                            </el-form-item>
                            <el-form-item label="文本域">
                                <el-input
                                    v-model="form.form1"
                                    placeholder="文本域"
                                    type="textarea"
                                />
                            </el-form-item>
                            <el-form-item label="复合型-1">
                                <el-input v-model="form.form1" placeholder="复合型-1">
                                    <template #prepend>Http://</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="复合型-2">
                                <el-input v-model="form.form1" placeholder="复合型-2">
                                    <template #append>.com</template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="复合型-3">
                                <el-input v-model="form.form1" placeholder="复合型-3">
                                    <template #prepend>
                                        <el-select
                                            v-model="select"
                                            placeholder="Select"
                                            style="width: 115px"
                                        >
                                            <el-option label="Restaurant" value="1" />
                                            <el-option label="Order No." value="2" />
                                            <el-option label="Tel" value="3" />
                                        </el-select>
                                    </template>
                                    <template #append>
                                        <el-button :icon="Search" />
                                    </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="长度限制">
                                <el-input
                                    v-model="form.form1"
                                    placeholder="长度限制"
                                    show-word-limit
                                    maxlength="10"
                                />
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-divider content-position="center">数字输入框</el-divider>
                            <el-form-item label="数字框">
                                <el-input-number v-model="form.number" :min="0" :max="10" />
                            </el-form-item>
                            <el-form-item label="数字框验证" prop="number">
                                <el-input-number v-model="form.number" :min="0" :max="10" />
                            </el-form-item>
                            <el-form-item label="数字框禁用">
                                <el-input-number
                                    v-model="form.number"
                                    :min="0"
                                    :max="10"
                                    disabled
                                />
                            </el-form-item>
                            <el-form-item label="数字框精度">
                                <el-input-number
                                    v-model="form.number"
                                    :precision="2"
                                    :step="0.1"
                                    :max="10"
                                />
                            </el-form-item>
                            <el-form-item label="数字框按钮位置">
                                <el-input-number
                                    v-model="form.number"
                                    :min="0"
                                    :max="10"
                                    controls-position="right"
                                />
                            </el-form-item>

                            <el-divider content-position="center">单选</el-divider>
                            <el-form-item label="单选">
                                <el-radio-group v-model="form.radio">
                                    <el-radio label="1">Option 1</el-radio>
                                    <el-radio label="2">Option 2</el-radio>
                                    <el-radio label="3" disabled>Option 3</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="单选验证" prop="radio">
                                <el-radio-group v-model="form.radio">
                                    <el-radio label="1">Option 1</el-radio>
                                    <el-radio label="2">Option 2</el-radio>
                                    <el-radio label="3" disabled>Option 3</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="单选按钮样式">
                                <el-radio-group v-model="form.radio">
                                    <el-radio-button label="1">Option 1</el-radio-button>
                                    <el-radio-button label="2">Option 2</el-radio-button>
                                    <el-radio-button label="3" disabled>Option 3</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="单选带边框">
                                <el-radio-group v-model="form.radio">
                                    <el-radio label="1" :border="true">Option 1</el-radio>
                                    <el-radio label="2" :border="true">Option 2</el-radio>
                                    <el-radio label="3" :border="true" disabled>Option 3</el-radio>
                                </el-radio-group>
                            </el-form-item>

                            <el-divider content-position="center">评分</el-divider>
                            <el-form-item label="评分">
                                <el-rate v-model="form.rate" />
                            </el-form-item>
                            <el-form-item label="评分验证" prop="rate">
                                <el-rate v-model="form.rate" />
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <ever-el-from-select />
                        </el-col>
                    </el-row>
                </el-form>
            </el-row>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="8">
                    <ever-el-form-slider />
                </el-col>
                <el-col :span="8">
                    <ever-el-form-switch />
                    <ever-el-form-time-picker />
                    <ever-el-form-time-select />
                </el-col>
                <el-col :span="8">
                    <ever-el-form-date-time-picker />
                    <ever-el-form-check-box />
                </el-col>
            </el-row>
            <el-row class="ever-el-row" :gutter="20">
                <el-col :span="12">
                    <ever-el-form-transfer />
                </el-col>
                <el-col :span="12">
                    <ever-el-form-cascader />
                    <ever-el-form-tree-select />
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>
<script setup lang="ts">
import { reactive, ref, onMounted, Ref } from 'vue'
import { Calendar, Search } from '@element-plus/icons-vue'
import EverElFromSelect from './ever-el-form/ever-el-form-select.vue'
import EverElFormSlider from './ever-el-form/ever-el-form-slider.vue'
import EverElFormSwitch from './ever-el-form/ever-el-form-switch.vue'
import EverElFormTimePicker from './ever-el-form/ever-el-form-time-picker.vue'
import EverElFormTimeSelect from './ever-el-form/ever-el-form-time-select.vue'
import EverElFormTransfer from './ever-el-form/ever-el-form-transfer.vue'
import EverElFormDateTimePicker from './ever-el-form/ever-el-form-date-time-picker.vue'
import EverElFormCheckBox from './ever-el-form/ever-el-form-check-box.vue'
import EverElFormCascader from './ever-el-form/ever-el-form-cascader.vue'
import EverElFormTreeSelect from './ever-el-form/ever-el-form-tree-select.vue'

const form = reactive({
    form1: '',
    number: 0,
    radio: '1',
    rate: 2,
})
const select = ref('')
const rules = {
    form1: [{ required: true, message: '不能为空', trigger: 'blur' }],
    number: [
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value === 0) {
                    callback(new Error('错误错误错误'))
                } else {
                    callback()
                }
            },
            trigger: 'blur',
        },
    ],
    radio: [
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value === '1') {
                    callback(new Error('错误错误错误'))
                } else {
                    callback()
                }
            },
            trigger: 'blur',
        },
    ],
    rate: [
        {
            validator: (rule: any, value: any, callback: any) => {
                if (value === 2) {
                    callback(new Error('错误错误错误'))
                } else {
                    callback()
                }
            },
            trigger: 'blur',
        },
    ],
}
const formRef = ref(null) as Ref<any>

onMounted(() => {
    formRef.value.validate()
})
</script>

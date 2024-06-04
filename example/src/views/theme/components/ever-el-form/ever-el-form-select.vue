<template>
    <el-divider content-position="center">Select 选择器</el-divider>
    <el-form
        ref="formRef"
        style="width: 100%"
        :model="form"
        label-width="120px"
        label-position="top"
        :rules="rules"
    >
        <el-form-item label="选择器">
            <el-select v-model="form.select" placeholder="选择器">
                <el-option label="111111" value="111111" />
                <el-option label="222222" value="222222" />
                <el-option label="333333" value="333333" />
                <el-option label="444444" value="444444" />
            </el-select>
        </el-form-item>
        <el-form-item label="选择器-选中">
            <el-select v-model="form.selectActive" placeholder="选择器">
                <el-option label="111111" value="111111" />
                <el-option label="222222" value="222222" />
                <el-option label="333333" value="333333" />
                <el-option label="444444" value="444444" />
            </el-select>
        </el-form-item>
        <el-form-item label="选择器-有禁用项">
            <el-select v-model="form.select" placeholder="选择器">
                <el-option label="111111" value="111111" />
                <el-option label="222222" value="222222" />
                <el-option label="333333" value="333333" disabled />
                <el-option label="444444" value="444444" disabled />
            </el-select>
        </el-form-item>
        <el-form-item label="禁用状态">
            <el-select v-model="form.select" placeholder="选择器" disabled>
                <el-option label="111111" value="111111" />
                <el-option label="222222" value="222222" />
                <el-option label="333333" value="333333" disabled />
                <el-option label="444444" value="444444" disabled />
            </el-select>
        </el-form-item>
        <el-form-item label="禁用状态">
            <el-select v-model="form.selectActive" placeholder="选择器" disabled>
                <el-option label="111111" value="111111" />
                <el-option label="222222" value="222222" />
                <el-option label="333333" value="333333" disabled />
                <el-option label="444444" value="444444" disabled />
            </el-select>
        </el-form-item>
        <el-form-item label="选择器-可清空">
            <el-select v-model="form.selectActive" placeholder="选择器" clearable>
                <el-option label="111111" value="111111" />
                <el-option label="222222" value="222222" />
                <el-option label="333333" value="333333" />
                <el-option label="444444" value="444444" />
            </el-select>
        </el-form-item>

        <el-form-item label="多选">
            <el-select v-model="form.selectMultiple" placeholder="选择器" multiple>
                <el-option label="111111" value="111111" />
                <el-option label="222222" value="222222" />
                <el-option label="333333" value="333333" />
                <el-option label="444444" value="444444" />
                <el-option label="555555" value="555555" />
            </el-select>
        </el-form-item>
        <el-form-item label="多选">
            <el-select v-model="form.selectMultiple" placeholder="选择器" multiple collapse-tags>
                <el-option label="111111" value="111111" />
                <el-option label="222222" value="222222" />
                <el-option label="333333" value="333333" />
                <el-option label="444444" value="444444" />
                <el-option label="555555" value="555555" />
            </el-select>
        </el-form-item>
        <el-form-item label="多选-鼠标悬停显示">
            <el-select
                v-model="form.selectMultiple"
                placeholder="选择器"
                multiple
                collapse-tags
                collapse-tags-tooltip
            >
                <el-option label="111111" value="111111" />
                <el-option label="222222" value="222222" />
                <el-option label="333333" value="333333" />
                <el-option label="444444" value="444444" />
                <el-option label="555555" value="555555" />
            </el-select>
        </el-form-item>
        <el-form-item label="自定义模版">
            <el-select v-model="form.selectMultiple" placeholder="选择器">
                <el-option label="111111" value="111111">
                    <span style="float: left">111111</span>
                    <span
                        style="float: right; font-size: 13px; color: var(--el-text-color-secondary)"
                        >选项一</span
                    >
                </el-option>
                <el-option label="222222" value="222222" />
                <el-option label="333333" value="333333">
                    <span style="float: left">333333</span>
                    <span
                        style="float: right; font-size: 13px; color: var(--el-text-color-secondary)"
                        >选项三</span
                    >
                </el-option>
                <el-option label="444444" value="444444" />
                <el-option label="555555" value="555555" />
            </el-select>
        </el-form-item>
        <el-form-item label="分组">
            <el-select v-model="form.selectMultiple" placeholder="选择器">
                <el-option-group label="一组">
                    <el-option label="111111" value="111111" />
                    <el-option label="222222" value="222222" />
                </el-option-group>
                <el-option-group label="二组">
                    <el-option label="333333" value="333333" />
                    <el-option label="444444" value="444444" />
                    <el-option label="555555" value="555555" />
                </el-option-group>
            </el-select>
        </el-form-item>
        <el-form-item label="本地搜索">
            <el-select v-model="form.select" placeholder="选择器" filterable>
                <el-option label="111111" value="111111" />
                <el-option label="222222" value="222222" />
                <el-option label="333333" value="333333" />
                <el-option label="444444" value="444444" />
            </el-select>
        </el-form-item>
        <el-form-item label="创建选项">
            <el-select v-model="form.select" placeholder="选择器" filterable allow-create>
                <el-option label="111111" value="111111" />
                <el-option label="222222" value="222222" />
                <el-option label="333333" value="333333" />
                <el-option label="444444" value="444444" />
            </el-select>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const form = ref({
    select: '',
    selectActive: '222222',
    selectMultiple: ['222222', '333333', '444444'],
})
const rules = {}
</script>

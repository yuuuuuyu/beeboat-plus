<template>
    <div class="examples">
        <el-divider content-position="left">使用options属性创建静态数据</el-divider>
        <BtAutocomplete
            v-model="state1"
            :options="options"
            clearable
            placeholder="Please Input"
            @select="handleSelect"
            @change="handleChange"
        />
        <el-divider content-position="left">提供dataApi属性接受function</el-divider>
        <BtAutocomplete
            v-model="state3"
            :data-api="getData"
            clearable
            placeholder="Please Input"
            @select="handleSelect"
            @change="handleChange"
        />
        <el-divider content-position="left">提供dictId匹配字典</el-divider>
        <BtAutocomplete
            v-model="state4"
            dict-id="SysYesNo"
            clearable
            placeholder="Please Input"
            @select="handleSelect"
            @change="handleChange"
        />
        <el-divider content-position="left">
            使用valueKey属性匹配展示的label，默认值为name，以上两种形式均可使用valueKey重新指向新label
        </el-divider>
        <BtAutocomplete
            v-model="state2"
            :options="options"
            value-key="value1"
            clearable
            placeholder="Please Input"
            @select="handleSelect"
            @change="handleChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const options = ref([
    { name: '1', value1: 'option1' },
    { name: '2', value1: 'option2' },
    { name: '3', value1: 'option3' },
    { name: '4', value1: 'option4' },
    { name: '5', value1: 'option5' },
    { name: '6', value1: 'option6' },
])

interface RestaurantItem {
    value: string
    link: string
}

const state1 = ref('')
const state2 = ref('')
const state3 = ref('')
const state4 = ref('')

const getData = () => {
    return new Promise(resolve => {
        const data = [
            { name: 'dataApi1', value: '1' },
            { name: 'dataApi2', value: '2' },
            { name: 'dataApi3', value: '3' },
            { name: 'dataApi4', value: '4' },
        ]
        resolve({
            code: 0,
            data: data,
        })
    })
}

const handleSelect = (item: RestaurantItem) => {
    console.log(item)
}
const handleChange = (item: RestaurantItem) => {
    console.log(item)
}
</script>

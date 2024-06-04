<template>
    <el-divider content-position="center">Transfer 穿梭框</el-divider>
    <el-transfer
        v-model="value"
        filterable
        :filter-method="filterMethod"
        filter-placeholder="State Abbreviations"
        :data="data"
    />
</template>
<script setup lang="ts">
import { ref } from 'vue'
interface Option {
    key: number
    label: string
    initial: string
    disabled: boolean
}

const generateData = () => {
    const data: Option[] = []
    const states = [
        'California',
        'Illinois',
        'Maryland',
        'Texas',
        'Florida',
        'Colorado',
        'Connecticut ',
    ]
    const initials = ['CA', 'IL', 'MD', 'TX', 'FL', 'CO', 'CT']
    states.forEach((city, index) => {
        data.push({
            label: city,
            key: index,
            initial: initials[index],
            disabled: false,
        })
    })
    return data
}

const data = ref<Option[]>(generateData())
const value = ref([])

const filterMethod = (query: any, item: any) => {
    return item.initial.toLowerCase().includes(query.toLowerCase())
}
</script>

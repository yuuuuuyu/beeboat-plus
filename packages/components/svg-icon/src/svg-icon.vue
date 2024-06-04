<template>
    <el-icon class="bt-svg-icon">
        <svg aria-hidden="true">
            <use :xlink:href="'#' + props.name" />
        </svg>
    </el-icon>
</template>
<script lang="ts">
export default {
    name: 'BtSvgIcon',
}
</script>
<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        require: true,
        default: '',
    },
})
</script>

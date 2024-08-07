<template>
    <template v-if="column.contentComponent">
        <component
            :is="column.contentComponent"
            :column="column"
            :scope="scope"
            :manager="manager"
        ></component>
    </template>
    <template v-else>
        <template v-if="column.editProps?.enable == true && manager.editor.isEditing(scope.row)">
            <ColumnEditor :column="column" :row="scope.row" :manager="manager"></ColumnEditor>
        </template>
        <template v-else>
            <ColumnRender :column="column" :scope="scope"></ColumnRender>
        </template>
    </template>
</template>

<script setup lang="ts">
import ColumnEditor from './column-editor.vue'
import ColumnRender from './column-render.vue'

defineProps({
    column: {
        type: Object,
        default: null,
    },
    scope: {
        type: Object,
        default: null,
    },
    manager: {
        type: Object,
        default: null,
    },
})
</script>

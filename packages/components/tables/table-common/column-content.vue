<template>
    <template v-if="column.contentComponent">
        <component
            :is="column.contentComponent"
            :column="column"
            :scope="scope"
            :editor="editor"
        ></component>
    </template>
    <template v-else>
        <template v-if="column.editProps?.enable && editor.isEditing(scope.row)">
            <ColumnEditor :column="column" :row="scope.row" :editor="editor"></ColumnEditor>
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
    editor: {
        type: Object,
        default: null,
    },
})
</script>

<template>
    <div class="bt-file-mirror">
        <FileTree v-bind="props.treeProps" @open="open" />
        <MirrorDialog ref="mirrorDialog" v-bind="props.mirrorProps" @save="save" />
    </div>
</template>
<script lang="ts">
export default {
    name: 'BtFileMirror',
}
</script>
<script setup lang="ts">
import { ref } from 'vue'
import MirrorDialog from './mirror-dialog.vue'
import FileTree from './file-tree.vue'
const emits = defineEmits(['save'])
interface BtFileMirrorProps {
    dataApi: (params: any) => Promise<any>
    treeProps?: any
    mirrorProps?: any
}
const props = withDefaults(defineProps<BtFileMirrorProps>(), {
    treeProps: {},
    mirrorProps: {},
})
const mirrorDialog = ref()
const open = diffData => {
    mirrorDialog.value.open(diffData)
}
const save = (params: any) => {
    emits('save', params)
}
</script>

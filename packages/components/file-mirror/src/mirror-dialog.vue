<template>
    <el-dialog
        v-model="state.dialogvisible"
        v-bind="{ ...$props, ...$attrs }"
        width="90%"
        :show-close="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
    >
        <template #header="{ titleId, titleClass }">
            <div class="bt-dialog-header">
                <div :id="titleId" :class="titleClass">{{ props.title }}</div>
                <div>
                    <Close class="bt-icon-sty bt-ml" @click="close" />
                </div>
            </div>
        </template>
        <el-scrollbar height="500px">
            <div v-if="state.dialogvisible" ref="coderef" class="bt-file-mirror__code"></div>
        </el-scrollbar>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="state.dialogvisible = false">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { nextTick, ref, reactive, watch, defineProps } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { MergeView } from '@codemirror/merge'
import { EditorView, basicSetup } from 'codemirror'
import { EditorState } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
// import { oneDark } from '@codemirror/theme-one-dark'
const emits = defineEmits(['save'])
interface MirrorProps {
    title?: string
}
const props = withDefaults(defineProps<MirrorProps>(), {
    title: '文件差异对比',
})

const state = reactive({
    dialogvisible: false,
    source: '',
    target: '',
})

const coderef = ref(undefined)
const instance = ref()
watch(
    () => state.dialogvisible,
    val => {
        if (val) {
            nextTick(() => {
                instance.value = new MergeView({
                    highlightChanges: true, // 差异化高亮
                    orientation: 'a-b',
                    revertControls: 'b-to-a', // 可扩展暴露
                    renderRevertControl: () => {
                        const button = document.createElement('button')
                        button.type = 'button'
                        button.innerHTML = '⬅︎'
                        button.className = 'btn-styled'
                        return button
                    },
                    collapseUnchanged: {
                        margin: 10,
                        minSize: 50,
                    },
                    a: {
                        doc: state.target,
                        extensions: basicSetup,
                    },
                    b: {
                        doc: state.source,
                        extensions: [
                            basicSetup,
                            javascript(),
                            EditorView.editable.of(true),
                            EditorState.readOnly.of(false),
                        ],
                    },
                    parent: coderef.value,
                })
            })
        }
    },
)

const open = data => {
    state.dialogvisible = true
    state.source = data.source
    state.target = data.target
}

const save = () => {
    state.dialogvisible = false
    const result = instance.value.a.viewState.state.doc.text.join('')
    emits('save', result)
}
const close = () => {
    state.dialogvisible = false
    state.source = ''
    state.target = ''
}
defineExpose({
    open,
    save,
})
</script>

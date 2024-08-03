<template>
    <div>
        <h1>Message</h1>
        <btp-button type="info" @click="open">默认消息</btp-button>
        <btp-button type="success" @click="openSuccess">成功消息</btp-button>
        <btp-button type="warning" @click="openWarning">警告消息</btp-button>
        <btp-button type="danger" @click="openError">危险消息</btp-button>
        <btp-button type="primary" @click="openSimple">简单调用</btp-button>

        <h1>MessageBox</h1>
        <h2>alert</h2>
        <btp-button type="info" @click="openBox">打开VNode消息</btp-button>
        <btp-button type="info" @click="openBox2">打开Confirm消息</btp-button>
        <btp-button type="info" @click="openBoxAlert">打开Alert消息</btp-button>
        <btp-button type="info" @click="openSubmit">打开带提交的消息</btp-button>

        <h1>Notification</h1>
        <btp-button type="info" @click="openNoti">打开Notification消息</btp-button>
        <btp-button type="info" @click="openNotiSimple">打开Notification简便模式</btp-button>
    </div>
</template>

<script setup>
import { BTPUtils } from '@beeboat/core'
import { ElMessageBox, ElSwitch } from 'element-plus'
import { h, ref, markRaw } from 'vue'
import { Delete } from '@element-plus/icons-vue'

const open = () => {
    BTPUtils.message({
        message: 'This ',
        type: 'info',
        plain: true,
        showClose: true,
        // center: true,
        dangerouslyUseHTMLString: true,
        message: '<strong>This is <i>HTML</i> string</strong>',
        grouping: true,
        offset: 200,
        onClose: () => {
            console.log('close...')
        },
    })
}
const openSuccess = () => {
    BTPUtils.message({
        message: 'This is a success message.',
        type: 'success',
        plain: true,
    })
}
const openWarning = () => {
    BTPUtils.message({
        message: 'This is a warning message.',
        type: 'warning',
    })
}
const openError = () => {
    BTPUtils.message({
        message: 'This is a error message.',
        type: 'error',
    })
}
const openSimple = () => {
    BTPUtils.message('春江水暖鸭先知')
    BTPUtils.message.error('春江水暖鸭先知')
    BTPUtils.message.success('春江水暖鸭先知')
    BTPUtils.message.warning('春江水暖鸭先知')
}

const checked = ref(true)
const openBox = () => {
    BTPUtils.messageBox({
        title: 'Message',
        // Should pass a function if VNode contains dynamic props
        message: () =>
            h(ElSwitch, {
                modelValue: checked.value,
                'onUpdate:modelValue': val => {
                    checked.value = val
                },
            }),
        showCancelButton: true,
    })
        .then(res => {
            BTPUtils.message({
                type: 'info',
                message: `action: ${res}`,
            })
        })
        .catch(err => {
            BTPUtils.message({
                type: 'info',
                message: `action: ${err}`,
            })
        })
}

const openBox2 = () => {
    BTPUtils.messageBox.confirm('1This is a message', 'Title', {
        confirmButtonText: '确定',
        cancelButtonText: 'Cancel',
        type: 'warning',
        // 可以配置callback
        callback: action => {
            BTPUtils.message({
                type: 'info',
                message: `action: ${action}`,
            })
        },
    })
    // 可以使用promise
    // .then(res => {
    //     BTPUtils.message({
    //         type: 'info',
    //         message: `action: ${res}`,
    //     })
    // })
    // .catch(err => {
    //     BTPUtils.message({
    //         type: 'info',
    //         message: `action: ${err}`,
    //     })
    // })
}

const openBoxAlert = () => {
    BTPUtils.messageBox.alert('<strong>proxy is <i>HTML</i> string</strong>', 'Title', {
        // autofocus: true,
        draggable: true,
        center: true,
        dangerouslyUseHTMLString: true,
        icon: markRaw(Delete),
        type: 'warning',
        callback: action => {
            BTPUtils.message({
                type: 'info',
                message: `action: ${action}`,
            })
        },
    })
}

const openSubmit = () => {
    BTPUtils.messageBox
        .prompt('Please input your e-mail', 'Tip', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            inputPattern:
                /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
            inputErrorMessage: 'Invalid Email',
        })
        .then(({ value }) => {
            BTPUtils.message({
                type: 'success',
                message: `Your email is:${value}`,
            })
        })
        .catch(() => {
            BTPUtils.message({
                type: 'info',
                message: 'Input canceled',
            })
        })
}

const openNoti = () => {
    BTPUtils.notification({
        title: '常规模式',
        message: '常规模式常规模式常规模式常规模式常规模式常规模式常规模式',
        type: 'success',
    })
}
const openNotiSimple = () => {
    BTPUtils.notification.error({
        title: '简易模式',
        dangerouslyUseHTMLString: true,
        message: '<strong>This is <i>HTML</i> string</strong>',
        // message: '简易模式简易模式简易模式简易模式简易模式简易模式简易模式简易模式',
        // offset: 400,
        // showClose: false,
        position: 'bottom-right',
    })
}
</script>

<style lang="scss" scoped></style>

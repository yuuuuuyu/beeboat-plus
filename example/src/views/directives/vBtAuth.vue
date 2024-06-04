<template>
    <div v-bt-auth-readonly="':'">
        <div>v-btAuth 角色权限指令</div>
        <br />
        <div>角色权限指令：v-bt-auth</div>
        <div>只读角色权限指令：v-bt-auth-readonly</div>
        <div>置灰角色权限指令：v-bt-auth-disabled</div>
        <div>提供角色权限判断方法store.hasAuthIneffective('30000000,10000001,20000000:')</div>
        <br />
        <br />
        <button v-bt-power="false">v-bt-power 静态</button>
        <button v-bt-power:[states.powerState]>v-bt-power 动态</button>
        <button v-bt-auth:[states.activeRoles]>查看1</button>
        <button v-bt-auth="':11,'">查看2</button>
        <button v-bt-auth="':'">查看3</button>
        <br />
        <br />
        <bt-button v-bt-auth-disabled:[states.activeRoles]>查看1</bt-button>
        <bt-button v-bt-auth-disabled="':11,'">查看2</bt-button>
        <el-button v-bt-auth-disabled="':'" disabled>查看3</el-button>

        <!-- <el-button :disabled="store.hasAuthIneffective('30000000,10000001,20000000:')">
            aaaaaaaaa
        </el-button> -->
    </div>
    <div>
        <el-button @click="toggleRoles">切换</el-button>
    </div>
</template>

<script setup lang="ts">
import { BtUseAppStore } from '@beeboat/core/store'
import { reactive } from 'vue'
const store = BtUseAppStore()
// store.roleList = [{ id: '40000000' }, { id: '20000002' }]
store.roleList = [{ id: '40000000' }]
store.rightList = [{ id: '10', code: 'view' }]
// store.roleIdsList = ['40000000', '20000002']
store.roleIdsList = ['40000000']
store.rightIdsList = ['10']
const states = reactive({
    activeRoles: ':',
    powerState: false,
})
const toggleRoles = () => {
    states.activeRoles = '30000000,10000001,20000000:'
}
</script>

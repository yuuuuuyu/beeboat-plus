<template>
    <btp-dock-panel style="height: 300px" :min-dock-size="100" :dockSize="200" mode="vertical">
        <template #dock>折叠区域</template>
        右侧内容区域
    </btp-dock-panel>
    <br />
    <btp-dock-panel style="height: 300px" :dockSize="150" mode="horizontal">
        <template #dock>折叠区域</template>
        右侧内容区域
    </btp-dock-panel>
</template>
<script setup></script>

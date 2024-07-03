<template>
    <btp-dock-panel
        style="height: 300px"
        :min-collapsed-size="44"
        :dockSize="200"
        :is-vertical="true"
    >
        <template #dock>折叠区域</template>
        右侧内容区域
    </btp-dock-panel>
    <br />
    <btp-dock-panel style="height: 300px" :is-vertical="false">
        <template #dock>折叠区域</template>
        右侧内容区域
    </btp-dock-panel>
</template>
<script setup></script>

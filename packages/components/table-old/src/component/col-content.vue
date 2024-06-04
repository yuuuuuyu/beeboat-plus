<template>
    <!-- 图片(自带预览) -->
    <el-image
        v-if="item?.mark == 'image'"
        :src="scope.row[item.prop!]"
        :preview-src-list="[scope.row[item.prop!]]"
        fit="cover"
        class="table-image"
        preview-teleported
    />
    <!-- tag 标签（自带格式化） -->
    <el-tag
        v-else-if="item?.mark == 'tag'"
        :type="filterEnum(scope.row[item.prop!],item.dict,'tag')"
    >
        {{
            item.dict?.length
                ? filterEnum(scope.row[item.prop!], item.dict)
                : defaultFormat(scope.row[item.prop!])
        }}
    </el-tag>
    <!-- 文字（自带格式化） -->
    <span v-else>
        <template v-if="item.dictId">
            <dict-status :data="appStore.getDictItem(item.dictId,scope.row[item.prop!])" />
        </template>
        <template v-else>
            {{
                item.formatter
                    ? dynamicFormatter(item, scope, scope.row[item.prop!])
                    : defaultFormat(scope.row[item.prop!])
            }}
        </template>
    </span>
</template>

<script setup lang="ts">
import { filterEnum, defaultFormat } from '../helpers'
import DictStatus from '../../../dict-status/src/dict-status.vue'
import { BtUseAppStore } from '@beeboat/core'
defineProps<{ item: any; scope: any }>()
const appStore = BtUseAppStore()
// 格式化内容
const dynamicFormatter = (item, row, value) => {
    if (item.formatter) {
        return item.formatter(item, row, value)
    } else {
        return value
    }
}
</script>

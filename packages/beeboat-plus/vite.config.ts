// root/packages/beeboat-plus/vite.config.js
import { defineConfig } from 'vite'
import baseConfig from '../../vite.config'
import { resolve } from 'path'

export default defineConfig({
    ...baseConfig,
    build: {
        ...baseConfig.build,
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'BeeboatPlus',
            fileName: format => `beeboat-plus.${format}.js`,
        },
        rollupOptions: {
            output: {
                exports: 'named', // 设置为 "named" 以消除警告
            },
        },
    },
    resolve: {
        alias: {
            '@beeboat/core': resolve(__dirname, '../core'),
            '@beeboat/components': resolve(__dirname, '../components'),
        },
    },
    // logLevel: 'debug', // 开启调试日志
})

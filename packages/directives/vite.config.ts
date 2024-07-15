// root/packages/directives/vite.config.js
import { defineConfig } from 'vite'
import baseConfig from '../../vite.config'
import { resolve } from 'path'

export default defineConfig({
    ...baseConfig,
    build: {
        ...baseConfig.build,
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'Directives',
            fileName: format => `directives.${format}.js`,
        },
        rollupOptions: {
            ...baseConfig.build.rollupOptions,
        },
    },
})

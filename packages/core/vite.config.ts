// root/packages/core/vite.config.js
import { defineConfig } from 'vite'
import baseConfig from '../../vite.config'
import { resolve } from 'path'

export default defineConfig({
    ...baseConfig,
    build: {
        ...baseConfig.build,
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'Core',
            fileName: format => `core.${format}.js`,
        },
    },
})

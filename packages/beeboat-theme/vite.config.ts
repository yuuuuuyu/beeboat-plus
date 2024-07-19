import { defineConfig } from 'vite'
import baseConfig from '../../vite.config'
import path from 'path'

export default defineConfig({
    ...baseConfig,
    build: {
        ...baseConfig.build,
        lib: {
            entry: path.resolve(__dirname, './index.ts'),
            name: 'BeeboatTheme',
            fileName: format => `beeboat-theme.${format}.js`,
        },
        rollupOptions: {
            ...baseConfig.build.rollupOptions,
        },
    },
})

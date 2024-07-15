// root/packages/components/vite.config.js
import { defineConfig } from 'vite'
import baseConfig from '../../vite.config'
import { resolve } from 'path'

export default defineConfig({
    ...baseConfig,
    build: {
        ...baseConfig.build,
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Components',
            fileName: format => `components.${format}.js`,
        },
        rollupOptions: {
            ...baseConfig.build.rollupOptions,
            plugins: [...baseConfig.build.rollupOptions.plugins],
        },
    },
})

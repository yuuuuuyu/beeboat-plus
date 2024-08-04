import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'

export default defineConfig({
    build: {
        cssCodeSplit: true,
        minify: true,
        rollupOptions: {
            external: id => {
                const externals = [
                    'vue',
                    'lodash',
                    'lodash-es',
                    'vue-router',
                    '@vueuse/core',
                    'axios',
                    'element-plus',
                    'nprogress',
                    'vue-demi',
                    '@vue_shared',
                    'vue-cookies',
                    'pinia',
                    'uuid',
                    '@beeboat/core',
                    '@beeboat/components',
                    '@beeboat/directives',
                    'resize-observer',
                    'async-validator',
                    '@ctrl/tinycolor',
                    'jsencrypt',
                ]
                if (externals.includes(id)) {
                    return true
                }
                return externals.some(pkg => id.startsWith(pkg))
            },
            output: [
                {
                    format: 'es',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    exports: 'named',
                    dir: './dist/es',
                },
                {
                    format: 'cjs',
                    entryFileNames: '[name].js',
                    preserveModules: true,
                    exports: 'named',
                    dir: './dist/lib',
                },
            ],
        },
        lib: {
            entry: './index.ts',
            formats: ['es', 'cjs'],
        },
    },
    plugins: [vue(), DefineOptions()],
})

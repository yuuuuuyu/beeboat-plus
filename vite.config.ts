// vite.config.js

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
    plugins: [
        vue(),
        dts({
            // outputDir指定.d.ts文件生成的目录
            outputDir: 'dist/types',
            // 如果你想为整个项目生成单个声明文件，可以设置staticImport为true
            staticImport: false,
            // include指定需要生成声明文件的源文件
            include: ['**/*.ts', '**/*.tsx', '**/*.vue'],
            // exclude可以排除不需要生成声明文件的文件或目录
            exclude: ['vite.config.ts', 'node_modules'],
            // 使用根目录的 tsconfig.json
            tsConfigFilePath: path.resolve(__dirname, './tsconfig.json'),
        }),
    ],
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'YourLibraryName',
            formats: ['es', 'cjs'],
            fileName: format => `your-library-name.${format}.js`,
        },
        rollupOptions: {
            // 设置外部依赖，这些不会被打包进库
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
})

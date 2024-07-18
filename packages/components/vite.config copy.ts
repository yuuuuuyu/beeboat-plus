import { defineConfig } from 'vite'
import baseConfig from '../../vite.config'
import { resolve, join } from 'path'
import fs from 'fs'

// 递归查找所有子文件夹中的 index.ts 文件
function findComponentEntries(dir, baseDir = '') {
    const entries = {}

    function findFiles(currentDir, relativeDir = '') {
        const files = fs.readdirSync(currentDir)
        files.forEach(file => {
            const fullPath = join(currentDir, file)
            const relativePath = relativeDir ? `${relativeDir}/${file}` : file

            if (fs.statSync(fullPath).isDirectory()) {
                findFiles(fullPath, relativePath)
            } else if (file === 'index.ts' || file === 'index.tsx') {
                const entryName = relativeDir ? `${relativeDir}` : baseDir
                if (entryName) {
                    entries[entryName] = fullPath
                }
            }
        })
    }

    findFiles(dir)
    return entries
}

const componentsDir = resolve(__dirname, '../components')
const componentFiles = findComponentEntries(componentsDir)

// 移除根目录下的 index.ts 文件
delete componentFiles['index']

export default defineConfig({
    ...baseConfig,
    build: {
        ...baseConfig.build,
        lib: {
            entry: resolve(__dirname, './index.ts'),
            name: 'Components',
            fileName: format => `components.${format}.js`,
        },
    },
    resolve: {
        alias: {
            '@beeboat/core': resolve(__dirname, '../core'),
        },
    },
})

import { resolve, dirname, basename, join } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import shell from 'shelljs'

const componentPath = resolve(dirname(fileURLToPath(import.meta.url)), '../')

// 删除打包产物
export const removeDist = async () => {
    shell.rm('-rf', `${componentPath}/lib`)
    shell.rm('-rf', `${componentPath}/es`)
    shell.rm('-rf', `${componentPath}/types`)
    shell.rm('-rf', `${componentPath}/dist`)
}

// 打包组件: 使用vite.config配置
export const buildComponents = async () => {
    shell.cd(componentPath)
    shell.exec('vite build')
}

// TODO 复制产物到beeboat-plus包下
// 高效！
// 考虑改成vite插件
export const copyToBeeboatPlus = async (source, destination) => {
    const targetDir = '../beeboat-plus'

    // 确保目标目录存在
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
    }

    // 当前子包的名称
    const packageName = basename(process.cwd()) // 获取当前工作目录的名称作为包名

    // 定义目标路径
    const foldersToCopy = [
        { source: 'dist/es', target: join(targetDir, 'es', packageName) },
        { source: 'dist/lib', target: join(targetDir, 'lib', packageName) },
        { source: 'dist/types', target: join(targetDir, 'types', packageName) },
    ]

    // 进行复制操作
    foldersToCopy.forEach(folder => {
        const sourcePath = join(process.cwd(), folder.source) // 使用当前工作目录的路径

        // 确保源目录存在
        if (fs.existsSync(sourcePath)) {
            // 创建目标目录
            fs.mkdirSync(folder.target, { recursive: true })
            // 复制文件，确保只复制目录中的内容而不创建额外的层级
            shell.cp('-r', join(sourcePath, '*'), folder.target)
        } else {
            console.warn(`Source directory does not exist: ${sourcePath}`)
        }
    })
}

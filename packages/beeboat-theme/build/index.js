import gulp from 'gulp'
import { resolve, dirname, join } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import shell from 'shelljs'

const componentPath = resolve(dirname(fileURLToPath(import.meta.url)), '../')

const { src, dest } = gulp
const sass = gulpSass(dartSass)

// 删除打包产物
// TODO 已经提取成vite插件，此处待删除
export const removeDist = async () => {
    shell.rm('-rf', `${componentPath}/lib`)
    shell.rm('-rf', `${componentPath}/es`)
    shell.rm('-rf', `${componentPath}/types`)
    shell.rm('-rf', `${componentPath}/dist`)
}

// 构建根css
export const buildRootStyle = () => {
    return src(`${componentPath}/src/index.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions', 'ie >= 11'], // 设置支持的浏览器环境
            }),
        )
        .pipe(dest(`${componentPath}/dist/es`))
        .pipe(dest(`${componentPath}/dist/lib`))
}
// 构建组件css
export const buildComponentStyles = () => {
    return src(`${componentPath}/src/**/*.scss`)
        .pipe(sass(dartSass).on('error', sass.logError))
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 2 versions', 'ie >= 11'], // 设置支持的浏览器环境
            }),
        )
        .pipe(dest(`${componentPath}/dist/es`))
        .pipe(dest(`${componentPath}/dist/lib`))
}

// 打包组件: 使用vite.config配置
export const buildComponents = async () => {
    shell.cd(componentPath)
    shell.exec('vite build')
}

// TODO 复制产物到beeboat-plus包下
// 考虑改成vite插件
export const copyToBeeboatPlus = async (source, destination) => {
    const targetDir = '../beeboat-plus/theme-chalk'

    // 确保目标目录存在
    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
    }

    // 定义需要复制的文件夹及其目标路径
    const foldersToCopy = [
        { source: 'dist/es', target: join(targetDir, '/') },
        { source: 'dist/lib', target: join(targetDir, '/') },
        { source: 'dist/types', target: join(targetDir, '/') },
        {
            source: 'src/fonts',
            targets: [join(targetDir, 'es', '/'), join(targetDir, 'lib', '/')],
        },
    ]

    // 进行复制操作
    foldersToCopy.forEach(folder => {
        const sourcePath = join(componentPath, folder.source)

        // 确保源目录存在
        if (fs.existsSync(sourcePath)) {
            if (folder.targets) {
                // 如果定义了多个目标目录，分别复制
                folder.targets.forEach(target => {
                    // 创建目标目录
                    fs.mkdirSync(target, { recursive: true })
                    shell.cp('-r', sourcePath, target)
                })
            } else {
                // 否则直接复制到单个目标目录
                fs.mkdirSync(folder.target, { recursive: true })
                shell.cp('-r', sourcePath, folder.target)
            }
        } else {
            console.warn(`Source directory does not exist: ${sourcePath}`)
        }
    })
}

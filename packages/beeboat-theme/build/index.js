import gulp from 'gulp'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import shell from 'shelljs'
import ts from 'gulp-typescript'
import replace from 'gulp-replace'

const componentPath = resolve(dirname(fileURLToPath(import.meta.url)), '../')

const { src, dest } = gulp
const sass = gulpSass(dartSass)

// 删除打包产物
// TODO 公共
export const removeDist = async () => {
    shell.rm('-rf', `${componentPath}/lib`)
    shell.rm('-rf', `${componentPath}/es`)
    shell.rm('-rf', `${componentPath}/types`)
    shell.rm('-rf', `${componentPath}/dist`)
}

// 构建根css
export const buildRootStyle = () => {
    return src(`${componentPath}/src/index.scss`)
        .pipe(
            replace(/@import\s+["'](\.\/scss\/[^\/]+)\.scss["'];?/g, (match, p1) => {
                return `@import "${p1}.css";`
            }),
        )
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(dest(`${componentPath}/dist/es`))
        .pipe(dest(`${componentPath}/dist/lib`))
}
// 构建组件css
export const buildComponentStyles = () => {
    return src(`${componentPath}/src/**/*.scss`)
        .pipe(sass(dartSass).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(dest(`${componentPath}/dist/es`))
        .pipe(dest(`${componentPath}/dist/lib`))
}

// 打包组件: 使用vite.config配置
export const buildComponents = async () => {
    shell.cd(componentPath)
    shell.exec('vite build')
}

// 构建dts
// TODO
const tsProject = ts.createProject(`${componentPath}/tsconfig.json`)
export const buildTypes = async () => {
    return src(
        [
            `${componentPath}/**/**/*.ts`,
            `${componentPath}/**/**/*.vue`,
            `${componentPath}/shims-vue.d.ts`,
            '!**/node_modules/**',
            '!vite.config.ts',
            '!**/utils/**',
        ],
        {
            sourcemaps: false,
        },
    )
        .pipe(tsProject())
        .on('error', function (err) {
            console.error(err.toString())
            this.emit('end')
        })
        .pipe(dest(`${componentPath}/types`))
}

export function copyFont() {
    // 从src下单fonts文件夹下的所有文件开始=>压缩=>最终输出到当前目录下dist下的font目录
    return src(path.resolve(__dirname, `${componentPath}/src/fonts/**`)).pipe(dest('./dist/fonts'))
}
// TODO 复制产物到beeboat-plus包下
export const copyToBeeboatPlus = async (source, destination) => {
    shell.cp('-r', `${componentPath}/src/fonts/`, '../beeboat-plus/dist/es/beeboat-theme')
    shell.cp('-r', `${componentPath}/dist/es/`, '../beeboat-plus/dist/es/beeboat-theme')
    shell.cp('-r', `${componentPath}/dist/lib/`, '../beeboat-plus/dist/lib/beeboat-theme')
    shell.cp('-r', `${componentPath}/dist/types/`, '../beeboat-plus/dist/types/beeboat-theme')
}

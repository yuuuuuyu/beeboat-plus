import gulp from 'gulp'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import * as dartSass from 'sass'
import gulpSass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import shell from 'shelljs'
import ts from 'gulp-typescript'

const componentPath = resolve(dirname(fileURLToPath(import.meta.url)), '../')

const { src, dest } = gulp
const sass = gulpSass(dartSass)

// 删除打包产物
export const removeDist = async () => {
    shell.rm('-rf', `${componentPath}/lib`)
    shell.rm('-rf', `${componentPath}/es`)
    shell.rm('-rf', `${componentPath}/types`)
    shell.rm('-rf', `${componentPath}/dist`)
}

// 构建css
export const buildRootStyle = () => {
    return src(`${componentPath}/src/style.scss`)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest(`${componentPath}/es`))
        .pipe(dest(`${componentPath}/lib`))
}

// 构建每个组件下单独的css
export const buildStyle = () => {
    return src(`${componentPath}/src/**/style/**.scss`)
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(dest(`${componentPath}/es`))
        .pipe(dest(`${componentPath}/lib`))
}

// 打包组件
export const buildComponents = async () => {
    shell.cd(componentPath)
    shell.exec('vite build')
}

// 编译ts
export const compileTs = async () => {
    return src(tsPath).pipe(ts()).pipe(gulp.dest('dist1'))
}
const tsProject = ts.createProject(`${componentPath}/tsconfig.json`)
export const buildTypes = async () => {
    return src(
        [
            `${componentPath}/src/**/*.ts`,
            `${componentPath}/src/**/*.vue`,
            `${componentPath}/shims-vue.d.ts`,
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

// TODO:
// 1. 处理组件相关的主题
// 2. 处理系统主题
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCss from 'gulp-clean-css'
import path from 'path'
import { parallel, series, src, dest } from 'gulp'
import { definedReplaceAll } from '../../build/utils/replace-all'
import { buildPackages } from '../../build/packages'

/**
 * 对sass文件做处理
 */
function compile() {
    const sass = gulpSass(dartSass)
    // 从src下的scss文件开始=>编译成css=>添加前缀=>压缩=>最终输出到当前目录下dist下的css目录
    return src(path.resolve(__dirname, './src/components/*.scss'))
        .pipe(sass.sync())
        .pipe(autoprefixer())
        .on('data', data => {
            let content = data.contents.toString()
            content = definedReplaceAll(content, './fonts', 'beeboat-plus/beeboat-theme/fonts')
            data.contents = Buffer.from(content)
        })
        .pipe(cleanCss())
        .pipe(dest('./dist/css'))
}

/**
 * 处理font文件
 */
function copyFont() {
    // 从src下单fonts文件夹下的所有文件开始=>压缩=>最终输出到当前目录下dist下的font目录
    return src(path.resolve(__dirname, './src/components/fonts/**')).pipe(dest('./dist/fonts'))
}

/**
 * 把打包好的css输出到根目录的dist
 */
function copyFullStyle() {
    const rootDistPath = path.resolve(__dirname, '../../dist/beeboat-theme')
    return src(path.resolve(__dirname, './dist/**')).pipe(dest(rootDistPath))
}
/**
 * 把sass样式直接输出到dist/theme/src目录下
 * @returns
 */
export function copyThemeSource() {
    const rootDistSourcePath = path.resolve(__dirname, '../../dist/beeboat-theme/src')
    return src(path.resolve(__dirname, './src/**')).pipe(dest(rootDistSourcePath))
}

// 处理系统主题
const themeTask = buildPackages(__dirname, 'beeboat-theme')

export default parallel(copyThemeSource, series(compile, copyFont, copyFullStyle), themeTask)

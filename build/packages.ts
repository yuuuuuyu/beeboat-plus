// 专门打包util，指令，hook
import { series, parallel, src, dest } from 'gulp'
import { buildConfig } from './utils/config'
// import gulpSass from 'gulp-sass'
// import dartSass from 'sass'
// import autoprefixer from 'gulp-autoprefixer'
// import cleanCss from 'gulp-clean-css'
import path from 'path'
import { outDir, outRelativeDir, projectRoot } from './utils/paths'
import ts from 'gulp-typescript'
import { withTaskName } from './utils'
import { definedReplaceAll } from './utils/replace-all'

// 打包处理
export const buildPackages = (dirname: string, name: string) => {
    const tasks = Object.entries(buildConfig).map(([_module, config]) => {
        const output = path.resolve(dirname, config.output.name)
        // 安装依赖gulp-typescript
        return series(
            // 处理ts文件
            withTaskName(`build${dirname}`, () => {
                const tsConfig = path.resolve(projectRoot, 'tsconfig.json') // ts配置文件路径
                const inputs = ['**/*.ts', '!gulpfile.ts', '!node_modules', '!es', '!lib']
                return src(inputs)
                    .pipe(
                        ts.createProject(tsConfig, {
                            declaration: true, // 需要生成声明文件
                            strict: false, // 关闭严格模式
                            module: config.module,
                        })(),
                    )
                    .on('data', data => {
                        let content = data.contents.toString()
                        content = definedReplaceAll(content, '@beeboat/', outRelativeDir)
                        data.contents = Buffer.from(content)
                    })
                    .pipe(dest(output))
            }),
            // 处理scss文件
            withTaskName(`build${dirname}Css`, () => {
                const inputs = ['**/*.scss', '!gulpfile.ts', '!node_modules', '!es', '!lib']
                // const sass = gulpSass(dartSass)
                // 此处不生成css 从src下的scss文件开始=>编译成css=>添加前缀=>压缩=>最终输出到当前目录下dist下的css目录
                return (
                    src(inputs)
                        // .pipe(sass.sync())
                        // .pipe(autoprefixer()).pipe(cleanCss())
                        // .on('data', data => {
                        //     let content = data.contents.toString()
                        //     content = definedReplaceAll(content, '@beeboat/', outRelativeDir)
                        //     data.contents = Buffer.from(content)
                        // })
                        .pipe(dest(output))
                )
            }),
            withTaskName(`copy:${dirname}`, () => {
                // 将打包好的文件放到 es=>utils 和 lib => utils
                // 将utils模块拷贝到dist目录下的es和lib目录
                return src(`${output}/**`).pipe(
                    dest(path.resolve(outDir, `${config.output.alias}/${name}`, '')),
                )
            }),
        )
    })

    return parallel(...tasks)
}

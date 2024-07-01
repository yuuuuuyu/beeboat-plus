import path from 'path'

/** 项目根目录 */
export const projectRoot = path.resolve(__dirname, '../../')

/** 打包输出目录 */
export const outDir = path.resolve(__dirname, '../../dist')
/** 打包输出目录 */
export const outDirBeeTheme = path.resolve(__dirname, '../../packages/bee-theme')
/** beeboat-plus 入口 index.ts */
export const btRoot = path.resolve(__dirname, '../../packages/beeboat-plus')

/** 组件目录 */
export const compRoot = path.resolve(projectRoot, 'packages/components')

//------打包输出目录相对路径
/** 打包输出的相对路径目录 */
export const outRelativeDir = '../../../'

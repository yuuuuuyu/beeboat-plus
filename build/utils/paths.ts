import path from 'path'

/** 项目根目录 */
export const projectRoot = path.resolve(__dirname, '../../')

/** 打包输出目录 */
export const outDir = path.resolve(projectRoot, 'dist')

/** 打包输出目录 */
export const themeRoot = path.resolve(projectRoot, 'packages/beeboat-theme')
/** beeboat-plus 入口 index.ts */
export const btRoot = path.resolve(projectRoot, 'packages/beeboat-plus')
/** 组件目录 */
export const compRoot = path.resolve(projectRoot, 'packages/components')
/** core目录 */
export const coreRoot = path.resolve(projectRoot, 'packages/core')
/** directives目录 */
export const directivesRoot = path.resolve(projectRoot, 'packages/directives')

//------打包输出目录相对路径
/** 打包输出的相对路径目录 */
export const outRelativeDir = '../../../'

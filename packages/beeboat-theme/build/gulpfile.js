import gulp from 'gulp'
import {
    removeDist,
    buildRootStyle,
    buildComponentStyles,
    buildComponents,
    buildTypes,
} from './index.js'

const { series } = gulp

// dts部分暂时不生成
export default series(removeDist, buildComponents, buildComponentStyles, buildRootStyle)

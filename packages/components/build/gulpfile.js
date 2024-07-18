// gulpfile.js
import gulp from 'gulp'
import {
    removeDist,
    buildRootStyle,
    buildStyle,
    buildComponents,
    buildTypes,
    compileTs,
} from './index.js'

const { series } = gulp

// removeDist, buildComponents, buildStyle, buildRootStyle, buildTypes, compileTs
export default series(removeDist, buildComponents, buildStyle, buildRootStyle, buildTypes)

import gulp from 'gulp'
import { removeDist, buildComponents, copyToBeeboatPlus } from './index.js'

const { series } = gulp

export default series(removeDist, buildComponents, copyToBeeboatPlus)

import { DefineComponent } from 'vue'
export { Router } from 'vue-router'
export { AxiosInstance } from 'axios'

export interface ImportMetaEnv {
    [key: string]: any
    BASE_URL: string
    MODE: string
    DEV: boolean
    PROD: boolean
    SSR: boolean
}
export interface IOther {
    [k: string]: any
}

export interface IAppOptions {
    [k: string]: any
    appTemplate: DefineComponent<{}, {}, any>
    env: any
    constRoutes: any[]
    whiteList: string[]
    componentKit: any[]
    component?: any
    directive?: any
    config: IOther
    handlers: any[]
}
export { VueCookies } from 'vue-cookies'

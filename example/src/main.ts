import App from './App.vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { BTPApplication } from '@beeboat/core/app/index'
import * as components from '@beeboat/components'
import DynamicView from './views/layout/bt-view.vue'

import 'element-plus/dist/index.css'
import '@beeboat/theme/src/index.scss'
import './styles/index.scss'

import RouteHandler from './hooks/route-handler'
import {
    DictDataHandler,
    DataHandler,
    UserHandler,
    RemoteMethodLoadHandler,
} from './hooks/api-handlers'
import AppCacheManager from './hooks/cache-manager'

class UserApplication extends BTPApplication {
    constructor(options) {
        super(options)
        this.cacheManager = new AppCacheManager()
        this.appManager.layoutView = DynamicView
    }
}

function initApp() {
    fetch('./config/globalconfig.json')
        .then(response => response.json())
        .then(async data => {
            document.title = data['VITE_APP_TITLE']
            const application = new UserApplication({
                appTemplate: App,
                env: data,
                componentKit: [ElementPlus],
            })
            application.registerHandlers([
                new RouteHandler(),
                new DictDataHandler(),
                new DataHandler(),
                new UserHandler(),
                new RemoteMethodLoadHandler(),
            ])
            await application.init()
            application.mount()
            Object.entries(components).forEach(([name, component]) => {
                application.$app.component(name, component)
            })
            for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
                application.$app.component(key, component)
            }
        })
}
initApp()

import BTPBaseStepExecutor from './base-step-executor'

export default class BTPStepRedirectExecutor extends BTPBaseStepExecutor {
    constructor(executor) {
        super(executor)
    }
    execute(step) {
        if (step.mode == 'dialog') {
            this.executeDialog(step)
        } else if (step.mode == 'route') {
            this.executeRoute(step)
        } else if (step.mode == 'url') {
            this.executeRedirect(step)
        }
        return null
    }

    /**
     * 执行弹窗打开
     * TODO 参数要初始化
     * @param step 步骤信息
     */
    executeDialog(step) {
        this.executor.getRef(step.pageRef).openDialog(step.title, {})
    }

    /**
     * 执行路由跳转
     * TODO 考虑micro app模式跳转
     * @param step 步骤信息
     */
    executeRoute(step) {
        this.getRouter().push(eval(step.routePath.replace('${', '${this.')))
    }
    /**
     * 执行路由跳转
     * TODO 考虑micro app模式跳转
     * @param step 步骤信息
     */
    executeRedirect(step) {
        window.open(eval(step.url.replace('${', '${this.')), '_blank')
    }
}

import BTPBaseStepExecutor from './base-step-executor'

export default class BTPStepRedirectExecutor extends BTPBaseStepExecutor {
    execute(step, logic) {
        if (step.mode == 'dialog') {
            this.executeDialog(step, logic)
        } else if (step.mode == 'route') {
            this.executeRoute(step, logic)
        } else if (step.mode == 'url') {
            this.executeRedirect(step, logic)
        }
        return null
    }

    /**
     * 执行弹窗打开
     * TODO 参数要初始化
     * @param step 步骤信息
     * @param executor 上下文
     */
    executeDialog(step, executor) {
        executor.getRef(step.pageRef).openDialog(step.title, {})
    }

    /**
     * 执行路由跳转
     * TODO 考虑micro app模式跳转
     * @param step 步骤信息
     * @param executor 上下文
     */
    executeRoute(step, _executor) {
        this.getRouter().push(eval(step.routePath.replace('${', '${this.')))
    }
    /**
     * 执行路由跳转
     * TODO 考虑micro app模式跳转
     * @param step 步骤信息
     * @param executor 上下文
     */
    executeRedirect(step, _executor) {
        window.open(eval(step.url.replace('${', '${this.')), '_blank')
    }
}

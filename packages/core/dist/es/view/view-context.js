import BTPApplication from '../app/application';
import BTPBaseViewContext from './base-view-context';
import BTPUtils from '../utils-ex/utils-ex';
import BTPLogicExecutor from '../logics/logic-executor';
export default class BTPViewContext extends BTPBaseViewContext {
    constructor(vueInstance, viewId, viewModelId, parentViewContext) {
        super();
        this.vueInstance = vueInstance;
        this.parentViewContext = parentViewContext;
        this.viewId = viewId || vueInstance.type.props.uniqueId;
        this.viewModelId = viewModelId || vueInstance.type.props.viewModelId;
        if (this.viewModelId) {
            BTPUtils.getAppManager()
                .getView(this.viewModelId)
                .then(res => {
                this.buildView(res);
            });
        }
        else {
            console.log('无法获取参数', BTPApplication.getInstance().getRouter().currentRoute);
        }
    }
    /**
     * @description 创建视图的ViewContext对象
     * @param vueInstance 实例
     * @param viewId 视图ID
     * @param viewModelId 视图配置ID
     * @param parentViewContext 上级页面
     * @returns 对象
     */
    static createInstance(vueInstance, viewId, viewModelId, parentViewContext) {
        return new BTPViewContext(vueInstance, viewId, viewModelId, parentViewContext);
    }
    /**
     * 获取Ref对象引用
     * @param name ref名称
     * @returns 实例
     */
    getRef(name) {
        var _a;
        const refs = (_a = this.vueInstance) === null || _a === void 0 ? void 0 : _a.refs[name];
        return Array.isArray(refs) ? refs[0] : refs;
    }
    /**
     * 获取暴露方法
     * @returns 暴露方法
     */
    getExpose() {
        return {
            getViewContext: () => {
                return this;
            },
        };
    }
    /**
     * 绘制组件对象
     * @param component 组件信息
     * @returns 组件
     */
    render(component) {
        return component.type;
    }
    /**
     * 绘制组件对象
     * @param component 组件信息
     * @returns 组件
     */
    buildView(data) {
        this.viewModel.refers = data.refers;
        this.viewModel.components = data.components;
        this.buildProps(this.viewModel.components);
        this.buildDataModel(this.viewModel.components);
        this.buildEvents(this.viewModel.components);
    }
    buildProps(data) {
        const componentList = BTPUtils.getAppManager().parseComponentList(data);
        componentList.forEach(item => {
            var _a;
            if ((_a = item.props) === null || _a === void 0 ? void 0 : _a.rules) {
                item.props.rules.forEach(item => {
                    if (item.pattern) {
                        item.pattern = new RegExp(item.pattern);
                    }
                });
            }
        });
    }
    buildDataModel(data) {
        const componentList = BTPUtils.getAppManager().parseComponentList(data);
        componentList.forEach(item => {
            var _a, _b, _c, _d;
            if (((_b = (_a = item.model) === null || _a === void 0 ? void 0 : _a.prop) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                this.dataModelProxy[(_c = item.model) === null || _c === void 0 ? void 0 : _c.prop] = ((_d = item.model) === null || _d === void 0 ? void 0 : _d.defaultValue) || undefined;
            }
        });
    }
    buildEvents(components) {
        const viewContext = this;
        const componentList = BTPUtils.getAppManager().parseComponentList(components);
        componentList.forEach(item => {
            item.events = {};
            item.props.propEvents = {};
            if (item.actions) {
                Object.keys(item.actions).forEach(eventName => {
                    const action = item.actions[eventName];
                    if (action.propEvent) {
                        item.props.propEvents[eventName] = (p1, p2, p3, p4, p5, p6, p7) => {
                            const executor = new BTPLogicExecutor(viewContext, item, action, eventName, [p1, p2, p3, p4, p5, p6, p7]);
                            return this.executeAction(executor);
                        };
                    }
                    else {
                        item.events[eventName] = (p1, p2, p3, p4, p5, p6, p7) => {
                            const executor = new BTPLogicExecutor(viewContext, item, action, eventName, [p1, p2, p3, p4, p5, p6, p7]);
                            this.executeAction(executor);
                        };
                    }
                });
            }
            if (item.children) {
                this.buildEvents(item.children);
            }
        });
    }
    executeAction(executor) {
        console.log('执行事件', executor);
        return executor.execute();
    }
}

export default class BTPLogicExecutor {
    constructor(viewContext, component, event, eventName, params) {
        this.viewContext = viewContext;
        this.component = component;
        this.event = event;
        this.eventName = eventName;
        this.params = { 'row': params[0], node: params[1] };
    }
    execute() {
        return null;
    }
}

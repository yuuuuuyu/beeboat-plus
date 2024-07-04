export default class BTPLogicExecutor {
    public viewContext
    public component
    public event
    public eventName
    public params
    constructor(viewContext, component, event, eventName, params) {
        this.viewContext = viewContext
        this.component = component
        this.event = event
        this.eventName = eventName
        this.params = params
    }

    execute() {
        return null
    }
}

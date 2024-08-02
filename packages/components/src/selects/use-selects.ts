import { BTPApplication } from '@beeboat/core'

export const useSelects = (state: any, props) => {
    /**
     * 加载动态选项数据
     */
    const loadOptionData = () => {
        state.options = []
        if (props.dictId) {
            state.options =
                BTPApplication.getInstance().getCacheManager().getDictItemList(props.dictId) || []
            state.options.forEach((item: any) => {
                item.label = item.name
                item.value = isNaN(parseInt(item.value)) ? item.value : parseInt(item.value)
            })
        } else if (props.dataApi) {
            props.dataApi().then((res: any) => {
                res.data.forEach((item: any) => {
                    item.label = item[props.props.label]
                    item.value = item[props.props.value]
                })
                state.options = res.data
            })
        } else if (props.propEvents?.loadTreeData) {
            props.propEvents.loadTreeData({}).then(res => {
                res.data.forEach((item: any) => {
                    item.label = item[props.props.label]
                    item.value = item[props.props.value]
                })
                state.options = res.data
            })
        }
    }
    return { loadOptionData }
}

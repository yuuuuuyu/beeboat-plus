import { defineComponent, resolveComponent, openBlock, createBlock, withCtx, renderSlot, createElementBlock, Fragment, renderList, resolveDynamicComponent, mergeProps, toHandlers } from 'vue';

const withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp;
    }
  }
  return main;
};

var script = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    btConfig: {
      type: Object,
      default: void 0
    },
    btViewContext: {
      type: Object,
      default: void 0
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_el_form_item = resolveComponent("el-form-item");
      return openBlock(), createBlock(_component_el_form_item, null, {
        default: withCtx(() => [
          _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(__props.btConfig?.children, (component) => {
            return openBlock(), createBlock(resolveDynamicComponent(__props.btViewContext.render(component)), mergeProps({
              key: component.id,
              style: component.styles,
              "bt-view-context": __props.btViewContext,
              "bt-config": component
            }, toHandlers(component.events), component.props, {
              modelValue: __props.btViewContext.dataModelProxy[component.model?.prop],
              "onUpdate:modelValue": ($event) => __props.btViewContext.dataModelProxy[component.model?.prop] = $event
            }), null, 16, ["style", "bt-view-context", "bt-config", "modelValue", "onUpdate:modelValue"]);
          }), 128))
        ]),
        _: 3
      });
    };
  }
});

script.__file = "packages/components/form-item/src/index.vue";

const BtpFormItem = withInstall(script);

export { BtpFormItem };

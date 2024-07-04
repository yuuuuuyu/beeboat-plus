import { defineComponent, openBlock, createElementBlock, renderSlot, Fragment, renderList, createBlock, resolveDynamicComponent, mergeProps, toHandlers } from 'vue';

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

const _hoisted_1 = { class: "btp-div" };
var script = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    btConfig: {
      type: Object,
      default: {}
    },
    btViewContext: {
      type: Object,
      default: {}
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.btConfig?.children, (component) => {
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
        ])
      ]);
    };
  }
});

script.__file = "packages/components/div/src/index.vue";

const BtpDiv = withInstall(script);

export { BtpDiv };

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');

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

var script = /* @__PURE__ */ vue.defineComponent({
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
      const _component_el_form_item = vue.resolveComponent("el-form-item");
      return vue.openBlock(), vue.createBlock(_component_el_form_item, null, {
        default: vue.withCtx(() => [
          _ctx.$slots.default ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : (vue.openBlock(true), vue.createElementBlock(vue.Fragment, { key: 1 }, vue.renderList(__props.btConfig?.children, (component) => {
            return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.btViewContext.render(component)), vue.mergeProps({
              key: component.id,
              style: component.styles,
              "bt-view-context": __props.btViewContext,
              "bt-config": component
            }, vue.toHandlers(component.events), component.props, {
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

exports.BtpFormItem = BtpFormItem;

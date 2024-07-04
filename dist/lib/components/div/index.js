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

const _hoisted_1 = { class: "btp-div" };
var script = /* @__PURE__ */ vue.defineComponent({
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
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.btConfig?.children, (component) => {
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
        ])
      ]);
    };
  }
});

script.__file = "packages/components/div/src/index.vue";

const BtpDiv = withInstall(script);

exports.BtpDiv = BtpDiv;

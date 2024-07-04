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
      const _component_el_button = vue.resolveComponent("el-button");
      return vue.openBlock(), vue.createBlock(_component_el_button, { class: "btp-button" }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            vue.createTextVNode(vue.toDisplayString(__props.btConfig?.name || ""), 1)
          ]),
          _ctx.$slots.icon ? vue.renderSlot(_ctx.$slots, "icon", { key: 0 }) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.loading ? vue.renderSlot(_ctx.$slots, "loading", { key: 1 }) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
      });
    };
  }
});

script.__file = "packages/components/button/src/index.vue";

const BtpButton = withInstall(script);

exports.BtpButton = BtpButton;

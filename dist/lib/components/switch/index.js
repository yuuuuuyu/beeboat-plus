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
  setup(__props, { expose: __expose }) {
    const switchRef = vue.ref();
    __expose({
      focus: () => {
        switchRef.value.focus();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_switch = vue.resolveComponent("el-switch");
      return vue.openBlock(), vue.createBlock(_component_el_switch, {
        class: "btp-switch",
        ref_key: "switchRef",
        ref: switchRef
      }, {
        "active-action": vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "active-action")
        ]),
        "inactive-action": vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "inactive-action")
        ]),
        _: 3
      }, 512);
    };
  }
});

script.__file = "packages/components/switch/src/index.vue";

const BtpSwitch = withInstall(script);

exports.BtpSwitch = BtpSwitch;

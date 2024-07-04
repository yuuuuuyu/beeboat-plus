import { defineComponent, ref, resolveComponent, openBlock, createBlock, withCtx, renderSlot } from 'vue';

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
  setup(__props, { expose: __expose }) {
    const switchRef = ref();
    __expose({
      focus: () => {
        switchRef.value.focus();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_switch = resolveComponent("el-switch");
      return openBlock(), createBlock(_component_el_switch, {
        class: "btp-switch",
        ref_key: "switchRef",
        ref: switchRef
      }, {
        "active-action": withCtx(() => [
          renderSlot(_ctx.$slots, "active-action")
        ]),
        "inactive-action": withCtx(() => [
          renderSlot(_ctx.$slots, "inactive-action")
        ]),
        _: 3
      }, 512);
    };
  }
});

script.__file = "packages/components/switch/src/index.vue";

const BtpSwitch = withInstall(script);

export { BtpSwitch };

import { defineComponent, resolveComponent, openBlock, createBlock, withCtx, renderSlot, createTextVNode, toDisplayString, createCommentVNode } from 'vue';

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
      const _component_el_button = resolveComponent("el-button");
      return openBlock(), createBlock(_component_el_button, { class: "btp-button" }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            createTextVNode(toDisplayString(__props.btConfig?.name || ""), 1)
          ]),
          _ctx.$slots.icon ? renderSlot(_ctx.$slots, "icon", { key: 0 }) : createCommentVNode("v-if", true),
          _ctx.$slots.loading ? renderSlot(_ctx.$slots, "loading", { key: 1 }) : createCommentVNode("v-if", true)
        ]),
        _: 3
      });
    };
  }
});

script.__file = "packages/components/button/src/index.vue";

const BtpButton = withInstall(script);

export { BtpButton };

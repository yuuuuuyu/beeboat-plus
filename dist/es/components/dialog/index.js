import { defineComponent, reactive, resolveComponent, openBlock, createElementBlock, createVNode, withCtx, createElementVNode, createTextVNode, withModifiers } from 'vue';

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

const _hoisted_1 = /* @__PURE__ */ createElementVNode("span", null, "This is a message", -1);
const _hoisted_2 = { class: "dialog-footer" };
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
  setup(__props, { expose: __expose }) {
    const state = reactive({
      dialogVisible: false
    });
    const demo = () => {
    };
    __expose({
      openDialog: () => {
        state.dialogVisible = true;
      }
    });
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createElementBlock("div", null, [
        createVNode(_component_el_dialog, {
          title: "123",
          modelValue: state.dialogVisible,
          "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => state.dialogVisible = $event),
          "append-to-body": true
        }, {
          footer: withCtx(() => [
            createElementVNode("div", _hoisted_2, [
              createVNode(_component_el_button, {
                onClick: _cache[0] || (_cache[0] = ($event) => state.dialogVisible = false)
              }, {
                default: withCtx(() => [
                  createTextVNode("Cancel")
                ]),
                _: 1
              }),
              createVNode(_component_el_button, {
                type: "primary",
                onClick: withModifiers(demo, ["stop"])
              }, {
                default: withCtx(() => [
                  createTextVNode(" Confirm ")
                ]),
                _: 1
              }, 8, ["onClick"])
            ])
          ]),
          default: withCtx(() => [
            _hoisted_1
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
});

script.__file = "packages/components/dialog/src/index.vue";

const BtpDialog = withInstall(script);

export { BtpDialog };

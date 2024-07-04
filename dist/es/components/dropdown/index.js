import { defineComponent, ref, resolveComponent, openBlock, createBlock, withCtx, renderSlot, createVNode, createElementBlock, Fragment, renderList, mergeProps, toDisplayString, createTextVNode, createElementVNode } from 'vue';

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

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = /* @__PURE__ */ createElementVNode("i", { class: "bt-icon bt-icon-unfold" }, null, -1);
var script = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    props: {
      type: Object,
      default() {
        return { label: "name", value: "id" };
      }
    },
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
    const dropdownRef = ref();
    __expose({
      handleOpen: () => {
        return dropdownRef.value.handleOpen();
      },
      handleClose: () => {
        return dropdownRef.value.handleClose();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
      const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
      const _component_el_dropdown = resolveComponent("el-dropdown");
      return openBlock(), createBlock(_component_el_dropdown, {
        class: "btp-dropdown",
        ref_key: "dropdownRef",
        ref: dropdownRef
      }, {
        dropdown: withCtx(() => [
          renderSlot(_ctx.$slots, "dropdown", {}, () => [
            createVNode(_component_el_dropdown_menu, null, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.btConfig?.children, (component) => {
                  return openBlock(), createBlock(_component_el_dropdown_item, mergeProps({
                    key: component.id,
                    style: component.styles
                  }, component.props, {
                    command: component.props.command
                  }), null, 16, ["style", "command"]);
                }), 128))
              ]),
              _: 1
            })
          ])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            _ctx.$attrs["split-button"] || _ctx.$attrs["splitButton"] ? (openBlock(), createElementBlock("span", _hoisted_1, toDisplayString(__props.btConfig?.props.name || ""), 1)) : (openBlock(), createElementBlock("span", _hoisted_2, [
              createVNode(_component_el_button, { type: "$attrs.type || 'primarty'" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(__props.btConfig?.props.name || ""), 1),
                  _hoisted_3
                ]),
                _: 1
              })
            ]))
          ])
        ]),
        _: 3
      }, 512);
    };
  }
});

script.__file = "packages/components/dropdown/src/index.vue";

const BtpDropdown = withInstall(script);

export { BtpDropdown };

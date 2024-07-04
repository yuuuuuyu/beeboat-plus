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

const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = /* @__PURE__ */ vue.createElementVNode("i", { class: "bt-icon bt-icon-unfold" }, null, -1);
var script = /* @__PURE__ */ vue.defineComponent({
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
    const dropdownRef = vue.ref();
    __expose({
      handleOpen: () => {
        return dropdownRef.value.handleOpen();
      },
      handleClose: () => {
        return dropdownRef.value.handleClose();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_button = vue.resolveComponent("el-button");
      const _component_el_dropdown_item = vue.resolveComponent("el-dropdown-item");
      const _component_el_dropdown_menu = vue.resolveComponent("el-dropdown-menu");
      const _component_el_dropdown = vue.resolveComponent("el-dropdown");
      return vue.openBlock(), vue.createBlock(_component_el_dropdown, {
        class: "btp-dropdown",
        ref_key: "dropdownRef",
        ref: dropdownRef
      }, {
        dropdown: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "dropdown", {}, () => [
            vue.createVNode(_component_el_dropdown_menu, null, {
              default: vue.withCtx(() => [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.btConfig?.children, (component) => {
                  return vue.openBlock(), vue.createBlock(_component_el_dropdown_item, vue.mergeProps({
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
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            _ctx.$attrs["split-button"] || _ctx.$attrs["splitButton"] ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_1, vue.toDisplayString(__props.btConfig?.props.name || ""), 1)) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, [
              vue.createVNode(_component_el_button, { type: "$attrs.type || 'primarty'" }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(vue.toDisplayString(__props.btConfig?.props.name || ""), 1),
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

exports.BtpDropdown = BtpDropdown;

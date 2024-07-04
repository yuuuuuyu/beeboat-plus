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

var script$1 = /* @__PURE__ */ vue.defineComponent({
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
    const inputRef = vue.ref();
    __expose({
      focus: () => {
        inputRef.value.focus();
      },
      blur: () => {
        inputRef.value.blur();
      },
      clear: () => {
        inputRef.value.clear();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_input = vue.resolveComponent("el-input");
      return vue.openBlock(), vue.createBlock(_component_el_input, {
        class: "btp-input",
        ref_key: "inputRef",
        ref: inputRef
      }, {
        default: vue.withCtx(() => [
          _ctx.$slots.prefix ? vue.renderSlot(_ctx.$slots, "prefix", { key: 0 }) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.suffix ? vue.renderSlot(_ctx.$slots, "suffix", { key: 1 }) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.prepend ? vue.renderSlot(_ctx.$slots, "prepend", { key: 2 }) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.append ? vue.renderSlot(_ctx.$slots, "append", { key: 3 }) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 512);
    };
  }
});

script$1.__file = "packages/components/input/src/index.vue";

var script = /* @__PURE__ */ vue.defineComponent({
  __name: "input-number",
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
    const inputNumberRef = vue.ref();
    __expose({
      focus: () => {
        inputNumberRef.value.focus();
      },
      blur: () => {
        inputNumberRef.value.blur();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_input_number = vue.resolveComponent("el-input-number");
      return vue.openBlock(), vue.createBlock(_component_el_input_number, {
        class: "btp-input-number",
        ref_key: "inputNumberRef",
        ref: inputNumberRef
      }, {
        default: vue.withCtx(() => [
          _ctx.$slots["decrease-icon"] ? vue.renderSlot(_ctx.$slots, "decrease-icon", { key: 0 }) : vue.createCommentVNode("v-if", true),
          _ctx.$slots["increase-icon"] ? vue.renderSlot(_ctx.$slots, "increase-icon", { key: 1 }) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 512);
    };
  }
});

script.__file = "packages/components/input/src/input-number.vue";

const BtpInput = withInstall(script$1);
const BtpInputNumber = withInstall(script);

exports.BtpInput = BtpInput;
exports.BtpInputNumber = BtpInputNumber;

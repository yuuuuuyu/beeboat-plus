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

const PropsType = {
  data: {
    type: Object,
    require: true,
    default: {}
  }
};

const _hoisted_1 = { class: "btp-dict-status" };
const _hoisted_2 = { class: "text" };
const __default__ = {
  name: "BtDictStatus"
};
var script = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: PropsType,
  setup(__props) {
    const props = __props;
    const colorData = vue.computed(() => {
      return props.data;
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        colorData.value?.color ? (vue.openBlock(), vue.createElementBlock("span", {
          key: 0,
          class: "mark",
          style: vue.normalizeStyle(`background-color:${colorData.value.color}`)
        }, null, 4)) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("span", _hoisted_2, vue.toDisplayString(colorData.value?.name || "-"), 1)
      ]);
    };
  }
});

script.__file = "packages/components/dict-status/src/dict-status.vue";

const BtDictStatus = withInstall(script);

exports.BtDictStatus = BtDictStatus;
exports["default"] = BtDictStatus;

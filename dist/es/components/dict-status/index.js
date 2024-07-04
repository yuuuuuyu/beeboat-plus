import { defineComponent, computed, openBlock, createElementBlock, normalizeStyle, createCommentVNode, createElementVNode, toDisplayString } from 'vue';

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
var script = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: PropsType,
  setup(__props) {
    const props = __props;
    const colorData = computed(() => {
      return props.data;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        colorData.value?.color ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "mark",
          style: normalizeStyle(`background-color:${colorData.value.color}`)
        }, null, 4)) : createCommentVNode("v-if", true),
        createElementVNode("span", _hoisted_2, toDisplayString(colorData.value?.name || "-"), 1)
      ]);
    };
  }
});

script.__file = "packages/components/dict-status/src/dict-status.vue";

const BtDictStatus = withInstall(script);

export { BtDictStatus, BtDictStatus as default };

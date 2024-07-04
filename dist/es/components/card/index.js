import { defineComponent, resolveComponent, openBlock, createBlock, createSlots, withCtx, renderSlot, createElementBlock, Fragment, renderList, resolveDynamicComponent, mergeProps, toHandlers, createCommentVNode, createElementVNode, toDisplayString } from 'vue';

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

const _hoisted_1 = { class: "bt-card-header" };
const _hoisted_2 = { class: "bt-card-header--title" };
const _hoisted_3 = { class: "bt-card-header--toolbar" };
const _hoisted_4 = { class: "bt-card-footer" };
const _hoisted_5 = { class: "bt-card-footer--title" };
const _hoisted_6 = { class: "bt-card-footer--toolbar" };
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
      const _component_el_card = resolveComponent("el-card");
      return openBlock(), createBlock(_component_el_card, { class: "bt-card" }, createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.btConfig?.children, (component) => {
              return openBlock(), createBlock(resolveDynamicComponent(__props.btViewContext.render(component)), mergeProps({
                key: component.id,
                style: component.styles,
                "bt-view-context": __props.btViewContext,
                "bt-config": component
              }, toHandlers(component.events), component.props, {
                modelValue: __props.btViewContext.dataModelProxy[component.model?.prop],
                "onUpdate:modelValue": ($event) => __props.btViewContext.dataModelProxy[component.model?.prop] = $event
              }), null, 16, ["style", "bt-view-context", "bt-config", "modelValue", "onUpdate:modelValue"]);
            }), 128))
          ]),
          _ctx.$slots.header ? renderSlot(_ctx.$slots, "header", { key: 0 }) : createCommentVNode("v-if", true),
          _ctx.$slots.footer ? renderSlot(_ctx.$slots, "footer", { key: 1 }) : createCommentVNode("v-if", true)
        ]),
        _: 2
      }, [
        _ctx.$slots.header == void 0 && __props.btConfig?.toolbar?.children?.length > 0 ? {
          name: "header",
          fn: withCtx(() => [
            createElementVNode("div", _hoisted_1, [
              createElementVNode("span", _hoisted_2, toDisplayString(_ctx.$attrs.header), 1),
              createElementVNode("span", _hoisted_3, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.btConfig?.toolbar?.children, (component) => {
                  return openBlock(), createBlock(resolveDynamicComponent(__props.btViewContext.render(component)), mergeProps({
                    key: component.id,
                    style: component.styles,
                    "bt-view-context": __props.btViewContext,
                    "bt-config": component
                  }, toHandlers(component.events), component.props, {
                    modelValue: __props.btViewContext.dataModelProxy[component.model?.prop],
                    "onUpdate:modelValue": ($event) => __props.btViewContext.dataModelProxy[component.model?.prop] = $event
                  }), null, 16, ["style", "bt-view-context", "bt-config", "modelValue", "onUpdate:modelValue"]);
                }), 128))
              ])
            ])
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots.footer == void 0 && __props.btConfig?.footer?.children?.length > 0 ? {
          name: "footer",
          fn: withCtx(() => [
            createElementVNode("div", _hoisted_4, [
              createElementVNode("span", _hoisted_5, toDisplayString(_ctx.$attrs.footer), 1),
              createElementVNode("span", _hoisted_6, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(__props.btConfig?.footer?.children, (component) => {
                  return openBlock(), createBlock(resolveDynamicComponent(__props.btViewContext.render(component)), mergeProps({
                    key: component.id,
                    style: component.styles,
                    "bt-view-context": __props.btViewContext,
                    "bt-config": component
                  }, toHandlers(component.events), component.props, {
                    modelValue: __props.btViewContext.dataModelProxy[component.model?.prop],
                    "onUpdate:modelValue": ($event) => __props.btViewContext.dataModelProxy[component.model?.prop] = $event
                  }), null, 16, ["style", "bt-view-context", "bt-config", "modelValue", "onUpdate:modelValue"]);
                }), 128))
              ])
            ])
          ]),
          key: "1"
        } : void 0
      ]), 1024);
    };
  }
});

script.__file = "packages/components/card/src/index.vue";

const BtpCard = withInstall(script);

export { BtpCard };

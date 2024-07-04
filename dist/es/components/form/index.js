import { defineComponent, ref, resolveComponent, openBlock, createBlock, withCtx, renderSlot, createElementBlock, Fragment, renderList, resolveDynamicComponent, mergeProps, toHandlers, unref } from 'vue';
import Utils from 'beeboat-plus/es/core/utils-ex/utils';

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
  setup(__props, { expose: __expose }) {
    const formRef = ref();
    __expose({
      formRef,
      validate: (callback) => {
        formRef.value.validate(callback);
      },
      validateField: (props, callback) => {
        return formRef.value.resetFields(props, callback);
      },
      resetFields: (props) => {
        formRef.value.resetFields(props);
      },
      scrollToField: (prop) => {
        formRef.value.scrollToField(prop);
      },
      clearValidate: (props) => {
        formRef.value.clearValidate(props);
      },
      fields: () => {
        return formRef.value.fields;
      }
    });
    return (_ctx, _cache) => {
      const _component_el_form = resolveComponent("el-form");
      return _ctx.$attrs.model ? (openBlock(), createBlock(_component_el_form, {
        key: 0,
        ref_key: "formRef",
        ref: formRef,
        model: _ctx.$attrs.model
      }, {
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
          ])
        ]),
        _: 3
      }, 8, ["model"])) : (openBlock(), createBlock(_component_el_form, {
        key: 1,
        ref_key: "formRef",
        ref: formRef,
        model: __props.btViewContext?.dataModelProxy[unref(Utils).varName(__props.btConfig.code)]
      }, {
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
          ])
        ]),
        _: 3
      }, 8, ["model"]));
    };
  }
});

script.__file = "packages/components/form/src/index.vue";

const BtpForm = withInstall(script);

export { BtpForm };

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var Utils = require('beeboat-plus/lib/core/utils-ex/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Utils__default = /*#__PURE__*/_interopDefaultLegacy(Utils);

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

var script = /* @__PURE__ */ vue.defineComponent({
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
    const formRef = vue.ref();
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
      const _component_el_form = vue.resolveComponent("el-form");
      return _ctx.$attrs.model ? (vue.openBlock(), vue.createBlock(_component_el_form, {
        key: 0,
        ref_key: "formRef",
        ref: formRef,
        model: _ctx.$attrs.model
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.btConfig?.children, (component) => {
              return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.btViewContext.render(component)), vue.mergeProps({
                key: component.id,
                style: component.styles,
                "bt-view-context": __props.btViewContext,
                "bt-config": component
              }, vue.toHandlers(component.events), component.props, {
                modelValue: __props.btViewContext.dataModelProxy[component.model?.prop],
                "onUpdate:modelValue": ($event) => __props.btViewContext.dataModelProxy[component.model?.prop] = $event
              }), null, 16, ["style", "bt-view-context", "bt-config", "modelValue", "onUpdate:modelValue"]);
            }), 128))
          ])
        ]),
        _: 3
      }, 8, ["model"])) : (vue.openBlock(), vue.createBlock(_component_el_form, {
        key: 1,
        ref_key: "formRef",
        ref: formRef,
        model: __props.btViewContext?.dataModelProxy[vue.unref(Utils__default["default"]).varName(__props.btConfig.code)]
      }, {
        default: vue.withCtx(() => [
          vue.renderSlot(_ctx.$slots, "default", {}, () => [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.btConfig?.children, (component) => {
              return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(__props.btViewContext.render(component)), vue.mergeProps({
                key: component.id,
                style: component.styles,
                "bt-view-context": __props.btViewContext,
                "bt-config": component
              }, vue.toHandlers(component.events), component.props, {
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

exports.BtpForm = BtpForm;

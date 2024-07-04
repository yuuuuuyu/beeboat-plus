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

var script$2 = /* @__PURE__ */ vue.defineComponent({
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
    const datePickerRef = vue.ref();
    __expose({
      focus: () => {
        datePickerRef.value.focus();
      },
      handleOpen: () => {
        datePickerRef.value.handleOpen();
      },
      handleClose: () => {
        datePickerRef.value.handleClose();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_date_picker = vue.resolveComponent("el-date-picker");
      return vue.openBlock(), vue.createBlock(_component_el_date_picker, {
        class: "btp-date-picker",
        ref_key: "datePickerRef",
        ref: datePickerRef
      }, vue.createSlots({ _: 2 }, [
        _ctx.$slots.default ? {
          name: "default",
          fn: vue.withCtx((cell) => [
            vue.renderSlot(_ctx.$slots, "default", { cell })
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots["range-separator"] ? {
          name: "range-separator",
          fn: vue.withCtx(() => [
            vue.renderSlot(_ctx.$slots, "range-separator")
          ]),
          key: "1"
        } : void 0
      ]), 1536);
    };
  }
});

script$2.__file = "packages/components/datetimes/date-picker/src/index.vue";

const BtpDatePicker = withInstall(script$2);

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
    const timePickerRef = vue.ref();
    __expose({
      focus: () => {
        timePickerRef.value.focus();
      },
      blur: () => {
        timePickerRef.value.blur();
      },
      handleOpen: () => {
        timePickerRef.value.handleOpen();
      },
      handleClose: () => {
        timePickerRef.value.handleClose();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_time_picker = vue.resolveComponent("el-time-picker");
      return vue.openBlock(), vue.createBlock(_component_el_time_picker, {
        class: "btp-time-picker",
        ref_key: "timePickerRef",
        ref: timePickerRef
      }, null, 512);
    };
  }
});

script$1.__file = "packages/components/datetimes/time-picker/src/index.vue";

const BtpTimePicker = withInstall(script$1);

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
    const timeSelectRef = vue.ref();
    __expose({
      focus: () => {
        timeSelectRef.value.focus();
      },
      blur: () => {
        timeSelectRef.value.blur();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_time_select = vue.resolveComponent("el-time-select");
      return vue.openBlock(), vue.createBlock(_component_el_time_select, {
        class: "btp-time-select",
        ref_key: "timeSelectRef",
        ref: timeSelectRef
      }, null, 512);
    };
  }
});

script.__file = "packages/components/datetimes/time-select/src/index.vue";

const BtpTimeSelect = withInstall(script);

exports.BtpDatePicker = BtpDatePicker;
exports.BtpTimePicker = BtpTimePicker;
exports.BtpTimeSelect = BtpTimeSelect;

import { defineComponent, ref, resolveComponent, openBlock, createBlock, createSlots, withCtx, renderSlot } from 'vue';

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

var script$2 = /* @__PURE__ */ defineComponent({
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
    const datePickerRef = ref();
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
      const _component_el_date_picker = resolveComponent("el-date-picker");
      return openBlock(), createBlock(_component_el_date_picker, {
        class: "btp-date-picker",
        ref_key: "datePickerRef",
        ref: datePickerRef
      }, createSlots({ _: 2 }, [
        _ctx.$slots.default ? {
          name: "default",
          fn: withCtx((cell) => [
            renderSlot(_ctx.$slots, "default", { cell })
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots["range-separator"] ? {
          name: "range-separator",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "range-separator")
          ]),
          key: "1"
        } : void 0
      ]), 1536);
    };
  }
});

script$2.__file = "packages/components/datetimes/date-picker/src/index.vue";

const BtpDatePicker = withInstall(script$2);

var script$1 = /* @__PURE__ */ defineComponent({
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
    const timePickerRef = ref();
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
      const _component_el_time_picker = resolveComponent("el-time-picker");
      return openBlock(), createBlock(_component_el_time_picker, {
        class: "btp-time-picker",
        ref_key: "timePickerRef",
        ref: timePickerRef
      }, null, 512);
    };
  }
});

script$1.__file = "packages/components/datetimes/time-picker/src/index.vue";

const BtpTimePicker = withInstall(script$1);

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
    const timeSelectRef = ref();
    __expose({
      focus: () => {
        timeSelectRef.value.focus();
      },
      blur: () => {
        timeSelectRef.value.blur();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_time_select = resolveComponent("el-time-select");
      return openBlock(), createBlock(_component_el_time_select, {
        class: "btp-time-select",
        ref_key: "timeSelectRef",
        ref: timeSelectRef
      }, null, 512);
    };
  }
});

script.__file = "packages/components/datetimes/time-select/src/index.vue";

const BtpTimeSelect = withInstall(script);

export { BtpDatePicker, BtpTimePicker, BtpTimeSelect };

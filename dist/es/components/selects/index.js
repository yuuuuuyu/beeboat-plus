import { defineComponent, resolveComponent, openBlock, createBlock, createSlots, withCtx, renderSlot, ref, reactive, watch, onMounted, createElementBlock, Fragment, renderList, createTextVNode, toDisplayString, getCurrentInstance, createElementVNode, createCommentVNode, useAttrs, createVNode, withKeys, resolveDynamicComponent, mergeProps, toHandlers, withDirectives, vShow } from 'vue';
import { BTPApplication } from 'beeboat-plus/es/core/app';

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

var script$8 = /* @__PURE__ */ defineComponent({
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
      const _component_el_autocomplete = resolveComponent("el-autocomplete");
      return openBlock(), createBlock(_component_el_autocomplete, { class: "btp-autocomplete" }, createSlots({ _: 2 }, [
        _ctx.$slots.default ? {
          name: "default",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots.prefix ? {
          name: "prefix",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "prefix")
          ]),
          key: "1"
        } : void 0,
        _ctx.$slots.suffix ? {
          name: "suffix",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "suffix")
          ]),
          key: "2"
        } : void 0,
        _ctx.$slots.prepend ? {
          name: "prepend",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "prepend")
          ]),
          key: "3"
        } : void 0,
        _ctx.$slots.append ? {
          name: "append",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "append")
          ]),
          key: "4"
        } : void 0
      ]), 1024);
    };
  }
});

script$8.__file = "packages/components/selects/autocomplete/src/index.vue";

const BtpAutocomplete = withInstall(script$8);

const useSelects = (state, props) => {
  const loadOptionData = () => {
    state.options = [];
    if (props.dictId) {
      state.options = BTPApplication.getInstance().getCacheManager().getDictItemList(props.dictId) || [];
      state.options.forEach((item) => {
        item.label = item.name;
        item.value = isNaN(parseInt(item.value)) ? item.value : parseInt(item.value);
      });
    } else if (props.dataApi) {
      props.dataApi().then((res) => {
        res.data.forEach((item) => {
          item.label = item[props.props.label];
          item.value = item[props.props.value];
        });
        state.options = res.data;
      });
    }
  };
  return { loadOptionData };
};

var script$7 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    dictId: {
      type: String,
      default: void 0
    },
    dataApi: {
      type: Object,
      default: void 0
    },
    options: {
      type: Array,
      default: void 0
    },
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
    const props = __props;
    const cascaderRef = ref();
    const contentRef = ref();
    const cascaderPanelRef = ref();
    const state = reactive({
      options: []
    });
    const { loadOptionData } = useSelects(state, props);
    watch(
      () => props.dictId,
      () => {
        loadOptionData();
      }
    );
    watch(
      () => props.dataApi,
      () => {
        loadOptionData();
      }
    );
    loadOptionData();
    onMounted(() => {
      contentRef.value = cascaderRef.value.contentRef;
      cascaderPanelRef.value = cascaderRef.value.contentRef;
    });
    __expose({
      getCheckedNodes: () => {
        return cascaderRef.value.getCheckedNodes();
      },
      togglePopperVisible: () => {
        return cascaderRef.value.togglePopperVisible();
      },
      refresh: () => {
        loadOptionData();
      },
      cascaderRef,
      contentRef,
      cascaderPanelRef
    });
    return (_ctx, _cache) => {
      const _component_el_cascader = resolveComponent("el-cascader");
      return openBlock(), createBlock(_component_el_cascader, {
        class: "btp-cascader",
        ref_key: "cascaderRef",
        ref: cascaderRef,
        options: props.options || state.options
      }, createSlots({ _: 2 }, [
        _ctx.$slots.default ? {
          name: "default",
          fn: withCtx(({ node, data }) => [
            renderSlot(_ctx.$slots, "default", {
              node,
              data
            })
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots.empty ? {
          name: "empty",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "empty")
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["options"]);
    };
  }
});

script$7.__file = "packages/components/selects/cascader/src/index.vue";

const BtpCascader = withInstall(script$7);

var script$6 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    dictId: {
      type: String,
      default: void 0
    },
    dataApi: {
      type: Object,
      default: void 0
    },
    border: {
      type: Boolean,
      default: false
    },
    buttonMode: {
      type: Boolean,
      default: false
    },
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
    const props = __props;
    const state = reactive({
      options: []
    });
    const { loadOptionData } = useSelects(state, props);
    watch(
      () => props.dictId,
      () => {
        loadOptionData();
      }
    );
    watch(
      () => props.dataApi,
      () => {
        loadOptionData();
      }
    );
    loadOptionData();
    __expose({
      refresh: () => {
        loadOptionData();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_checkbox_button = resolveComponent("el-checkbox-button");
      const _component_el_checkbox = resolveComponent("el-checkbox");
      const _component_el_checkbox_group = resolveComponent("el-checkbox-group");
      return openBlock(), createBlock(_component_el_checkbox_group, { class: "btp-checkbox-group" }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            props.buttonMode ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(state.options, (item) => {
              return openBlock(), createBlock(_component_el_checkbox_button, {
                key: item.value,
                value: item.value
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(item.name), 1)
                ]),
                _: 2
              }, 1032, ["value"]);
            }), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(state.options, (item) => {
              return openBlock(), createBlock(_component_el_checkbox, {
                key: item.value,
                value: item.value
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(item.name), 1)
                ]),
                _: 2
              }, 1032, ["value"]);
            }), 128))
          ])
        ]),
        _: 3
      });
    };
  }
});

script$6.__file = "packages/components/selects/checkbox-group/src/index.vue";

const BtpCheckboxGroup = withInstall(script$6);

const _hoisted_1$1 = /* @__PURE__ */ createElementVNode("i", { class: "bt-icon bt-icon-hand" }, null, -1);
const _hoisted_2$1 = [
  _hoisted_1$1
];
var script$5 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    parentCtx: Object,
    relativeRefId: String,
    relativeRef: Object
  },
  emits: [
    "update:modelValue",
    "update:textValue",
    "change",
    "clear",
    "blur",
    "focus"
  ],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const instance = getCurrentInstance();
    const state = reactive({
      value: instance?.attrs.modelValue,
      textValue: instance?.attrs.textValue
    });
    watch(
      () => state.value,
      (value) => {
        state.value = value;
        instance?.emit("update:modelValue", state.value);
      },
      { immediate: true }
    );
    watch(
      () => state.textValue,
      (value) => {
        state.textValue = value;
        instance?.emit("update:textValue", state.textValue);
      },
      { immediate: true }
    );
    const onPickDataClick = () => {
      if (instance?.attrs.disabled != void 0 && instance?.attrs.disabled != false) {
        return;
      }
      const pickPageRef = getPickPageRef();
      if (!pickPageRef) {
        console.log("\u5F39\u7A97\u9009\u62E9\u7EC4\u4EF6\u672A\u914D\u7F6E\u6216\u672A\u627E\u5230\u5F39\u7A97\u9875\u9762");
        return;
      }
      if (!pickPageRef.openDialogForPickData) {
        console.log("\u5F39\u7A97\u9009\u62E9\u7EC4\u4EF6\u672A\u914D\u7F6E\u7684\u5F39\u7A97\u9875\u9762\u672A\u63D0\u4F9BopenDialogForPickData\u65B9\u6CD5");
        return;
      }
      pickPageRef.openDialogForPickData((value, textValue) => {
        state.value = value;
        state.textValue = textValue;
        emits("change", state.value);
      });
    };
    const getPickPageRef = () => {
      if (props.relativeRef) {
        return props.relativeRef;
      }
      if (props.relativeRefId && props.parentCtx && props.parentCtx.getRef) {
        return props.parentCtx.getRef(props.relativeRefId);
      }
      return null;
    };
    const onClearData = () => {
      state.value = "";
      state.textValue = "";
      emits("clear");
      emits("change", state.value);
    };
    return (_ctx, _cache) => {
      const _component_el_input = resolveComponent("el-input");
      return openBlock(), createBlock(_component_el_input, {
        class: "btp-data-picker",
        value: state.textValue,
        "onUpdate:value": _cache[0] || (_cache[0] = ($event) => state.textValue = $event),
        readonly: "",
        clearable: "",
        onClear: onClearData,
        onBlur: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("blur", $event)),
        onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("focus", $event)),
        onClick: onPickDataClick
      }, {
        suffix: withCtx(() => [
          createElementVNode("div", { onClick: onPickDataClick }, [..._hoisted_2$1])
        ]),
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["value"]);
    };
  }
});

script$5.__file = "packages/components/selects/data-picker/src/index.vue";

const BtpDataPicker = withInstall(script$5);

var script$4 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    dictId: {
      type: String,
      default: void 0
    },
    dataApi: {
      type: Object,
      default: void 0
    },
    border: {
      type: Boolean,
      default: false
    },
    buttonMode: {
      type: Boolean,
      default: false
    },
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
    const props = __props;
    const state = reactive({
      options: []
    });
    const { loadOptionData } = useSelects(state, props);
    watch(
      () => props.dictId,
      () => {
        loadOptionData();
      }
    );
    watch(
      () => props.dataApi,
      () => {
        loadOptionData();
      }
    );
    loadOptionData();
    __expose({
      refresh: () => {
        loadOptionData();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_radio_button = resolveComponent("el-radio-button");
      const _component_el_radio = resolveComponent("el-radio");
      const _component_el_radio_group = resolveComponent("el-radio-group");
      return openBlock(), createBlock(_component_el_radio_group, { class: "btp-radio-group" }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            props.buttonMode ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(state.options, (item) => {
              return openBlock(), createBlock(_component_el_radio_button, {
                key: item.value,
                value: item.value
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(item.name), 1)
                ]),
                _: 2
              }, 1032, ["value"]);
            }), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(state.options, (item) => {
              return openBlock(), createBlock(_component_el_radio, {
                key: item.value,
                border: props.border,
                value: item.value
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(item.name), 1)
                ]),
                _: 2
              }, 1032, ["border", "value"]);
            }), 128))
          ])
        ]),
        _: 3
      });
    };
  }
});

script$4.__file = "packages/components/selects/radio-group/src/index.vue";

const BtpRadioGroup = withInstall(script$4);

var script$3 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    dictId: {
      type: String,
      default: void 0
    },
    dataApi: {
      type: Object,
      default: void 0
    },
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
    const props = __props;
    const selectRef = ref();
    const state = reactive({
      options: []
    });
    const { loadOptionData } = useSelects(state, props);
    watch(
      () => props.dictId,
      () => {
        loadOptionData();
      }
    );
    watch(
      () => props.dataApi,
      () => {
        loadOptionData();
      }
    );
    loadOptionData();
    __expose({
      focus: () => {
        selectRef.value.focus();
      },
      blur: () => {
        selectRef.value.blur();
      },
      refresh: () => {
        loadOptionData();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      return openBlock(), createBlock(_component_el_select, {
        class: "btp-select",
        ref_key: "selectRef",
        ref: selectRef
      }, createSlots({
        default: withCtx(() => [
          _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }, () => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(state.options, (item) => {
              return openBlock(), createBlock(_component_el_option, {
                key: item.id,
                label: item.label,
                value: item.value,
                disabled: item.disabled
              }, null, 8, ["label", "value", "disabled"]);
            }), 128))
          ]) : createCommentVNode("v-if", true)
        ]),
        _: 2
      }, [
        _ctx.$slots.prefix ? {
          name: "prefix",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "prefix")
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots.empty ? {
          name: "empty",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "empty")
          ]),
          key: "1"
        } : void 0,
        _ctx.$slots.tag ? {
          name: "tag",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "tag")
          ]),
          key: "2"
        } : void 0,
        _ctx.$slots.loading ? {
          name: "loading",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "loading")
          ]),
          key: "3"
        } : void 0,
        _ctx.$slots.label ? {
          name: "label",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "label")
          ]),
          key: "4"
        } : void 0
      ]), 1536);
    };
  }
});

script$3.__file = "packages/components/selects/select/src/index.vue";

const BtpSelect = withInstall(script$3);

var script$2 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    dictId: {
      type: String,
      default: void 0
    },
    dataApi: {
      type: Object,
      default: void 0
    },
    options: {
      type: Array,
      default: void 0
    },
    props: {
      type: Object,
      default() {
        return { label: "name", value: "id", options: "children" };
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
    const props = __props;
    const selectRef = ref();
    const state = reactive({
      options: []
    });
    const { loadOptionData } = useSelects(state, props);
    watch(
      () => props.dictId,
      () => {
        loadOptionData();
      }
    );
    watch(
      () => props.dataApi,
      () => {
        loadOptionData();
      }
    );
    loadOptionData();
    __expose({
      focus: () => {
        selectRef.value.focus();
      },
      blur: () => {
        selectRef.value.blur();
      },
      refresh: () => {
        loadOptionData();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_select_v2 = resolveComponent("el-select-v2");
      return openBlock(), createBlock(_component_el_select_v2, {
        class: "btp-select-v2",
        ref_key: "selectRef",
        ref: selectRef,
        options: props.options || state.options,
        props: props.props
      }, createSlots({ _: 2 }, [
        _ctx.$slots.default ? {
          name: "default",
          fn: withCtx(({ item }) => [
            renderSlot(_ctx.$slots, "default", { item })
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots.prefix ? {
          name: "prefix",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "prefix")
          ]),
          key: "1"
        } : void 0,
        _ctx.$slots.empty ? {
          name: "empty",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "empty")
          ]),
          key: "2"
        } : void 0,
        _ctx.$slots.tag ? {
          name: "tag",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "tag")
          ]),
          key: "3"
        } : void 0,
        _ctx.$slots.loading ? {
          name: "loading",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "loading")
          ]),
          key: "4"
        } : void 0,
        _ctx.$slots.label ? {
          name: "label",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "label")
          ]),
          key: "5"
        } : void 0
      ]), 1032, ["options", "props"]);
    };
  }
});

script$2.__file = "packages/components/selects/select-v2/src/index.vue";

const BtpSelectV2 = withInstall(script$2);

const _hoisted_1 = { class: "btp-tree" };
const _hoisted_2 = {
  key: 0,
  class: "btp-tree--searchbar"
};
const _hoisted_3 = { class: "btp-tree--toolbar" };
const _hoisted_4 = { class: "btp-tree--content" };
const _hoisted_5 = { class: "btp-tree-node__label" };
var script$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    data: {
      type: Array,
      default: void 0
    },
    nodeKey: {
      type: String,
      default: "id"
    },
    toolbarMode: {
      type: String,
      default: "select"
    },
    showFilterInput: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "\u8BF7\u8F93\u5165"
    },
    dictId: {
      type: String,
      default: void 0
    },
    dataApi: {
      type: Object,
      default: void 0
    },
    props: {
      type: Object,
      default() {
        return { label: "name", value: "id", children: "children" };
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
  emits: [
    "node-click",
    "node-contextmenu",
    "check-change",
    "check",
    "current-change",
    "node-expand",
    "node-collapse",
    "node-drag-start",
    "node-drag-enter",
    "node-drag-leave",
    "node-drag-over",
    "node-drag-end",
    "node-drop",
    "sync-expanded",
    "clear"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const attrs = useAttrs();
    const elTreeRef = ref();
    const expandedKeys = ref([]);
    const state = reactive({
      options: [],
      searchText: ""
    });
    const { loadOptionData } = useSelects(state, props);
    watch(
      () => props.dictId,
      () => {
        loadOptionData();
      }
    );
    watch(
      () => props.dataApi,
      () => {
        loadOptionData();
      }
    );
    const showToolbar = (node) => {
      return props.toolbarMode == "select" && node.isCurrent || props.toolbarMode == "always";
    };
    const onEnterClick = () => {
      elTreeRef.value.filter(state.searchText);
    };
    const recursionKeys = (dataList, keyList) => {
      if (dataList) {
        dataList.forEach((item) => {
          keyList.push(item[props.props.value]);
          recursionKeys(item[props.props.children], keyList);
        });
      }
      return keyList;
    };
    const checkAll = () => {
      elTreeRef.value.setCheckedKeys(recursionKeys(state.options, []), false);
    };
    const nodeExpand = (v1, v2, v3) => {
      expandedKeys.value.push(v1.id);
      emits("node-expand", v1, v2, v3);
      emits("sync-expanded", expandedKeys);
    };
    const nodeCollapse = (v1, v2, v3) => {
      const _index = expandedKeys.value.findIndex((v) => v == v1.id);
      if (_index != -1) {
        expandedKeys.value.splice(_index, 1);
      }
      emits("node-collapse", v1, v2, v3);
      emits("sync-expanded", expandedKeys);
    };
    const setSyncExpanded = (expanded) => {
      expandedKeys.value = [...expanded.value];
    };
    const filterNode = (value, data) => {
      if (attrs["filter-node-method"]) {
        return attrs["filter-node-method"](value, data);
      } else {
        return !value || data[props.props.label]?.includes(value);
      }
    };
    loadOptionData();
    __expose({
      elTreeRef,
      getData: () => {
        return state.options;
      },
      checkAll: () => {
        checkAll();
      },
      filter: (value) => {
        elTreeRef.value.filter(value);
      },
      updateKeyChildren: (key, data) => {
        elTreeRef.value.updateKeyChildren(key, data);
      },
      getCheckedNodes: (leafOnly, includeHalfChecked) => {
        return elTreeRef.value.getCheckedNodes(leafOnly, includeHalfChecked);
      },
      setCheckedNodes: (value) => {
        elTreeRef.value.setCheckedNodes(value);
      },
      getCheckedKeys: (leafOnly) => {
        return elTreeRef.value.getCheckedKeys(leafOnly);
      },
      setCheckedKeys: (keys, leafOnly) => {
        elTreeRef.value.setCheckedKeys(keys, leafOnly);
      },
      setChecked: (data, checked, deep) => {
        elTreeRef.value.setChecked(data, checked, deep);
      },
      getHalfCheckedNodes: () => {
        return elTreeRef.value.getHalfCheckedNodes();
      },
      getHalfCheckedKeys: () => {
        return elTreeRef.value.getHalfCheckedKeys();
      },
      getCurrentKey: () => {
        return elTreeRef.value.getCurrentKey();
      },
      getCurrentNode: () => {
        return elTreeRef.value.getCurrentNode();
      },
      setCurrentKey: (key, shouldAutoExpandParent) => {
        elTreeRef.value.setCurrentKey(key, shouldAutoExpandParent);
      },
      setCurrentNode: (node, shouldAutoExpandParent) => {
        elTreeRef.value.setCurrentNode(node, shouldAutoExpandParent);
      },
      getNode: (data) => {
        return elTreeRef.value.getNode(data);
      },
      remove: (data) => {
        elTreeRef.value.remove(data);
      },
      append: (data, parentNode) => {
        elTreeRef.value.append(data, parentNode);
      },
      insertBefore: (data, refNode) => {
        elTreeRef.value.insertBefore(data, refNode);
      },
      insertAfter: (data, refNode) => {
        elTreeRef.value.insertAfter(data, refNode);
      },
      refresh: () => {
        loadOptionData();
      },
      setSyncExpanded
    });
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      const _component_el_input = resolveComponent("el-input");
      const _component_el_tree = resolveComponent("el-tree");
      const _component_el_scrollbar = resolveComponent("el-scrollbar");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createCommentVNode("\u641C\u7D22\u680F"),
        renderSlot(_ctx.$slots, "treeSearchbar", {}, () => [
          props.showFilterInput ? (openBlock(), createElementBlock("div", _hoisted_2, [
            createVNode(_component_el_input, {
              modelValue: state.searchText,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.searchText = $event),
              modelModifiers: { trim: true },
              placeholder: props.placeholder,
              clearable: "",
              onKeyup: withKeys(onEnterClick, ["enter"])
            }, {
              suffix: withCtx(() => [
                createVNode(_component_el_button, { link: "" }, {
                  default: withCtx(() => [
                    createElementVNode("em", {
                      class: "bt-icon bt-icon-search",
                      onClick: onEnterClick
                    })
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }, 8, ["modelValue", "placeholder", "onKeyup"])
          ])) : createCommentVNode("v-if", true)
        ]),
        createCommentVNode("\u6309\u94AE\u680F"),
        createElementVNode("div", _hoisted_3, [
          renderSlot(_ctx.$slots, "treeToolbar", {}, () => [
            __props.btConfig?.toolbar?.children?.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.btConfig?.toolbar?.children, (component) => {
              return openBlock(), createBlock(resolveDynamicComponent(__props.btViewContext.render(component)), mergeProps({
                key: component.id,
                style: component.styles,
                "bt-view-context": __props.btViewContext,
                "bt-config": component
              }, toHandlers(component.events), component.props), null, 16, ["style", "bt-view-context", "bt-config"]);
            }), 128)) : createCommentVNode("v-if", true)
          ])
        ]),
        createElementVNode("div", _hoisted_4, [
          createVNode(_component_el_scrollbar, null, {
            default: withCtx(() => [
              createVNode(_component_el_tree, mergeProps({
                ref_key: "elTreeRef",
                ref: elTreeRef
              }, { ..._ctx.$props, ..._ctx.$attrs }, {
                data: props.data || state.options,
                "filter-node-method": filterNode,
                "default-expanded-keys": expandedKeys.value,
                onNodeClick: _cache[1] || (_cache[1] = (v1, v2, v3, v4) => emits("node-click", v1, v2, v3, v4)),
                onNodeContextmenu: _cache[2] || (_cache[2] = (v1, v2, v3, v4) => _ctx.$emit("node-contextmenu", v1, v2, v3, v4)),
                onCheckChange: _cache[3] || (_cache[3] = (v1, v2, v3) => _ctx.$emit("check-change", v1, v2, v3)),
                onCheck: _cache[4] || (_cache[4] = (v1, v2) => _ctx.$emit("check", v1, v2)),
                onCurrentChange: _cache[5] || (_cache[5] = (v1, v2) => _ctx.$emit("current-change", v1, v2)),
                onNodeExpand: nodeExpand,
                onNodeCollapse: nodeCollapse,
                onNodeDragStart: _cache[6] || (_cache[6] = (v1, v2) => _ctx.$emit("node-drag-start", v1, v2)),
                onNodeDragEnter: _cache[7] || (_cache[7] = (v1, v2, v3) => _ctx.$emit("node-drag-enter", v1, v2, v3)),
                onNodeDragLeave: _cache[8] || (_cache[8] = (v1, v2, v3) => _ctx.$emit("node-drag-leave", v1, v2, v3)),
                onNodeDragOver: _cache[9] || (_cache[9] = (v1, v2, v3) => _ctx.$emit("node-drag-over", v1, v2, v3)),
                onNodeDragEnd: _cache[10] || (_cache[10] = (v1, v2, v3, v4) => _ctx.$emit("node-drag-end", v1, v2, v3, v4)),
                onNodeDrop: _cache[11] || (_cache[11] = (v1, v2, v3, v4) => _ctx.$emit("node-drop", v1, v2, v3, v4))
              }), {
                default: withCtx(({ node, data }) => [
                  renderSlot(_ctx.$slots, "default", {
                    node,
                    data
                  }, () => [
                    createCommentVNode("\u5185\u5BB9\u524D\u63D2\u69FD"),
                    renderSlot(_ctx.$slots, "prepend", {
                      node,
                      data
                    }),
                    createCommentVNode("\u6587\u672C\u63D2\u69FD"),
                    renderSlot(_ctx.$slots, "content", {
                      node,
                      data
                    }, () => [
                      createElementVNode("span", _hoisted_5, toDisplayString(data[props.props.label || "name"]), 1)
                    ]),
                    createCommentVNode("\u5185\u5BB9\u540E\u63D2\u69FD"),
                    withDirectives(createElementVNode("span", null, [
                      renderSlot(_ctx.$slots, "append", {
                        node,
                        data
                      }, () => [
                        __props.btConfig?.children?.length > 0 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.btConfig?.children, (component) => {
                          return openBlock(), createBlock(resolveDynamicComponent(__props.btViewContext.render(component)), mergeProps({
                            key: component.id,
                            style: component.styles,
                            "bt-view-context": __props.btViewContext,
                            "bt-config": component
                          }, toHandlers(component.events), component.props), null, 16, ["style", "bt-view-context", "bt-config"]);
                        }), 128)) : createCommentVNode("v-if", true)
                      ])
                    ], 512), [
                      [vShow, showToolbar(node)]
                    ])
                  ])
                ]),
                _: 3
              }, 16, ["data", "default-expanded-keys"])
            ]),
            _: 3
          })
        ])
      ]);
    };
  }
});

script$1.__file = "packages/components/selects/tree/src/index.vue";

const BtpTree = withInstall(script$1);

var script = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    dictId: {
      type: String,
      default: void 0
    },
    dataApi: {
      type: Object,
      default: void 0
    },
    data: {
      type: Array,
      default: void 0
    },
    props: {
      type: Object,
      default() {
        return { label: "name", children: "children" };
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
    const props = __props;
    const state = reactive({
      options: []
    });
    const { loadOptionData } = useSelects(state, props);
    watch(
      () => props.dictId,
      () => {
        loadOptionData();
      }
    );
    watch(
      () => props.dataApi,
      () => {
        loadOptionData();
      }
    );
    loadOptionData();
    __expose({
      refresh: () => {
        loadOptionData();
      }
    });
    return (_ctx, _cache) => {
      const _component_el_tree_select = resolveComponent("el-tree-select");
      return openBlock(), createBlock(_component_el_tree_select, {
        class: "btp-tree-select",
        data: props.data || state.options,
        props: props.props
      }, createSlots({ _: 2 }, [
        _ctx.$slots.default ? {
          name: "default",
          fn: withCtx(({ node, data }) => [
            renderSlot(_ctx.$slots, "default", {
              node,
              data
            })
          ]),
          key: "0"
        } : void 0,
        _ctx.$slots.empty ? {
          name: "empty",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "empty")
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["data", "props"]);
    };
  }
});

script.__file = "packages/components/selects/tree-select/src/index.vue";

const BtpTreeSelect = withInstall(script);

export { BtpAutocomplete, BtpCascader, BtpCheckboxGroup, BtpDataPicker, BtpRadioGroup, BtpSelect, BtpSelectV2, BtpTree, BtpTreeSelect };

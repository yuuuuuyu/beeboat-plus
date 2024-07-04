'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var BTPUtils = require('beeboat-plus/lib/core/utils-ex/utils-ex');
var vueDemi = require('vue-demi');
var is = require('beeboat-plus/lib/core/utils/is');
var app = require('beeboat-plus/lib/core/app');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var BTPUtils__default = /*#__PURE__*/_interopDefaultLegacy(BTPUtils);

const withInstall$1 = (main, extra) => {
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

var ResizeObserver$2 = {};

var ResizeObservation$1 = {};

var ContentRect$1 = {};

Object.defineProperty(ContentRect$1, "__esModule", { value: true });
var ContentRect = function (target) {
    if ('getBBox' in target) {
        var box = target.getBBox();
        return Object.freeze({
            height: box.height,
            left: 0,
            top: 0,
            width: box.width,
        });
    }
    else { // if (target instanceof HTMLElement) { // also includes all other non-SVGGraphicsElements
        var styles = window.getComputedStyle(target);
        return Object.freeze({
            height: parseFloat(styles.height || '0'),
            left: parseFloat(styles.paddingLeft || '0'),
            top: parseFloat(styles.paddingTop || '0'),
            width: parseFloat(styles.width || '0'),
        });
    }
};
ContentRect$1.ContentRect = ContentRect;

Object.defineProperty(ResizeObservation$1, "__esModule", { value: true });
var ContentRect_1$1 = ContentRect$1;
var ResizeObservation = /** @class */ (function () {
    function ResizeObservation(target) {
        this.target = target;
        this.$$broadcastWidth = this.$$broadcastHeight = 0;
    }
    Object.defineProperty(ResizeObservation.prototype, "broadcastWidth", {
        get: function () {
            return this.$$broadcastWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ResizeObservation.prototype, "broadcastHeight", {
        get: function () {
            return this.$$broadcastHeight;
        },
        enumerable: true,
        configurable: true
    });
    ResizeObservation.prototype.isActive = function () {
        var cr = ContentRect_1$1.ContentRect(this.target);
        return !!cr
            && (cr.width !== this.broadcastWidth
                || cr.height !== this.broadcastHeight);
    };
    return ResizeObservation;
}());
ResizeObservation$1.ResizeObservation = ResizeObservation;

var ResizeObserverEntry$1 = {};

Object.defineProperty(ResizeObserverEntry$1, "__esModule", { value: true });
var ContentRect_1 = ContentRect$1;
var ResizeObserverEntry = /** @class */ (function () {
    function ResizeObserverEntry(target) {
        this.target = target;
        this.contentRect = ContentRect_1.ContentRect(target);
    }
    return ResizeObserverEntry;
}());
ResizeObserverEntry$1.ResizeObserverEntry = ResizeObserverEntry;

Object.defineProperty(ResizeObserver$2, "__esModule", { value: true });
var ResizeObservation_1 = ResizeObservation$1;
var ResizeObserverEntry_1 = ResizeObserverEntry$1;
var resizeObservers = [];
var ResizeObserver$1 = /** @class */ (function () {
    function ResizeObserver(callback) {
        /** @internal */
        this.$$observationTargets = [];
        /** @internal */
        this.$$activeTargets = [];
        /** @internal */
        this.$$skippedTargets = [];
        var message = callbackGuard(callback);
        if (message) {
            throw TypeError(message);
        }
        this.$$callback = callback;
    }
    ResizeObserver.prototype.observe = function (target) {
        var message = targetGuard('observe', target);
        if (message) {
            throw TypeError(message);
        }
        var index = findTargetIndex(this.$$observationTargets, target);
        if (index >= 0) {
            return;
        }
        this.$$observationTargets.push(new ResizeObservation_1.ResizeObservation(target));
        registerResizeObserver(this);
    };
    ResizeObserver.prototype.unobserve = function (target) {
        var message = targetGuard('unobserve', target);
        if (message) {
            throw TypeError(message);
        }
        var index = findTargetIndex(this.$$observationTargets, target);
        if (index < 0) {
            return;
        }
        this.$$observationTargets.splice(index, 1);
        if (this.$$observationTargets.length === 0) {
            deregisterResizeObserver(this);
        }
    };
    ResizeObserver.prototype.disconnect = function () {
        this.$$observationTargets = [];
        this.$$activeTargets = [];
        deregisterResizeObserver(this);
    };
    return ResizeObserver;
}());
var ResizeObserver_2 = ResizeObserver$2.ResizeObserver = ResizeObserver$1;
function registerResizeObserver(resizeObserver) {
    var index = resizeObservers.indexOf(resizeObserver);
    if (index < 0) {
        resizeObservers.push(resizeObserver);
        startLoop();
    }
}
function deregisterResizeObserver(resizeObserver) {
    var index = resizeObservers.indexOf(resizeObserver);
    if (index >= 0) {
        resizeObservers.splice(index, 1);
        checkStopLoop();
    }
}
function callbackGuard(callback) {
    if (typeof (callback) === 'undefined') {
        return "Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.";
    }
    if (typeof (callback) !== 'function') {
        return "Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.";
    }
}
function targetGuard(functionName, target) {
    if (typeof (target) === 'undefined') {
        return "Failed to execute '" + functionName + "' on 'ResizeObserver': 1 argument required, but only 0 present.";
    }
    if (!(target && target.nodeType === window.Node.ELEMENT_NODE)) {
        return "Failed to execute '" + functionName + "' on 'ResizeObserver': parameter 1 is not of type 'Element'.";
    }
}
function findTargetIndex(collection, target) {
    for (var index = 0; index < collection.length; index += 1) {
        if (collection[index].target === target) {
            return index;
        }
    }
    return -1;
}
var gatherActiveObservationsAtDepth = function (depth) {
    resizeObservers.forEach(function (ro) {
        ro.$$activeTargets = [];
        ro.$$skippedTargets = [];
        ro.$$observationTargets.forEach(function (ot) {
            if (ot.isActive()) {
                var targetDepth = calculateDepthForNode(ot.target);
                if (targetDepth > depth) {
                    ro.$$activeTargets.push(ot);
                }
                else {
                    ro.$$skippedTargets.push(ot);
                }
            }
        });
    });
};
var hasActiveObservations = function () {
    return resizeObservers.some(function (ro) { return !!ro.$$activeTargets.length; });
};
var hasSkippedObservations = function () {
    return resizeObservers.some(function (ro) { return !!ro.$$skippedTargets.length; });
};
var broadcastActiveObservations = function () {
    var shallowestTargetDepth = Infinity;
    resizeObservers.forEach(function (ro) {
        if (!ro.$$activeTargets.length) {
            return;
        }
        var entries = [];
        ro.$$activeTargets.forEach(function (obs) {
            var entry = new ResizeObserverEntry_1.ResizeObserverEntry(obs.target);
            entries.push(entry);
            obs.$$broadcastWidth = entry.contentRect.width;
            obs.$$broadcastHeight = entry.contentRect.height;
            var targetDepth = calculateDepthForNode(obs.target);
            if (targetDepth < shallowestTargetDepth) {
                shallowestTargetDepth = targetDepth;
            }
        });
        ro.$$callback(entries, ro);
        ro.$$activeTargets = [];
    });
    return shallowestTargetDepth;
};
var deliverResizeLoopErrorNotification = function () {
    var errorEvent = new window.ErrorEvent('ResizeLoopError', {
        message: 'ResizeObserver loop completed with undelivered notifications.',
    });
    window.dispatchEvent(errorEvent);
};
var calculateDepthForNode = function (target) {
    var depth = 0;
    while (target.parentNode) {
        target = target.parentNode;
        depth += 1;
    }
    return depth;
};
var notificationIteration = function () {
    var depth = 0;
    gatherActiveObservationsAtDepth(depth);
    while (hasActiveObservations()) {
        depth = broadcastActiveObservations();
        gatherActiveObservationsAtDepth(depth);
    }
    if (hasSkippedObservations()) {
        deliverResizeLoopErrorNotification();
    }
};
var animationFrameCancelToken;
var startLoop = function () {
    if (animationFrameCancelToken)
        return;
    runLoop();
};
var runLoop = function () {
    animationFrameCancelToken = window.requestAnimationFrame(function () {
        notificationIteration();
        runLoop();
    });
};
var checkStopLoop = function () {
    if (animationFrameCancelToken && !resizeObservers.some(function (ro) { return !!ro.$$observationTargets.length; })) {
        window.cancelAnimationFrame(animationFrameCancelToken);
        animationFrameCancelToken = undefined;
    }
};
var install = function () {
    return window.ResizeObserver = ResizeObserver$1;
};
ResizeObserver$2.install = install;

const _hoisted_1$d = { class: "btp-pagination--toolbar" };
const _hoisted_2$b = { key: 0 };
var script$b = /* @__PURE__ */ vue.defineComponent({
  __name: "index",
  props: {
    pageSizes: { type: null, required: false, default: [20, 50, 100, 200, 500] },
    autoLayout: { type: Boolean, required: false, default: true },
    selection: { type: null, required: true, default: [] },
    reserve: { type: Boolean, required: false, default: false },
    reserveSelection: { type: Boolean, required: false, default: true },
    total: { type: Number, required: true },
    pageSize: { type: Number, required: true, default: 20 },
    currentPage: { type: Number, required: true, default: 1 }
  },
  emits: [
    "size-change",
    "current-change",
    "change",
    "prev-click",
    "next-click",
    "reserve-change",
    "clear-selection",
    "update:page-size",
    "update:current-page",
    "update:reserve"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    const layouts = {
      1: "prev, next, jumper",
      2: "total, prev, pager, next",
      3: "total, prev, pager, next, sizes",
      4: "total, prev, pager, next, sizes, jumper",
      550: "prev, next, jumper",
      650: "total, prev, pager, next",
      750: "total, prev, pager, next, sizes",
      850: "total, prev, pager, next, sizes, jumper"
    };
    const getLayout = (mode, width) => {
      if (width && mode == "auto") {
        if (width <= 550) {
          return layouts[550];
        } else if (width <= 650) {
          return layouts[550];
        } else if (width <= 750) {
          return layouts[750];
        } else if (width <= 850) {
          return layouts[850];
        } else {
          return layouts[4];
        }
      } else {
        return layouts[mode];
      }
    };
    const props = __props;
    const paginationRef = vue.ref();
    const state = vue.reactive({
      mode: props.reserve || false,
      pageSize: props.pageSize || 20,
      currentPage: 1,
      layout: getLayout(4, null)
    });
    const observer = new ResizeObserver_2(() => {
      if (props.autoLayout) {
        state.layout = getLayout("auto", paginationRef.value.offsetWidth);
      }
    });
    vue.onMounted(() => {
      observer.observe(paginationRef.value);
    });
    const reset = () => {
      state.currentPage = 1;
      state.pageSize = 20;
    };
    vue.watch(
      () => state.currentPage,
      (value) => {
        emits("update:current-page", value);
      },
      { immediate: false }
    );
    vue.watch(
      () => state.pageSize,
      (value) => {
        emits("update:page-size", value);
      },
      { immediate: false }
    );
    __expose({
      reset
    });
    return (_ctx, _cache) => {
      const _component_el_switch = vue.resolveComponent("el-switch");
      const _component_el_button = vue.resolveComponent("el-button");
      const _component_el_pagination = vue.resolveComponent("el-pagination");
      return vue.openBlock(), vue.createElementBlock("div", {
        ref_key: "paginationRef",
        ref: paginationRef,
        class: "btp-pagination"
      }, [
        vue.createElementVNode("div", _hoisted_1$d, [
          props.reserveSelection ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_2$b, [
            vue.createVNode(_component_el_switch, {
              modelValue: state.mode,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.mode = $event),
              onChange: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("update:reserve", state.mode))
            }, null, 8, ["modelValue"]),
            vue.createVNode(_component_el_button, {
              type: "default",
              link: ""
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(" \u5DF2\u9009" + vue.toDisplayString(_ctx.selection ? _ctx.selection.length : 0) + "\u884C ", 1)
              ]),
              _: 1
            }),
            _ctx.selection && _ctx.selection.length > 0 ? (vue.openBlock(), vue.createBlock(_component_el_button, {
              key: 0,
              link: "",
              onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("clear-selection"))
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(" \u6E05\u7A7A ")
              ]),
              _: 1
            })) : vue.createCommentVNode("v-if", true)
          ])) : vue.createCommentVNode("v-if", true)
        ]),
        !state.mode ? (vue.openBlock(), vue.createBlock(_component_el_pagination, vue.mergeProps({ key: 0 }, { ..._ctx.$props, ..._ctx.$attrs }, {
          "current-page": state.currentPage,
          "onUpdate:currentPage": _cache[3] || (_cache[3] = ($event) => state.currentPage = $event),
          "page-size": state.pageSize,
          "onUpdate:pageSize": _cache[4] || (_cache[4] = ($event) => state.pageSize = $event),
          layout: _ctx.$attrs.layout || state.layout,
          onSizeChange: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("size-change", $event)),
          onCurrentChange: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("current-change", $event)),
          onPrevClick: _cache[7] || (_cache[7] = ($event) => _ctx.$emit("prev-click", $event)),
          onNextClick: _cache[8] || (_cache[8] = ($event) => _ctx.$emit("next-click", $event)),
          onChange: _cache[9] || (_cache[9] = (v1, v2) => {
            _ctx.$emit("change", v1, v2);
          })
        }), null, 16, ["current-page", "page-size", "layout"])) : vue.createCommentVNode("v-if", true)
      ], 512);
    };
  }
});

script$b.__file = "packages/components/tables/pagination/src/index.vue";

const BtpPagination = withInstall$1(script$b);

const expressConfigList = {
  in: {
    name: "\u5305\u542B",
    value: "\u2283"
  },
  notIn: {
    name: "\u4E0D\u5305\u542B",
    value: "\u2285"
  },
  eq: {
    name: "\u7B49\u4E8E",
    value: "="
  },
  ne: {
    name: "\u4E0D\u7B49\u4E8E",
    value: "\u2260"
  },
  like: {
    name: "\u5305\u542B",
    value: "\u2283"
  },
  notlike: {
    name: "\u4E0D\u5305\u542B",
    value: "\u2285"
  },
  isNull: {
    name: "\u4E3A\u7A7A",
    value: "\u2205"
  },
  isNotNull: {
    name: "\u4E0D\u4E3A\u7A7A",
    value: "N\u2205"
  },
  gt: {
    name: "\u5927\u4E8E",
    value: ">"
  },
  lt: {
    name: "\u5C0F\u4E8E",
    value: "<"
  },
  ge: {
    name: "\u5927\u4E8E\u7B49\u4E8E",
    value: "\u2265"
  },
  le: {
    name: "\u5C0F\u4E8E\u7B49\u4E8E",
    value: "\u2264"
  },
  gele: {
    name: "\u7B49\u4E8E(\u8303\u56F4)",
    value: "~"
  }
};

const toJSON = (value) => {
  return typeof value == "string" ? JSON.parse(value) : value;
};
const useAdvSearchbarItem = (props, emits, state) => {
  const initAdvSearchItem = () => {
    if (props.props.columnConfig?.searchProps?.dataSourceProps) {
      state.dsProp = toJSON(props.props.columnConfig.searchProps.dataSourceProps);
    }
    state.options = [];
    if (props.props.columnConfig?.dictId) {
      const itemList = BTPUtils__default["default"].getCacheManager().getDictItemList(
        props.props.columnConfig.dictId
      );
      if (itemList) {
        itemList.forEach((item) => {
          state.options.push({
            id: item.value,
            value: item.value,
            name: item.name,
            label: item.name
          });
        });
      }
    }
    if (props.props.columnConfig?.searchProps?.dataSource) {
      props.props.columnConfig.searchProps.dataSource().then((res) => {
        state.options = res.data || [];
        state.options.forEach((item) => {
          item.label = item[state.dsProp.label];
          item.value = item[state.dsProp.value];
        });
        if (props.props.columnConfig?.searchProps?.treeProps?.disabledRoot) {
          if (state.options.length == 1) {
            state.options[0].disabled = true;
          }
        }
      });
    }
  };
  const getColumnRenderType = () => {
    return props.props.columnConfig?.searchProps?.componentType || "";
  };
  const shouldShowItem = () => {
    return props.props.searchCondition == "isNull" || props.props.searchCondition == "isNotNull";
  };
  const isNotRangeModel = () => {
    return !(props.props.searchCondition == "eq" || props.props.searchCondition == "ne" || props.props.searchCondition == "gt" || props.props.searchCondition == "lt" || props.props.searchCondition == "ge" || props.props.searchCondition == "le");
  };
  const getExpressText = (condition) => {
    if (!condition || condition == "") {
      return "-";
    }
    return expressConfigList[condition].name;
  };
  const getExpressValue = (condition) => {
    if (!condition || condition == "") {
      return "-";
    }
    return expressConfigList[condition].value;
  };
  const isColumnSupportCondition = (condition) => {
    return props.props.columnConfig.searchProps.supportConditionList.indexOf(condition) != -1;
  };
  const onValueChange = (value) => {
    if (!value || value == "") {
      emits("update:modelValue", []);
    } else {
      emits("update:modelValue", Array.isArray(value) ? value : [value]);
    }
  };
  const onNumberValueChange = () => {
    emits("update:modelValue", [state.leftNumberValue, state.rightNumberValue]);
  };
  const onTreeSelectValueChange = () => {
    emits("update:modelValue", state.treeSelectValue);
  };
  const onConditionChange = (key) => {
    props.props.searchCondition = key;
    state.dataValue = null;
    state.leftNumberValue = null;
    state.rightNumberValue = null;
    state.treeSelectValue = [];
  };
  const onEnterClick = () => {
    emits("search");
  };
  return {
    onEnterClick,
    onValueChange,
    onNumberValueChange,
    onTreeSelectValueChange,
    onConditionChange,
    shouldShowItem,
    getColumnRenderType,
    isNotRangeModel,
    initAdvSearchItem,
    isColumnSupportCondition,
    getExpressText,
    getExpressValue
  };
};

const _hoisted_1$c = {
  class: "btp-adv-searchbar-item",
  style: { "position": "relative" }
};
const _hoisted_2$a = { class: "btp-adv-searchbar-item--label" };
const _hoisted_3$6 = { class: "el-dropdown-link" };
const _hoisted_4$4 = {
  key: 1,
  class: "input-range"
};
const _hoisted_5$4 = /* @__PURE__ */ vue.createElementVNode("div", { style: { "width": "8%", "text-align": "center" } }, "-", -1);
var script$a = /* @__PURE__ */ vue.defineComponent({
  __name: "adv-searchbar-item",
  props: {
    props: { type: null, required: false, default: {} },
    modelValue: { type: null, required: false, default: "" },
    exposeMode: { type: null, required: false, default: true }
  },
  emits: ["update:modelValue", "search"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const state = vue.reactive({
      options: [],
      dataValue: null,
      treeSelectValue: [],
      leftNumberValue: null,
      rightNumberValue: null,
      dsProp: { value: "id", label: "name", children: "children" }
    });
    vue.watch(
      () => props.modelValue,
      (val) => {
        if (!val || val.length < 1) {
          state.dataValue = null;
          state.leftNumberValue = null;
          state.rightNumberValue = null;
          state.treeSelectValue = [];
        } else {
          const componentType = props.props.columnConfig?.searchProps?.componentType;
          state.treeSelectValue = Array.isArray(val) ? val : [val];
          if (componentType == "number" && props.props.searchCondition == "gele") {
            state.leftNumberValue = val[0];
            state.rightNumberValue = val[1];
          }
          if (componentType == "select") {
            state.dataValue = val;
          } else {
            state.dataValue = val.length == 1 ? val[0] : val;
          }
        }
      },
      { immediate: true }
    );
    const {
      shouldShowItem,
      getColumnRenderType,
      isNotRangeModel,
      initAdvSearchItem,
      isColumnSupportCondition,
      getExpressValue,
      onValueChange,
      onNumberValueChange,
      onTreeSelectValueChange,
      onConditionChange,
      onEnterClick
    } = useAdvSearchbarItem(props, emits, state);
    initAdvSearchItem();
    return (_ctx, _cache) => {
      const _component_el_tooltip = vue.resolveComponent("el-tooltip");
      const _component_el_button = vue.resolveComponent("el-button");
      const _component_el_dropdown_item = vue.resolveComponent("el-dropdown-item");
      const _component_el_dropdown_menu = vue.resolveComponent("el-dropdown-menu");
      const _component_el_dropdown = vue.resolveComponent("el-dropdown");
      const _component_el_input = vue.resolveComponent("el-input");
      const _component_el_date_picker = vue.resolveComponent("el-date-picker");
      const _component_el_time_picker = vue.resolveComponent("el-time-picker");
      const _component_el_select_v2 = vue.resolveComponent("el-select-v2");
      const _component_el_tree_select = vue.resolveComponent("el-tree-select");
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$c, [
        props.exposeMode ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          vue.createVNode(_component_el_button, { link: "" }, {
            default: vue.withCtx(() => [
              vue.createElementVNode("div", _hoisted_2$a, [
                vue.createVNode(_component_el_tooltip, {
                  effect: "dark",
                  content: props.props.columnConfig.label,
                  placement: "bottom-start"
                }, {
                  default: vue.withCtx(() => [
                    vue.createTextVNode(vue.toDisplayString(props.props.columnConfig.label || ""), 1)
                  ]),
                  _: 1
                }, 8, ["content"])
              ])
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, { class: "btp-adv-searchbar-item--condition" }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_dropdown, { onCommand: vue.unref(onConditionChange) }, {
                dropdown: vue.withCtx(() => [
                  vue.createVNode(_component_el_dropdown_menu, null, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(expressConfigList), (condition, key) => {
                        return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key }, [
                          vue.unref(isColumnSupportCondition)(key) ? (vue.openBlock(), vue.createBlock(_component_el_dropdown_item, {
                            key: 0,
                            command: key
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(vue.toDisplayString(condition.value + condition.name), 1)
                            ]),
                            _: 2
                          }, 1032, ["command"])) : vue.createCommentVNode("v-if", true)
                        ], 64);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                default: vue.withCtx(() => [
                  vue.createElementVNode("span", _hoisted_3$6, vue.toDisplayString(vue.unref(getExpressValue)(props.props.searchCondition)), 1)
                ]),
                _: 1
              }, 8, ["onCommand"])
            ]),
            _: 1
          })
        ], 64)) : vue.createCommentVNode("v-if", true),
        vue.unref(getColumnRenderType)() == "text" ? (vue.openBlock(), vue.createBlock(_component_el_input, {
          key: 1,
          modelValue: state.dataValue,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.dataValue = $event),
          modelModifiers: { trim: true },
          placeholder: "\u591A\u4E2A\u6761\u4EF6\u8BF7\u7528;\u9694\u5F00",
          autosize: "",
          clearable: "",
          disabled: vue.unref(shouldShowItem)(),
          onChange: vue.unref(onValueChange),
          onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
        }, null, 8, ["modelValue", "disabled", "onChange", "onKeyup"])) : vue.unref(getColumnRenderType)() == "number" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
          props.props.searchCondition != "gele" ? (vue.openBlock(), vue.createBlock(_component_el_input, {
            key: 0,
            modelValue: state.dataValue,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => state.dataValue = $event),
            modelModifiers: { trim: true },
            type: "number",
            placeholder: "\u8BF7\u8F93\u5165",
            autosize: "",
            clearable: "",
            disabled: vue.unref(shouldShowItem)(),
            onChange: vue.unref(onValueChange),
            onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
          }, null, 8, ["modelValue", "disabled", "onChange", "onKeyup"])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_4$4, [
            vue.createVNode(_component_el_input, {
              modelValue: state.leftNumberValue,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => state.leftNumberValue = $event),
              modelModifiers: { trim: true },
              type: "number",
              placeholder: "\u8BF7\u8F93\u5165",
              autosize: "",
              clearable: "",
              disabled: vue.unref(shouldShowItem)(),
              style: { "width": "46%", "height": "100%" },
              onChange: vue.unref(onNumberValueChange),
              onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
            }, null, 8, ["modelValue", "disabled", "onChange", "onKeyup"]),
            _hoisted_5$4,
            vue.createVNode(_component_el_input, {
              modelValue: state.rightNumberValue,
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => state.rightNumberValue = $event),
              modelModifiers: { trim: true },
              type: "number",
              placeholder: "\u8BF7\u8F93\u5165",
              autosize: "",
              clearable: "",
              disabled: vue.unref(shouldShowItem)(),
              style: { "width": "46%", "height": "100%" },
              onChange: vue.unref(onNumberValueChange),
              onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
            }, null, 8, ["modelValue", "disabled", "onChange", "onKeyup"])
          ]))
        ], 64)) : vue.unref(getColumnRenderType)() == "datetime" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 3 }, [
          vue.unref(isNotRangeModel)() ? (vue.openBlock(), vue.createBlock(_component_el_date_picker, {
            key: 0,
            modelValue: state.dataValue,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => state.dataValue = $event),
            type: "datetimerange",
            "start-placeholder": "\u5F00\u59CB\u65F6\u95F4",
            "end-placeholder": "\u7ED3\u675F\u65F6\u95F4",
            clearable: "",
            disabled: vue.unref(shouldShowItem)(),
            "value-format": "YYYY-MM-DD HH:mm:ss",
            onChange: vue.unref(onValueChange),
            onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
          }, null, 8, ["modelValue", "disabled", "onChange", "onKeyup"])) : (vue.openBlock(), vue.createBlock(_component_el_date_picker, {
            key: 1,
            modelValue: state.dataValue,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => state.dataValue = $event),
            type: "datetime",
            placeholder: "\u8BF7\u9009\u62E9\u65F6\u95F4",
            "end-placeholder": "\u7ED3\u675F\u65F6\u95F4",
            clearable: "",
            disabled: vue.unref(shouldShowItem)(),
            "value-format": "YYYY-MM-DD HH:mm:ss",
            onChange: vue.unref(onValueChange),
            onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
          }, null, 8, ["modelValue", "disabled", "onChange", "onKeyup"]))
        ], 64)) : vue.unref(getColumnRenderType)() == "date" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 4 }, [
          vue.unref(isNotRangeModel)() ? (vue.openBlock(), vue.createBlock(_component_el_date_picker, {
            key: 0,
            modelValue: state.dataValue,
            "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => state.dataValue = $event),
            type: "daterange",
            "start-placeholder": "\u5F00\u59CB\u65E5\u671F",
            "end-placeholder": "\u7ED3\u675F\u65E5\u671F",
            clearable: "",
            disabled: vue.unref(shouldShowItem)(),
            "value-format": "YYYY-MM-DD",
            onChange: vue.unref(onValueChange),
            onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
          }, null, 8, ["modelValue", "disabled", "onChange", "onKeyup"])) : (vue.openBlock(), vue.createBlock(_component_el_date_picker, {
            key: 1,
            modelValue: state.dataValue,
            "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => state.dataValue = $event),
            type: "date",
            placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F",
            clearable: "",
            disabled: vue.unref(shouldShowItem)(),
            "value-format": "YYYY-MM-DD",
            onChange: vue.unref(onValueChange),
            onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
          }, null, 8, ["modelValue", "disabled", "onChange", "onKeyup"]))
        ], 64)) : vue.unref(getColumnRenderType)() == "month" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 5 }, [
          vue.unref(isNotRangeModel)() ? (vue.openBlock(), vue.createBlock(_component_el_date_picker, {
            key: 0,
            modelValue: state.dataValue,
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => state.dataValue = $event),
            type: "monthrange",
            "start-placeholder": "\u5F00\u59CB\u65E5\u671F",
            "end-placeholder": "\u7ED3\u675F\u65E5\u671F",
            clearable: "",
            disabled: vue.unref(shouldShowItem)(),
            "value-format": "YYYY-MM-DD",
            onChange: vue.unref(onValueChange),
            onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
          }, null, 8, ["modelValue", "disabled", "onChange", "onKeyup"])) : (vue.openBlock(), vue.createBlock(_component_el_date_picker, {
            key: 1,
            modelValue: state.dataValue,
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => state.dataValue = $event),
            type: "month",
            placeholder: "\u8BF7\u9009\u62E9\u65E5\u671F",
            clearable: "",
            disabled: vue.unref(shouldShowItem)(),
            "value-format": "YYYY-MM-DD",
            onChange: vue.unref(onValueChange),
            onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
          }, null, 8, ["modelValue", "disabled", "onChange", "onKeyup"]))
        ], 64)) : vue.unref(getColumnRenderType)() == "time" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 6 }, [
          vue.unref(isNotRangeModel)() ? (vue.openBlock(), vue.createBlock(_component_el_time_picker, {
            key: 0,
            modelValue: state.dataValue,
            "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => state.dataValue = $event),
            "is-range": "",
            "start-placeholder": "\u5F00\u59CB\u65F6\u95F4",
            "end-placeholder": "\u7ED3\u675F\u65F6\u95F4",
            clearable: "",
            disabled: vue.unref(shouldShowItem)(),
            format: "HH:mm:ss",
            onChange: vue.unref(onValueChange),
            onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
          }, null, 8, ["modelValue", "disabled", "onChange", "onKeyup"])) : (vue.openBlock(), vue.createBlock(_component_el_time_picker, {
            key: 1,
            modelValue: state.dataValue,
            "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => state.dataValue = $event),
            "is-range": "",
            "start-placeholder": "\u8BF7\u9009\u62E9\u65F6\u95F4",
            clearable: "",
            disabled: vue.unref(shouldShowItem)(),
            format: "HH:mm:ss",
            onChange: vue.unref(onValueChange),
            onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
          }, null, 8, ["modelValue", "disabled", "onChange", "onKeyup"]))
        ], 64)) : vue.unref(getColumnRenderType)() == "select" ? (vue.openBlock(), vue.createBlock(_component_el_select_v2, {
          key: 7,
          modelValue: state.dataValue,
          "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => state.dataValue = $event),
          multiple: "",
          options: state.options,
          placeholder: "\u8BF7\u9009\u62E9",
          clearable: "",
          filterable: "",
          disabled: vue.unref(shouldShowItem)(),
          "collapse-tags": "",
          "collapse-tags-tooltip": "",
          onChange: vue.unref(onValueChange),
          onKeyup: vue.withKeys(vue.unref(onEnterClick), ["enter"])
        }, {
          default: vue.withCtx(({ item }) => [
            vue.createVNode(_component_el_tooltip, {
              effect: "dark",
              content: item.label,
              placement: props.props.columnConfig?.searchProps?.selectProps?.placement || ""
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode(vue.toDisplayString(item.label), 1)
              ]),
              _: 2
            }, 1032, ["content", "placement"])
          ]),
          _: 1
        }, 8, ["modelValue", "options", "disabled", "onChange", "onKeyup"])) : vue.unref(getColumnRenderType)() == "tree" ? (vue.openBlock(), vue.createBlock(_component_el_tree_select, {
          key: 8,
          modelValue: state.treeSelectValue,
          "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => state.treeSelectValue = $event),
          "node-key": state.dsProp.value,
          props: state.dsProp,
          multiple: "",
          data: state.options,
          "render-after-expand": false,
          "show-checkbox": "",
          placeholder: "\u8BF7\u9009\u62E9",
          "check-strictly": props.props.columnConfig?.searchProps?.treeProps?.checkStrictly,
          "check-on-click-node": "",
          clearable: "",
          filterable: "",
          disabled: vue.unref(shouldShowItem)(),
          "collapse-tags": "",
          "collapse-tags-tooltip": "",
          onCheckChange: vue.unref(onTreeSelectValueChange)
        }, null, 8, ["modelValue", "node-key", "props", "data", "check-strictly", "disabled", "onCheckChange"])) : vue.createCommentVNode("v-if", true)
      ]);
    };
  }
});

script$a.__file = "packages/components/tables/adv-searchbar/src/adv-searchbar-item.vue";

const _hoisted_1$b = /* @__PURE__ */ vue.createElementVNode("span", { class: "btp-adv-searchbar-saveas-dialog-desc" }, " \u8BF4\u660E\uFF1A\u5BF9\u9875\u9762\u914D\u7F6E\u7684\u7B5B\u9009\u6761\u4EF6\u8FDB\u884C\u53E6\u5B58\u65B9\u6848 ", -1);
var script$9 = /* @__PURE__ */ vue.defineComponent({
  __name: "adv-searchbar-saveas-dialog",
  setup(__props, { expose: __expose }) {
    const formRef = vue.ref();
    const state = vue.reactive({
      dialogVisible: false,
      sceneName: "",
      callback: null
    });
    const onSaveAsClick = () => {
      formRef.value.validate((valid) => {
        if (valid) {
          state.dialogVisible = false;
          if (state.callback) {
            state.callback(state.sceneName);
          }
        }
      });
    };
    const openDialog = (callback) => {
      state.dialogVisible = true;
      state.sceneName = "";
      state.callback = callback;
    };
    __expose({
      openDialog
    });
    return (_ctx, _cache) => {
      const _component_el_input = vue.resolveComponent("el-input");
      const _component_el_form_item = vue.resolveComponent("el-form-item");
      const _component_el_form = vue.resolveComponent("el-form");
      const _component_el_button = vue.resolveComponent("el-button");
      const _component_el_dialog = vue.resolveComponent("el-dialog");
      return vue.openBlock(), vue.createBlock(_component_el_dialog, {
        modelValue: state.dialogVisible,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => state.dialogVisible = $event),
        class: "btp-adv-searchbar-saveas-dialog",
        title: "\u53E6\u5B58\u65B9\u6848",
        "append-to-body": true,
        draggable: ""
      }, {
        footer: vue.withCtx(() => [
          vue.createVNode(_component_el_button, {
            type: "info",
            onClick: _cache[1] || (_cache[1] = ($event) => state.dialogVisible = false)
          }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("\u53D6\u6D88")
            ]),
            _: 1
          }),
          vue.createVNode(_component_el_button, { onClick: onSaveAsClick }, {
            default: vue.withCtx(() => [
              vue.createTextVNode("\u786E \u5B9A")
            ]),
            _: 1
          })
        ]),
        default: vue.withCtx(() => [
          vue.createVNode(_component_el_form, {
            ref_key: "formRef",
            ref: formRef,
            model: state,
            rules: { sceneName: [{ required: true, message: "\u8BF7\u8F93\u5165\u65B9\u6848\u540D\u79F0", trigger: "blur" }] },
            "label-width": "120px",
            "label-position": "top",
            "status-icon": true
          }, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_form_item, {
                label: "\u65B9\u6848\u540D\u79F0",
                prop: "sceneName"
              }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_input, {
                    modelValue: state.sceneName,
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.sceneName = $event)
                  }, null, 8, ["modelValue"])
                ]),
                _: 1
              }),
              _hoisted_1$b
            ]),
            _: 1
          }, 8, ["model"])
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});

script$9.__file = "packages/components/tables/adv-searchbar/src/adv-searchbar-saveas-dialog.vue";

const FOCUSABLE_ELEMENT_SELECTORS = `a[href],button:not([disabled]),button:not([hidden]),:not([tabindex="-1"]),input:not([disabled]),input:not([type="hidden"]),select:not([disabled]),textarea:not([disabled])`;
const isVisible = (element) => {
  if (process.env.NODE_ENV === "test")
    return true;
  const computed = getComputedStyle(element);
  return computed.position === "fixed" ? false : element.offsetParent !== null;
};
const obtainAllFocusableElements$1 = (element) => {
  return Array.from(element.querySelectorAll(FOCUSABLE_ELEMENT_SELECTORS)).filter((item) => isFocusable(item) && isVisible(item));
};
const isFocusable = (element) => {
  if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute("tabIndex") !== null) {
    return true;
  }
  if (element.disabled) {
    return false;
  }
  switch (element.nodeName) {
    case "A": {
      return !!element.href && element.rel !== "ignore";
    }
    case "INPUT": {
      return !(element.type === "hidden" || element.type === "file");
    }
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA": {
      return true;
    }
    default: {
      return false;
    }
  }
};

var _a;
const isClient = typeof window !== "undefined";
const isString$1 = (val) => typeof val === "string";
const noop = () => {
};
isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);

function resolveUnref(r) {
  return typeof r === "function" ? r() : vueDemi.unref(r);
}
function identity$1(arg) {
  return arg;
}

function tryOnScopeDispose(fn) {
  if (vueDemi.getCurrentScope()) {
    vueDemi.onScopeDispose(fn);
    return true;
  }
  return false;
}

function tryOnMounted(fn, sync = true) {
  if (vueDemi.getCurrentInstance())
    vueDemi.onMounted(fn);
  else if (sync)
    fn();
  else
    vueDemi.nextTick(fn);
}

function useTimeoutFn(cb, interval, options = {}) {
  const {
    immediate = true
  } = options;
  const isPending = vueDemi.ref(false);
  let timer = null;
  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function stop() {
    isPending.value = false;
    clear();
  }
  function start(...args) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = null;
      cb(...args);
    }, resolveUnref(interval));
  }
  if (immediate) {
    isPending.value = true;
    if (isClient)
      start();
  }
  tryOnScopeDispose(stop);
  return {
    isPending: vueDemi.readonly(isPending),
    start,
    stop
  };
}

function unrefElement(elRef) {
  var _a;
  const plain = resolveUnref(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}

const defaultWindow = isClient ? window : void 0;

function useEventListener(...args) {
  let target;
  let events;
  let listeners;
  let options;
  if (isString$1(args[0]) || Array.isArray(args[0])) {
    [events, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events))
    events = [events];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = vueDemi.watch(() => [unrefElement(target), resolveUnref(options)], ([el, options2]) => {
    cleanup();
    if (!el)
      return;
    cleanups.push(...events.flatMap((event) => {
      return listeners.map((listener) => register(el, event, listener, options2));
    }));
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}

function useSupported(callback, sync = false) {
  const isSupported = vueDemi.ref();
  const update = () => isSupported.value = Boolean(callback());
  update();
  tryOnMounted(update, sync);
  return isSupported;
}

const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
_global[globalKey];

var __getOwnPropSymbols$g = Object.getOwnPropertySymbols;
var __hasOwnProp$g = Object.prototype.hasOwnProperty;
var __propIsEnum$g = Object.prototype.propertyIsEnumerable;
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$g.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$g)
    for (var prop of __getOwnPropSymbols$g(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$g.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useResizeObserver(target, callback, options = {}) {
  const _a = options, { window = defaultWindow } = _a, observerOptions = __objRest$2(_a, ["window"]);
  let observer;
  const isSupported = useSupported(() => window && "ResizeObserver" in window);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = vueDemi.watch(() => unrefElement(target), (el) => {
    cleanup();
    if (isSupported.value && window && el) {
      observer = new ResizeObserver(callback);
      observer.observe(el, observerOptions);
    }
  }, { immediate: true, flush: "post" });
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}

var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
__spreadValues({
  linear: identity$1
}, _TransitionPresets);

const isFirefox = () => isClient && /firefox/i.test(window.navigator.userAgent);

!!(process.env.NODE_ENV !== "production") ? Object.freeze({}) : {};
!!(process.env.NODE_ENV !== "production") ? Object.freeze([]) : [];
const NOOP = () => {
};
const hasOwnProperty$a = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$a.call(val, key);
const isFunction$1 = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isObject$1 = (val) => val !== null && typeof val === "object";
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

var freeGlobal$1 = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal$1 || freeSelf || Function('return this')();

var root$1 = root;

/** Built-in value references. */
var Symbol$1 = root$1.Symbol;

var Symbol$2 = Symbol$1;

/** Used for built-in method references. */
var objectProto$c = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$c.toString;

/** Built-in value references. */
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1),
      tag = value[symToStringTag$1];

  try {
    value[symToStringTag$1] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto$b.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/** `Object#toString` result references. */
var symbolTag$2 = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag$2);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

var isArray$1 = isArray;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = Symbol$2 ? Symbol$2.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray$1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag$2 = '[object Function]',
    genTag$1 = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}

/** Used to detect overreaching core-js shims. */
var coreJsData = root$1['__core-js_shared__'];

var coreJsData$1 = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/** Used for built-in method references. */
var funcProto$1 = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto$a = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty$8).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue$1(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue$1(object, key);
  return baseIsNative(value) ? value : undefined;
}

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root$1, 'WeakMap');

var WeakMap$1 = WeakMap;

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

var baseCreate$1 = baseCreate;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

var defineProperty$1 = defineProperty;

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty$1 ? identity : function(func, string) {
  return defineProperty$1(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

var baseSetToString$1 = baseSetToString;

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString$1);

var setToString$1 = setToString;

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty$1) {
    defineProperty$1(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$7.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

  return value === proto;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$6.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments$1 = isArguments;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

/** Detect free variable `exports`. */
var freeExports$2 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$2 = freeExports$2 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;

/** Built-in value references. */
var Buffer$1 = moduleExports$2 ? root$1.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

var isBuffer$1 = isBuffer;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    boolTag$2 = '[object Boolean]',
    dateTag$2 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$4 = '[object Map]',
    numberTag$2 = '[object Number]',
    objectTag$2 = '[object Object]',
    regexpTag$2 = '[object RegExp]',
    setTag$4 = '[object Set]',
    stringTag$2 = '[object String]',
    weakMapTag$2 = '[object WeakMap]';

var arrayBufferTag$2 = '[object ArrayBuffer]',
    dataViewTag$3 = '[object DataView]',
    float32Tag$2 = '[object Float32Array]',
    float64Tag$2 = '[object Float64Array]',
    int8Tag$2 = '[object Int8Array]',
    int16Tag$2 = '[object Int16Array]',
    int32Tag$2 = '[object Int32Array]',
    uint8Tag$2 = '[object Uint8Array]',
    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
    uint16Tag$2 = '[object Uint16Array]',
    uint32Tag$2 = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] =
typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] =
typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] =
typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] =
typedArrayTags[weakMapTag$2] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/** Detect free variable `exports`. */
var freeExports$1 = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule$1 = freeExports$1 && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports$1 && freeGlobal$1.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

var nodeUtil$1 = nodeUtil;

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

var isTypedArray$1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value),
      isArg = !isArr && isArguments$1(value),
      isBuff = !isArr && !isArg && isBuffer$1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray$1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

var nativeKeys$1 = nativeKeys;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$4.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty$3.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray$1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

var nativeCreate$1 = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

/** Used for built-in method references. */
var objectProto$2 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$1.call(data, key);
}

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate$1 && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/* Built-in method references that are verified to be native. */
var Map$1 = getNative(root$1, 'Map');

var Map$2 = Map$1;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map$2 || ListCache),
    'string': new Hash
  };
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = MapCache;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var stringToPath$1 = stringToPath;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray$1(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath$1(toString(value));
}

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Built-in value references. */
var spreadableSymbol = Symbol$2 ? Symbol$2.isConcatSpreadable : undefined;

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray$1(value) || isArguments$1(value) ||
    !!(spreadableSymbol && value && value[spreadableSymbol]);
}

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, 1) : [];
}

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
  return setToString$1(overRest(func, undefined, flatten), func + '');
}

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

var getPrototype$1 = getPrototype;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$2 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root$1.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var getSymbols$1 = getSymbols;

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};

var getSymbolsIn$1 = getSymbolsIn;

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}

/* Built-in method references that are verified to be native. */
var DataView = getNative(root$1, 'DataView');

var DataView$1 = DataView;

/* Built-in method references that are verified to be native. */
var Promise$1 = getNative(root$1, 'Promise');

var Promise$2 = Promise$1;

/* Built-in method references that are verified to be native. */
var Set$1 = getNative(root$1, 'Set');

var Set$2 = Set$1;

/** `Object#toString` result references. */
var mapTag$3 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$3 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView$1),
    mapCtorString = toSource(Map$2),
    promiseCtorString = toSource(Promise$2),
    setCtorString = toSource(Set$2),
    weakMapCtorString = toSource(WeakMap$1);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2) ||
    (Map$2 && getTag(new Map$2) != mapTag$3) ||
    (Promise$2 && getTag(Promise$2.resolve()) != promiseTag) ||
    (Set$2 && getTag(new Set$2) != setTag$3) ||
    (WeakMap$1 && getTag(new WeakMap$1) != weakMapTag$1)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$3;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$3;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var getTag$1 = getTag;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/** Built-in value references. */
var Uint8Array = root$1.Uint8Array;

var Uint8Array$1 = Uint8Array;

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol$2 ? Symbol$2.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/** `Object#toString` result references. */
var boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    mapTag$2 = '[object Map]',
    numberTag$1 = '[object Number]',
    regexpTag$1 = '[object RegExp]',
    setTag$2 = '[object Set]',
    stringTag$1 = '[object String]',
    symbolTag$1 = '[object Symbol]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag$1 = '[object Float32Array]',
    float64Tag$1 = '[object Float64Array]',
    int8Tag$1 = '[object Int8Array]',
    int16Tag$1 = '[object Int16Array]',
    int32Tag$1 = '[object Int32Array]',
    uint8Tag$1 = '[object Uint8Array]',
    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
    uint16Tag$1 = '[object Uint16Array]',
    uint32Tag$1 = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);

    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);

    case dataViewTag$1:
      return cloneDataView(object, isDeep);

    case float32Tag$1: case float64Tag$1:
    case int8Tag$1: case int16Tag$1: case int32Tag$1:
    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
      return cloneTypedArray(object, isDeep);

    case mapTag$2:
      return new Ctor;

    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);

    case regexpTag$1:
      return cloneRegExp(object);

    case setTag$2:
      return new Ctor;

    case symbolTag$1:
      return cloneSymbol(object);
  }
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate$1(getPrototype$1(object))
    : {};
}

/** `Object#toString` result references. */
var mapTag$1 = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$1;
}

/* Node.js helper references. */
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

var isMap$1 = isMap;

/** `Object#toString` result references. */
var setTag$1 = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}

/* Node.js helper references. */
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

var isSet$1 = isSet;

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG$1 = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG$1 = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG$1,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray$1(object) || isArguments$1(object));
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * The inverse of `_.toPairs`; this method returns an object composed
 * from key-value `pairs`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} pairs The key-value pairs.
 * @returns {Object} Returns the new object.
 * @example
 *
 * _.fromPairs([['a', 1], ['b', 2]]);
 * // => { 'a': 1, 'b': 2 }
 */
function fromPairs(pairs) {
  var index = -1,
      length = pairs == null ? 0 : pairs.length,
      result = {};

  while (++index < length) {
    var pair = pairs[index];
    result[pair[0]] = pair[1];
  }
  return result;
}

/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
 * @example
 *
 * _.isNil(null);
 * // => true
 *
 * _.isNil(void 0);
 * // => true
 *
 * _.isNil(NaN);
 * // => false
 */
function isNil(value) {
  return value == null;
}

/**
 * The base implementation of `_.set`.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {Array|string} path The path of the property to set.
 * @param {*} value The value to set.
 * @param {Function} [customizer] The function to customize path creation.
 * @returns {Object} Returns `object`.
 */
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);

  var index = -1,
      length = path.length,
      lastIndex = length - 1,
      nested = object;

  while (nested != null && ++index < length) {
    var key = toKey(path[index]),
        newValue = value;

    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      return object;
    }

    if (index != lastIndex) {
      var objValue = nested[key];
      newValue = customizer ? customizer(objValue, key, nested) : undefined;
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {});
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}

/**
 * The base implementation of  `_.pickBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @param {Function} predicate The function invoked per property.
 * @returns {Object} Returns the new object.
 */
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};

  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);

    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}

/**
 * The base implementation of `_.pick` without support for individual
 * property identifiers.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} paths The property paths to pick.
 * @returns {Object} Returns the new object.
 */
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * _.pick(object, ['a', 'c']);
 * // => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});

var pick$1 = pick;

const isUndefined = (val) => val === void 0;
const isNumber = (val) => typeof val === "number";
const isElement = (e) => {
  if (typeof Element === "undefined")
    return false;
  return e instanceof Element;
};
const isStringNumber = (val) => {
  if (!isString(val)) {
    return false;
  }
  return !Number.isNaN(Number(val));
};

const keysOf = (arr) => Object.keys(arr);

class ElementPlusError extends Error {
  constructor(m) {
    super(m);
    this.name = "ElementPlusError";
  }
}
function throwError(scope, m) {
  throw new ElementPlusError(`[${scope}] ${m}`);
}
function debugWarn(scope, message) {
  if (process.env.NODE_ENV !== "production") {
    const error = isString(scope) ? new ElementPlusError(`[${scope}] ${message}`) : scope;
    console.warn(error);
  }
}

const SCOPE = "utils/dom/style";
const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
const hasClass = (el, cls) => {
  if (!el || !cls)
    return false;
  if (cls.includes(" "))
    throw new Error("className should not contain space.");
  return el.classList.contains(cls);
};
const addClass = (el, cls) => {
  if (!el || !cls.trim())
    return;
  el.classList.add(...classNameToArray(cls));
};
const removeClass = (el, cls) => {
  if (!el || !cls.trim())
    return;
  el.classList.remove(...classNameToArray(cls));
};
const getStyle = (element, styleName) => {
  var _a;
  if (!isClient || !element || !styleName)
    return "";
  let key = camelize(styleName);
  if (key === "float")
    key = "cssFloat";
  try {
    const style = element.style[key];
    if (style)
      return style;
    const computed = (_a = document.defaultView) == null ? void 0 : _a.getComputedStyle(element, "");
    return computed ? computed[key] : "";
  } catch (e) {
    return element.style[key];
  }
};
function addUnit(value, defaultUnit = "px") {
  if (!value)
    return "";
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (isString(value)) {
    return value;
  }
  debugWarn(SCOPE, "binding value must be a string or number");
}

let scrollBarWidth;
const getScrollBarWidth = (namespace) => {
  var _a;
  if (!isClient)
    return 0;
  if (scrollBarWidth !== void 0)
    return scrollBarWidth;
  const outer = document.createElement("div");
  outer.className = `${namespace}-scrollbar__wrap`;
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);
  const widthNoScroll = outer.offsetWidth;
  outer.style.overflow = "scroll";
  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);
  const widthWithScroll = inner.offsetWidth;
  (_a = outer.parentNode) == null ? void 0 : _a.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;
  return scrollBarWidth;
};

/*! Element Plus Icons Vue v2.3.1 */
var circle_check_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
  name: "CircleCheck",
  __name: "circle-check",
  setup(__props) {
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      }),
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "M745.344 361.344a32 32 0 0 1 45.312 45.312l-288 288a32 32 0 0 1-45.312 0l-160-160a32 32 0 1 1 45.312-45.312L480 626.752l265.344-265.408z"
      })
    ]));
  }
});

// src/components/circle-check.vue
var circle_check_default = circle_check_vue_vue_type_script_setup_true_lang_default;
var circle_close_filled_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
  name: "CircleCloseFilled",
  __name: "circle-close-filled",
  setup(__props) {
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"
      })
    ]));
  }
});

// src/components/circle-close-filled.vue
var circle_close_filled_default = circle_close_filled_vue_vue_type_script_setup_true_lang_default;
var circle_close_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
  name: "CircleClose",
  __name: "circle-close",
  setup(__props) {
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "m466.752 512-90.496-90.496a32 32 0 0 1 45.248-45.248L512 466.752l90.496-90.496a32 32 0 1 1 45.248 45.248L557.248 512l90.496 90.496a32 32 0 1 1-45.248 45.248L512 557.248l-90.496 90.496a32 32 0 0 1-45.248-45.248z"
      }),
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      })
    ]));
  }
});

// src/components/circle-close.vue
var circle_close_default = circle_close_vue_vue_type_script_setup_true_lang_default;
var close_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
  name: "Close",
  __name: "close",
  setup(__props) {
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      })
    ]));
  }
});

// src/components/close.vue
var close_default = close_vue_vue_type_script_setup_true_lang_default;
var hide_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
  name: "Hide",
  __name: "hide",
  setup(__props) {
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "M876.8 156.8c0-9.6-3.2-16-9.6-22.4-6.4-6.4-12.8-9.6-22.4-9.6-9.6 0-16 3.2-22.4 9.6L736 220.8c-64-32-137.6-51.2-224-60.8-160 16-288 73.6-377.6 176C44.8 438.4 0 496 0 512s48 73.6 134.4 176c22.4 25.6 44.8 48 73.6 67.2l-86.4 89.6c-6.4 6.4-9.6 12.8-9.6 22.4 0 9.6 3.2 16 9.6 22.4 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l704-710.4c3.2-6.4 6.4-12.8 6.4-22.4Zm-646.4 528c-76.8-70.4-128-128-153.6-172.8 28.8-48 80-105.6 153.6-172.8C304 272 400 230.4 512 224c64 3.2 124.8 19.2 176 44.8l-54.4 54.4C598.4 300.8 560 288 512 288c-64 0-115.2 22.4-160 64s-64 96-64 160c0 48 12.8 89.6 35.2 124.8L256 707.2c-9.6-6.4-19.2-16-25.6-22.4Zm140.8-96c-12.8-22.4-19.2-48-19.2-76.8 0-44.8 16-83.2 48-112 32-28.8 67.2-48 112-48 28.8 0 54.4 6.4 73.6 19.2zM889.599 336c-12.8-16-28.8-28.8-41.6-41.6l-48 48c73.6 67.2 124.8 124.8 150.4 169.6-28.8 48-80 105.6-153.6 172.8-73.6 67.2-172.8 108.8-284.8 115.2-51.2-3.2-99.2-12.8-140.8-28.8l-48 48c57.6 22.4 118.4 38.4 188.8 44.8 160-16 288-73.6 377.6-176C979.199 585.6 1024 528 1024 512s-48.001-73.6-134.401-176Z"
      }),
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "M511.998 672c-12.8 0-25.6-3.2-38.4-6.4l-51.2 51.2c28.8 12.8 57.6 19.2 89.6 19.2 64 0 115.2-22.4 160-64 41.6-41.6 64-96 64-160 0-32-6.4-64-19.2-89.6l-51.2 51.2c3.2 12.8 6.4 25.6 6.4 38.4 0 44.8-16 83.2-48 112-32 28.8-67.2 48-112 48Z"
      })
    ]));
  }
});

// src/components/hide.vue
var hide_default = hide_vue_vue_type_script_setup_true_lang_default;
var info_filled_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
  name: "InfoFilled",
  __name: "info-filled",
  setup(__props) {
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"
      })
    ]));
  }
});

// src/components/info-filled.vue
var info_filled_default = info_filled_vue_vue_type_script_setup_true_lang_default;
var loading_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
  name: "Loading",
  __name: "loading",
  setup(__props) {
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32m0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32m448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32m-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32M195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0m-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
      })
    ]));
  }
});

// src/components/loading.vue
var loading_default = loading_vue_vue_type_script_setup_true_lang_default;
var success_filled_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
  name: "SuccessFilled",
  __name: "success-filled",
  setup(__props) {
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"
      })
    ]));
  }
});

// src/components/success-filled.vue
var success_filled_default = success_filled_vue_vue_type_script_setup_true_lang_default;
var view_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
  name: "View",
  __name: "view",
  setup(__props) {
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "M512 160c320 0 512 352 512 352S832 864 512 864 0 512 0 512s192-352 512-352m0 64c-225.28 0-384.128 208.064-436.8 288 52.608 79.872 211.456 288 436.8 288 225.28 0 384.128-208.064 436.8-288-52.608-79.872-211.456-288-436.8-288zm0 64a224 224 0 1 1 0 448 224 224 0 0 1 0-448m0 64a160.192 160.192 0 0 0-160 160c0 88.192 71.744 160 160 160s160-71.808 160-160-71.744-160-160-160"
      })
    ]));
  }
});

// src/components/view.vue
var view_default = view_vue_vue_type_script_setup_true_lang_default;
var warning_filled_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ vue.defineComponent({
  name: "WarningFilled",
  __name: "warning-filled",
  setup(__props) {
    return (_ctx, _cache) => (vue.openBlock(), vue.createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      vue.createElementVNode("path", {
        fill: "currentColor",
        d: "M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"
      })
    ]));
  }
});

// src/components/warning-filled.vue
var warning_filled_default = warning_filled_vue_vue_type_script_setup_true_lang_default;

const epPropKey = "__epPropKey";
const definePropType = (val) => val;
const isEpProp = (val) => isObject$1(val) && !!val[epPropKey];
const buildProp = (prop, key) => {
  if (!isObject$1(prop) || isEpProp(prop))
    return prop;
  const { values, required, default: defaultValue, type, validator } = prop;
  const _validator = values || validator ? (val) => {
    let valid = false;
    let allowedValues = [];
    if (values) {
      allowedValues = Array.from(values);
      if (hasOwn(prop, "default")) {
        allowedValues.push(defaultValue);
      }
      valid || (valid = allowedValues.includes(val));
    }
    if (validator)
      valid || (valid = validator(val));
    if (!valid && allowedValues.length > 0) {
      const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
      vue.warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
    }
    return valid;
  } : void 0;
  const epProp = {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true
  };
  if (hasOwn(prop, "default"))
    epProp.default = defaultValue;
  return epProp;
};
const buildProps = (props) => fromPairs(Object.entries(props).map(([key, option]) => [
  key,
  buildProp(option, key)
]));

const iconPropType = definePropType([
  String,
  Object,
  Function
]);
const TypeComponents = {
  Close: close_default,
  SuccessFilled: success_filled_default,
  InfoFilled: info_filled_default,
  WarningFilled: warning_filled_default,
  CircleCloseFilled: circle_close_filled_default
};
const TypeComponentsMap = {
  success: success_filled_default,
  warning: warning_filled_default,
  error: circle_close_filled_default,
  info: info_filled_default
};
const ValidateComponentsMap = {
  validating: loading_default,
  success: circle_check_default,
  error: circle_close_default
};

const withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
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
const withInstallFunction = (fn, name) => {
  fn.install = (app) => {
    fn._context = app._context;
    app.config.globalProperties[name] = fn;
  };
  return fn;
};
const withNoopInstall = (component) => {
  component.install = NOOP;
  return component;
};

const EVENT_CODE = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
};

const UPDATE_MODEL_EVENT = "update:modelValue";

const componentSizes = ["", "default", "small", "large"];

const isValidComponentSize = (val) => ["", ...componentSizes].includes(val);

var PatchFlags = /* @__PURE__ */ ((PatchFlags2) => {
  PatchFlags2[PatchFlags2["TEXT"] = 1] = "TEXT";
  PatchFlags2[PatchFlags2["CLASS"] = 2] = "CLASS";
  PatchFlags2[PatchFlags2["STYLE"] = 4] = "STYLE";
  PatchFlags2[PatchFlags2["PROPS"] = 8] = "PROPS";
  PatchFlags2[PatchFlags2["FULL_PROPS"] = 16] = "FULL_PROPS";
  PatchFlags2[PatchFlags2["HYDRATE_EVENTS"] = 32] = "HYDRATE_EVENTS";
  PatchFlags2[PatchFlags2["STABLE_FRAGMENT"] = 64] = "STABLE_FRAGMENT";
  PatchFlags2[PatchFlags2["KEYED_FRAGMENT"] = 128] = "KEYED_FRAGMENT";
  PatchFlags2[PatchFlags2["UNKEYED_FRAGMENT"] = 256] = "UNKEYED_FRAGMENT";
  PatchFlags2[PatchFlags2["NEED_PATCH"] = 512] = "NEED_PATCH";
  PatchFlags2[PatchFlags2["DYNAMIC_SLOTS"] = 1024] = "DYNAMIC_SLOTS";
  PatchFlags2[PatchFlags2["HOISTED"] = -1] = "HOISTED";
  PatchFlags2[PatchFlags2["BAIL"] = -2] = "BAIL";
  return PatchFlags2;
})(PatchFlags || {});

const isKorean = (text) => /([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(text);

const mutable = (val) => val;

const DEFAULT_EXCLUDE_KEYS = ["class", "style"];
const LISTENER_PREFIX = /^on[A-Z]/;
const useAttrs = (params = {}) => {
  const { excludeListeners = false, excludeKeys } = params;
  const allExcludeKeys = vue.computed(() => {
    return ((excludeKeys == null ? void 0 : excludeKeys.value) || []).concat(DEFAULT_EXCLUDE_KEYS);
  });
  const instance = vue.getCurrentInstance();
  if (!instance) {
    debugWarn("use-attrs", "getCurrentInstance() returned null. useAttrs() must be called at the top of a setup function");
    return vue.computed(() => ({}));
  }
  return vue.computed(() => {
    var _a;
    return fromPairs(Object.entries((_a = instance.proxy) == null ? void 0 : _a.$attrs).filter(([key]) => !allExcludeKeys.value.includes(key) && !(excludeListeners && LISTENER_PREFIX.test(key))));
  });
};

const useDeprecated = ({ from, replacement, scope, version, ref, type = "API" }, condition) => {
  vue.watch(() => vue.unref(condition), (val) => {
    if (val) {
      debugWarn(scope, `[${type}] ${from} is about to be deprecated in version ${version}, please use ${replacement} instead.
For more detail, please visit: ${ref}
`);
    }
  }, {
    immediate: true
  });
};

const useDraggable = (targetRef, dragRef, draggable, overflow) => {
  let transform = {
    offsetX: 0,
    offsetY: 0
  };
  const onMousedown = (e) => {
    const downX = e.clientX;
    const downY = e.clientY;
    const { offsetX, offsetY } = transform;
    const targetRect = targetRef.value.getBoundingClientRect();
    const targetLeft = targetRect.left;
    const targetTop = targetRect.top;
    const targetWidth = targetRect.width;
    const targetHeight = targetRect.height;
    const clientWidth = document.documentElement.clientWidth;
    const clientHeight = document.documentElement.clientHeight;
    const minLeft = -targetLeft + offsetX;
    const minTop = -targetTop + offsetY;
    const maxLeft = clientWidth - targetLeft - targetWidth + offsetX;
    const maxTop = clientHeight - targetTop - targetHeight + offsetY;
    const onMousemove = (e2) => {
      let moveX = offsetX + e2.clientX - downX;
      let moveY = offsetY + e2.clientY - downY;
      if (!(overflow == null ? void 0 : overflow.value)) {
        moveX = Math.min(Math.max(moveX, minLeft), maxLeft);
        moveY = Math.min(Math.max(moveY, minTop), maxTop);
      }
      transform = {
        offsetX: moveX,
        offsetY: moveY
      };
      if (targetRef.value) {
        targetRef.value.style.transform = `translate(${addUnit(moveX)}, ${addUnit(moveY)})`;
      }
    };
    const onMouseup = () => {
      document.removeEventListener("mousemove", onMousemove);
      document.removeEventListener("mouseup", onMouseup);
    };
    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("mouseup", onMouseup);
  };
  const onDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.addEventListener("mousedown", onMousedown);
    }
  };
  const offDraggable = () => {
    if (dragRef.value && targetRef.value) {
      dragRef.value.removeEventListener("mousedown", onMousedown);
    }
  };
  vue.onMounted(() => {
    vue.watchEffect(() => {
      if (draggable.value) {
        onDraggable();
      } else {
        offDraggable();
      }
    });
  });
  vue.onBeforeUnmount(() => {
    offDraggable();
  });
};

var English = {
  name: "en",
  el: {
    breadcrumb: {
      label: "Breadcrumb"
    },
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color."
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      week: "week",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      page: "Page",
      prev: "Go to previous page",
      next: "Go to next page",
      currentPage: "page {pager}",
      prevPages: "Previous {pager} pages",
      nextPages: "Next {pager} pages",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum"
    },
    tour: {
      next: "Next",
      previous: "Previous",
      finish: "Finish"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    },
    carousel: {
      leftArrow: "Carousel arrow left",
      rightArrow: "Carousel arrow right",
      indicator: "Carousel switch to index {index}"
    }
  }
};

const buildTranslator = (locale) => (path, option) => translate(path, option, vue.unref(locale));
const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => {
  var _a;
  return `${(_a = option == null ? void 0 : option[key]) != null ? _a : `{${key}}`}`;
});
const buildLocaleContext = (locale) => {
  const lang = vue.computed(() => vue.unref(locale).name);
  const localeRef = vue.isRef(locale) ? locale : vue.ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale)
  };
};
const localeContextKey = Symbol("localeContextKey");
const useLocale = (localeOverrides) => {
  const locale = localeOverrides || vue.inject(localeContextKey, vue.ref());
  return buildLocaleContext(vue.computed(() => locale.value || English));
};

const defaultNamespace = "el";
const statePrefix = "is-";
const _bem = (namespace, block, blockSuffix, element, modifier) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) {
    cls += `-${blockSuffix}`;
  }
  if (element) {
    cls += `__${element}`;
  }
  if (modifier) {
    cls += `--${modifier}`;
  }
  return cls;
};
const namespaceContextKey = Symbol("namespaceContextKey");
const useGetDerivedNamespace = (namespaceOverrides) => {
  const derivedNamespace = namespaceOverrides || (vue.getCurrentInstance() ? vue.inject(namespaceContextKey, vue.ref(defaultNamespace)) : vue.ref(defaultNamespace));
  const namespace = vue.computed(() => {
    return vue.unref(derivedNamespace) || defaultNamespace;
  });
  return namespace;
};
const useNamespace = (block, namespaceOverrides) => {
  const namespace = useGetDerivedNamespace(namespaceOverrides);
  const b = (blockSuffix = "") => _bem(namespace.value, block, blockSuffix, "", "");
  const e = (element) => element ? _bem(namespace.value, block, "", element, "") : "";
  const m = (modifier) => modifier ? _bem(namespace.value, block, "", "", modifier) : "";
  const be = (blockSuffix, element) => blockSuffix && element ? _bem(namespace.value, block, blockSuffix, element, "") : "";
  const em = (element, modifier) => element && modifier ? _bem(namespace.value, block, "", element, modifier) : "";
  const bm = (blockSuffix, modifier) => blockSuffix && modifier ? _bem(namespace.value, block, blockSuffix, "", modifier) : "";
  const bem = (blockSuffix, element, modifier) => blockSuffix && element && modifier ? _bem(namespace.value, block, blockSuffix, element, modifier) : "";
  const is = (name, ...args) => {
    const state = args.length >= 1 ? args[0] : true;
    return name && state ? `${statePrefix}${name}` : "";
  };
  const cssVar = (object) => {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${key}`] = object[key];
      }
    }
    return styles;
  };
  const cssVarBlock = (object) => {
    const styles = {};
    for (const key in object) {
      if (object[key]) {
        styles[`--${namespace.value}-${block}-${key}`] = object[key];
      }
    }
    return styles;
  };
  const cssVarName = (name) => `--${namespace.value}-${name}`;
  const cssVarBlockName = (name) => `--${namespace.value}-${block}-${name}`;
  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
    cssVar,
    cssVarName,
    cssVarBlock,
    cssVarBlockName
  };
};

const useLockscreen = (trigger, options = {}) => {
  if (!vue.isRef(trigger)) {
    throwError("[useLockscreen]", "You need to pass a ref param to this function");
  }
  const ns = options.ns || useNamespace("popup");
  const hiddenCls = vue.computed(() => ns.bm("parent", "hidden"));
  if (!isClient || hasClass(document.body, hiddenCls.value)) {
    return;
  }
  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  let bodyWidth = "0";
  const cleanup = () => {
    setTimeout(() => {
      removeClass(document == null ? void 0 : document.body, hiddenCls.value);
      if (withoutHiddenClass && document) {
        document.body.style.width = bodyWidth;
      }
    }, 200);
  };
  vue.watch(trigger, (val) => {
    if (!val) {
      cleanup();
      return;
    }
    withoutHiddenClass = !hasClass(document.body, hiddenCls.value);
    if (withoutHiddenClass) {
      bodyWidth = document.body.style.width;
    }
    scrollBarWidth = getScrollBarWidth(ns.namespace.value);
    const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
    const bodyOverflowY = getStyle(document.body, "overflowY");
    if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`;
    }
    addClass(document.body, hiddenCls.value);
  });
  vue.onScopeDispose(() => cleanup());
};

const useProp = (name) => {
  const vm = vue.getCurrentInstance();
  return vue.computed(() => {
    var _a, _b;
    return (_b = (_a = vm == null ? void 0 : vm.proxy) == null ? void 0 : _a.$props) == null ? void 0 : _b[name];
  });
};

const useSameTarget = (handleClick) => {
  if (!handleClick) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
  }
  let mousedownTarget = false;
  let mouseupTarget = false;
  const onClick = (e) => {
    if (mousedownTarget && mouseupTarget) {
      handleClick(e);
    }
    mousedownTarget = mouseupTarget = false;
  };
  const onMousedown = (e) => {
    mousedownTarget = e.target === e.currentTarget;
  };
  const onMouseup = (e) => {
    mouseupTarget = e.target === e.currentTarget;
  };
  return { onClick, onMousedown, onMouseup };
};

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
};
const ID_INJECTION_KEY = Symbol("elIdInjection");
const useIdInjection = () => {
  return vue.getCurrentInstance() ? vue.inject(ID_INJECTION_KEY, defaultIdInjection) : defaultIdInjection;
};
const useId = (deterministicId) => {
  const idInjection = useIdInjection();
  if (!isClient && idInjection === defaultIdInjection) {
    debugWarn("IdInjection", `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);
  }
  const namespace = useGetDerivedNamespace();
  const idRef = vue.computed(() => vue.unref(deterministicId) || `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`);
  return idRef;
};

let registeredEscapeHandlers = [];
const cachedHandler = (e) => {
  const event = e;
  if (event.key === EVENT_CODE.esc) {
    registeredEscapeHandlers.forEach((registeredHandler) => registeredHandler(event));
  }
};
const useEscapeKeydown = (handler) => {
  vue.onMounted(() => {
    if (registeredEscapeHandlers.length === 0) {
      document.addEventListener("keydown", cachedHandler);
    }
    if (isClient)
      registeredEscapeHandlers.push(handler);
  });
  vue.onBeforeUnmount(() => {
    registeredEscapeHandlers = registeredEscapeHandlers.filter((registeredHandler) => registeredHandler !== handler);
    if (registeredEscapeHandlers.length === 0) {
      if (isClient)
        document.removeEventListener("keydown", cachedHandler);
    }
  });
};

const initial = {
  current: 0
};
const zIndex = vue.ref(0);
const defaultInitialZIndex = 2e3;
const ZINDEX_INJECTION_KEY = Symbol("elZIndexContextKey");
const zIndexContextKey = Symbol("zIndexContextKey");
const useZIndex = (zIndexOverrides) => {
  const increasingInjection = vue.getCurrentInstance() ? vue.inject(ZINDEX_INJECTION_KEY, initial) : initial;
  const zIndexInjection = zIndexOverrides || (vue.getCurrentInstance() ? vue.inject(zIndexContextKey, void 0) : void 0);
  const initialZIndex = vue.computed(() => {
    const zIndexFromInjection = vue.unref(zIndexInjection);
    return isNumber(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex;
  });
  const currentZIndex = vue.computed(() => initialZIndex.value + zIndex.value);
  const nextZIndex = () => {
    increasingInjection.current++;
    zIndex.value = increasingInjection.current;
    return currentZIndex.value;
  };
  if (!isClient && !vue.inject(ZINDEX_INJECTION_KEY)) {
    debugWarn("ZIndexInjection", `Looks like you are using server rendering, you must provide a z-index provider to ensure the hydration process to be succeed
usage: app.provide(ZINDEX_INJECTION_KEY, { current: 0 })`);
  }
  return {
    initialZIndex,
    currentZIndex,
    nextZIndex
  };
};

function useCursor(input) {
  const selectionRef = vue.ref();
  function recordCursor() {
    if (input.value == void 0)
      return;
    const { selectionStart, selectionEnd, value } = input.value;
    if (selectionStart == null || selectionEnd == null)
      return;
    const beforeTxt = value.slice(0, Math.max(0, selectionStart));
    const afterTxt = value.slice(Math.max(0, selectionEnd));
    selectionRef.value = {
      selectionStart,
      selectionEnd,
      value,
      beforeTxt,
      afterTxt
    };
  }
  function setCursor() {
    if (input.value == void 0 || selectionRef.value == void 0)
      return;
    const { value } = input.value;
    const { beforeTxt, afterTxt, selectionStart } = selectionRef.value;
    if (beforeTxt == void 0 || afterTxt == void 0 || selectionStart == void 0)
      return;
    let startPos = value.length;
    if (value.endsWith(afterTxt)) {
      startPos = value.length - afterTxt.length;
    } else if (value.startsWith(beforeTxt)) {
      startPos = beforeTxt.length;
    } else {
      const beforeLastChar = beforeTxt[selectionStart - 1];
      const newIndex = value.indexOf(beforeLastChar, selectionStart - 1);
      if (newIndex !== -1) {
        startPos = newIndex + 1;
      }
    }
    input.value.setSelectionRange(startPos, startPos);
  }
  return [recordCursor, setCursor];
}

const useSizeProp = buildProp({
  type: String,
  values: componentSizes,
  required: false
});
const SIZE_INJECTION_KEY = Symbol("size");
const useGlobalSize = () => {
  const injectedSize = vue.inject(SIZE_INJECTION_KEY, {});
  return vue.computed(() => {
    return vue.unref(injectedSize.size) || "";
  });
};

function useFocusController(target, { afterFocus, beforeBlur, afterBlur } = {}) {
  const instance = vue.getCurrentInstance();
  const { emit } = instance;
  const wrapperRef = vue.shallowRef();
  const isFocused = vue.ref(false);
  const handleFocus = (event) => {
    if (isFocused.value)
      return;
    isFocused.value = true;
    emit("focus", event);
    afterFocus == null ? void 0 : afterFocus();
  };
  const handleBlur = (event) => {
    var _a;
    const cancelBlur = isFunction$1(beforeBlur) ? beforeBlur(event) : false;
    if (cancelBlur || event.relatedTarget && ((_a = wrapperRef.value) == null ? void 0 : _a.contains(event.relatedTarget)))
      return;
    isFocused.value = false;
    emit("blur", event);
    afterBlur == null ? void 0 : afterBlur();
  };
  const handleClick = () => {
    var _a;
    (_a = target.value) == null ? void 0 : _a.focus();
  };
  vue.watch(wrapperRef, (el) => {
    if (el) {
      el.setAttribute("tabindex", "-1");
    }
  });
  useEventListener(wrapperRef, "click", handleClick);
  return {
    wrapperRef,
    isFocused,
    handleFocus,
    handleBlur
  };
}

const useEmptyValuesProps = buildProps({
  emptyValues: Array,
  valueOnClear: {
    type: [String, Number, Boolean, Function],
    default: void 0,
    validator: (val) => isFunction$1(val) ? !val() : !val
  }
});

const ariaProps = buildProps({
  ariaLabel: String,
  ariaOrientation: {
    type: String,
    values: ["horizontal", "vertical", "undefined"]
  },
  ariaControls: String
});
const useAriaProps = (arias) => {
  return pick$1(ariaProps, arias);
};

const configProviderContextKey = Symbol();

const globalConfig = vue.ref();
function useGlobalConfig(key, defaultValue = void 0) {
  const config = vue.getCurrentInstance() ? vue.inject(configProviderContextKey, globalConfig) : globalConfig;
  if (key) {
    return vue.computed(() => {
      var _a, _b;
      return (_b = (_a = config.value) == null ? void 0 : _a[key]) != null ? _b : defaultValue;
    });
  } else {
    return config;
  }
}
function useGlobalComponentSettings(block, sizeFallback) {
  const config = useGlobalConfig();
  const ns = useNamespace(block, vue.computed(() => {
    var _a;
    return ((_a = config.value) == null ? void 0 : _a.namespace) || defaultNamespace;
  }));
  const locale = useLocale(vue.computed(() => {
    var _a;
    return (_a = config.value) == null ? void 0 : _a.locale;
  }));
  const zIndex = useZIndex(vue.computed(() => {
    var _a;
    return ((_a = config.value) == null ? void 0 : _a.zIndex) || defaultInitialZIndex;
  }));
  const size = vue.computed(() => {
    var _a;
    return vue.unref(sizeFallback) || ((_a = config.value) == null ? void 0 : _a.size) || "";
  });
  provideGlobalConfig(vue.computed(() => vue.unref(config) || {}));
  return {
    ns,
    locale,
    zIndex,
    size
  };
}
const provideGlobalConfig = (config, app, global = false) => {
  var _a;
  const inSetup = !!vue.getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : void 0;
  const provideFn = (_a = app == null ? void 0 : app.provide) != null ? _a : inSetup ? vue.provide : void 0;
  if (!provideFn) {
    debugWarn("provideGlobalConfig", "provideGlobalConfig() can only be used inside setup().");
    return;
  }
  const context = vue.computed(() => {
    const cfg = vue.unref(config);
    if (!(oldConfig == null ? void 0 : oldConfig.value))
      return cfg;
    return mergeConfig(oldConfig.value, cfg);
  });
  provideFn(configProviderContextKey, context);
  provideFn(localeContextKey, vue.computed(() => context.value.locale));
  provideFn(namespaceContextKey, vue.computed(() => context.value.namespace));
  provideFn(zIndexContextKey, vue.computed(() => context.value.zIndex));
  provideFn(SIZE_INJECTION_KEY, {
    size: vue.computed(() => context.value.size || "")
  });
  if (global || !globalConfig.value) {
    globalConfig.value = context.value;
  }
  return context;
};
const mergeConfig = (a, b) => {
  const keys = [.../* @__PURE__ */ new Set([...keysOf(a), ...keysOf(b)])];
  const obj = {};
  for (const key of keys) {
    obj[key] = b[key] !== void 0 ? b[key] : a[key];
  }
  return obj;
};

const configProviderProps = buildProps({
  a11y: {
    type: Boolean,
    default: true
  },
  locale: {
    type: definePropType(Object)
  },
  size: useSizeProp,
  button: {
    type: definePropType(Object)
  },
  experimentalFeatures: {
    type: definePropType(Object)
  },
  keyboardNavigation: {
    type: Boolean,
    default: true
  },
  message: {
    type: definePropType(Object)
  },
  zIndex: Number,
  namespace: {
    type: String,
    default: "el"
  },
  ...useEmptyValuesProps
});

const messageConfig = {};
vue.defineComponent({
  name: "ElConfigProvider",
  props: configProviderProps,
  setup(props, { slots }) {
    vue.watch(() => props.message, (val) => {
      Object.assign(messageConfig, val != null ? val : {});
    }, { immediate: true, deep: true });
    const config = provideGlobalConfig(props);
    return () => vue.renderSlot(slots, "default", { config: config == null ? void 0 : config.value });
  }
});

var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

const iconProps = buildProps({
  size: {
    type: definePropType([Number, String])
  },
  color: {
    type: String
  }
});

const __default__$7 = vue.defineComponent({
  name: "ElIcon",
  inheritAttrs: false
});
const _sfc_main$7 = /* @__PURE__ */ vue.defineComponent({
  ...__default__$7,
  props: iconProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("icon");
    const style = vue.computed(() => {
      const { size, color } = props;
      if (!size && !color)
        return {};
      return {
        fontSize: isUndefined(size) ? void 0 : addUnit(size),
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("i", vue.mergeProps({
        class: vue.unref(ns).b(),
        style: vue.unref(style)
      }, _ctx.$attrs), [
        vue.renderSlot(_ctx.$slots, "default")
      ], 16);
    };
  }
});
var Icon = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "icon.vue"]]);

const ElIcon = withInstall(Icon);

const formContextKey = Symbol("formContextKey");
const formItemContextKey = Symbol("formItemContextKey");

const useFormSize = (fallback, ignore = {}) => {
  const emptyRef = vue.ref(void 0);
  const size = ignore.prop ? emptyRef : useProp("size");
  const globalConfig = ignore.global ? emptyRef : useGlobalSize();
  const form = ignore.form ? { size: void 0 } : vue.inject(formContextKey, void 0);
  const formItem = ignore.formItem ? { size: void 0 } : vue.inject(formItemContextKey, void 0);
  return vue.computed(() => size.value || vue.unref(fallback) || (formItem == null ? void 0 : formItem.size) || (form == null ? void 0 : form.size) || globalConfig.value || "");
};
const useFormDisabled = (fallback) => {
  const disabled = useProp("disabled");
  const form = vue.inject(formContextKey, void 0);
  return vue.computed(() => disabled.value || vue.unref(fallback) || (form == null ? void 0 : form.disabled) || false);
};

const useFormItem = () => {
  const form = vue.inject(formContextKey, void 0);
  const formItem = vue.inject(formItemContextKey, void 0);
  return {
    form,
    formItem
  };
};
const useFormItemInputId = (props, {
  formItemContext,
  disableIdGeneration,
  disableIdManagement
}) => {
  if (!disableIdGeneration) {
    disableIdGeneration = vue.ref(false);
  }
  if (!disableIdManagement) {
    disableIdManagement = vue.ref(false);
  }
  const inputId = vue.ref();
  let idUnwatch = void 0;
  const isLabeledByFormItem = vue.computed(() => {
    var _a;
    return !!(!(props.label || props.ariaLabel) && formItemContext && formItemContext.inputIds && ((_a = formItemContext.inputIds) == null ? void 0 : _a.length) <= 1);
  });
  vue.onMounted(() => {
    idUnwatch = vue.watch([vue.toRef(props, "id"), disableIdGeneration], ([id, disableIdGeneration2]) => {
      const newId = id != null ? id : !disableIdGeneration2 ? useId().value : void 0;
      if (newId !== inputId.value) {
        if (formItemContext == null ? void 0 : formItemContext.removeInputId) {
          inputId.value && formItemContext.removeInputId(inputId.value);
          if (!(disableIdManagement == null ? void 0 : disableIdManagement.value) && !disableIdGeneration2 && newId) {
            formItemContext.addInputId(newId);
          }
        }
        inputId.value = newId;
      }
    }, { immediate: true });
  });
  vue.onUnmounted(() => {
    idUnwatch && idUnwatch();
    if (formItemContext == null ? void 0 : formItemContext.removeInputId) {
      inputId.value && formItemContext.removeInputId(inputId.value);
    }
  });
  return {
    isLabeledByFormItem,
    inputId
  };
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

/* eslint no-console:0 */
var formatRegExp = /%[sdj%]/g;
var warning = function warning() {}; // don't print warning message when in production env or node runtime

if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && typeof document !== 'undefined') {
  warning = function warning(type, errors) {
    if (typeof console !== 'undefined' && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === 'undefined') {
      if (errors.every(function (e) {
        return typeof e === 'string';
      })) {
        console.warn(type, errors);
      }
    }
  };
}

function convertFieldsError(errors) {
  if (!errors || !errors.length) return null;
  var fields = {};
  errors.forEach(function (error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format(template) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var i = 0;
  var len = args.length;

  if (typeof template === 'function') {
    return template.apply(null, args);
  }

  if (typeof template === 'string') {
    var str = template.replace(formatRegExp, function (x) {
      if (x === '%%') {
        return '%';
      }

      if (i >= len) {
        return x;
      }

      switch (x) {
        case '%s':
          return String(args[i++]);

        case '%d':
          return Number(args[i++]);

        case '%j':
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return '[Circular]';
          }

          break;

        default:
          return x;
      }
    });
    return str;
  }

  return template;
}

function isNativeStringType(type) {
  return type === 'string' || type === 'url' || type === 'hex' || type === 'email' || type === 'date' || type === 'pattern';
}

function isEmptyValue(value, type) {
  if (value === undefined || value === null) {
    return true;
  }

  if (type === 'array' && Array.isArray(value) && !value.length) {
    return true;
  }

  if (isNativeStringType(type) && typeof value === 'string' && !value) {
    return true;
  }

  return false;
}

function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;

  function count(errors) {
    results.push.apply(results, errors || []);
    total++;

    if (total === arrLength) {
      callback(results);
    }
  }

  arr.forEach(function (a) {
    func(a, count);
  });
}

function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;

  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }

    var original = index;
    index = index + 1;

    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }

  next([]);
}

function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function (k) {
    ret.push.apply(ret, objArr[k] || []);
  });
  return ret;
}

var AsyncValidationError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(AsyncValidationError, _Error);

  function AsyncValidationError(errors, fields) {
    var _this;

    _this = _Error.call(this, 'Async Validation Error') || this;
    _this.errors = errors;
    _this.fields = fields;
    return _this;
  }

  return AsyncValidationError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
function asyncMap(objArr, option, func, callback, source) {
  if (option.first) {
    var _pending = new Promise(function (resolve, reject) {
      var next = function next(errors) {
        callback(errors);
        return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
      };

      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });

    _pending["catch"](function (e) {
      return e;
    });

    return _pending;
  }

  var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function (resolve, reject) {
    var next = function next(errors) {
      results.push.apply(results, errors);
      total++;

      if (total === objArrLength) {
        callback(results);
        return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
      }
    };

    if (!objArrKeys.length) {
      callback(results);
      resolve(source);
    }

    objArrKeys.forEach(function (key) {
      var arr = objArr[key];

      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function (e) {
    return e;
  });
  return pending;
}

function isErrorObj(obj) {
  return !!(obj && obj.message !== undefined);
}

function getValue(value, path) {
  var v = value;

  for (var i = 0; i < path.length; i++) {
    if (v == undefined) {
      return v;
    }

    v = v[path[i]];
  }

  return v;
}

function complementError(rule, source) {
  return function (oe) {
    var fieldValue;

    if (rule.fullFields) {
      fieldValue = getValue(source, rule.fullFields);
    } else {
      fieldValue = source[oe.field || rule.fullField];
    }

    if (isErrorObj(oe)) {
      oe.field = oe.field || rule.fullField;
      oe.fieldValue = fieldValue;
      return oe;
    }

    return {
      message: typeof oe === 'function' ? oe() : oe,
      fieldValue: fieldValue,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];

        if (typeof value === 'object' && typeof target[s] === 'object') {
          target[s] = _extends({}, target[s], value);
        } else {
          target[s] = value;
        }
      }
    }
  }

  return target;
}

var required$1 = function required(rule, value, source, errors, options, type) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
};

/**
 *  Rule for validating whitespace.
 *
 *  @param rule The validation rule.
 *  @param value The value of the field on the source object.
 *  @param source The source object being validated.
 *  @param errors An array of errors that this rule may add
 *  validation errors to.
 *  @param options The validation options.
 *  @param options.messages The validation messages.
 */

var whitespace = function whitespace(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === '') {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
};

// https://github.com/kevva/url-regex/blob/master/index.js
var urlReg;
var getUrlRegex = (function () {
  if (urlReg) {
    return urlReg;
  }

  var word = '[a-fA-F\\d:]';

  var b = function b(options) {
    return options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=" + word + ")|(?<=" + word + ")(?=\\s|$))" : '';
  };

  var v4 = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';
  var v6seg = '[a-fA-F\\d]{1,4}';
  var v6 = ("\n(?:\n(?:" + v6seg + ":){7}(?:" + v6seg + "|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + v6seg + ":){6}(?:" + v4 + "|:" + v6seg + "|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + v6seg + ":){5}(?::" + v4 + "|(?::" + v6seg + "){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + v6seg + ":){4}(?:(?::" + v6seg + "){0,1}:" + v4 + "|(?::" + v6seg + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + v6seg + ":){3}(?:(?::" + v6seg + "){0,2}:" + v4 + "|(?::" + v6seg + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + v6seg + ":){2}(?:(?::" + v6seg + "){0,3}:" + v4 + "|(?::" + v6seg + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + v6seg + ":){1}(?:(?::" + v6seg + "){0,4}:" + v4 + "|(?::" + v6seg + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::" + v6seg + "){0,5}:" + v4 + "|(?::" + v6seg + "){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim(); // Pre-compile only the exact regexes because adding a global flag make regexes stateful

  var v46Exact = new RegExp("(?:^" + v4 + "$)|(?:^" + v6 + "$)");
  var v4exact = new RegExp("^" + v4 + "$");
  var v6exact = new RegExp("^" + v6 + "$");

  var ip = function ip(options) {
    return options && options.exact ? v46Exact : new RegExp("(?:" + b(options) + v4 + b(options) + ")|(?:" + b(options) + v6 + b(options) + ")", 'g');
  };

  ip.v4 = function (options) {
    return options && options.exact ? v4exact : new RegExp("" + b(options) + v4 + b(options), 'g');
  };

  ip.v6 = function (options) {
    return options && options.exact ? v6exact : new RegExp("" + b(options) + v6 + b(options), 'g');
  };

  var protocol = "(?:(?:[a-z]+:)?//)";
  var auth = '(?:\\S+(?::\\S*)?@)?';
  var ipv4 = ip.v4().source;
  var ipv6 = ip.v6().source;
  var host = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
  var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
  var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
  var port = '(?::\\d{2,5})?';
  var path = '(?:[/?#][^\\s"]*)?';
  var regex = "(?:" + protocol + "|www\\.)" + auth + "(?:localhost|" + ipv4 + "|" + ipv6 + "|" + host + domain + tld + ")" + port + path;
  urlReg = new RegExp("(?:^" + regex + "$)", 'i');
  return urlReg;
});

/* eslint max-len:0 */

var pattern$2 = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }

    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === 'function' && typeof value.getMonth === 'function' && typeof value.getYear === 'function' && !isNaN(value.getTime());
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }

    return typeof value === 'number';
  },
  object: function object(value) {
    return typeof value === 'object' && !types.array(value);
  },
  method: function method(value) {
    return typeof value === 'function';
  },
  email: function email(value) {
    return typeof value === 'string' && value.length <= 320 && !!value.match(pattern$2.email);
  },
  url: function url(value) {
    return typeof value === 'string' && value.length <= 2048 && !!value.match(getUrlRegex());
  },
  hex: function hex(value) {
    return typeof value === 'string' && !!value.match(pattern$2.hex);
  }
};

var type$1 = function type(rule, value, source, errors, options) {
  if (rule.required && value === undefined) {
    required$1(rule, value, source, errors, options);
    return;
  }

  var custom = ['integer', 'float', 'array', 'regexp', 'object', 'method', 'email', 'number', 'date', 'url', 'hex'];
  var ruleType = rule.type;

  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    } // straight typeof check

  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
};

var range = function range(rule, value, source, errors, options) {
  var len = typeof rule.len === 'number';
  var min = typeof rule.min === 'number';
  var max = typeof rule.max === 'number'; // 正则匹配码点范围从U+010000一直到U+10FFFF的文字（补充平面Supplementary Plane）

  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === 'number';
  var str = typeof value === 'string';
  var arr = Array.isArray(value);

  if (num) {
    key = 'number';
  } else if (str) {
    key = 'string';
  } else if (arr) {
    key = 'array';
  } // if the value is not of a supported type for range validation
  // the validation rule rule should use the
  // type property to also test for a particular type


  if (!key) {
    return false;
  }

  if (arr) {
    val = value.length;
  }

  if (str) {
    // 处理码点大于U+010000的文字length属性不准确的bug，如"𠮷𠮷𠮷".lenght !== 3
    val = value.replace(spRegexp, '_').length;
  }

  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
};

var ENUM$1 = 'enum';

var enumerable$1 = function enumerable(rule, value, source, errors, options) {
  rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];

  if (rule[ENUM$1].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(', ')));
  }
};

var pattern$1 = function pattern(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      // if a RegExp instance is passed, reset `lastIndex` in case its `global`
      // flag is accidentally set to `true`, which in a validation scenario
      // is not necessary and the result might be misleading
      rule.pattern.lastIndex = 0;

      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === 'string') {
      var _pattern = new RegExp(rule.pattern);

      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
};

var rules = {
  required: required$1,
  whitespace: whitespace,
  type: type$1,
  range: range,
  "enum": enumerable$1,
  pattern: pattern$1
};

var string = function string(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'string');

    if (!isEmptyValue(value, 'string')) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);

      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }

  callback(errors);
};

var method = function method(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var number = function number(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (value === '') {
      value = undefined;
    }

    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var _boolean = function _boolean(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var regexp = function regexp(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var integer = function integer(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var floatFn = function floatFn(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var array = function array(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if ((value === undefined || value === null) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, 'array');

    if (value !== undefined && value !== null) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var object = function object(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var ENUM = 'enum';

var enumerable = function enumerable(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (value !== undefined) {
      rules[ENUM](rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var pattern = function pattern(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, 'string') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'string')) {
      rules.pattern(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var date = function date(rule, value, callback, source, options) {
  // console.log('integer rule called %j', rule);
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field); // console.log('validate on %s value', value);

  if (validate) {
    if (isEmptyValue(value, 'date') && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);

    if (!isEmptyValue(value, 'date')) {
      var dateObject;

      if (value instanceof Date) {
        dateObject = value;
      } else {
        dateObject = new Date(value);
      }

      rules.type(rule, dateObject, source, errors, options);

      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }

  callback(errors);
};

var required = function required(rule, value, callback, source, options) {
  var errors = [];
  var type = Array.isArray(value) ? 'array' : typeof value;
  rules.required(rule, value, source, errors, options, type);
  callback(errors);
};

var type = function type(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options, ruleType);

    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }

  callback(errors);
};

var any = function any(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);

  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }

    rules.required(rule, value, source, errors, options);
  }

  callback(errors);
};

var validators = {
  string: string,
  method: method,
  number: number,
  "boolean": _boolean,
  regexp: regexp,
  integer: integer,
  "float": floatFn,
  array: array,
  object: object,
  "enum": enumerable,
  pattern: pattern,
  date: date,
  url: type,
  hex: type,
  email: type,
  required: required,
  any: any
};

function newMessages() {
  return {
    "default": 'Validation error on field %s',
    required: '%s is required',
    "enum": '%s must be one of %s',
    whitespace: '%s cannot be empty',
    date: {
      format: '%s date %s is invalid for format %s',
      parse: '%s date could not be parsed, %s is invalid ',
      invalid: '%s date %s is invalid'
    },
    types: {
      string: '%s is not a %s',
      method: '%s is not a %s (function)',
      array: '%s is not an %s',
      object: '%s is not an %s',
      number: '%s is not a %s',
      date: '%s is not a %s',
      "boolean": '%s is not a %s',
      integer: '%s is not an %s',
      "float": '%s is not a %s',
      regexp: '%s is not a valid %s',
      email: '%s is not a valid %s',
      url: '%s is not a valid %s',
      hex: '%s is not a valid %s'
    },
    string: {
      len: '%s must be exactly %s characters',
      min: '%s must be at least %s characters',
      max: '%s cannot be longer than %s characters',
      range: '%s must be between %s and %s characters'
    },
    number: {
      len: '%s must equal %s',
      min: '%s cannot be less than %s',
      max: '%s cannot be greater than %s',
      range: '%s must be between %s and %s'
    },
    array: {
      len: '%s must be exactly %s in length',
      min: '%s cannot be less than %s in length',
      max: '%s cannot be greater than %s in length',
      range: '%s must be between %s and %s in length'
    },
    pattern: {
      mismatch: '%s value %s does not match pattern %s'
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
var messages = newMessages();

/**
 *  Encapsulates a validation schema.
 *
 *  @param descriptor An object declaring validation rules
 *  for this schema.
 */

var Schema = /*#__PURE__*/function () {
  // ========================= Static =========================
  // ======================== Instance ========================
  function Schema(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }

  var _proto = Schema.prototype;

  _proto.define = function define(rules) {
    var _this = this;

    if (!rules) {
      throw new Error('Cannot configure a schema with no rules');
    }

    if (typeof rules !== 'object' || Array.isArray(rules)) {
      throw new Error('Rules must be an object');
    }

    this.rules = {};
    Object.keys(rules).forEach(function (name) {
      var item = rules[name];
      _this.rules[name] = Array.isArray(item) ? item : [item];
    });
  };

  _proto.messages = function messages(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }

    return this._messages;
  };

  _proto.validate = function validate(source_, o, oc) {
    var _this2 = this;

    if (o === void 0) {
      o = {};
    }

    if (oc === void 0) {
      oc = function oc() {};
    }

    var source = source_;
    var options = o;
    var callback = oc;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    }

    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source);
      }

      return Promise.resolve(source);
    }

    function complete(results) {
      var errors = [];
      var fields = {};

      function add(e) {
        if (Array.isArray(e)) {
          var _errors;

          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }

      for (var i = 0; i < results.length; i++) {
        add(results[i]);
      }

      if (!errors.length) {
        callback(null, source);
      } else {
        fields = convertFieldsError(errors);
        callback(errors, fields);
      }
    }

    if (options.messages) {
      var messages$1 = this.messages();

      if (messages$1 === messages) {
        messages$1 = newMessages();
      }

      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }

    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function (z) {
      var arr = _this2.rules[z];
      var value = source[z];
      arr.forEach(function (r) {
        var rule = r;

        if (typeof rule.transform === 'function') {
          if (source === source_) {
            source = _extends({}, source);
          }

          value = source[z] = rule.transform(value);
        }

        if (typeof rule === 'function') {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends({}, rule);
        } // Fill validator. Skip if nothing need to validate


        rule.validator = _this2.getValidationMethod(rule);

        if (!rule.validator) {
          return;
        }

        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this2.getType(rule);
        series[z] = series[z] || [];
        series[z].push({
          rule: rule,
          value: value,
          source: source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function (data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === 'object' || rule.type === 'array') && (typeof rule.fields === 'object' || typeof rule.defaultField === 'object');
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;

      function addFullField(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key,
          fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key]
        });
      }

      function cb(e) {
        if (e === void 0) {
          e = [];
        }

        var errorList = Array.isArray(e) ? e : [e];

        if (!options.suppressWarning && errorList.length) {
          Schema.warning('async-validator:', errorList);
        }

        if (errorList.length && rule.message !== undefined) {
          errorList = [].concat(rule.message);
        } // Fill error info


        var filledErrors = errorList.map(complementError(rule, source));

        if (options.first && filledErrors.length) {
          errorFields[rule.field] = 1;
          return doIt(filledErrors);
        }

        if (!deep) {
          doIt(filledErrors);
        } else {
          // if rule is required but the target object
          // does not exist fail at the rule level and don't
          // go deeper
          if (rule.required && !data.value) {
            if (rule.message !== undefined) {
              filledErrors = [].concat(rule.message).map(complementError(rule, source));
            } else if (options.error) {
              filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
            }

            return doIt(filledErrors);
          }

          var fieldsSchema = {};

          if (rule.defaultField) {
            Object.keys(data.value).map(function (key) {
              fieldsSchema[key] = rule.defaultField;
            });
          }

          fieldsSchema = _extends({}, fieldsSchema, data.rule.fields);
          var paredFieldsSchema = {};
          Object.keys(fieldsSchema).forEach(function (field) {
            var fieldSchema = fieldsSchema[field];
            var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
            paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
          });
          var schema = new Schema(paredFieldsSchema);
          schema.messages(options.messages);

          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }

          schema.validate(data.value, data.rule.options || options, function (errs) {
            var finalErrors = [];

            if (filledErrors && filledErrors.length) {
              finalErrors.push.apply(finalErrors, filledErrors);
            }

            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }

            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }

      var res;

      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        try {
          res = rule.validator(rule, data.value, cb, data.source, options);
        } catch (error) {
          console.error == null ? void 0 : console.error(error); // rethrow to report error

          if (!options.suppressValidatorError) {
            setTimeout(function () {
              throw error;
            }, 0);
          }

          cb(error.message);
        }

        if (res === true) {
          cb();
        } else if (res === false) {
          cb(typeof rule.message === 'function' ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }

      if (res && res.then) {
        res.then(function () {
          return cb();
        }, function (e) {
          return cb(e);
        });
      }
    }, function (results) {
      complete(results);
    }, source);
  };

  _proto.getType = function getType(rule) {
    if (rule.type === undefined && rule.pattern instanceof RegExp) {
      rule.type = 'pattern';
    }

    if (typeof rule.validator !== 'function' && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format('Unknown rule type %s', rule.type));
    }

    return rule.type || 'string';
  };

  _proto.getValidationMethod = function getValidationMethod(rule) {
    if (typeof rule.validator === 'function') {
      return rule.validator;
    }

    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf('message');

    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }

    if (keys.length === 1 && keys[0] === 'required') {
      return validators.required;
    }

    return validators[this.getType(rule)] || undefined;
  };

  return Schema;
}();

Schema.register = function register(type, validator) {
  if (typeof validator !== 'function') {
    throw new Error('Cannot register a validator by type, validator is not a function');
  }

  validators[type] = validator;
};

Schema.warning = warning;
Schema.messages = messages;
Schema.validators = validators;

let hiddenTextarea = void 0;
const HIDDEN_STYLE = `
  height:0 !important;
  visibility:hidden !important;
  ${isFirefox() ? "" : "overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`;
const CONTEXT_STYLE = [
  "letter-spacing",
  "line-height",
  "padding-top",
  "padding-bottom",
  "font-family",
  "font-weight",
  "font-size",
  "text-rendering",
  "text-transform",
  "width",
  "text-indent",
  "padding-left",
  "padding-right",
  "border-width",
  "box-sizing"
];
function calculateNodeStyling(targetElement) {
  const style = window.getComputedStyle(targetElement);
  const boxSizing = style.getPropertyValue("box-sizing");
  const paddingSize = Number.parseFloat(style.getPropertyValue("padding-bottom")) + Number.parseFloat(style.getPropertyValue("padding-top"));
  const borderSize = Number.parseFloat(style.getPropertyValue("border-bottom-width")) + Number.parseFloat(style.getPropertyValue("border-top-width"));
  const contextStyle = CONTEXT_STYLE.map((name) => `${name}:${style.getPropertyValue(name)}`).join(";");
  return { contextStyle, paddingSize, borderSize, boxSizing };
}
function calcTextareaHeight(targetElement, minRows = 1, maxRows) {
  var _a;
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement("textarea");
    document.body.appendChild(hiddenTextarea);
  }
  const { paddingSize, borderSize, boxSizing, contextStyle } = calculateNodeStyling(targetElement);
  hiddenTextarea.setAttribute("style", `${contextStyle};${HIDDEN_STYLE}`);
  hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
  let height = hiddenTextarea.scrollHeight;
  const result = {};
  if (boxSizing === "border-box") {
    height = height + borderSize;
  } else if (boxSizing === "content-box") {
    height = height - paddingSize;
  }
  hiddenTextarea.value = "";
  const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;
  if (isNumber(minRows)) {
    let minHeight = singleRowHeight * minRows;
    if (boxSizing === "border-box") {
      minHeight = minHeight + paddingSize + borderSize;
    }
    height = Math.max(minHeight, height);
    result.minHeight = `${minHeight}px`;
  }
  if (isNumber(maxRows)) {
    let maxHeight = singleRowHeight * maxRows;
    if (boxSizing === "border-box") {
      maxHeight = maxHeight + paddingSize + borderSize;
    }
    height = Math.min(maxHeight, height);
  }
  result.height = `${height}px`;
  (_a = hiddenTextarea.parentNode) == null ? void 0 : _a.removeChild(hiddenTextarea);
  hiddenTextarea = void 0;
  return result;
}

const inputProps = buildProps({
  id: {
    type: String,
    default: void 0
  },
  size: useSizeProp,
  disabled: Boolean,
  modelValue: {
    type: definePropType([
      String,
      Number,
      Object
    ]),
    default: ""
  },
  maxlength: {
    type: [String, Number]
  },
  minlength: {
    type: [String, Number]
  },
  type: {
    type: String,
    default: "text"
  },
  resize: {
    type: String,
    values: ["none", "both", "horizontal", "vertical"]
  },
  autosize: {
    type: definePropType([Boolean, Object]),
    default: false
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  formatter: {
    type: Function
  },
  parser: {
    type: Function
  },
  placeholder: {
    type: String
  },
  form: {
    type: String
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  suffixIcon: {
    type: iconPropType
  },
  prefixIcon: {
    type: iconPropType
  },
  containerRole: {
    type: String,
    default: void 0
  },
  label: {
    type: String,
    default: void 0
  },
  tabindex: {
    type: [String, Number],
    default: 0
  },
  validateEvent: {
    type: Boolean,
    default: true
  },
  inputStyle: {
    type: definePropType([Object, Array, String]),
    default: () => mutable({})
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  ...useAriaProps(["ariaLabel"])
});
const inputEmits = {
  [UPDATE_MODEL_EVENT]: (value) => isString(value),
  input: (value) => isString(value),
  change: (value) => isString(value),
  focus: (evt) => evt instanceof FocusEvent,
  blur: (evt) => evt instanceof FocusEvent,
  clear: () => true,
  mouseleave: (evt) => evt instanceof MouseEvent,
  mouseenter: (evt) => evt instanceof MouseEvent,
  keydown: (evt) => evt instanceof Event,
  compositionstart: (evt) => evt instanceof CompositionEvent,
  compositionupdate: (evt) => evt instanceof CompositionEvent,
  compositionend: (evt) => evt instanceof CompositionEvent
};

const _hoisted_1$a = ["role"];
const _hoisted_2$9 = ["id", "minlength", "maxlength", "type", "disabled", "readonly", "autocomplete", "tabindex", "aria-label", "placeholder", "form", "autofocus"];
const _hoisted_3$5 = ["id", "minlength", "maxlength", "tabindex", "disabled", "readonly", "autocomplete", "aria-label", "placeholder", "form", "autofocus"];
const __default__$6 = vue.defineComponent({
  name: "ElInput",
  inheritAttrs: false
});
const _sfc_main$6 = /* @__PURE__ */ vue.defineComponent({
  ...__default__$6,
  props: inputProps,
  emits: inputEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const rawAttrs = vue.useAttrs();
    const slots = vue.useSlots();
    const containerAttrs = vue.computed(() => {
      const comboBoxAttrs = {};
      if (props.containerRole === "combobox") {
        comboBoxAttrs["aria-haspopup"] = rawAttrs["aria-haspopup"];
        comboBoxAttrs["aria-owns"] = rawAttrs["aria-owns"];
        comboBoxAttrs["aria-expanded"] = rawAttrs["aria-expanded"];
      }
      return comboBoxAttrs;
    });
    const containerKls = vue.computed(() => [
      props.type === "textarea" ? nsTextarea.b() : nsInput.b(),
      nsInput.m(inputSize.value),
      nsInput.is("disabled", inputDisabled.value),
      nsInput.is("exceed", inputExceed.value),
      {
        [nsInput.b("group")]: slots.prepend || slots.append,
        [nsInput.m("prefix")]: slots.prefix || props.prefixIcon,
        [nsInput.m("suffix")]: slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
        [nsInput.bm("suffix", "password-clear")]: showClear.value && showPwdVisible.value,
        [nsInput.b("hidden")]: props.type === "hidden"
      },
      rawAttrs.class
    ]);
    const wrapperKls = vue.computed(() => [
      nsInput.e("wrapper"),
      nsInput.is("focus", isFocused.value)
    ]);
    const attrs = useAttrs({
      excludeKeys: vue.computed(() => {
        return Object.keys(containerAttrs.value);
      })
    });
    const { form: elForm, formItem: elFormItem } = useFormItem();
    const { inputId } = useFormItemInputId(props, {
      formItemContext: elFormItem
    });
    const inputSize = useFormSize();
    const inputDisabled = useFormDisabled();
    const nsInput = useNamespace("input");
    const nsTextarea = useNamespace("textarea");
    const input = vue.shallowRef();
    const textarea = vue.shallowRef();
    const hovering = vue.ref(false);
    const isComposing = vue.ref(false);
    const passwordVisible = vue.ref(false);
    const countStyle = vue.ref();
    const textareaCalcStyle = vue.shallowRef(props.inputStyle);
    const _ref = vue.computed(() => input.value || textarea.value);
    const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(_ref, {
      afterBlur() {
        var _a;
        if (props.validateEvent) {
          (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "blur").catch((err) => debugWarn(err));
        }
      }
    });
    const needStatusIcon = vue.computed(() => {
      var _a;
      return (_a = elForm == null ? void 0 : elForm.statusIcon) != null ? _a : false;
    });
    const validateState = vue.computed(() => (elFormItem == null ? void 0 : elFormItem.validateState) || "");
    const validateIcon = vue.computed(() => validateState.value && ValidateComponentsMap[validateState.value]);
    const passwordIcon = vue.computed(() => passwordVisible.value ? view_default : hide_default);
    const containerStyle = vue.computed(() => [
      rawAttrs.style
    ]);
    const textareaStyle = vue.computed(() => [
      props.inputStyle,
      textareaCalcStyle.value,
      { resize: props.resize }
    ]);
    const nativeInputValue = vue.computed(() => isNil(props.modelValue) ? "" : String(props.modelValue));
    const showClear = vue.computed(() => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (isFocused.value || hovering.value));
    const showPwdVisible = vue.computed(() => props.showPassword && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (!!nativeInputValue.value || isFocused.value));
    const isWordLimitVisible = vue.computed(() => props.showWordLimit && !!props.maxlength && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword);
    const textLength = vue.computed(() => nativeInputValue.value.length);
    const inputExceed = vue.computed(() => !!isWordLimitVisible.value && textLength.value > Number(props.maxlength));
    const suffixVisible = vue.computed(() => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value);
    const [recordCursor, setCursor] = useCursor(input);
    useResizeObserver(textarea, (entries) => {
      onceInitSizeTextarea();
      if (!isWordLimitVisible.value || props.resize !== "both")
        return;
      const entry = entries[0];
      const { width } = entry.contentRect;
      countStyle.value = {
        right: `calc(100% - ${width + 15 + 6}px)`
      };
    });
    const resizeTextarea = () => {
      const { type, autosize } = props;
      if (!isClient || type !== "textarea" || !textarea.value)
        return;
      if (autosize) {
        const minRows = isObject$1(autosize) ? autosize.minRows : void 0;
        const maxRows = isObject$1(autosize) ? autosize.maxRows : void 0;
        const textareaStyle2 = calcTextareaHeight(textarea.value, minRows, maxRows);
        textareaCalcStyle.value = {
          overflowY: "hidden",
          ...textareaStyle2
        };
        vue.nextTick(() => {
          textarea.value.offsetHeight;
          textareaCalcStyle.value = textareaStyle2;
        });
      } else {
        textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight
        };
      }
    };
    const createOnceInitResize = (resizeTextarea2) => {
      let isInit = false;
      return () => {
        var _a;
        if (isInit || !props.autosize)
          return;
        const isElHidden = ((_a = textarea.value) == null ? void 0 : _a.offsetParent) === null;
        if (!isElHidden) {
          resizeTextarea2();
          isInit = true;
        }
      };
    };
    const onceInitSizeTextarea = createOnceInitResize(resizeTextarea);
    const setNativeInputValue = () => {
      const input2 = _ref.value;
      const formatterValue = props.formatter ? props.formatter(nativeInputValue.value) : nativeInputValue.value;
      if (!input2 || input2.value === formatterValue)
        return;
      input2.value = formatterValue;
    };
    const handleInput = async (event) => {
      recordCursor();
      let { value } = event.target;
      if (props.formatter) {
        value = props.parser ? props.parser(value) : value;
      }
      if (isComposing.value)
        return;
      if (value === nativeInputValue.value) {
        setNativeInputValue();
        return;
      }
      emit(UPDATE_MODEL_EVENT, value);
      emit("input", value);
      await vue.nextTick();
      setNativeInputValue();
      setCursor();
    };
    const handleChange = (event) => {
      emit("change", event.target.value);
    };
    const handleCompositionStart = (event) => {
      emit("compositionstart", event);
      isComposing.value = true;
    };
    const handleCompositionUpdate = (event) => {
      var _a;
      emit("compositionupdate", event);
      const text = (_a = event.target) == null ? void 0 : _a.value;
      const lastCharacter = text[text.length - 1] || "";
      isComposing.value = !isKorean(lastCharacter);
    };
    const handleCompositionEnd = (event) => {
      emit("compositionend", event);
      if (isComposing.value) {
        isComposing.value = false;
        handleInput(event);
      }
    };
    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value;
      focus();
    };
    const focus = async () => {
      var _a;
      await vue.nextTick();
      (_a = _ref.value) == null ? void 0 : _a.focus();
    };
    const blur = () => {
      var _a;
      return (_a = _ref.value) == null ? void 0 : _a.blur();
    };
    const handleMouseLeave = (evt) => {
      hovering.value = false;
      emit("mouseleave", evt);
    };
    const handleMouseEnter = (evt) => {
      hovering.value = true;
      emit("mouseenter", evt);
    };
    const handleKeydown = (evt) => {
      emit("keydown", evt);
    };
    const select = () => {
      var _a;
      (_a = _ref.value) == null ? void 0 : _a.select();
    };
    const clear = () => {
      emit(UPDATE_MODEL_EVENT, "");
      emit("change", "");
      emit("clear");
      emit("input", "");
    };
    vue.watch(() => props.modelValue, () => {
      var _a;
      vue.nextTick(() => resizeTextarea());
      if (props.validateEvent) {
        (_a = elFormItem == null ? void 0 : elFormItem.validate) == null ? void 0 : _a.call(elFormItem, "change").catch((err) => debugWarn(err));
      }
    });
    vue.watch(nativeInputValue, () => setNativeInputValue());
    vue.watch(() => props.type, async () => {
      await vue.nextTick();
      setNativeInputValue();
      resizeTextarea();
    });
    vue.onMounted(() => {
      if (!props.formatter && props.parser) {
        debugWarn("ElInput", "If you set the parser, you also need to set the formatter.");
      }
      setNativeInputValue();
      vue.nextTick(resizeTextarea);
    });
    useDeprecated({
      from: "label",
      replacement: "aria-label",
      version: "2.8.0",
      scope: "el-input",
      ref: "https://element-plus.org/en-US/component/input.html"
    }, vue.computed(() => !!props.label));
    expose({
      input,
      textarea,
      ref: _ref,
      textareaStyle,
      autosize: vue.toRef(props, "autosize"),
      focus,
      blur,
      select,
      clear,
      resizeTextarea
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", vue.mergeProps(vue.unref(containerAttrs), {
        class: [
          vue.unref(containerKls),
          {
            [vue.unref(nsInput).bm("group", "append")]: _ctx.$slots.append,
            [vue.unref(nsInput).bm("group", "prepend")]: _ctx.$slots.prepend
          }
        ],
        style: vue.unref(containerStyle),
        role: _ctx.containerRole,
        onMouseenter: handleMouseEnter,
        onMouseleave: handleMouseLeave
      }), [
        vue.createCommentVNode(" input "),
        _ctx.type !== "textarea" ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
          vue.createCommentVNode(" prepend slot "),
          _ctx.$slots.prepend ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: vue.normalizeClass(vue.unref(nsInput).be("group", "prepend"))
          }, [
            vue.renderSlot(_ctx.$slots, "prepend")
          ], 2)) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("div", {
            ref_key: "wrapperRef",
            ref: wrapperRef,
            class: vue.normalizeClass(vue.unref(wrapperKls))
          }, [
            vue.createCommentVNode(" prefix slot "),
            _ctx.$slots.prefix || _ctx.prefixIcon ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 0,
              class: vue.normalizeClass(vue.unref(nsInput).e("prefix"))
            }, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass(vue.unref(nsInput).e("prefix-inner"))
              }, [
                vue.renderSlot(_ctx.$slots, "prefix"),
                _ctx.prefixIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                  key: 0,
                  class: vue.normalizeClass(vue.unref(nsInput).e("icon"))
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.prefixIcon)))
                  ]),
                  _: 1
                }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
              ], 2)
            ], 2)) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode("input", vue.mergeProps({
              id: vue.unref(inputId),
              ref_key: "input",
              ref: input,
              class: vue.unref(nsInput).e("inner")
            }, vue.unref(attrs), {
              minlength: _ctx.minlength,
              maxlength: _ctx.maxlength,
              type: _ctx.showPassword ? passwordVisible.value ? "text" : "password" : _ctx.type,
              disabled: vue.unref(inputDisabled),
              readonly: _ctx.readonly,
              autocomplete: _ctx.autocomplete,
              tabindex: _ctx.tabindex,
              "aria-label": _ctx.label || _ctx.ariaLabel,
              placeholder: _ctx.placeholder,
              style: _ctx.inputStyle,
              form: _ctx.form,
              autofocus: _ctx.autofocus,
              onCompositionstart: handleCompositionStart,
              onCompositionupdate: handleCompositionUpdate,
              onCompositionend: handleCompositionEnd,
              onInput: handleInput,
              onFocus: _cache[0] || (_cache[0] = (...args) => vue.unref(handleFocus) && vue.unref(handleFocus)(...args)),
              onBlur: _cache[1] || (_cache[1] = (...args) => vue.unref(handleBlur) && vue.unref(handleBlur)(...args)),
              onChange: handleChange,
              onKeydown: handleKeydown
            }), null, 16, _hoisted_2$9),
            vue.createCommentVNode(" suffix slot "),
            vue.unref(suffixVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
              key: 1,
              class: vue.normalizeClass(vue.unref(nsInput).e("suffix"))
            }, [
              vue.createElementVNode("span", {
                class: vue.normalizeClass(vue.unref(nsInput).e("suffix-inner"))
              }, [
                !vue.unref(showClear) || !vue.unref(showPwdVisible) || !vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                  vue.renderSlot(_ctx.$slots, "suffix"),
                  _ctx.suffixIcon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                    key: 0,
                    class: vue.normalizeClass(vue.unref(nsInput).e("icon"))
                  }, {
                    default: vue.withCtx(() => [
                      (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.suffixIcon)))
                    ]),
                    _: 1
                  }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
                ], 64)) : vue.createCommentVNode("v-if", true),
                vue.unref(showClear) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                  key: 1,
                  class: vue.normalizeClass([vue.unref(nsInput).e("icon"), vue.unref(nsInput).e("clear")]),
                  onMousedown: vue.withModifiers(vue.unref(NOOP), ["prevent"]),
                  onClick: clear
                }, {
                  default: vue.withCtx(() => [
                    vue.createVNode(vue.unref(circle_close_default))
                  ]),
                  _: 1
                }, 8, ["class", "onMousedown"])) : vue.createCommentVNode("v-if", true),
                vue.unref(showPwdVisible) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                  key: 2,
                  class: vue.normalizeClass([vue.unref(nsInput).e("icon"), vue.unref(nsInput).e("password")]),
                  onClick: handlePasswordVisible
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(passwordIcon))))
                  ]),
                  _: 1
                }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
                  key: 3,
                  class: vue.normalizeClass(vue.unref(nsInput).e("count"))
                }, [
                  vue.createElementVNode("span", {
                    class: vue.normalizeClass(vue.unref(nsInput).e("count-inner"))
                  }, vue.toDisplayString(vue.unref(textLength)) + " / " + vue.toDisplayString(_ctx.maxlength), 3)
                ], 2)) : vue.createCommentVNode("v-if", true),
                vue.unref(validateState) && vue.unref(validateIcon) && vue.unref(needStatusIcon) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
                  key: 4,
                  class: vue.normalizeClass([
                    vue.unref(nsInput).e("icon"),
                    vue.unref(nsInput).e("validateIcon"),
                    vue.unref(nsInput).is("loading", vue.unref(validateState) === "validating")
                  ])
                }, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(validateIcon))))
                  ]),
                  _: 1
                }, 8, ["class"])) : vue.createCommentVNode("v-if", true)
              ], 2)
            ], 2)) : vue.createCommentVNode("v-if", true)
          ], 2),
          vue.createCommentVNode(" append slot "),
          _ctx.$slots.append ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 1,
            class: vue.normalizeClass(vue.unref(nsInput).be("group", "append"))
          }, [
            vue.renderSlot(_ctx.$slots, "append")
          ], 2)) : vue.createCommentVNode("v-if", true)
        ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
          vue.createCommentVNode(" textarea "),
          vue.createElementVNode("textarea", vue.mergeProps({
            id: vue.unref(inputId),
            ref_key: "textarea",
            ref: textarea,
            class: [vue.unref(nsTextarea).e("inner"), vue.unref(nsInput).is("focus", vue.unref(isFocused))]
          }, vue.unref(attrs), {
            minlength: _ctx.minlength,
            maxlength: _ctx.maxlength,
            tabindex: _ctx.tabindex,
            disabled: vue.unref(inputDisabled),
            readonly: _ctx.readonly,
            autocomplete: _ctx.autocomplete,
            style: vue.unref(textareaStyle),
            "aria-label": _ctx.label || _ctx.ariaLabel,
            placeholder: _ctx.placeholder,
            form: _ctx.form,
            autofocus: _ctx.autofocus,
            onCompositionstart: handleCompositionStart,
            onCompositionupdate: handleCompositionUpdate,
            onCompositionend: handleCompositionEnd,
            onInput: handleInput,
            onFocus: _cache[2] || (_cache[2] = (...args) => vue.unref(handleFocus) && vue.unref(handleFocus)(...args)),
            onBlur: _cache[3] || (_cache[3] = (...args) => vue.unref(handleBlur) && vue.unref(handleBlur)(...args)),
            onChange: handleChange,
            onKeydown: handleKeydown
          }), null, 16, _hoisted_3$5),
          vue.unref(isWordLimitVisible) ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 0,
            style: vue.normalizeStyle(countStyle.value),
            class: vue.normalizeClass(vue.unref(nsInput).e("count"))
          }, vue.toDisplayString(vue.unref(textLength)) + " / " + vue.toDisplayString(_ctx.maxlength), 7)) : vue.createCommentVNode("v-if", true)
        ], 64))
      ], 16, _hoisted_1$a);
    };
  }
});
var Input = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__file", "input.vue"]]);

const ElInput = withInstall(Input);

const FOCUS_AFTER_TRAPPED = "focus-trap.focus-after-trapped";
const FOCUS_AFTER_RELEASED = "focus-trap.focus-after-released";
const FOCUSOUT_PREVENTED = "focus-trap.focusout-prevented";
const FOCUS_AFTER_TRAPPED_OPTS = {
  cancelable: true,
  bubbles: false
};
const FOCUSOUT_PREVENTED_OPTS = {
  cancelable: true,
  bubbles: false
};
const ON_TRAP_FOCUS_EVT = "focusAfterTrapped";
const ON_RELEASE_FOCUS_EVT = "focusAfterReleased";
const FOCUS_TRAP_INJECTION_KEY = Symbol("elFocusTrap");

const focusReason = vue.ref();
const lastUserFocusTimestamp = vue.ref(0);
const lastAutomatedFocusTimestamp = vue.ref(0);
let focusReasonUserCount = 0;
const obtainAllFocusableElements = (element) => {
  const nodes = [];
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 || node === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
};
const getVisibleElement = (elements, container) => {
  for (const element of elements) {
    if (!isHidden(element, container))
      return element;
  }
};
const isHidden = (element, container) => {
  if (process.env.NODE_ENV === "test")
    return false;
  if (getComputedStyle(element).visibility === "hidden")
    return true;
  while (element) {
    if (container && element === container)
      return false;
    if (getComputedStyle(element).display === "none")
      return true;
    element = element.parentElement;
  }
  return false;
};
const getEdges = (container) => {
  const focusable = obtainAllFocusableElements(container);
  const first = getVisibleElement(focusable, container);
  const last = getVisibleElement(focusable.reverse(), container);
  return [first, last];
};
const isSelectable = (element) => {
  return element instanceof HTMLInputElement && "select" in element;
};
const tryFocus = (element, shouldSelect) => {
  if (element && element.focus) {
    const prevFocusedElement = document.activeElement;
    element.focus({ preventScroll: true });
    lastAutomatedFocusTimestamp.value = window.performance.now();
    if (element !== prevFocusedElement && isSelectable(element) && shouldSelect) {
      element.select();
    }
  }
};
function removeFromStack(list, item) {
  const copy = [...list];
  const idx = list.indexOf(item);
  if (idx !== -1) {
    copy.splice(idx, 1);
  }
  return copy;
}
const createFocusableStack = () => {
  let stack = [];
  const push = (layer) => {
    const currentLayer = stack[0];
    if (currentLayer && layer !== currentLayer) {
      currentLayer.pause();
    }
    stack = removeFromStack(stack, layer);
    stack.unshift(layer);
  };
  const remove = (layer) => {
    var _a, _b;
    stack = removeFromStack(stack, layer);
    (_b = (_a = stack[0]) == null ? void 0 : _a.resume) == null ? void 0 : _b.call(_a);
  };
  return {
    push,
    remove
  };
};
const focusFirstDescendant = (elements, shouldSelect = false) => {
  const prevFocusedElement = document.activeElement;
  for (const element of elements) {
    tryFocus(element, shouldSelect);
    if (document.activeElement !== prevFocusedElement)
      return;
  }
};
const focusableStack = createFocusableStack();
const isFocusCausedByUserEvent = () => {
  return lastUserFocusTimestamp.value > lastAutomatedFocusTimestamp.value;
};
const notifyFocusReasonPointer = () => {
  focusReason.value = "pointer";
  lastUserFocusTimestamp.value = window.performance.now();
};
const notifyFocusReasonKeydown = () => {
  focusReason.value = "keyboard";
  lastUserFocusTimestamp.value = window.performance.now();
};
const useFocusReason = () => {
  vue.onMounted(() => {
    if (focusReasonUserCount === 0) {
      document.addEventListener("mousedown", notifyFocusReasonPointer);
      document.addEventListener("touchstart", notifyFocusReasonPointer);
      document.addEventListener("keydown", notifyFocusReasonKeydown);
    }
    focusReasonUserCount++;
  });
  vue.onBeforeUnmount(() => {
    focusReasonUserCount--;
    if (focusReasonUserCount <= 0) {
      document.removeEventListener("mousedown", notifyFocusReasonPointer);
      document.removeEventListener("touchstart", notifyFocusReasonPointer);
      document.removeEventListener("keydown", notifyFocusReasonKeydown);
    }
  });
  return {
    focusReason,
    lastUserFocusTimestamp,
    lastAutomatedFocusTimestamp
  };
};
const createFocusOutPreventedEvent = (detail) => {
  return new CustomEvent(FOCUSOUT_PREVENTED, {
    ...FOCUSOUT_PREVENTED_OPTS,
    detail
  });
};

const _sfc_main$5 = vue.defineComponent({
  name: "ElFocusTrap",
  inheritAttrs: false,
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object,
    focusStartEl: {
      type: [Object, String],
      default: "first"
    }
  },
  emits: [
    ON_TRAP_FOCUS_EVT,
    ON_RELEASE_FOCUS_EVT,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(props, { emit }) {
    const forwardRef = vue.ref();
    let lastFocusBeforeTrapped;
    let lastFocusAfterTrapped;
    const { focusReason } = useFocusReason();
    useEscapeKeydown((event) => {
      if (props.trapped && !focusLayer.paused) {
        emit("release-requested", event);
      }
    });
    const focusLayer = {
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    };
    const onKeydown = (e) => {
      if (!props.loop && !props.trapped)
        return;
      if (focusLayer.paused)
        return;
      const { key, altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
      const { loop } = props;
      const isTabbing = key === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;
      const currentFocusingEl = document.activeElement;
      if (isTabbing && currentFocusingEl) {
        const container = currentTarget;
        const [first, last] = getEdges(container);
        const isTabbable = first && last;
        if (!isTabbable) {
          if (currentFocusingEl === container) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
            }
          }
        } else {
          if (!shiftKey && currentFocusingEl === last) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
              if (loop)
                tryFocus(first, true);
            }
          } else if (shiftKey && [first, container].includes(currentFocusingEl)) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
              if (loop)
                tryFocus(last, true);
            }
          }
        }
      }
    };
    vue.provide(FOCUS_TRAP_INJECTION_KEY, {
      focusTrapRef: forwardRef,
      onKeydown
    });
    vue.watch(() => props.focusTrapEl, (focusTrapEl) => {
      if (focusTrapEl) {
        forwardRef.value = focusTrapEl;
      }
    }, { immediate: true });
    vue.watch([forwardRef], ([forwardRef2], [oldForwardRef]) => {
      if (forwardRef2) {
        forwardRef2.addEventListener("keydown", onKeydown);
        forwardRef2.addEventListener("focusin", onFocusIn);
        forwardRef2.addEventListener("focusout", onFocusOut);
      }
      if (oldForwardRef) {
        oldForwardRef.removeEventListener("keydown", onKeydown);
        oldForwardRef.removeEventListener("focusin", onFocusIn);
        oldForwardRef.removeEventListener("focusout", onFocusOut);
      }
    });
    const trapOnFocus = (e) => {
      emit(ON_TRAP_FOCUS_EVT, e);
    };
    const releaseOnFocus = (e) => emit(ON_RELEASE_FOCUS_EVT, e);
    const onFocusIn = (e) => {
      const trapContainer = vue.unref(forwardRef);
      if (!trapContainer)
        return;
      const target = e.target;
      const relatedTarget = e.relatedTarget;
      const isFocusedInTrap = target && trapContainer.contains(target);
      if (!props.trapped) {
        const isPrevFocusedInTrap = relatedTarget && trapContainer.contains(relatedTarget);
        if (!isPrevFocusedInTrap) {
          lastFocusBeforeTrapped = relatedTarget;
        }
      }
      if (isFocusedInTrap)
        emit("focusin", e);
      if (focusLayer.paused)
        return;
      if (props.trapped) {
        if (isFocusedInTrap) {
          lastFocusAfterTrapped = target;
        } else {
          tryFocus(lastFocusAfterTrapped, true);
        }
      }
    };
    const onFocusOut = (e) => {
      const trapContainer = vue.unref(forwardRef);
      if (focusLayer.paused || !trapContainer)
        return;
      if (props.trapped) {
        const relatedTarget = e.relatedTarget;
        if (!isNil(relatedTarget) && !trapContainer.contains(relatedTarget)) {
          setTimeout(() => {
            if (!focusLayer.paused && props.trapped) {
              const focusoutPreventedEvent = createFocusOutPreventedEvent({
                focusReason: focusReason.value
              });
              emit("focusout-prevented", focusoutPreventedEvent);
              if (!focusoutPreventedEvent.defaultPrevented) {
                tryFocus(lastFocusAfterTrapped, true);
              }
            }
          }, 0);
        }
      } else {
        const target = e.target;
        const isFocusedInTrap = target && trapContainer.contains(target);
        if (!isFocusedInTrap)
          emit("focusout", e);
      }
    };
    async function startTrap() {
      await vue.nextTick();
      const trapContainer = vue.unref(forwardRef);
      if (trapContainer) {
        focusableStack.push(focusLayer);
        const prevFocusedElement = trapContainer.contains(document.activeElement) ? lastFocusBeforeTrapped : document.activeElement;
        lastFocusBeforeTrapped = prevFocusedElement;
        const isPrevFocusContained = trapContainer.contains(prevFocusedElement);
        if (!isPrevFocusContained) {
          const focusEvent = new Event(FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS);
          trapContainer.addEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
          trapContainer.dispatchEvent(focusEvent);
          if (!focusEvent.defaultPrevented) {
            vue.nextTick(() => {
              let focusStartEl = props.focusStartEl;
              if (!isString(focusStartEl)) {
                tryFocus(focusStartEl);
                if (document.activeElement !== focusStartEl) {
                  focusStartEl = "first";
                }
              }
              if (focusStartEl === "first") {
                focusFirstDescendant(obtainAllFocusableElements(trapContainer), true);
              }
              if (document.activeElement === prevFocusedElement || focusStartEl === "container") {
                tryFocus(trapContainer);
              }
            });
          }
        }
      }
    }
    function stopTrap() {
      const trapContainer = vue.unref(forwardRef);
      if (trapContainer) {
        trapContainer.removeEventListener(FOCUS_AFTER_TRAPPED, trapOnFocus);
        const releasedEvent = new CustomEvent(FOCUS_AFTER_RELEASED, {
          ...FOCUS_AFTER_TRAPPED_OPTS,
          detail: {
            focusReason: focusReason.value
          }
        });
        trapContainer.addEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
        trapContainer.dispatchEvent(releasedEvent);
        if (!releasedEvent.defaultPrevented && (focusReason.value == "keyboard" || !isFocusCausedByUserEvent() || trapContainer.contains(document.activeElement))) {
          tryFocus(lastFocusBeforeTrapped != null ? lastFocusBeforeTrapped : document.body);
        }
        trapContainer.removeEventListener(FOCUS_AFTER_RELEASED, releaseOnFocus);
        focusableStack.remove(focusLayer);
      }
    }
    vue.onMounted(() => {
      if (props.trapped) {
        startTrap();
      }
      vue.watch(() => props.trapped, (trapped) => {
        if (trapped) {
          startTrap();
        } else {
          stopTrap();
        }
      });
    });
    vue.onBeforeUnmount(() => {
      if (props.trapped) {
        stopTrap();
      }
    });
    return {
      onKeydown
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.renderSlot(_ctx.$slots, "default", { handleKeydown: _ctx.onKeydown });
}
var ElFocusTrap = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$1], ["__file", "focus-trap.vue"]]);

const badgeProps = buildProps({
  value: {
    type: [String, Number],
    default: ""
  },
  max: {
    type: Number,
    default: 99
  },
  isDot: Boolean,
  hidden: Boolean,
  type: {
    type: String,
    values: ["primary", "success", "warning", "info", "danger"],
    default: "danger"
  },
  showZero: {
    type: Boolean,
    default: true
  },
  color: String,
  dotStyle: {
    type: definePropType([String, Object, Array])
  },
  badgeStyle: {
    type: definePropType([String, Object, Array])
  },
  offset: {
    type: definePropType(Array),
    default: [0, 0]
  },
  dotClass: {
    type: String
  },
  badgeClass: {
    type: String
  }
});

const _hoisted_1$9 = ["textContent"];
const __default__$5 = vue.defineComponent({
  name: "ElBadge"
});
const _sfc_main$4 = /* @__PURE__ */ vue.defineComponent({
  ...__default__$5,
  props: badgeProps,
  setup(__props, { expose }) {
    const props = __props;
    const ns = useNamespace("badge");
    const content = vue.computed(() => {
      if (props.isDot)
        return "";
      if (isNumber(props.value) && isNumber(props.max)) {
        if (props.max < props.value) {
          return `${props.max}+`;
        }
        return props.value === 0 && !props.showZero ? "" : `${props.value}`;
      }
      return `${props.value}`;
    });
    const style = vue.computed(() => {
      var _a, _b, _c, _d, _e, _f;
      return [
        {
          backgroundColor: props.color,
          marginRight: addUnit(-((_b = (_a = props.offset) == null ? void 0 : _a[0]) != null ? _b : 0)),
          marginTop: addUnit((_d = (_c = props.offset) == null ? void 0 : _c[1]) != null ? _d : 0)
        },
        (_e = props.dotStyle) != null ? _e : {},
        (_f = props.badgeStyle) != null ? _f : {}
      ];
    });
    useDeprecated({
      from: "dot-style",
      replacement: "badge-style",
      version: "2.8.0",
      scope: "el-badge",
      ref: "https://element-plus.org/en-US/component/badge.html"
    }, vue.computed(() => !!props.dotStyle));
    useDeprecated({
      from: "dot-class",
      replacement: "badge-class",
      version: "2.8.0",
      scope: "el-badge",
      ref: "https://element-plus.org/en-US/component/badge.html"
    }, vue.computed(() => !!props.dotClass));
    expose({
      content
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass(vue.unref(ns).b())
      }, [
        vue.renderSlot(_ctx.$slots, "default"),
        vue.createVNode(vue.Transition, {
          name: `${vue.unref(ns).namespace.value}-zoom-in-center`,
          persisted: ""
        }, {
          default: vue.withCtx(() => [
            vue.withDirectives(vue.createElementVNode("sup", {
              class: vue.normalizeClass([
                vue.unref(ns).e("content"),
                vue.unref(ns).em("content", _ctx.type),
                vue.unref(ns).is("fixed", !!_ctx.$slots.default),
                vue.unref(ns).is("dot", _ctx.isDot),
                _ctx.dotClass,
                _ctx.badgeClass
              ]),
              style: vue.normalizeStyle(vue.unref(style)),
              textContent: vue.toDisplayString(vue.unref(content))
            }, null, 14, _hoisted_1$9), [
              [vue.vShow, !_ctx.hidden && (vue.unref(content) || _ctx.isDot)]
            ])
          ]),
          _: 1
        }, 8, ["name"])
      ], 2);
    };
  }
});
var Badge = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__file", "badge.vue"]]);

const ElBadge = withInstall(Badge);

const buttonGroupContextKey = Symbol("buttonGroupContextKey");

const useButton = (props, emit) => {
  useDeprecated({
    from: "type.text",
    replacement: "link",
    version: "3.0.0",
    scope: "props",
    ref: "https://element-plus.org/en-US/component/button.html#button-attributes"
  }, vue.computed(() => props.type === "text"));
  const buttonGroupContext = vue.inject(buttonGroupContextKey, void 0);
  const globalConfig = useGlobalConfig("button");
  const { form } = useFormItem();
  const _size = useFormSize(vue.computed(() => buttonGroupContext == null ? void 0 : buttonGroupContext.size));
  const _disabled = useFormDisabled();
  const _ref = vue.ref();
  const slots = vue.useSlots();
  const _type = vue.computed(() => props.type || (buttonGroupContext == null ? void 0 : buttonGroupContext.type) || "");
  const autoInsertSpace = vue.computed(() => {
    var _a, _b, _c;
    return (_c = (_b = props.autoInsertSpace) != null ? _b : (_a = globalConfig.value) == null ? void 0 : _a.autoInsertSpace) != null ? _c : false;
  });
  const _props = vue.computed(() => {
    if (props.tag === "button") {
      return {
        ariaDisabled: _disabled.value || props.loading,
        disabled: _disabled.value || props.loading,
        autofocus: props.autofocus,
        type: props.nativeType
      };
    }
    return {};
  });
  const shouldAddSpace = vue.computed(() => {
    var _a;
    const defaultSlot = (_a = slots.default) == null ? void 0 : _a.call(slots);
    if (autoInsertSpace.value && (defaultSlot == null ? void 0 : defaultSlot.length) === 1) {
      const slot = defaultSlot[0];
      if ((slot == null ? void 0 : slot.type) === vue.Text) {
        const text = slot.children;
        return /^\p{Unified_Ideograph}{2}$/u.test(text.trim());
      }
    }
    return false;
  });
  const handleClick = (evt) => {
    if (props.nativeType === "reset") {
      form == null ? void 0 : form.resetFields();
    }
    emit("click", evt);
  };
  return {
    _disabled,
    _size,
    _type,
    _ref,
    _props,
    shouldAddSpace,
    handleClick
  };
};

const buttonTypes = [
  "default",
  "primary",
  "success",
  "warning",
  "info",
  "danger",
  "text",
  ""
];
const buttonNativeTypes = ["button", "submit", "reset"];
const buttonProps = buildProps({
  size: useSizeProp,
  disabled: Boolean,
  type: {
    type: String,
    values: buttonTypes,
    default: ""
  },
  icon: {
    type: iconPropType
  },
  nativeType: {
    type: String,
    values: buttonNativeTypes,
    default: "button"
  },
  loading: Boolean,
  loadingIcon: {
    type: iconPropType,
    default: () => loading_default
  },
  plain: Boolean,
  text: Boolean,
  link: Boolean,
  bg: Boolean,
  autofocus: Boolean,
  round: Boolean,
  circle: Boolean,
  color: String,
  dark: Boolean,
  autoInsertSpace: {
    type: Boolean,
    default: void 0
  },
  tag: {
    type: definePropType([String, Object]),
    default: "button"
  }
});
const buttonEmits = {
  click: (evt) => evt instanceof MouseEvent
};

/**
 * Take input from [0, n] and return it as [0, 1]
 * @hidden
 */
function bound01(n, max) {
    if (isOnePointZero(n)) {
        n = '100%';
    }
    var isPercent = isPercentage(n);
    n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
    // Automatically convert percentage into number
    if (isPercent) {
        n = parseInt(String(n * max), 10) / 100;
    }
    // Handle floating point rounding errors
    if (Math.abs(n - max) < 0.000001) {
        return 1;
    }
    // Convert into [0, 1] range if it isn't already
    if (max === 360) {
        // If n is a hue given in degrees,
        // wrap around out-of-range values into [0, 360] range
        // then convert into [0, 1].
        n = (n < 0 ? (n % max) + max : n % max) / parseFloat(String(max));
    }
    else {
        // If n not a hue given in degrees
        // Convert into [0, 1] range if it isn't already.
        n = (n % max) / parseFloat(String(max));
    }
    return n;
}
/**
 * Force a number between 0 and 1
 * @hidden
 */
function clamp01(val) {
    return Math.min(1, Math.max(0, val));
}
/**
 * Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
 * <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
 * @hidden
 */
function isOnePointZero(n) {
    return typeof n === 'string' && n.indexOf('.') !== -1 && parseFloat(n) === 1;
}
/**
 * Check to see if string passed in is a percentage
 * @hidden
 */
function isPercentage(n) {
    return typeof n === 'string' && n.indexOf('%') !== -1;
}
/**
 * Return a valid alpha value [0,1] with all invalid values being set to 1
 * @hidden
 */
function boundAlpha(a) {
    a = parseFloat(a);
    if (isNaN(a) || a < 0 || a > 1) {
        a = 1;
    }
    return a;
}
/**
 * Replace a decimal with it's percentage value
 * @hidden
 */
function convertToPercentage(n) {
    if (n <= 1) {
        return "".concat(Number(n) * 100, "%");
    }
    return n;
}
/**
 * Force a hex value to have 2 characters
 * @hidden
 */
function pad2(c) {
    return c.length === 1 ? '0' + c : String(c);
}

// `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
// <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
/**
 * Handle bounds / percentage checking to conform to CSS color spec
 * <http://www.w3.org/TR/css3-color/>
 * *Assumes:* r, g, b in [0, 255] or [0, 1]
 * *Returns:* { r, g, b } in [0, 255]
 */
function rgbToRgb(r, g, b) {
    return {
        r: bound01(r, 255) * 255,
        g: bound01(g, 255) * 255,
        b: bound01(b, 255) * 255,
    };
}
/**
 * Converts an RGB color value to HSL.
 * *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
 * *Returns:* { h, s, l } in [0,1]
 */
function rgbToHsl(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max === min) {
        s = 0;
        h = 0; // achromatic
    }
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, l: l };
}
function hue2rgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * (6 * t);
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}
/**
 * Converts an HSL color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    h = bound01(h, 360);
    s = bound01(s, 100);
    l = bound01(l, 100);
    if (s === 0) {
        // achromatic
        g = l;
        b = l;
        r = l;
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color value to HSV
 *
 * *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
 * *Returns:* { h, s, v } in [0,1]
 */
function rgbToHsv(r, g, b) {
    r = bound01(r, 255);
    g = bound01(g, 255);
    b = bound01(b, 255);
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var v = max;
    var d = max - min;
    var s = max === 0 ? 0 : d / max;
    if (max === min) {
        h = 0; // achromatic
    }
    else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return { h: h, s: s, v: v };
}
/**
 * Converts an HSV color value to RGB.
 *
 * *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
 * *Returns:* { r, g, b } in the set [0, 255]
 */
function hsvToRgb(h, s, v) {
    h = bound01(h, 360) * 6;
    s = bound01(s, 100);
    v = bound01(v, 100);
    var i = Math.floor(h);
    var f = h - i;
    var p = v * (1 - s);
    var q = v * (1 - f * s);
    var t = v * (1 - (1 - f) * s);
    var mod = i % 6;
    var r = [v, q, p, p, t, v][mod];
    var g = [t, v, v, q, p, p][mod];
    var b = [p, p, t, v, v, q][mod];
    return { r: r * 255, g: g * 255, b: b * 255 };
}
/**
 * Converts an RGB color to hex
 *
 * Assumes r, g, and b are contained in the set [0, 255]
 * Returns a 3 or 6 character hex
 */
function rgbToHex(r, g, b, allow3Char) {
    var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
    ];
    // Return a 3 character hex if possible
    if (allow3Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
    }
    return hex.join('');
}
/**
 * Converts an RGBA color plus alpha transparency to hex
 *
 * Assumes r, g, b are contained in the set [0, 255] and
 * a in [0, 1]. Returns a 4 or 8 character rgba hex
 */
// eslint-disable-next-line max-params
function rgbaToHex(r, g, b, a, allow4Char) {
    var hex = [
        pad2(Math.round(r).toString(16)),
        pad2(Math.round(g).toString(16)),
        pad2(Math.round(b).toString(16)),
        pad2(convertDecimalToHex(a)),
    ];
    // Return a 4 character hex if possible
    if (allow4Char &&
        hex[0].startsWith(hex[0].charAt(1)) &&
        hex[1].startsWith(hex[1].charAt(1)) &&
        hex[2].startsWith(hex[2].charAt(1)) &&
        hex[3].startsWith(hex[3].charAt(1))) {
        return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
    }
    return hex.join('');
}
/** Converts a decimal to a hex value */
function convertDecimalToHex(d) {
    return Math.round(parseFloat(d) * 255).toString(16);
}
/** Converts a hex value to a decimal */
function convertHexToDecimal(h) {
    return parseIntFromHex(h) / 255;
}
/** Parse a base-16 hex value into a base-10 integer */
function parseIntFromHex(val) {
    return parseInt(val, 16);
}
function numberInputToObject(color) {
    return {
        r: color >> 16,
        g: (color & 0xff00) >> 8,
        b: color & 0xff,
    };
}

// https://github.com/bahamas10/css-color-names/blob/master/css-color-names.json
/**
 * @hidden
 */
var names = {
    aliceblue: '#f0f8ff',
    antiquewhite: '#faebd7',
    aqua: '#00ffff',
    aquamarine: '#7fffd4',
    azure: '#f0ffff',
    beige: '#f5f5dc',
    bisque: '#ffe4c4',
    black: '#000000',
    blanchedalmond: '#ffebcd',
    blue: '#0000ff',
    blueviolet: '#8a2be2',
    brown: '#a52a2a',
    burlywood: '#deb887',
    cadetblue: '#5f9ea0',
    chartreuse: '#7fff00',
    chocolate: '#d2691e',
    coral: '#ff7f50',
    cornflowerblue: '#6495ed',
    cornsilk: '#fff8dc',
    crimson: '#dc143c',
    cyan: '#00ffff',
    darkblue: '#00008b',
    darkcyan: '#008b8b',
    darkgoldenrod: '#b8860b',
    darkgray: '#a9a9a9',
    darkgreen: '#006400',
    darkgrey: '#a9a9a9',
    darkkhaki: '#bdb76b',
    darkmagenta: '#8b008b',
    darkolivegreen: '#556b2f',
    darkorange: '#ff8c00',
    darkorchid: '#9932cc',
    darkred: '#8b0000',
    darksalmon: '#e9967a',
    darkseagreen: '#8fbc8f',
    darkslateblue: '#483d8b',
    darkslategray: '#2f4f4f',
    darkslategrey: '#2f4f4f',
    darkturquoise: '#00ced1',
    darkviolet: '#9400d3',
    deeppink: '#ff1493',
    deepskyblue: '#00bfff',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1e90ff',
    firebrick: '#b22222',
    floralwhite: '#fffaf0',
    forestgreen: '#228b22',
    fuchsia: '#ff00ff',
    gainsboro: '#dcdcdc',
    ghostwhite: '#f8f8ff',
    goldenrod: '#daa520',
    gold: '#ffd700',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#adff2f',
    grey: '#808080',
    honeydew: '#f0fff0',
    hotpink: '#ff69b4',
    indianred: '#cd5c5c',
    indigo: '#4b0082',
    ivory: '#fffff0',
    khaki: '#f0e68c',
    lavenderblush: '#fff0f5',
    lavender: '#e6e6fa',
    lawngreen: '#7cfc00',
    lemonchiffon: '#fffacd',
    lightblue: '#add8e6',
    lightcoral: '#f08080',
    lightcyan: '#e0ffff',
    lightgoldenrodyellow: '#fafad2',
    lightgray: '#d3d3d3',
    lightgreen: '#90ee90',
    lightgrey: '#d3d3d3',
    lightpink: '#ffb6c1',
    lightsalmon: '#ffa07a',
    lightseagreen: '#20b2aa',
    lightskyblue: '#87cefa',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#b0c4de',
    lightyellow: '#ffffe0',
    lime: '#00ff00',
    limegreen: '#32cd32',
    linen: '#faf0e6',
    magenta: '#ff00ff',
    maroon: '#800000',
    mediumaquamarine: '#66cdaa',
    mediumblue: '#0000cd',
    mediumorchid: '#ba55d3',
    mediumpurple: '#9370db',
    mediumseagreen: '#3cb371',
    mediumslateblue: '#7b68ee',
    mediumspringgreen: '#00fa9a',
    mediumturquoise: '#48d1cc',
    mediumvioletred: '#c71585',
    midnightblue: '#191970',
    mintcream: '#f5fffa',
    mistyrose: '#ffe4e1',
    moccasin: '#ffe4b5',
    navajowhite: '#ffdead',
    navy: '#000080',
    oldlace: '#fdf5e6',
    olive: '#808000',
    olivedrab: '#6b8e23',
    orange: '#ffa500',
    orangered: '#ff4500',
    orchid: '#da70d6',
    palegoldenrod: '#eee8aa',
    palegreen: '#98fb98',
    paleturquoise: '#afeeee',
    palevioletred: '#db7093',
    papayawhip: '#ffefd5',
    peachpuff: '#ffdab9',
    peru: '#cd853f',
    pink: '#ffc0cb',
    plum: '#dda0dd',
    powderblue: '#b0e0e6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#ff0000',
    rosybrown: '#bc8f8f',
    royalblue: '#4169e1',
    saddlebrown: '#8b4513',
    salmon: '#fa8072',
    sandybrown: '#f4a460',
    seagreen: '#2e8b57',
    seashell: '#fff5ee',
    sienna: '#a0522d',
    silver: '#c0c0c0',
    skyblue: '#87ceeb',
    slateblue: '#6a5acd',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#fffafa',
    springgreen: '#00ff7f',
    steelblue: '#4682b4',
    tan: '#d2b48c',
    teal: '#008080',
    thistle: '#d8bfd8',
    tomato: '#ff6347',
    turquoise: '#40e0d0',
    violet: '#ee82ee',
    wheat: '#f5deb3',
    white: '#ffffff',
    whitesmoke: '#f5f5f5',
    yellow: '#ffff00',
    yellowgreen: '#9acd32',
};

/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
/**
 * Given a string or object, convert that input to RGB
 *
 * Possible string inputs:
 * ```
 * "red"
 * "#f00" or "f00"
 * "#ff0000" or "ff0000"
 * "#ff000000" or "ff000000"
 * "rgb 255 0 0" or "rgb (255, 0, 0)"
 * "rgb 1.0 0 0" or "rgb (1, 0, 0)"
 * "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
 * "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
 * "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
 * "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
 * "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
 * ```
 */
function inputToRGB(color) {
    var rgb = { r: 0, g: 0, b: 0 };
    var a = 1;
    var s = null;
    var v = null;
    var l = null;
    var ok = false;
    var format = false;
    if (typeof color === 'string') {
        color = stringInputToObject(color);
    }
    if (typeof color === 'object') {
        if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
            rgb = rgbToRgb(color.r, color.g, color.b);
            ok = true;
            format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
            s = convertToPercentage(color.s);
            v = convertToPercentage(color.v);
            rgb = hsvToRgb(color.h, s, v);
            ok = true;
            format = 'hsv';
        }
        else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
            s = convertToPercentage(color.s);
            l = convertToPercentage(color.l);
            rgb = hslToRgb(color.h, s, l);
            ok = true;
            format = 'hsl';
        }
        if (Object.prototype.hasOwnProperty.call(color, 'a')) {
            a = color.a;
        }
    }
    a = boundAlpha(a);
    return {
        ok: ok,
        format: color.format || format,
        r: Math.min(255, Math.max(rgb.r, 0)),
        g: Math.min(255, Math.max(rgb.g, 0)),
        b: Math.min(255, Math.max(rgb.b, 0)),
        a: a,
    };
}
// <http://www.w3.org/TR/css3-values/#integers>
var CSS_INTEGER = '[-\\+]?\\d+%?';
// <http://www.w3.org/TR/css3-values/#number-value>
var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
// Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
// Actual matching.
// Parentheses and commas are optional, but not required.
// Whitespace can take the place of commas or opening paren
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
};
/**
 * Permissive string parsing.  Take in a number of formats, and output an object
 * based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
 */
function stringInputToObject(color) {
    color = color.trim().toLowerCase();
    if (color.length === 0) {
        return false;
    }
    var named = false;
    if (names[color]) {
        color = names[color];
        named = true;
    }
    else if (color === 'transparent') {
        return { r: 0, g: 0, b: 0, a: 0, format: 'name' };
    }
    // Try to match string input using regular expressions.
    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
    // Just return an object and let the conversion functions handle that.
    // This way the result will be the same whether the tinycolor is initialized with string or object.
    var match = matchers.rgb.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3] };
    }
    match = matchers.rgba.exec(color);
    if (match) {
        return { r: match[1], g: match[2], b: match[3], a: match[4] };
    }
    match = matchers.hsl.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3] };
    }
    match = matchers.hsla.exec(color);
    if (match) {
        return { h: match[1], s: match[2], l: match[3], a: match[4] };
    }
    match = matchers.hsv.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3] };
    }
    match = matchers.hsva.exec(color);
    if (match) {
        return { h: match[1], s: match[2], v: match[3], a: match[4] };
    }
    match = matchers.hex8.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex6.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    match = matchers.hex4.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            a: convertHexToDecimal(match[4] + match[4]),
            format: named ? 'name' : 'hex8',
        };
    }
    match = matchers.hex3.exec(color);
    if (match) {
        return {
            r: parseIntFromHex(match[1] + match[1]),
            g: parseIntFromHex(match[2] + match[2]),
            b: parseIntFromHex(match[3] + match[3]),
            format: named ? 'name' : 'hex',
        };
    }
    return false;
}
/**
 * Check to see if it looks like a CSS unit
 * (see `matchers` above for definition).
 */
function isValidCSSUnit(color) {
    return Boolean(matchers.CSS_UNIT.exec(String(color)));
}

var TinyColor = /** @class */ (function () {
    function TinyColor(color, opts) {
        if (color === void 0) { color = ''; }
        if (opts === void 0) { opts = {}; }
        var _a;
        // If input is already a tinycolor, return itself
        if (color instanceof TinyColor) {
            // eslint-disable-next-line no-constructor-return
            return color;
        }
        if (typeof color === 'number') {
            color = numberInputToObject(color);
        }
        this.originalInput = color;
        var rgb = inputToRGB(color);
        this.originalInput = color;
        this.r = rgb.r;
        this.g = rgb.g;
        this.b = rgb.b;
        this.a = rgb.a;
        this.roundA = Math.round(100 * this.a) / 100;
        this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
        this.gradientType = opts.gradientType;
        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this.r < 1) {
            this.r = Math.round(this.r);
        }
        if (this.g < 1) {
            this.g = Math.round(this.g);
        }
        if (this.b < 1) {
            this.b = Math.round(this.b);
        }
        this.isValid = rgb.ok;
    }
    TinyColor.prototype.isDark = function () {
        return this.getBrightness() < 128;
    };
    TinyColor.prototype.isLight = function () {
        return !this.isDark();
    };
    /**
     * Returns the perceived brightness of the color, from 0-255.
     */
    TinyColor.prototype.getBrightness = function () {
        // http://www.w3.org/TR/AERT#color-contrast
        var rgb = this.toRgb();
        return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    };
    /**
     * Returns the perceived luminance of a color, from 0-1.
     */
    TinyColor.prototype.getLuminance = function () {
        // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
        var rgb = this.toRgb();
        var R;
        var G;
        var B;
        var RsRGB = rgb.r / 255;
        var GsRGB = rgb.g / 255;
        var BsRGB = rgb.b / 255;
        if (RsRGB <= 0.03928) {
            R = RsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
        }
        if (GsRGB <= 0.03928) {
            G = GsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
        }
        if (BsRGB <= 0.03928) {
            B = BsRGB / 12.92;
        }
        else {
            // eslint-disable-next-line prefer-exponentiation-operator
            B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
        }
        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    };
    /**
     * Returns the alpha value of a color, from 0-1.
     */
    TinyColor.prototype.getAlpha = function () {
        return this.a;
    };
    /**
     * Sets the alpha value on the current color.
     *
     * @param alpha - The new alpha value. The accepted range is 0-1.
     */
    TinyColor.prototype.setAlpha = function (alpha) {
        this.a = boundAlpha(alpha);
        this.roundA = Math.round(100 * this.a) / 100;
        return this;
    };
    /**
     * Returns whether the color is monochrome.
     */
    TinyColor.prototype.isMonochrome = function () {
        var s = this.toHsl().s;
        return s === 0;
    };
    /**
     * Returns the object as a HSVA object.
     */
    TinyColor.prototype.toHsv = function () {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    /**
     * Returns the hsva values interpolated into a string with the following format:
     * "hsva(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHsvString = function () {
        var hsv = rgbToHsv(this.r, this.g, this.b);
        var h = Math.round(hsv.h * 360);
        var s = Math.round(hsv.s * 100);
        var v = Math.round(hsv.v * 100);
        return this.a === 1 ? "hsv(".concat(h, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
    };
    /**
     * Returns the object as a HSLA object.
     */
    TinyColor.prototype.toHsl = function () {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    /**
     * Returns the hsla values interpolated into a string with the following format:
     * "hsla(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toHslString = function () {
        var hsl = rgbToHsl(this.r, this.g, this.b);
        var h = Math.round(hsl.h * 360);
        var s = Math.round(hsl.s * 100);
        var l = Math.round(hsl.l * 100);
        return this.a === 1 ? "hsl(".concat(h, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
    };
    /**
     * Returns the hex value of the color.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHex = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    /**
     * Returns the hex value of the color -with a # prefixed.
     * @param allow3Char will shorten hex value to 3 char if possible
     */
    TinyColor.prototype.toHexString = function (allow3Char) {
        if (allow3Char === void 0) { allow3Char = false; }
        return '#' + this.toHex(allow3Char);
    };
    /**
     * Returns the hex 8 value of the color.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8 = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    /**
     * Returns the hex 8 value of the color -with a # prefixed.
     * @param allow4Char will shorten hex value to 4 char if possible
     */
    TinyColor.prototype.toHex8String = function (allow4Char) {
        if (allow4Char === void 0) { allow4Char = false; }
        return '#' + this.toHex8(allow4Char);
    };
    /**
     * Returns the shorter hex value of the color depends on its alpha -with a # prefixed.
     * @param allowShortChar will shorten hex value to 3 or 4 char if possible
     */
    TinyColor.prototype.toHexShortString = function (allowShortChar) {
        if (allowShortChar === void 0) { allowShortChar = false; }
        return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toRgb = function () {
        return {
            r: Math.round(this.r),
            g: Math.round(this.g),
            b: Math.round(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA values interpolated into a string with the following format:
     * "RGBA(xxx, xxx, xxx, xx)".
     */
    TinyColor.prototype.toRgbString = function () {
        var r = Math.round(this.r);
        var g = Math.round(this.g);
        var b = Math.round(this.b);
        return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
    };
    /**
     * Returns the object as a RGBA object.
     */
    TinyColor.prototype.toPercentageRgb = function () {
        var fmt = function (x) { return "".concat(Math.round(bound01(x, 255) * 100), "%"); };
        return {
            r: fmt(this.r),
            g: fmt(this.g),
            b: fmt(this.b),
            a: this.a,
        };
    };
    /**
     * Returns the RGBA relative values interpolated into a string
     */
    TinyColor.prototype.toPercentageRgbString = function () {
        var rnd = function (x) { return Math.round(bound01(x, 255) * 100); };
        return this.a === 1
            ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)")
            : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
    };
    /**
     * The 'real' name of the color -if there is one.
     */
    TinyColor.prototype.toName = function () {
        if (this.a === 0) {
            return 'transparent';
        }
        if (this.a < 1) {
            return false;
        }
        var hex = '#' + rgbToHex(this.r, this.g, this.b, false);
        for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (hex === value) {
                return key;
            }
        }
        return false;
    };
    TinyColor.prototype.toString = function (format) {
        var formatSet = Boolean(format);
        format = format !== null && format !== void 0 ? format : this.format;
        var formattedString = false;
        var hasAlpha = this.a < 1 && this.a >= 0;
        var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith('hex') || format === 'name');
        if (needsAlphaFormat) {
            // Special case for "transparent", all other non-alpha formats
            // will return rgba when there is transparency.
            if (format === 'name' && this.a === 0) {
                return this.toName();
            }
            return this.toRgbString();
        }
        if (format === 'rgb') {
            formattedString = this.toRgbString();
        }
        if (format === 'prgb') {
            formattedString = this.toPercentageRgbString();
        }
        if (format === 'hex' || format === 'hex6') {
            formattedString = this.toHexString();
        }
        if (format === 'hex3') {
            formattedString = this.toHexString(true);
        }
        if (format === 'hex4') {
            formattedString = this.toHex8String(true);
        }
        if (format === 'hex8') {
            formattedString = this.toHex8String();
        }
        if (format === 'name') {
            formattedString = this.toName();
        }
        if (format === 'hsl') {
            formattedString = this.toHslString();
        }
        if (format === 'hsv') {
            formattedString = this.toHsvString();
        }
        return formattedString || this.toHexString();
    };
    TinyColor.prototype.toNumber = function () {
        return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor.prototype.clone = function () {
        return new TinyColor(this.toString());
    };
    /**
     * Lighten the color a given amount. Providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.lighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Brighten the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.brighten = function (amount) {
        if (amount === void 0) { amount = 10; }
        var rgb = this.toRgb();
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
        return new TinyColor(rgb);
    };
    /**
     * Darken the color a given amount, from 0 to 100.
     * Providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.darken = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return new TinyColor(hsl);
    };
    /**
     * Mix the color with pure white, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return white.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.tint = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('white', amount);
    };
    /**
     * Mix the color with pure black, from 0 to 100.
     * Providing 0 will do nothing, providing 100 will always return black.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.shade = function (amount) {
        if (amount === void 0) { amount = 10; }
        return this.mix('black', amount);
    };
    /**
     * Desaturate the color a given amount, from 0 to 100.
     * Providing 100 will is the same as calling greyscale
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.desaturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Saturate the color a given amount, from 0 to 100.
     * @param amount - valid between 1-100
     */
    TinyColor.prototype.saturate = function (amount) {
        if (amount === void 0) { amount = 10; }
        var hsl = this.toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return new TinyColor(hsl);
    };
    /**
     * Completely desaturates a color into greyscale.
     * Same as calling `desaturate(100)`
     */
    TinyColor.prototype.greyscale = function () {
        return this.desaturate(100);
    };
    /**
     * Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
     * Values outside of this range will be wrapped into this range.
     */
    TinyColor.prototype.spin = function (amount) {
        var hsl = this.toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return new TinyColor(hsl);
    };
    /**
     * Mix the current color a given amount with another color, from 0 to 100.
     * 0 means no mixing (return current color).
     */
    TinyColor.prototype.mix = function (color, amount) {
        if (amount === void 0) { amount = 50; }
        var rgb1 = this.toRgb();
        var rgb2 = new TinyColor(color).toRgb();
        var p = amount / 100;
        var rgba = {
            r: (rgb2.r - rgb1.r) * p + rgb1.r,
            g: (rgb2.g - rgb1.g) * p + rgb1.g,
            b: (rgb2.b - rgb1.b) * p + rgb1.b,
            a: (rgb2.a - rgb1.a) * p + rgb1.a,
        };
        return new TinyColor(rgba);
    };
    TinyColor.prototype.analogous = function (results, slices) {
        if (results === void 0) { results = 6; }
        if (slices === void 0) { slices = 30; }
        var hsl = this.toHsl();
        var part = 360 / slices;
        var ret = [this];
        for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results;) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(new TinyColor(hsl));
        }
        return ret;
    };
    /**
     * taken from https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js
     */
    TinyColor.prototype.complement = function () {
        var hsl = this.toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return new TinyColor(hsl);
    };
    TinyColor.prototype.monochromatic = function (results) {
        if (results === void 0) { results = 6; }
        var hsv = this.toHsv();
        var h = hsv.h;
        var s = hsv.s;
        var v = hsv.v;
        var res = [];
        var modification = 1 / results;
        while (results--) {
            res.push(new TinyColor({ h: h, s: s, v: v }));
            v = (v + modification) % 1;
        }
        return res;
    };
    TinyColor.prototype.splitcomplement = function () {
        var hsl = this.toHsl();
        var h = hsl.h;
        return [
            this,
            new TinyColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }),
            new TinyColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l }),
        ];
    };
    /**
     * Compute how the color would appear on a background
     */
    TinyColor.prototype.onBackground = function (background) {
        var fg = this.toRgb();
        var bg = new TinyColor(background).toRgb();
        var alpha = fg.a + bg.a * (1 - fg.a);
        return new TinyColor({
            r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
            g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
            b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
            a: alpha,
        });
    };
    /**
     * Alias for `polyad(3)`
     */
    TinyColor.prototype.triad = function () {
        return this.polyad(3);
    };
    /**
     * Alias for `polyad(4)`
     */
    TinyColor.prototype.tetrad = function () {
        return this.polyad(4);
    };
    /**
     * Get polyad colors, like (for 1, 2, 3, 4, 5, 6, 7, 8, etc...)
     * monad, dyad, triad, tetrad, pentad, hexad, heptad, octad, etc...
     */
    TinyColor.prototype.polyad = function (n) {
        var hsl = this.toHsl();
        var h = hsl.h;
        var result = [this];
        var increment = 360 / n;
        for (var i = 1; i < n; i++) {
            result.push(new TinyColor({ h: (h + i * increment) % 360, s: hsl.s, l: hsl.l }));
        }
        return result;
    };
    /**
     * compare color vs current color
     */
    TinyColor.prototype.equals = function (color) {
        return this.toRgbString() === new TinyColor(color).toRgbString();
    };
    return TinyColor;
}());

function darken(color, amount = 20) {
  return color.mix("#141414", amount).toString();
}
function useButtonCustomStyle(props) {
  const _disabled = useFormDisabled();
  const ns = useNamespace("button");
  return vue.computed(() => {
    let styles = {};
    const buttonColor = props.color;
    if (buttonColor) {
      const color = new TinyColor(buttonColor);
      const activeBgColor = props.dark ? color.tint(20).toString() : darken(color, 20);
      if (props.plain) {
        styles = ns.cssVarBlock({
          "bg-color": props.dark ? darken(color, 90) : color.tint(90).toString(),
          "text-color": buttonColor,
          "border-color": props.dark ? darken(color, 50) : color.tint(50).toString(),
          "hover-text-color": `var(${ns.cssVarName("color-white")})`,
          "hover-bg-color": buttonColor,
          "hover-border-color": buttonColor,
          "active-bg-color": activeBgColor,
          "active-text-color": `var(${ns.cssVarName("color-white")})`,
          "active-border-color": activeBgColor
        });
        if (_disabled.value) {
          styles[ns.cssVarBlockName("disabled-bg-color")] = props.dark ? darken(color, 90) : color.tint(90).toString();
          styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? darken(color, 50) : color.tint(50).toString();
          styles[ns.cssVarBlockName("disabled-border-color")] = props.dark ? darken(color, 80) : color.tint(80).toString();
        }
      } else {
        const hoverBgColor = props.dark ? darken(color, 30) : color.tint(30).toString();
        const textColor = color.isDark() ? `var(${ns.cssVarName("color-white")})` : `var(${ns.cssVarName("color-black")})`;
        styles = ns.cssVarBlock({
          "bg-color": buttonColor,
          "text-color": textColor,
          "border-color": buttonColor,
          "hover-bg-color": hoverBgColor,
          "hover-text-color": textColor,
          "hover-border-color": hoverBgColor,
          "active-bg-color": activeBgColor,
          "active-border-color": activeBgColor
        });
        if (_disabled.value) {
          const disabledButtonColor = props.dark ? darken(color, 50) : color.tint(50).toString();
          styles[ns.cssVarBlockName("disabled-bg-color")] = disabledButtonColor;
          styles[ns.cssVarBlockName("disabled-text-color")] = props.dark ? "rgba(255, 255, 255, 0.5)" : `var(${ns.cssVarName("color-white")})`;
          styles[ns.cssVarBlockName("disabled-border-color")] = disabledButtonColor;
        }
      }
    }
    return styles;
  });
}

const __default__$4 = vue.defineComponent({
  name: "ElButton"
});
const _sfc_main$3 = /* @__PURE__ */ vue.defineComponent({
  ...__default__$4,
  props: buttonProps,
  emits: buttonEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const buttonStyle = useButtonCustomStyle(props);
    const ns = useNamespace("button");
    const { _ref, _size, _type, _disabled, _props, shouldAddSpace, handleClick } = useButton(props, emit);
    const buttonKls = vue.computed(() => [
      ns.b(),
      ns.m(_type.value),
      ns.m(_size.value),
      ns.is("disabled", _disabled.value),
      ns.is("loading", props.loading),
      ns.is("plain", props.plain),
      ns.is("round", props.round),
      ns.is("circle", props.circle),
      ns.is("text", props.text),
      ns.is("link", props.link),
      ns.is("has-bg", props.bg)
    ]);
    expose({
      ref: _ref,
      size: _size,
      type: _type,
      disabled: _disabled,
      shouldAddSpace
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.tag), vue.mergeProps({
        ref_key: "_ref",
        ref: _ref
      }, vue.unref(_props), {
        class: vue.unref(buttonKls),
        style: vue.unref(buttonStyle),
        onClick: vue.unref(handleClick)
      }), {
        default: vue.withCtx(() => [
          _ctx.loading ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
            _ctx.$slots.loading ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }) : (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
              key: 1,
              class: vue.normalizeClass(vue.unref(ns).is("loading"))
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.loadingIcon)))
              ]),
              _: 1
            }, 8, ["class"]))
          ], 64)) : _ctx.icon || _ctx.$slots.icon ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), { key: 1 }, {
            default: vue.withCtx(() => [
              _ctx.icon ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.icon), { key: 0 })) : vue.renderSlot(_ctx.$slots, "icon", { key: 1 })
            ]),
            _: 3
          })) : vue.createCommentVNode("v-if", true),
          _ctx.$slots.default ? (vue.openBlock(), vue.createElementBlock("span", {
            key: 2,
            class: vue.normalizeClass({ [vue.unref(ns).em("text", "expand")]: vue.unref(shouldAddSpace) })
          }, [
            vue.renderSlot(_ctx.$slots, "default")
          ], 2)) : vue.createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 16, ["class", "style", "onClick"]);
    };
  }
});
var Button = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "button.vue"]]);

const buttonGroupProps = {
  size: buttonProps.size,
  type: buttonProps.type
};

const __default__$3 = vue.defineComponent({
  name: "ElButtonGroup"
});
const _sfc_main$2 = /* @__PURE__ */ vue.defineComponent({
  ...__default__$3,
  props: buttonGroupProps,
  setup(__props) {
    const props = __props;
    vue.provide(buttonGroupContextKey, vue.reactive({
      size: vue.toRef(props, "size"),
      type: vue.toRef(props, "type")
    }));
    const ns = useNamespace("button");
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass(`${vue.unref(ns).b("group")}`)
      }, [
        vue.renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var ButtonGroup = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "button-group.vue"]]);

const ElButton = withInstall(Button, {
  ButtonGroup
});
withNoopInstall(ButtonGroup);

const FOCUSABLE_CHILDREN = "_trap-focus-children";
const FOCUS_STACK = [];
const FOCUS_HANDLER = (e) => {
  var _a;
  if (FOCUS_STACK.length === 0)
    return;
  const focusableElement = FOCUS_STACK[FOCUS_STACK.length - 1][FOCUSABLE_CHILDREN];
  if (focusableElement.length > 0 && e.code === EVENT_CODE.tab) {
    if (focusableElement.length === 1) {
      e.preventDefault();
      if (document.activeElement !== focusableElement[0]) {
        focusableElement[0].focus();
      }
      return;
    }
    const goingBackward = e.shiftKey;
    const isFirst = e.target === focusableElement[0];
    const isLast = e.target === focusableElement[focusableElement.length - 1];
    if (isFirst && goingBackward) {
      e.preventDefault();
      focusableElement[focusableElement.length - 1].focus();
    }
    if (isLast && !goingBackward) {
      e.preventDefault();
      focusableElement[0].focus();
    }
    if (process.env.NODE_ENV === "test") {
      const index = focusableElement.indexOf(e.target);
      if (index !== -1) {
        (_a = focusableElement[goingBackward ? index - 1 : index + 1]) == null ? void 0 : _a.focus();
      }
    }
  }
};
const TrapFocus = {
  beforeMount(el) {
    el[FOCUSABLE_CHILDREN] = obtainAllFocusableElements$1(el);
    FOCUS_STACK.push(el);
    if (FOCUS_STACK.length <= 1) {
      document.addEventListener("keydown", FOCUS_HANDLER);
    }
  },
  updated(el) {
    vue.nextTick(() => {
      el[FOCUSABLE_CHILDREN] = obtainAllFocusableElements$1(el);
    });
  },
  unmounted() {
    FOCUS_STACK.shift();
    if (FOCUS_STACK.length === 0) {
      document.removeEventListener("keydown", FOCUS_HANDLER);
    }
  }
};

const overlayProps = buildProps({
  mask: {
    type: Boolean,
    default: true
  },
  customMaskEvent: {
    type: Boolean,
    default: false
  },
  overlayClass: {
    type: definePropType([
      String,
      Array,
      Object
    ])
  },
  zIndex: {
    type: definePropType([String, Number])
  }
});
const overlayEmits = {
  click: (evt) => evt instanceof MouseEvent
};
const BLOCK = "overlay";
var Overlay = vue.defineComponent({
  name: "ElOverlay",
  props: overlayProps,
  emits: overlayEmits,
  setup(props, { slots, emit }) {
    const ns = useNamespace(BLOCK);
    const onMaskClick = (e) => {
      emit("click", e);
    };
    const { onClick, onMousedown, onMouseup } = useSameTarget(props.customMaskEvent ? void 0 : onMaskClick);
    return () => {
      return props.mask ? vue.createVNode("div", {
        class: [ns.b(), props.overlayClass],
        style: {
          zIndex: props.zIndex
        },
        onClick,
        onMousedown,
        onMouseup
      }, [vue.renderSlot(slots, "default")], PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS, ["onClick", "onMouseup", "onMousedown"]) : vue.h("div", {
        class: props.overlayClass,
        style: {
          zIndex: props.zIndex,
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }, [vue.renderSlot(slots, "default")]);
    };
  }
});

const ElOverlay = Overlay;

const messageTypes = ["success", "info", "warning", "error"];
const messageDefaults = mutable({
  customClass: "",
  center: false,
  dangerouslyUseHTMLString: false,
  duration: 3e3,
  icon: void 0,
  id: "",
  message: "",
  onClose: void 0,
  showClose: false,
  type: "info",
  plain: false,
  offset: 16,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? document.body : void 0
});
const messageProps = buildProps({
  customClass: {
    type: String,
    default: messageDefaults.customClass
  },
  center: {
    type: Boolean,
    default: messageDefaults.center
  },
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString
  },
  duration: {
    type: Number,
    default: messageDefaults.duration
  },
  icon: {
    type: iconPropType,
    default: messageDefaults.icon
  },
  id: {
    type: String,
    default: messageDefaults.id
  },
  message: {
    type: definePropType([
      String,
      Object,
      Function
    ]),
    default: messageDefaults.message
  },
  onClose: {
    type: definePropType(Function),
    default: messageDefaults.onClose
  },
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose
  },
  type: {
    type: String,
    values: messageTypes,
    default: messageDefaults.type
  },
  plain: {
    type: Boolean,
    default: messageDefaults.plain
  },
  offset: {
    type: Number,
    default: messageDefaults.offset
  },
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex
  },
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping
  },
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum
  }
});
const messageEmits = {
  destroy: () => true
};

const instances = vue.shallowReactive([]);
const getInstance = (id) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  const current = instances[idx];
  let prev;
  if (idx > 0) {
    prev = instances[idx - 1];
  }
  return { current, prev };
};
const getLastOffset = (id) => {
  const { prev } = getInstance(id);
  if (!prev)
    return 0;
  return prev.vm.exposed.bottom.value;
};
const getOffsetOrSpace = (id, offset) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  return idx > 0 ? 16 : offset;
};

const _hoisted_1$8 = ["id"];
const _hoisted_2$8 = ["innerHTML"];
const __default__$2 = vue.defineComponent({
  name: "ElMessage"
});
const _sfc_main$1 = /* @__PURE__ */ vue.defineComponent({
  ...__default__$2,
  props: messageProps,
  emits: messageEmits,
  setup(__props, { expose }) {
    const props = __props;
    const { Close } = TypeComponents;
    const { ns, zIndex } = useGlobalComponentSettings("message");
    const { currentZIndex, nextZIndex } = zIndex;
    const messageRef = vue.ref();
    const visible = vue.ref(false);
    const height = vue.ref(0);
    let stopTimer = void 0;
    const badgeType = vue.computed(() => props.type ? props.type === "error" ? "danger" : props.type : "info");
    const typeClass = vue.computed(() => {
      const type = props.type;
      return { [ns.bm("icon", type)]: type && TypeComponentsMap[type] };
    });
    const iconComponent = vue.computed(() => props.icon || TypeComponentsMap[props.type] || "");
    const lastOffset = vue.computed(() => getLastOffset(props.id));
    const offset = vue.computed(() => getOffsetOrSpace(props.id, props.offset) + lastOffset.value);
    const bottom = vue.computed(() => height.value + offset.value);
    const customStyle = vue.computed(() => ({
      top: `${offset.value}px`,
      zIndex: currentZIndex.value
    }));
    function startTimer() {
      if (props.duration === 0)
        return;
      ({ stop: stopTimer } = useTimeoutFn(() => {
        close();
      }, props.duration));
    }
    function clearTimer() {
      stopTimer == null ? void 0 : stopTimer();
    }
    function close() {
      visible.value = false;
    }
    function keydown({ code }) {
      if (code === EVENT_CODE.esc) {
        close();
      }
    }
    vue.onMounted(() => {
      startTimer();
      nextZIndex();
      visible.value = true;
    });
    vue.watch(() => props.repeatNum, () => {
      clearTimer();
      startTimer();
    });
    useEventListener(document, "keydown", keydown);
    useResizeObserver(messageRef, () => {
      height.value = messageRef.value.getBoundingClientRect().height;
    });
    expose({
      visible,
      bottom,
      close
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createBlock(vue.Transition, {
        name: vue.unref(ns).b("fade"),
        onBeforeLeave: _ctx.onClose,
        onAfterLeave: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("destroy")),
        persisted: ""
      }, {
        default: vue.withCtx(() => [
          vue.withDirectives(vue.createElementVNode("div", {
            id: _ctx.id,
            ref_key: "messageRef",
            ref: messageRef,
            class: vue.normalizeClass([
              vue.unref(ns).b(),
              { [vue.unref(ns).m(_ctx.type)]: _ctx.type },
              vue.unref(ns).is("center", _ctx.center),
              vue.unref(ns).is("closable", _ctx.showClose),
              vue.unref(ns).is("plain", _ctx.plain),
              _ctx.customClass
            ]),
            style: vue.normalizeStyle(vue.unref(customStyle)),
            role: "alert",
            onMouseenter: clearTimer,
            onMouseleave: startTimer
          }, [
            _ctx.repeatNum > 1 ? (vue.openBlock(), vue.createBlock(vue.unref(ElBadge), {
              key: 0,
              value: _ctx.repeatNum,
              type: vue.unref(badgeType),
              class: vue.normalizeClass(vue.unref(ns).e("badge"))
            }, null, 8, ["value", "type", "class"])) : vue.createCommentVNode("v-if", true),
            vue.unref(iconComponent) ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
              key: 1,
              class: vue.normalizeClass([vue.unref(ns).e("icon"), vue.unref(typeClass)])
            }, {
              default: vue.withCtx(() => [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(vue.unref(iconComponent))))
              ]),
              _: 1
            }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "default", {}, () => [
              !_ctx.dangerouslyUseHTMLString ? (vue.openBlock(), vue.createElementBlock("p", {
                key: 0,
                class: vue.normalizeClass(vue.unref(ns).e("content"))
              }, vue.toDisplayString(_ctx.message), 3)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
                vue.createCommentVNode(" Caution here, message could've been compromised, never use user's input as message "),
                vue.createElementVNode("p", {
                  class: vue.normalizeClass(vue.unref(ns).e("content")),
                  innerHTML: _ctx.message
                }, null, 10, _hoisted_2$8)
              ], 2112))
            ]),
            _ctx.showClose ? (vue.openBlock(), vue.createBlock(vue.unref(ElIcon), {
              key: 2,
              class: vue.normalizeClass(vue.unref(ns).e("closeBtn")),
              onClick: vue.withModifiers(close, ["stop"])
            }, {
              default: vue.withCtx(() => [
                vue.createVNode(vue.unref(Close))
              ]),
              _: 1
            }, 8, ["class", "onClick"])) : vue.createCommentVNode("v-if", true)
          ], 46, _hoisted_1$8), [
            [vue.vShow, visible.value]
          ])
        ]),
        _: 3
      }, 8, ["name", "onBeforeLeave"]);
    };
  }
});
var MessageConstructor = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "message.vue"]]);

let seed = 1;
const normalizeOptions = (params) => {
  const options = !params || isString(params) || vue.isVNode(params) || isFunction$1(params) ? { message: params } : params;
  const normalized = {
    ...messageDefaults,
    ...options
  };
  if (!normalized.appendTo) {
    normalized.appendTo = document.body;
  } else if (isString(normalized.appendTo)) {
    let appendTo = document.querySelector(normalized.appendTo);
    if (!isElement(appendTo)) {
      debugWarn("ElMessage", "the appendTo option is not an HTMLElement. Falling back to document.body.");
      appendTo = document.body;
    }
    normalized.appendTo = appendTo;
  }
  return normalized;
};
const closeMessage = (instance) => {
  const idx = instances.indexOf(instance);
  if (idx === -1)
    return;
  instances.splice(idx, 1);
  const { handler } = instance;
  handler.close();
};
const createMessage = ({ appendTo, ...options }, context) => {
  const id = `message_${seed++}`;
  const userOnClose = options.onClose;
  const container = document.createElement("div");
  const props = {
    ...options,
    id,
    onClose: () => {
      userOnClose == null ? void 0 : userOnClose();
      closeMessage(instance);
    },
    onDestroy: () => {
      vue.render(null, container);
    }
  };
  const vnode = vue.createVNode(MessageConstructor, props, isFunction$1(props.message) || vue.isVNode(props.message) ? {
    default: isFunction$1(props.message) ? props.message : () => props.message
  } : null);
  vnode.appContext = context || message._context;
  vue.render(vnode, container);
  appendTo.appendChild(container.firstElementChild);
  const vm = vnode.component;
  const handler = {
    close: () => {
      vm.exposed.visible.value = false;
    }
  };
  const instance = {
    id,
    vnode,
    vm,
    handler,
    props: vnode.component.props
  };
  return instance;
};
const message = (options = {}, context) => {
  if (!isClient)
    return { close: () => void 0 };
  if (isNumber(messageConfig.max) && instances.length >= messageConfig.max) {
    return { close: () => void 0 };
  }
  const normalized = normalizeOptions(options);
  if (normalized.grouping && instances.length) {
    const instance2 = instances.find(({ vnode: vm }) => {
      var _a;
      return ((_a = vm.props) == null ? void 0 : _a.message) === normalized.message;
    });
    if (instance2) {
      instance2.props.repeatNum += 1;
      instance2.props.type = normalized.type;
      return instance2.handler;
    }
  }
  const instance = createMessage(normalized, context);
  instances.push(instance);
  return instance.handler;
};
messageTypes.forEach((type) => {
  message[type] = (options = {}, appContext) => {
    const normalized = normalizeOptions(options);
    return message({ ...normalized, type }, appContext);
  };
});
function closeAll(type) {
  for (const instance of instances) {
    if (!type || type === instance.props.type) {
      instance.handler.close();
    }
  }
}
message.closeAll = closeAll;
message._context = null;

const ElMessage = withInstallFunction(message, "$message");

const _sfc_main = vue.defineComponent({
  name: "ElMessageBox",
  directives: {
    TrapFocus
  },
  components: {
    ElButton,
    ElFocusTrap,
    ElInput,
    ElOverlay,
    ElIcon,
    ...TypeComponents
  },
  inheritAttrs: false,
  props: {
    buttonSize: {
      type: String,
      validator: isValidComponentSize
    },
    modal: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    closeOnPressEscape: {
      type: Boolean,
      default: true
    },
    closeOnHashChange: {
      type: Boolean,
      default: true
    },
    center: Boolean,
    draggable: Boolean,
    overflow: Boolean,
    roundButton: {
      default: false,
      type: Boolean
    },
    container: {
      type: String,
      default: "body"
    },
    boxType: {
      type: String,
      default: ""
    }
  },
  emits: ["vanish", "action"],
  setup(props, { emit }) {
    const {
      locale,
      zIndex,
      ns,
      size: btnSize
    } = useGlobalComponentSettings("message-box", vue.computed(() => props.buttonSize));
    const { t } = locale;
    const { nextZIndex } = zIndex;
    const visible = vue.ref(false);
    const state = vue.reactive({
      autofocus: true,
      beforeClose: null,
      callback: null,
      cancelButtonText: "",
      cancelButtonClass: "",
      confirmButtonText: "",
      confirmButtonClass: "",
      customClass: "",
      customStyle: {},
      dangerouslyUseHTMLString: false,
      distinguishCancelAndClose: false,
      icon: "",
      inputPattern: null,
      inputPlaceholder: "",
      inputType: "text",
      inputValue: null,
      inputValidator: null,
      inputErrorMessage: "",
      message: null,
      modalFade: true,
      modalClass: "",
      showCancelButton: false,
      showConfirmButton: true,
      type: "",
      title: void 0,
      showInput: false,
      action: "",
      confirmButtonLoading: false,
      cancelButtonLoading: false,
      confirmButtonDisabled: false,
      editorErrorMessage: "",
      validateError: false,
      zIndex: nextZIndex()
    });
    const typeClass = vue.computed(() => {
      const type = state.type;
      return { [ns.bm("icon", type)]: type && TypeComponentsMap[type] };
    });
    const contentId = useId();
    const inputId = useId();
    const iconComponent = vue.computed(() => state.icon || TypeComponentsMap[state.type] || "");
    const hasMessage = vue.computed(() => !!state.message);
    const rootRef = vue.ref();
    const headerRef = vue.ref();
    const focusStartRef = vue.ref();
    const inputRef = vue.ref();
    const confirmRef = vue.ref();
    const confirmButtonClasses = vue.computed(() => state.confirmButtonClass);
    vue.watch(() => state.inputValue, async (val) => {
      await vue.nextTick();
      if (props.boxType === "prompt" && val !== null) {
        validate();
      }
    }, { immediate: true });
    vue.watch(() => visible.value, (val) => {
      var _a, _b;
      if (val) {
        if (props.boxType !== "prompt") {
          if (state.autofocus) {
            focusStartRef.value = (_b = (_a = confirmRef.value) == null ? void 0 : _a.$el) != null ? _b : rootRef.value;
          } else {
            focusStartRef.value = rootRef.value;
          }
        }
        state.zIndex = nextZIndex();
      }
      if (props.boxType !== "prompt")
        return;
      if (val) {
        vue.nextTick().then(() => {
          var _a2;
          if (inputRef.value && inputRef.value.$el) {
            if (state.autofocus) {
              focusStartRef.value = (_a2 = getInputElement()) != null ? _a2 : rootRef.value;
            } else {
              focusStartRef.value = rootRef.value;
            }
          }
        });
      } else {
        state.editorErrorMessage = "";
        state.validateError = false;
      }
    });
    const draggable = vue.computed(() => props.draggable);
    const overflow = vue.computed(() => props.overflow);
    useDraggable(rootRef, headerRef, draggable, overflow);
    vue.onMounted(async () => {
      await vue.nextTick();
      if (props.closeOnHashChange) {
        window.addEventListener("hashchange", doClose);
      }
    });
    vue.onBeforeUnmount(() => {
      if (props.closeOnHashChange) {
        window.removeEventListener("hashchange", doClose);
      }
    });
    function doClose() {
      if (!visible.value)
        return;
      visible.value = false;
      vue.nextTick(() => {
        if (state.action)
          emit("action", state.action);
      });
    }
    const handleWrapperClick = () => {
      if (props.closeOnClickModal) {
        handleAction(state.distinguishCancelAndClose ? "close" : "cancel");
      }
    };
    const overlayEvent = useSameTarget(handleWrapperClick);
    const handleInputEnter = (e) => {
      if (state.inputType !== "textarea") {
        e.preventDefault();
        return handleAction("confirm");
      }
    };
    const handleAction = (action) => {
      var _a;
      if (props.boxType === "prompt" && action === "confirm" && !validate()) {
        return;
      }
      state.action = action;
      if (state.beforeClose) {
        (_a = state.beforeClose) == null ? void 0 : _a.call(state, action, state, doClose);
      } else {
        doClose();
      }
    };
    const validate = () => {
      if (props.boxType === "prompt") {
        const inputPattern = state.inputPattern;
        if (inputPattern && !inputPattern.test(state.inputValue || "")) {
          state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
          state.validateError = true;
          return false;
        }
        const inputValidator = state.inputValidator;
        if (typeof inputValidator === "function") {
          const validateResult = inputValidator(state.inputValue);
          if (validateResult === false) {
            state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
            state.validateError = true;
            return false;
          }
          if (typeof validateResult === "string") {
            state.editorErrorMessage = validateResult;
            state.validateError = true;
            return false;
          }
        }
      }
      state.editorErrorMessage = "";
      state.validateError = false;
      return true;
    };
    const getInputElement = () => {
      const inputRefs = inputRef.value.$refs;
      return inputRefs.input || inputRefs.textarea;
    };
    const handleClose = () => {
      handleAction("close");
    };
    const onCloseRequested = () => {
      if (props.closeOnPressEscape) {
        handleClose();
      }
    };
    if (props.lockScroll) {
      useLockscreen(visible);
    }
    return {
      ...vue.toRefs(state),
      ns,
      overlayEvent,
      visible,
      hasMessage,
      typeClass,
      contentId,
      inputId,
      btnSize,
      iconComponent,
      confirmButtonClasses,
      rootRef,
      focusStartRef,
      headerRef,
      inputRef,
      confirmRef,
      doClose,
      handleClose,
      onCloseRequested,
      handleWrapperClick,
      handleInputEnter,
      handleAction,
      t
    };
  }
});
const _hoisted_1$7 = ["aria-label", "aria-describedby"];
const _hoisted_2$7 = ["aria-label"];
const _hoisted_3$4 = ["id"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = vue.resolveComponent("el-icon");
  const _component_close = vue.resolveComponent("close");
  const _component_el_input = vue.resolveComponent("el-input");
  const _component_el_button = vue.resolveComponent("el-button");
  const _component_el_focus_trap = vue.resolveComponent("el-focus-trap");
  const _component_el_overlay = vue.resolveComponent("el-overlay");
  return vue.openBlock(), vue.createBlock(vue.Transition, {
    name: "fade-in-linear",
    onAfterLeave: _cache[11] || (_cache[11] = ($event) => _ctx.$emit("vanish")),
    persisted: ""
  }, {
    default: vue.withCtx(() => [
      vue.withDirectives(vue.createVNode(_component_el_overlay, {
        "z-index": _ctx.zIndex,
        "overlay-class": [_ctx.ns.is("message-box"), _ctx.modalClass],
        mask: _ctx.modal
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("div", {
            role: "dialog",
            "aria-label": _ctx.title,
            "aria-modal": "true",
            "aria-describedby": !_ctx.showInput ? _ctx.contentId : void 0,
            class: vue.normalizeClass(`${_ctx.ns.namespace.value}-overlay-message-box`),
            onClick: _cache[8] || (_cache[8] = (...args) => _ctx.overlayEvent.onClick && _ctx.overlayEvent.onClick(...args)),
            onMousedown: _cache[9] || (_cache[9] = (...args) => _ctx.overlayEvent.onMousedown && _ctx.overlayEvent.onMousedown(...args)),
            onMouseup: _cache[10] || (_cache[10] = (...args) => _ctx.overlayEvent.onMouseup && _ctx.overlayEvent.onMouseup(...args))
          }, [
            vue.createVNode(_component_el_focus_trap, {
              loop: "",
              trapped: _ctx.visible,
              "focus-trap-el": _ctx.rootRef,
              "focus-start-el": _ctx.focusStartRef,
              onReleaseRequested: _ctx.onCloseRequested
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("div", {
                  ref: "rootRef",
                  class: vue.normalizeClass([
                    _ctx.ns.b(),
                    _ctx.customClass,
                    _ctx.ns.is("draggable", _ctx.draggable),
                    { [_ctx.ns.m("center")]: _ctx.center }
                  ]),
                  style: vue.normalizeStyle(_ctx.customStyle),
                  tabindex: "-1",
                  onClick: _cache[7] || (_cache[7] = vue.withModifiers(() => {
                  }, ["stop"]))
                }, [
                  _ctx.title !== null && _ctx.title !== void 0 ? (vue.openBlock(), vue.createElementBlock("div", {
                    key: 0,
                    ref: "headerRef",
                    class: vue.normalizeClass([_ctx.ns.e("header"), { "show-close": _ctx.showClose }])
                  }, [
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(_ctx.ns.e("title"))
                    }, [
                      _ctx.iconComponent && _ctx.center ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                        key: 0,
                        class: vue.normalizeClass([_ctx.ns.e("status"), _ctx.typeClass])
                      }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.iconComponent)))
                        ]),
                        _: 1
                      }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                      vue.createElementVNode("span", null, vue.toDisplayString(_ctx.title), 1)
                    ], 2),
                    _ctx.showClose ? (vue.openBlock(), vue.createElementBlock("button", {
                      key: 0,
                      type: "button",
                      class: vue.normalizeClass(_ctx.ns.e("headerbtn")),
                      "aria-label": _ctx.t("el.messagebox.close"),
                      onClick: _cache[0] || (_cache[0] = ($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel")),
                      onKeydown: _cache[1] || (_cache[1] = vue.withKeys(vue.withModifiers(($event) => _ctx.handleAction(_ctx.distinguishCancelAndClose ? "close" : "cancel"), ["prevent"]), ["enter"]))
                    }, [
                      vue.createVNode(_component_el_icon, {
                        class: vue.normalizeClass(_ctx.ns.e("close"))
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_close)
                        ]),
                        _: 1
                      }, 8, ["class"])
                    ], 42, _hoisted_2$7)) : vue.createCommentVNode("v-if", true)
                  ], 2)) : vue.createCommentVNode("v-if", true),
                  vue.createElementVNode("div", {
                    id: _ctx.contentId,
                    class: vue.normalizeClass(_ctx.ns.e("content"))
                  }, [
                    vue.createElementVNode("div", {
                      class: vue.normalizeClass(_ctx.ns.e("container"))
                    }, [
                      _ctx.iconComponent && !_ctx.center && _ctx.hasMessage ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                        key: 0,
                        class: vue.normalizeClass([_ctx.ns.e("status"), _ctx.typeClass])
                      }, {
                        default: vue.withCtx(() => [
                          (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.iconComponent)))
                        ]),
                        _: 1
                      }, 8, ["class"])) : vue.createCommentVNode("v-if", true),
                      _ctx.hasMessage ? (vue.openBlock(), vue.createElementBlock("div", {
                        key: 1,
                        class: vue.normalizeClass(_ctx.ns.e("message"))
                      }, [
                        vue.renderSlot(_ctx.$slots, "default", {}, () => [
                          !_ctx.dangerouslyUseHTMLString ? (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.showInput ? "label" : "p"), {
                            key: 0,
                            for: _ctx.showInput ? _ctx.inputId : void 0
                          }, {
                            default: vue.withCtx(() => [
                              vue.createTextVNode(vue.toDisplayString(!_ctx.dangerouslyUseHTMLString ? _ctx.message : ""), 1)
                            ]),
                            _: 1
                          }, 8, ["for"])) : (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(_ctx.showInput ? "label" : "p"), {
                            key: 1,
                            for: _ctx.showInput ? _ctx.inputId : void 0,
                            innerHTML: _ctx.message
                          }, null, 8, ["for", "innerHTML"]))
                        ])
                      ], 2)) : vue.createCommentVNode("v-if", true)
                    ], 2),
                    vue.withDirectives(vue.createElementVNode("div", {
                      class: vue.normalizeClass(_ctx.ns.e("input"))
                    }, [
                      vue.createVNode(_component_el_input, {
                        id: _ctx.inputId,
                        ref: "inputRef",
                        modelValue: _ctx.inputValue,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.inputValue = $event),
                        type: _ctx.inputType,
                        placeholder: _ctx.inputPlaceholder,
                        "aria-invalid": _ctx.validateError,
                        class: vue.normalizeClass({ invalid: _ctx.validateError }),
                        onKeydown: vue.withKeys(_ctx.handleInputEnter, ["enter"])
                      }, null, 8, ["id", "modelValue", "type", "placeholder", "aria-invalid", "class", "onKeydown"]),
                      vue.createElementVNode("div", {
                        class: vue.normalizeClass(_ctx.ns.e("errormsg")),
                        style: vue.normalizeStyle({
                          visibility: !!_ctx.editorErrorMessage ? "visible" : "hidden"
                        })
                      }, vue.toDisplayString(_ctx.editorErrorMessage), 7)
                    ], 2), [
                      [vue.vShow, _ctx.showInput]
                    ])
                  ], 10, _hoisted_3$4),
                  vue.createElementVNode("div", {
                    class: vue.normalizeClass(_ctx.ns.e("btns"))
                  }, [
                    _ctx.showCancelButton ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                      key: 0,
                      loading: _ctx.cancelButtonLoading,
                      class: vue.normalizeClass([_ctx.cancelButtonClass]),
                      round: _ctx.roundButton,
                      size: _ctx.btnSize,
                      onClick: _cache[3] || (_cache[3] = ($event) => _ctx.handleAction("cancel")),
                      onKeydown: _cache[4] || (_cache[4] = vue.withKeys(vue.withModifiers(($event) => _ctx.handleAction("cancel"), ["prevent"]), ["enter"]))
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(vue.toDisplayString(_ctx.cancelButtonText || _ctx.t("el.messagebox.cancel")), 1)
                      ]),
                      _: 1
                    }, 8, ["loading", "class", "round", "size"])) : vue.createCommentVNode("v-if", true),
                    vue.withDirectives(vue.createVNode(_component_el_button, {
                      ref: "confirmRef",
                      type: "primary",
                      loading: _ctx.confirmButtonLoading,
                      class: vue.normalizeClass([_ctx.confirmButtonClasses]),
                      round: _ctx.roundButton,
                      disabled: _ctx.confirmButtonDisabled,
                      size: _ctx.btnSize,
                      onClick: _cache[5] || (_cache[5] = ($event) => _ctx.handleAction("confirm")),
                      onKeydown: _cache[6] || (_cache[6] = vue.withKeys(vue.withModifiers(($event) => _ctx.handleAction("confirm"), ["prevent"]), ["enter"]))
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(vue.toDisplayString(_ctx.confirmButtonText || _ctx.t("el.messagebox.confirm")), 1)
                      ]),
                      _: 1
                    }, 8, ["loading", "class", "round", "disabled", "size"]), [
                      [vue.vShow, _ctx.showConfirmButton]
                    ])
                  ], 2)
                ], 6)
              ]),
              _: 3
            }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onReleaseRequested"])
          ], 42, _hoisted_1$7)
        ]),
        _: 3
      }, 8, ["z-index", "overlay-class", "mask"]), [
        [vue.vShow, _ctx.visible]
      ])
    ]),
    _: 3
  });
}
var MessageBoxConstructor = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "index.vue"]]);

const messageInstance = /* @__PURE__ */ new Map();
const getAppendToElement = (props) => {
  let appendTo = document.body;
  if (props.appendTo) {
    if (isString(props.appendTo)) {
      appendTo = document.querySelector(props.appendTo);
    }
    if (isElement(props.appendTo)) {
      appendTo = props.appendTo;
    }
    if (!isElement(appendTo)) {
      debugWarn("ElMessageBox", "the appendTo option is not an HTMLElement. Falling back to document.body.");
      appendTo = document.body;
    }
  }
  return appendTo;
};
const initInstance = (props, container, appContext = null) => {
  const vnode = vue.createVNode(MessageBoxConstructor, props, isFunction$1(props.message) || vue.isVNode(props.message) ? {
    default: isFunction$1(props.message) ? props.message : () => props.message
  } : null);
  vnode.appContext = appContext;
  vue.render(vnode, container);
  getAppendToElement(props).appendChild(container.firstElementChild);
  return vnode.component;
};
const genContainer = () => {
  return document.createElement("div");
};
const showMessage = (options, appContext) => {
  const container = genContainer();
  options.onVanish = () => {
    vue.render(null, container);
    messageInstance.delete(vm);
  };
  options.onAction = (action) => {
    const currentMsg = messageInstance.get(vm);
    let resolve;
    if (options.showInput) {
      resolve = { value: vm.inputValue, action };
    } else {
      resolve = action;
    }
    if (options.callback) {
      options.callback(resolve, instance.proxy);
    } else {
      if (action === "cancel" || action === "close") {
        if (options.distinguishCancelAndClose && action !== "cancel") {
          currentMsg.reject("close");
        } else {
          currentMsg.reject("cancel");
        }
      } else {
        currentMsg.resolve(resolve);
      }
    }
  };
  const instance = initInstance(options, container, appContext);
  const vm = instance.proxy;
  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
      vm[prop] = options[prop];
    }
  }
  vm.visible = true;
  return vm;
};
function MessageBox(options, appContext = null) {
  if (!isClient)
    return Promise.reject();
  let callback;
  if (isString(options) || vue.isVNode(options)) {
    options = {
      message: options
    };
  } else {
    callback = options.callback;
  }
  return new Promise((resolve, reject) => {
    const vm = showMessage(options, appContext != null ? appContext : MessageBox._context);
    messageInstance.set(vm, {
      options,
      callback,
      resolve,
      reject
    });
  });
}
const MESSAGE_BOX_VARIANTS = ["alert", "confirm", "prompt"];
const MESSAGE_BOX_DEFAULT_OPTS = {
  alert: { closeOnPressEscape: false, closeOnClickModal: false },
  confirm: { showCancelButton: true },
  prompt: { showCancelButton: true, showInput: true }
};
MESSAGE_BOX_VARIANTS.forEach((boxType) => {
  MessageBox[boxType] = messageBoxFactory(boxType);
});
function messageBoxFactory(boxType) {
  return (message, title, options, appContext) => {
    let titleOrOpts = "";
    if (isObject$1(title)) {
      options = title;
      titleOrOpts = "";
    } else if (isUndefined(title)) {
      titleOrOpts = "";
    } else {
      titleOrOpts = title;
    }
    return MessageBox(Object.assign({
      title: titleOrOpts,
      message,
      type: "",
      ...MESSAGE_BOX_DEFAULT_OPTS[boxType]
    }, options, {
      boxType
    }), appContext);
  };
}
MessageBox.close = () => {
  messageInstance.forEach((_, vm) => {
    vm.doClose();
  });
  messageInstance.clear();
};
MessageBox._context = null;

const _MessageBox = MessageBox;
_MessageBox.install = (app) => {
  _MessageBox._context = app._context;
  app.config.globalProperties.$msgbox = _MessageBox;
  app.config.globalProperties.$messageBox = _MessageBox;
  app.config.globalProperties.$alert = _MessageBox.alert;
  app.config.globalProperties.$confirm = _MessageBox.confirm;
  app.config.globalProperties.$prompt = _MessageBox.prompt;
};
const ElMessageBox = _MessageBox;

const useAdvSearchbarDailog = (props, emits, state, saveAsDialogRef) => {
  const getColumn = (columnId) => {
    return props.columnList.find((item) => item.id == columnId);
  };
  const getScene = (sceneId) => {
    return state.sceneList.find((item) => item.id == sceneId);
  };
  const openDialog = (currentSceneId) => {
    state.dialogVisible = true;
    state.currentSceneId = currentSceneId;
    state.sceneList = cloneDeep(props.sceneList);
    onSceneClick(state.currentSceneId);
    updateDefaultSceneId();
    updateExposeAllState();
  };
  const updateDefaultSceneId = () => {
    state.defaultSceneValue = false;
    state.sceneList.forEach((item) => {
      if (item.isDefault && item.id == state.currentSceneId) {
        state.defaultSceneValue = true;
      }
    });
  };
  const updateExposeAllState = () => {
    onExposeClick();
  };
  const sceneInEditingMode = (scene) => {
    return state.sceneEditing && scene.id == state.currentSceneId;
  };
  const onSceneEditClick = () => {
    state.sceneEditing = true;
  };
  const sceneShowShouldButton = (scene) => {
    return !state.sceneEditing && scene.id == state.currentSceneId;
  };
  const onSceneSaveNameClick = (scene) => {
    state.sceneEditing = false;
    emits("scene-update-name", scene);
  };
  const onSceneDeleteClick = (scene, index) => {
    ElMessageBox.confirm("\u662F\u5426\u786E\u8BA4\u5220\u9664\u8BE5\u65B9\u6848?", "\u63D0\u793A", {
      confirmButtonText: "\u786E\u5B9A",
      cancelButtonText: "\u53D6\u6D88",
      type: "warning",
      appendTo: ".bt-advsearchbar-ex-dialog"
    }).then(() => {
      onSceneClick(state.sceneList[0].id);
      state.sceneList.splice(index, 1);
      emits("scene-delete", scene);
    });
  };
  const shouldShowItem = (item) => {
    return item.columnConfig && (item.searchCondition == "isNull" || item.searchCondition == "isNotNull");
  };
  const shouldShowProp = (column) => {
    let searchVisible = false;
    state.searchList.forEach((item) => {
      if (item.id == column.id) {
        searchVisible = true;
      }
    });
    return searchVisible;
  };
  const isColumnSupportCondition = (seachItem, condition) => {
    return seachItem.columnConfig?.searchProps?.supportConditionList.indexOf(condition) != -1;
  };
  const validate = (callback) => {
    const index = state.searchList.findIndex((item) => {
      return !item.id;
    });
    if (index != -1) {
      ElMessage({
        type: "error",
        message: "\u7B5B\u9009\u6761\u4EF6\u4E0D\u80FD\u4E3A\u7A7A"
      });
      return;
    }
    callback && callback();
  };
  const onSceneClick = (sceneId) => {
    state.currentSceneId = sceneId;
    const scene = getScene(state.currentSceneId);
    state.searchList = cloneDeep(scene.searchList);
    updateDefaultSceneId();
    updateExposeAllState();
  };
  const onSearchItemPropChange = (item) => {
    item.columnConfig = getColumn(item.id);
    item.searchValue = [];
    item.searchCondition = item.columnConfig.searchProps.searchCondition || getDefaultSearchCondition(item.columnConfig.searchProps.componentType);
  };
  const onItemConditionChange = (item) => {
    item.searchValue = [];
  };
  const onExposeClick = () => {
    const index = state.searchList.findIndex((item) => {
      return !item.searchVisible;
    });
    state.exposeAll = index == -1;
  };
  const onDeleteSearchItem = (_item, index) => {
    state.searchList.splice(index, 1);
  };
  const onAddSearchItem = () => {
    state.searchList.push({ searchVisible: true });
  };
  const onSetDefaultSceneClick = () => {
    state.defaultSceneValue = true;
    state.sceneList.forEach((item) => {
      item.isDefault = item.id == state.currentSceneId;
    });
    updateDefaultSceneId();
    emits("scene-update-default", state.currentSceneId);
  };
  const onExposeAllClick = () => {
    state.searchList.forEach((item) => {
      item.searchVisible = state.exposeAll;
    });
  };
  const onSearchClick = () => {
    validate(() => {
      state.dialogVisible = false;
      const scene = getScene(state.currentSceneId);
      scene.searchList = cloneDeep(state.searchList);
      emits("scene-search", scene);
    });
  };
  const onSaveSceneClick = () => {
    validate(() => {
      const scene = getScene(state.currentSceneId);
      scene.searchList = cloneDeep(state.searchList);
      emits("scene-update", scene);
    });
  };
  const onSaveAsSceneClick = () => {
    saveAsDialogRef.value.openDialog((name) => {
      const scene = cloneDeep(getScene(state.currentSceneId));
      scene.name = name;
      scene.isDefault = false;
      scene.id = `scene${Math.round(Math.random() * 1e8).toString()}`;
      scene.searchList = cloneDeep(state.searchList);
      state.sceneList.push(scene);
      onSceneClick(scene.id);
      emits("scene-save", scene);
    });
  };
  return {
    openDialog,
    sceneInEditingMode,
    onSceneEditClick,
    sceneShowShouldButton,
    onSceneSaveNameClick,
    onSceneDeleteClick,
    shouldShowItem,
    shouldShowProp,
    isColumnSupportCondition,
    validate,
    onSceneClick,
    onSearchItemPropChange,
    onItemConditionChange,
    onExposeClick,
    onDeleteSearchItem,
    onAddSearchItem,
    onSetDefaultSceneClick,
    onExposeAllClick,
    onSearchClick,
    onSaveSceneClick,
    onSaveAsSceneClick
  };
};
const getDefaultSearchCondition = (componentType) => {
  if (componentType) {
    switch (componentType) {
      case "text":
        return "like";
      case "number":
        return "eq";
      case "date":
        return "gele";
      case "month":
        return "gele";
      case "datetime":
        return "gele";
      case "time":
        return "gele";
      case "select":
        return "in";
      case "tree":
        return "in";
      default:
        return "";
    }
  }
};

const _hoisted_1$6 = { class: "btp-adv-searchbar-dialog--content" };
const _hoisted_2$6 = { class: "btp-adv-searchbar-dialog--sence" };
const _hoisted_3$3 = ["onClick"];
const _hoisted_4$3 = { class: "btp-adv-searchbar-dialog--scene--item__label" };
const _hoisted_5$3 = { key: 0 };
const _hoisted_6$2 = { class: "btp-adv-searchbar-dialog--container" };
const _hoisted_7$2 = { class: "btp-adv-searchbar-dialog--toolbar" };
const _hoisted_8$1 = /* @__PURE__ */ vue.createElementVNode("span", null, "\u6DFB\u52A0\u7B5B\u9009\u6761\u4EF6", -1);
const _hoisted_9$1 = { class: "btp-adv-searchbar-dialog--toolbar" };
const _hoisted_10$1 = { class: "btp-adv-searchbar-dialog--toolbar" };
var script$8 = /* @__PURE__ */ vue.defineComponent({
  __name: "adv-searchbar-dialog",
  props: {
    sceneList: { type: null, required: false, default: {} },
    columnList: { type: null, required: false, default: [] }
  },
  emits: [
    "scene-search",
    "scene-save",
    "scene-delete",
    "scene-update",
    "scene-update-name",
    "scene-update-default"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const saveAsDialogRef = vue.ref();
    const state = vue.reactive({
      dialogVisible: false,
      sceneEditing: false,
      currentSceneId: "",
      sceneList: [],
      searchList: [],
      exposeAll: false,
      defaultSceneValue: false
    });
    const {
      openDialog,
      sceneInEditingMode,
      onSceneEditClick,
      sceneShowShouldButton,
      onSceneSaveNameClick,
      onSceneDeleteClick,
      shouldShowItem,
      shouldShowProp,
      isColumnSupportCondition,
      onSceneClick,
      onSearchItemPropChange,
      onItemConditionChange,
      onExposeClick,
      onDeleteSearchItem,
      onAddSearchItem,
      onSetDefaultSceneClick,
      onExposeAllClick,
      onSearchClick,
      onSaveSceneClick,
      onSaveAsSceneClick
    } = useAdvSearchbarDailog(props, emits, state, saveAsDialogRef);
    __expose({
      openDialog
    });
    return (_ctx, _cache) => {
      const _component_el_input = vue.resolveComponent("el-input");
      const _component_EditPen = vue.resolveComponent("EditPen");
      const _component_el_icon = vue.resolveComponent("el-icon");
      const _component_Delete = vue.resolveComponent("Delete");
      const _component_el_space = vue.resolveComponent("el-space");
      const _component_el_option = vue.resolveComponent("el-option");
      const _component_el_select = vue.resolveComponent("el-select");
      const _component_CircleClose = vue.resolveComponent("CircleClose");
      const _component_el_button = vue.resolveComponent("el-button");
      const _component_el_checkbox = vue.resolveComponent("el-checkbox");
      const _component_Plus = vue.resolveComponent("Plus");
      const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
      const _component_el_dialog = vue.resolveComponent("el-dialog");
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        vue.createVNode(_component_el_dialog, {
          modelValue: state.dialogVisible,
          "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => state.dialogVisible = $event),
          class: "btp-adv-searchbar-dialog",
          title: "\u9AD8\u7EA7\u67E5\u8BE2",
          "append-to-body": true,
          "close-on-click-modal": false,
          draggable: ""
        }, {
          footer: vue.withCtx(() => [
            vue.createVNode(_component_el_button, {
              type: "info",
              onClick: _cache[2] || (_cache[2] = ($event) => state.dialogVisible = false)
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("\u53D6 \u6D88")
              ]),
              _: 1
            }),
            vue.createVNode(_component_el_button, {
              type: "primary",
              plain: "",
              onClick: vue.unref(onSaveSceneClick)
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("\u4FDD\u5B58\u65B9\u6848")
              ]),
              _: 1
            }, 8, ["onClick"]),
            vue.createVNode(_component_el_button, {
              type: "primary",
              plain: "",
              onClick: vue.unref(onSaveAsSceneClick)
            }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("\u53E6\u5B58\u65B9\u6848")
              ]),
              _: 1
            }, 8, ["onClick"]),
            vue.createVNode(_component_el_button, { onClick: vue.unref(onSearchClick) }, {
              default: vue.withCtx(() => [
                vue.createTextVNode("\u67E5 \u8BE2")
              ]),
              _: 1
            }, 8, ["onClick"])
          ]),
          default: vue.withCtx(() => [
            vue.createElementVNode("div", _hoisted_1$6, [
              vue.createCommentVNode(" \u5DE6\u4FA7\u65B9\u6848\u5217\u8868 "),
              vue.createElementVNode("div", _hoisted_2$6, [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(state.sceneList, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("div", {
                    key: item.id,
                    class: vue.normalizeClass(["btp-adv-searchbar-dialog--scene--item", item.id == state.currentSceneId ? "active" : ""]),
                    onClick: ($event) => vue.unref(onSceneClick)(item.id)
                  }, [
                    vue.createElementVNode("div", _hoisted_4$3, [
                      !vue.unref(sceneInEditingMode)(item) ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_5$3, vue.toDisplayString(item.name), 1)) : (vue.openBlock(), vue.createBlock(_component_el_input, {
                        key: 1,
                        modelValue: item.name,
                        "onUpdate:modelValue": ($event) => item.name = $event,
                        onBlur: ($event) => vue.unref(onSceneSaveNameClick)(item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onBlur"]))
                    ]),
                    vue.unref(sceneShowShouldButton)(item) ? (vue.openBlock(), vue.createBlock(_component_el_space, { key: 0 }, {
                      default: vue.withCtx(() => [
                        vue.createVNode(_component_el_icon, {
                          onClick: vue.withModifiers(($event) => vue.unref(onSceneEditClick)(item), ["stop"])
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_EditPen)
                          ]),
                          _: 2
                        }, 1032, ["onClick"]),
                        !item.isDefault ? (vue.openBlock(), vue.createBlock(_component_el_icon, {
                          key: 0,
                          onClick: vue.withModifiers(($event) => vue.unref(onSceneDeleteClick)(item, index), ["stop"])
                        }, {
                          default: vue.withCtx(() => [
                            vue.createVNode(_component_Delete)
                          ]),
                          _: 2
                        }, 1032, ["onClick"])) : vue.createCommentVNode("v-if", true)
                      ]),
                      _: 2
                    }, 1024)) : vue.createCommentVNode("v-if", true)
                  ], 10, _hoisted_3$3);
                }), 128))
              ]),
              vue.createElementVNode("div", _hoisted_6$2, [
                vue.createVNode(_component_el_scrollbar, null, {
                  default: vue.withCtx(() => [
                    (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(state.searchList, (item, index) => {
                      return vue.openBlock(), vue.createBlock(_component_el_space, {
                        key: item.id,
                        class: "btp-adv-searchbar-dialog--container--item"
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_select, {
                            modelValue: item.id,
                            "onUpdate:modelValue": ($event) => item.id = $event,
                            class: "btp-adv-searchbar-dialog--container--item__label",
                            placeholder: "\u8BF7\u9009\u62E9",
                            filterable: "",
                            onChange: ($event) => vue.unref(onSearchItemPropChange)(item)
                          }, {
                            default: vue.withCtx(() => [
                              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(props.columnList, (opt) => {
                                return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                                  key: opt.id
                                }, [
                                  opt.searchProps.enable ? (vue.openBlock(), vue.createBlock(_component_el_option, {
                                    key: 0,
                                    label: opt.label,
                                    value: opt.id,
                                    disabled: vue.unref(shouldShowProp)(opt)
                                  }, null, 8, ["label", "value", "disabled"])) : vue.createCommentVNode("v-if", true)
                                ], 64);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"]),
                          vue.createVNode(_component_el_select, {
                            modelValue: item.searchCondition,
                            "onUpdate:modelValue": ($event) => item.searchCondition = $event,
                            class: "btp-adv-searchbar-dialog--container--item__condition",
                            placeholder: "\u8BF7\u9009\u62E9",
                            onChange: ($event) => vue.unref(onItemConditionChange)(item)
                          }, {
                            default: vue.withCtx(() => [
                              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(expressConfigList), (condition, key) => {
                                return vue.openBlock(), vue.createElementBlock(vue.Fragment, { key }, [
                                  vue.unref(isColumnSupportCondition)(item, key) ? (vue.openBlock(), vue.createBlock(_component_el_option, {
                                    key: 0,
                                    label: condition.value + condition.name,
                                    value: key
                                  }, null, 8, ["label", "value"])) : vue.createCommentVNode("v-if", true)
                                ], 64);
                              }), 128))
                            ]),
                            _: 2
                          }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"]),
                          !vue.unref(shouldShowItem)(item) ? (vue.openBlock(), vue.createBlock(script$a, {
                            key: 0,
                            modelValue: item.searchValue,
                            "onUpdate:modelValue": ($event) => item.searchValue = $event,
                            props: item,
                            "expose-mode": false
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "props"])) : vue.createCommentVNode("v-if", true),
                          vue.createVNode(_component_el_space, null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_button, {
                                link: "",
                                onClick: ($event) => vue.unref(onDeleteSearchItem)(item, index)
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createVNode(_component_el_icon, null, {
                                    default: vue.withCtx(() => [
                                      vue.createVNode(_component_CircleClose)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
                              vue.createVNode(_component_el_checkbox, {
                                modelValue: item.searchVisible,
                                "onUpdate:modelValue": ($event) => item.searchVisible = $event,
                                label: "\u5916\u9732",
                                onChange: vue.unref(onExposeClick)
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128)),
                    vue.createElementVNode("div", _hoisted_7$2, [
                      vue.createVNode(_component_el_button, {
                        type: "info",
                        link: true,
                        onClick: vue.unref(onAddSearchItem)
                      }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_icon, null, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_Plus)
                            ]),
                            _: 1
                          }),
                          _hoisted_8$1
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    vue.createElementVNode("div", _hoisted_9$1, [
                      vue.createVNode(_component_el_checkbox, {
                        label: "\u8BBE\u7F6E\u4E3A\u9ED8\u8BA4",
                        modelValue: state.defaultSceneValue,
                        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.defaultSceneValue = $event),
                        onChange: vue.unref(onSetDefaultSceneClick)
                      }, null, 8, ["modelValue", "onChange"])
                    ]),
                    vue.createElementVNode("div", _hoisted_10$1, [
                      vue.createVNode(_component_el_checkbox, {
                        modelValue: state.exposeAll,
                        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => state.exposeAll = $event),
                        label: "\u5168\u90E8\u5916\u9732",
                        onChange: vue.unref(onExposeAllClick)
                      }, null, 8, ["modelValue", "onChange"])
                    ])
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          _: 1
        }, 8, ["modelValue"]),
        vue.createVNode(script$9, {
          ref_key: "saveAsDialogRef",
          ref: saveAsDialogRef
        }, null, 512)
      ], 64);
    };
  }
});

script$8.__file = "packages/components/tables/adv-searchbar/src/adv-searchbar-dialog.vue";

const useAdvSearchbar = (props, emits, state) => {
  const getColumn = (columnId) => {
    return props.columnList.find((item) => item.id == columnId);
  };
  const getCacheManager = () => {
    return BTPUtils__default["default"].getCacheManager();
  };
  const saveScene = () => {
    getCacheManager().saveScene(props.scene.id, state.cachedSceneData).then((res) => {
      console.log("\u4FDD\u5B58\u4E3B\u9898\u4FE1\u606F\u5B8C\u6210", res);
    });
  };
  const getAdvQueryParam = () => {
    const advQueryParam = [];
    const scene = state.sceneList.find((item) => {
      return item.id == state.currentSceneId;
    });
    if (scene) {
      scene.searchList.forEach((item) => {
        if (item.searchCondition == "isNull" || item.searchCondition == "isNotNull") {
          advQueryParam.push({
            value: item.searchValue,
            express: item.searchCondition,
            field: item.columnConfig.searchProps.searchPropKey || item.columnConfig.prop
          });
        } else {
          if (item.searchValue && Array.isArray(item.searchValue) && item.searchValue.length > 0) {
            advQueryParam.push({
              value: item.searchValue,
              express: item.searchCondition,
              field: item.columnConfig.searchProps.searchPropKey || item.columnConfig.prop
            });
          }
        }
      });
    }
    return advQueryParam;
  };
  const initAdvSearchbar = async () => {
    let sceneList = props.scene.sceneList;
    state.currentSceneId = props.scene.defaultId;
    const scene = await getCacheManager().getScene(props.scene.id);
    if (scene) {
      state.currentSceneId = scene.defaultId;
      sceneList = scene.sceneList;
    }
    state.cachedSceneData = scene;
    state.sceneList = cloneDeep(sceneList);
    state.sceneList.forEach((data) => {
      data.searchList.forEach((item) => {
        item.columnConfig = getColumn(item.id);
      });
    });
    onSceneChange();
    if (props.initLoading) {
      emits("search", getAdvQueryParam());
    }
  };
  const sceneUpdateName = (scene) => {
    state.cachedSceneData.sceneList.forEach((item) => {
      if (item.id == scene.id) {
        item.name = scene.name;
      }
    });
    state.sceneList.forEach((item) => {
      if (item.id == scene.id) {
        item.name = scene.name;
      }
    });
    saveScene();
  };
  const sceneUpdateDefault = (defaultId) => {
    state.cachedSceneData.defaultId = defaultId;
    state.cachedSceneData.sceneList.forEach((item) => {
      item.isDefault = item.id == defaultId;
    });
    state.sceneList.forEach((item) => {
      item.isDefault = item.id == defaultId;
    });
    saveScene();
  };
  const sceneDelete = (scene) => {
    const index = state.cachedSceneData.sceneList.findIndex((item) => {
      return item.id == scene.id;
    });
    state.cachedSceneData.sceneList.splice(index, 1);
    const index2 = state.sceneList.findIndex((item) => {
      return item.id == scene.id;
    });
    state.sceneList.splice(index2, 1);
  };
  const sceneSearch = (scene) => {
    state.currentSceneId = scene.id;
    const sceneData = state.sceneList.find((item) => item.id == scene.id);
    sceneData.searchList = cloneDeep(scene.searchList);
    onSceneChange();
  };
  const onSceneChange = () => {
    state.exposeSearchList = [];
    const scene = state.sceneList.find((item) => {
      return item.id == state.currentSceneId;
    });
    if (scene) {
      scene.searchList.forEach((item) => {
        if (item.searchVisible) {
          state.exposeSearchList.push(item);
        }
      });
    }
  };
  const sceneSave = (scene) => {
    state.sceneList.push(cloneDeep(scene));
    state.cachedSceneData.sceneList.push(cloneDeep(scene));
    saveScene();
  };
  const sceneUpdate = (scene) => {
    const sceneData = state.sceneList.find((item) => item.id == scene.id);
    sceneData.searchList = cloneDeep(scene.searchList);
    const sceneData2 = state.cachedSceneData.sceneList.find((item) => item.id == scene.id);
    sceneData2.searchList = cloneDeep(scene.searchList);
    saveScene();
  };
  return {
    initAdvSearchbar,
    onSceneChange,
    sceneUpdateName,
    sceneUpdateDefault,
    sceneDelete,
    sceneSearch,
    sceneSave,
    sceneUpdate
  };
};

var script$7 = /* @__PURE__ */ vue.defineComponent({
  __name: "index",
  props: {
    scene: { type: null, required: true, default: {} },
    columnList: { type: null, required: false, default: [] },
    initLoading: { type: Boolean, required: false, default: true },
    enableAdvSearch: { type: Boolean, required: false, default: true }
  },
  emits: ["search", "reset"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const advSearchDialogRef = vue.ref();
    const state = vue.reactive({
      searchText: "",
      sceneList: [],
      currentSceneId: "",
      isExposePanelExpanded: false,
      exposeSearchList: [],
      cachedSceneData: {}
    });
    const {
      initAdvSearchbar,
      onSceneChange,
      sceneUpdateName,
      sceneUpdateDefault,
      sceneDelete,
      sceneSearch,
      sceneSave,
      sceneUpdate
    } = useAdvSearchbar(props, emits, state);
    initAdvSearchbar();
    const onSearchClick = () => {
      if (state.isExposePanelExpanded) {
        state.isExposePanelExpanded = !state.isExposePanelExpanded;
      }
    };
    const onReset = () => {
      state.exposeSearchList.forEach((column) => {
        column.searchValue = [];
      });
      state.isExposePanelExpanded = false;
      emits("reset", {});
    };
    const onExpandClick = () => {
      state.isExposePanelExpanded = !state.isExposePanelExpanded;
    };
    const onAdvSearchDialogClick = () => {
      advSearchDialogRef.value.openDialog(state.currentSceneId);
    };
    return (_ctx, _cache) => {
      const _component_CaretTop = vue.resolveComponent("CaretTop");
      const _component_CaretBottom = vue.resolveComponent("CaretBottom");
      const _component_el_icon = vue.resolveComponent("el-icon");
      const _component_el_button = vue.resolveComponent("el-button");
      const _component_el_option = vue.resolveComponent("el-option");
      const _component_el_select = vue.resolveComponent("el-select");
      const _component_el_space = vue.resolveComponent("el-space");
      const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
      return vue.openBlock(), vue.createElementBlock("div", {
        class: vue.normalizeClass(["btp-adv-searchbar", { "expand--all": state.isExposePanelExpanded }])
      }, [
        vue.createElementVNode("div", null, [
          vue.createVNode(_component_el_scrollbar, null, {
            default: vue.withCtx(() => [
              vue.createVNode(_component_el_space, { class: "btp-adv-searchbar-toolbar" }, {
                default: vue.withCtx(() => [
                  vue.createVNode(_component_el_button, {
                    type: "info",
                    link: "",
                    onClick: onExpandClick
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode(vue.toDisplayString(state.isExposePanelExpanded ? "\u6298\u53E0" : "\u5C55\u5F00") + " ", 1),
                      vue.createVNode(_component_el_icon, { class: "el-icon--right" }, {
                        default: vue.withCtx(() => [
                          state.isExposePanelExpanded ? (vue.openBlock(), vue.createBlock(_component_CaretTop, { key: 0 })) : (vue.openBlock(), vue.createBlock(_component_CaretBottom, { key: 1 }))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_button, {
                    type: "primary",
                    onClick: _cache[0] || (_cache[0] = ($event) => onSearchClick())
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("\u67E5 \u8BE2")
                    ]),
                    _: 1
                  }),
                  vue.createVNode(_component_el_button, {
                    plain: "",
                    onClick: onReset
                  }, {
                    default: vue.withCtx(() => [
                      vue.createTextVNode("\u91CD \u7F6E")
                    ]),
                    _: 1
                  }),
                  props.enableAdvSearch ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                    vue.createVNode(_component_el_button, {
                      type: "primary",
                      plain: "",
                      onClick: onAdvSearchDialogClick
                    }, {
                      default: vue.withCtx(() => [
                        vue.createTextVNode(" \u9AD8\u7EA7\u67E5\u8BE2 ")
                      ]),
                      _: 1
                    }),
                    vue.createVNode(_component_el_select, {
                      modelValue: state.currentSceneId,
                      "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => state.currentSceneId = $event),
                      onChange: vue.unref(onSceneChange)
                    }, {
                      default: vue.withCtx(() => [
                        (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(state.sceneList, (item) => {
                          return vue.openBlock(), vue.createBlock(_component_el_option, {
                            key: `${item.id}Select`,
                            label: item.name,
                            value: item.id
                          }, null, 8, ["label", "value"]);
                        }), 128))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onChange"])
                  ], 64)) : vue.createCommentVNode("v-if", true)
                ]),
                _: 1
              }),
              vue.createCommentVNode("\u524D\u7F6E\u63D2\u69FD"),
              vue.renderSlot(_ctx.$slots, "default"),
              vue.createCommentVNode("\u5916\u9732\u641C\u7D22\u9879"),
              (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(state.exposeSearchList, (item) => {
                return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                  key: item.id
                }, [
                  item.searchVisible ? (vue.openBlock(), vue.createBlock(script$a, {
                    key: 0,
                    props: item,
                    modelValue: item.searchValue,
                    "onUpdate:modelValue": ($event) => item.searchValue = $event,
                    class: "expose-item",
                    onSearch: _cache[2] || (_cache[2] = ($event) => onSearchClick())
                  }, null, 8, ["props", "modelValue", "onUpdate:modelValue"])) : vue.createCommentVNode("v-if", true)
                ], 64);
              }), 128))
            ]),
            _: 3
          })
        ]),
        vue.createVNode(script$8, {
          ref_key: "advSearchDialogRef",
          ref: advSearchDialogRef,
          "scene-list": state.sceneList,
          "column-list": props.columnList,
          onSceneUpdateDefault: vue.unref(sceneUpdateDefault),
          onSceneUpdateName: vue.unref(sceneUpdateName),
          onSceneDelete: vue.unref(sceneDelete),
          onSceneSearch: vue.unref(sceneSearch),
          onSceneSave: vue.unref(sceneSave),
          onSceneUpdate: vue.unref(sceneUpdate)
        }, null, 8, ["scene-list", "column-list", "onSceneUpdateDefault", "onSceneUpdateName", "onSceneDelete", "onSceneSearch", "onSceneSave", "onSceneUpdate"])
      ], 2);
    };
  }
});

script$7.__file = "packages/components/tables/adv-searchbar/src/index.vue";

const BtpAdvSearchbar = withInstall$1(script$7);

const PropsType = {
  data: {
    type: Object,
    require: true,
    default: {}
  }
};

const _hoisted_1$5 = { class: "btp-dict-status" };
const _hoisted_2$5 = { class: "text" };
const __default__$1 = {
  name: "BtDictStatus"
};
var script$6 = /* @__PURE__ */ vue.defineComponent({
  ...__default__$1,
  props: PropsType,
  setup(__props) {
    const props = __props;
    const colorData = vue.computed(() => {
      return props.data;
    });
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$5, [
        colorData.value?.color ? (vue.openBlock(), vue.createElementBlock("span", {
          key: 0,
          class: "mark",
          style: vue.normalizeStyle(`background-color:${colorData.value.color}`)
        }, null, 4)) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode("span", _hoisted_2$5, vue.toDisplayString(colorData.value?.name || "-"), 1)
      ]);
    };
  }
});

script$6.__file = "packages/components/dict-status/src/dict-status.vue";

var script$5 = /* @__PURE__ */ vue.defineComponent({
  __name: "col-content",
  props: {
    item: { type: null, required: true },
    scope: { type: null, required: true },
    tableSrc: { type: null, required: true }
  },
  setup(__props) {
    const props = __props;
    const cacheManager = app.BTPApplication.getInstance().getCacheManager();
    const defaultFormat = (callValue) => {
      if (is.isArray(callValue)) {
        return callValue.length ? callValue.join(" / ") : "-";
      } else if (callValue === "" || callValue == null || callValue == void 0) {
        return "-";
      } else {
        return callValue;
      }
    };
    const dynamicFormatter = (item, row, value) => {
      if (row.$index == -1) {
        return null;
      }
      if (item.formatter) {
        return item.formatter(item, row, value);
      } else {
        return value;
      }
    };
    const dataSourceShowe = (row, item, state) => {
      if (row[`${item.prop}showflag`] || row[`${item.prop}show`])
        return;
      if (Object.getOwnPropertyNames(row).length == 0)
        return;
      const dataProps = item.searchProps.dataSourceProps;
      try {
        if (state[`${item.prop}SrcList`]) {
          const showItem = state[`${item.prop}SrcList`]?.find((el) => {
            return el[dataProps.value] === row[item.prop];
          });
          if (showItem[dataProps.value]) {
            row[`${item.prop}show`] = showItem[dataProps.label];
          }
          row[`${item.prop}showflag`] = true;
        }
      } catch (e) {
      }
    };
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
        vue.createCommentVNode(" \u6587\u5B57\uFF08\u81EA\u5E26\u683C\u5F0F\u5316\uFF09 "),
        _ctx.item?.dictId ? (vue.openBlock(), vue.createBlock(script$6, {
          key: 0,
          data: vue.unref(cacheManager).getDictItem(_ctx.item.dictId, _ctx.scope.rowData[_ctx.item.prop])
        }, null, 8, ["data"])) : _ctx.item?.searchProps?.dataSourceProps ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
          vue.createTextVNode(vue.toDisplayString(dataSourceShowe(_ctx.scope.rowData, _ctx.item, props.tableSrc)) + " " + vue.toDisplayString(_ctx.scope.rowData[`${_ctx.item.prop}show`] ? _ctx.scope.rowData[`${_ctx.item.prop}show`] : _ctx.scope.rowData[`${_ctx.item.prop}`]), 1)
        ], 64)) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 2 }, [
          vue.createTextVNode(vue.toDisplayString(_ctx.item.formatter ? dynamicFormatter(_ctx.item, _ctx.scope, _ctx.scope.rowData[_ctx.item.prop]) : defaultFormat(_ctx.scope.rowData[_ctx.item.prop])), 1)
        ], 64))
      ], 2112);
    };
  }
});

script$5.__file = "packages/components/tables/table-v2/src/col-content.vue";

const useInit = (elTableRef, props, emits) => {
  props.columns.forEach((item) => {
    item.key = item.prop;
    if (item.width && typeof item.width === "string") {
      item.width = Number(item.width.replace("px", ""));
    } else {
      item.width = 200;
    }
  });
  const state = vue.reactive({
    columns: [],
    selection: [],
    data: props.data || [],
    pagination: { pageNumber: 1, pageSize: 20, total: 0 },
    singleSelectionData: null,
    multiSelectionData: {},
    multiSelectionCheckAll: false,
    multiSelectionCheckIndeterminate: false,
    advQueryParam: [],
    sortParamList: [],
    loading: false
  });
  const onAdvSearchbarSearch = (advQueryParam) => {
    new Promise((resolve) => {
      resolve({});
      state.pagination.pageNumber = 1;
      state.advQueryParam = advQueryParam;
      emits("search");
    }).then(() => {
      loadData();
    });
  };
  const onAdvSearchbarReset = () => {
    new Promise((resolve) => {
      resolve({});
      Object.keys(props.initParam).forEach((key) => {
        props.initParam[key] = void 0;
      });
      state.pagination.pageNumber = 1;
      state.advQueryParam = [];
      emits("reset");
      state.singleSelectionData = null;
      state.multiSelectionCheckAll = false;
      state.multiSelectionCheckIndeterminate = false;
      state.selection = [];
      Object.keys(state.multiSelectionData).forEach((key) => {
        state.multiSelectionData[key] = false;
      });
    }).then(() => {
      loadData();
    });
  };
  const loadData = () => {
    state.multiSelectionCheckAll = false;
    state.multiSelectionCheckIndeterminate = false;
    state.loading = true;
    if (props.data) {
      loadStaticData();
      state.loading = false;
      return;
    }
    if (!props.requestApi) {
      state.loading = false;
      return;
    }
    let params = JSON.parse(JSON.stringify(props.initParam || {}));
    if (props.paginationProps?.enable) {
      params = Object.assign(params, {
        pageNumber: state.pagination.pageNumber,
        pageSize: state.pagination.pageSize
      });
    }
    if (state.advQueryParam) {
      params.advQueryParam = state.advQueryParam;
    }
    if (state.sortParamList) {
      params.sortParamList = state.sortParamList;
    }
    if (props.beforeQuery) {
      if (props.beforeQuery(params)) {
        console.log("\u7528\u6237\u4EE3\u7801\u76D1\u542C\u4E86beforeQuery\u65B9\u6CD5\u5E76\u4E14\u8FD4\u56DEtrue\u8868\u660E\u8981\u53D6\u6D88\u6B64\u6B21\u52A0\u8F7D\u8BF7\u6C42");
        return;
      }
    }
    props.requestApi(params).then((res) => {
      if (props.afterQuery) {
        if (props.afterQuery(res)) {
          console.log(
            "\u7528\u6237\u4EE3\u7801\u76D1\u542C\u4E86afterQuery\u65B9\u6CD5\u5E76\u4E14\u8FD4\u56DEtrue\u8868\u660E\u8981\u53D6\u6D88\u6B64\u6B21\u6570\u636E\u56DE\u5199"
          );
          return;
        }
      }
      if (props.paginationProps?.enable) {
        state.data = res.data.records;
        state.pagination.total = res.data.total;
      } else {
        state.data = res.data;
      }
      state.loading = false;
      emits("dataChange", state.pagination, state.data);
    }).catch(() => {
      state.loading = false;
      state.data = [];
      state.pagination.total = 0;
    });
  };
  const loadStaticData = () => {
    let params = JSON.parse(JSON.stringify(props.initParam || {}));
    if (props.paginationProps?.enable) {
      params = Object.assign(params, {
        pageNumber: state.pagination.pageNumber,
        pageSize: state.pagination.pageSize
      });
    }
    if (state.advQueryParam) {
      params.advQueryParam = state.advQueryParam;
    }
    if (state.sortParamList) {
      params.sortParamList = state.sortParamList;
    }
    if (props.beforeQuery) {
      if (props.beforeQuery(params)) {
        console.log("\u7528\u6237\u4EE3\u7801\u76D1\u542C\u4E86beforeQuery\u65B9\u6CD5\u5E76\u4E14\u8FD4\u56DEtrue\u8868\u660E\u8981\u53D6\u6D88\u6B64\u6B21\u52A0\u8F7D\u8BF7\u6C42");
        return;
      }
    }
    if (props.paginationProps?.enable) {
      const dataList = [];
      for (let i = (params.pageNumber - 1) * params.pageSize; i < params.pageNumber * params.pageSize; i++) {
        if (props.data.length > i) {
          dataList.push(props.data[i]);
        }
      }
      if (props.afterQuery) {
        if (props.afterQuery(dataList)) {
          console.log("\u7528\u6237\u4EE3\u7801\u76D1\u542C\u4E86afterQuery\u65B9\u6CD5\u5E76\u4E14\u8FD4\u56DEtrue\u8868\u660E\u8981\u53D6\u6D88\u6B64\u6B21\u6570\u636E\u56DE\u5199");
          return;
        }
      }
      state.data = dataList;
      state.pagination.total = props.data.length;
    } else {
      if (props.afterQuery) {
        if (props.afterQuery(props.data)) {
          console.log("\u7528\u6237\u4EE3\u7801\u76D1\u542C\u4E86afterQuery\u65B9\u6CD5\u5E76\u4E14\u8FD4\u56DEtrue\u8868\u660E\u8981\u53D6\u6D88\u6B64\u6B21\u6570\u636E\u56DE\u5199");
          return;
        }
      }
      state.data = props.data;
      state.pagination.total = props.data.length;
    }
    emits("dataChange", state.pagination, state.data);
  };
  const getTableData = () => {
    return state.pagination.reserve ? state.selection : state.data;
  };
  const onTableSortChange = (sort) => {
    if (props.tableSortChange) {
      if (props.tableSortChange(sort)) {
        console.log("\u7528\u6237\u4EE3\u7801\u76D1\u542C\u4E86tableSortChange\u65B9\u6CD5\u5E76\u4E14\u8FD4\u56DEtrue\u8868\u660E\u8981\u53D6\u6D88\u6B64\u6B21\u6570\u636E\u56DE\u5199");
        return;
      }
    }
    emits("sort-change", sort);
  };
  const onRadioSelectionChange = (row) => {
    state.selection = [row];
    emits("selection-change", state.selection);
  };
  const onCheckboxSelectionChange = (row, checked) => {
    if (checked) {
      state.selection.push(row);
    } else {
      state.selection = state.selection.filter((f) => f.id != row.id);
    }
    const newArr = state.data.filter((f) => {
      return state.selection.findIndex((t) => t.id == f.id) != -1;
    });
    state.multiSelectionCheckIndeterminate = !(newArr.length == 0 || newArr.length == state.data.length);
    state.multiSelectionCheckAll = newArr.length == state.data.length;
    emits("selection-change", state.selection);
  };
  const onCheckboxSelectionAllChange = (checked) => {
    state.multiSelectionCheckIndeterminate = false;
    if (checked) {
      const newArr = state.data.filter((f) => {
        return state.selection.findIndex((t) => t.id == f.id) == -1;
      });
      state.selection.push(...newArr);
    } else {
      state.selection = state.selection.filter((f) => {
        return state.data.findIndex((t) => t.id == f.id) == -1;
      });
    }
    Object.keys(state.multiSelectionData).forEach((key) => {
      state.multiSelectionData[key] = false;
    });
    state.selection.forEach((element) => {
      state.multiSelectionData[element.id] = true;
    });
    emits("selection-change", state.selection);
  };
  const getTableDataId = (id = null) => {
    const ids = [];
    if (state.data) {
      state.data.forEach((element) => {
        ids.push(element[id || props.rowKey || "id"]);
      });
    }
    return ids;
  };
  return {
    state,
    loadData,
    getTableData,
    getTableDataId,
    onTableSortChange,
    onAdvSearchbarSearch,
    onAdvSearchbarReset,
    onRadioSelectionChange,
    onCheckboxSelectionChange,
    onCheckboxSelectionAllChange
  };
};
const usePagination = (elTableRef, paginationRef, state, props, emits, loadData) => {
  state.pagination = {
    pageNumber: 1,
    pageSize: 20,
    total: 0,
    reserve: false
  };
  const onPaginationCurrentChange = (newPage) => {
    state.pagination.pageNumber = newPage;
    loadData();
  };
  const onPaginationSizeChange = (newPageSize) => {
    state.pagination.previousPageSize = newPageSize;
    state.pagination.pageNumber = 1;
    loadData();
  };
  const onPaginationReserveChange = (value) => {
    state.pagination.reserve = value;
  };
  const onPaginationClearSelection = () => {
    state.selection = [];
    state.singleSelectionData = null;
    Object.keys(state.multiSelectionData).forEach((key) => {
      state.multiSelectionData[key] = false;
    });
    state.multiSelectionCheckAll = false;
    state.multiSelectionCheckIndeterminate = false;
    emits("selection-change", state.selection);
  };
  const computeRowIndex = (rowIndex) => {
    return state.pagination.reserve ? rowIndex + 1 : rowIndex + 1 + (state.pagination.pageNumber - 1) * state.pagination.pageSize;
  };
  return {
    computeRowIndex,
    onPaginationCurrentChange,
    onPaginationSizeChange,
    onPaginationReserveChange,
    onPaginationClearSelection
  };
};

const _hoisted_1$4 = { class: "bt-table-ex bt-table-v2" };
const _hoisted_2$4 = { class: "bt-table-ex--searchbar" };
const _hoisted_3$2 = { class: "bt-table-ex--toolbar" };
const _hoisted_4$2 = { class: "bt-table-ex--table" };
const _hoisted_5$2 = { class: "bt-table-ex--table--container" };
const _hoisted_6$1 = { key: 1 };
const _hoisted_7$1 = { key: 0 };
const _hoisted_8 = { key: 1 };
const _hoisted_9 = { key: 2 };
const _hoisted_10 = { key: 3 };
const _hoisted_11 = {
  key: 0,
  class: "bt-table-ex--paginatioin"
};
var script$4 = /* @__PURE__ */ vue.defineComponent({
  __name: "table-v2",
  props: {
    rowKey: { type: String, required: false, default: "id" },
    border: { type: Boolean, required: false, default: true },
    tableId: { type: String, required: true, default: "" },
    senceId: { type: String, required: true, default: "" },
    data: { type: null, required: false },
    columns: { type: null, required: false, default: [] },
    enableContinuous: { type: Boolean, required: false, default: true },
    requestApi: { type: Function, required: true },
    beforeQuery: { type: Function, required: false },
    afterQuery: { type: Function, required: false },
    reserveSelection: { type: Boolean, required: false, default: true },
    searchBarProps: { type: null, required: false, default: {
      enable: false
    } },
    paginationProps: { type: null, required: false, default: {
      enable: true,
      background: true
    } },
    initParam: { type: null, required: false, default: {} },
    initLoading: { type: Boolean, required: false, default: true },
    selectable: { type: null, required: false }
  },
  emits: [
    "beforeQuery",
    "afterQuery",
    "selection-change",
    "search",
    "reset",
    "dataChange",
    "column-sort",
    "expanded-rows-change",
    "end-reached",
    "scroll",
    "rows-rendered",
    "row-expand",
    "row-event-handlers"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const tableRef = vue.ref();
    const paginationRef = vue.ref();
    const {
      state,
      loadData,
      getTableData,
      getTableDataId,
      onAdvSearchbarSearch,
      onAdvSearchbarReset,
      onRadioSelectionChange,
      onCheckboxSelectionChange,
      onCheckboxSelectionAllChange
    } = useInit(tableRef, props, emit);
    const {
      computeRowIndex,
      onPaginationCurrentChange,
      onPaginationSizeChange,
      onPaginationReserveChange,
      onPaginationClearSelection
    } = usePagination(tableRef, paginationRef, state, props, emit, loadData);
    if (!props.searchBarProps?.enable && props.initLoading) {
      loadData();
    }
    const tableSrc = vue.reactive({});
    const checkData = () => {
      state.columns?.forEach(async (el) => {
        const baceName = el.prop;
        if (el.searchProps?.dataSourceProps && el.searchProps.dataSource) {
          if (typeof el.searchProps.dataSource === "function") {
            const { data } = await el.searchProps.dataSource({ _time: new Date().getTime() });
            tableSrc[`${baceName}SrcList`] = data;
          }
        }
      });
    };
    checkData();
    const searchbarRef = vue.ref();
    const getAdvOutQueryParam = () => {
      return searchbarRef.value.getAdvOutQueryParam();
    };
    const getInitParam = () => props.initParam;
    const sortBy = vue.ref({
      key: "",
      order: "asc"
    });
    const onSort = (column) => {
      sortBy.value = column;
      let sortData;
      state.pagination.reserve ? sortData = state.selection : sortData = state.data;
      if (sortBy.value.order === "asc") {
        state.data = sortData.sort((a, b) => a[column.key] - b[column.key]);
      } else if (sortBy.value.order === "desc") {
        state.data = sortData.sort((a, b) => b[column.key] - a[column.key]);
      }
    };
    const getSelection = () => {
      return state.selection;
    };
    __expose({
      tableRef,
      paginationRef,
      getAdvOutQueryParam,
      getInitParam,
      getSelection,
      refresh: () => {
        loadData();
      },
      getTableData: () => {
        return state.data;
      },
      getTableDataId: (id = null) => {
        return getTableDataId(id);
      },
      clearSelection: () => {
        state.singleSelectionData = null;
        state.multiSelectionCheckAll = false;
        state.multiSelectionCheckIndeterminate = false;
        state.selection = [];
        Object.keys(state.multiSelectionData).forEach((key) => {
          state.multiSelectionData[key] = false;
        });
      },
      getSelectionRows: () => {
        return state.selection;
      },
      getSelectionRowsId: (id = null) => {
        const ids = [];
        state.selection.forEach((element) => {
          ids.push(element[id || props.rowKey || "id"]);
        });
        return ids;
      },
      scrollTo: (scrollLeft, scrollTop) => {
        tableRef.value.scrollTo(scrollLeft, scrollTop);
      },
      scrollToLeft: (scrollLeft) => {
        tableRef.value.scrollToLeft(scrollLeft);
      },
      scrollToTop: (scrollTop) => {
        tableRef.value.scrollToTop(scrollTop);
      },
      scrollToRow: (row, strategy) => {
        tableRef.value.scrollToRow(row, strategy);
      }
    });
    return (_ctx, _cache) => {
      const _component_bt_adv_searchbar_ex = vue.resolveComponent("bt-adv-searchbar-ex");
      const _component_el_checkbox = vue.resolveComponent("el-checkbox");
      const _component_el_radio = vue.resolveComponent("el-radio");
      const _component_el_table_v2 = vue.resolveComponent("el-table-v2");
      const _component_el_auto_resizer = vue.resolveComponent("el-auto-resizer");
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [
        vue.createElementVNode("div", _hoisted_2$4, [
          props.searchBarProps?.enable ? (vue.openBlock(), vue.createBlock(_component_bt_adv_searchbar_ex, vue.mergeProps({
            key: 0,
            ref_key: "searchbarRef",
            ref: searchbarRef
          }, props.searchBarProps, {
            "column-list": props.searchBarProps.searchColumns || props.columns,
            "sence-id": _ctx.senceId,
            onSearch: vue.unref(onAdvSearchbarSearch),
            onReset: vue.unref(onAdvSearchbarReset)
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "tableHeaderSearch")
            ]),
            _: 3
          }, 16, ["column-list", "sence-id", "onSearch", "onReset"])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createCommentVNode(" \u641C\u7D22\u680F\u4E0B \u5934\u90E8\u5DE6\u4FA7\u64CD\u4F5C\u680F "),
        vue.createElementVNode("div", _hoisted_3$2, [
          vue.renderSlot(_ctx.$slots, "tableHeaderLeft", {
            selection: vue.unref(state).selection
          }),
          vue.renderSlot(_ctx.$slots, "tableHeaderRight", {
            selection: vue.unref(state).selection
          })
        ]),
        vue.createElementVNode("div", _hoisted_4$2, [
          vue.createElementVNode("div", _hoisted_5$2, [
            vue.createVNode(_component_el_auto_resizer, null, {
              default: vue.withCtx(({ height, width }) => [
                vue.createVNode(_component_el_table_v2, {
                  ref_key: "tableRef",
                  ref: tableRef,
                  columns: props.columns,
                  data: vue.unref(getTableData)(),
                  "row-height": 40,
                  "header-height": 48,
                  width,
                  height,
                  fixed: "",
                  "sort-by": sortBy.value,
                  onColumnSort: onSort
                }, {
                  "header-cell": vue.withCtx((scope) => [
                    scope.column.type == "selection" ? (vue.openBlock(), vue.createBlock(_component_el_checkbox, {
                      key: 0,
                      modelValue: vue.unref(state).multiSelectionCheckAll,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.unref(state).multiSelectionCheckAll = $event),
                      indeterminate: vue.unref(state).multiSelectionCheckIndeterminate,
                      onChange: _cache[1] || (_cache[1] = ($event) => vue.unref(onCheckboxSelectionAllChange)($event))
                    }, null, 8, ["modelValue", "indeterminate"])) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_6$1, vue.toDisplayString(scope.column.label), 1))
                  ]),
                  cell: vue.withCtx((scope) => [
                    scope.column.type == "index" ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_7$1, vue.toDisplayString(vue.unref(computeRowIndex)(scope.rowIndex)), 1)) : scope.column.type == "radio" ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_8, [
                      vue.createVNode(_component_el_radio, {
                        modelValue: vue.unref(state).singleSelectionData,
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => vue.unref(state).singleSelectionData = $event),
                        label: scope.rowData[props.rowKey],
                        onChange: ($event) => vue.unref(onRadioSelectionChange)(scope.rowData)
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(""))
                        ]),
                        _: 2
                      }, 1032, ["modelValue", "label", "onChange"])
                    ])) : scope.column.type == "selection" ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_9, [
                      vue.createVNode(_component_el_checkbox, {
                        modelValue: vue.unref(state).multiSelectionData[scope.rowData[props.rowKey]],
                        "onUpdate:modelValue": ($event) => vue.unref(state).multiSelectionData[scope.rowData[props.rowKey]] = $event,
                        label: scope.rowData[props.rowKey],
                        onChange: ($event) => vue.unref(onCheckboxSelectionChange)(scope.rowData, $event)
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(""))
                        ]),
                        _: 2
                      }, 1032, ["modelValue", "onUpdate:modelValue", "label", "onChange"])
                    ])) : (vue.openBlock(), vue.createElementBlock("div", _hoisted_10, [
                      vue.renderSlot(_ctx.$slots, `BtTableExColumn${scope.column.prop}Content`, {
                        row: scope.rowData,
                        column: scope.column,
                        index: scope.rowIndex
                      }, () => [
                        vue.createVNode(script$5, {
                          "table-src": tableSrc,
                          item: scope.column,
                          scope
                        }, null, 8, ["table-src", "item", "scope"])
                      ])
                    ]))
                  ]),
                  _: 2
                }, 1032, ["columns", "data", "width", "height", "sort-by"])
              ]),
              _: 3
            })
          ])
        ]),
        vue.createCommentVNode(" \u5206\u9875 "),
        props.paginationProps?.enable ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_11, [
          vue.createVNode(script$b, vue.mergeProps({
            ref_key: "paginationRef",
            ref: paginationRef,
            currentPage: vue.unref(state).pagination.pageNumber,
            "onUpdate:currentPage": _cache[3] || (_cache[3] = ($event) => vue.unref(state).pagination.pageNumber = $event),
            "page-size": vue.unref(state).pagination.pageSize,
            "onUpdate:pageSize": _cache[4] || (_cache[4] = ($event) => vue.unref(state).pagination.pageSize = $event),
            total: vue.unref(state).pagination.total,
            "reserve-selection": Boolean(props.reserveSelection),
            selection: vue.unref(state).selection
          }, props.paginationProps, {
            "current-row": {},
            onCurrentChange: vue.unref(onPaginationCurrentChange),
            onSizeChange: vue.unref(onPaginationSizeChange),
            onReserveChange: vue.unref(onPaginationReserveChange),
            onClearSelection: vue.unref(onPaginationClearSelection)
          }), null, 16, ["currentPage", "page-size", "total", "reserve-selection", "selection", "onCurrentChange", "onSizeChange", "onReserveChange", "onClearSelection"])
        ])) : vue.createCommentVNode("v-if", true)
      ]);
    };
  }
});

script$4.__file = "packages/components/tables/table-v2/src/table-v2.vue";

const BtpTableV2 = withInstall$1(script$4);

const useTable = (props, state, status, tableRef, emits) => {
  const computeRowIndex = (rowIndex) => {
    if (state.pagination.reserve) {
      return rowIndex + 1 + (state.pagination.pageNumber - 1) * state.pagination.pageSize;
    }
    return rowIndex + 1;
  };
  const radioSelectionChange = (row) => {
    tableRef.value.setCurrentRow(row);
    state.selection = [row];
    emits("select", state.selection);
  };
  return { computeRowIndex, radioSelectionChange };
};
const useTableLoader = (props, state, status, tableRef, emits) => {
  const reLayoutTable = () => {
    state.columns = props.columns?.map((item) => {
      item["uniqueIndex"] = BTPUtils__default["default"].uuid();
      return { ...item };
    });
    vue.nextTick(() => {
      tableRef.value.doLayout();
    });
  };
  const saveScene = () => {
    const columnList = [];
    props.columns.forEach((item) => {
      columnList.push({
        id: item.id,
        prop: item.prop,
        width: item.width,
        fixed: item.fixed,
        hidden: item.hidden ? item.hidden : false
      });
    });
    BTPUtils__default["default"].getCacheManager().saveScene(props.id, columnList).then((res) => {
      console.log("\u4FDD\u5B58\u4E3B\u9898\u4FE1\u606F\u5B8C\u6210", res);
    });
  };
  const initTable = async () => {
    const sceneList = await BTPUtils__default["default"].getCacheManager().getScene(props.id);
    if (sceneList) {
      const sortedColumnList = [];
      props.columns.forEach((item) => {
        item.hidden = true;
      });
      sceneList.forEach((item) => {
        const column = props.columns.find((i) => {
          return i.prop == item.prop;
        });
        if (column) {
          column.width = item.width || column.width;
          column.fixed = item.fixed;
          column.hidden = item.hidden ? item.hidden : false;
          sortedColumnList.push(column);
        }
      });
      sceneList.forEach((item) => {
        const index = props.columns.findIndex((i) => {
          return i.prop == item.prop;
        });
        if (index != -1) {
          props.columns.splice(index, 1);
        }
      });
      props.columns.splice(0, 0, ...sortedColumnList);
    }
    reLayoutTable();
  };
  const loadData = () => {
    status.loading = true;
    if (props.data) {
      loadLocalData();
      status.loading = false;
      return;
    }
    const params = JSON.parse(JSON.stringify(props.initParam || {}));
    if (props.pagination?.enable) {
      params.pageNumber = state.pagination.pageNumber;
      params.pageSize = state.pagination.pageSize;
    }
    params.advQueryParam = state.advQueryParam;
    params.sortParamList = state.sortParamList;
    if (props.dataApi) {
      props.dataApi(params).then((res) => {
        if (props.pagination?.enable) {
          state.data = res.data.records;
          state.pagination.total = res.data.total;
        } else {
          state.data = res.data;
        }
        status.loading = false;
        emits("data-loaded", state.data, state.pagination);
      }).catch(() => {
        state.data = [];
        status.loading = false;
        state.pagination.total = 0;
      });
    } else if (props.propEvents?.loadTableData) {
      props.propEvents.loadTableData(params).then((res) => {
        if (props.pagination?.enable) {
          state.data = res.data.records;
          state.pagination.total = res.data.total;
        } else {
          state.data = res.data;
        }
        status.loading = false;
        emits("data-loaded", state.data, state.pagination);
      }).catch(() => {
        state.data = [];
        status.loading = false;
        state.pagination.total = 0;
      });
    } else {
      status.loading = false;
    }
  };
  const loadLocalData = () => {
    state.data = props.data;
  };
  const getTableData = () => {
    return state.pagination?.reserve ? state.selection : state.data;
  };
  const onPaginationClearSelection = () => {
    tableRef.value.clearSelection();
  };
  const onColumnSettingChange = async (columns) => {
    const sortedColumnList = [];
    columns.forEach((item) => {
      const column = props.columns.find((i) => {
        return i.prop == item.prop;
      });
      if (column) {
        column.fixed = item.fixed ? item.fixed : false;
        column.hidden = item.hidden ? item.hidden : false;
        column.width = item.width ? item.width : "";
        sortedColumnList.push(column);
      }
    });
    columns.forEach((item) => {
      const index = props.columns.findIndex((i) => {
        return i.id == item.id;
      });
      if (index != -1) {
        props.columns.splice(index, 1);
      }
    });
    props.columns.splice(0, 0, ...sortedColumnList);
    reLayoutTable();
    saveScene();
  };
  return { initTable, loadData, getTableData, onPaginationClearSelection, onColumnSettingChange };
};

const useTableEvents = (props, state, status, tableRef, emits, editor) => {
  const onColumnHeaderDraged = (newVal, _oldVal, $column, _events) => {
    const column = props.columns.find((item) => item.prop == $column.property);
    if (column) {
      column.width = `${newVal}px`;
    }
  };
  const emitEvents = {
    select: (v1, v2) => {
      console.log("-----select-------");
      emits("select", v1, v2);
    },
    "select-all": (v1) => {
      emits("select-all", v1);
    },
    "cell-mouse-enter": (v1, v2, v3, v4) => {
      emits("cell-mouse-enter", v1, v2, v3, v4);
    },
    "cell-mouse-leave": (v1, v2, v3, v4) => {
      emits("cell-mouse-leave", v1, v2, v3, v4);
    },
    "cell-click": (v1, v2, v3, v4) => {
      editor.edit(v1);
      emits("cell-click", v1, v2, v3, v4);
    },
    "cell-dblclick": (v1, v2, v3, v4) => {
      emits("cell-dblclick", v1, v2, v3, v4);
    },
    "cell-contextmenu": (v1, v2, v3, v4) => {
      emits("cell-contextmenu", v1, v2, v3, v4);
    },
    "row-click": (v1, v2, v3) => {
      emits("row-click", v1, v2, v3);
    },
    "row-contextmenu": (v1, v2, v3) => {
      emits("row-contextmenu", v1, v2, v3);
    },
    "row-dblclick": (v1, v2, v3) => {
      emits("row-dblclick", v1, v2, v3);
    },
    "header-click": (v1, v2) => {
      emits("header-click", v1, v2);
    },
    "header-contextmenu": (v1, v2) => {
      emits("header-contextmenu", v1, v2);
    },
    "sort-change": (sort) => {
      emits("sort-change", sort);
    },
    "filter-change": (v1) => {
      emits("filter-change", v1);
    },
    "selection-change": (rows) => {
      console.log("-----selection-change-------");
      state.selection = rows;
      emits("selection-change", rows);
    },
    "current-change": (v1, v2) => {
      emits("current-change", v1, v2);
    },
    "header-dragend": (v1, v2, v3, v4) => {
      onColumnHeaderDraged(v1, v2, v3);
      emits("header-dragend", v1, v2, v3, v4);
    },
    "expand-change": (v1, v2) => {
      emits("expand-change", v1, v2);
    },
    "edit-change": (v1, v2) => {
      emits("edit-change", v1, v2);
    }
  };
  return { emitEvents };
};

class BTPTableEditor {
  props;
  emits;
  getTableData;
  rules = {};
  editingRows = vue.reactive({});
  editDataList = [];
  constructor(props, getTableData, emits) {
    this.props = props;
    this.emits = emits;
    this.getTableData = getTableData;
    this.props.columns.forEach((item) => {
      if (item.editProps?.rules) {
        this.rules[item.prop] = item.editProps.rules;
      }
    });
  }
  getRowKey() {
    return this.props.rowKey || "id";
  }
  getData(row) {
    return this.editingRows[row[this.getRowKey()]]?.data || null;
  }
  getRowData(uniqueId) {
    const dataList = this.getTableData();
    const data = dataList.find((item) => item[this.getRowKey()] == uniqueId);
    return data;
  }
  createRow() {
    const data = {};
    data["_tmpl_"] = true;
    data[this.getRowKey()] = BTPUtils__default["default"].uuid();
    this.props.columns.forEach((item) => {
      if (item.editProps?.enable) {
        data[item.prop] = item.editProps?.defaultValue;
      }
    });
    return data;
  }
  add(index) {
    const data = this.createRow();
    const dataList = this.getTableData();
    if (index != -1) {
      dataList.splice(index + 1, 0, data);
    } else {
      dataList.unshift(data);
    }
    if (!this.editingRows[data[this.getRowKey()]]) {
      this.editingRows[data[this.getRowKey()]] = { origin: data, data: cloneDeep(data) };
    }
    this.emits("row-edit-add", data);
    this.emits("row-edit-change");
  }
  edit(row) {
    if (!this.editingRows[row[this.getRowKey()]]) {
      this.editingRows[row[this.getRowKey()]] = { origin: row, data: cloneDeep(row) };
    }
    this.emits("row-edit-edit", row);
    this.emits("row-edit-change");
  }
  delete(row) {
    const dataList = this.getTableData();
    const index = dataList.findIndex((item) => item[this.getRowKey()] == row[this.getRowKey()]);
    dataList.splice(index, 1);
    this.emits("row-edit-delete", [row]);
    this.emits("row-edit-change");
  }
  cancel(row) {
    const datas = this.editingRows[row[this.getRowKey()]];
    const data = this.getRowData(row[this.getRowKey()]);
    if (data) {
      Object.assign(data, datas.origin);
    }
    delete this.editingRows[row[this.getRowKey()]];
    this.emits("row-edit-cancel", [row]);
    this.emits("row-edit-change");
  }
  cancelAll() {
    const rows = [];
    Object.keys(this.editingRows).forEach((key) => {
      const datas = this.editingRows[key];
      const data = this.getRowData(datas.data[this.getRowKey()]);
      if (data) {
        Object.assign(data, datas.origin);
      }
      rows.push(datas.data);
      delete this.editingRows[key];
    });
    this.emits("row-edit-cancel", rows);
    this.emits("row-edit-change");
  }
  saveAll() {
    this.validate().then((validate) => {
      if (!validate) {
        return;
      }
      console.log("\u53EF\u4EE5\u4FDD\u5B58");
    });
  }
  isEditing(row) {
    return this.editingRows[row[this.getRowKey()]] != void 0;
  }
  getRowErrorMessage(row) {
    return this.editingRows[row[this.getRowKey()]]?.message || null;
  }
  hasError(row, column) {
    const message = this.getRowErrorMessage(row);
    return message && message[column.prop] != null;
  }
  getErrorMessage(row, column) {
    const message = this.getRowErrorMessage(row);
    return message[column.prop];
  }
  validate() {
    const validator = new Schema(this.rules);
    const rows = [];
    Object.keys(this.editingRows).forEach((key) => {
      const editData = this.editingRows[key];
      rows.push(
        new Promise((resolve) => {
          validator.validate(editData.data).then(() => {
            editData.message = null;
            resolve(true);
          }).catch(({ errors }) => {
            editData.message = {};
            errors.forEach((item) => {
              editData.message[item.field] = item.message;
            });
            resolve(false);
          });
        })
      );
    });
    return new Promise((resolve) => {
      Promise.all(rows).then((values) => {
        resolve(values.every((item) => item === true));
      });
    });
  }
  validateRow(row) {
    const validator = new Schema(this.rules);
    const editData = this.editingRows[row[this.getRowKey()]];
    return new Promise((resolve) => {
      validator.validate(editData.data).then(() => {
        editData.message = null;
        resolve(true);
      }).catch(({ errors }) => {
        editData.message = {};
        errors.forEach((item) => {
          editData.message[item.field] = item.message;
        });
        resolve(false);
      });
    });
  }
}

const _hoisted_1$3 = { class: "btp-table-cell-editor" };
const _hoisted_2$3 = { class: "btp-table-cell-editor--content" };
var script$3 = /* @__PURE__ */ vue.defineComponent({
  __name: "index",
  props: {
    row: { type: null, required: false, default: {} },
    column: { type: null, required: false, default: {} },
    editor: { type: null, required: false, default: null }
  },
  setup(__props) {
    const props = __props;
    const data = vue.computed(() => {
      return props.editor?.getData(props.row) || {};
    });
    return (_ctx, _cache) => {
      const _component_el_input = vue.resolveComponent("el-input");
      const _component_WarningFilled = vue.resolveComponent("WarningFilled");
      const _component_el_icon = vue.resolveComponent("el-icon");
      const _component_el_popover = vue.resolveComponent("el-popover");
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$3, [
        vue.createElementVNode("div", _hoisted_2$3, [
          vue.createVNode(_component_el_input, {
            modelValue: data.value[_ctx.column.prop],
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => data.value[_ctx.column.prop] = $event),
            modelModifiers: { trim: true }
          }, null, 8, ["modelValue"])
        ]),
        _ctx.editor?.hasError(_ctx.row, _ctx.column) ? (vue.openBlock(), vue.createBlock(_component_el_popover, {
          key: 0,
          placement: "right",
          trigger: "hover"
        }, {
          reference: vue.withCtx(() => [
            vue.createVNode(_component_el_icon, null, {
              default: vue.withCtx(() => [
                vue.createVNode(_component_WarningFilled, { color: "#f56c6c" })
              ]),
              _: 1
            })
          ]),
          default: vue.withCtx(() => [
            vue.createTextVNode(vue.toDisplayString(_ctx.editor?.getErrorMessage(_ctx.row, _ctx.column) || "") + " ", 1)
          ]),
          _: 1
        })) : vue.createCommentVNode("v-if", true)
      ]);
    };
  }
});

script$3.__file = "packages/components/tables/table-editor/src/index.vue";

const _hoisted_1$2 = {
  key: 0,
  class: "bt-dict-status"
};
const _hoisted_2$2 = { class: "text" };
var script$2 = /* @__PURE__ */ vue.defineComponent({
  __name: "index",
  props: {
    editable: { type: Boolean, required: false, default: false },
    column: { type: null, required: false, default: null },
    scope: { type: null, required: false, default: null },
    editor: { type: null, required: false, default: null }
  },
  setup(__props) {
    const props = __props;
    const state = vue.reactive({
      dictItem: null
    });
    vue.onMounted(() => {
      if (props.column.dictId) {
        const value = props.scope.row[props.column.prop];
        state.dictItem = BTPUtils__default["default"].getCacheManager().getDictItem(props.column.dictId, value);
      }
    });
    const isEmpty = (callValue) => {
      return callValue === "" || callValue == null || callValue == void 0;
    };
    const calcColumnText = () => {
      const row = props.scope.row;
      const value = row[props.column.prop];
      if (props.column.formatter) {
        return row.$index == -1 ? null : props.column.formatter(props.column, row, value);
      } else {
        const cellValue = Array.isArray(value) ? value.join(" / ") : value;
        return isEmpty(cellValue) ? "-" : cellValue;
      }
    };
    return (_ctx, _cache) => {
      return props.editable && _ctx.column.editProps?.enable && _ctx.editor.isEditing(_ctx.scope.row) ? (vue.openBlock(), vue.createBlock(script$3, {
        key: 0,
        column: _ctx.column,
        row: _ctx.scope.row,
        editor: _ctx.editor
      }, null, 8, ["column", "row", "editor"])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
        _ctx.column.dictId ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$2, [
          vue.createElementVNode("span", {
            class: "mark",
            style: vue.normalizeStyle(`background-color:${state.dictItem?.color || "transparent"}`)
          }, null, 4),
          vue.createElementVNode("span", _hoisted_2$2, vue.toDisplayString(state.dictItem?.name || "-"), 1)
        ])) : (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 1 }, [
          vue.createTextVNode(vue.toDisplayString(calcColumnText()), 1)
        ], 64))
      ], 64));
    };
  }
});

script$2.__file = "packages/components/tables/table-column-content/src/index.vue";

const _hoisted_1$1 = /* @__PURE__ */ vue.createElementVNode("em", {
  style: { "cursor": "pointer" },
  class: "bt-icon bt-icon-col-setting"
}, null, -1);
const _hoisted_2$1 = { class: "bt-table-ex--setting" };
const _hoisted_3$1 = /* @__PURE__ */ vue.createElementVNode("div", { class: "bt-table-ex--setting-title" }, "\u663E\u793A\u5B57\u6BB5", -1);
const _hoisted_4$1 = ["onDragstart", "onDragenter", "onDragend", "onMouseover", "onMouseleave"];
const _hoisted_5$1 = ["onClick"];
const _hoisted_6 = ["onClick"];
const _hoisted_7 = { class: "bt-table-ex--setting-footer" };
const __default__ = {
  inheritAttrs: false
};
var script$1 = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  __name: "column-setting-popover",
  props: {
    columns: { type: null, required: false, default: [] }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const popoverRef = vue.ref();
    const state = vue.reactive({
      searchText: null,
      oldVal: "-1",
      newOld: "-1",
      overActive: "-1",
      dataList: [],
      originList: []
    });
    const onPopoverShow = () => {
      state.dataList = cloneDeep(props.columns);
      state.originList = [...cloneDeep(props.columns)];
      state.dataList.forEach((item) => {
        item.showValue = !item.hidden;
      });
    };
    const dragstart = (val) => {
      state.oldVal = val;
    };
    const dragend = (_val) => {
      if (state.oldVal != state.newOld) {
        let oldIndex = state.dataList.findIndex((i) => i.id == state.oldVal);
        let newIndex = state.dataList.findIndex((i) => i.id == state.newOld);
        let newItems = [...state.dataList];
        state.dataList.splice(oldIndex, 1);
        state.dataList.splice(
          newIndex,
          0,
          newItems.find((i) => i.id == state.oldVal)
        );
        let oldIndex1 = state.originList.findIndex((i) => i.id == state.oldVal);
        let newIndex1 = state.originList.findIndex((i) => i.id == state.newOld);
        let newItems1 = [...state.originList];
        state.originList.splice(oldIndex1, 1);
        state.originList.splice(
          newIndex1,
          0,
          newItems1.find((i) => i.id == state.oldVal)
        );
      }
    };
    const dragenter = (e, val) => {
      e.dataTransfer.effectAllowed = "move";
      state.newOld = val;
    };
    const mouseover = (val) => {
      state.overActive = val;
    };
    const mouseleave = (val) => {
      state.overActive = "-1";
    };
    const dragover = (e) => {
      e.dataTransfer.dropEffect = "move";
    };
    const onCheckChange = (item) => {
      item.hidden = !item.showValue;
      state.originList.filter((item2) => {
        if (item2.id == item2.id) {
          item2.hidden = !item2.showValue;
        }
      });
    };
    const onFixed = (index, val) => {
      state.dataList[index].fixed = val && val.trim().length > 0 ? "" : "left";
    };
    const getVerify = (item) => {
      return item.label?.indexOf(state.searchText || "") >= 0;
    };
    const onColSave = () => {
      emits("change", state.dataList);
    };
    const onColReset = () => {
      popoverRef.value.hide();
    };
    return (_ctx, _cache) => {
      const _component_el_input = vue.resolveComponent("el-input");
      const _component_el_checkbox = vue.resolveComponent("el-checkbox");
      const _component_el_tooltip = vue.resolveComponent("el-tooltip");
      const _component_el_button = vue.resolveComponent("el-button");
      const _component_el_space = vue.resolveComponent("el-space");
      const _component_el_scrollbar = vue.resolveComponent("el-scrollbar");
      const _component_el_popover = vue.resolveComponent("el-popover");
      return vue.openBlock(), vue.createBlock(_component_el_popover, {
        ref_key: "popoverRef",
        ref: popoverRef,
        trigger: "hover",
        width: 370,
        onShow: onPopoverShow
      }, {
        reference: vue.withCtx(() => [
          _hoisted_1$1
        ]),
        default: vue.withCtx(() => [
          vue.createElementVNode("div", _hoisted_2$1, [
            vue.createVNode(_component_el_input, {
              modelValue: state.searchText,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.searchText = $event),
              clearable: "",
              placeholder: "\u641C\u7D22\u663E\u793A\u5B57\u6BB5"
            }, null, 8, ["modelValue"]),
            _hoisted_3$1,
            vue.createVNode(_component_el_scrollbar, { class: "bt-table-ex--setting-content" }, {
              default: vue.withCtx(() => [
                (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(state.dataList, (item, index) => {
                  return vue.openBlock(), vue.createElementBlock("div", {
                    key: `${index}`,
                    class: vue.normalizeClass(["bt-table-ex--setting-line", {
                      active: state.overActive == item.id
                    }]),
                    draggable: "true",
                    onDragover: _cache[1] || (_cache[1] = vue.withModifiers(($event) => dragover($event), ["prevent"])),
                    onDragstart: ($event) => dragstart(item.id),
                    onDragenter: ($event) => dragenter($event, item.id),
                    onDragend: ($event) => dragend(item.id),
                    onMouseover: ($event) => mouseover(item.id),
                    onMouseleave: ($event) => mouseleave(item.id)
                  }, [
                    getVerify(item) ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                      vue.createVNode(_component_el_checkbox, {
                        modelValue: item.showValue,
                        "onUpdate:modelValue": ($event) => item.showValue = $event,
                        onChange: ($event) => onCheckChange(item)
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(vue.toDisplayString(item.label), 1)
                        ]),
                        _: 2
                      }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"]),
                      vue.createVNode(_component_el_space, { class: "setting-toolbar" }, {
                        default: vue.withCtx(() => [
                          vue.createVNode(_component_el_button, { link: "" }, {
                            default: vue.withCtx(() => [
                              vue.createVNode(_component_el_tooltip, {
                                content: "\u662F\u5426\u56FA\u5B9A",
                                placement: "top",
                                effect: "light"
                              }, {
                                default: vue.withCtx(() => [
                                  vue.createElementVNode("em", {
                                    class: vue.normalizeClass(["pointer bt-icon bt-icon-lock", { "icon-active": Boolean(item.fixed) }]),
                                    onClick: vue.withModifiers(($event) => onFixed(index, item.fixed), ["stop"])
                                  }, null, 10, _hoisted_5$1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          vue.createVNode(_component_el_button, { link: "" }, {
                            default: vue.withCtx(() => [
                              vue.createElementVNode("em", {
                                class: vue.normalizeClass(["bt-icon bt-icon-move", { hidden: state.overActive != item.id }]),
                                onClick: vue.withModifiers(($event) => onFixed(index, item.fixed), ["stop"])
                              }, null, 10, _hoisted_6)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024)
                    ], 64)) : vue.createCommentVNode("v-if", true)
                  ], 42, _hoisted_4$1);
                }), 128))
              ]),
              _: 1
            }),
            vue.createElementVNode("div", _hoisted_7, [
              vue.createVNode(_component_el_button, {
                type: "info",
                onClick: onColReset
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" \u53D6 \u6D88 ")
                ]),
                _: 1
              }),
              vue.createVNode(_component_el_button, {
                type: "primary",
                onClick: onColSave
              }, {
                default: vue.withCtx(() => [
                  vue.createTextVNode(" \u4FDD \u5B58 ")
                ]),
                _: 1
              })
            ])
          ])
        ]),
        _: 1
      }, 512);
    };
  }
});

script$1.__file = "packages/components/tables/table/src/column-setting-popover.vue";

const _hoisted_1 = { class: "btp-table" };
const _hoisted_2 = { class: "btp-table--searchbar" };
const _hoisted_3 = { class: "btp-table--toolbar" };
const _hoisted_4 = { class: "btp-table--table" };
const _hoisted_5 = { class: "btp-table--table--container" };
var script = /* @__PURE__ */ vue.defineComponent({
  __name: "index",
  props: {
    id: { type: String, required: false, default: "" },
    rowKey: { type: String, required: false, default: "id" },
    search: { type: null, required: false, default: {} },
    pagination: { type: null, required: false, default: {
      reserveSelection: false
    } },
    editProps: { type: null, required: false, default: { enable: false } },
    columns: { type: null, required: false, default: [] },
    columnSetting: { type: Boolean, required: false, default: true },
    dataApi: { type: null, required: false, default: null },
    initLoading: { type: Boolean, required: false, default: true },
    propEvents: { type: null, required: false, default: {} }
  },
  emits: [
    "select",
    "select-all",
    "selection-change",
    "cell-mouse-enter",
    "cell-mouse-leave",
    "cell-click",
    "cell-dblclick",
    "cell-contextmenu",
    "row-click",
    "row-contextmenu",
    "row-dblclick",
    "header-click",
    "header-contextmenu",
    "sort-change",
    "filter-change",
    "current-change",
    "header-dragend",
    "expand-change",
    "data-loaded",
    "row-edit-add",
    "row-edit-edit",
    "row-edit-delete",
    "row-edit-cancel",
    "row-edit-change"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    const props = __props;
    const tableRef = vue.ref();
    const state = vue.reactive({
      data: [],
      columns: [],
      selection: [],
      pagination: {
        reserve: false,
        pageNumber: 1,
        currentPage: 1,
        total: 0,
        pageSize: props.pagination.pageSize || 20
      },
      radioSelection: null,
      advQueryParam: null
    });
    const status = vue.reactive({
      loading: false
    });
    const { initTable, loadData, getTableData, onPaginationClearSelection, onColumnSettingChange } = useTableLoader(props, state, status, tableRef, emits);
    const tableEditor = new BTPTableEditor(props, getTableData, emits);
    const { emitEvents } = useTableEvents(props, state, status, tableRef, emits, tableEditor);
    const { computeRowIndex, radioSelectionChange } = useTable(props, state, status, tableRef, emits);
    vue.watch(
      () => state.pagination.currentPage,
      (value) => {
        state.pagination.pageNumber = value;
        loadData();
      },
      { immediate: false }
    );
    vue.watch(
      () => state.pagination.pageSize,
      () => {
        state.pagination.pageNumber = state.pagination.currentPage = 1;
      },
      { immediate: false }
    );
    const onAdvSearch = (advQueryParam) => {
      state.advQueryParam = advQueryParam;
      loadData();
    };
    initTable();
    if (props.initLoading && !props.search.enable) {
      loadData();
    }
    __expose({
      editor: tableEditor
    });
    return (_ctx, _cache) => {
      const _component_el_radio = vue.resolveComponent("el-radio");
      const _component_el_button = vue.resolveComponent("el-button");
      const _component_el_table_column = vue.resolveComponent("el-table-column");
      const _component_el_table = vue.resolveComponent("el-table");
      const _directive_loading = vue.resolveDirective("loading");
      return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
        vue.createElementVNode("div", _hoisted_2, [
          props.search?.enable ? (vue.openBlock(), vue.createBlock(script$7, vue.mergeProps({
            key: 0,
            ref: "searchbarRef"
          }, props.search, {
            "column-list": props.columns,
            onSearch: onAdvSearch
          }), {
            default: vue.withCtx(() => [
              vue.renderSlot(_ctx.$slots, "search")
            ]),
            _: 3
          }, 16, ["column-list"])) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createCommentVNode(" \u641C\u7D22\u680F\u4E0B \u5934\u90E8\u5DE6\u4FA7\u64CD\u4F5C\u680F "),
        vue.createElementVNode("div", _hoisted_3, [
          vue.renderSlot(_ctx.$slots, "toolbar", {
            selection: state.selection
          })
        ]),
        vue.createElementVNode("div", _hoisted_4, [
          vue.createElementVNode("div", _hoisted_5, [
            vue.withDirectives((vue.openBlock(), vue.createBlock(_component_el_table, vue.mergeProps({
              ref_key: "tableRef",
              ref: tableRef,
              data: vue.unref(getTableData)()
            }, { ..._ctx.$props, ..._ctx.$attrs }, vue.toHandlers(vue.unref(emitEvents))), vue.createSlots({
              default: vue.withCtx(() => [
                vue.renderSlot(_ctx.$slots, "default", {}, () => [
                  (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(state.columns, (item) => {
                    return vue.openBlock(), vue.createElementBlock(vue.Fragment, {
                      key: item.uniqueIndex
                    }, [
                      !item.hidden ? vue.renderSlot(_ctx.$slots, item.prop, {
                        key: 0,
                        column: item
                      }, () => [
                        vue.createVNode(_component_el_table_column, vue.normalizeProps(vue.guardReactiveProps(item)), {
                          default: vue.withCtx((scope) => [
                            item.type == "index" && item.continuous ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, { key: 0 }, [
                              vue.createTextVNode(vue.toDisplayString(vue.unref(computeRowIndex)(scope.$index)), 1)
                            ], 64)) : item.type == "radio" ? (vue.openBlock(), vue.createBlock(_component_el_radio, {
                              key: 1,
                              label: scope.row.id,
                              modelValue: state.radioSelection,
                              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.radioSelection = $event),
                              onChange: ($event) => vue.unref(radioSelectionChange)(scope.row)
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode(vue.toDisplayString(""))
                              ]),
                              _: 2
                            }, 1032, ["label", "modelValue", "onChange"])) : item.type == "operate" ? (vue.openBlock(), vue.createBlock(_component_el_button, {
                              key: 2,
                              row: scope
                            }, {
                              default: vue.withCtx(() => [
                                vue.createTextVNode("123")
                              ]),
                              _: 2
                            }, 1032, ["row"])) : !item.type || item.type == "" ? (vue.openBlock(), vue.createBlock(script$2, {
                              key: 3,
                              column: item,
                              scope,
                              editor: vue.unref(tableEditor),
                              editable: props.editProps?.enable
                            }, null, 8, ["column", "scope", "editor", "editable"])) : vue.createCommentVNode("v-if", true)
                          ]),
                          _: 2
                        }, 1040)
                      ]) : vue.createCommentVNode("v-if", true)
                    ], 64);
                  }), 128)),
                  props.columnSetting ? (vue.openBlock(), vue.createBlock(_component_el_table_column, {
                    key: 0,
                    width: "120px",
                    fixed: "right"
                  }, {
                    header: vue.withCtx(() => [
                      vue.createVNode(script$1, {
                        columns: state.columns,
                        onChange: vue.unref(onColumnSettingChange)
                      }, null, 8, ["columns", "onChange"])
                    ]),
                    default: vue.withCtx((scope) => [
                      vue.createVNode(_component_el_button, {
                        type: "primary",
                        link: true,
                        onClick: vue.withModifiers(($event) => vue.unref(tableEditor).add(scope.$index), ["stop"])
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(" \u6DFB\u52A0 ")
                        ]),
                        _: 2
                      }, 1032, ["onClick"]),
                      vue.createVNode(_component_el_button, {
                        type: "danger",
                        link: true,
                        onClick: vue.withModifiers(($event) => vue.unref(tableEditor).delete(scope.row), ["stop"])
                      }, {
                        default: vue.withCtx(() => [
                          vue.createTextVNode(" \u5220\u9664 ")
                        ]),
                        _: 2
                      }, 1032, ["onClick"])
                    ]),
                    _: 1
                  })) : vue.createCommentVNode("v-if", true)
                ])
              ]),
              _: 2
            }, [
              _ctx.$slots.append ? {
                name: "append",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "append")
                ]),
                key: "0"
              } : void 0,
              _ctx.$slots.empty ? {
                name: "empty",
                fn: vue.withCtx(() => [
                  vue.renderSlot(_ctx.$slots, "empty")
                ]),
                key: "1"
              } : void 0
            ]), 1040, ["data"])), [
              [_directive_loading, status.loading]
            ])
          ])
        ]),
        vue.createCommentVNode(" \u5206\u9875 "),
        props.pagination?.enable ? (vue.openBlock(), vue.createBlock(script$b, vue.mergeProps({
          key: 0,
          ref: "paginationRef"
        }, props.pagination, {
          "current-page": state.pagination.currentPage,
          "onUpdate:currentPage": _cache[1] || (_cache[1] = ($event) => state.pagination.currentPage = $event),
          "page-size": state.pagination.pageSize,
          "onUpdate:pageSize": _cache[2] || (_cache[2] = ($event) => state.pagination.pageSize = $event),
          reserve: state.pagination.reserve,
          "onUpdate:reserve": _cache[3] || (_cache[3] = ($event) => state.pagination.reserve = $event),
          selection: state.selection,
          total: state.pagination.total,
          onClearSelection: vue.unref(onPaginationClearSelection)
        }), null, 16, ["current-page", "page-size", "reserve", "selection", "total", "onClearSelection"])) : vue.createCommentVNode("v-if", true)
      ]);
    };
  }
});

script.__file = "packages/components/tables/table/src/index.vue";

const BtpTable = withInstall$1(script);

const BtpTableEditor = withInstall$1(script$3);

exports.BtpAdvSearchbar = BtpAdvSearchbar;
exports.BtpPagination = BtpPagination;
exports.BtpTable = BtpTable;
exports.BtpTableEditor = BtpTableEditor;
exports.BtpTableV2 = BtpTableV2;

import { defineComponent, resolveComponent, openBlock, createBlock, withCtx, renderSlot, createElementBlock, Fragment, renderList, resolveDynamicComponent, mergeProps, toHandlers, getCurrentInstance, ref, reactive, onMounted, createVNode } from 'vue';

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
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_el_tabs = resolveComponent("el-tabs");
      return openBlock(), createBlock(_component_el_tabs, { class: "btp-tabs" }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default", {}, () => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.btConfig?.children, (component) => {
              return openBlock(), createBlock(resolveDynamicComponent(__props.btViewContext.render(component)), mergeProps({
                key: component.id,
                style: component.styles,
                "bt-view-context": __props.btViewContext,
                "bt-config": component
              }, component.props), null, 16, ["style", "bt-view-context", "bt-config"]);
            }), 128))
          ])
        ]),
        _: 3
      });
    };
  }
});

script$2.__file = "packages/components/tabs/src/index.vue";

var script$1 = /* @__PURE__ */ defineComponent({
  __name: "tab-pane",
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
      const _component_el_tab_pane = resolveComponent("el-tab-pane");
      return openBlock(), createBlock(_component_el_tab_pane, null, {
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
      });
    };
  }
});

script$1.__file = "packages/components/tabs/src/tab-pane.vue";

var script = /* @__PURE__ */ defineComponent({
  __name: "tabs-anchor",
  emits: [
    "update:modelValue",
    "tab-click",
    "tab-change",
    "tab-remove",
    "tab-add",
    "edit"
  ],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emits = __emit;
    const instance = getCurrentInstance();
    const elTabRef = ref();
    const state = reactive({
      activeTabName: instance?.attrs.modelValue || "",
      tabIndex: 0
    });
    let isTabClick = false;
    const querySelector = (clazz) => {
      return elTabRef.value.$el.querySelector(clazz);
    };
    const querySelectorAll = (clazz) => {
      return elTabRef.value.$el.querySelectorAll(clazz);
    };
    onMounted(() => {
      querySelector(".el-scrollbar__wrap").addEventListener("scroll", (e) => {
        if (isTabClick)
          return;
        const scrollTop = e.target.scrollTop;
        const windowHeight = e.target.clientHeight;
        const scrollHeight = e.target.scrollHeight;
        if (Math.ceil(scrollTop + windowHeight) === scrollHeight) ; else {
          let scrollItems = querySelectorAll(".el-tab-pane");
          for (let i = scrollItems.length - 1; i >= 0; i--) {
            let judge = e.target.scrollTop >= scrollItems[i].offsetTop - scrollItems[0].offsetTop - 100;
            if (judge) {
              state.activeTabName = scrollItems[i].id.split("-")[1];
              emits("update:modelValue", state.activeTabName);
              break;
            }
          }
        }
      });
    });
    const smoothDown = (element, distance, totalY, step) => {
      if (distance < totalY) {
        distance += step;
        element.scrollTop = distance;
        setTimeout(smoothDown.bind(null, element, distance, totalY, step), 10);
      } else {
        element.scrollTop = totalY;
        isTabClick = false;
      }
    };
    function smoothUp(element, distance, totalY, step) {
      if (distance > totalY) {
        distance -= step;
        element.scrollTop = distance;
        setTimeout(smoothUp.bind(null, element, distance, totalY, step), 10);
      } else {
        element.scrollTop = totalY;
        isTabClick = false;
      }
    }
    const jump = (tabName, event) => {
      isTabClick = true;
      emits("tab-click", tabName, event);
      let scrollTarget = querySelector(".el-scrollbar__wrap");
      let target = querySelector(".el-scrollbar__view");
      let scrollItems = target.children;
      let totalY = scrollItems[tabName.index].offsetTop - scrollItems[0].offsetTop;
      let distance = target.scrollTop;
      let step = totalY / 50;
      if (totalY > distance) {
        smoothDown(scrollTarget, distance, totalY, step);
      } else {
        let newTotal = distance - totalY;
        step = newTotal / 50;
        smoothUp(scrollTarget, distance, totalY, step);
      }
    };
    const tabChange = (tabName) => {
      emits("update:modelValue", tabName);
      emits("tab-change", tabName);
    };
    __expose({
      elTabRef
    });
    return (_ctx, _cache) => {
      const _component_el_scrollbar = resolveComponent("el-scrollbar");
      const _component_el_tabs = resolveComponent("el-tabs");
      return openBlock(), createBlock(_component_el_tabs, {
        class: "btp-tabs-anchor",
        ref_key: "elTabRef",
        ref: elTabRef,
        modelValue: state.activeTabName,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.activeTabName = $event),
        onTabChange: tabChange,
        onTabClick: _cache[1] || (_cache[1] = (v1) => jump(v1, null)),
        onTabRemove: _cache[2] || (_cache[2] = (v1) => _ctx.$emit("tab-remove", v1)),
        onTabAdd: _cache[3] || (_cache[3] = () => _ctx.$emit("tab-add")),
        onEdit: _cache[4] || (_cache[4] = (v1, v2) => _ctx.$emit("edit", v1, v2))
      }, {
        default: withCtx(() => [
          createVNode(_component_el_scrollbar, null, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, () => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(_ctx.btConfig?.children, (component) => {
                  return openBlock(), createBlock(resolveDynamicComponent(_ctx.btViewContext.render(component)), mergeProps({
                    key: component.id,
                    style: component.styles,
                    "bt-view-context": _ctx.btViewContext,
                    "bt-config": component
                  }, component.props), null, 16, ["style", "bt-view-context", "bt-config"]);
                }), 128))
              ])
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["modelValue"]);
    };
  }
});

script.__file = "packages/components/tabs/src/tabs-anchor.vue";

const BtpTabs = withInstall(script$2);
const BtpTabPane = withInstall(script$1);
const BtpTabsAnchor = withInstall(script);

export { BtpTabPane, BtpTabs, BtpTabsAnchor };

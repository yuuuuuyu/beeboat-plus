import { defineComponent, ref, reactive, watch, openBlock, createElementBlock, normalizeClass, createElementVNode, normalizeStyle, renderSlot, Fragment, renderList, createBlock, resolveDynamicComponent, mergeProps, toHandlers } from 'vue';

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

const _hoisted_1 = /* @__PURE__ */ createElementVNode("div", { class: "btp-dockpanel-separatorline" }, null, -1);
const _hoisted_2 = /* @__PURE__ */ createElementVNode("i", { class: "bt-icon bt-icon-unfold" }, null, -1);
const _hoisted_3 = [
  _hoisted_2
];
const _hoisted_4 = { class: "btp-dockpanel-right" };
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
    },
    mode: {
      type: String,
      default: "vertical"
    },
    size: {
      type: String,
      default: void 0
    },
    dockSize: {
      type: Number,
      default: 340
    },
    minDockSize: {
      type: Number,
      default: 24
    }
  },
  setup(__props) {
    const props = __props;
    const leftPanelRef = ref();
    const state = reactive({
      dockSize: props.dockSize,
      collapsed: false
    });
    watch(
      () => props.dockSize,
      (value) => {
        state.dockSize = value;
      }
    );
    const onMouseDown = (event) => {
      if (state.collapsed) {
        return;
      }
      event = event || window.event;
      event.target.setCapture && event.target.setCapture();
      if (props.mode == "vertical") {
        const offsetWidth = leftPanelRef.value.offsetWidth - event.clientX;
        document.onmousemove = function(event2) {
          event2 = event2 || window.event;
          state.dockSize = Math.max(offsetWidth + event2.clientX, props.minDockSize);
        };
      } else {
        const offsetHeight = leftPanelRef.value.offsetHeight - event.clientY;
        document.onmousemove = function(event2) {
          event2 = event2 || window.event;
          state.dockSize = Math.max(offsetHeight + event2.clientY, props.minDockSize);
        };
      }
      document.onmouseup = function() {
        document.onmousemove = null;
        document.onmouseup = null;
        leftPanelRef.value.releaseCapture && leftPanelRef.value.releaseCapture();
      };
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["btp-dockpanel", { "btp-dockpanel--horizontal": props.mode == "horizontal" }])
      }, [
        createElementVNode("div", {
          ref_key: "leftPanelRef",
          ref: leftPanelRef,
          style: normalizeStyle({
            overflow: "hidden",
            width: props.mode == "vertical" ? (state.collapsed ? props.minDockSize : state.dockSize) + "px" : "auto",
            height: props.mode == "vertical" ? "auto" : (state.collapsed ? props.minDockSize : state.dockSize) + "px"
          })
        }, [
          renderSlot(_ctx.$slots, "dock", {}, () => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.btConfig?.dock?.children, (component) => {
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
        ], 4),
        createElementVNode("div", {
          class: "btp-dockpanel-separator",
          onMousedown: _cache[1] || (_cache[1] = ($event) => onMouseDown($event))
        }, [
          _hoisted_1,
          createElementVNode("div", {
            class: normalizeClass([{ "btp-dockpanel-collapsed ": state.collapsed }, "btp-dockpanel-dock"]),
            onClick: _cache[0] || (_cache[0] = ($event) => state.collapsed = !state.collapsed)
          }, [..._hoisted_3], 2)
        ], 32),
        createElementVNode("div", _hoisted_4, [
          renderSlot(_ctx.$slots, "default", {}, () => [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.btConfig?.dockcontent?.children, (component) => {
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
      ], 2);
    };
  }
});

script.__file = "packages/components/dock-panel/src/index.vue";

const BtpDockPanel = withInstall(script);

export { BtpDockPanel };

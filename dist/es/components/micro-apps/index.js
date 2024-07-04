import { defineComponent, resolveComponent, openBlock, createElementBlock, createElementVNode, toDisplayString, unref, createVNode, withCtx, createTextVNode, reactive, computed, Fragment, renderList, createBlock } from 'vue';
import { useRouter } from 'vue-router';
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

const _hoisted_1$1 = { style: { "display": "flex", "flex-direction": "row", "align-items": "center", "width": "100%", "height": "100%" } };
const _hoisted_2$1 = /* @__PURE__ */ createElementVNode("div", { style: { "flex": "1", "padding": "0 10px", "font-weight": "bold", "color": "white" } }, "\u5B50\u5E94\u7528\u9996\u9875", -1);
const _hoisted_3 = { style: { "color": "white" } };
const _hoisted_4 = { style: { "padding": "0 10px" } };
var script$2 = /* @__PURE__ */ defineComponent({
  __name: "micro-app-header",
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
    const router = useRouter();
    const onLogout = () => {
      BTPApplication.getInstance().removeToken();
      router.push("/");
    };
    return (_ctx, _cache) => {
      const _component_el_button = resolveComponent("el-button");
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        _hoisted_2$1,
        createElementVNode("div", _hoisted_3, toDisplayString(unref(BTPApplication).getInstance().getCacheManager().getUserName()), 1),
        createElementVNode("div", _hoisted_4, [
          createVNode(_component_el_button, {
            plain: "",
            onClick: onLogout
          }, {
            default: withCtx(() => [
              createTextVNode("\u6CE8\u9500")
            ]),
            _: 1
          })
        ])
      ]);
    };
  }
});

script$2.__file = "packages/components/micro-apps/src/micro-app-header.vue";

const _hoisted_1 = { style: { "width": "200px", "height": "100%" } };
const _hoisted_2 = { style: { "padding": "8px" } };
var script$1 = /* @__PURE__ */ defineComponent({
  __name: "micro-app-menu",
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
    const state = reactive({
      currentRoutePath: ""
    });
    const router = useRouter();
    const getList = computed(() => {
      const allRouter = BTPApplication.getInstance().getCacheManager().getAllRouter();
      return allRouter.find((i) => i.path == "/")?.children || [];
    });
    const onRoute = (path) => {
      state.currentRoutePath = path;
      router.push({ path });
    };
    return (_ctx, _cache) => {
      const _component_el_option = resolveComponent("el-option");
      const _component_el_select = resolveComponent("el-select");
      const _component_el_menu_item = resolveComponent("el-menu-item");
      const _component_el_menu = resolveComponent("el-menu");
      const _component_el_scrollbar = resolveComponent("el-scrollbar");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createVNode(_component_el_select, {
            modelValue: state.currentRoutePath,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => state.currentRoutePath = $event),
            onChange: onRoute
          }, {
            default: withCtx(() => [
              (openBlock(true), createElementBlock(Fragment, null, renderList(getList.value, (item) => {
                return openBlock(), createBlock(_component_el_option, {
                  key: item.path,
                  label: item.meta.name || item.name,
                  value: item.path
                }, null, 8, ["label", "value"]);
              }), 128))
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        createVNode(_component_el_scrollbar, { style: { "height": "calc(100% - 50px)" } }, {
          default: withCtx(() => [
            createVNode(_component_el_menu, {
              style: { "border-right": "none" },
              "default-active": state.currentRoutePath
            }, {
              default: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(getList.value, (item) => {
                  return openBlock(), createBlock(_component_el_menu_item, {
                    key: item.path,
                    index: item.path,
                    onClick: ($event) => onRoute(item.path)
                  }, {
                    default: withCtx(() => [
                      createElementVNode("span", null, toDisplayString(item?.meta?.name || item?.name), 1)
                    ]),
                    _: 2
                  }, 1032, ["index", "onClick"]);
                }), 128))
              ]),
              _: 1
            }, 8, ["default-active"])
          ]),
          _: 1
        })
      ]);
    };
  }
});

script$1.__file = "packages/components/micro-apps/src/micro-app-menu.vue";

var script = /* @__PURE__ */ defineComponent({
  __name: "micro-app-router-view",
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
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", null, [
        (openBlock(), createBlock(_component_router_view, {
          key: _ctx.$route.fullPath
        }))
      ]);
    };
  }
});

script.__file = "packages/components/micro-apps/src/micro-app-router-view.vue";

const BtpMicroAppHeader = withInstall(script$2);
const BtpMicroAppMenu = withInstall(script$1);
const BtpMicroAppRouterView = withInstall(script);

export { BtpMicroAppHeader, BtpMicroAppMenu, BtpMicroAppRouterView };

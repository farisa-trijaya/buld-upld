import __nuxt_component_4 from './index-BzxFm_el.mjs';
import { useSSRContext, defineComponent, mergeProps } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AlertMessageBox",
  __ssrInlineRender: true,
  props: {
    message: String,
    theme: {
      validator(value) {
        return [
          "primary",
          "secondary",
          "success",
          "info",
          "warning",
          "danger",
          "light",
          "dark"
        ].includes(value);
      },
      default: "danger"
    },
    showClose: {
      type: Boolean,
      default: false
    }
  },
  emits: ["closeMessage"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    function closeMessage() {
      emit("closeMessage");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [
          "grid grid-cols-12 px-2 py-2 mb-3 rounded-md",
          props.theme === "danger" ? "bg-red-600 bg-opacity-50" : props.theme === "success" ? "bg-green-600" : props.theme === "info" ? "bg-blue-600" : ""
        ]
      }, _attrs))}><div class="col-span-11 inline-flex items-center justify-center"><p class="text-xs text-gray-50 italic capitalize">${ssrInterpolate(props.message)}</p></div>`);
      if (__props.showClose) {
        _push(`<div class="col-span-1 inline-flex items-center justify-end">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "mi:circle-error",
          class: "h-5 w-5 text-gray-50 cursor-pointer",
          onClick: closeMessage
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AlertMessageBox.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=AlertMessageBox-DCW4o88x.mjs.map

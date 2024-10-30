import { _ as __nuxt_component_5 } from './client-only-pjR2XYdd.mjs';
import { useSSRContext, defineComponent, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useCartStore } from './dialog-C08sMnSt.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CounterButton",
  __ssrInlineRender: true,
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(__props) {
    const cartStore = useCartStore();
    const props = __props;
    const cartProduct = cartStore.items.find(
      (item) => item.sku == props.product.sku
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex space-x-4 rtl:space-x-reverse items-center" }, _attrs))}><div class="flex-1 h-8 flex border border-1 border-slate-900 delay-150 ease-in-out dark:border-slate-600 divide-x-[1px] rtl:divide-x-reverse text-sm font-normal divide-slate-900 dark:divide-slate-600 rounded">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="flex-1 w-[62px] text-center text-slate-900 dark:text-slate-300 flex items-center justify-center">${ssrInterpolate(unref(cartProduct).quantity)}</div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CounterButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=CounterButton-CHd8TWSH.mjs.map

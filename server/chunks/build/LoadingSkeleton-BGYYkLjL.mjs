import { useSSRContext, defineComponent, computed, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderList } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LoadingSkeleton",
  __ssrInlineRender: true,
  props: {
    tableCount: {
      type: Number,
      default: 0
    },
    rowCount: {
      type: Number,
      default: 6
    }
  },
  setup(__props) {
    const props = __props;
    computed(() => {
      return Array.from({ length: props.tableCount });
    });
    const rowItems = computed(() => {
      return Array.from({ length: props.rowCount });
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex h-screen w-full items-center justify-center m-auto bg-gray-50 dark:bg-slate-900 shadow-base p-6 rounded-md" }, _attrs))}><table class="animate-pulse w-full border-separate border-spacing-4 table-fixed m-auto"><thead><tr><th scope="col"><div class="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div></th><th scope="col"><div class="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div></th><th scope="col"><div class="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div></th><th scope="col"><div class="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div></th><th scope="col"><div class="h-4 bg-[#C4C4C4] dark:bg-slate-500"></div></th></tr></thead><tbody class="table-group-divider"><!--[-->`);
      ssrRenderList(unref(rowItems), (item, i) => {
        _push(`<tr><td><div class="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div></td><td><div class="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div></td><td><div class="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div></td><td><div class="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div></td><td><div class="h-2 bg-[#C4C4C4] dark:bg-slate-500"></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoadingSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=LoadingSkeleton-BGYYkLjL.mjs.map

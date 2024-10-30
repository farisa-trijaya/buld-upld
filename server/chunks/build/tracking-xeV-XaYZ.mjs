import _sfc_main$1 from './LoadingSkeleton-BGYYkLjL.mjs';
import { defineComponent, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
import { u as useThemeSettings } from './themeStore-BfIFnuwo.mjs';
import { u as useHead } from './server.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import '@primevue/core/base/style';
import '@primeuix/utils/object';
import '@primeuix/styled';
import '@primevue/themes';
import '@primevue/themes/aura';
import 'node:url';
import '@prisma/client';
import 'dayjs';
import 'jsonwebtoken';
import 'bcryptjs';
import 'generate-password';
import 'crypto';
import 'node:crypto';
import 'nodemailer';
import '@sendgrid/mail';
import '@iconify/utils';
import 'consola/core';
import 'ipx';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@primeuix/utils/eventbus';
import '@primeuix/utils';
import '@primeuix/utils/dom';
import 'deep-pick-omit';
import '@iconify/vue';
import 'vue3-star-ratings';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "tracking",
  __ssrInlineRender: true,
  setup(__props) {
    const themeStore = useThemeSettings();
    useHead({
      title: "Track Order"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingSkeleton = _sfc_main$1;
      if (unref(themeStore).isLoading) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-gray-50 dark:bg-slate-900" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_LoadingSkeleton, { "row-count": 10 }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-screen bg-gray-100 dark:bg-slate-900 pb-2 lg:pb-6 md:pb-6 rounded-lg mt-16 md:mt-16 lg:mt-14" }, _attrs))}><div class="flex w-full h-16 items-center justify-center m-auto" style="${ssrRenderStyle({ "background-image": "url(https://5.imimg.com/data5/SELLER/Default/2023/10/349824855/DS/YE/MJ/81036715/international-courier-service.png)", "padding": "90px 0 110px 0", "background-attachment": "fixed", "background-size": "100%", "position": "relative" })}"><h1 class="text-3xl text-gray-900 font-semibold uppercase"> Track Order </h1></div><div class="flex flex-col w-full px-5 py-5 text-start space-y-4 mt-5"><div class="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 items-center justify-center space-y-5 lg:space-y-0 md:space-y-0"><div class="col-span-1 lg:col-span-2 md:col-span-2"><div class="flex justify-center"><h3 class="text-gray-900 dark:text-gray-50 font-semibold"> Order Number </h3></div></div><div class="col-span-1 lg:col-span-8 md:col-span-8"><form><input type="text" name="order_number" class="w-full py-2 bg-white dark:bg-gray-700 rounded-md border border-gray-400 dark:border-gray-500 hover:outline-none hover:ring-0 focus:outline-none focus:ring-0 text-sm text-gray-900 dark:text-gray-50 px-3"></form></div><div class="col-span-1 lg:col-span-2 md:col-span-2 flex justify-center"><button class="inline-flex bg-orange-600 hover:bg-orange-500 text-sm font-semibold text-gray-50 px-5 py-2 rounded-sm"> Search </button></div></div></div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tracking.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=tracking-xeV-XaYZ.mjs.map

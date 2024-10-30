import { defineAsyncComponent, defineComponent, unref, mergeProps, useSSRContext } from 'vue';
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

const __nuxt_component_0_lazy = defineAsyncComponent(() => import('./LoadingSkeleton-BGYYkLjL.mjs').then((c) => c.default || c));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "about",
  __ssrInlineRender: true,
  setup(__props) {
    const themeStore = useThemeSettings();
    useHead({
      title: "About Us"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LazyLoadingSkeleton = __nuxt_component_0_lazy;
      if (unref(themeStore).isLoading) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-gray-50 dark:bg-slate-900" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_LazyLoadingSkeleton, { "row-count": 10 }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full bg-gray-100 dark:bg-slate-900 pb-2 lg:pb-6 md:pb-6 rounded-lg mt-16 md:mt-16 lg:mt-14" }, _attrs))}><div class="flex w-full h-16 items-center justify-center m-auto" style="${ssrRenderStyle({ "background-image": "url(https://dentestore.com/images/banner.jpg)", "padding": "90px 0 110px 0", "background-attachment": "fixed", "background-size": "100%", "position": "relative" })}"><h1 class="text-3xl text-gray-50 font-semibold uppercase">About Us</h1></div><div class="flex flex-col w-full px-5 py-5 text-start space-y-4"><p class="text-sm text-gray-900 dark:text-gray-50"><strong>Dentestore.com</strong> is an E-Commerce Dental Supply Marketplace headquartered in St. Corona CA under the DENTESTORE brand name and selling products through the Dentestore.com website. </p><p class="text-sm text-gray-900 dark:text-gray-50"><strong>Dentestore.com</strong> is an Online Dental Equipment Marketplace for all your equipment needs. Find a wide variety of dental supplies and great prices on brand name dental equipment, instruments, tools, products and accessories, plus innovative dental related services designed to maximize your practice\u2019s efficiency and profitability and help you save thousands of dollars. We also build long-term relationships with manufacturers, distributors and warehouses. </p><p class="text-sm text-gray-900 dark:text-gray-50"><strong>Dentestore.com</strong> is your one - stop shopping experience, providing you by the products, materials, equipment, services and instruments through an easy and friendly platform that allow you to manage your purchases, track your orders and monitor your expenses. </p><p class="text-sm text-gray-900 dark:text-gray-50"> At <strong>Dentestore.com</strong> our vision is to be the best and most patronized dental supply online store where all your needs will be met in the whole of World, our vision is to continuously be at the top list of dentists\u2019 one-stop-shop solution where you experience excellent and incomparable online shopping experience, look no further because we have the savvy and proficiency to meet your needs. </p><p class="text-sm text-gray-900 dark:text-gray-50"> At <strong>Dentestore.com</strong> our business purpose is to satisfy our customers&#39; demanding needs. As professional e-commerce shop, our live chat and the more other common contact options are available to our customers, so that we are able to have smooth communication in pre-sales and after-sale service all the time. In a word, everything we do is focused on customers&#39; satisfaction, helping customer to find the suitable cheap dental products at favorite prices. </p><h2 class="text-red-600 font-semibold"> Why Buy Online at Dentestore.com? </h2><ul class="list-disc px-5 space-y-2"><li class="text-sm text-gray-900 dark:text-gray-50"> One-Stop-Shop Solution </li><li class="text-sm text-gray-900 dark:text-gray-50"> Save your time and efforts on the complicated ordering process </li><li class="text-sm text-gray-900 dark:text-gray-50"> Fast and Effective Delivery </li><li class="text-sm text-gray-900 dark:text-gray-50"> Manage your purchases, Track your orders and Monitor your budget at your account page </li><li class="text-sm text-gray-900 dark:text-gray-50"> Safe and Secured Payment </li><li class="text-sm text-gray-900 dark:text-gray-50"> Various Payment Options </li><li class="text-sm text-gray-900 dark:text-gray-50"> Friendly and Effective Customer Service </li><li class="text-sm text-gray-900 dark:text-gray-50"> Genuine Products </li><li class="text-sm text-gray-900 dark:text-gray-50"> Stand Orders on monthly or quarterly or on any basis you would prefer as per your needs </li><li class="text-sm text-gray-900 dark:text-gray-50"> Top Quality and Competitive Price </li><li class="text-sm text-gray-900 dark:text-gray-50">Assured Quality</li></ul></div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=about-Bn8kxeag.mjs.map

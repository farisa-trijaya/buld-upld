import _sfc_main$1 from './LoadingSkeleton-BGYYkLjL.mjs';
import { defineComponent, unref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "contact",
  __ssrInlineRender: true,
  setup(__props) {
    const themeStore = useThemeSettings();
    useHead({
      title: "Contact Us"
    });
    const options = [
      {
        value: "complaint",
        label: "Complaint"
      },
      {
        value: "return-request",
        label: "Return Request"
      },
      {
        value: "general-inquiry",
        label: "General Inquiry"
      },
      {
        value: "suggestion",
        label: "Suggestion"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingSkeleton = _sfc_main$1;
      if (unref(themeStore).isLoading) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-gray-50 dark:bg-slate-900" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_LoadingSkeleton, { "row-count": 10 }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full bg-gray-100 dark:bg-slate-900 pb-2 lg:pb-6 md:pb-6 rounded-lg mt-16 md:mt-16 lg:mt-14" }, _attrs))}><div class="flex w-full h-16 items-center justify-center m-auto" style="${ssrRenderStyle({ "background-image": "url(https://dentestore.com/images/banner.jpg)", "padding": "90px 0 110px 0", "background-attachment": "fixed", "background-size": "100%", "position": "relative" })}"><h1 class="text-3xl text-gray-50 font-semibold uppercase">Contact Us</h1></div><div class="flex flex-col w-full px-5 py-5 text-start space-y-4"><div class="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 w-full lg:space-x-8 md:space-x-8"><div class="col-span-1 flex flex-col space-y-3"><h2 class="text-lg text-gray-900 dark:text-gray-50 font-semibold"> Send us a message </h2><form class="relative w-full space-y-2"><div class="grid grid-cols-2 gap-3 w-full"><div class="flex flex-col w-full space-y-2"><div class="relative space-y-1"><label for="first_name" class="text-sm text-gray-900 dark:text-gray-50 font-semibold">First Name *</label><input type="text" name="first_name" class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0"></div></div><div class="flex flex-col w-full space-y-2"><div class="relative space-y-1"><label for="last_name" class="text-sm text-gray-900 dark:text-gray-50 font-semibold">Last Name *</label><input type="text" name="last_name" class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0"></div></div></div><div class="relative space-y-1"><label for="email" class="text-sm text-gray-900 dark:text-gray-50 font-semibold">Email *</label><input type="text" name="email" class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0"></div><div class="grid grid-cols-2 gap-3 w-full"><div class="flex flex-col w-full space-y-2"><div class="relative space-y-1"><label for="phone" class="text-sm text-gray-900 dark:text-gray-50 font-semibold">Phone Number</label><input type="text" name="phone" class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0"></div></div><div class="flex flex-col w-full space-y-2"><div class="relative space-y-1"><label for="order_number" class="text-sm text-gray-900 dark:text-gray-50 font-semibold">Order Number</label><input type="text" name="order_number" class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0"></div></div></div><div class="relative space-y-1"><label for="subject" class="text-sm text-gray-900 dark:text-gray-50 font-semibold">Subject</label><select name="subject" class="inline-flex w-full h-10 px-3 text-sm text-gray-900 dark:text-gray-50 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0"><option value="order" selected class="text-sm text-gray-900 dark:text-gray-50"> Order </option><!--[-->`);
        ssrRenderList(options, (item) => {
          _push(`<option${ssrRenderAttr("value", item.value)} class="text-sm text-gray-900 dark:text-gray-50">${ssrInterpolate(item.label)}</option>`);
        });
        _push(`<!--]--></select></div><div class="relative space-y-1"><label for="message" class="text-sm text-gray-900 dark:text-gray-50 font-semibold">Message *</label><textarea rows="3" name="message" class="inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0"></textarea></div><button type="submit" class="inline-flex items-center justify-center px-6 py-2 text-sm text-gray-50 font-semibold uppercase bg-orange-600 hover:bg-orange-500 rounded-sm"> Send </button></form></div><div class="col-span-1 flex flex-col space-y-3"><h2 class="text-lg text-gray-900 dark:text-gray-50 font-semibold mt-5 lg:mt-0 md:mt-0"> Contact Address </h2><div class="flex flex-col space-y-1"><p class="text-gray-900 dark:text-gray-50"> 1581 Commerce St. Corona CA 92880 </p><p class="text-sm text-gray-900 dark:text-gray-50"><strong>Email:</strong> <i>customers@dentestore.com</i></p></div></div></div></div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=contact-_F6huiUF.mjs.map

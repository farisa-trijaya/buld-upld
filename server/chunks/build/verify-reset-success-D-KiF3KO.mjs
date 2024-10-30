import { _ as __nuxt_component_0 } from './nuxt-link-CqfMrQcT.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { a as useRoute, u as useHead } from './server.mjs';
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
  __name: "verify-reset-success",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useHead({
      title: "Verify Reset Successfully "
    });
    const isCopy = ref(false);
    const tempPassword = route.fullPath.split(
      "/auth/verify-reset-success?pass="
    )[1];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mx-5 py-5 px-4 border border-gray-400 dark:border-gray-700" }, _attrs))}><h3 class="text-lg text-gray-100 mb-2">Your temporary password is</h3><code class="text-xl text-gray-400 font-semibold cursor-pointer border border-gray-400 rounded-sm px-2 py-1">${ssrInterpolate(unref(tempPassword))}</code><h3 class="text-gray-100 mt-2"> Copy it, `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/auth/login",
        class: "text-orange-600 font-semibold hover:underline"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`log in`);
          } else {
            return [
              createTextVNode("log in")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`, and change it. </h3>`);
      if (unref(isCopy)) {
        _push(`<div class="absolute top-0 bg-gray-700 py-1.5 px-3 rounded-md shadow-lg shadow-gray-600"><p class="text-xs text-gray-50">Code Copied</p></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/verify-reset-success.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=verify-reset-success-D-KiF3KO.mjs.map

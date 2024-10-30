import { _ as _sfc_main$1 } from './AlertMessageBox-DCW4o88x.mjs';
import { defineComponent, ref, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { a as useRoute, u as useHead, n as navigateTo } from './server.mjs';
import { u as useCheckout } from './useCheckout-hgERupd8.mjs';
import './index-BzxFm_el.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
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
import 'vue3-star-ratings';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "verify-email",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { verifyEmailToken } = useCheckout();
    const resetError = ref(null);
    useHead({
      title: "Verify Email"
    });
    const token = route.query.token;
    if (!token)
      navigateTo("/auth/verify-failed");
    try {
      const { data, error } = ([__temp, __restore] = withAsyncContext(() => verifyEmailToken(token)), __temp = await __temp, __restore(), __temp);
      if (error)
        navigateTo("/auth/verify-failed");
      if (data)
        navigateTo(`/auth/login?email_verify=true`);
    } catch (e) {
      resetError.value = {};
      resetError.value.message = "Error. Please contact an administrator.";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AlertMessageBox = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mx-5 py-5 px-4 border border-gray-400 dark:border-gray-700" }, _attrs))}>`);
      if (unref(resetError)) {
        _push(ssrRenderComponent(_component_AlertMessageBox, {
          theme: "danger",
          message: unref(resetError).message
        }, null, _parent));
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/verify-email.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=verify-email-DLun-mXa.mjs.map

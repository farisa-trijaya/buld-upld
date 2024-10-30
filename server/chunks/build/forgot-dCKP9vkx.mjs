import { _ as _sfc_main$1 } from './AlertMessageBox-DCW4o88x.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import * as Yup from 'yup';
import { u as useHead } from './server.mjs';
import { u as useCheckout } from './useCheckout-hgERupd8.mjs';
import { u as useForm, a as useField } from './vee-validate-DiAzowps.mjs';
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
  __name: "forgot",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Forgot Password"
    });
    const { resetPassword } = useCheckout();
    const formSent = ref(false);
    const resetError = ref(null);
    const scheme = Yup.object().shape({
      email: Yup.string().email().required("Email Required")
    });
    const { handleSubmit } = useForm({
      validationSchema: scheme
    });
    const { value: email, errorMessage: emailError } = useField("email");
    handleSubmit(async (value) => {
      const { email: email2 } = value;
      await resetMyPassword(email2);
    });
    async function resetMyPassword(email2) {
      if (!email2) {
        resetError.value = {};
        resetError.value.message = "Missing email address";
        return;
      }
      const result = await resetPassword(email2);
      console.log("reset form: ", result);
      formSent.value = true;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AlertMessageBox = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mx-5 py-5 px-4 border border-gray-400 dark:border-gray-700" }, _attrs))}>`);
      if (unref(resetError)) {
        _push(ssrRenderComponent(_component_AlertMessageBox, {
          theme: "danger",
          message: unref(resetError).message,
          "show-close": false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (!unref(formSent)) {
        _push(`<div class="w-full"><h1 class="text-xl text-gray-50 font-bold">Forgot Password</h1><form><div class="relative space-y-1 mt-2"><label for="email" class="text-sm text-gray-50 font-semibold">Email Address *</label><input type="email" name="email"${ssrRenderAttr("value", unref(email))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm">`);
        if (unref(emailError)) {
          _push(`<div class="text-xs text-red-500 italic mt-1 font-semibold">${ssrInterpolate(unref(emailError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="grid grid-cols-2 gap-2"><button type="submit" class="inline-flex w-full items-center justify-center py-2 bg-orange-600 hover:bg-orange-500 text-sm text-gray-50 font-semibold rounded-sm mt-5"> Submit </button><button type="button" class="inline-flex w-full items-center justify-center py-2 bg-gray-50 hover:bg-gray-900 text-sm text-gray-900 hover:text-gray-50 font-semibold rounded-sm mt-5"> Cancel </button></div></form></div>`);
      } else {
        _push(`<div class="w-full">`);
        _push(ssrRenderComponent(_component_AlertMessageBox, {
          theme: "success",
          "show-close": false,
          message: "Please check your email for reset instructions. Check your spam folder too."
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/forgot.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=forgot-dCKP9vkx.mjs.map

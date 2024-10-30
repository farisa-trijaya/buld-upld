import { _ as _sfc_main$1 } from './AlertMessageBox-DCW4o88x.mjs';
import { _ as __nuxt_component_5 } from './client-only-pjR2XYdd.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CqfMrQcT.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderDynamicModel } from 'vue/server-renderer';
import * as Yup from 'yup';
import { u as useThemeSettings } from './themeStore-BfIFnuwo.mjs';
import { u as useAuthStore } from './authStore-B9R4yTW5.mjs';
import { u as useCheckout } from './useCheckout-hgERupd8.mjs';
import { u as useHead, n as navigateTo } from './server.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useThemeSettings();
    const authStore = useAuthStore();
    const typePassword = ref("password");
    const loginError = ref(null);
    const loginSuccess = ref(false);
    const { login, getProfile } = useCheckout();
    const getProfileError = ref(null);
    const profile = ref({});
    const emailIsVerified = ref(false);
    useHead({
      title: "Login"
    });
    const scheme = Yup.object().shape({
      email: Yup.string().email().required("Email Required"),
      password: Yup.string().required("Password Required").matches(/^(\S+$)/g, "Columns are not allowed to contain spaces")
    });
    const { handleSubmit } = useForm({
      validationSchema: scheme
    });
    const { value: email, errorMessage: emailError } = useField("email");
    const { value: password, errorMessage: passwordError } = useField("password");
    handleSubmit(async (value) => {
      const { email: email2, password: password2 } = value;
      await loginUser(email2, password2);
    });
    async function loginUser(email2, password2) {
      const { status, error } = await login(email2, password2);
      if (status === "fail") {
        loginError.value = error;
        if (error.message === "account is not verified") {
          authStore.setRegisterEmail(email2);
          setTimeout(() => {
            navigateTo("/auth/verify-registration");
          }, 1e3);
        }
        return;
      }
      if (status === "success")
        await loginSuccessful();
    }
    async function loginSuccessful() {
      const { status, error, data } = await getProfile();
      if (error) {
        console.log("error: ", error);
        getProfileError.value = error;
        return;
      }
      if (status === "success" && data) {
        profile.value = data;
        emailIsVerified.value = data.email_verified;
        authStore.setUser(profile.value);
        authStore.setIsLoggedIn(true);
        authStore.setUpdateCount();
        loginSuccess.value = true;
        setTimeout(() => {
          navigateTo("/");
        }, 300);
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AlertMessageBox = _sfc_main$1;
      const _component_ClientOnly = __nuxt_component_5;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mx-5 py-5 px-4 border border-gray-400 dark:border-gray-700" }, _attrs))}>`);
      if (unref(loginError)) {
        _push(ssrRenderComponent(_component_AlertMessageBox, {
          theme: "danger",
          message: unref(loginError).message,
          "show-close": true,
          onCloseMessage: ($event) => loginError.value = null
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(getProfileError)) {
        _push(ssrRenderComponent(_component_AlertMessageBox, {
          theme: "danger",
          message: unref(getProfileError).message,
          "show-close": true,
          onCloseMessage: ($event) => getProfileError.value = null
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(loginSuccess)) {
        _push(ssrRenderComponent(_component_AlertMessageBox, {
          theme: "success",
          message: "Success Login",
          "show-close": true,
          onCloseMessage: ($event) => loginSuccess.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 class="text-xl text-gray-50 font-bold">Sign In</h1><form><div class="relative space-y-1 mt-2"><label for="email" class="text-sm text-gray-50 font-semibold">Email Address *</label><input type="text" name="email"${ssrRenderAttr("value", unref(email))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" required>`);
      if (unref(emailError)) {
        _push(`<div class="text-xs text-red-500 italic mt-1 font-semibold">${ssrInterpolate(unref(emailError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="relative space-y-1 mt-2"><label for="password" class="text-sm text-gray-50 font-semibold">Password *</label><input${ssrRenderAttr("type", unref(typePassword))} name="password"${ssrRenderDynamicModel(unref(typePassword), unref(password), null)} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      if (unref(passwordError)) {
        _push(`<div class="text-xs text-red-500 italic mt-1 font-semibold">${ssrInterpolate(unref(passwordError))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button class="inline-flex w-full items-center justify-center py-2 bg-orange-600 hover:bg-orange-500 text-sm text-gray-50 font-semibold rounded-sm mt-5"> SIgn In </button><div class="flex items-center justify-center gap-2 mt-2"><input type="checkbox"><label for="remember" class="text-sm text-gray-200">Remember Me</label></div></form><div class="flex items-center justify-center gap-2 mt-2">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/auth/forgot" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<p class="text-sm font-semibold text-orange-500 hover:underline cursor-pointer"${_scopeId}> Forgot your password? </p>`);
          } else {
            return [
              createVNode("p", { class: "text-sm font-semibold text-orange-500 hover:underline cursor-pointer" }, " Forgot your password? ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-D9Fl7nQk.mjs.map

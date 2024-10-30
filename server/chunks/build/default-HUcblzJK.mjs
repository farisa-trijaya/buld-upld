import _sfc_main$7 from './LoadingSkeleton-BGYYkLjL.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CqfMrQcT.mjs';
import _sfc_main$6 from './NuxtImg-DQcxRTmR.mjs';
import __nuxt_component_4 from './index-BzxFm_el.mjs';
import { TransitionExpand } from '@morev/vue-transitions';
import { useSSRContext, defineComponent, ref, mergeProps, withCtx, createVNode, unref, openBlock, createBlock, createCommentVNode, toDisplayString, watch, resolveComponent, renderSlot, getCurrentScope, onScopeDispose } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { b as useNuxtApp, t as useState, n as navigateTo, c as useRuntimeConfig, _ as __nuxt_component_2 } from './server.mjs';
import { u as useCartStore, S as Se, Y as Ye, h as he, G as Ge } from './dialog-C08sMnSt.mjs';
import { u as useThemeSettings } from './themeStore-BfIFnuwo.mjs';
import { u as useAuthStore } from './authStore-B9R4yTW5.mjs';
import dayjs from 'dayjs';
import { _ as __nuxt_component_5 } from './client-only-pjR2XYdd.mjs';
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
import '@iconify/utils/lib/css/icon';
import './useCheckout-hgERupd8.mjs';

const _sfc_main$5 = {
  name: "TransitionExpand",
  inheritAttrs: false,
  components: { TheTransition: TransitionExpand }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_the_transition = resolveComponent("the-transition");
  _push(ssrRenderComponent(_component_the_transition, mergeProps(_ctx.$attrs, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/.vue-transitions/TransitionExpand.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender]]);
const useColorMode = () => {
  return useState("color-mode").value;
};
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
const defaultWindow = void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
  let target;
  let events2;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events2, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events2, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events2))
    events2 = [events2];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events2.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
  if (!window2)
    return noop;
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return toValue(ignore).some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  const listener = (event) => {
    const el = unrefElement(target);
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if (event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  let isProcessingClick = false;
  const cleanup = [
    useEventListener(window2, "click", (event) => {
      if (!isProcessingClick) {
        isProcessingClick = true;
        setTimeout(() => {
          isProcessingClick = false;
        }, 0);
        listener(event);
      }
    }, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      setTimeout(() => {
        var _a;
        const el = unrefElement(target);
        if (((_a = window2.document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement))) {
          handler(event);
        }
      }, 0);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Header",
  __ssrInlineRender: true,
  emits: ["openAlertCart"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const expanded = ref(null);
    const colorMode = useColorMode();
    const cartStore = useCartStore();
    const themeStore = useThemeSettings();
    const authStore = useAuthStore();
    const openMenuDesktop = ref(false);
    onClickOutside(expanded, (event) => themeStore.closeCollapseMenu());
    function openAlertCart() {
      emit("openAlertCart");
    }
    function goToCart() {
      if (cartStore.items.length > 0) {
        navigateTo("/cart");
      } else {
        openAlertCart();
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_NuxtImg = _sfc_main$6;
      const _component_Icon = __nuxt_component_4;
      const _component_TransitionExpand = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed top-0 w-full bg-[#002453] dark:bg-slate-950 z-50" }, _attrs))}><header class="flex flex-row justify-between w-full py-2 h-14"><div class="flex items-center justify-start h-full px-0 md:px-5 lg:px-10">`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex shrink-0 ml-4 md:ml-0 text-white mr-auto md:mr-10 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-3Rjv7fjDPf2WbW8KIVU5rN_dsRmAOkc1KZQeVq50sOUpcssKy6bDB0yH3V_nuxEJ6KEb6m3jdkl5gh9IVf2AK1HI8bl9v9y6Zf0TrQtzsML0F7O4PgplMSeMQ4RkQUjQbc40_cgyoaxnIlvpnMxM-1nGVWs9Wc1bMYxqnujKHfL2BG2vsuGwbdFunS7/s16000/logo-footer.png",
              alt: "logo",
              class: "w-full h-8 object-fill"
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex shrink-0 ml-4 md:ml-0 text-white mr-auto md:mr-10 focus-visible:outline focus-visible:outline-offset focus-visible:rounded-sm" }, [
                createVNode(_component_NuxtImg, {
                  src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-3Rjv7fjDPf2WbW8KIVU5rN_dsRmAOkc1KZQeVq50sOUpcssKy6bDB0yH3V_nuxEJ6KEb6m3jdkl5gh9IVf2AK1HI8bl9v9y6Zf0TrQtzsML0F7O4PgplMSeMQ4RkQUjQbc40_cgyoaxnIlvpnMxM-1nGVWs9Wc1bMYxqnujKHfL2BG2vsuGwbdFunS7/s16000/logo-footer.png",
                  alt: "logo",
                  class: "w-full h-8 object-fill"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex items-center justify-between h-full gap-3 px-3 lg:px-10 md:px-5"><div class="relative"><div class="flex items-center">`);
      if (unref(colorMode).preference === "dark") {
        _push(ssrRenderComponent(_component_Icon, {
          name: "material-symbols:sunny-outline",
          class: "h-6 w-6 text-gray-50 cursor-pointer hover:text-red-600"
        }, null, _parent));
      } else {
        _push(ssrRenderComponent(_component_Icon, {
          name: "material-symbols-light:dark-mode",
          class: "h-6 w-6 text-gray-50 cursor-pointer hover:text-red-600"
        }, null, _parent));
      }
      _push(`</div></div><div class="relative hidden lg:block md:block"><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "ic:baseline-shopping-cart",
        class: "h-6 w-6 text-gray-50 cursor-pointer hover:text-red-600",
        onClick: goToCart
      }, null, _parent));
      _push(`</div>`);
      if (unref(cartStore).isCartExist()) {
        _push(`<div class="absolute -top-2 right-0 inline-flex bg-green-600 text-gray-50 text-xs rounded-full px-1">${ssrInterpolate(unref(cartStore).totalQuantity())}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(authStore).isLoggedIn) {
        _push(`<div class="hidden lg:flex md:flex h-6 w-6 items-center justify-center group cursor-pointer">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "material-symbols-light:account-circle",
          class: "w-full h-full text-gray-50 group-hover:text-red-600"
        }, null, _parent));
        _push(`<ul style="${ssrRenderStyle(unref(openMenuDesktop) ? null : { display: "none" })}" class="absolute inline-flex flex-col items-center justify-center top-10 py-2 right-10 px-4 w-52 rounded bg-white dark:bg-slate-950 z-50 space-y-2"><div class="relative">`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/account" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-sm text-black dark:text-gray-50 hover:text-red-600 font-bold"${_scopeId}> Your Account </div>`);
            } else {
              return [
                createVNode("div", { class: "text-sm text-black dark:text-gray-50 hover:text-red-600 font-bold" }, " Your Account ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="relative"><div class="text-sm text-black dark:text-gray-50 hover:text-red-600 font-bold"> Logout </div></div></ul></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/auth/login" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!unref(authStore).isLoggedIn) {
              _push2(`<div class="hidden lg:flex md:flex h-6 w-6 items-center justify-center group cursor-pointer"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: "uil:signin",
                class: "w-full h-full text-gray-50 group-hover:text-red-600"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              !unref(authStore).isLoggedIn ? (openBlock(), createBlock("div", {
                key: 0,
                class: "hidden lg:flex md:flex h-6 w-6 items-center justify-center group cursor-pointer"
              }, [
                createVNode(_component_Icon, {
                  name: "uil:signin",
                  class: "w-full h-full text-gray-50 group-hover:text-red-600"
                })
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(themeStore).collapseMenu) {
        _push(`<div class="flex lg:hidden md:hidden h-6 w-6 items-center justify-center border border-gray-50 p-0.5 hover:border-red-600 group">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:baseline-close",
          class: "w-full h-full text-gray-50 group-hover:text-red-600"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="flex lg:hidden md:hidden h-6 w-6 items-center justify-center border border-gray-50 p-0.5 hover:border-red-600 group">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:sharp-menu",
          class: "w-full h-full text-gray-50 group-hover:text-red-600"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></header>`);
      _push(ssrRenderComponent(_component_TransitionExpand, { appear: "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(themeStore).collapseMenu) {
              _push2(`<div class="flex lg:hidden md:hidden flex-col w-full rounded-lg px-3 pb-3"${_scopeId}><div class="flex flex-col items-center justify-center bg-[#0c203a] dark:bg-slate-800 px-5 py-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2"${_scopeId2}> Home </div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-gray-50 hover:text-red-600 font-bold mt-2" }, " Home ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/auth/login" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (!unref(authStore).isLoggedIn) {
                      _push3(`<div class="${ssrRenderClass([unref(authStore).isLoggedIn ? "hidden" : "block", "text-sm text-gray-50 hover:text-red-600 font-bold mt-2"])}"${_scopeId2}> Signin </div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      !unref(authStore).isLoggedIn ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: ["text-sm text-gray-50 hover:text-red-600 font-bold mt-2", unref(authStore).isLoggedIn ? "hidden" : "block"]
                      }, " Signin ", 2)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard/account" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(authStore).isLoggedIn) {
                      _push3(`<div class="${ssrRenderClass([!unref(authStore).isLoggedIn ? "hidden" : "block", "text-sm text-gray-50 hover:text-red-600 font-bold mt-2"])}"${_scopeId2}> Account </div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      unref(authStore).isLoggedIn ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: ["text-sm text-gray-50 hover:text-red-600 font-bold mt-2", !unref(authStore).isLoggedIn ? "hidden" : "block"]
                      }, " Account ", 2)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              if (unref(authStore).isLoggedIn) {
                _push2(`<div class="${ssrRenderClass([!unref(authStore).isLoggedIn ? "hidden" : "block", "text-sm text-gray-50 hover:text-red-600 font-bold mt-2 cursor-pointer"])}"${_scopeId}> Logout </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/about" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2"${_scopeId2}> About Us </div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-gray-50 hover:text-red-600 font-bold mt-2" }, " About Us ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/contact" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2"${_scopeId2}> Contact Us </div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-gray-50 hover:text-red-600 font-bold mt-2" }, " Contact Us ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2"${_scopeId2}> Shopping Cart </div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-gray-50 hover:text-red-600 font-bold mt-2" }, " Shopping Cart ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_NuxtLink, { to: "/tracking" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-sm text-gray-50 hover:text-red-600 font-bold mt-2"${_scopeId2}> Track order </div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-sm text-gray-50 hover:text-red-600 font-bold mt-2" }, " Track order ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              unref(themeStore).collapseMenu ? (openBlock(), createBlock("div", {
                key: 0,
                ref_key: "expanded",
                ref: expanded,
                class: "flex lg:hidden md:hidden flex-col w-full rounded-lg px-3 pb-3"
              }, [
                createVNode("div", { class: "flex flex-col items-center justify-center bg-[#0c203a] dark:bg-slate-800 px-5 py-1" }, [
                  createVNode(_component_NuxtLink, { to: "/" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-sm text-gray-50 hover:text-red-600 font-bold mt-2" }, " Home ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtLink, { to: "/auth/login" }, {
                    default: withCtx(() => [
                      !unref(authStore).isLoggedIn ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: ["text-sm text-gray-50 hover:text-red-600 font-bold mt-2", unref(authStore).isLoggedIn ? "hidden" : "block"]
                      }, " Signin ", 2)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtLink, { to: "/dashboard/account" }, {
                    default: withCtx(() => [
                      unref(authStore).isLoggedIn ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: ["text-sm text-gray-50 hover:text-red-600 font-bold mt-2", !unref(authStore).isLoggedIn ? "hidden" : "block"]
                      }, " Account ", 2)) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }),
                  unref(authStore).isLoggedIn ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: ["text-sm text-gray-50 hover:text-red-600 font-bold mt-2 cursor-pointer", !unref(authStore).isLoggedIn ? "hidden" : "block"],
                    onClick: ($event) => unref(authStore).logMeOut()
                  }, " Logout ", 10, ["onClick"])) : createCommentVNode("", true),
                  createVNode(_component_NuxtLink, { to: "/about" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-sm text-gray-50 hover:text-red-600 font-bold mt-2" }, " About Us ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtLink, { to: "/contact" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-sm text-gray-50 hover:text-red-600 font-bold mt-2" }, " Contact Us ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtLink, { to: "/" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-sm text-gray-50 hover:text-red-600 font-bold mt-2" }, " Shopping Cart ")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_NuxtLink, { to: "/tracking" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-sm text-gray-50 hover:text-red-600 font-bold mt-2" }, " Track order ")
                    ]),
                    _: 1
                  })
                ])
              ], 512)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  emits: ["openAlertCart"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const cartStore = useCartStore();
    const menuFooter = [
      {
        id: 1,
        title: "profile",
        child: [
          {
            name: "Home",
            do: function() {
              navigateTo("/");
            }
          },
          {
            name: "Shopping Cart",
            do: function() {
              if (cartStore.items.length > 0) {
                navigateTo("/cart");
              } else {
                emit("openAlertCart");
              }
            }
          },
          {
            name: "Track order",
            do: function() {
              navigateTo("/tracking");
            }
          }
        ]
      },
      {
        id: 2,
        title: "Terms",
        child: [
          {
            name: "About Us",
            do: function() {
              navigateTo("/about");
            }
          },
          {
            name: "Contact Us",
            do: function() {
              navigateTo("/contact");
            }
          },
          {
            name: "Terms and Conditions",
            do: function() {
              navigateTo("/terms");
            }
          },
          {
            name: "Privacy Policy",
            do: function() {
              navigateTo("/privacy-policy");
            }
          },
          {
            name: "Return Policy",
            do: function() {
              navigateTo("/return-policy");
            }
          }
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-14" }, _attrs))}><div class="flex flex-col lg:flex-row md:flex-row w-full items-center justify-between bg-[#002453] dark:bg-slate-950 py-4 px-5 border-b border-gray-600 dark:border-gray-700">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-3Rjv7fjDPf2WbW8KIVU5rN_dsRmAOkc1KZQeVq50sOUpcssKy6bDB0yH3V_nuxEJ6KEb6m3jdkl5gh9IVf2AK1HI8bl9v9y6Zf0TrQtzsML0F7O4PgplMSeMQ4RkQUjQbc40_cgyoaxnIlvpnMxM-1nGVWs9Wc1bMYxqnujKHfL2BG2vsuGwbdFunS7/s16000/logo-footer.png",
        class: "h-8 w-auto object-fill ml-5"
      }, null, _parent));
      _push(`<div class="flex flex-col lg:flex-row md:flex-row items-center gap-2 mt-2 lg:mt-0 md:mt-0"><p class="text-sm lg:text-base md:text-base font-semibold text-gray-50 dark:text-gray-100"> Payment Method </p>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhC7xon26NcXMMzcGT5yahEeC64oaClFke8uWW55GFW4BtAc6wVwKXyqtNODQX2eX8HTtBZdV3HAIqQZG2ZbRquUpcNQqPA1AxsMqn2hnGqXTe5Byw8LhjU-NdoKsvYOZfD8l-fgMBVKpbIq71v4QCkRkV2d5pxZ4R19lhE6kyG4HZ0AuGQ_DSLUiYJnIr6/s16000/Untitled-3.png",
        class: "h-8 w-auto object-fill"
      }, null, _parent));
      _push(`</div></div><div class="grid grid-cols-1 lg:grid-cols-10 md:grid-cols-10 w-full justify-center px-10 lg:px-16 md:px-16 pt-5 pb-5 lg:pb-5 md:pb-5 bg-[#002453] dark:bg-slate-950"><div class="col-span-1 lg:col-span-8 md:col-span-8 w-full justify-center px-5"><div class="grid grid-cols-2 space-x-3 w-full justify-center"><!--[-->`);
      ssrRenderList(menuFooter, (menu) => {
        _push(`<ul class="w-full list-none space-y-2"><!--[-->`);
        ssrRenderList(menu.child, (child) => {
          _push(`<li class="text-sm font-bold text-gray-50 cursor-pointer hover:text-red-600"><p>${ssrInterpolate(child.name)}</p></li>`);
        });
        _push(`<!--]--></ul>`);
      });
      _push(`<!--]--></div></div><div class="col-span-2 flex flex-col items-center lg:items-end md:items-end w-full px-5 mt-6 lg:mt-0 md:mt-0"><p class="text-gray-50">1581 Commerce St. Corona CA 92880</p></div></div><div class="flex items-center justify-center bg-[#002453] dark:bg-slate-950 border-t border-gray-600 dark:border-gray-700 pt-4 pb-20 lg:pb-5 md:pb-5"><p class="text-xs text-gray-200"> Copyright \xA9 ${ssrInterpolate(unref(dayjs)().year())} Dentestore.com. All Rights Reserved. </p></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "BottomNav",
  __ssrInlineRender: true,
  setup(__props) {
    useCartStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full lg:hidden md:hidden" }, _attrs))}><div class="fixed bottom-0 w-full h-14 z-50"><div class="grid grid-cols-10 w-full h-full items-center justify-center"><div class="col-span-5 flex h-full items-center justify-center bg-green-900 hover:bg-green-700"><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "material-symbols:shopping-bag-outline",
        class: "h-5 w-5 text-gray-50"
      }, null, _parent));
      _push(`<p class="text-sm font-semibold text-gray-50">Add To Cart</p></div></div><div class="col-span-5 flex h-full items-center justify-center bg-blue-800 hover:bg-blue-600"><div class="flex"><p class="text-sm font-semibold text-gray-50">Buy Now</p></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/BottomNav.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AlertModal",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      require: true
    },
    types: {
      type: String,
      require: true,
      default: "info"
    },
    showTypes: {
      type: Boolean,
      default: true
    },
    isBtnAction: {
      type: Boolean,
      default: false
    },
    labelActionBtn: {
      type: String,
      require: true,
      default: "OK"
    },
    title: {
      type: String
    },
    message: {
      type: String
    }
  },
  emits: ["closeAlert", "btnAction"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    function closeAlert() {
      emit("closeAlert");
    }
    function btnAction() {
      emit("btnAction");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeadlessTransitionRoot = Se;
      const _component_HeadlessDialog = Ye;
      const _component_HeadlessTransitionChild = he;
      const _component_HeadlessDialogPanel = Ge;
      const _component_Icon = __nuxt_component_4;
      _push(ssrRenderComponent(_component_HeadlessTransitionRoot, mergeProps({
        appear: "",
        show: props.isOpen,
        as: "template"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_HeadlessDialog, {
              as: "div",
              onClose: closeAlert,
              class: "relative z-[999]"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_HeadlessTransitionChild, {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fixed inset-0 bg-black/25"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fixed inset-0 bg-black/25" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="fixed inset-0 overflow-y-auto"${_scopeId2}><div class="flex min-h-full items-center justify-center p-4 text-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_HeadlessTransitionChild, {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0 scale-95",
                    "enter-to": "opacity-100 scale-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100 scale-100",
                    "leave-to": "opacity-0 scale-95"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_HeadlessDialogPanel, { class: "w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all border border-gray-500 dark:border-gray-700" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex flex-col items-center text-center justify-center py-10"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_Icon, {
                                name: props.types === "success" ? "material-symbols:check-circle-outline" : props.types === "warning" ? "material-symbols:warning" : props.types === "error" ? "material-symbols:cancel-outline-rounded" : "mingcute:warning-fill",
                                class: [
                                  "h-20 w-20",
                                  props.types === "success" ? "text-green-600" : props.types === "warning" ? "text-yellow-600" : props.types === "error" ? "text-red-600" : "text-blue-700"
                                ]
                              }, null, _parent5, _scopeId4));
                              _push5(`<h1 class="mt-3 text-xl text-gray-900 dark:text-gray-50 font-semibold capitalize"${_scopeId4}>${ssrInterpolate(props.showTypes ? props.types : "")} ${ssrInterpolate(props.title)}</h1><p class="text-gray-900 dark:text-gray-50 mt-2"${_scopeId4}>${ssrInterpolate(props.message)}</p><div class="flex items-center justify-center gap-2 mt-5"${_scopeId4}>`);
                              if (props.isBtnAction) {
                                _push5(`<button type="button" class="inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"${_scopeId4}>${ssrInterpolate(props.labelActionBtn)}</button>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`<button type="button" class="inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md"${_scopeId4}> Close </button></div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex flex-col items-center text-center justify-center py-10" }, [
                                  createVNode(_component_Icon, {
                                    name: props.types === "success" ? "material-symbols:check-circle-outline" : props.types === "warning" ? "material-symbols:warning" : props.types === "error" ? "material-symbols:cancel-outline-rounded" : "mingcute:warning-fill",
                                    class: [
                                      "h-20 w-20",
                                      props.types === "success" ? "text-green-600" : props.types === "warning" ? "text-yellow-600" : props.types === "error" ? "text-red-600" : "text-blue-700"
                                    ]
                                  }, null, 8, ["name", "class"]),
                                  createVNode("h1", { class: "mt-3 text-xl text-gray-900 dark:text-gray-50 font-semibold capitalize" }, toDisplayString(props.showTypes ? props.types : "") + " " + toDisplayString(props.title), 1),
                                  createVNode("p", { class: "text-gray-900 dark:text-gray-50 mt-2" }, toDisplayString(props.message), 1),
                                  createVNode("div", { class: "flex items-center justify-center gap-2 mt-5" }, [
                                    props.isBtnAction ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      type: "button",
                                      class: "inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3",
                                      onClick: btnAction
                                    }, toDisplayString(props.labelActionBtn), 1)) : createCommentVNode("", true),
                                    createVNode("button", {
                                      type: "button",
                                      class: "inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md",
                                      onClick: closeAlert
                                    }, " Close ")
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_HeadlessDialogPanel, { class: "w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all border border-gray-500 dark:border-gray-700" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col items-center text-center justify-center py-10" }, [
                                createVNode(_component_Icon, {
                                  name: props.types === "success" ? "material-symbols:check-circle-outline" : props.types === "warning" ? "material-symbols:warning" : props.types === "error" ? "material-symbols:cancel-outline-rounded" : "mingcute:warning-fill",
                                  class: [
                                    "h-20 w-20",
                                    props.types === "success" ? "text-green-600" : props.types === "warning" ? "text-yellow-600" : props.types === "error" ? "text-red-600" : "text-blue-700"
                                  ]
                                }, null, 8, ["name", "class"]),
                                createVNode("h1", { class: "mt-3 text-xl text-gray-900 dark:text-gray-50 font-semibold capitalize" }, toDisplayString(props.showTypes ? props.types : "") + " " + toDisplayString(props.title), 1),
                                createVNode("p", { class: "text-gray-900 dark:text-gray-50 mt-2" }, toDisplayString(props.message), 1),
                                createVNode("div", { class: "flex items-center justify-center gap-2 mt-5" }, [
                                  props.isBtnAction ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    type: "button",
                                    class: "inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3",
                                    onClick: btnAction
                                  }, toDisplayString(props.labelActionBtn), 1)) : createCommentVNode("", true),
                                  createVNode("button", {
                                    type: "button",
                                    class: "inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md",
                                    onClick: closeAlert
                                  }, " Close ")
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode(_component_HeadlessTransitionChild, {
                      as: "template",
                      enter: "duration-300 ease-out",
                      "enter-from": "opacity-0",
                      "enter-to": "opacity-100",
                      leave: "duration-200 ease-in",
                      "leave-from": "opacity-100",
                      "leave-to": "opacity-0"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fixed inset-0 bg-black/25" })
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                      createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                        createVNode(_component_HeadlessTransitionChild, {
                          as: "template",
                          enter: "duration-300 ease-out",
                          "enter-from": "opacity-0 scale-95",
                          "enter-to": "opacity-100 scale-100",
                          leave: "duration-200 ease-in",
                          "leave-from": "opacity-100 scale-100",
                          "leave-to": "opacity-0 scale-95"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_HeadlessDialogPanel, { class: "w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all border border-gray-500 dark:border-gray-700" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex flex-col items-center text-center justify-center py-10" }, [
                                  createVNode(_component_Icon, {
                                    name: props.types === "success" ? "material-symbols:check-circle-outline" : props.types === "warning" ? "material-symbols:warning" : props.types === "error" ? "material-symbols:cancel-outline-rounded" : "mingcute:warning-fill",
                                    class: [
                                      "h-20 w-20",
                                      props.types === "success" ? "text-green-600" : props.types === "warning" ? "text-yellow-600" : props.types === "error" ? "text-red-600" : "text-blue-700"
                                    ]
                                  }, null, 8, ["name", "class"]),
                                  createVNode("h1", { class: "mt-3 text-xl text-gray-900 dark:text-gray-50 font-semibold capitalize" }, toDisplayString(props.showTypes ? props.types : "") + " " + toDisplayString(props.title), 1),
                                  createVNode("p", { class: "text-gray-900 dark:text-gray-50 mt-2" }, toDisplayString(props.message), 1),
                                  createVNode("div", { class: "flex items-center justify-center gap-2 mt-5" }, [
                                    props.isBtnAction ? (openBlock(), createBlock("button", {
                                      key: 0,
                                      type: "button",
                                      class: "inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3",
                                      onClick: btnAction
                                    }, toDisplayString(props.labelActionBtn), 1)) : createCommentVNode("", true),
                                    createVNode("button", {
                                      type: "button",
                                      class: "inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md",
                                      onClick: closeAlert
                                    }, " Close ")
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_HeadlessDialog, {
                as: "div",
                onClose: closeAlert,
                class: "relative z-[999]"
              }, {
                default: withCtx(() => [
                  createVNode(_component_HeadlessTransitionChild, {
                    as: "template",
                    enter: "duration-300 ease-out",
                    "enter-from": "opacity-0",
                    "enter-to": "opacity-100",
                    leave: "duration-200 ease-in",
                    "leave-from": "opacity-100",
                    "leave-to": "opacity-0"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fixed inset-0 bg-black/25" })
                    ]),
                    _: 1
                  }),
                  createVNode("div", { class: "fixed inset-0 overflow-y-auto" }, [
                    createVNode("div", { class: "flex min-h-full items-center justify-center p-4 text-center" }, [
                      createVNode(_component_HeadlessTransitionChild, {
                        as: "template",
                        enter: "duration-300 ease-out",
                        "enter-from": "opacity-0 scale-95",
                        "enter-to": "opacity-100 scale-100",
                        leave: "duration-200 ease-in",
                        "leave-from": "opacity-100 scale-100",
                        "leave-to": "opacity-0 scale-95"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_HeadlessDialogPanel, { class: "w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-900 p-6 text-left align-middle shadow-xl transition-all border border-gray-500 dark:border-gray-700" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex flex-col items-center text-center justify-center py-10" }, [
                                createVNode(_component_Icon, {
                                  name: props.types === "success" ? "material-symbols:check-circle-outline" : props.types === "warning" ? "material-symbols:warning" : props.types === "error" ? "material-symbols:cancel-outline-rounded" : "mingcute:warning-fill",
                                  class: [
                                    "h-20 w-20",
                                    props.types === "success" ? "text-green-600" : props.types === "warning" ? "text-yellow-600" : props.types === "error" ? "text-red-600" : "text-blue-700"
                                  ]
                                }, null, 8, ["name", "class"]),
                                createVNode("h1", { class: "mt-3 text-xl text-gray-900 dark:text-gray-50 font-semibold capitalize" }, toDisplayString(props.showTypes ? props.types : "") + " " + toDisplayString(props.title), 1),
                                createVNode("p", { class: "text-gray-900 dark:text-gray-50 mt-2" }, toDisplayString(props.message), 1),
                                createVNode("div", { class: "flex items-center justify-center gap-2 mt-5" }, [
                                  props.isBtnAction ? (openBlock(), createBlock("button", {
                                    key: 0,
                                    type: "button",
                                    class: "inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3",
                                    onClick: btnAction
                                  }, toDisplayString(props.labelActionBtn), 1)) : createCommentVNode("", true),
                                  createVNode("button", {
                                    type: "button",
                                    class: "inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md",
                                    onClick: closeAlert
                                  }, " Close ")
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AlertModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const themeStore = useThemeSettings();
    const cartStore = useCartStore();
    useAuthStore();
    const config = useRuntimeConfig();
    const foundCart = ref(false);
    useNuxtApp();
    config.public.metaPixel;
    function openAlertCart() {
      foundCart.value = true;
    }
    function closeAlertCart() {
      foundCart.value = false;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingSkeleton = _sfc_main$7;
      const _component_Header = _sfc_main$4;
      const _component_NuxtPage = __nuxt_component_2;
      const _component_Footer = _sfc_main$3;
      const _component_BottomNav = _sfc_main$2;
      const _component_ClientOnly = __nuxt_component_5;
      const _component_AlertModal = _sfc_main$1;
      if (unref(themeStore).isLoading) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-gray-50 dark:bg-slate-900" }, _attrs))} data-v-60b20166>`);
        _push(ssrRenderComponent(_component_LoadingSkeleton, { "row-count": 10 }, null, _parent));
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-gray-50 dark:bg-slate-900" }, _attrs))} data-v-60b20166>`);
        _push(ssrRenderComponent(_component_Header, { onOpenAlertCart: openAlertCart }, null, _parent));
        _push(`<div class="flex flex-col w-full h-full overflow-y-auto overflow-hidden bg-white px-2 py-2 lg:px-4 lg:py-4 md:px-4 md:py-4 dark:bg-gray-800" data-v-60b20166>`);
        _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_Footer, { onOpenAlertCart: openAlertCart }, null, _parent));
        if (unref(themeStore).isBottomNav) {
          _push(`<div data-v-60b20166>`);
          _push(ssrRenderComponent(_component_BottomNav, null, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        if (unref(themeStore).isBottomNav) {
          _push(`<div class="fixed inline-flex bottom-14 right-2 items-center lg:hidden md:hidden" data-v-60b20166><div class="relative" data-v-60b20166>`);
          _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
          if (unref(cartStore).isCartExist()) {
            _push(`<div class="absolute inline-flex -top-2 right-2 items-center text-center justify-center px-1.5 py-0.5 bg-green-600 rounded-full" data-v-60b20166><p class="text-xs font-bold text-gray-50" data-v-60b20166>${ssrInterpolate(unref(cartStore).totalQuantity())}</p></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_AlertModal, {
          "is-open": unref(foundCart),
          onCloseAlert: closeAlertCart,
          isBtnAction: false,
          "show-types": false,
          message: "There are no items in the cart yet. Please add items to the cart."
        }, null, _parent));
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-60b20166"]]);

export { _default as default };
//# sourceMappingURL=default-HUcblzJK.mjs.map

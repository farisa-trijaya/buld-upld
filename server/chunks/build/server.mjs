import { hasInjectionContext, inject, version, ref, watchEffect, watch, getCurrentInstance, toRef, isRef, defineAsyncComponent, defineComponent, h, computed, unref, provide, shallowReactive, Suspense, nextTick, Fragment, Transition, useSSRContext, readonly, mergeProps, withCtx, createVNode, createApp, effectScope, reactive, getCurrentScope, isReactive, toRaw, onMounted, onErrorCaptured, onServerPrefetch, resolveDynamicComponent, onScopeDispose, shallowRef, isReadonly, toRefs, markRaw, isShallow } from 'vue';
import { a2 as $fetch$1, a3 as hasProtocol, a4 as isScriptProtocol, a5 as joinURL, a6 as withQuery, k as createError$1, a7 as klona, a8 as defu, a9 as sanitizeStatusCode, aa as defuFn, ab as createHooks, ac as parse, ad as getRequestHeader, ae as destr, af as isEqual, b as setCookie, h as getCookie, a as deleteCookie, ag as toRouteMatcher, ah as createRouter$1 } from '../runtime.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { CapoPlugin, getActiveHead } from 'unhead';
import { defineHeadPlugin, composableNames } from '@unhead/shared';
import { useRoute as useRoute$1, RouterView, createMemoryHistory, createRouter, START_LOCATION } from 'vue-router';
import { EventBus } from '@primeuix/utils/eventbus';
import { dt, Theme, definePreset, ThemeService } from '@primeuix/styled';
import { mergeKeys } from '@primeuix/utils';
import { resolveFieldData, removeAccents, equals, resolve, isNotEmpty, minifyCSS } from '@primeuix/utils/object';
import { isClient, setAttributes, setAttribute, isExist } from '@primeuix/utils/dom';
import { deepPickUnsafe, deepOmitUnsafe } from 'deep-pick-omit';
import { _api, disableCache, addAPIProvider } from '@iconify/vue';
import dayjs from 'dayjs';
import vue3StarRatings from 'vue3-star-ratings';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';
import '@primevue/core/base/style';
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
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';

function createContext$1(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers$1.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers$1.delete(onLeave);
      }
    }
  };
}
function createNamespace$1(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext$1({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey$2 = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey$2] || (_globalThis$1[globalKey$2] = createNamespace$1());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey$1 = "__unctx_async_handlers__";
const asyncHandlers$1 = _globalThis$1[asyncHandlersKey$1] || (_globalThis$1[asyncHandlersKey$1] = /* @__PURE__ */ new Set());

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
const appPageTransition = { "name": "page", "mode": "out-in" };
const appLayoutTransition = false;
const appKeepalive = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink", "prefetch": true, "prefetchOn": { "visibility": true } };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  var _a;
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.13.2";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...((_a = options.ssrContext) == null ? void 0 : _a.payload) || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  var _a, _b, _c, _d;
  const resolvedPlugins = [];
  const unresolvedPlugins = [];
  const parallels = [];
  const errors = [];
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    var _a2;
    const unresolvedPluginsForThisPlugin = ((_a2 = plugin2.dependsOn) == null ? void 0 : _a2.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.includes(name))) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.push(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      });
      if (plugin2.parallel) {
        parallels.push(promise.catch((e) => errors.push(e)));
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) && ((_b = plugin2.env) == null ? void 0 : _b.islands) === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) && ((_d = plugin2.env) == null ? void 0 : _d.islands) === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (errors.length) {
    throw errors[0];
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup2, args) {
  const fn = () => args ? setup2(...args) : setup2();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  var _a;
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = (_a = getCurrentInstance()) == null ? void 0 : _a.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const LayoutMetaSymbol = Symbol("layout-meta");
const PageRouteSymbol = Symbol("route");
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = (options == null ? void 0 : options.external) || isExternalHost;
  if (isExternal) {
    if (!(options == null ? void 0 : options.external)) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(/"/g, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext._renderResponse = {
          statusCode: sanitizeStatusCode((options == null ? void 0 : options.redirectCode) || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options == null ? void 0 : options.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
function resolveRouteObject(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const nuxtApp = useNuxtApp();
    const error2 = useError();
    if (false) ;
    error2.value = error2.value || nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  return nuxtError;
};
version[0] === "3";
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function resolveUnrefHeadInput(ref2) {
  if (ref2 instanceof Promise || ref2 instanceof Date || ref2 instanceof RegExp)
    return ref2;
  const root = resolveUnref(ref2);
  if (!ref2 || !root)
    return root;
  if (Array.isArray(root))
    return root.map((r) => resolveUnrefHeadInput(r));
  if (typeof root === "object") {
    const resolved = {};
    for (const k in root) {
      if (!Object.prototype.hasOwnProperty.call(root, k)) {
        continue;
      }
      if (k === "titleTemplate" || k[0] === "o" && k[1] === "n") {
        resolved[k] = unref(root[k]);
        continue;
      }
      resolved[k] = resolveUnrefHeadInput(root[k]);
    }
    return resolved;
  }
  return root;
}
defineHeadPlugin({
  hooks: {
    "entries:resolve": (ctx) => {
      for (const entry2 of ctx.entries)
        entry2.resolvedInput = resolveUnrefHeadInput(entry2.input);
    }
  }
});
const headSymbol = "usehead";
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey$1 = "__unhead_injection_handler__";
function setHeadInjectionHandler(handler) {
  _global[globalKey$1] = handler;
}
function injectHead() {
  if (globalKey$1 in _global) {
    return _global[globalKey$1]();
  }
  const head = inject(headSymbol);
  if (!head && "production" !== "production")
    console.warn("Unhead is missing Vue context, falling back to shared context. This may have unexpected results.");
  return head || getActiveHead();
}
function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry2 = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry2.patch(e);
  });
  getCurrentInstance();
  return entry2;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
[CapoPlugin({ track: true })];
const unhead_KgADcZ0jPj = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    setHeadInjectionHandler(
      // need a fresh instance of the nuxt app to avoid parallel requests interfering with each other
      () => useNuxtApp().vueApp._context.provides.usehead
    );
    nuxtApp.vueApp.use(head);
  }
});
function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als && currentInstance === void 0) {
      const instance = als.getStore();
      if (instance !== void 0) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === void 0) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = void 0;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = void 0;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
_globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
  const restores = [];
  for (const leaveHandler of asyncHandlers) {
    const restore2 = leaveHandler();
    if (restore2) {
      restores.push(restore2);
    }
  }
  const restore = () => {
    for (const restore2 of restores) {
      restore2();
    }
  };
  let awaitable = function_();
  if (awaitable && typeof awaitable === "object" && "catch" in awaitable) {
    awaitable = awaitable.catch((error) => {
      restore();
      throw error;
    });
  }
  return [awaitable, restore];
}
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey$1 = (routeProps, override) => {
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === routeProps.Component.type;
  });
  const source = override ?? (matchedRoute == null ? void 0 : matchedRoute.meta.key) ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
async function getRouteRules(url) {
  {
    const _routeRulesMatcher = toRouteMatcher(
      createRouter$1({ routes: (/* @__PURE__ */ useRuntimeConfig()).nitro.routeRules })
    );
    return defu({}, ..._routeRulesMatcher.matchAll(url).reverse());
  }
}
const __nuxt_page_meta$8 = {
  layout: "auth",
  middleware: "auth"
};
const __nuxt_page_meta$7 = {
  layout: "auth",
  middleware: "auth"
};
const __nuxt_page_meta$6 = {
  layout: "auth",
  middleware: "auth"
};
const __nuxt_page_meta$5 = {
  layout: "auth",
  middleware: "auth"
};
const __nuxt_page_meta$4 = {
  layout: "auth",
  middleware: "auth"
};
const __nuxt_page_meta$3 = {
  layout: "auth",
  middleware: "auth"
};
const __nuxt_page_meta$2 = {
  layout: "default",
  title: "Cart",
  scrollToTop: true
};
const __nuxt_page_meta$1 = {
  layout: "default",
  middleware: ["dashboard"]
};
const __nuxt_page_meta = {
  layout: "default",
  title: "Home",
  scrollToTop: true
};
const _routes = [
  {
    name: "about",
    path: "/about",
    component: () => import('./about-Bn8kxeag.mjs')
  },
  {
    name: "auth-forgot",
    path: "/auth/forgot",
    meta: __nuxt_page_meta$8 || {},
    component: () => import('./forgot-dCKP9vkx.mjs')
  },
  {
    name: "auth-login",
    path: "/auth/login",
    meta: __nuxt_page_meta$7 || {},
    component: () => import('./login-D9Fl7nQk.mjs')
  },
  {
    name: "auth-verify-email",
    path: "/auth/verify-email",
    meta: __nuxt_page_meta$6 || {},
    component: () => import('./verify-email-DLun-mXa.mjs')
  },
  {
    name: "auth-verify-failed",
    path: "/auth/verify-failed",
    meta: __nuxt_page_meta$5 || {},
    component: () => import('./verify-failed-ue5IyCPV.mjs')
  },
  {
    name: "auth-verify-reset-success",
    path: "/auth/verify-reset-success",
    meta: __nuxt_page_meta$4 || {},
    component: () => import('./verify-reset-success-D-KiF3KO.mjs')
  },
  {
    name: "auth-verify-reset",
    path: "/auth/verify-reset",
    meta: __nuxt_page_meta$3 || {},
    component: () => import('./verify-reset-D3bSEufa.mjs')
  },
  {
    name: "cart",
    path: "/cart",
    meta: __nuxt_page_meta$2 || {},
    component: () => import('./cart-hcMfLEjf.mjs')
  },
  {
    name: "contact",
    path: "/contact",
    component: () => import('./contact-_F6huiUF.mjs')
  },
  {
    name: "dashboard-account",
    path: "/dashboard/account",
    meta: __nuxt_page_meta$1 || {},
    component: () => import('./account-D8GSyfsL.mjs')
  },
  {
    name: "index",
    path: "/",
    meta: __nuxt_page_meta || {},
    component: () => import('./index-BP_BIX6Q.mjs')
  },
  {
    name: "privacy-policy",
    path: "/privacy-policy",
    component: () => import('./privacy-policy-BYXY4wi7.mjs')
  },
  {
    name: "return-policy",
    path: "/return-policy",
    component: () => import('./return-policy-07dfCWde.mjs')
  },
  {
    name: "terms",
    path: "/terms",
    component: () => import('./terms-f8z6vzpy.mjs')
  },
  {
    name: "tracking",
    path: "/tracking",
    component: () => import('./tracking-xeV-XaYZ.mjs')
  }
];
const _wrapIf = (component, props, slots) => {
  props = props === true ? {} : props;
  return { default: () => {
    var _a;
    return props ? h(component, props, slots) : (_a = slots.default) == null ? void 0 : _a.call(slots);
  } };
};
function generateRouteKey(route) {
  const source = (route == null ? void 0 : route.meta.key) ?? route.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index2) => {
      var _a, _b;
      return comp.components && comp.components.default === ((_b = (_a = from.matched[index2]) == null ? void 0 : _a.components) == null ? void 0 : _b.default);
    }
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    var _a;
    const nuxtApp = useNuxtApp();
    const behavior = ((_a = useRouter().options) == null ? void 0 : _a.scrollBehaviorType) ?? "auto";
    let position = savedPosition || void 0;
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (!position && from && to && routeAllowsScrollToTop !== false && isChangingPage(to, from)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
      }
      return false;
    }
    const hasTransition = (route) => !!(route.meta.pageTransition ?? appPageTransition);
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve2) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await new Promise((resolve22) => setTimeout(resolve22, 0));
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior };
        }
        resolve2(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
const routerOptions1 = {
  // history: (base) => (false ? createMemoryHistory(base) : null),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0
      };
    }
  }
};
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0,
  ...routerOptions1
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  var _a;
  let __temp, __restore;
  if (!((_a = to.meta) == null ? void 0 : _a.validate)) {
    return;
  }
  const nuxtApp = useNuxtApp();
  const router = useRouter();
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    statusCode: result && result.statusCode || 404,
    statusMessage: result && result.statusMessage || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  const unsub = router.beforeResolve((final) => {
    unsub();
    if (final === to) {
      const unsub2 = router.afterEach(async () => {
        unsub2();
        await nuxtApp.runWithContext(() => showError(error));
      });
      return false;
    }
  });
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {
  auth: () => import('./auth-C0jf1-0H.mjs'),
  dashboard: () => import('./dashboard-Bq6RAgBi.mjs'),
  guest: () => import('./guest-CqrHjyKq.mjs')
};
const plugin$1 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    var _a, _b, _c;
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    if (routerOptions.hashMode && !routerBase.includes("#")) {
      routerBase += "#";
    }
    const history = ((_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    nuxtApp.hook("page:finish", syncCurrentRoute);
    router.afterEach((to, from) => {
      var _a2, _b2, _c2, _d;
      if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d.default)) {
        syncCurrentRoute();
      }
    });
    const route = {};
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware = nuxtApp._middleware || {
      global: [],
      named: {}
    };
    useError();
    if (!((_b = nuxtApp.ssrContext) == null ? void 0 : _b.islandContext)) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if ((failure == null ? void 0 : failure.type) === 4) {
          return;
        }
        if (to.matched.length === 0) {
          await nuxtApp.runWithContext(() => showError(createError$1({
            statusCode: 404,
            fatal: false,
            statusMessage: `Page not found: ${to.fullPath}`,
            data: {
              path: to.fullPath
            }
          })));
        } else if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if ((_c = nuxtApp.ssrContext) == null ? void 0 : _c.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      var _a2, _b2;
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!((_a2 = nuxtApp.ssrContext) == null ? void 0 : _a2.islandContext)) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        {
          const routeRules = await nuxtApp.runWithContext(() => getRouteRules(to.path));
          if (routeRules.appMiddleware) {
            for (const key in routeRules.appMiddleware) {
              if (routeRules.appMiddleware[key]) {
                middlewareEntries.add(key);
              } else {
                middlewareEntries.delete(key);
              }
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          const result = await nuxtApp.runWithContext(() => middleware(to, from));
          {
            if (result === false || result instanceof Error) {
              const error2 = result || createError$1({
                statusCode: 404,
                statusMessage: `Page Not Found: ${initialURL}`
              });
              await nuxtApp.runWithContext(() => showError(error2));
              return false;
            }
          }
          if (result === true) {
            continue;
          }
          if (result || result === false) {
            return result;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext._payloadReducers[name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_eJ33V7gbc6 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
const isVue2 = false;
/*!
 * pinia v2.2.4
 * (c) 2024 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin2) => _p.push(plugin2));
        toBeInstalled = [];
      }
    },
    use(plugin2) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin2);
      } else {
        _p.push(plugin2);
      }
      return this;
    },
    _p,
    // it's actually undefined here
    // @ts-expect-error
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
const ACTION_MARKER = Symbol();
const ACTION_NAME = Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  } else if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = (
  /* istanbul ignore next */
  Symbol()
);
function skipHydrate(obj) {
  return Object.defineProperty(obj, skipHydrateSymbol, {});
}
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup2() {
    if (!initialState && (!("production" !== "production"))) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup2, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup2, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = { deep: true };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production"))) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  const action = (fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  };
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(() => setup2({ action }))));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = action(prop, key);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
// @__NO_SIDE_EFFECTS__
function defineStore(idOrOptions, setup2, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup2 === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup2;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup2, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a;
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ?? (opts.filter = (key) => key === name);
  const cookies2 = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies2[name] ?? ((_a = opts.default) == null ? void 0 : _a.call(opts)));
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual(cookie.value, cookies2[name])) {
        return;
      }
      nuxtApp._cookies || (nuxtApp._cookies = {});
      if (name in nuxtApp._cookies) {
        if (isEqual(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const inlineConfig = {
  "nuxt": {},
  "icon": {
    "provider": "server",
    "class": "",
    "aliases": {},
    "iconifyApiEndpoint": "https://api.iconify.design",
    "localApiEndpoint": "/api/_nuxt_icon",
    "fallbackToApi": true,
    "cssSelectorPrefix": "i-",
    "cssWherePseudo": true,
    "mode": "css",
    "attrs": {
      "aria-hidden": true
    },
    "collections": [
      "academicons",
      "akar-icons",
      "ant-design",
      "arcticons",
      "basil",
      "bi",
      "bitcoin-icons",
      "bpmn",
      "brandico",
      "bx",
      "bxl",
      "bxs",
      "bytesize",
      "carbon",
      "catppuccin",
      "cbi",
      "charm",
      "ci",
      "cib",
      "cif",
      "cil",
      "circle-flags",
      "circum",
      "clarity",
      "codicon",
      "covid",
      "cryptocurrency",
      "cryptocurrency-color",
      "dashicons",
      "devicon",
      "devicon-plain",
      "ei",
      "el",
      "emojione",
      "emojione-monotone",
      "emojione-v1",
      "entypo",
      "entypo-social",
      "eos-icons",
      "ep",
      "et",
      "eva",
      "f7",
      "fa",
      "fa-brands",
      "fa-regular",
      "fa-solid",
      "fa6-brands",
      "fa6-regular",
      "fa6-solid",
      "fad",
      "fe",
      "feather",
      "file-icons",
      "flag",
      "flagpack",
      "flat-color-icons",
      "flat-ui",
      "flowbite",
      "fluent",
      "fluent-emoji",
      "fluent-emoji-flat",
      "fluent-emoji-high-contrast",
      "fluent-mdl2",
      "fontelico",
      "fontisto",
      "formkit",
      "foundation",
      "fxemoji",
      "gala",
      "game-icons",
      "geo",
      "gg",
      "gis",
      "gravity-ui",
      "gridicons",
      "grommet-icons",
      "guidance",
      "healthicons",
      "heroicons",
      "heroicons-outline",
      "heroicons-solid",
      "hugeicons",
      "humbleicons",
      "ic",
      "icomoon-free",
      "icon-park",
      "icon-park-outline",
      "icon-park-solid",
      "icon-park-twotone",
      "iconamoon",
      "iconoir",
      "icons8",
      "il",
      "ion",
      "iwwa",
      "jam",
      "la",
      "lets-icons",
      "line-md",
      "logos",
      "ls",
      "lucide",
      "lucide-lab",
      "mage",
      "majesticons",
      "maki",
      "map",
      "marketeq",
      "material-symbols",
      "material-symbols-light",
      "mdi",
      "mdi-light",
      "medical-icon",
      "memory",
      "meteocons",
      "mi",
      "mingcute",
      "mono-icons",
      "mynaui",
      "nimbus",
      "nonicons",
      "noto",
      "noto-v1",
      "octicon",
      "oi",
      "ooui",
      "openmoji",
      "oui",
      "pajamas",
      "pepicons",
      "pepicons-pencil",
      "pepicons-pop",
      "pepicons-print",
      "ph",
      "pixelarticons",
      "prime",
      "ps",
      "quill",
      "radix-icons",
      "raphael",
      "ri",
      "rivet-icons",
      "si-glyph",
      "simple-icons",
      "simple-line-icons",
      "skill-icons",
      "solar",
      "streamline",
      "streamline-emojis",
      "subway",
      "svg-spinners",
      "system-uicons",
      "tabler",
      "tdesign",
      "teenyicons",
      "token",
      "token-branded",
      "topcoat",
      "twemoji",
      "typcn",
      "uil",
      "uim",
      "uis",
      "uit",
      "uiw",
      "unjs",
      "vaadin",
      "vs",
      "vscode-icons",
      "websymbol",
      "weui",
      "whh",
      "wi",
      "wpf",
      "zmdi",
      "zondicons"
    ],
    "fetchTimeout": 500
  }
};
const __appConfig = /* @__PURE__ */ defuFn(inlineConfig);
function useAppConfig() {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp._appConfig) {
    nuxtApp._appConfig = klona(__appConfig);
  }
  return nuxtApp._appConfig;
}
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "pinia",
  setup(nuxtApp) {
    const pinia = createPinia();
    nuxtApp.vueApp.use(pinia);
    setActivePinia(pinia);
    {
      nuxtApp.payload.pinia = pinia.state.value;
    }
    return {
      provide: {
        pinia
      }
    };
  }
});
const LazyIcon = defineAsyncComponent(() => import('./index-BzxFm_el.mjs').then((r) => r["default"] || r.default || r));
const lazyGlobalComponents = [
  ["Icon", LazyIcon]
];
const components_plugin_KR1HBZs4kY = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components",
  setup(nuxtApp) {
    for (const [name, component] of lazyGlobalComponents) {
      nuxtApp.vueApp.component(name, component);
      nuxtApp.vueApp.component("Lazy" + name, component);
    }
  }
});
var FilterMatchMode = {
  STARTS_WITH: "startsWith",
  CONTAINS: "contains",
  NOT_CONTAINS: "notContains",
  ENDS_WITH: "endsWith",
  EQUALS: "equals",
  NOT_EQUALS: "notEquals",
  IN: "in",
  LESS_THAN: "lt",
  LESS_THAN_OR_EQUAL_TO: "lte",
  GREATER_THAN: "gt",
  GREATER_THAN_OR_EQUAL_TO: "gte",
  BETWEEN: "between",
  DATE_IS: "dateIs",
  DATE_IS_NOT: "dateIsNot",
  DATE_BEFORE: "dateBefore",
  DATE_AFTER: "dateAfter"
};
var FilterOperator = {
  AND: "and",
  OR: "or"
};
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray$1(r)) || e) {
      t && (r = t);
      var _n = 0, F = function F2() {
      };
      return { s: F, n: function n() {
        return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
      }, e: function e2(r2) {
        throw r2;
      }, f: F };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a = true, u = false;
  return { s: function s() {
    t = t.call(r);
  }, n: function n() {
    var r2 = t.next();
    return a = r2.done, r2;
  }, e: function e2(r2) {
    u = true, o = r2;
  }, f: function f() {
    try {
      a || null == t["return"] || t["return"]();
    } finally {
      if (u) throw o;
    }
  } };
}
function _unsupportedIterableToArray$1(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray$1(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray$1(r, a) : void 0;
  }
}
function _arrayLikeToArray$1(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
var FilterService = {
  filter: function filter(value, fields, filterValue, filterMatchMode, filterLocale) {
    var filteredItems = [];
    if (!value) {
      return filteredItems;
    }
    var _iterator = _createForOfIteratorHelper(value), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var item = _step.value;
        if (typeof item === "string") {
          if (this.filters[filterMatchMode](item, filterValue, filterLocale)) {
            filteredItems.push(item);
            continue;
          }
        } else {
          var _iterator2 = _createForOfIteratorHelper(fields), _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
              var field = _step2.value;
              var fieldValue = resolveFieldData(item, field);
              if (this.filters[filterMatchMode](fieldValue, filterValue, filterLocale)) {
                filteredItems.push(item);
                break;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return filteredItems;
  },
  filters: {
    startsWith: function startsWith(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.slice(0, filterValue.length) === filterValue;
    },
    contains: function contains(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) !== -1;
    },
    notContains: function notContains(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue) === -1;
    },
    endsWith: function endsWith(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      var filterValue = removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
      var stringValue = removeAccents(value.toString()).toLocaleLowerCase(filterLocale);
      return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
    },
    equals: function equals2(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2 === "") {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime) return value.getTime() === filter2.getTime();
      else return removeAccents(value.toString()).toLocaleLowerCase(filterLocale) == removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
    },
    notEquals: function notEquals(value, filter2, filterLocale) {
      if (filter2 === void 0 || filter2 === null || filter2 === "") {
        return false;
      }
      if (value === void 0 || value === null) {
        return true;
      }
      if (value.getTime && filter2.getTime) return value.getTime() !== filter2.getTime();
      else return removeAccents(value.toString()).toLocaleLowerCase(filterLocale) != removeAccents(filter2.toString()).toLocaleLowerCase(filterLocale);
    },
    "in": function _in(value, filter2) {
      if (filter2 === void 0 || filter2 === null || filter2.length === 0) {
        return true;
      }
      for (var i = 0; i < filter2.length; i++) {
        if (equals(value, filter2[i])) {
          return true;
        }
      }
      return false;
    },
    between: function between(value, filter2) {
      if (filter2 == null || filter2[0] == null || filter2[1] == null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime) return filter2[0].getTime() <= value.getTime() && value.getTime() <= filter2[1].getTime();
      else return filter2[0] <= value && value <= filter2[1];
    },
    lt: function lt(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime) return value.getTime() < filter2.getTime();
      else return value < filter2;
    },
    lte: function lte(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime) return value.getTime() <= filter2.getTime();
      else return value <= filter2;
    },
    gt: function gt(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime) return value.getTime() > filter2.getTime();
      else return value > filter2;
    },
    gte: function gte(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      if (value.getTime && filter2.getTime) return value.getTime() >= filter2.getTime();
      else return value >= filter2;
    },
    dateIs: function dateIs(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() === filter2.toDateString();
    },
    dateIsNot: function dateIsNot(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.toDateString() !== filter2.toDateString();
    },
    dateBefore: function dateBefore(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() < filter2.getTime();
    },
    dateAfter: function dateAfter(value, filter2) {
      if (filter2 === void 0 || filter2 === null) {
        return true;
      }
      if (value === void 0 || value === null) {
        return false;
      }
      return value.getTime() > filter2.getTime();
    }
  },
  register: function register(rule, fn) {
    this.filters[rule] = fn;
  }
};
function _typeof$3(o) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$3(o);
}
function ownKeys$3(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$3(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$3(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$3(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$3(e, r, t) {
  return (r = _toPropertyKey$3(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == _typeof$3(i) ? i : i + "";
}
function _toPrimitive$3(t, r) {
  if ("object" != _typeof$3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function tryOnMounted(fn) {
  var sync = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
  if (getCurrentInstance()) onMounted(fn);
  else if (sync) fn();
  else nextTick(fn);
}
var _id = 0;
function useStyle(css3) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var isLoaded = ref(false);
  var cssRef = ref(css3);
  var styleRef = ref(null);
  var defaultDocument = isClient() ? (void 0).document : void 0;
  var _options$document = options.document, document = _options$document === void 0 ? defaultDocument : _options$document, _options$immediate = options.immediate, immediate = _options$immediate === void 0 ? true : _options$immediate, _options$manual = options.manual, manual = _options$manual === void 0 ? false : _options$manual, _options$name = options.name, name = _options$name === void 0 ? "style_".concat(++_id) : _options$name, _options$id = options.id, id = _options$id === void 0 ? void 0 : _options$id, _options$media = options.media, media = _options$media === void 0 ? void 0 : _options$media, _options$nonce = options.nonce, nonce = _options$nonce === void 0 ? void 0 : _options$nonce, _options$first = options.first, first = _options$first === void 0 ? false : _options$first, _options$onMounted = options.onMounted, onStyleMounted = _options$onMounted === void 0 ? void 0 : _options$onMounted, _options$onUpdated = options.onUpdated, onStyleUpdated = _options$onUpdated === void 0 ? void 0 : _options$onUpdated, _options$onLoad = options.onLoad, onStyleLoaded = _options$onLoad === void 0 ? void 0 : _options$onLoad, _options$props = options.props, props = _options$props === void 0 ? {} : _options$props;
  var stop = function stop2() {
  };
  var load2 = function load22(_css) {
    var _props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!document) return;
    var _styleProps = _objectSpread$3(_objectSpread$3({}, props), _props);
    var _name = _styleProps.name || name, _id2 = _styleProps.id || id, _nonce = _styleProps.nonce || nonce;
    styleRef.value = document.querySelector('style[data-primevue-style-id="'.concat(_name, '"]')) || document.getElementById(_id2) || document.createElement("style");
    if (!styleRef.value.isConnected) {
      cssRef.value = _css || css3;
      setAttributes(styleRef.value, {
        type: "text/css",
        id: _id2,
        media,
        nonce: _nonce
      });
      first ? document.head.prepend(styleRef.value) : document.head.appendChild(styleRef.value);
      setAttribute(styleRef.value, "data-primevue-style-id", _name);
      setAttributes(styleRef.value, _styleProps);
      styleRef.value.onload = function(event) {
        return onStyleLoaded === null || onStyleLoaded === void 0 ? void 0 : onStyleLoaded(event, {
          name: _name
        });
      };
      onStyleMounted === null || onStyleMounted === void 0 || onStyleMounted(_name);
    }
    if (isLoaded.value) return;
    stop = watch(cssRef, function(value) {
      styleRef.value.textContent = value;
      onStyleUpdated === null || onStyleUpdated === void 0 || onStyleUpdated(_name);
    }, {
      immediate: true
    });
    isLoaded.value = true;
  };
  var unload = function unload2() {
    if (!document || !isLoaded.value) return;
    stop();
    isExist(styleRef.value) && document.head.removeChild(styleRef.value);
    isLoaded.value = false;
  };
  if (immediate && !manual) tryOnMounted(load2);
  return {
    id,
    name,
    el: styleRef,
    css: cssRef,
    unload,
    load: load2,
    isLoaded: readonly(isLoaded)
  };
}
function _typeof$2(o) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$2(o);
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e, n, i, u, a = [], f = true, o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) ;
      else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
    } catch (r2) {
      o = true, n = r2;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$2(e, r, t) {
  return (r = _toPropertyKey$2(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var theme = function theme2(_ref) {
  var dt2 = _ref.dt;
  return "\n* {\n    box-sizing: border-box;\n}\n\n/* Non vue overlay animations */\n.p-connected-overlay {\n    opacity: 0;\n    transform: scaleY(0.8);\n    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),\n        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n}\n\n.p-connected-overlay-visible {\n    opacity: 1;\n    transform: scaleY(1);\n}\n\n.p-connected-overlay-hidden {\n    opacity: 0;\n    transform: scaleY(1);\n    transition: opacity 0.1s linear;\n}\n\n/* Vue based overlay animations */\n.p-connected-overlay-enter-from {\n    opacity: 0;\n    transform: scaleY(0.8);\n}\n\n.p-connected-overlay-leave-to {\n    opacity: 0;\n}\n\n.p-connected-overlay-enter-active {\n    transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1),\n        opacity 0.12s cubic-bezier(0, 0, 0.2, 1);\n}\n\n.p-connected-overlay-leave-active {\n    transition: opacity 0.1s linear;\n}\n\n/* Toggleable Content */\n.p-toggleable-content-enter-from,\n.p-toggleable-content-leave-to {\n    max-height: 0;\n}\n\n.p-toggleable-content-enter-to,\n.p-toggleable-content-leave-from {\n    max-height: 1000px;\n}\n\n.p-toggleable-content-leave-active {\n    overflow: hidden;\n    transition: max-height 0.45s cubic-bezier(0, 1, 0, 1);\n}\n\n.p-toggleable-content-enter-active {\n    overflow: hidden;\n    transition: max-height 1s ease-in-out;\n}\n\n.p-disabled,\n.p-disabled * {\n    cursor: default;\n    pointer-events: none;\n    user-select: none;\n}\n\n.p-disabled,\n.p-component:disabled {\n    opacity: ".concat(dt2("disabled.opacity"), ";\n}\n\n.pi {\n    font-size: ").concat(dt2("icon.size"), ";\n}\n\n.p-icon {\n    width: ").concat(dt2("icon.size"), ";\n    height: ").concat(dt2("icon.size"), ";\n}\n\n.p-overlay-mask {\n    background: ").concat(dt2("mask.background"), ";\n    color: ").concat(dt2("mask.color"), ";\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n}\n\n.p-overlay-mask-enter {\n    animation: p-overlay-mask-enter-animation ").concat(dt2("mask.transition.duration"), " forwards;\n}\n\n.p-overlay-mask-leave {\n    animation: p-overlay-mask-leave-animation ").concat(dt2("mask.transition.duration"), " forwards;\n}\n\n@keyframes p-overlay-mask-enter-animation {\n    from {\n        background: transparent;\n    }\n    to {\n        background: ").concat(dt2("mask.background"), ";\n    }\n}\n@keyframes p-overlay-mask-leave-animation {\n    from {\n        background: ").concat(dt2("mask.background"), ";\n    }\n    to {\n        background: transparent;\n    }\n}\n");
};
var css = function css2(_ref2) {
  var dt2 = _ref2.dt;
  return "\n.p-hidden-accessible {\n    border: 0;\n    clip: rect(0 0 0 0);\n    height: 1px;\n    margin: -1px;\n    overflow: hidden;\n    padding: 0;\n    position: absolute;\n    width: 1px;\n}\n\n.p-hidden-accessible input,\n.p-hidden-accessible select {\n    transform: scale(0);\n}\n\n.p-overflow-hidden {\n    overflow: hidden;\n    padding-right: ".concat(dt2("scrollbar.width"), ";\n}\n");
};
var classes = {};
var inlineStyles = {};
var BaseStyle = {
  name: "base",
  css,
  theme,
  classes,
  inlineStyles,
  load: function load(style) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var transform = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function(cs) {
      return cs;
    };
    var computedStyle = transform(resolve(style, {
      dt
    }));
    return isNotEmpty(computedStyle) ? useStyle(minifyCSS(computedStyle), _objectSpread$2({
      name: this.name
    }, options)) : {};
  },
  loadCSS: function loadCSS() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    return this.load(this.css, options);
  },
  loadTheme: function loadTheme() {
    var _this = this;
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var style = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    return this.load(this.theme, options, function() {
      var computedStyle = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
      return Theme.transformCSS(options.name || _this.name, "".concat(computedStyle).concat(style));
    });
  },
  getCommonTheme: function getCommonTheme(params) {
    return Theme.getCommon(this.name, params);
  },
  getComponentTheme: function getComponentTheme(params) {
    return Theme.getComponent(this.name, params);
  },
  getDirectiveTheme: function getDirectiveTheme(params) {
    return Theme.getDirective(this.name, params);
  },
  getPresetTheme: function getPresetTheme(preset, selector, params) {
    return Theme.getCustomPreset(this.name, preset, selector, params);
  },
  getLayerOrderThemeCSS: function getLayerOrderThemeCSS() {
    return Theme.getLayerOrderCSS(this.name);
  },
  getStyleSheet: function getStyleSheet() {
    var extendedCSS = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "";
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.css) {
      var _css = resolve(this.css, {
        dt
      }) || "";
      var _style = minifyCSS("".concat(_css).concat(extendedCSS));
      var _props = Object.entries(props).reduce(function(acc, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2), k = _ref4[0], v = _ref4[1];
        return acc.push("".concat(k, '="').concat(v, '"')) && acc;
      }, []).join(" ");
      return isNotEmpty(_style) ? '<style type="text/css" data-primevue-style-id="'.concat(this.name, '" ').concat(_props, ">").concat(_style, "</style>") : "";
    }
    return "";
  },
  getCommonThemeStyleSheet: function getCommonThemeStyleSheet(params) {
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    return Theme.getCommonStyleSheet(this.name, params, props);
  },
  getThemeStyleSheet: function getThemeStyleSheet(params) {
    var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var css3 = [Theme.getStyleSheet(this.name, params, props)];
    if (this.theme) {
      var name = this.name === "base" ? "global-style" : "".concat(this.name, "-style");
      var _css = resolve(this.theme, {
        dt
      });
      var _style = minifyCSS(Theme.transformCSS(name, _css));
      var _props = Object.entries(props).reduce(function(acc, _ref5) {
        var _ref6 = _slicedToArray(_ref5, 2), k = _ref6[0], v = _ref6[1];
        return acc.push("".concat(k, '="').concat(v, '"')) && acc;
      }, []).join(" ");
      isNotEmpty(_style) && css3.push('<style type="text/css" data-primevue-style-id="'.concat(name, '" ').concat(_props, ">").concat(_style, "</style>"));
    }
    return css3.join("");
  },
  extend: function extend(style) {
    return _objectSpread$2(_objectSpread$2({}, this), {}, {
      css: void 0,
      theme: void 0
    }, style);
  }
};
var PrimeVueService = EventBus();
function _typeof$1(o) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof$1(o);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$1(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$1(e, r, t) {
  return (r = _toPropertyKey$1(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var defaultOptions = {
  ripple: false,
  inputStyle: null,
  inputVariant: null,
  locale: {
    startsWith: "Starts with",
    contains: "Contains",
    notContains: "Not contains",
    endsWith: "Ends with",
    equals: "Equals",
    notEquals: "Not equals",
    noFilter: "No Filter",
    lt: "Less than",
    lte: "Less than or equal to",
    gt: "Greater than",
    gte: "Greater than or equal to",
    dateIs: "Date is",
    dateIsNot: "Date is not",
    dateBefore: "Date is before",
    dateAfter: "Date is after",
    clear: "Clear",
    apply: "Apply",
    matchAll: "Match All",
    matchAny: "Match Any",
    addRule: "Add Rule",
    removeRule: "Remove Rule",
    accept: "Yes",
    reject: "No",
    choose: "Choose",
    upload: "Upload",
    cancel: "Cancel",
    completed: "Completed",
    pending: "Pending",
    fileSizeTypes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    chooseYear: "Choose Year",
    chooseMonth: "Choose Month",
    chooseDate: "Choose Date",
    prevDecade: "Previous Decade",
    nextDecade: "Next Decade",
    prevYear: "Previous Year",
    nextYear: "Next Year",
    prevMonth: "Previous Month",
    nextMonth: "Next Month",
    prevHour: "Previous Hour",
    nextHour: "Next Hour",
    prevMinute: "Previous Minute",
    nextMinute: "Next Minute",
    prevSecond: "Previous Second",
    nextSecond: "Next Second",
    am: "am",
    pm: "pm",
    today: "Today",
    weekHeader: "Wk",
    firstDayOfWeek: 0,
    showMonthAfterYear: false,
    dateFormat: "mm/dd/yy",
    weak: "Weak",
    medium: "Medium",
    strong: "Strong",
    passwordPrompt: "Enter a password",
    emptyFilterMessage: "No results found",
    searchMessage: "{0} results are available",
    selectionMessage: "{0} items selected",
    emptySelectionMessage: "No selected item",
    emptySearchMessage: "No results found",
    fileChosenMessage: "{0} files",
    noFileChosenMessage: "No file chosen",
    emptyMessage: "No available options",
    aria: {
      trueLabel: "True",
      falseLabel: "False",
      nullLabel: "Not Selected",
      star: "1 star",
      stars: "{star} stars",
      selectAll: "All items selected",
      unselectAll: "All items unselected",
      close: "Close",
      previous: "Previous",
      next: "Next",
      navigation: "Navigation",
      scrollTop: "Scroll Top",
      moveTop: "Move Top",
      moveUp: "Move Up",
      moveDown: "Move Down",
      moveBottom: "Move Bottom",
      moveToTarget: "Move to Target",
      moveToSource: "Move to Source",
      moveAllToTarget: "Move All to Target",
      moveAllToSource: "Move All to Source",
      pageLabel: "Page {page}",
      firstPageLabel: "First Page",
      lastPageLabel: "Last Page",
      nextPageLabel: "Next Page",
      prevPageLabel: "Previous Page",
      rowsPerPageLabel: "Rows per page",
      jumpToPageDropdownLabel: "Jump to Page Dropdown",
      jumpToPageInputLabel: "Jump to Page Input",
      selectRow: "Row Selected",
      unselectRow: "Row Unselected",
      expandRow: "Row Expanded",
      collapseRow: "Row Collapsed",
      showFilterMenu: "Show Filter Menu",
      hideFilterMenu: "Hide Filter Menu",
      filterOperator: "Filter Operator",
      filterConstraint: "Filter Constraint",
      editRow: "Row Edit",
      saveEdit: "Save Edit",
      cancelEdit: "Cancel Edit",
      listView: "List View",
      gridView: "Grid View",
      slide: "Slide",
      slideNumber: "{slideNumber}",
      zoomImage: "Zoom Image",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      rotateRight: "Rotate Right",
      rotateLeft: "Rotate Left",
      listLabel: "Option List"
    }
  },
  filterMatchModeOptions: {
    text: [FilterMatchMode.STARTS_WITH, FilterMatchMode.CONTAINS, FilterMatchMode.NOT_CONTAINS, FilterMatchMode.ENDS_WITH, FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS],
    numeric: [FilterMatchMode.EQUALS, FilterMatchMode.NOT_EQUALS, FilterMatchMode.LESS_THAN, FilterMatchMode.LESS_THAN_OR_EQUAL_TO, FilterMatchMode.GREATER_THAN, FilterMatchMode.GREATER_THAN_OR_EQUAL_TO],
    date: [FilterMatchMode.DATE_IS, FilterMatchMode.DATE_IS_NOT, FilterMatchMode.DATE_BEFORE, FilterMatchMode.DATE_AFTER]
  },
  zIndex: {
    modal: 1100,
    overlay: 1e3,
    menu: 1e3,
    tooltip: 1100
  },
  theme: void 0,
  unstyled: false,
  pt: void 0,
  ptOptions: {
    mergeSections: true,
    mergeProps: false
  },
  csp: {
    nonce: void 0
  }
};
var PrimeVueSymbol = Symbol();
function setup(app, options) {
  var PrimeVue2 = {
    config: reactive(options)
  };
  app.config.globalProperties.$primevue = PrimeVue2;
  app.provide(PrimeVueSymbol, PrimeVue2);
  clearConfig();
  setupConfig(app, PrimeVue2);
  return PrimeVue2;
}
var stopWatchers = [];
function clearConfig() {
  ThemeService.clear();
  stopWatchers.forEach(function(fn) {
    return fn === null || fn === void 0 ? void 0 : fn();
  });
  stopWatchers = [];
}
function setupConfig(app, PrimeVue2) {
  var isThemeChanged = ref(false);
  var loadCommonTheme = function loadCommonTheme2() {
    var _PrimeVue$config;
    if (((_PrimeVue$config = PrimeVue2.config) === null || _PrimeVue$config === void 0 ? void 0 : _PrimeVue$config.theme) === "none") return;
    if (!Theme.isStyleNameLoaded("common")) {
      var _BaseStyle$getCommonT, _PrimeVue$config2;
      var _ref = ((_BaseStyle$getCommonT = BaseStyle.getCommonTheme) === null || _BaseStyle$getCommonT === void 0 ? void 0 : _BaseStyle$getCommonT.call(BaseStyle)) || {}, primitive = _ref.primitive, semantic = _ref.semantic, global2 = _ref.global, style = _ref.style;
      var styleOptions = {
        nonce: (_PrimeVue$config2 = PrimeVue2.config) === null || _PrimeVue$config2 === void 0 || (_PrimeVue$config2 = _PrimeVue$config2.csp) === null || _PrimeVue$config2 === void 0 ? void 0 : _PrimeVue$config2.nonce
      };
      BaseStyle.load(primitive === null || primitive === void 0 ? void 0 : primitive.css, _objectSpread$1({
        name: "primitive-variables"
      }, styleOptions));
      BaseStyle.load(semantic === null || semantic === void 0 ? void 0 : semantic.css, _objectSpread$1({
        name: "semantic-variables"
      }, styleOptions));
      BaseStyle.load(global2 === null || global2 === void 0 ? void 0 : global2.css, _objectSpread$1({
        name: "global-variables"
      }, styleOptions));
      BaseStyle.loadTheme(_objectSpread$1({
        name: "global-style"
      }, styleOptions), style);
      Theme.setLoadedStyleName("common");
    }
  };
  ThemeService.on("theme:change", function(newTheme) {
    if (!isThemeChanged.value) {
      app.config.globalProperties.$primevue.config.theme = newTheme;
      isThemeChanged.value = true;
    }
  });
  var stopConfigWatcher = watch(PrimeVue2.config, function(newValue, oldValue) {
    PrimeVueService.emit("config:change", {
      newValue,
      oldValue
    });
  }, {
    immediate: true,
    deep: true
  });
  var stopRippleWatcher = watch(function() {
    return PrimeVue2.config.ripple;
  }, function(newValue, oldValue) {
    PrimeVueService.emit("config:ripple:change", {
      newValue,
      oldValue
    });
  }, {
    immediate: true,
    deep: true
  });
  var stopThemeWatcher = watch(function() {
    return PrimeVue2.config.theme;
  }, function(newValue, oldValue) {
    if (!isThemeChanged.value) {
      Theme.setTheme(newValue);
    }
    if (!PrimeVue2.config.unstyled) {
      loadCommonTheme();
    }
    isThemeChanged.value = false;
    PrimeVueService.emit("config:theme:change", {
      newValue,
      oldValue
    });
  }, {
    immediate: true,
    deep: true
  });
  var stopUnstyledWatcher = watch(function() {
    return PrimeVue2.config.unstyled;
  }, function(newValue, oldValue) {
    if (!newValue && PrimeVue2.config.theme) {
      loadCommonTheme();
    }
    PrimeVueService.emit("config:unstyled:change", {
      newValue,
      oldValue
    });
  }, {
    immediate: true,
    deep: true
  });
  stopWatchers.push(stopConfigWatcher);
  stopWatchers.push(stopRippleWatcher);
  stopWatchers.push(stopThemeWatcher);
  stopWatchers.push(stopUnstyledWatcher);
}
var PrimeVue = {
  install: function install(app, options) {
    var configOptions = mergeKeys(defaultOptions, options);
    setup(app, configOptions);
  }
};
var ConfirmationEventBus = EventBus();
var PrimeVueConfirmSymbol = Symbol();
var ConfirmationService = {
  install: function install2(app) {
    var ConfirmationService2 = {
      require: function require2(options) {
        ConfirmationEventBus.emit("confirm", options);
      },
      close: function close() {
        ConfirmationEventBus.emit("close");
      }
    };
    app.config.globalProperties.$confirm = ConfirmationService2;
    app.provide(PrimeVueConfirmSymbol, ConfirmationService2);
  }
};
var DynamicDialogEventBus = EventBus();
var PrimeVueDialogSymbol = Symbol();
var DialogService = {
  install: function install3(app) {
    var DialogService2 = {
      open: function open(content, options) {
        var instance = {
          content: content && markRaw(content),
          options: options || {},
          data: options && options.data,
          close: function close(params) {
            DynamicDialogEventBus.emit("close", {
              instance,
              params
            });
          }
        };
        DynamicDialogEventBus.emit("open", {
          instance
        });
        return instance;
      }
    };
    app.config.globalProperties.$dialog = DialogService2;
    app.provide(PrimeVueDialogSymbol, DialogService2);
  }
};
var ToastEventBus = EventBus();
var PrimeVueToastSymbol = Symbol();
function useToast() {
  var PrimeVueToast = inject(PrimeVueToastSymbol);
  if (!PrimeVueToast) {
    throw new Error("No PrimeVue Toast provided!");
  }
  return PrimeVueToast;
}
var ToastService = {
  install: function install4(app) {
    var ToastService2 = {
      add: function add(message) {
        ToastEventBus.emit("add", message);
      },
      remove: function remove(message) {
        ToastEventBus.emit("remove", message);
      },
      removeGroup: function removeGroup(group) {
        ToastEventBus.emit("remove-group", group);
      },
      removeAllGroups: function removeAllGroups() {
        ToastEventBus.emit("remove-all-groups");
      }
    };
    app.config.globalProperties.$toast = ToastService2;
    app.provide(PrimeVueToastSymbol, ToastService2);
  }
};
var index$1o = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  panel: {
    borderWidth: "0 0 1px 0",
    borderColor: "{content.border.color}"
  },
  header: {
    color: "{text.muted.color}",
    hoverColor: "{text.color}",
    activeColor: "{text.color}",
    padding: "1.125rem",
    fontWeight: "600",
    borderRadius: "0",
    borderWidth: "0",
    borderColor: "{content.border.color}",
    background: "{content.background}",
    hoverBackground: "{content.background}",
    activeBackground: "{content.background}",
    activeHoverBackground: "{content.background}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "-1px",
      shadow: "{focus.ring.shadow}"
    },
    toggleIcon: {
      color: "{text.muted.color}",
      hoverColor: "{text.color}",
      activeColor: "{text.color}",
      activeHoverColor: "{text.color}"
    },
    first: {
      topBorderRadius: "{content.border.radius}",
      borderWidth: "0"
    },
    last: {
      bottomBorderRadius: "{content.border.radius}",
      activeBottomBorderRadius: "0"
    }
  },
  content: {
    borderWidth: "0",
    borderColor: "{content.border.color}",
    background: "{content.background}",
    color: "{text.color}",
    padding: "0 1.125rem 1.125rem 1.125rem"
  }
};
var index$1n = {
  root: {
    background: "{form.field.background}",
    disabledBackground: "{form.field.disabled.background}",
    filledBackground: "{form.field.filled.background}",
    filledHoverBackground: "{form.field.filled.hover.background}",
    filledFocusBackground: "{form.field.filled.focus.background}",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.hover.border.color}",
    focusBorderColor: "{form.field.focus.border.color}",
    invalidBorderColor: "{form.field.invalid.border.color}",
    color: "{form.field.color}",
    disabledColor: "{form.field.disabled.color}",
    placeholderColor: "{form.field.placeholder.color}",
    shadow: "{form.field.shadow}",
    paddingX: "{form.field.padding.x}",
    paddingY: "{form.field.padding.y}",
    borderRadius: "{form.field.border.radius}",
    focusRing: {
      width: "{form.field.focus.ring.width}",
      style: "{form.field.focus.ring.style}",
      color: "{form.field.focus.ring.color}",
      offset: "{form.field.focus.ring.offset}",
      shadow: "{form.field.focus.ring.shadow}"
    },
    transitionDuration: "{form.field.transition.duration}"
  },
  overlay: {
    background: "{overlay.select.background}",
    borderColor: "{overlay.select.border.color}",
    borderRadius: "{overlay.select.border.radius}",
    color: "{overlay.select.color}",
    shadow: "{overlay.select.shadow}"
  },
  list: {
    padding: "{list.padding}",
    gap: "{list.gap}"
  },
  option: {
    focusBackground: "{list.option.focus.background}",
    selectedBackground: "{list.option.selected.background}",
    selectedFocusBackground: "{list.option.selected.focus.background}",
    color: "{list.option.color}",
    focusColor: "{list.option.focus.color}",
    selectedColor: "{list.option.selected.color}",
    selectedFocusColor: "{list.option.selected.focus.color}",
    padding: "{list.option.padding}",
    borderRadius: "{list.option.border.radius}"
  },
  optionGroup: {
    background: "{list.option.group.background}",
    color: "{list.option.group.color}",
    fontWeight: "{list.option.group.font.weight}",
    padding: "{list.option.group.padding}"
  },
  dropdown: {
    width: "2.5rem",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.border.color}",
    activeBorderColor: "{form.field.border.color}",
    borderRadius: "{form.field.border.radius}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  chip: {
    borderRadius: "{border.radius.sm}"
  },
  emptyMessage: {
    padding: "{list.option.padding}"
  },
  colorScheme: {
    light: {
      chip: {
        focusBackground: "{surface.200}",
        color: "{surface.800}"
      },
      dropdown: {
        background: "{surface.100}",
        hoverBackground: "{surface.200}",
        activeBackground: "{surface.300}",
        color: "{surface.600}",
        hoverColor: "{surface.700}",
        activeColor: "{surface.800}"
      }
    },
    dark: {
      chip: {
        focusBackground: "{surface.700}",
        color: "{surface.0}"
      },
      dropdown: {
        background: "{surface.800}",
        hoverBackground: "{surface.700}",
        activeBackground: "{surface.600}",
        color: "{surface.300}",
        hoverColor: "{surface.200}",
        activeColor: "{surface.100}"
      }
    }
  }
};
var index$1m = {
  root: {
    width: "2rem",
    height: "2rem",
    fontSize: "1rem",
    background: "{content.border.color}",
    borderRadius: "{content.border.radius}"
  },
  group: {
    borderColor: "{content.background}",
    offset: "-1rem"
  },
  lg: {
    width: "3rem",
    height: "3rem",
    fontSize: "1.5rem"
  },
  xl: {
    width: "4rem",
    height: "4rem",
    fontSize: "2rem"
  }
};
var index$1l = {
  root: {
    borderRadius: "{border.radius.md}",
    padding: "0 0.5rem",
    fontSize: "0.75rem",
    fontWeight: "700",
    minWidth: "1.5rem",
    height: "1.5rem"
  },
  dot: {
    size: "0.5rem"
  },
  sm: {
    fontSize: "0.625rem",
    minWidth: "1.25rem",
    height: "1.25rem"
  },
  lg: {
    fontSize: "0.875rem",
    minWidth: "1.75rem",
    height: "1.75rem"
  },
  xl: {
    fontSize: "1rem",
    minWidth: "2rem",
    height: "2rem"
  },
  colorScheme: {
    light: {
      primary: {
        background: "{primary.color}",
        color: "{primary.contrast.color}"
      },
      secondary: {
        background: "{surface.100}",
        color: "{surface.600}"
      },
      success: {
        background: "{green.500}",
        color: "{surface.0}"
      },
      info: {
        background: "{sky.500}",
        color: "{surface.0}"
      },
      warn: {
        background: "{orange.500}",
        color: "{surface.0}"
      },
      danger: {
        background: "{red.500}",
        color: "{surface.0}"
      },
      contrast: {
        background: "{surface.950}",
        color: "{surface.0}"
      }
    },
    dark: {
      primary: {
        background: "{primary.color}",
        color: "{primary.contrast.color}"
      },
      secondary: {
        background: "{surface.800}",
        color: "{surface.300}"
      },
      success: {
        background: "{green.400}",
        color: "{green.950}"
      },
      info: {
        background: "{sky.400}",
        color: "{sky.950}"
      },
      warn: {
        background: "{orange.400}",
        color: "{orange.950}"
      },
      danger: {
        background: "{red.400}",
        color: "{red.950}"
      },
      contrast: {
        background: "{surface.0}",
        color: "{surface.950}"
      }
    }
  }
};
var index$1k = {
  primitive: {
    borderRadius: {
      none: "0",
      xs: "2px",
      sm: "4px",
      md: "6px",
      lg: "8px",
      xl: "12px"
    },
    emerald: {
      50: "#ecfdf5",
      100: "#d1fae5",
      200: "#a7f3d0",
      300: "#6ee7b7",
      400: "#34d399",
      500: "#10b981",
      600: "#059669",
      700: "#047857",
      800: "#065f46",
      900: "#064e3b",
      950: "#022c22"
    },
    green: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
      950: "#052e16"
    },
    lime: {
      50: "#f7fee7",
      100: "#ecfccb",
      200: "#d9f99d",
      300: "#bef264",
      400: "#a3e635",
      500: "#84cc16",
      600: "#65a30d",
      700: "#4d7c0f",
      800: "#3f6212",
      900: "#365314",
      950: "#1a2e05"
    },
    red: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
      950: "#450a0a"
    },
    orange: {
      50: "#fff7ed",
      100: "#ffedd5",
      200: "#fed7aa",
      300: "#fdba74",
      400: "#fb923c",
      500: "#f97316",
      600: "#ea580c",
      700: "#c2410c",
      800: "#9a3412",
      900: "#7c2d12",
      950: "#431407"
    },
    amber: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
      950: "#451a03"
    },
    yellow: {
      50: "#fefce8",
      100: "#fef9c3",
      200: "#fef08a",
      300: "#fde047",
      400: "#facc15",
      500: "#eab308",
      600: "#ca8a04",
      700: "#a16207",
      800: "#854d0e",
      900: "#713f12",
      950: "#422006"
    },
    teal: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
      950: "#042f2e"
    },
    cyan: {
      50: "#ecfeff",
      100: "#cffafe",
      200: "#a5f3fc",
      300: "#67e8f9",
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
      700: "#0e7490",
      800: "#155e75",
      900: "#164e63",
      950: "#083344"
    },
    sky: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
      950: "#082f49"
    },
    blue: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554"
    },
    indigo: {
      50: "#eef2ff",
      100: "#e0e7ff",
      200: "#c7d2fe",
      300: "#a5b4fc",
      400: "#818cf8",
      500: "#6366f1",
      600: "#4f46e5",
      700: "#4338ca",
      800: "#3730a3",
      900: "#312e81",
      950: "#1e1b4b"
    },
    violet: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
      950: "#2e1065"
    },
    purple: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea",
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
      950: "#3b0764"
    },
    fuchsia: {
      50: "#fdf4ff",
      100: "#fae8ff",
      200: "#f5d0fe",
      300: "#f0abfc",
      400: "#e879f9",
      500: "#d946ef",
      600: "#c026d3",
      700: "#a21caf",
      800: "#86198f",
      900: "#701a75",
      950: "#4a044e"
    },
    pink: {
      50: "#fdf2f8",
      100: "#fce7f3",
      200: "#fbcfe8",
      300: "#f9a8d4",
      400: "#f472b6",
      500: "#ec4899",
      600: "#db2777",
      700: "#be185d",
      800: "#9d174d",
      900: "#831843",
      950: "#500724"
    },
    rose: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#9f1239",
      900: "#881337",
      950: "#4c0519"
    },
    slate: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617"
    },
    gray: {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827",
      950: "#030712"
    },
    zinc: {
      50: "#fafafa",
      100: "#f4f4f5",
      200: "#e4e4e7",
      300: "#d4d4d8",
      400: "#a1a1aa",
      500: "#71717a",
      600: "#52525b",
      700: "#3f3f46",
      800: "#27272a",
      900: "#18181b",
      950: "#09090b"
    },
    neutral: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#e5e5e5",
      300: "#d4d4d4",
      400: "#a3a3a3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
      950: "#0a0a0a"
    },
    stone: {
      50: "#fafaf9",
      100: "#f5f5f4",
      200: "#e7e5e4",
      300: "#d6d3d1",
      400: "#a8a29e",
      500: "#78716c",
      600: "#57534e",
      700: "#44403c",
      800: "#292524",
      900: "#1c1917",
      950: "#0c0a09"
    }
  },
  semantic: {
    transitionDuration: "0.2s",
    focusRing: {
      width: "1px",
      style: "solid",
      color: "{primary.color}",
      offset: "2px",
      shadow: "none"
    },
    disabledOpacity: "0.6",
    iconSize: "1rem",
    anchorGutter: "2px",
    primary: {
      50: "{emerald.50}",
      100: "{emerald.100}",
      200: "{emerald.200}",
      300: "{emerald.300}",
      400: "{emerald.400}",
      500: "{emerald.500}",
      600: "{emerald.600}",
      700: "{emerald.700}",
      800: "{emerald.800}",
      900: "{emerald.900}",
      950: "{emerald.950}"
    },
    formField: {
      paddingX: "0.75rem",
      paddingY: "0.5rem",
      borderRadius: "{border.radius.md}",
      focusRing: {
        width: "0",
        style: "none",
        color: "transparent",
        offset: "0",
        shadow: "none"
      },
      transitionDuration: "{transition.duration}"
    },
    list: {
      padding: "0.25rem 0.25rem",
      gap: "2px",
      header: {
        padding: "0.5rem 1rem 0.25rem 1rem"
      },
      option: {
        padding: "0.5rem 0.75rem",
        borderRadius: "{border.radius.sm}"
      },
      optionGroup: {
        padding: "0.5rem 0.75rem",
        fontWeight: "600"
      }
    },
    content: {
      borderRadius: "{border.radius.md}"
    },
    mask: {
      transitionDuration: "0.15s"
    },
    navigation: {
      list: {
        padding: "0.25rem 0.25rem",
        gap: "2px"
      },
      item: {
        padding: "0.5rem 0.75rem",
        borderRadius: "{border.radius.sm}",
        gap: "0.5rem"
      },
      submenuLabel: {
        padding: "0.5rem 0.75rem",
        fontWeight: "600"
      },
      submenuIcon: {
        size: "0.875rem"
      }
    },
    overlay: {
      select: {
        borderRadius: "{border.radius.md}",
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
      },
      popover: {
        borderRadius: "{border.radius.md}",
        padding: "0.75rem",
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
      },
      modal: {
        borderRadius: "{border.radius.xl}",
        padding: "1.25rem",
        shadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      },
      navigation: {
        shadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)"
      }
    },
    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
          50: "{slate.50}",
          100: "{slate.100}",
          200: "{slate.200}",
          300: "{slate.300}",
          400: "{slate.400}",
          500: "{slate.500}",
          600: "{slate.600}",
          700: "{slate.700}",
          800: "{slate.800}",
          900: "{slate.900}",
          950: "{slate.950}"
        },
        primary: {
          color: "{primary.500}",
          contrastColor: "#ffffff",
          hoverColor: "{primary.600}",
          activeColor: "{primary.700}"
        },
        highlight: {
          background: "{primary.50}",
          focusBackground: "{primary.100}",
          color: "{primary.700}",
          focusColor: "{primary.800}"
        },
        mask: {
          background: "rgba(0,0,0,0.4)",
          color: "{surface.200}"
        },
        formField: {
          background: "{surface.0}",
          disabledBackground: "{surface.200}",
          filledBackground: "{surface.50}",
          filledHoverBackground: "{surface.50}",
          filledFocusBackground: "{surface.50}",
          borderColor: "{surface.300}",
          hoverBorderColor: "{surface.400}",
          focusBorderColor: "{primary.color}",
          invalidBorderColor: "{red.400}",
          color: "{surface.700}",
          disabledColor: "{surface.500}",
          placeholderColor: "{surface.500}",
          floatLabelColor: "{surface.500}",
          floatLabelFocusColor: "{primary.600}",
          floatLabelActiveColor: "{surface.500}",
          floatLabelInvalidColor: "{red.400}",
          iconColor: "{surface.400}",
          shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"
        },
        text: {
          color: "{surface.700}",
          hoverColor: "{surface.800}",
          mutedColor: "{surface.500}",
          hoverMutedColor: "{surface.600}"
        },
        content: {
          background: "{surface.0}",
          hoverBackground: "{surface.100}",
          borderColor: "{surface.200}",
          color: "{text.color}",
          hoverColor: "{text.hover.color}"
        },
        overlay: {
          select: {
            background: "{surface.0}",
            borderColor: "{surface.200}",
            color: "{text.color}"
          },
          popover: {
            background: "{surface.0}",
            borderColor: "{surface.200}",
            color: "{text.color}"
          },
          modal: {
            background: "{surface.0}",
            borderColor: "{surface.200}",
            color: "{text.color}"
          }
        },
        list: {
          option: {
            focusBackground: "{surface.100}",
            selectedBackground: "{highlight.background}",
            selectedFocusBackground: "{highlight.focus.background}",
            color: "{text.color}",
            focusColor: "{text.hover.color}",
            selectedColor: "{highlight.color}",
            selectedFocusColor: "{highlight.focus.color}",
            icon: {
              color: "{surface.400}",
              focusColor: "{surface.500}"
            }
          },
          optionGroup: {
            background: "transparent",
            color: "{text.muted.color}"
          }
        },
        navigation: {
          item: {
            focusBackground: "{surface.100}",
            activeBackground: "{surface.100}",
            color: "{text.color}",
            focusColor: "{text.hover.color}",
            activeColor: "{text.hover.color}",
            icon: {
              color: "{surface.400}",
              focusColor: "{surface.500}",
              activeColor: "{surface.500}"
            }
          },
          submenuLabel: {
            background: "transparent",
            color: "{text.muted.color}"
          },
          submenuIcon: {
            color: "{surface.400}",
            focusColor: "{surface.500}",
            activeColor: "{surface.500}"
          }
        }
      },
      dark: {
        surface: {
          0: "#ffffff",
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}"
        },
        primary: {
          color: "{primary.400}",
          contrastColor: "{surface.900}",
          hoverColor: "{primary.300}",
          activeColor: "{primary.200}"
        },
        highlight: {
          background: "color-mix(in srgb, {primary.400}, transparent 84%)",
          focusBackground: "color-mix(in srgb, {primary.400}, transparent 76%)",
          color: "rgba(255,255,255,.87)",
          focusColor: "rgba(255,255,255,.87)"
        },
        mask: {
          background: "rgba(0,0,0,0.6)",
          color: "{surface.200}"
        },
        formField: {
          background: "{surface.950}",
          disabledBackground: "{surface.700}",
          filledBackground: "{surface.800}",
          filledHoverBackground: "{surface.800}",
          filledFocusBackground: "{surface.800}",
          borderColor: "{surface.700}",
          hoverBorderColor: "{surface.600}",
          focusBorderColor: "{primary.color}",
          invalidBorderColor: "{red.300}",
          color: "{surface.0}",
          disabledColor: "{surface.400}",
          placeholderColor: "{surface.400}",
          floatLabelColor: "{surface.400}",
          floatLabelFocusColor: "{primary.color}",
          floatLabelActiveColor: "{surface.400}",
          floatLabelInvalidColor: "{red.300}",
          iconColor: "{surface.400}",
          shadow: "0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgba(18, 18, 23, 0.05)"
        },
        text: {
          color: "{surface.0}",
          hoverColor: "{surface.0}",
          mutedColor: "{surface.400}",
          hoverMutedColor: "{surface.300}"
        },
        content: {
          background: "{surface.900}",
          hoverBackground: "{surface.800}",
          borderColor: "{surface.700}",
          color: "{text.color}",
          hoverColor: "{text.hover.color}"
        },
        overlay: {
          select: {
            background: "{surface.900}",
            borderColor: "{surface.700}",
            color: "{text.color}"
          },
          popover: {
            background: "{surface.900}",
            borderColor: "{surface.700}",
            color: "{text.color}"
          },
          modal: {
            background: "{surface.900}",
            borderColor: "{surface.700}",
            color: "{text.color}"
          }
        },
        list: {
          option: {
            focusBackground: "{surface.800}",
            selectedBackground: "{highlight.background}",
            selectedFocusBackground: "{highlight.focus.background}",
            color: "{text.color}",
            focusColor: "{text.hover.color}",
            selectedColor: "{highlight.color}",
            selectedFocusColor: "{highlight.focus.color}",
            icon: {
              color: "{surface.500}",
              focusColor: "{surface.400}"
            }
          },
          optionGroup: {
            background: "transparent",
            color: "{text.muted.color}"
          }
        },
        navigation: {
          item: {
            focusBackground: "{surface.800}",
            activeBackground: "{surface.800}",
            color: "{text.color}",
            focusColor: "{text.hover.color}",
            activeColor: "{text.hover.color}",
            icon: {
              color: "{surface.500}",
              focusColor: "{surface.400}",
              activeColor: "{surface.400}"
            }
          },
          submenuLabel: {
            background: "transparent",
            color: "{text.muted.color}"
          },
          submenuIcon: {
            color: "{surface.500}",
            focusColor: "{surface.400}",
            activeColor: "{surface.400}"
          }
        }
      }
    }
  }
};
var index$1j = {
  root: {
    borderRadius: "{content.border.radius}"
  }
};
var index$1i = {
  root: {
    padding: "1rem",
    background: "{content.background}",
    gap: "0.5rem",
    transitionDuration: "{transition.duration}"
  },
  item: {
    color: "{text.muted.color}",
    hoverColor: "{text.color}",
    borderRadius: "{content.border.radius}",
    gap: "{navigation.item.gap}",
    icon: {
      color: "{navigation.item.icon.color}",
      hoverColor: "{navigation.item.icon.focus.color}"
    },
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  separator: {
    color: "{navigation.item.icon.color}"
  }
};
var index$1h = {
  root: {
    borderRadius: "{form.field.border.radius}",
    roundedBorderRadius: "2rem",
    gap: "0.5rem",
    paddingX: "{form.field.padding.x}",
    paddingY: "{form.field.padding.y}",
    iconOnlyWidth: "2.5rem",
    sm: {
      fontSize: "0.875rem",
      paddingX: "0.625rem",
      paddingY: "0.375rem"
    },
    lg: {
      fontSize: "1.125rem",
      paddingX: "0.875rem",
      paddingY: "0.625rem"
    },
    label: {
      fontWeight: "500"
    },
    raisedShadow: "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      offset: "{focus.ring.offset}"
    },
    badgeSize: "1rem",
    transitionDuration: "{form.field.transition.duration}"
  },
  colorScheme: {
    light: {
      root: {
        primary: {
          background: "{primary.color}",
          hoverBackground: "{primary.hover.color}",
          activeBackground: "{primary.active.color}",
          borderColor: "{primary.color}",
          hoverBorderColor: "{primary.hover.color}",
          activeBorderColor: "{primary.active.color}",
          color: "{primary.contrast.color}",
          hoverColor: "{primary.contrast.color}",
          activeColor: "{primary.contrast.color}",
          focusRing: {
            color: "{primary.color}",
            shadow: "none"
          }
        },
        secondary: {
          background: "{surface.100}",
          hoverBackground: "{surface.200}",
          activeBackground: "{surface.300}",
          borderColor: "{surface.100}",
          hoverBorderColor: "{surface.200}",
          activeBorderColor: "{surface.300}",
          color: "{surface.600}",
          hoverColor: "{surface.700}",
          activeColor: "{surface.800}",
          focusRing: {
            color: "{surface.600}",
            shadow: "none"
          }
        },
        info: {
          background: "{sky.500}",
          hoverBackground: "{sky.600}",
          activeBackground: "{sky.700}",
          borderColor: "{sky.500}",
          hoverBorderColor: "{sky.600}",
          activeBorderColor: "{sky.700}",
          color: "#ffffff",
          hoverColor: "#ffffff",
          activeColor: "#ffffff",
          focusRing: {
            color: "{sky.500}",
            shadow: "none"
          }
        },
        success: {
          background: "{green.500}",
          hoverBackground: "{green.600}",
          activeBackground: "{green.700}",
          borderColor: "{green.500}",
          hoverBorderColor: "{green.600}",
          activeBorderColor: "{green.700}",
          color: "#ffffff",
          hoverColor: "#ffffff",
          activeColor: "#ffffff",
          focusRing: {
            color: "{green.500}",
            shadow: "none"
          }
        },
        warn: {
          background: "{orange.500}",
          hoverBackground: "{orange.600}",
          activeBackground: "{orange.700}",
          borderColor: "{orange.500}",
          hoverBorderColor: "{orange.600}",
          activeBorderColor: "{orange.700}",
          color: "#ffffff",
          hoverColor: "#ffffff",
          activeColor: "#ffffff",
          focusRing: {
            color: "{orange.500}",
            shadow: "none"
          }
        },
        help: {
          background: "{purple.500}",
          hoverBackground: "{purple.600}",
          activeBackground: "{purple.700}",
          borderColor: "{purple.500}",
          hoverBorderColor: "{purple.600}",
          activeBorderColor: "{purple.700}",
          color: "#ffffff",
          hoverColor: "#ffffff",
          activeColor: "#ffffff",
          focusRing: {
            color: "{purple.500}",
            shadow: "none"
          }
        },
        danger: {
          background: "{red.500}",
          hoverBackground: "{red.600}",
          activeBackground: "{red.700}",
          borderColor: "{red.500}",
          hoverBorderColor: "{red.600}",
          activeBorderColor: "{red.700}",
          color: "#ffffff",
          hoverColor: "#ffffff",
          activeColor: "#ffffff",
          focusRing: {
            color: "{red.500}",
            shadow: "none"
          }
        },
        contrast: {
          background: "{surface.950}",
          hoverBackground: "{surface.900}",
          activeBackground: "{surface.800}",
          borderColor: "{surface.950}",
          hoverBorderColor: "{surface.900}",
          activeBorderColor: "{surface.800}",
          color: "{surface.0}",
          hoverColor: "{surface.0}",
          activeColor: "{surface.0}",
          focusRing: {
            color: "{surface.950}",
            shadow: "none"
          }
        }
      },
      outlined: {
        primary: {
          hoverBackground: "{primary.50}",
          activeBackground: "{primary.100}",
          borderColor: "{primary.200}",
          color: "{primary.color}"
        },
        secondary: {
          hoverBackground: "{surface.50}",
          activeBackground: "{surface.100}",
          borderColor: "{surface.200}",
          color: "{surface.500}"
        },
        success: {
          hoverBackground: "{green.50}",
          activeBackground: "{green.100}",
          borderColor: "{green.200}",
          color: "{green.500}"
        },
        info: {
          hoverBackground: "{sky.50}",
          activeBackground: "{sky.100}",
          borderColor: "{sky.200}",
          color: "{sky.500}"
        },
        warn: {
          hoverBackground: "{orange.50}",
          activeBackground: "{orange.100}",
          borderColor: "{orange.200}",
          color: "{orange.500}"
        },
        help: {
          hoverBackground: "{purple.50}",
          activeBackground: "{purple.100}",
          borderColor: "{purple.200}",
          color: "{purple.500}"
        },
        danger: {
          hoverBackground: "{red.50}",
          activeBackground: "{red.100}",
          borderColor: "{red.200}",
          color: "{red.500}"
        },
        contrast: {
          hoverBackground: "{surface.50}",
          activeBackground: "{surface.100}",
          borderColor: "{surface.700}",
          color: "{surface.950}"
        },
        plain: {
          hoverBackground: "{surface.50}",
          activeBackground: "{surface.100}",
          borderColor: "{surface.200}",
          color: "{surface.700}"
        }
      },
      text: {
        primary: {
          hoverBackground: "{primary.50}",
          activeBackground: "{primary.100}",
          color: "{primary.color}"
        },
        secondary: {
          hoverBackground: "{surface.50}",
          activeBackground: "{surface.100}",
          color: "{surface.500}"
        },
        success: {
          hoverBackground: "{green.50}",
          activeBackground: "{green.100}",
          color: "{green.500}"
        },
        info: {
          hoverBackground: "{sky.50}",
          activeBackground: "{sky.100}",
          color: "{sky.500}"
        },
        warn: {
          hoverBackground: "{orange.50}",
          activeBackground: "{orange.100}",
          color: "{orange.500}"
        },
        help: {
          hoverBackground: "{purple.50}",
          activeBackground: "{purple.100}",
          color: "{purple.500}"
        },
        danger: {
          hoverBackground: "{red.50}",
          activeBackground: "{red.100}",
          color: "{red.500}"
        },
        plain: {
          hoverBackground: "{surface.50}",
          activeBackground: "{surface.100}",
          color: "{surface.700}"
        }
      },
      link: {
        color: "{primary.color}",
        hoverColor: "{primary.color}",
        activeColor: "{primary.color}"
      }
    },
    dark: {
      root: {
        primary: {
          background: "{primary.color}",
          hoverBackground: "{primary.hover.color}",
          activeBackground: "{primary.active.color}",
          borderColor: "{primary.color}",
          hoverBorderColor: "{primary.hover.color}",
          activeBorderColor: "{primary.active.color}",
          color: "{primary.contrast.color}",
          hoverColor: "{primary.contrast.color}",
          activeColor: "{primary.contrast.color}",
          focusRing: {
            color: "{primary.color}",
            shadow: "none"
          }
        },
        secondary: {
          background: "{surface.800}",
          hoverBackground: "{surface.700}",
          activeBackground: "{surface.600}",
          borderColor: "{surface.800}",
          hoverBorderColor: "{surface.700}",
          activeBorderColor: "{surface.600}",
          color: "{surface.300}",
          hoverColor: "{surface.200}",
          activeColor: "{surface.100}",
          focusRing: {
            color: "{surface.300}",
            shadow: "none"
          }
        },
        info: {
          background: "{sky.400}",
          hoverBackground: "{sky.300}",
          activeBackground: "{sky.200}",
          borderColor: "{sky.400}",
          hoverBorderColor: "{sky.300}",
          activeBorderColor: "{sky.200}",
          color: "{sky.950}",
          hoverColor: "{sky.950}",
          activeColor: "{sky.950}",
          focusRing: {
            color: "{sky.400}",
            shadow: "none"
          }
        },
        success: {
          background: "{green.400}",
          hoverBackground: "{green.300}",
          activeBackground: "{green.200}",
          borderColor: "{green.400}",
          hoverBorderColor: "{green.300}",
          activeBorderColor: "{green.200}",
          color: "{green.950}",
          hoverColor: "{green.950}",
          activeColor: "{green.950}",
          focusRing: {
            color: "{green.400}",
            shadow: "none"
          }
        },
        warn: {
          background: "{orange.400}",
          hoverBackground: "{orange.300}",
          activeBackground: "{orange.200}",
          borderColor: "{orange.400}",
          hoverBorderColor: "{orange.300}",
          activeBorderColor: "{orange.200}",
          color: "{orange.950}",
          hoverColor: "{orange.950}",
          activeColor: "{orange.950}",
          focusRing: {
            color: "{orange.400}",
            shadow: "none"
          }
        },
        help: {
          background: "{purple.400}",
          hoverBackground: "{purple.300}",
          activeBackground: "{purple.200}",
          borderColor: "{purple.400}",
          hoverBorderColor: "{purple.300}",
          activeBorderColor: "{purple.200}",
          color: "{purple.950}",
          hoverColor: "{purple.950}",
          activeColor: "{purple.950}",
          focusRing: {
            color: "{purple.400}",
            shadow: "none"
          }
        },
        danger: {
          background: "{red.400}",
          hoverBackground: "{red.300}",
          activeBackground: "{red.200}",
          borderColor: "{red.400}",
          hoverBorderColor: "{red.300}",
          activeBorderColor: "{red.200}",
          color: "{red.950}",
          hoverColor: "{red.950}",
          activeColor: "{red.950}",
          focusRing: {
            color: "{red.400}",
            shadow: "none"
          }
        },
        contrast: {
          background: "{surface.0}",
          hoverBackground: "{surface.100}",
          activeBackground: "{surface.200}",
          borderColor: "{surface.0}",
          hoverBorderColor: "{surface.100}",
          activeBorderColor: "{surface.200}",
          color: "{surface.950}",
          hoverColor: "{surface.950}",
          activeColor: "{surface.950}",
          focusRing: {
            color: "{surface.0}",
            shadow: "none"
          }
        }
      },
      outlined: {
        primary: {
          hoverBackground: "color-mix(in srgb, {primary.color}, transparent 96%)",
          activeBackground: "color-mix(in srgb, {primary.color}, transparent 84%)",
          borderColor: "{primary.700}",
          color: "{primary.color}"
        },
        secondary: {
          hoverBackground: "rgba(255,255,255,0.04)",
          activeBackground: "rgba(255,255,255,0.16)",
          borderColor: "{surface.700}",
          color: "{surface.400}"
        },
        success: {
          hoverBackground: "color-mix(in srgb, {green.400}, transparent 96%)",
          activeBackground: "color-mix(in srgb, {green.400}, transparent 84%)",
          borderColor: "{green.700}",
          color: "{green.400}"
        },
        info: {
          hoverBackground: "color-mix(in srgb, {sky.400}, transparent 96%)",
          activeBackground: "color-mix(in srgb, {sky.400}, transparent 84%)",
          borderColor: "{sky.700}",
          color: "{sky.400}"
        },
        warn: {
          hoverBackground: "color-mix(in srgb, {orange.400}, transparent 96%)",
          activeBackground: "color-mix(in srgb, {orange.400}, transparent 84%)",
          borderColor: "{orange.700}",
          color: "{orange.400}"
        },
        help: {
          hoverBackground: "color-mix(in srgb, {purple.400}, transparent 96%)",
          activeBackground: "color-mix(in srgb, {purple.400}, transparent 84%)",
          borderColor: "{purple.700}",
          color: "{purple.400}"
        },
        danger: {
          hoverBackground: "color-mix(in srgb, {red.400}, transparent 96%)",
          activeBackground: "color-mix(in srgb, {red.400}, transparent 84%)",
          borderColor: "{red.700}",
          color: "{red.400}"
        },
        contrast: {
          hoverBackground: "{surface.800}",
          activeBackground: "{surface.700}",
          borderColor: "{surface.500}",
          color: "{surface.0}"
        },
        plain: {
          hoverBackground: "{surface.800}",
          activeBackground: "{surface.700}",
          borderColor: "{surface.600}",
          color: "{surface.0}"
        }
      },
      text: {
        primary: {
          hoverBackground: "color-mix(in srgb, {primary.color}, transparent 96%)",
          activeBackground: "color-mix(in srgb, {primary.color}, transparent 84%)",
          color: "{primary.color}"
        },
        secondary: {
          hoverBackground: "{surface.800}",
          activeBackground: "{surface.700}",
          color: "{surface.400}"
        },
        success: {
          hoverBackground: "color-mix(in srgb, {green.400}, transparent 96%)",
          activeBackground: "color-mix(in srgb, {green.400}, transparent 84%)",
          color: "{green.400}"
        },
        info: {
          hoverBackground: "color-mix(in srgb, {sky.400}, transparent 96%)",
          activeBackground: "color-mix(in srgb, {sky.400}, transparent 84%)",
          color: "{sky.400}"
        },
        warn: {
          hoverBackground: "color-mix(in srgb, {orange.400}, transparent 96%)",
          activeBackground: "color-mix(in srgb, {orange.400}, transparent 84%)",
          color: "{orange.400}"
        },
        help: {
          hoverBackground: "color-mix(in srgb, {purple.400}, transparent 96%)",
          activeBackground: "color-mix(in srgb, {purple.400}, transparent 84%)",
          color: "{purple.400}"
        },
        danger: {
          hoverBackground: "color-mix(in srgb, {red.400}, transparent 96%)",
          activeBackground: "color-mix(in srgb, {red.400}, transparent 84%)",
          color: "{red.400}"
        },
        plain: {
          hoverBackground: "{surface.800}",
          activeBackground: "{surface.700}",
          color: "{surface.0}"
        }
      },
      link: {
        color: "{primary.color}",
        hoverColor: "{primary.color}",
        activeColor: "{primary.color}"
      }
    }
  }
};
var index$1g = {
  root: {
    background: "{content.background}",
    borderRadius: "{border.radius.xl}",
    color: "{content.color}",
    shadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
  },
  body: {
    padding: "1.25rem",
    gap: "0.5rem"
  },
  caption: {
    gap: "0.5rem"
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "500"
  },
  subtitle: {
    color: "{text.muted.color}"
  }
};
var index$1f = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  content: {
    gap: "0.25rem"
  },
  indicatorList: {
    padding: "1rem",
    gap: "0.5rem"
  },
  indicator: {
    width: "2rem",
    height: "0.5rem",
    borderRadius: "{content.border.radius}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  colorScheme: {
    light: {
      indicator: {
        background: "{surface.200}",
        hoverBackground: "{surface.300}",
        activeBackground: "{primary.color}"
      }
    },
    dark: {
      indicator: {
        background: "{surface.700}",
        hoverBackground: "{surface.600}",
        activeBackground: "{primary.color}"
      }
    }
  }
};
var index$1e = {
  root: {
    background: "{form.field.background}",
    disabledBackground: "{form.field.disabled.background}",
    filledBackground: "{form.field.filled.background}",
    filledHoverBackground: "{form.field.filled.hover.background}",
    filledFocusBackground: "{form.field.filled.focus.background}",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.hover.border.color}",
    focusBorderColor: "{form.field.focus.border.color}",
    invalidBorderColor: "{form.field.invalid.border.color}",
    color: "{form.field.color}",
    disabledColor: "{form.field.disabled.color}",
    placeholderColor: "{form.field.placeholder.color}",
    shadow: "{form.field.shadow}",
    paddingX: "{form.field.padding.x}",
    paddingY: "{form.field.padding.y}",
    borderRadius: "{form.field.border.radius}",
    focusRing: {
      width: "{form.field.focus.ring.width}",
      style: "{form.field.focus.ring.style}",
      color: "{form.field.focus.ring.color}",
      offset: "{form.field.focus.ring.offset}",
      shadow: "{form.field.focus.ring.shadow}"
    },
    transitionDuration: "{form.field.transition.duration}"
  },
  dropdown: {
    width: "2.5rem",
    color: "{form.field.icon.color}"
  },
  overlay: {
    background: "{overlay.select.background}",
    borderColor: "{overlay.select.border.color}",
    borderRadius: "{overlay.select.border.radius}",
    color: "{overlay.select.color}",
    shadow: "{overlay.select.shadow}"
  },
  list: {
    padding: "{list.padding}",
    gap: "{list.gap}",
    mobileIndent: "1rem"
  },
  option: {
    focusBackground: "{list.option.focus.background}",
    selectedBackground: "{list.option.selected.background}",
    selectedFocusBackground: "{list.option.selected.focus.background}",
    color: "{list.option.color}",
    focusColor: "{list.option.focus.color}",
    selectedColor: "{list.option.selected.color}",
    selectedFocusColor: "{list.option.selected.focus.color}",
    padding: "{list.option.padding}",
    borderRadius: "{list.option.border.radius}",
    icon: {
      color: "{list.option.icon.color}",
      focusColor: "{list.option.icon.focus.color}",
      size: "0.875rem"
    }
  }
};
var index$1d = {
  root: {
    borderRadius: "{border.radius.sm}",
    width: "1.25rem",
    height: "1.25rem",
    background: "{form.field.background}",
    checkedBackground: "{primary.color}",
    checkedHoverBackground: "{primary.hover.color}",
    disabledBackground: "{form.field.disabled.background}",
    filledBackground: "{form.field.filled.background}",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.hover.border.color}",
    focusBorderColor: "{form.field.border.color}",
    checkedBorderColor: "{primary.color}",
    checkedHoverBorderColor: "{primary.hover.color}",
    checkedFocusBorderColor: "{primary.color}",
    checkedDisabledBorderColor: "{form.field.border.color}",
    invalidBorderColor: "{form.field.invalid.border.color}",
    shadow: "{form.field.shadow}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    },
    transitionDuration: "{form.field.transition.duration}"
  },
  icon: {
    size: "0.875rem",
    color: "{form.field.color}",
    checkedColor: "{primary.contrast.color}",
    checkedHoverColor: "{primary.contrast.color}",
    disabledColor: "{form.field.disabled.color}"
  }
};
var index$1c = {
  root: {
    borderRadius: "16px",
    paddingX: "0.75rem",
    paddingY: "0.5rem",
    gap: "0.5rem",
    transitionDuration: "{transition.duration}"
  },
  image: {
    width: "2rem",
    height: "2rem"
  },
  icon: {
    size: "1rem"
  },
  removeIcon: {
    size: "1rem",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{form.field.focus.ring.shadow}"
    }
  },
  colorScheme: {
    light: {
      root: {
        background: "{surface.100}",
        color: "{surface.800}"
      },
      icon: {
        color: "{surface.800}"
      },
      removeIcon: {
        color: "{surface.800}"
      }
    },
    dark: {
      root: {
        background: "{surface.800}",
        color: "{surface.0}"
      },
      icon: {
        color: "{surface.0}"
      },
      removeIcon: {
        color: "{surface.0}"
      }
    }
  }
};
var index$1b = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  preview: {
    width: "1.5rem",
    height: "1.5rem",
    borderRadius: "{form.field.border.radius}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  panel: {
    shadow: "{overlay.popover.shadow}",
    borderRadius: "{overlay.popover.borderRadius}"
  },
  colorScheme: {
    light: {
      panel: {
        background: "{surface.800}",
        borderColor: "{surface.900}"
      },
      handle: {
        color: "{surface.0}"
      }
    },
    dark: {
      panel: {
        background: "{surface.900}",
        borderColor: "{surface.700}"
      },
      handle: {
        color: "{surface.0}"
      }
    }
  }
};
var index$1a = {
  icon: {
    size: "2rem",
    color: "{overlay.modal.color}"
  },
  content: {
    gap: "1rem"
  }
};
var index$19 = {
  root: {
    background: "{overlay.popover.background}",
    borderColor: "{overlay.popover.border.color}",
    color: "{overlay.popover.color}",
    borderRadius: "{overlay.popover.border.radius}",
    shadow: "{overlay.popover.shadow}",
    gutter: "10px",
    arrowOffset: "1.25rem"
  },
  content: {
    padding: "{overlay.popover.padding}",
    gap: "1rem"
  },
  icon: {
    size: "1.5rem",
    color: "{overlay.popover.color}"
  },
  footer: {
    gap: "0.5rem",
    padding: "0 {overlay.popover.padding} {overlay.popover.padding} {overlay.popover.padding}"
  }
};
var index$18 = {
  root: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    color: "{content.color}",
    borderRadius: "{content.border.radius}",
    shadow: "{overlay.navigation.shadow}",
    transitionDuration: "{transition.duration}"
  },
  list: {
    padding: "{navigation.list.padding}",
    gap: "{navigation.list.gap}"
  },
  item: {
    focusBackground: "{navigation.item.focus.background}",
    activeBackground: "{navigation.item.active.background}",
    color: "{navigation.item.color}",
    focusColor: "{navigation.item.focus.color}",
    activeColor: "{navigation.item.active.color}",
    padding: "{navigation.item.padding}",
    borderRadius: "{navigation.item.border.radius}",
    gap: "{navigation.item.gap}",
    icon: {
      color: "{navigation.item.icon.color}",
      focusColor: "{navigation.item.icon.focus.color}",
      activeColor: "{navigation.item.icon.active.color}"
    }
  },
  submenu: {
    mobileIndent: "1rem"
  },
  submenuIcon: {
    size: "{navigation.submenu.icon.size}",
    color: "{navigation.submenu.icon.color}",
    focusColor: "{navigation.submenu.icon.focus.color}",
    activeColor: "{navigation.submenu.icon.active.color}"
  },
  separator: {
    borderColor: "{content.border.color}"
  }
};
var index$17 = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  header: {
    background: "{content.background}",
    borderColor: "{datatable.border.color}",
    color: "{content.color}",
    borderWidth: "0 0 1px 0",
    padding: "0.75rem 1rem"
  },
  headerCell: {
    background: "{content.background}",
    hoverBackground: "{content.hover.background}",
    selectedBackground: "{highlight.background}",
    borderColor: "{datatable.border.color}",
    color: "{content.color}",
    hoverColor: "{content.hover.color}",
    selectedColor: "{highlight.color}",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "-1px",
      shadow: "{focus.ring.shadow}"
    }
  },
  columnTitle: {
    fontWeight: "600"
  },
  row: {
    background: "{content.background}",
    hoverBackground: "{content.hover.background}",
    selectedBackground: "{highlight.background}",
    color: "{content.color}",
    hoverColor: "{content.hover.color}",
    selectedColor: "{highlight.color}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "-1px",
      shadow: "{focus.ring.shadow}"
    }
  },
  bodyCell: {
    borderColor: "{datatable.border.color}",
    padding: "0.75rem 1rem"
  },
  footerCell: {
    background: "{content.background}",
    borderColor: "{datatable.border.color}",
    color: "{content.color}",
    padding: "0.75rem 1rem"
  },
  columnFooter: {
    fontWeight: "600"
  },
  footer: {
    background: "{content.background}",
    borderColor: "{datatable.border.color}",
    color: "{content.color}",
    borderWidth: "0 0 1px 0",
    padding: "0.75rem 1rem"
  },
  dropPoint: {
    color: "{primary.color}"
  },
  columnResizerWidth: "0.5rem",
  resizeIndicator: {
    width: "1px",
    color: "{primary.color}"
  },
  sortIcon: {
    color: "{text.muted.color}",
    hoverColor: "{text.hover.muted.color}",
    size: "0.875rem"
  },
  loadingIcon: {
    size: "2rem"
  },
  rowToggleButton: {
    hoverBackground: "{content.hover.background}",
    selectedHoverBackground: "{content.background}",
    color: "{text.muted.color}",
    hoverColor: "{text.color}",
    selectedHoverColor: "{primary.color}",
    size: "1.75rem",
    borderRadius: "50%",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  filter: {
    inlineGap: "0.5rem",
    overlaySelect: {
      background: "{overlay.select.background}",
      borderColor: "{overlay.select.border.color}",
      borderRadius: "{overlay.select.border.radius}",
      color: "{overlay.select.color}",
      shadow: "{overlay.select.shadow}"
    },
    overlayPopover: {
      background: "{overlay.popover.background}",
      borderColor: "{overlay.popover.border.color}",
      borderRadius: "{overlay.popover.border.radius}",
      color: "{overlay.popover.color}",
      shadow: "{overlay.popover.shadow}",
      padding: "{overlay.popover.padding}",
      gap: "0.5rem"
    },
    rule: {
      borderColor: "{content.border.color}"
    },
    constraintList: {
      padding: "{list.padding}",
      gap: "{list.gap}"
    },
    constraint: {
      focusBackground: "{list.option.focus.background}",
      selectedBackground: "{list.option.selected.background}",
      selectedFocusBackground: "{list.option.selected.focus.background}",
      color: "{list.option.color}",
      focusColor: "{list.option.focus.color}",
      selectedColor: "{list.option.selected.color}",
      selectedFocusColor: "{list.option.selected.focus.color}",
      separator: {
        borderColor: "{content.border.color}"
      },
      padding: "{list.option.padding}",
      borderRadius: "{list.option.border.radius}"
    }
  },
  paginatorTop: {
    borderColor: "{datatable.border.color}",
    borderWidth: "0 0 1px 0"
  },
  paginatorBottom: {
    borderColor: "{datatable.border.color}",
    borderWidth: "0 0 1px 0"
  },
  colorScheme: {
    light: {
      root: {
        borderColor: "{content.border.color}"
      },
      row: {
        stripedBackground: "{surface.50}"
      },
      bodyCell: {
        selectedBorderColor: "{primary.100}"
      }
    },
    dark: {
      root: {
        borderColor: "{surface.800}"
      },
      row: {
        stripedBackground: "{surface.950}"
      },
      bodyCell: {
        selectedBorderColor: "{primary.900}"
      }
    }
  }
};
var index$16 = {
  root: {
    borderColor: "transparent",
    borderWidth: "0",
    borderRadius: "0",
    padding: "0"
  },
  header: {
    background: "{content.background}",
    color: "{content.color}",
    borderColor: "{content.border.color}",
    borderWidth: "0 0 1px 0",
    padding: "0.75rem 1rem",
    borderRadius: "0"
  },
  content: {
    background: "{content.background}",
    color: "{content.color}",
    borderColor: "transparent",
    borderWidth: "0",
    padding: "0",
    borderRadius: "0"
  },
  footer: {
    background: "{content.background}",
    color: "{content.color}",
    borderColor: "{content.border.color}",
    borderWidth: "1px 0 0 0",
    padding: "0.75rem 1rem",
    borderRadius: "0"
  },
  paginatorTop: {
    borderColor: "{content.border.color}",
    borderWidth: "0 0 1px 0"
  },
  paginatorBottom: {
    borderColor: "{content.border.color}",
    borderWidth: "1px 0 0 0"
  }
};
var index$15 = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  panel: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    color: "{content.color}",
    borderRadius: "{content.border.radius}",
    shadow: "{overlay.popover.shadow}",
    padding: "{overlay.popover.padding}"
  },
  header: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    color: "{content.color}",
    padding: "0 0 0.5rem 0",
    fontWeight: "500",
    gap: "0.5rem"
  },
  title: {
    gap: "0.5rem",
    fontWeight: "500"
  },
  dropdown: {
    width: "2.5rem",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.border.color}",
    activeBorderColor: "{form.field.border.color}",
    borderRadius: "{form.field.border.radius}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  inputIcon: {
    color: "{form.field.icon.color}"
  },
  selectMonth: {
    hoverBackground: "{content.hover.background}",
    color: "{content.color}",
    hoverColor: "{content.hover.color}",
    padding: "0.25rem 0.5rem",
    borderRadius: "{content.border.radius}"
  },
  selectYear: {
    hoverBackground: "{content.hover.background}",
    color: "{content.color}",
    hoverColor: "{content.hover.color}",
    padding: "0.25rem 0.5rem",
    borderRadius: "{content.border.radius}"
  },
  group: {
    borderColor: "{content.border.color}",
    gap: "{overlay.popover.padding}"
  },
  dayView: {
    margin: "0.5rem 0 0 0"
  },
  weekDay: {
    padding: "0.25rem",
    fontWeight: "500",
    color: "{content.color}"
  },
  date: {
    hoverBackground: "{content.hover.background}",
    selectedBackground: "{primary.color}",
    rangeSelectedBackground: "{highlight.background}",
    color: "{content.color}",
    hoverColor: "{content.hover.color}",
    selectedColor: "{primary.contrast.color}",
    rangeSelectedColor: "{highlight.color}",
    width: "2rem",
    height: "2rem",
    borderRadius: "50%",
    padding: "0.25rem",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  monthView: {
    margin: "0.5rem 0 0 0"
  },
  month: {
    padding: "0.375rem",
    borderRadius: "{content.border.radius}"
  },
  yearView: {
    margin: "0.5rem 0 0 0"
  },
  year: {
    padding: "0.375rem",
    borderRadius: "{content.border.radius}"
  },
  buttonbar: {
    padding: "0.5rem 0 0 0",
    borderColor: "{content.border.color}"
  },
  timePicker: {
    padding: "0.5rem 0 0 0",
    borderColor: "{content.border.color}",
    gap: "0.5rem",
    buttonGap: "0.25rem"
  },
  colorScheme: {
    light: {
      dropdown: {
        background: "{surface.100}",
        hoverBackground: "{surface.200}",
        activeBackground: "{surface.300}",
        color: "{surface.600}",
        hoverColor: "{surface.700}",
        activeColor: "{surface.800}"
      },
      today: {
        background: "{surface.200}",
        color: "{surface.900}"
      }
    },
    dark: {
      dropdown: {
        background: "{surface.800}",
        hoverBackground: "{surface.700}",
        activeBackground: "{surface.600}",
        color: "{surface.300}",
        hoverColor: "{surface.200}",
        activeColor: "{surface.100}"
      },
      today: {
        background: "{surface.700}",
        color: "{surface.0}"
      }
    }
  }
};
var index$14 = {
  root: {
    background: "{overlay.modal.background}",
    borderColor: "{overlay.modal.border.color}",
    color: "{overlay.modal.color}",
    borderRadius: "{overlay.modal.border.radius}",
    shadow: "{overlay.modal.shadow}"
  },
  header: {
    padding: "{overlay.modal.padding}",
    gap: "0.5rem"
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: "600"
  },
  content: {
    padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}"
  },
  footer: {
    padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}",
    gap: "0.5rem"
  }
};
var index$13 = {
  root: {
    borderColor: "{content.border.color}"
  },
  content: {
    background: "{content.background}",
    color: "{text.color}"
  },
  horizontal: {
    margin: "1rem 0",
    padding: "0 1rem",
    content: {
      padding: "0 0.5rem"
    }
  },
  vertical: {
    margin: "0 1rem",
    padding: "0.5rem 0",
    content: {
      padding: "0.5rem 0"
    }
  }
};
var index$12 = {
  root: {
    background: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.2)",
    padding: "0.5rem",
    borderRadius: "{border.radius.xl}"
  },
  item: {
    borderRadius: "{content.border.radius}",
    padding: "0.5rem",
    size: "3rem",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  }
};
var index$11 = {
  root: {
    background: "{overlay.modal.background}",
    borderColor: "{overlay.modal.border.color}",
    color: "{overlay.modal.color}",
    borderRadius: "{overlay.modal.border.radius}",
    shadow: "{overlay.modal.shadow}"
  },
  header: {
    padding: "{overlay.modal.padding}"
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "600"
  },
  content: {
    padding: "0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}"
  }
};
var index$10 = {
  toolbar: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    borderRadius: "{content.border.radius}"
  },
  toolbarItem: {
    color: "{text.muted.color}",
    hoverColor: "{text.color}",
    activeColor: "{primary.color}"
  },
  overlay: {
    background: "{overlay.select.background}",
    borderColor: "{overlay.select.border.color}",
    borderRadius: "{overlay.select.border.radius}",
    color: "{overlay.select.color}",
    shadow: "{overlay.select.shadow}",
    padding: "{list.padding}"
  },
  overlayOption: {
    focusBackground: "{list.option.focus.background}",
    color: "{list.option.color}",
    focusColor: "{list.option.focus.color}",
    padding: "{list.option.padding}",
    borderRadius: "{list.option.border.radius}"
  },
  content: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    color: "{content.color}",
    borderRadius: "{content.border.radius}"
  }
};
var index$$ = {
  root: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    borderRadius: "{content.border.radius}",
    color: "{content.color}",
    padding: "0 1.125rem 1.125rem 1.125rem",
    transitionDuration: "{transition.duration}"
  },
  legend: {
    background: "{content.background}",
    hoverBackground: "{content.hover.background}",
    color: "{content.color}",
    hoverColor: "{content.hover.color}",
    borderRadius: "{content.border.radius}",
    borderWidth: "1px",
    borderColor: "transparent",
    padding: "0.5rem 0.75rem",
    gap: "0.5rem",
    fontWeight: "600",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  toggleIcon: {
    color: "{text.muted.color}",
    hoverColor: "{text.hover.muted.color}"
  },
  content: {
    padding: "0"
  }
};
var index$_ = {
  root: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    color: "{content.color}",
    borderRadius: "{content.border.radius}",
    transitionDuration: "{transition.duration}"
  },
  header: {
    background: "transparent",
    color: "{text.color}",
    padding: "1.125rem",
    borderWidth: "0",
    borderRadius: "0",
    gap: "0.5rem"
  },
  content: {
    highlightBorderColor: "{primary.color}",
    padding: "0 1.125rem 1.125rem 1.125rem"
  },
  file: {
    padding: "1rem",
    gap: "1rem",
    borderColor: "{content.border.color}",
    info: {
      gap: "0.5rem"
    }
  },
  progressbar: {
    height: "0.25rem"
  },
  basic: {
    gap: "0.5rem"
  }
};
var index$Z = {
  root: {
    color: "{form.field.float.label.color}",
    focusColor: "{form.field.float.label.focus.color}",
    activeColor: "{form.field.float.label.active.color}",
    invalidColor: "{form.field.float.label.invalid.color}",
    transitionDuration: "0.2s",
    positionX: "{form.field.padding.x}",
    positionY: "{form.field.padding.y}",
    fontWeight: "500",
    active: {
      fontSize: "0.75rem",
      fontWeight: "400"
    }
  },
  over: {
    active: {
      top: "-1.25rem"
    }
  },
  "in": {
    input: {
      paddingTop: "1.5rem",
      paddingBottom: "{form.field.padding.y}"
    },
    active: {
      top: "{form.field.padding.y}"
    }
  },
  on: {
    borderRadius: "{border.radius.xs}",
    active: {
      background: "{form.field.background}",
      padding: "0 0.125rem"
    }
  }
};
var index$Y = {
  root: {
    borderWidth: "1px",
    borderColor: "{content.border.color}",
    borderRadius: "{content.border.radius}",
    transitionDuration: "{transition.duration}"
  },
  navButton: {
    background: "rgba(255, 255, 255, 0.1)",
    hoverBackground: "rgba(255, 255, 255, 0.2)",
    color: "{surface.100}",
    hoverColor: "{surface.0}",
    size: "3rem",
    gutter: "0.5rem",
    prev: {
      borderRadius: "50%"
    },
    next: {
      borderRadius: "50%"
    },
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  navIcon: {
    size: "1.5rem"
  },
  thumbnailsContent: {
    background: "{content.background}",
    padding: "1rem 0.25rem"
  },
  thumbnailNavButton: {
    size: "2rem",
    borderRadius: "{content.border.radius}",
    gutter: "0.5rem",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  thumbnailNavButtonIcon: {
    size: "1rem"
  },
  caption: {
    background: "rgba(0, 0, 0, 0.5)",
    color: "{surface.100}",
    padding: "1rem"
  },
  indicatorList: {
    gap: "0.5rem",
    padding: "1rem"
  },
  indicatorButton: {
    width: "1rem",
    height: "1rem",
    activeBackground: "{primary.color}",
    borderRadius: "50%",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  insetIndicatorList: {
    background: "rgba(0, 0, 0, 0.5)"
  },
  insetIndicatorButton: {
    background: "rgba(255, 255, 255, 0.4)",
    hoverBackground: "rgba(255, 255, 255, 0.6)",
    activeBackground: "rgba(255, 255, 255, 0.9)"
  },
  mask: {
    background: "{mask.background}",
    color: "{mask.color}"
  },
  closeButton: {
    size: "3rem",
    gutter: "0.5rem",
    background: "rgba(255, 255, 255, 0.1)",
    hoverBackground: "rgba(255, 255, 255, 0.2)",
    color: "{surface.50}",
    hoverColor: "{surface.0}",
    borderRadius: "50%",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  closeButtonIcon: {
    size: "1.5rem"
  },
  colorScheme: {
    light: {
      thumbnailNavButton: {
        hoverBackground: "{surface.100}",
        color: "{surface.600}",
        hoverColor: "{surface.700}"
      },
      indicatorButton: {
        background: "{surface.200}",
        hoverBackground: "{surface.300}"
      }
    },
    dark: {
      thumbnailNavButton: {
        hoverBackground: "{surface.700}",
        color: "{surface.400}",
        hoverColor: "{surface.0}"
      },
      indicatorButton: {
        background: "{surface.700}",
        hoverBackground: "{surface.600}"
      }
    }
  }
};
var index$X = {
  icon: {
    color: "{form.field.icon.color}"
  }
};
var index$W = {
  root: {
    color: "{form.field.float.label.color}",
    focusColor: "{form.field.float.label.focus.color}",
    invalidColor: "{form.field.float.label.invalid.color}",
    transitionDuration: "0.2s",
    positionX: "{form.field.padding.x}",
    top: "{form.field.padding.y}",
    fontSize: "0.75rem",
    fontWeight: "400"
  },
  input: {
    paddingTop: "1.5rem",
    paddingBottom: "{form.field.padding.y}"
  }
};
var index$V = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  preview: {
    icon: {
      size: "1.5rem"
    },
    mask: {
      background: "{mask.background}",
      color: "{mask.color}"
    }
  },
  toolbar: {
    position: {
      left: "auto",
      right: "1rem",
      top: "1rem",
      bottom: "auto"
    },
    blur: "8px",
    background: "rgba(255,255,255,0.1)",
    borderColor: "rgba(255,255,255,0.2)",
    borderWidth: "1px",
    borderRadius: "30px",
    padding: ".5rem",
    gap: "0.5rem"
  },
  action: {
    hoverBackground: "rgba(255,255,255,0.1)",
    color: "{surface.50}",
    hoverColor: "{surface.0}",
    size: "3rem",
    iconSize: "1.5rem",
    borderRadius: "50%",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  }
};
var index$U = {
  handle: {
    size: "15px",
    hoverSize: "30px",
    background: "rgba(255,255,255,0.3)",
    hoverBackground: "rgba(255,255,255,0.3)",
    borderColor: "unset",
    hoverBorderColor: "unset",
    borderWidth: "0",
    borderRadius: "50%",
    transitionDuration: "{transition.duration}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "rgba(255,255,255,0.3)",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  }
};
var index$T = {
  root: {
    padding: "{form.field.padding.y} {form.field.padding.x}",
    borderRadius: "{content.border.radius}",
    gap: "0.5rem"
  },
  text: {
    fontWeight: "500"
  },
  icon: {
    size: "1rem"
  },
  colorScheme: {
    light: {
      info: {
        background: "color-mix(in srgb, {blue.50}, transparent 5%)",
        borderColor: "{blue.200}",
        color: "{blue.600}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)"
      },
      success: {
        background: "color-mix(in srgb, {green.50}, transparent 5%)",
        borderColor: "{green.200}",
        color: "{green.600}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)"
      },
      warn: {
        background: "color-mix(in srgb,{yellow.50}, transparent 5%)",
        borderColor: "{yellow.200}",
        color: "{yellow.600}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)"
      },
      error: {
        background: "color-mix(in srgb, {red.50}, transparent 5%)",
        borderColor: "{red.200}",
        color: "{red.600}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)"
      },
      secondary: {
        background: "{surface.100}",
        borderColor: "{surface.200}",
        color: "{surface.600}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)"
      },
      contrast: {
        background: "{surface.900}",
        borderColor: "{surface.950}",
        color: "{surface.50}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)"
      }
    },
    dark: {
      info: {
        background: "color-mix(in srgb, {blue.500}, transparent 84%)",
        borderColor: "color-mix(in srgb, {blue.700}, transparent 64%)",
        color: "{blue.500}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)"
      },
      success: {
        background: "color-mix(in srgb, {green.500}, transparent 84%)",
        borderColor: "color-mix(in srgb, {green.700}, transparent 64%)",
        color: "{green.500}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)"
      },
      warn: {
        background: "color-mix(in srgb, {yellow.500}, transparent 84%)",
        borderColor: "color-mix(in srgb, {yellow.700}, transparent 64%)",
        color: "{yellow.500}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)"
      },
      error: {
        background: "color-mix(in srgb, {red.500}, transparent 84%)",
        borderColor: "color-mix(in srgb, {red.700}, transparent 64%)",
        color: "{red.500}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)"
      },
      secondary: {
        background: "{surface.800}",
        borderColor: "{surface.700}",
        color: "{surface.300}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)"
      },
      contrast: {
        background: "{surface.0}",
        borderColor: "{surface.100}",
        color: "{surface.950}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)"
      }
    }
  }
};
var index$S = {
  root: {
    padding: "{form.field.padding.y} {form.field.padding.x}",
    borderRadius: "{content.border.radius}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    },
    transitionDuration: "{transition.duration}"
  },
  display: {
    hoverBackground: "{content.hover.background}",
    hoverColor: "{content.hover.color}"
  }
};
var index$R = {
  root: {
    background: "{form.field.background}",
    disabledBackground: "{form.field.disabled.background}",
    filledBackground: "{form.field.filled.background}",
    filledFocusBackground: "{form.field.filled.focus.background}",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.hover.border.color}",
    focusBorderColor: "{form.field.focus.border.color}",
    invalidBorderColor: "{form.field.invalid.border.color}",
    color: "{form.field.color}",
    disabledColor: "{form.field.disabled.color}",
    placeholderColor: "{form.field.placeholder.color}",
    shadow: "{form.field.shadow}",
    paddingX: "{form.field.padding.x}",
    paddingY: "{form.field.padding.y}",
    borderRadius: "{form.field.border.radius}",
    focusRing: {
      width: "{form.field.focus.ring.width}",
      style: "{form.field.focus.ring.style}",
      color: "{form.field.focus.ring.color}",
      offset: "{form.field.focus.ring.offset}",
      shadow: "{form.field.focus.ring.shadow}"
    },
    transitionDuration: "{form.field.transition.duration}"
  },
  chip: {
    borderRadius: "{border.radius.sm}"
  },
  colorScheme: {
    light: {
      chip: {
        focusBackground: "{surface.200}",
        color: "{surface.800}"
      }
    },
    dark: {
      chip: {
        focusBackground: "{surface.700}",
        color: "{surface.0}"
      }
    }
  }
};
var index$Q = {
  addon: {
    background: "{form.field.background}",
    borderColor: "{form.field.border.color}",
    color: "{form.field.icon.color}",
    borderRadius: "{form.field.border.radius}",
    padding: "0.5rem",
    minWidth: "2.5rem"
  }
};
var index$P = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  button: {
    width: "2.5rem",
    borderRadius: "{form.field.border.radius}",
    verticalPadding: "{form.field.padding.y}"
  },
  colorScheme: {
    light: {
      button: {
        background: "transparent",
        hoverBackground: "{surface.100}",
        activeBackground: "{surface.200}",
        borderColor: "{form.field.border.color}",
        hoverBorderColor: "{form.field.border.color}",
        activeBorderColor: "{form.field.border.color}",
        color: "{surface.400}",
        hoverColor: "{surface.500}",
        activeColor: "{surface.600}"
      }
    },
    dark: {
      button: {
        background: "transparent",
        hoverBackground: "{surface.800}",
        activeBackground: "{surface.700}",
        borderColor: "{form.field.border.color}",
        hoverBorderColor: "{form.field.border.color}",
        activeBorderColor: "{form.field.border.color}",
        color: "{surface.400}",
        hoverColor: "{surface.300}",
        activeColor: "{surface.200}"
      }
    }
  }
};
var index$O = {
  root: {
    background: "{form.field.background}",
    disabledBackground: "{form.field.disabled.background}",
    filledBackground: "{form.field.filled.background}",
    filledHoverBackground: "{form.field.filled.hover.background}",
    filledFocusBackground: "{form.field.filled.focus.background}",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.hover.border.color}",
    focusBorderColor: "{form.field.focus.border.color}",
    invalidBorderColor: "{form.field.invalid.border.color}",
    color: "{form.field.color}",
    disabledColor: "{form.field.disabled.color}",
    placeholderColor: "{form.field.placeholder.color}",
    shadow: "{form.field.shadow}",
    paddingX: "{form.field.padding.x}",
    paddingY: "{form.field.padding.y}",
    borderRadius: "{form.field.border.radius}",
    focusRing: {
      width: "{form.field.focus.ring.width}",
      style: "{form.field.focus.ring.style}",
      color: "{form.field.focus.ring.color}",
      offset: "{form.field.focus.ring.offset}",
      shadow: "{form.field.focus.ring.shadow}"
    },
    transitionDuration: "{form.field.transition.duration}",
    sm: {
      fontSize: "0.875rem",
      paddingX: "0.625rem",
      paddingY: "0.375rem"
    },
    lg: {
      fontSize: "1.125rem",
      paddingX: "0.875rem",
      paddingY: "0.625rem"
    }
  }
};
var index$N = {
  root: {
    transitionDuration: "{transition.duration}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  value: {
    background: "{primary.color}"
  },
  range: {
    background: "{content.border.color}"
  },
  text: {
    color: "{text.muted.color}"
  }
};
var index$M = {
  root: {
    background: "{form.field.background}",
    disabledBackground: "{form.field.disabled.background}",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.hover.border.color}",
    focusBorderColor: "{form.field.focus.border.color}",
    invalidBorderColor: "{form.field.invalid.border.color}",
    color: "{form.field.color}",
    disabledColor: "{form.field.disabled.color}",
    shadow: "{form.field.shadow}",
    borderRadius: "{form.field.border.radius}",
    focusRing: {
      width: "{form.field.focus.ring.width}",
      style: "{form.field.focus.ring.style}",
      color: "{form.field.focus.ring.color}",
      offset: "{form.field.focus.ring.offset}",
      shadow: "{form.field.focus.ring.shadow}"
    },
    transitionDuration: "{form.field.transition.duration}"
  },
  list: {
    padding: "{list.padding}",
    gap: "{list.gap}",
    header: {
      padding: "{list.header.padding}"
    }
  },
  option: {
    focusBackground: "{list.option.focus.background}",
    selectedBackground: "{list.option.selected.background}",
    selectedFocusBackground: "{list.option.selected.focus.background}",
    color: "{list.option.color}",
    focusColor: "{list.option.focus.color}",
    selectedColor: "{list.option.selected.color}",
    selectedFocusColor: "{list.option.selected.focus.color}",
    padding: "{list.option.padding}",
    borderRadius: "{list.option.border.radius}"
  },
  optionGroup: {
    background: "{list.option.group.background}",
    color: "{list.option.group.color}",
    fontWeight: "{list.option.group.font.weight}",
    padding: "{list.option.group.padding}"
  },
  checkmark: {
    color: "{list.option.color}",
    gutterStart: "-0.375rem",
    gutterEnd: "0.375rem"
  },
  emptyMessage: {
    padding: "{list.option.padding}"
  },
  colorScheme: {
    light: {
      option: {
        stripedBackground: "{surface.50}"
      }
    },
    dark: {
      option: {
        stripedBackground: "{surface.900}"
      }
    }
  }
};
var index$L = {
  root: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    borderRadius: "{content.border.radius}",
    color: "{content.color}",
    gap: "0.5rem",
    verticalOrientation: {
      padding: "{navigation.list.padding}",
      gap: "{navigation.list.gap}"
    },
    horizontalOrientation: {
      padding: "0.5rem 0.75rem",
      gap: "0.5rem"
    },
    transitionDuration: "{transition.duration}"
  },
  baseItem: {
    borderRadius: "{content.border.radius}",
    padding: "{navigation.item.padding}"
  },
  item: {
    focusBackground: "{navigation.item.focus.background}",
    activeBackground: "{navigation.item.active.background}",
    color: "{navigation.item.color}",
    focusColor: "{navigation.item.focus.color}",
    activeColor: "{navigation.item.active.color}",
    padding: "{navigation.item.padding}",
    borderRadius: "{navigation.item.border.radius}",
    gap: "{navigation.item.gap}",
    icon: {
      color: "{navigation.item.icon.color}",
      focusColor: "{navigation.item.icon.focus.color}",
      activeColor: "{navigation.item.icon.active.color}"
    }
  },
  overlay: {
    padding: "0",
    background: "{content.background}",
    borderColor: "{content.border.color}",
    borderRadius: "{content.border.radius}",
    color: "{content.color}",
    shadow: "{overlay.navigation.shadow}",
    gap: "0.5rem"
  },
  submenu: {
    padding: "{navigation.list.padding}",
    gap: "{navigation.list.gap}"
  },
  submenuLabel: {
    padding: "{navigation.submenu.label.padding}",
    fontWeight: "{navigation.submenu.label.font.weight}",
    background: "{navigation.submenu.label.background.}",
    color: "{navigation.submenu.label.color}"
  },
  submenuIcon: {
    size: "{navigation.submenu.icon.size}",
    color: "{navigation.submenu.icon.color}",
    focusColor: "{navigation.submenu.icon.focus.color}",
    activeColor: "{navigation.submenu.icon.active.color}"
  },
  separator: {
    borderColor: "{content.border.color}"
  },
  mobileButton: {
    borderRadius: "50%",
    size: "1.75rem",
    color: "{text.muted.color}",
    hoverColor: "{text.muted.hover.color}",
    hoverBackground: "{content.hover.background}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  }
};
var index$K = {
  root: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    color: "{content.color}",
    borderRadius: "{content.border.radius}",
    shadow: "{overlay.navigation.shadow}",
    transitionDuration: "{transition.duration}"
  },
  list: {
    padding: "{navigation.list.padding}",
    gap: "{navigation.list.gap}"
  },
  item: {
    focusBackground: "{navigation.item.focus.background}",
    color: "{navigation.item.color}",
    focusColor: "{navigation.item.focus.color}",
    padding: "{navigation.item.padding}",
    borderRadius: "{navigation.item.border.radius}",
    gap: "{navigation.item.gap}",
    icon: {
      color: "{navigation.item.icon.color}",
      focusColor: "{navigation.item.icon.focus.color}"
    }
  },
  submenuLabel: {
    padding: "{navigation.submenu.label.padding}",
    fontWeight: "{navigation.submenu.label.font.weight}",
    background: "{navigation.submenu.label.background}",
    color: "{navigation.submenu.label.color}"
  },
  separator: {
    borderColor: "{content.border.color}"
  }
};
var index$J = {
  root: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    borderRadius: "{content.border.radius}",
    color: "{content.color}",
    gap: "0.5rem",
    padding: "0.5rem 0.75rem",
    transitionDuration: "{transition.duration}"
  },
  baseItem: {
    borderRadius: "{content.border.radius}",
    padding: "{navigation.item.padding}"
  },
  item: {
    focusBackground: "{navigation.item.focus.background}",
    activeBackground: "{navigation.item.active.background}",
    color: "{navigation.item.color}",
    focusColor: "{navigation.item.focus.color}",
    activeColor: "{navigation.item.active.color}",
    padding: "{navigation.item.padding}",
    borderRadius: "{navigation.item.border.radius}",
    gap: "{navigation.item.gap}",
    icon: {
      color: "{navigation.item.icon.color}",
      focusColor: "{navigation.item.icon.focus.color}",
      activeColor: "{navigation.item.icon.active.color}"
    }
  },
  submenu: {
    padding: "{navigation.list.padding}",
    gap: "{navigation.list.gap}",
    background: "{content.background}",
    borderColor: "{content.border.color}",
    borderRadius: "{content.border.radius}",
    shadow: "{overlay.navigation.shadow}",
    mobileIndent: "1rem"
  },
  submenuIcon: {
    size: "{navigation.submenu.icon.size}",
    color: "{navigation.submenu.icon.color}",
    focusColor: "{navigation.submenu.icon.focus.color}",
    activeColor: "{navigation.submenu.icon.active.color}"
  },
  separator: {
    borderColor: "{content.border.color}"
  },
  mobileButton: {
    borderRadius: "50%",
    size: "1.75rem",
    color: "{text.muted.color}",
    hoverColor: "{text.muted.hover.color}",
    hoverBackground: "{content.hover.background}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  }
};
var index$I = {
  root: {
    borderRadius: "{content.border.radius}",
    borderWidth: "1px",
    transitionDuration: "{transition.duration}"
  },
  content: {
    padding: "0.5rem 0.75rem",
    gap: "0.5rem"
  },
  text: {
    fontSize: "1rem",
    fontWeight: "500"
  },
  icon: {
    size: "1.125rem"
  },
  closeButton: {
    width: "1.75rem",
    height: "1.75rem",
    borderRadius: "50%",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      offset: "{focus.ring.offset}"
    }
  },
  closeIcon: {
    size: "1rem"
  },
  colorScheme: {
    light: {
      info: {
        background: "color-mix(in srgb, {blue.50}, transparent 5%)",
        borderColor: "{blue.200}",
        color: "{blue.600}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "{blue.100}",
          focusRing: {
            color: "{blue.600}",
            shadow: "none"
          }
        }
      },
      success: {
        background: "color-mix(in srgb, {green.50}, transparent 5%)",
        borderColor: "{green.200}",
        color: "{green.600}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "{green.100}",
          focusRing: {
            color: "{green.600}",
            shadow: "none"
          }
        }
      },
      warn: {
        background: "color-mix(in srgb,{yellow.50}, transparent 5%)",
        borderColor: "{yellow.200}",
        color: "{yellow.600}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "{yellow.100}",
          focusRing: {
            color: "{yellow.600}",
            shadow: "none"
          }
        }
      },
      error: {
        background: "color-mix(in srgb, {red.50}, transparent 5%)",
        borderColor: "{red.200}",
        color: "{red.600}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "{red.100}",
          focusRing: {
            color: "{red.600}",
            shadow: "none"
          }
        }
      },
      secondary: {
        background: "{surface.100}",
        borderColor: "{surface.200}",
        color: "{surface.600}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "{surface.200}",
          focusRing: {
            color: "{surface.600}",
            shadow: "none"
          }
        }
      },
      contrast: {
        background: "{surface.900}",
        borderColor: "{surface.950}",
        color: "{surface.50}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",
        closeButton: {
          hoverBackground: "{surface.800}",
          focusRing: {
            color: "{surface.50}",
            shadow: "none"
          }
        }
      }
    },
    dark: {
      info: {
        background: "color-mix(in srgb, {blue.500}, transparent 84%)",
        borderColor: "color-mix(in srgb, {blue.700}, transparent 64%)",
        color: "{blue.500}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "rgba(255, 255, 255, 0.05)",
          focusRing: {
            color: "{blue.500}",
            shadow: "none"
          }
        }
      },
      success: {
        background: "color-mix(in srgb, {green.500}, transparent 84%)",
        borderColor: "color-mix(in srgb, {green.700}, transparent 64%)",
        color: "{green.500}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "rgba(255, 255, 255, 0.05)",
          focusRing: {
            color: "{green.500}",
            shadow: "none"
          }
        }
      },
      warn: {
        background: "color-mix(in srgb, {yellow.500}, transparent 84%)",
        borderColor: "color-mix(in srgb, {yellow.700}, transparent 64%)",
        color: "{yellow.500}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "rgba(255, 255, 255, 0.05)",
          focusRing: {
            color: "{yellow.500}",
            shadow: "none"
          }
        }
      },
      error: {
        background: "color-mix(in srgb, {red.500}, transparent 84%)",
        borderColor: "color-mix(in srgb, {red.700}, transparent 64%)",
        color: "{red.500}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "rgba(255, 255, 255, 0.05)",
          focusRing: {
            color: "{red.500}",
            shadow: "none"
          }
        }
      },
      secondary: {
        background: "{surface.800}",
        borderColor: "{surface.700}",
        color: "{surface.300}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "{surface.700}",
          focusRing: {
            color: "{surface.300}",
            shadow: "none"
          }
        }
      },
      contrast: {
        background: "{surface.0}",
        borderColor: "{surface.100}",
        color: "{surface.950}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",
        closeButton: {
          hoverBackground: "{surface.100}",
          focusRing: {
            color: "{surface.950}",
            shadow: "none"
          }
        }
      }
    }
  }
};
var index$H = {
  root: {
    borderRadius: "{content.border.radius}",
    gap: "1rem"
  },
  meters: {
    background: "{content.border.color}",
    size: "0.5rem"
  },
  label: {
    gap: "0.5rem"
  },
  labelMarker: {
    size: "0.5rem"
  },
  labelIcon: {
    size: "1rem"
  },
  labelList: {
    verticalGap: "0.5rem",
    horizontalGap: "1rem"
  }
};
var index$G = {
  root: {
    background: "{form.field.background}",
    disabledBackground: "{form.field.disabled.background}",
    filledBackground: "{form.field.filled.background}",
    filledHoverBackground: "{form.field.filled.hover.background}",
    filledFocusBackground: "{form.field.filled.focus.background}",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.hover.border.color}",
    focusBorderColor: "{form.field.focus.border.color}",
    invalidBorderColor: "{form.field.invalid.border.color}",
    color: "{form.field.color}",
    disabledColor: "{form.field.disabled.color}",
    placeholderColor: "{form.field.placeholder.color}",
    shadow: "{form.field.shadow}",
    paddingX: "{form.field.padding.x}",
    paddingY: "{form.field.padding.y}",
    borderRadius: "{form.field.border.radius}",
    focusRing: {
      width: "{form.field.focus.ring.width}",
      style: "{form.field.focus.ring.style}",
      color: "{form.field.focus.ring.color}",
      offset: "{form.field.focus.ring.offset}",
      shadow: "{form.field.focus.ring.shadow}"
    },
    transitionDuration: "{form.field.transition.duration}"
  },
  dropdown: {
    width: "2.5rem",
    color: "{form.field.icon.color}"
  },
  overlay: {
    background: "{overlay.select.background}",
    borderColor: "{overlay.select.border.color}",
    borderRadius: "{overlay.select.border.radius}",
    color: "{overlay.select.color}",
    shadow: "{overlay.select.shadow}"
  },
  list: {
    padding: "{list.padding}",
    gap: "{list.gap}",
    header: {
      padding: "{list.header.padding}"
    }
  },
  option: {
    focusBackground: "{list.option.focus.background}",
    selectedBackground: "{list.option.selected.background}",
    selectedFocusBackground: "{list.option.selected.focus.background}",
    color: "{list.option.color}",
    focusColor: "{list.option.focus.color}",
    selectedColor: "{list.option.selected.color}",
    selectedFocusColor: "{list.option.selected.focus.color}",
    padding: "{list.option.padding}",
    borderRadius: "{list.option.border.radius}",
    gap: "0.5rem"
  },
  optionGroup: {
    background: "{list.option.group.background}",
    color: "{list.option.group.color}",
    fontWeight: "{list.option.group.font.weight}",
    padding: "{list.option.group.padding}"
  },
  chip: {
    borderRadius: "{border.radius.sm}"
  },
  emptyMessage: {
    padding: "{list.option.padding}"
  }
};
var index$F = {
  root: {
    gap: "1.125rem"
  },
  controls: {
    gap: "0.5rem"
  }
};
var index$E = {
  root: {
    gutter: "0.75rem",
    transitionDuration: "{transition.duration}"
  },
  node: {
    background: "{content.background}",
    hoverBackground: "{content.hover.background}",
    selectedBackground: "{highlight.background}",
    borderColor: "{content.border.color}",
    color: "{content.color}",
    selectedColor: "{highlight.color}",
    hoverColor: "{content.hover.color}",
    padding: "0.75rem 1rem",
    toggleablePadding: "0.75rem 1rem 1.25rem 1rem",
    borderRadius: "{content.border.radius}"
  },
  nodeToggleButton: {
    background: "{content.background}",
    hoverBackground: "{content.hover.background}",
    borderColor: "{content.border.color}",
    color: "{text.muted.color}",
    hoverColor: "{text.color}",
    size: "1.5rem",
    borderRadius: "50%",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  connector: {
    color: "{content.border.color}",
    borderRadius: "{content.border.radius}",
    height: "24px"
  }
};
var index$D = {
  root: {
    outline: {
      width: "2px",
      color: "{content.background}"
    }
  }
};
var index$C = {
  root: {
    padding: "0.5rem 1rem",
    gap: "0.25rem",
    borderRadius: "{content.border.radius}",
    background: "{content.background}",
    color: "{content.color}",
    transitionDuration: "{transition.duration}"
  },
  navButton: {
    background: "transparent",
    hoverBackground: "{content.hover.background}",
    selectedBackground: "{highlight.background}",
    color: "{text.muted.color}",
    hoverColor: "{text.hover.muted.color}",
    selectedColor: "{highlight.color}",
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "50%",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  currentPageReport: {
    color: "{text.muted.color}"
  },
  jumpToPageInput: {
    maxWidth: "2.5rem"
  }
};
var index$B = {
  root: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    color: "{content.color}",
    borderRadius: "{content.border.radius}"
  },
  header: {
    background: "transparent",
    color: "{text.color}",
    padding: "1.125rem",
    borderColor: "{content.border.color}",
    borderWidth: "0",
    borderRadius: "0"
  },
  toggleableHeader: {
    padding: "0.375rem 1.125rem"
  },
  title: {
    fontWeight: "600"
  },
  content: {
    padding: "0 1.125rem 1.125rem 1.125rem"
  },
  footer: {
    padding: "0 1.125rem 1.125rem 1.125rem"
  }
};
var index$A = {
  root: {
    gap: "0.5rem",
    transitionDuration: "{transition.duration}"
  },
  panel: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    borderWidth: "1px",
    color: "{content.color}",
    padding: "0.25rem 0.25rem",
    borderRadius: "{content.border.radius}",
    first: {
      borderWidth: "1px",
      topBorderRadius: "{content.border.radius}"
    },
    last: {
      borderWidth: "1px",
      bottomBorderRadius: "{content.border.radius}"
    }
  },
  item: {
    focusBackground: "{navigation.item.focus.background}",
    color: "{navigation.item.color}",
    focusColor: "{navigation.item.focus.color}",
    gap: "0.5rem",
    padding: "{navigation.item.padding}",
    borderRadius: "{content.border.radius}",
    icon: {
      color: "{navigation.item.icon.color}",
      focusColor: "{navigation.item.icon.focus.color}"
    }
  },
  submenu: {
    indent: "1rem"
  },
  submenuIcon: {
    color: "{navigation.submenu.icon.color}",
    focusColor: "{navigation.submenu.icon.focus.color}"
  }
};
var index$z = {
  meter: {
    background: "{content.border.color}",
    borderRadius: "{content.border.radius}",
    height: ".75rem"
  },
  icon: {
    color: "{form.field.icon.color}"
  },
  overlay: {
    background: "{overlay.popover.background}",
    borderColor: "{overlay.popover.border.color}",
    borderRadius: "{overlay.popover.border.radius}",
    color: "{overlay.popover.color}",
    padding: "{overlay.popover.padding}",
    shadow: "{overlay.popover.shadow}"
  },
  content: {
    gap: "0.5rem"
  },
  colorScheme: {
    light: {
      strength: {
        weakBackground: "{red.500}",
        mediumBackground: "{amber.500}",
        strongBackground: "{green.500}"
      }
    },
    dark: {
      strength: {
        weakBackground: "{red.400}",
        mediumBackground: "{amber.400}",
        strongBackground: "{green.400}"
      }
    }
  }
};
var index$y = {
  root: {
    gap: "1.125rem"
  },
  controls: {
    gap: "0.5rem"
  }
};
var index$x = {
  root: {
    background: "{overlay.popover.background}",
    borderColor: "{overlay.popover.border.color}",
    color: "{overlay.popover.color}",
    borderRadius: "{overlay.popover.border.radius}",
    shadow: "{overlay.popover.shadow}",
    gutter: "10px",
    arrowOffset: "1.25rem"
  },
  content: {
    padding: "{overlay.popover.padding}"
  }
};
var index$w = {
  root: {
    background: "{content.border.color}",
    borderRadius: "{content.border.radius}",
    height: "1.25rem"
  },
  value: {
    background: "{primary.color}"
  },
  label: {
    color: "{primary.contrast.color}",
    fontSize: "0.75rem",
    fontWeight: "600"
  }
};
var index$v = {
  colorScheme: {
    light: {
      root: {
        "color.1": "{red.500}",
        "color.2": "{blue.500}",
        "color.3": "{green.500}",
        "color.4": "{yellow.500}"
      }
    },
    dark: {
      root: {
        "color.1": "{red.400}",
        "color.2": "{blue.400}",
        "color.3": "{green.400}",
        "color.4": "{yellow.400}"
      }
    }
  }
};
var index$u = {
  root: {
    width: "1.25rem",
    height: "1.25rem",
    background: "{form.field.background}",
    checkedBackground: "{primary.color}",
    checkedHoverBackground: "{primary.hover.color}",
    disabledBackground: "{form.field.disabled.background}",
    filledBackground: "{form.field.filled.background}",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.hover.border.color}",
    focusBorderColor: "{form.field.border.color}",
    checkedBorderColor: "{primary.color}",
    checkedHoverBorderColor: "{primary.hover.color}",
    checkedFocusBorderColor: "{primary.color}",
    checkedDisabledBorderColor: "{form.field.border.color}",
    invalidBorderColor: "{form.field.invalid.border.color}",
    shadow: "{form.field.shadow}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    },
    transitionDuration: "{form.field.transition.duration}"
  },
  icon: {
    size: "0.75rem",
    checkedColor: "{primary.contrast.color}",
    checkedHoverColor: "{primary.contrast.color}",
    disabledColor: "{form.field.disabled.color}"
  }
};
var index$t = {
  root: {
    gap: "0.25rem",
    transitionDuration: "{transition.duration}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  icon: {
    size: "1rem",
    color: "{text.muted.color}",
    hoverColor: "{primary.color}",
    activeColor: "{primary.color}"
  }
};
var index$s = {
  colorScheme: {
    light: {
      root: {
        background: "rgba(0,0,0,0.1)"
      }
    },
    dark: {
      root: {
        background: "rgba(255,255,255,0.3)"
      }
    }
  }
};
var index$r = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  bar: {
    size: "9px",
    borderRadius: "{border.radius.sm}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  colorScheme: {
    light: {
      bar: {
        background: "{surface.100}"
      }
    },
    dark: {
      bar: {
        background: "{surface.800}"
      }
    }
  }
};
var index$q = {
  root: {
    background: "{form.field.background}",
    disabledBackground: "{form.field.disabled.background}",
    filledBackground: "{form.field.filled.background}",
    filledHoverBackground: "{form.field.filled.hover.background}",
    filledFocusBackground: "{form.field.filled.focus.background}",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.hover.border.color}",
    focusBorderColor: "{form.field.focus.border.color}",
    invalidBorderColor: "{form.field.invalid.border.color}",
    color: "{form.field.color}",
    disabledColor: "{form.field.disabled.color}",
    placeholderColor: "{form.field.placeholder.color}",
    shadow: "{form.field.shadow}",
    paddingX: "{form.field.padding.x}",
    paddingY: "{form.field.padding.y}",
    borderRadius: "{form.field.border.radius}",
    focusRing: {
      width: "{form.field.focus.ring.width}",
      style: "{form.field.focus.ring.style}",
      color: "{form.field.focus.ring.color}",
      offset: "{form.field.focus.ring.offset}",
      shadow: "{form.field.focus.ring.shadow}"
    },
    transitionDuration: "{form.field.transition.duration}"
  },
  dropdown: {
    width: "2.5rem",
    color: "{form.field.icon.color}"
  },
  overlay: {
    background: "{overlay.select.background}",
    borderColor: "{overlay.select.border.color}",
    borderRadius: "{overlay.select.border.radius}",
    color: "{overlay.select.color}",
    shadow: "{overlay.select.shadow}"
  },
  list: {
    padding: "{list.padding}",
    gap: "{list.gap}",
    header: {
      padding: "{list.header.padding}"
    }
  },
  option: {
    focusBackground: "{list.option.focus.background}",
    selectedBackground: "{list.option.selected.background}",
    selectedFocusBackground: "{list.option.selected.focus.background}",
    color: "{list.option.color}",
    focusColor: "{list.option.focus.color}",
    selectedColor: "{list.option.selected.color}",
    selectedFocusColor: "{list.option.selected.focus.color}",
    padding: "{list.option.padding}",
    borderRadius: "{list.option.border.radius}"
  },
  optionGroup: {
    background: "{list.option.group.background}",
    color: "{list.option.group.color}",
    fontWeight: "{list.option.group.font.weight}",
    padding: "{list.option.group.padding}"
  },
  clearIcon: {
    color: "{form.field.icon.color}"
  },
  checkmark: {
    color: "{list.option.color}",
    gutterStart: "-0.375rem",
    gutterEnd: "0.375rem"
  },
  emptyMessage: {
    padding: "{list.option.padding}"
  }
};
var index$p = {
  root: {
    borderRadius: "{form.field.border.radius}"
  },
  colorScheme: {
    light: {
      root: {
        invalidBorderColor: "{form.field.invalid.border.color}"
      }
    },
    dark: {
      root: {
        invalidBorderColor: "{form.field.invalid.border.color}"
      }
    }
  }
};
var index$o = {
  root: {
    borderRadius: "{content.border.radius}"
  },
  colorScheme: {
    light: {
      root: {
        background: "{surface.200}",
        animationBackground: "rgba(255,255,255,0.4)"
      }
    },
    dark: {
      root: {
        background: "rgba(255, 255, 255, 0.06)",
        animationBackground: "rgba(255, 255, 255, 0.04)"
      }
    }
  }
};
var index$n = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  track: {
    background: "{content.border.color}",
    borderRadius: "{content.border.radius}",
    size: "3px"
  },
  range: {
    background: "{primary.color}"
  },
  handle: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "{content.border.color}",
    hoverBackground: "{content.border.color}",
    content: {
      borderRadius: "50%",
      hoverBackground: "{content.background}",
      width: "16px",
      height: "16px",
      shadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.08), 0px 1px 1px 0px rgba(0, 0, 0, 0.14)"
    },
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  colorScheme: {
    light: {
      handle: {
        contentBackground: "{surface.0}"
      }
    },
    dark: {
      handle: {
        contentBackground: "{surface.950}"
      }
    }
  }
};
var index$m = {
  root: {
    gap: "0.5rem",
    transitionDuration: "{transition.duration}"
  }
};
var index$l = {
  root: {
    borderRadius: "{form.field.border.radius}",
    roundedBorderRadius: "2rem",
    raisedShadow: "0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)"
  }
};
var index$k = {
  root: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    color: "{content.color}",
    transitionDuration: "{transition.duration}"
  },
  gutter: {
    background: "{content.border.color}"
  },
  handle: {
    size: "24px",
    background: "transparent",
    borderRadius: "{content.border.radius}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  }
};
var index$j = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  separator: {
    background: "{content.border.color}",
    activeBackground: "{primary.color}",
    margin: "0 0 0 1.625rem",
    size: "2px"
  },
  step: {
    padding: "0.5rem",
    gap: "1rem"
  },
  stepHeader: {
    padding: "0",
    borderRadius: "{content.border.radius}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    },
    gap: "0.5rem"
  },
  stepTitle: {
    color: "{text.muted.color}",
    activeColor: "{primary.color}",
    fontWeight: "500"
  },
  stepNumber: {
    background: "{content.background}",
    activeBackground: "{content.background}",
    borderColor: "{content.border.color}",
    activeBorderColor: "{content.border.color}",
    color: "{text.muted.color}",
    activeColor: "{primary.color}",
    size: "2rem",
    fontSize: "1.143rem",
    fontWeight: "500",
    borderRadius: "50%",
    shadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"
  },
  steppanels: {
    padding: "0.875rem 0.5rem 1.125rem 0.5rem"
  },
  steppanel: {
    background: "{content.background}",
    color: "{content.color}",
    padding: "0 0 0 1rem"
  }
};
var index$i = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  separator: {
    background: "{content.border.color}"
  },
  itemLink: {
    borderRadius: "{content.border.radius}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    },
    gap: "0.5rem"
  },
  itemLabel: {
    color: "{text.muted.color}",
    activeColor: "{primary.color}",
    fontWeight: "500"
  },
  itemNumber: {
    background: "{content.background}",
    activeBackground: "{content.background}",
    borderColor: "{content.border.color}",
    activeBorderColor: "{content.border.color}",
    color: "{text.muted.color}",
    activeColor: "{primary.color}",
    size: "2rem",
    fontSize: "1.143rem",
    fontWeight: "500",
    borderRadius: "50%",
    shadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"
  }
};
var index$h = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  tablist: {
    borderWidth: "0 0 1px 0",
    background: "{content.background}",
    borderColor: "{content.border.color}"
  },
  item: {
    background: "transparent",
    hoverBackground: "transparent",
    activeBackground: "transparent",
    borderWidth: "0 0 1px 0",
    borderColor: "{content.border.color}",
    hoverBorderColor: "{content.border.color}",
    activeBorderColor: "{primary.color}",
    color: "{text.muted.color}",
    hoverColor: "{text.color}",
    activeColor: "{primary.color}",
    padding: "1rem 1.125rem",
    fontWeight: "600",
    margin: "0 0 -1px 0",
    gap: "0.5rem",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  itemIcon: {
    color: "{text.muted.color}",
    hoverColor: "{text.color}",
    activeColor: "{primary.color}"
  },
  activeBar: {
    height: "1px",
    bottom: "-1px",
    background: "{primary.color}"
  }
};
var index$g = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  tablist: {
    borderWidth: "0 0 1px 0",
    background: "{content.background}",
    borderColor: "{content.border.color}"
  },
  tab: {
    background: "transparent",
    hoverBackground: "transparent",
    activeBackground: "transparent",
    borderWidth: "0 0 1px 0",
    borderColor: "{content.border.color}",
    hoverBorderColor: "{content.border.color}",
    activeBorderColor: "{primary.color}",
    color: "{text.muted.color}",
    hoverColor: "{text.color}",
    activeColor: "{primary.color}",
    padding: "1rem 1.125rem",
    fontWeight: "600",
    margin: "0 0 -1px 0",
    gap: "0.5rem",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "-1px",
      shadow: "{focus.ring.shadow}"
    }
  },
  tabpanel: {
    background: "{content.background}",
    color: "{content.color}",
    padding: "0.875rem 1.125rem 1.125rem 1.125rem",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "inset {focus.ring.shadow}"
    }
  },
  navButton: {
    background: "{content.background}",
    color: "{text.muted.color}",
    hoverColor: "{text.color}",
    width: "2.5rem",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "-1px",
      shadow: "{focus.ring.shadow}"
    }
  },
  activeBar: {
    height: "1px",
    bottom: "-1px",
    background: "{primary.color}"
  },
  colorScheme: {
    light: {
      navButton: {
        shadow: "0px 0px 10px 50px rgba(255, 255, 255, 0.6)"
      }
    },
    dark: {
      navButton: {
        shadow: "0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)"
      }
    }
  }
};
var index$f = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  tabList: {
    background: "{content.background}",
    borderColor: "{content.border.color}"
  },
  tab: {
    borderColor: "{content.border.color}",
    activeBorderColor: "{primary.color}",
    color: "{text.muted.color}",
    hoverColor: "{text.color}",
    activeColor: "{primary.color}"
  },
  tabPanel: {
    background: "{content.background}",
    color: "{content.color}"
  },
  navButton: {
    background: "{content.background}",
    color: "{text.muted.color}",
    hoverColor: "{text.color}"
  },
  colorScheme: {
    light: {
      navButton: {
        shadow: "0px 0px 10px 50px rgba(255, 255, 255, 0.6)"
      }
    },
    dark: {
      navButton: {
        shadow: "0px 0px 10px 50px color-mix(in srgb, {content.background}, transparent 50%)"
      }
    }
  }
};
var index$e = {
  root: {
    fontSize: "0.875rem",
    fontWeight: "700",
    padding: "0.25rem 0.5rem",
    gap: "0.25rem",
    borderRadius: "{content.border.radius}",
    roundedBorderRadius: "{border.radius.xl}"
  },
  icon: {
    size: "0.75rem"
  },
  colorScheme: {
    light: {
      primary: {
        background: "{primary.100}",
        color: "{primary.700}"
      },
      secondary: {
        background: "{surface.100}",
        color: "{surface.600}"
      },
      success: {
        background: "{green.100}",
        color: "{green.700}"
      },
      info: {
        background: "{sky.100}",
        color: "{sky.700}"
      },
      warn: {
        background: "{orange.100}",
        color: "{orange.700}"
      },
      danger: {
        background: "{red.100}",
        color: "{red.700}"
      },
      contrast: {
        background: "{surface.950}",
        color: "{surface.0}"
      }
    },
    dark: {
      primary: {
        background: "color-mix(in srgb, {primary.500}, transparent 84%)",
        color: "{primary.300}"
      },
      secondary: {
        background: "{surface.800}",
        color: "{surface.300}"
      },
      success: {
        background: "color-mix(in srgb, {green.500}, transparent 84%)",
        color: "{green.300}"
      },
      info: {
        background: "color-mix(in srgb, {sky.500}, transparent 84%)",
        color: "{sky.300}"
      },
      warn: {
        background: "color-mix(in srgb, {orange.500}, transparent 84%)",
        color: "{orange.300}"
      },
      danger: {
        background: "color-mix(in srgb, {red.500}, transparent 84%)",
        color: "{red.300}"
      },
      contrast: {
        background: "{surface.0}",
        color: "{surface.950}"
      }
    }
  }
};
var index$d = {
  root: {
    background: "{form.field.background}",
    borderColor: "{form.field.border.color}",
    color: "{form.field.color}",
    height: "18rem",
    padding: "{form.field.padding.y} {form.field.padding.x}",
    borderRadius: "{form.field.border.radius}"
  },
  prompt: {
    gap: "0.25rem"
  },
  commandResponse: {
    margin: "2px 0"
  }
};
var index$c = {
  root: {
    background: "{form.field.background}",
    disabledBackground: "{form.field.disabled.background}",
    filledBackground: "{form.field.filled.background}",
    filledFocusBackground: "{form.field.filled.focus.background}",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.hover.border.color}",
    focusBorderColor: "{form.field.focus.border.color}",
    invalidBorderColor: "{form.field.invalid.border.color}",
    color: "{form.field.color}",
    disabledColor: "{form.field.disabled.color}",
    placeholderColor: "{form.field.placeholder.color}",
    shadow: "{form.field.shadow}",
    paddingX: "{form.field.padding.x}",
    paddingY: "{form.field.padding.y}",
    borderRadius: "{form.field.border.radius}",
    focusRing: {
      width: "{form.field.focus.ring.width}",
      style: "{form.field.focus.ring.style}",
      color: "{form.field.focus.ring.color}",
      offset: "{form.field.focus.ring.offset}",
      shadow: "{form.field.focus.ring.shadow}"
    },
    transitionDuration: "{form.field.transition.duration}"
  }
};
var index$b = {
  root: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    color: "{content.color}",
    borderRadius: "{content.border.radius}",
    shadow: "{overlay.navigation.shadow}",
    transitionDuration: "{transition.duration}"
  },
  list: {
    padding: "{navigation.list.padding}",
    gap: "{navigation.list.gap}"
  },
  item: {
    focusBackground: "{navigation.item.focus.background}",
    activeBackground: "{navigation.item.active.background}",
    color: "{navigation.item.color}",
    focusColor: "{navigation.item.focus.color}",
    activeColor: "{navigation.item.active.color}",
    padding: "{navigation.item.padding}",
    borderRadius: "{navigation.item.border.radius}",
    gap: "{navigation.item.gap}",
    icon: {
      color: "{navigation.item.icon.color}",
      focusColor: "{navigation.item.icon.focus.color}",
      activeColor: "{navigation.item.icon.active.color}"
    }
  },
  submenu: {
    mobileIndent: "1rem"
  },
  submenuLabel: {
    padding: "{navigation.submenu.label.padding}",
    fontWeight: "{navigation.submenu.label.font.weight}",
    background: "{navigation.submenu.label.background.}",
    color: "{navigation.submenu.label.color}"
  },
  submenuIcon: {
    size: "{navigation.submenu.icon.size}",
    color: "{navigation.submenu.icon.color}",
    focusColor: "{navigation.submenu.icon.focus.color}",
    activeColor: "{navigation.submenu.icon.active.color}"
  },
  separator: {
    borderColor: "{content.border.color}"
  }
};
var index$a = {
  event: {
    minHeight: "5rem"
  },
  horizontal: {
    eventContent: {
      padding: "1rem 0"
    }
  },
  vertical: {
    eventContent: {
      padding: "0 1rem"
    }
  },
  eventMarker: {
    size: "1.125rem",
    borderRadius: "50%",
    borderWidth: "2px",
    background: "{content.background}",
    borderColor: "{content.border.color}",
    content: {
      borderRadius: "50%",
      size: "0.375rem",
      background: "{primary.color}",
      insetShadow: "0px 0.5px 0px 0px rgba(0, 0, 0, 0.06), 0px 1px 1px 0px rgba(0, 0, 0, 0.12)"
    }
  },
  eventConnector: {
    color: "{content.border.color}",
    size: "2px"
  }
};
var index$9 = {
  root: {
    width: "25rem",
    borderRadius: "{content.border.radius}",
    borderWidth: "1px",
    transitionDuration: "{transition.duration}"
  },
  icon: {
    size: "1.125rem"
  },
  content: {
    padding: "{overlay.popover.padding}",
    gap: "0.5rem"
  },
  text: {
    gap: "0.5rem"
  },
  summary: {
    fontWeight: "500",
    fontSize: "1rem"
  },
  detail: {
    fontWeight: "500",
    fontSize: "0.875rem"
  },
  closeButton: {
    width: "1.75rem",
    height: "1.75rem",
    borderRadius: "50%",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      offset: "{focus.ring.offset}"
    }
  },
  closeIcon: {
    size: "1rem"
  },
  colorScheme: {
    light: {
      blur: "1.5px",
      info: {
        background: "color-mix(in srgb, {blue.50}, transparent 5%)",
        borderColor: "{blue.200}",
        color: "{blue.600}",
        detailColor: "{surface.700}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "{blue.100}",
          focusRing: {
            color: "{blue.600}",
            shadow: "none"
          }
        }
      },
      success: {
        background: "color-mix(in srgb, {green.50}, transparent 5%)",
        borderColor: "{green.200}",
        color: "{green.600}",
        detailColor: "{surface.700}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "{green.100}",
          focusRing: {
            color: "{green.600}",
            shadow: "none"
          }
        }
      },
      warn: {
        background: "color-mix(in srgb,{yellow.50}, transparent 5%)",
        borderColor: "{yellow.200}",
        color: "{yellow.600}",
        detailColor: "{surface.700}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "{yellow.100}",
          focusRing: {
            color: "{yellow.600}",
            shadow: "none"
          }
        }
      },
      error: {
        background: "color-mix(in srgb, {red.50}, transparent 5%)",
        borderColor: "{red.200}",
        color: "{red.600}",
        detailColor: "{surface.700}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "{red.100}",
          focusRing: {
            color: "{red.600}",
            shadow: "none"
          }
        }
      },
      secondary: {
        background: "{surface.100}",
        borderColor: "{surface.200}",
        color: "{surface.600}",
        detailColor: "{surface.700}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "{surface.200}",
          focusRing: {
            color: "{surface.600}",
            shadow: "none"
          }
        }
      },
      contrast: {
        background: "{surface.900}",
        borderColor: "{surface.950}",
        color: "{surface.50}",
        detailColor: "{surface.0}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",
        closeButton: {
          hoverBackground: "{surface.800}",
          focusRing: {
            color: "{surface.50}",
            shadow: "none"
          }
        }
      }
    },
    dark: {
      blur: "10px",
      info: {
        background: "color-mix(in srgb, {blue.500}, transparent 84%)",
        borderColor: "color-mix(in srgb, {blue.700}, transparent 64%)",
        color: "{blue.500}",
        detailColor: "{surface.0}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {blue.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "rgba(255, 255, 255, 0.05)",
          focusRing: {
            color: "{blue.500}",
            shadow: "none"
          }
        }
      },
      success: {
        background: "color-mix(in srgb, {green.500}, transparent 84%)",
        borderColor: "color-mix(in srgb, {green.700}, transparent 64%)",
        color: "{green.500}",
        detailColor: "{surface.0}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {green.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "rgba(255, 255, 255, 0.05)",
          focusRing: {
            color: "{green.500}",
            shadow: "none"
          }
        }
      },
      warn: {
        background: "color-mix(in srgb, {yellow.500}, transparent 84%)",
        borderColor: "color-mix(in srgb, {yellow.700}, transparent 64%)",
        color: "{yellow.500}",
        detailColor: "{surface.0}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {yellow.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "rgba(255, 255, 255, 0.05)",
          focusRing: {
            color: "{yellow.500}",
            shadow: "none"
          }
        }
      },
      error: {
        background: "color-mix(in srgb, {red.500}, transparent 84%)",
        borderColor: "color-mix(in srgb, {red.700}, transparent 64%)",
        color: "{red.500}",
        detailColor: "{surface.0}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {red.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "rgba(255, 255, 255, 0.05)",
          focusRing: {
            color: "{red.500}",
            shadow: "none"
          }
        }
      },
      secondary: {
        background: "{surface.800}",
        borderColor: "{surface.700}",
        color: "{surface.300}",
        detailColor: "{surface.0}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.500}, transparent 96%)",
        closeButton: {
          hoverBackground: "{surface.700}",
          focusRing: {
            color: "{surface.300}",
            shadow: "none"
          }
        }
      },
      contrast: {
        background: "{surface.0}",
        borderColor: "{surface.100}",
        color: "{surface.950}",
        detailColor: "{surface.950}",
        shadow: "0px 4px 8px 0px color-mix(in srgb, {surface.950}, transparent 96%)",
        closeButton: {
          hoverBackground: "{surface.100}",
          focusRing: {
            color: "{surface.950}",
            shadow: "none"
          }
        }
      }
    }
  }
};
var index$8 = {
  root: {
    padding: "0.5rem 1rem",
    borderRadius: "{content.border.radius}",
    gap: "0.5rem",
    fontWeight: "500",
    disabledBackground: "{form.field.disabled.background}",
    disabledBorderColor: "{form.field.disabled.background}",
    disabledColor: "{form.field.disabled.color}",
    invalidBorderColor: "{form.field.invalid.border.color}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    },
    transitionDuration: "{form.field.transition.duration}"
  },
  icon: {
    disabledColor: "{form.field.disabled.color}"
  },
  content: {
    left: "0.25rem",
    top: "0.25rem",
    checkedShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.02), 0px 1px 2px 0px rgba(0, 0, 0, 0.04)"
  },
  colorScheme: {
    light: {
      root: {
        background: "{surface.100}",
        checkedBackground: "{surface.100}",
        hoverBackground: "{surface.100}",
        borderColor: "{surface.100}",
        color: "{surface.500}",
        hoverColor: "{surface.700}",
        checkedColor: "{surface.900}",
        checkedBorderColor: "{surface.100}"
      },
      content: {
        checkedBackground: "{surface.0}"
      },
      icon: {
        color: "{surface.500}",
        hoverColor: "{surface.700}",
        checkedColor: "{surface.900}"
      }
    },
    dark: {
      root: {
        background: "{surface.950}",
        checkedBackground: "{surface.950}",
        hoverBackground: "{surface.950}",
        borderColor: "{surface.950}",
        color: "{surface.400}",
        hoverColor: "{surface.300}",
        checkedColor: "{surface.0}",
        checkedBorderColor: "{surface.950}"
      },
      content: {
        checkedBackground: "{surface.800}"
      },
      icon: {
        color: "{surface.400}",
        hoverColor: "{surface.300}",
        checkedColor: "{surface.0}"
      }
    }
  }
};
var index$7 = {
  root: {
    width: "2.5rem",
    height: "1.5rem",
    borderRadius: "30px",
    gap: "0.25rem",
    shadow: "{form.field.shadow}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    },
    borderWidth: "1px",
    borderColor: "transparent",
    hoverBorderColor: "transparent",
    checkedBorderColor: "transparent",
    checkedHoverBorderColor: "transparent",
    invalidBorderColor: "{form.field.invalid.border.color}",
    transitionDuration: "{form.field.transition.duration}",
    slideDuration: "0.2s"
  },
  handle: {
    borderRadius: "50%",
    size: "1rem"
  },
  colorScheme: {
    light: {
      root: {
        background: "{surface.300}",
        disabledBackground: "{form.field.disabled.background}",
        hoverBackground: "{surface.400}",
        checkedBackground: "{primary.color}",
        checkedHoverBackground: "{primary.hover.color}"
      },
      handle: {
        background: "{surface.0}",
        disabledBackground: "{form.field.disabled.color}",
        hoverBackground: "{surface.0}",
        checkedBackground: "{surface.0}",
        checkedHoverBackground: "{surface.0}",
        color: "{text.muted.color}",
        hoverColor: "{text.color}",
        checkedColor: "{primary.color}",
        checkedHoverColor: "{primary.hover.color}"
      }
    },
    dark: {
      root: {
        background: "{surface.700}",
        disabledBackground: "{surface.600}",
        hoverBackground: "{surface.600}",
        checkedBackground: "{primary.color}",
        checkedHoverBackground: "{primary.hover.color}"
      },
      handle: {
        background: "{surface.400}",
        disabledBackground: "{surface.900}",
        hoverBackground: "{surface.300}",
        checkedBackground: "{surface.900}",
        checkedHoverBackground: "{surface.900}",
        color: "{surface.900}",
        hoverColor: "{surface.800}",
        checkedColor: "{primary.color}",
        checkedHoverColor: "{primary.hover.color}"
      }
    }
  }
};
var index$6 = {
  root: {
    background: "{content.background}",
    borderColor: "{content.border.color}",
    borderRadius: "{content.border.radius}",
    color: "{content.color}",
    gap: "0.5rem",
    padding: "0.75rem"
  }
};
var index$5 = {
  root: {
    maxWidth: "12.5rem",
    gutter: "0.25rem",
    shadow: "{overlay.popover.shadow}",
    padding: "0.5rem 0.75rem",
    borderRadius: "{overlay.popover.border.radius}"
  },
  colorScheme: {
    light: {
      root: {
        background: "{surface.700}",
        color: "{surface.0}"
      }
    },
    dark: {
      root: {
        background: "{surface.700}",
        color: "{surface.0}"
      }
    }
  }
};
var index$4 = {
  root: {
    background: "{content.background}",
    color: "{content.color}",
    padding: "1rem",
    gap: "2px",
    indent: "1rem",
    transitionDuration: "{transition.duration}"
  },
  node: {
    padding: "0.25rem 0.5rem",
    borderRadius: "{content.border.radius}",
    hoverBackground: "{content.hover.background}",
    selectedBackground: "{highlight.background}",
    color: "{text.color}",
    hoverColor: "{text.hover.color}",
    selectedColor: "{highlight.color}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "-1px",
      shadow: "{focus.ring.shadow}"
    },
    gap: "0.25rem"
  },
  nodeIcon: {
    color: "{text.muted.color}",
    hoverColor: "{text.hover.muted.color}",
    selectedColor: "{highlight.color}"
  },
  nodeToggleButton: {
    borderRadius: "50%",
    size: "1.75rem",
    hoverBackground: "{content.hover.background}",
    selectedHoverBackground: "{content.background}",
    color: "{text.muted.color}",
    hoverColor: "{text.hover.muted.color}",
    selectedHoverColor: "{primary.color}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  loadingIcon: {
    size: "2rem"
  },
  filter: {
    margin: "0 0 0.5rem 0"
  }
};
var index$3 = {
  root: {
    background: "{form.field.background}",
    disabledBackground: "{form.field.disabled.background}",
    filledBackground: "{form.field.filled.background}",
    filledHoverBackground: "{form.field.filled.hover.background}",
    filledFocusBackground: "{form.field.filled.focus.background}",
    borderColor: "{form.field.border.color}",
    hoverBorderColor: "{form.field.hover.border.color}",
    focusBorderColor: "{form.field.focus.border.color}",
    invalidBorderColor: "{form.field.invalid.border.color}",
    color: "{form.field.color}",
    disabledColor: "{form.field.disabled.color}",
    placeholderColor: "{form.field.placeholder.color}",
    shadow: "{form.field.shadow}",
    paddingX: "{form.field.padding.x}",
    paddingY: "{form.field.padding.y}",
    borderRadius: "{form.field.border.radius}",
    focusRing: {
      width: "{form.field.focus.ring.width}",
      style: "{form.field.focus.ring.style}",
      color: "{form.field.focus.ring.color}",
      offset: "{form.field.focus.ring.offset}",
      shadow: "{form.field.focus.ring.shadow}"
    },
    transitionDuration: "{form.field.transition.duration}"
  },
  dropdown: {
    width: "2.5rem",
    color: "{form.field.icon.color}"
  },
  overlay: {
    background: "{overlay.select.background}",
    borderColor: "{overlay.select.border.color}",
    borderRadius: "{overlay.select.border.radius}",
    color: "{overlay.select.color}",
    shadow: "{overlay.select.shadow}"
  },
  tree: {
    padding: "{list.padding}"
  },
  emptyMessage: {
    padding: "{list.option.padding}"
  },
  chip: {
    borderRadius: "{border.radius.sm}"
  }
};
var index$2 = {
  root: {
    transitionDuration: "{transition.duration}"
  },
  header: {
    background: "{content.background}",
    borderColor: "{treetable.border.color}",
    color: "{content.color}",
    borderWidth: "0 0 1px 0",
    padding: "0.75rem 1rem"
  },
  headerCell: {
    background: "{content.background}",
    hoverBackground: "{content.hover.background}",
    selectedBackground: "{highlight.background}",
    borderColor: "{treetable.border.color}",
    color: "{content.color}",
    hoverColor: "{content.hover.color}",
    selectedColor: "{highlight.color}",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "-1px",
      shadow: "{focus.ring.shadow}"
    }
  },
  columnTitle: {
    fontWeight: "600"
  },
  row: {
    background: "{content.background}",
    hoverBackground: "{content.hover.background}",
    selectedBackground: "{highlight.background}",
    color: "{content.color}",
    hoverColor: "{content.hover.color}",
    selectedColor: "{highlight.color}",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "-1px",
      shadow: "{focus.ring.shadow}"
    }
  },
  bodyCell: {
    borderColor: "{treetable.border.color}",
    padding: "0.75rem 1rem",
    gap: "0.5rem"
  },
  footerCell: {
    background: "{content.background}",
    borderColor: "{treetable.border.color}",
    color: "{content.color}",
    padding: "0.75rem 1rem"
  },
  columnFooter: {
    fontWeight: "600"
  },
  footer: {
    background: "{content.background}",
    borderColor: "{treetable.border.color}",
    color: "{content.color}",
    borderWidth: "0 0 1px 0",
    padding: "0.75rem 1rem"
  },
  columnResizerWidth: "0.5rem",
  resizeIndicator: {
    width: "1px",
    color: "{primary.color}"
  },
  sortIcon: {
    color: "{text.muted.color}",
    hoverColor: "{text.hover.muted.color}",
    size: "0.875rem"
  },
  loadingIcon: {
    size: "2rem"
  },
  nodeToggleButton: {
    hoverBackground: "{content.hover.background}",
    selectedHoverBackground: "{content.background}",
    color: "{text.muted.color}",
    hoverColor: "{text.color}",
    selectedHoverColor: "{primary.color}",
    size: "1.75rem",
    borderRadius: "50%",
    focusRing: {
      width: "{focus.ring.width}",
      style: "{focus.ring.style}",
      color: "{focus.ring.color}",
      offset: "{focus.ring.offset}",
      shadow: "{focus.ring.shadow}"
    }
  },
  paginatorTop: {
    borderColor: "{content.border.color}",
    borderWidth: "0 0 1px 0"
  },
  paginatorBottom: {
    borderColor: "{content.border.color}",
    borderWidth: "0 0 1px 0"
  },
  colorScheme: {
    light: {
      root: {
        borderColor: "{content.border.color}"
      },
      bodyCell: {
        selectedBorderColor: "{primary.100}"
      }
    },
    dark: {
      root: {
        borderColor: "{surface.800}"
      },
      bodyCell: {
        selectedBorderColor: "{primary.900}"
      }
    }
  }
};
var index$1 = {
  loader: {
    mask: {
      background: "{content.background}",
      color: "{text.muted.color}"
    },
    icon: {
      size: "2rem"
    }
  }
};
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var index = _objectSpread(_objectSpread({}, index$1k), {}, {
  components: {
    accordion: index$1o,
    autocomplete: index$1n,
    avatar: index$1m,
    badge: index$1l,
    blockui: index$1j,
    breadcrumb: index$1i,
    button: index$1h,
    datepicker: index$15,
    card: index$1g,
    carousel: index$1f,
    cascadeselect: index$1e,
    checkbox: index$1d,
    chip: index$1c,
    colorpicker: index$1b,
    confirmdialog: index$1a,
    confirmpopup: index$19,
    contextmenu: index$18,
    dataview: index$16,
    datatable: index$17,
    dialog: index$14,
    divider: index$13,
    dock: index$12,
    drawer: index$11,
    editor: index$10,
    fieldset: index$$,
    fileupload: index$_,
    iftalabel: index$W,
    floatlabel: index$Z,
    galleria: index$Y,
    iconfield: index$X,
    image: index$V,
    imagecompare: index$U,
    inlinemessage: index$T,
    inplace: index$S,
    inputchips: index$R,
    inputgroup: index$Q,
    inputnumber: index$P,
    inputtext: index$O,
    knob: index$N,
    listbox: index$M,
    megamenu: index$L,
    menu: index$K,
    menubar: index$J,
    message: index$I,
    metergroup: index$H,
    multiselect: index$G,
    orderlist: index$F,
    organizationchart: index$E,
    overlaybadge: index$D,
    popover: index$x,
    paginator: index$C,
    password: index$z,
    panel: index$B,
    panelmenu: index$A,
    picklist: index$y,
    progressbar: index$w,
    progressspinner: index$v,
    radiobutton: index$u,
    rating: index$t,
    scrollpanel: index$r,
    select: index$q,
    selectbutton: index$p,
    skeleton: index$o,
    slider: index$n,
    speeddial: index$m,
    splitter: index$k,
    splitbutton: index$l,
    stepper: index$j,
    steps: index$i,
    tabmenu: index$h,
    tabs: index$g,
    tabview: index$f,
    textarea: index$c,
    tieredmenu: index$b,
    tag: index$e,
    terminal: index$d,
    timeline: index$a,
    togglebutton: index$8,
    toggleswitch: index$7,
    tree: index$4,
    treeselect: index$3,
    treetable: index$2,
    toast: index$9,
    toolbar: index$6,
    virtualscroller: index$1
  },
  directives: {
    tooltip: index$5,
    ripple: index$s
  }
});
const primevueTheme = definePreset(index, {
  sematic: {
    primary: {
      50: "{indigo.50}",
      100: "{indigo.100}",
      200: "{indigo.200}",
      300: "{indigo.300}",
      400: "{indigo.400}",
      500: "{indigo.500}",
      600: "{indigo.600}",
      700: "{indigo.700}",
      800: "{indigo.800}",
      900: "{indigo.900}",
      950: "{indigo.950}"
    }
  }
});
const undefined$1 = {
  preset: primevueTheme,
  options: {
    darkModeSelector: ".dark"
  }
};
const primevue_plugin_egKpok8Auk = /* @__PURE__ */ defineNuxtPlugin(({ vueApp }) => {
  var _a;
  const runtimeConfig = /* @__PURE__ */ useRuntimeConfig();
  const config = ((_a = runtimeConfig == null ? void 0 : runtimeConfig.public) == null ? void 0 : _a.primevue) ?? {};
  const { usePrimeVue = true, options = {} } = config;
  const pt = {};
  const theme3 = { theme: undefined$1 || (options == null ? void 0 : options.theme) };
  usePrimeVue && vueApp.use(PrimeVue, { ...options, ...pt, ...theme3 });
  vueApp.use(ConfirmationService);
  vueApp.use(DialogService);
  vueApp.use(ToastService);
});
function hydrateStore(store, {
  storage,
  serializer,
  key,
  debug,
  pick,
  omit,
  beforeHydrate,
  afterHydrate
}, context, runHooks = true) {
  try {
    if (runHooks)
      beforeHydrate == null ? void 0 : beforeHydrate(context);
    const fromStorage = storage.getItem(key);
    if (fromStorage) {
      const deserialized = serializer.deserialize(fromStorage);
      const picked = pick ? deepPickUnsafe(deserialized, pick) : deserialized;
      const omitted = omit ? deepOmitUnsafe(picked, omit) : picked;
      store.$patch(omitted);
    }
    if (runHooks)
      afterHydrate == null ? void 0 : afterHydrate(context);
  } catch (error) {
    if (debug)
      console.error("[pinia-plugin-persistedstate]", error);
  }
}
function persistState(state, {
  storage,
  serializer,
  key,
  debug,
  pick,
  omit
}) {
  try {
    const picked = pick ? deepPickUnsafe(state, pick) : state;
    const omitted = omit ? deepOmitUnsafe(picked, omit) : picked;
    const toStorage = serializer.serialize(omitted);
    storage.setItem(key, toStorage);
  } catch (error) {
    if (debug)
      console.error("[pinia-plugin-persistedstate]", error);
  }
}
function createPersistence(context, optionsParser, auto) {
  const { pinia, store, options: { persist = auto } } = context;
  if (!persist)
    return;
  if (!(store.$id in pinia.state.value)) {
    const originalStore = pinia._s.get(store.$id.replace("__hot:", ""));
    if (originalStore)
      Promise.resolve().then(() => originalStore.$persist());
    return;
  }
  const persistenceOptions = Array.isArray(persist) ? persist : persist === true ? [{}] : [persist];
  const persistences = persistenceOptions.map(optionsParser);
  store.$hydrate = ({ runHooks = true } = {}) => {
    persistences.forEach((p) => {
      hydrateStore(store, p, context, runHooks);
    });
  };
  store.$persist = () => {
    persistences.forEach((p) => {
      persistState(store.$state, p);
    });
  };
  persistences.forEach((p) => {
    hydrateStore(store, p, context);
    store.$subscribe(
      (_mutation, state) => persistState(state, p),
      { detached: true }
    );
  });
}
function cookies(options = {}) {
  return {
    getItem: (key) => useCookie(
      key,
      {
        ...options,
        decode: decodeURIComponent,
        readonly: true
      }
    ).value,
    setItem: (key, value) => useCookie(
      key,
      {
        ...options,
        encode: encodeURIComponent
      }
    ).value = value
  };
}
function localStorage() {
  return {
    getItem: (key) => null,
    setItem: (key, value) => null
  };
}
function sessionStorage() {
  return {
    getItem: (key) => null,
    setItem: (key, value) => null
  };
}
const storages = {
  cookies,
  localStorage,
  sessionStorage
};
function piniaPlugin(context) {
  const config = /* @__PURE__ */ useRuntimeConfig();
  const options = config.public.piniaPluginPersistedstate;
  createPersistence(
    context,
    (p) => ({
      key: options.key ? options.key.replace(/%id/g, p.key ?? context.store.$id) : p.key ?? context.store.$id,
      debug: p.debug ?? options.debug ?? false,
      serializer: p.serializer ?? {
        serialize: (data) => JSON.stringify(data),
        deserialize: (data) => destr(data)
      },
      storage: p.storage ?? (options.storage ? options.storage === "cookies" ? storages.cookies(options.cookieOptions) : storages[options.storage]() : storages.cookies()),
      beforeHydrate: p.beforeHydrate,
      afterHydrate: p.afterHydrate,
      pick: p.pick,
      omit: p.omit
    }),
    options.auto ?? false
  );
}
const plugin_PSbK9A48ZQ = /* @__PURE__ */ defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(piniaPlugin);
});
const plugin_eskviOYyLt = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  let __temp, __restore;
  const { googleSignIn } = (/* @__PURE__ */ useRuntimeConfig()).public;
  if (googleSignIn) {
    const plugin2 = ([__temp, __restore] = executeAsync(() => import('vue3-google-signin')), __temp = await __temp, __restore(), __temp);
    nuxtApp.vueApp.use(plugin2.default, { clientId: googleSignIn.clientId });
  }
});
const STATE_KEY = "viewportState";
function createViewportManager(options, state) {
  const breakpoint = computed({
    get() {
      return state.value || options.fallbackBreakpoint;
    },
    set(newBreakpoint) {
      state.value = newBreakpoint;
    }
  });
  const queries = computed(() => {
    const breakpoints = options.breakpoints || {};
    const breakpointsKeys = Object.keys(breakpoints).sort((a, b) => breakpoints[a] - breakpoints[b]);
    const output = {};
    let i = breakpointsKeys.length;
    while (i--) {
      const currentKey = breakpointsKeys[i];
      const size = breakpoints[currentKey];
      const nextSize = breakpoints[breakpointsKeys[i + 1]];
      const prevSize = breakpoints[breakpointsKeys[i - 1]];
      let mediaQuery = "";
      if (options.feature === "minWidth") {
        if (i > 0) {
          mediaQuery = `(min-width: ${size}px)`;
        } else {
          mediaQuery = "(min-width: 1px)";
        }
        if (nextSize) {
          mediaQuery += ` and (max-width: ${nextSize - 1}px)`;
        }
      } else {
        mediaQuery = `(max-width: ${size}px)`;
        if (prevSize) {
          mediaQuery = `(min-width: ${prevSize - 1}px) and ${mediaQuery}`;
        }
      }
      output[currentKey] = {
        mediaQuery,
        size
      };
    }
    return output;
  });
  const queriesKeys = computed(() => Object.keys(queries.value));
  return {
    breakpoint,
    breakpointValue,
    isGreaterThan,
    isGreaterOrEquals,
    isLessThan,
    isLessOrEquals,
    match,
    matches,
    queries
  };
  function breakpointValue(searchBreakpoint) {
    const breakpoints = options.breakpoints || {};
    return breakpoints[searchBreakpoint];
  }
  function isGreaterThan(searchBreakpoint) {
    const currentIndex = queriesKeys.value.indexOf(breakpoint.value);
    const breakpointIndex = queriesKeys.value.indexOf(searchBreakpoint);
    if (breakpointIndex === -1) {
      return false;
    }
    return breakpointIndex > currentIndex;
  }
  function isGreaterOrEquals(searchBreakpoint) {
    return isGreaterThan(searchBreakpoint) || match(searchBreakpoint);
  }
  function isLessThan(searchBreakpoint) {
    const currentIndex = queriesKeys.value.indexOf(breakpoint.value);
    const breakpointIndex = queriesKeys.value.indexOf(searchBreakpoint);
    if (breakpointIndex === -1) {
      return false;
    }
    return breakpointIndex < currentIndex;
  }
  function isLessOrEquals(searchBreakpoint) {
    return isLessThan(searchBreakpoint) || match(searchBreakpoint);
  }
  function match(breakpointToMatch) {
    return breakpoint.value === breakpointToMatch;
  }
  function matches(...breakpointsToMatch) {
    return breakpointsToMatch.includes(breakpoint.value);
  }
}
async function detectBreakpoint(options, input) {
  var _a;
  try {
    if (input.cookie && input.cookie in options.breakpoints) {
      return input.cookie;
    }
    const userAgent = (_a = input.headers) == null ? void 0 : _a["user-agent"];
    if (!userAgent) {
      return options.fallbackBreakpoint;
    }
    let deviceType = "";
    if (input.headers) {
      if (userAgent === "Amazon CloudFront") {
        const types = {
          "cloudfront-is-android-viewer": "mobile",
          "cloudfront-is-desktop-viewer": "desktop",
          "cloudfront-is-ios-viewer": "mobile",
          "cloudfront-is-mobile-viewer": "mobile",
          "cloudfront-is-smarttv-viewer": "tv",
          "cloudfront-is-tablet-viewer": "tablet"
        };
        for (const key in types) {
          if (input.headers[key] === "true") {
            deviceType = types[key];
            break;
          }
        }
      } else if (input.headers["cf-device-type"]) {
        deviceType = input.headers["cf-device-type"];
      }
    }
    if (!deviceType) {
      const { default: Bowser } = await import(
        /* webpackChunkName: "bowser" */
        'bowser'
      );
      const parser = Bowser.getParser(userAgent);
      deviceType = parser.getPlatformType();
    }
    if (deviceType in options.defaultBreakpoints) {
      return options.defaultBreakpoints[deviceType];
    }
    return options.fallbackBreakpoint;
  } catch (error) {
    console.error(error);
    return options.fallbackBreakpoint;
  }
}
function parseCookie(input) {
  if (!input.length) {
    return {};
  }
  return Object.fromEntries(input.split(/; */).map((cookie) => cookie.split("=", 2)));
}
const viewportOptions = { "breakpoints": { "desktop": 1024, "desktopMedium": 1280, "desktopWide": 1600, "mobile": 320, "mobileMedium": 375, "mobileWide": 425, "tablet": 768 }, "cookie": { "expires": 365, "name": "viewport", "path": "/", "sameSite": "Strict", "secure": true }, "defaultBreakpoints": { "desktop": "desktop", "mobile": "mobile", "tablet": "tablet" }, "fallbackBreakpoint": "desktop", "feature": "minWidth" };
const plugin_server_dMhYspXuPp = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  var _a, _b, _c, _d;
  let __temp, __restore;
  const state = useState(STATE_KEY, "$Nx3rdeBeDI");
  const manager = createViewportManager(viewportOptions, state);
  let cookie = "";
  const headers = (_c = (_b = (_a = nuxtApp == null ? void 0 : nuxtApp.ssrContext) == null ? void 0 : _a.event) == null ? void 0 : _b.req) == null ? void 0 : _c.headers;
  if (headers != null) {
    cookie = headers.cookie;
    headers["user-agent"];
  }
  if (typeof cookie !== "string") {
    cookie = "";
  }
  cookie = parseCookie(cookie)[(_d = viewportOptions.cookie) == null ? void 0 : _d.name];
  state.value = ([__temp, __restore] = executeAsync(() => detectBreakpoint(viewportOptions, { cookie, headers })), __temp = await __temp, __restore(), __temp);
  return nuxtApp.provide("viewport", manager);
});
const plugin_WLsn00x1qh = /* @__PURE__ */ defineNuxtPlugin({
  name: "@nuxt/icon",
  setup() {
    var _a, _b;
    const config = /* @__PURE__ */ useRuntimeConfig();
    const options = useAppConfig().icon;
    _api.setFetch($fetch.native);
    disableCache("all");
    const resources = [];
    if (options.provider === "server") {
      const baseURL2 = ((_b = (_a = config.app) == null ? void 0 : _a.baseURL) == null ? void 0 : _b.replace(/\/$/, "")) ?? "";
      resources.push(baseURL2 + (options.localApiEndpoint || "/api/_nuxt_icon"));
      if (options.fallbackToApi === true || options.fallbackToApi === "client-only") {
        resources.push(options.iconifyApiEndpoint);
      }
    } else {
      resources.push(options.iconifyApiEndpoint);
    }
    addAPIProvider("", { resources });
  }
});
const preference = "system";
const plugin_server_ano7jnMEqi = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  var _a;
  const colorMode = ((_a = nuxtApp.ssrContext) == null ? void 0 : _a.islandContext) ? ref({}) : useState("color-mode", () => reactive({
    preference,
    value: preference,
    unknown: true,
    forced: false
  })).value;
  const htmlAttrs = {};
  {
    useHead({ htmlAttrs });
  }
  useRouter().afterEach((to) => {
    const forcedColorMode = to.meta.colorMode;
    if (forcedColorMode && forcedColorMode !== "system") {
      colorMode.value = htmlAttrs["data-color-mode-forced"] = forcedColorMode;
      colorMode.forced = true;
    } else if (forcedColorMode === "system") {
      console.warn("You cannot force the colorMode to system at the page level.");
    }
  });
  nuxtApp.provide("colorMode", colorMode);
});
const error_handler_kEP5FliEXj = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
  };
  nuxtApp.hook("vue:error", (error, instance, info) => {
  });
});
const now = dayjs();
const today = dayjs(now).format("dddd, DD MMMM, YYYY");
const todays_sO8mOCg3JC = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.today = today;
});
const vue_start_rating_DR3xQYQCpq = /* @__PURE__ */ defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("vue3-star-ratings", vue3StarRatings);
});
const plugins = [
  unhead_KgADcZ0jPj,
  plugin$1,
  revive_payload_server_eJ33V7gbc6,
  plugin,
  components_plugin_KR1HBZs4kY,
  primevue_plugin_egKpok8Auk,
  plugin_PSbK9A48ZQ,
  plugin_eskviOYyLt,
  plugin_server_dMhYspXuPp,
  plugin_WLsn00x1qh,
  plugin_server_ano7jnMEqi,
  error_handler_kEP5FliEXj,
  todays_sO8mOCg3JC,
  vue_start_rating_DR3xQYQCpq
];
function defaultEstimatedProgress(duration, elapsed) {
  const completionPercentage = elapsed / duration * 100;
  return 2 / Math.PI * 100 * Math.atan(completionPercentage / 50);
}
function createLoadingIndicator(opts = {}) {
  const { duration = 2e3, throttle = 200, hideDelay = 500, resetDelay = 400 } = opts;
  opts.estimatedProgress || defaultEstimatedProgress;
  const nuxtApp = useNuxtApp();
  const progress = ref(0);
  const isLoading = ref(false);
  const error = ref(false);
  const start = () => {
    error.value = false;
    set2(0);
  };
  function set2(at = 0) {
    if (nuxtApp.isHydrating) {
      return;
    }
    if (at >= 100) {
      return finish();
    }
    progress.value = at < 0 ? 0 : at;
    if (throttle && false) {
      setTimeout(() => {
        isLoading.value = true;
      }, throttle);
    } else {
      isLoading.value = true;
    }
  }
  function finish(opts2 = {}) {
    progress.value = 100;
    if (opts2.error) {
      error.value = true;
    }
    if (opts2.force) {
      progress.value = 0;
      isLoading.value = false;
    }
  }
  function clear() {
  }
  let _cleanup = () => {
  };
  return {
    _cleanup,
    progress: computed(() => progress.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    start,
    set: set2,
    finish,
    clear
  };
}
function useLoadingIndicator(opts = {}) {
  const nuxtApp = useNuxtApp();
  const indicator = nuxtApp._loadingIndicator = nuxtApp._loadingIndicator || createLoadingIndicator(opts);
  return indicator;
}
const __nuxt_component_0 = defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    },
    errorColor: {
      type: String,
      default: "repeating-linear-gradient(to right,#f87171 0%,#ef4444 100%)"
    },
    estimatedProgress: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots, expose }) {
    const { progress, isLoading, error, start, finish, clear } = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle,
      estimatedProgress: props.estimatedProgress
    });
    expose({
      progress,
      isLoading,
      error,
      start,
      finish,
      clear
    });
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: isLoading.value ? 1 : 0,
        background: error.value ? props.errorColor : props.color || void 0,
        backgroundSize: `${100 / progress.value * 100}% auto`,
        transform: `scaleX(${progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
const layouts = {
  auth: () => import('./auth-Cp9bPDU1.mjs'),
  default: () => import('./default-HUcblzJK.mjs')
};
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  async setup(props, context) {
    const LayoutComponent = await layouts[props.name]().then((r) => r.default || r);
    return () => h(LayoutComponent, props.layoutProps, context.slots);
  }
});
const __nuxt_component_1 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    },
    fallback: {
      type: [String, Object],
      default: null
    }
  },
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const route = injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route.meta.layout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = ref();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route.meta.layoutTransition ?? appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        isCurrent: (route) => name === (route.meta.layout ?? "default")
      });
    }
    return () => {
      var _a, _b;
      if (!name || typeof name === "string" && !(name in layouts)) {
        return (_b = (_a = context.slots).default) == null ? void 0 : _b.call(_a);
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const RouteProvider = defineComponent({
  props: {
    vnode: {
      type: Object,
      required: true
    },
    route: {
      type: Object,
      required: true
    },
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const __nuxt_component_2 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    const forkRoute = inject(PageRouteSymbol, null);
    let previousPageKey;
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    let vnode;
    const done = nuxtApp.deferHydration();
    if (props.pageKey) {
      watch(() => props.pageKey, (next, prev) => {
        if (next !== prev) {
          nuxtApp.callHook("page:loading:start");
        }
      });
    }
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          if (!routeProps.Component) {
            done();
            return;
          }
          const key = generateRouteKey$1(routeProps, props.pageKey);
          if (!nuxtApp.isHydrating && !hasChildrenRoutes(forkRoute, routeProps.route, routeProps.Component) && previousPageKey === key) {
            nuxtApp.callHook("page:loading:end");
          }
          previousPageKey = key;
          const hasTransition = !!(props.transition ?? routeProps.route.meta.pageTransition ?? appPageTransition);
          const transitionProps = hasTransition && _mergeTransitionProps([
            props.transition,
            routeProps.route.meta.pageTransition,
            appPageTransition,
            { onAfterLeave: () => {
              nuxtApp.callHook("page:transition:finish", routeProps.Component);
            } }
          ].filter(Boolean));
          const keepaliveConfig = props.keepalive ?? routeProps.route.meta.keepalive ?? appKeepalive;
          vnode = _wrapIf(
            Transition,
            hasTransition && transitionProps,
            wrapInKeepAlive(
              keepaliveConfig,
              h(Suspense, {
                suspensible: true,
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => {
                  nextTick(() => nuxtApp.callHook("page:finish", routeProps.Component).then(() => nuxtApp.callHook("page:loading:end")).finally(done));
                }
              }, {
                default: () => {
                  const providerVNode = h(RouteProvider, {
                    key: key || void 0,
                    vnode: slots.default ? h(Fragment, void 0, slots.default(routeProps)) : routeProps.Component,
                    route: routeProps.route,
                    renderKey: key || void 0,
                    trackRootNodes: hasTransition,
                    vnodeRef: pageRef
                  });
                  return providerVNode;
                }
              })
            )
          ).default();
          return vnode;
        }
      });
    };
  }
});
function _mergeTransitionProps(routeProps) {
  const _props = routeProps.map((prop) => ({
    ...prop,
    onAfterLeave: prop.onAfterLeave ? toArray(prop.onAfterLeave) : void 0
  }));
  return defu(..._props);
}
function hasChildrenRoutes(fork, newRoute, Component) {
  if (!fork) {
    return false;
  }
  const index2 = newRoute.matched.findIndex((m) => {
    var _a;
    return ((_a = m.components) == null ? void 0 : _a.default) === (Component == null ? void 0 : Component.type);
  });
  return index2 < newRoute.matched.length - 1;
}
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLoadingIndicator = __nuxt_component_0;
      const _component_NuxtLayout = __nuxt_component_1;
      const _component_NuxtPage = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_component_NuxtLoadingIndicator, {
        height: 5,
        throttle: 0
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    useHead({
      link: {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css",
        type: "text/css"
      },
      script: {
        src: "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "flex items-center h-full p-16 bg-gray-50 dark:bg-gray-900" }, _attrs))}><div class="container flex flex-col items-center justify-center px-5 mx-auto my-8"><div class="max-w-md text-center"><h2 class="mb-8 font-extrabold text-9xl dark:text-gray-400"><span class="sr-only">Error</span>${ssrInterpolate(props.error.statusCode)}</h2><p class="text-2xl font-semibold md:text-3xl">${ssrInterpolate(props.error.statusMessage)}</p><p class="mt-4 mb-8 dark:text-gray-600"> But dont worry, you can find plenty of other things on our homepage. </p><button class="inline-flex bg-green-600 text-gray-50 px-8 py-3 font-semibold rounded uppercase hover:bg-green-800"> Back to homepage </button></div></div></section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error = nuxt.payload.error || createError(error);
    }
    if (ssrContext == null ? void 0 : ssrContext._renderResponse) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry$1 = (ssrContext) => entry(ssrContext);

export { BaseStyle as B, FilterService as F, PrimeVueService as P, __nuxt_component_2 as _, useRoute as a, useNuxtApp as b, useRuntimeConfig as c, defineStore as d, entry$1 as default, FilterOperator as e, FilterMatchMode as f, useToast as g, asyncDataDefaults as h, createError as i, useAppConfig as j, useRouter as k, nuxtLinkDefaults as l, skipHydrate as m, navigateTo as n, useRequestEvent as o, defineNuxtRouteMiddleware as p, callWithNuxt as q, resolveRouteObject as r, storages as s, useState as t, useHead as u };
//# sourceMappingURL=server.mjs.map

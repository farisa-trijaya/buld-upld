import _sfc_main$5 from './LoadingSkeleton-BGYYkLjL.mjs';
import { S as Swiper2, a as SwiperSlide } from './entry-styles-4.mjs-BmHerzb_.mjs';
import { defineAsyncComponent, defineComponent, ref, h, computed, provide, onMounted, watch, watchEffect, Fragment, onUnmounted, inject, useSSRContext, unref, mergeProps, withCtx, createVNode, toDisplayString, openBlock, createBlock, renderList, isRef, createCommentVNode, withModifiers, withDirectives, vModelText, vModelDynamic } from 'vue';
import { Navigation, Thumbs } from 'swiper/modules';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderDynamicModel } from 'vue/server-renderer';
import { _ as __nuxt_component_5 } from './client-only-pjR2XYdd.mjs';
import __nuxt_component_4 from './index-BzxFm_el.mjs';
import { _ as _sfc_main$6 } from './CounterButton-CHd8TWSH.mjs';
import { f as f$1, a as u$4, O, o as o$2, A as A$2, T as T$2, i as i$5, N as N$4, u as useCartStore, b as u$5, c as o, d as T$1, t as t$3, e as i$2, P, g as N$2, S as Se, Y as Ye, h as he, G as Ge } from './dialog-C08sMnSt.mjs';
import _sfc_main$7 from './NuxtImg-DQcxRTmR.mjs';
import * as Yup from 'yup';
import vue3StarRatings from 'vue3-star-ratings';
import { u as useForm, a as useField } from './vee-validate-DiAzowps.mjs';
import { _ as _sfc_main$8 } from './AlertMessageBox-DCW4o88x.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CqfMrQcT.mjs';
import { u as useAuthStore } from './authStore-B9R4yTW5.mjs';
import { u as useCheckout } from './useCheckout-hgERupd8.mjs';
import { b as useNuxtApp, n as navigateTo, c as useRuntimeConfig } from './server.mjs';
import { s as script } from './index--2-SRxkE.mjs';
import { p as publicAssetsURL } from '../routes/renderer.mjs';
import { u as useThemeSettings } from './themeStore-BfIFnuwo.mjs';
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
import './index-BTjgdG92.mjs';
import '@primeuix/utils/uuid';

const __nuxt_component_2_lazy = defineAsyncComponent(() => import('./NuxtImg-DQcxRTmR.mjs').then((c) => c.default || c));
const _sfc_main$4 = {
  __name: "ThumbSlider",
  __ssrInlineRender: true,
  props: {
    product: Object,
    id: String
  },
  setup(__props) {
    const thumbsSwiper = ref(null);
    const props = __props;
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Swiper = Swiper2;
      const _component_SwiperSlide = SwiperSlide;
      const _component_LazyNuxtImg = __nuxt_component_2_lazy;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Swiper, {
        style: {
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff"
        },
        loop: true,
        spaceBetween: 10,
        navigation: false,
        thumbs: { swiper: unref(thumbsSwiper) },
        modules: ["SwiperNavigation" in _ctx ? _ctx.SwiperNavigation : unref(Navigation), "SwiperThumbs" in _ctx ? _ctx.SwiperThumbs : unref(Thumbs)]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(props.product, (item, i2) => {
              _push2(ssrRenderComponent(_component_SwiperSlide, {
                key: i2,
                class: "h-96 w-96 cursor-pointer"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_LazyNuxtImg, {
                      class: "h-full w-full object-contain rounded-md transition-all duration-300 group-hover:scale-105",
                      src: item,
                      alt: ""
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_LazyNuxtImg, {
                        class: "h-full w-full object-contain rounded-md transition-all duration-300 group-hover:scale-105",
                        src: item,
                        alt: ""
                      }, null, 8, ["src"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(props.product, (item, i2) => {
                return openBlock(), createBlock(_component_SwiperSlide, {
                  key: i2,
                  class: "h-96 w-96 cursor-pointer"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_LazyNuxtImg, {
                      class: "h-full w-full object-contain rounded-md transition-all duration-300 group-hover:scale-105",
                      src: item,
                      alt: ""
                    }, null, 8, ["src"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex mt-2">`);
      _push(ssrRenderComponent(_component_Swiper, {
        onSwiper: setThumbsSwiper,
        loop: true,
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        modules: ["SwiperNavigation" in _ctx ? _ctx.SwiperNavigation : unref(Navigation), "SwiperThumbs" in _ctx ? _ctx.SwiperThumbs : unref(Thumbs)],
        class: "flex w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(props.product, (item, i2) => {
              _push2(ssrRenderComponent(_component_SwiperSlide, {
                key: i2,
                class: "h-[90px] w-[90px] cursor-pointer"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_LazyNuxtImg, {
                      class: "h-full w-full object-cover rounded-lg",
                      src: item,
                      alt: "."
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_LazyNuxtImg, {
                        class: "h-full w-full object-cover rounded-lg",
                        src: item,
                        alt: "."
                      }, null, 8, ["src"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(props.product, (item, i2) => {
                return openBlock(), createBlock(_component_SwiperSlide, {
                  key: i2,
                  class: "h-[90px] w-[90px] cursor-pointer"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_LazyNuxtImg, {
                      class: "h-full w-full object-cover rounded-lg",
                      src: item,
                      alt: "."
                    }, null, 8, ["src"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ThumbSlider.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
function r(t2, e) {
  if (t2)
    return t2;
  let n = e != null ? e : "button";
  if (typeof n == "string" && n.toLowerCase() === "button")
    return "button";
}
function s(t2, e) {
  let n = ref(r(t2.value.type, t2.value.as));
  return onMounted(() => {
    n.value = r(t2.value.type, t2.value.as);
  }), watchEffect(() => {
    var u2;
    n.value || o$2(e) && o$2(e) instanceof HTMLButtonElement && !((u2 = o$2(e)) != null && u2.hasAttribute("type")) && (n.value = "button");
  }), n;
}
let d = defineComponent({ props: { onFocus: { type: Function, required: true } }, setup(t2) {
  let n = ref(true);
  return () => n.value ? h(f$1, { as: "button", type: "button", features: u$4.Focusable, onFocus(o2) {
    o2.preventDefault();
    let e, a = 50;
    function r2() {
      var u2;
      if (a-- <= 0) {
        e && cancelAnimationFrame(e);
        return;
      }
      if ((u2 = t2.onFocus) != null && u2.call(t2)) {
        n.value = false, cancelAnimationFrame(e);
        return;
      }
      e = requestAnimationFrame(r2);
    }
    e = requestAnimationFrame(r2);
  } }) : null;
} });
var te = ((s2) => (s2[s2.Forwards = 0] = "Forwards", s2[s2.Backwards = 1] = "Backwards", s2))(te || {}), le = ((d2) => (d2[d2.Less = -1] = "Less", d2[d2.Equal = 0] = "Equal", d2[d2.Greater = 1] = "Greater", d2))(le || {});
let U = Symbol("TabsContext");
function C(a) {
  let b = inject(U, null);
  if (b === null) {
    let s2 = new Error(`<${a} /> is missing a parent <TabGroup /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(s2, C), s2;
  }
  return b;
}
let G = Symbol("TabsSSRContext"), me = defineComponent({ name: "TabGroup", emits: { change: (a) => true }, props: { as: { type: [Object, String], default: "template" }, selectedIndex: { type: [Number], default: null }, defaultIndex: { type: [Number], default: 0 }, vertical: { type: [Boolean], default: false }, manual: { type: [Boolean], default: false } }, inheritAttrs: false, setup(a, { slots: b, attrs: s2, emit: d$1 }) {
  var E;
  let i2 = ref((E = a.selectedIndex) != null ? E : a.defaultIndex), l = ref([]), r2 = ref([]), p = computed(() => a.selectedIndex !== null), R = computed(() => p.value ? a.selectedIndex : i2.value);
  function y(t2) {
    var c;
    let n = O(u2.tabs.value, o$2), o$12 = O(u2.panels.value, o$2), e = n.filter((I) => {
      var m;
      return !((m = o$2(I)) != null && m.hasAttribute("disabled"));
    });
    if (t2 < 0 || t2 > n.length - 1) {
      let I = u$5(i2.value === null ? 0 : Math.sign(t2 - i2.value), { [-1]: () => 1, [0]: () => u$5(Math.sign(t2), { [-1]: () => 0, [0]: () => 0, [1]: () => 1 }), [1]: () => 0 }), m = u$5(I, { [0]: () => n.indexOf(e[0]), [1]: () => n.indexOf(e[e.length - 1]) });
      m !== -1 && (i2.value = m), u2.tabs.value = n, u2.panels.value = o$12;
    } else {
      let I = n.slice(0, t2), h2 = [...n.slice(t2), ...I].find((W) => e.includes(W));
      if (!h2)
        return;
      let O2 = (c = n.indexOf(h2)) != null ? c : u2.selectedIndex.value;
      O2 === -1 && (O2 = u2.selectedIndex.value), i2.value = O2, u2.tabs.value = n, u2.panels.value = o$12;
    }
  }
  let u2 = { selectedIndex: computed(() => {
    var t2, n;
    return (n = (t2 = i2.value) != null ? t2 : a.defaultIndex) != null ? n : null;
  }), orientation: computed(() => a.vertical ? "vertical" : "horizontal"), activation: computed(() => a.manual ? "manual" : "auto"), tabs: l, panels: r2, setSelectedIndex(t2) {
    R.value !== t2 && d$1("change", t2), p.value || y(t2);
  }, registerTab(t2) {
    var o$12;
    if (l.value.includes(t2))
      return;
    let n = l.value[i2.value];
    if (l.value.push(t2), l.value = O(l.value, o$2), !p.value) {
      let e = (o$12 = l.value.indexOf(n)) != null ? o$12 : i2.value;
      e !== -1 && (i2.value = e);
    }
  }, unregisterTab(t2) {
    let n = l.value.indexOf(t2);
    n !== -1 && l.value.splice(n, 1);
  }, registerPanel(t2) {
    r2.value.includes(t2) || (r2.value.push(t2), r2.value = O(r2.value, o$2));
  }, unregisterPanel(t2) {
    let n = r2.value.indexOf(t2);
    n !== -1 && r2.value.splice(n, 1);
  } };
  provide(U, u2);
  let T$12 = ref({ tabs: [], panels: [] }), x = ref(false);
  onMounted(() => {
    x.value = true;
  }), provide(G, computed(() => x.value ? null : T$12.value));
  let w = computed(() => a.selectedIndex);
  return onMounted(() => {
    watch([w], () => {
      var t2;
      return y((t2 = a.selectedIndex) != null ? t2 : a.defaultIndex);
    }, { immediate: true });
  }), watchEffect(() => {
    if (!p.value || R.value == null || u2.tabs.value.length <= 0)
      return;
    let t2 = O(u2.tabs.value, o$2);
    t2.some((o$12, e) => o$2(u2.tabs.value[e]) !== o$2(o$12)) && u2.setSelectedIndex(t2.findIndex((o$12) => o$2(o$12) === o$2(u2.tabs.value[R.value])));
  }), () => {
    let t2 = { selectedIndex: i2.value };
    return h(Fragment, [l.value.length <= 0 && h(d, { onFocus: () => {
      for (let n of l.value) {
        let o$12 = o$2(n);
        if ((o$12 == null ? void 0 : o$12.tabIndex) === 0)
          return o$12.focus(), true;
      }
      return false;
    } }), A$2({ theirProps: { ...s2, ...T$2(a, ["selectedIndex", "defaultIndex", "manual", "vertical", "onChange"]) }, ourProps: {}, slot: t2, slots: b, attrs: s2, name: "TabGroup" })]);
  };
} }), pe = defineComponent({ name: "TabList", props: { as: { type: [Object, String], default: "div" } }, setup(a, { attrs: b, slots: s2 }) {
  let d2 = C("TabList");
  return () => {
    let i2 = { selectedIndex: d2.selectedIndex.value }, l = { role: "tablist", "aria-orientation": d2.orientation.value };
    return A$2({ ourProps: l, theirProps: a, slot: i2, attrs: b, slots: s2, name: "TabList" });
  };
} }), xe = defineComponent({ name: "Tab", props: { as: { type: [Object, String], default: "button" }, disabled: { type: [Boolean], default: false }, id: { type: String, default: null } }, setup(a, { attrs: b, slots: s$1, expose: d2 }) {
  var o$2$1;
  let i$2$1 = (o$2$1 = a.id) != null ? o$2$1 : `headlessui-tabs-tab-${i$5()}`, l = C("Tab"), r2 = ref(null);
  d2({ el: r2, $el: r2 }), onMounted(() => l.registerTab(r2)), onUnmounted(() => l.unregisterTab(r2));
  let p = inject(G), R = computed(() => {
    if (p.value) {
      let e = p.value.tabs.indexOf(i$2$1);
      return e === -1 ? p.value.tabs.push(i$2$1) - 1 : e;
    }
    return -1;
  }), y = computed(() => {
    let e = l.tabs.value.indexOf(r2);
    return e === -1 ? R.value : e;
  }), u2 = computed(() => y.value === l.selectedIndex.value);
  function T2(e) {
    var I;
    let c = e();
    if (c === T$1.Success && l.activation.value === "auto") {
      let m = (I = i$2(r2)) == null ? void 0 : I.activeElement, h2 = l.tabs.value.findIndex((O2) => o$2(O2) === m);
      h2 !== -1 && l.setSelectedIndex(h2);
    }
    return c;
  }
  function x(e) {
    let c = l.tabs.value.map((m) => o$2(m)).filter(Boolean);
    if (e.key === o.Space || e.key === o.Enter) {
      e.preventDefault(), e.stopPropagation(), l.setSelectedIndex(y.value);
      return;
    }
    switch (e.key) {
      case o.Home:
      case o.PageUp:
        return e.preventDefault(), e.stopPropagation(), T2(() => P(c, N$2.First));
      case o.End:
      case o.PageDown:
        return e.preventDefault(), e.stopPropagation(), T2(() => P(c, N$2.Last));
    }
    if (T2(() => u$5(l.orientation.value, { vertical() {
      return e.key === o.ArrowUp ? P(c, N$2.Previous | N$2.WrapAround) : e.key === o.ArrowDown ? P(c, N$2.Next | N$2.WrapAround) : T$1.Error;
    }, horizontal() {
      return e.key === o.ArrowLeft ? P(c, N$2.Previous | N$2.WrapAround) : e.key === o.ArrowRight ? P(c, N$2.Next | N$2.WrapAround) : T$1.Error;
    } })) === T$1.Success)
      return e.preventDefault();
  }
  let w = ref(false);
  function E() {
    var e;
    w.value || (w.value = true, !a.disabled && ((e = o$2(r2)) == null || e.focus({ preventScroll: true }), l.setSelectedIndex(y.value), t$3(() => {
      w.value = false;
    })));
  }
  function t$1(e) {
    e.preventDefault();
  }
  let n = s(computed(() => ({ as: a.as, type: b.type })), r2);
  return () => {
    var m, h2;
    let e = { selected: u2.value, disabled: (m = a.disabled) != null ? m : false }, { ...c } = a, I = { ref: r2, onKeydown: x, onMousedown: t$1, onClick: E, id: i$2$1, role: "tab", type: n.value, "aria-controls": (h2 = o$2(l.panels.value[y.value])) == null ? void 0 : h2.id, "aria-selected": u2.value, tabIndex: u2.value ? 0 : -1, disabled: a.disabled ? true : void 0 };
    return A$2({ ourProps: I, theirProps: c, slot: e, attrs: b, slots: s$1, name: "Tab" });
  };
} }), Ie = defineComponent({ name: "TabPanels", props: { as: { type: [Object, String], default: "div" } }, setup(a, { slots: b, attrs: s2 }) {
  let d2 = C("TabPanels");
  return () => {
    let i2 = { selectedIndex: d2.selectedIndex.value };
    return A$2({ theirProps: a, ourProps: {}, slot: i2, attrs: s2, slots: b, name: "TabPanels" });
  };
} }), ye = defineComponent({ name: "TabPanel", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: null }, tabIndex: { type: Number, default: 0 } }, setup(a, { attrs: b, slots: s2, expose: d2 }) {
  var T2;
  let i$12 = (T2 = a.id) != null ? T2 : `headlessui-tabs-panel-${i$5()}`, l = C("TabPanel"), r2 = ref(null);
  d2({ el: r2, $el: r2 }), onMounted(() => l.registerPanel(r2)), onUnmounted(() => l.unregisterPanel(r2));
  let p = inject(G), R = computed(() => {
    if (p.value) {
      let x = p.value.panels.indexOf(i$12);
      return x === -1 ? p.value.panels.push(i$12) - 1 : x;
    }
    return -1;
  }), y = computed(() => {
    let x = l.panels.value.indexOf(r2);
    return x === -1 ? R.value : x;
  }), u2 = computed(() => y.value === l.selectedIndex.value);
  return () => {
    var n;
    let x = { selected: u2.value }, { tabIndex: w, ...E } = a, t2 = { ref: r2, id: i$12, role: "tabpanel", "aria-labelledby": (n = o$2(l.tabs.value[y.value])) == null ? void 0 : n.id, tabIndex: u2.value ? w : -1 };
    return !u2.value && a.unmount && !a.static ? h(f$1, { as: "span", "aria-hidden": true, ...t2 }) : A$2({ ourProps: t2, theirProps: E, slot: x, attrs: b, slots: s2, features: N$4.Static | N$4.RenderStrategy, visible: u2.value, name: "TabPanel" });
  };
} });
const productStore = {
  sku: "i5b1g92y",
  images: [
    "https://media.sellfy.store/images/0xbTRoya/9BRm/whatsapp_image_2024-01-27_at_14.06.28.jpeg",
    "https://media.sellfy.store/images/0xbTRoya/8WvR/whatsapp_image_2024-01-27_at_14.06.28_2.jpeg",
    "https://media.sellfy.store/images/0xbTRoya/cnFw/whatsapp_image_2024-01-27_at_14.06.28_1.jpeg",
    "https://ae-pic-a1.aliexpress-media.com/kf/Sd4223410a97343d389647e588ef24b69N/Clear-Dental-Overdenture-Inferior-Model-Locator-Denture-Model-with-4-Implants-Demo-Model-Dentistry-Teaching-Study.jpg_.webp",
    "https://ae-pic-a1.aliexpress-media.com/kf/S288e4a60d11143afbeec598aada5c52eA/Clear-Dental-Overdenture-Inferior-Model-Locator-Denture-Model-with-4-Implants-Demo-Model-Dentistry-Teaching-Study.jpg_.webp",
    "https://ae-pic-a1.aliexpress-media.com/kf/Sa834bd1f0ee947c6ad762a4b4fdd4e94M/Clear-Dental-Overdenture-Inferior-Model-Locator-Denture-Model-with-4-Implants-Demo-Model-Dentistry-Teaching-Study.jpg_.webp"
  ],
  name: "Dental Implant Model Removable Interior Mandibular Demo Overdenture Superior Upper/Lower Jaw With 4",
  shortDesc: "The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt. The best cotton black branded shirt.",
  rating: "5",
  description: "A type of veneer that offers numerous benefits and features. Dental veneer are primarily made of pressed ceramic, which makes them highly durable.It is made from a single block of lithium disilicate ceramic. This is top grade material which has been harvested for its toughness, durability and opaque qualities which makes it a highly prized crown. This considered to be the best match with your own natural teeth.",
  price: 59,
  oldPrice: "$75",
  percent: "21%",
  brand: "MAC Veneers"
};
const reviewStore = [
  {
    id: 1,
    name: "Paola DeJesus",
    date: "July 31, 2024",
    avatar: "https://i.pinimg.com/280x280_RS/b2/2b/a9/b22ba9b73c907f181059fc40fcf3d23a.jpg",
    like: "42",
    reviews: "These dentures are amazing! They fit well and are suitable for both men and women. I have worn them to weddings, parties, and interviews, and they have never let me down. Highly recommend for anyone looking to regain their confident smile.",
    images: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgNSzZujqyh5nV_GPvLdooMOaaoxLUSrEL_OZ4R_A2-hdCOex0YJXKW6Kmh4ei33vGU1O721IaFZmsRwlUA1Iq9eqEAlCV8-cijf6C1nEjrz8JIakeSSv4zuCLcYI7NM5CfKCsM7x9qBCcOf8tMNaqJRIDYTzHQCJg4JWW5MgRaPQ6C8xz4A0nb_iokMBns/s16000/svsv.png",
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiw03ceXJNLHSO8wNvOeez14nzTxmFyW2CejHFsNYiEsI6pC7AeY52aWUerYW-mYaoTkbhyVkevoVWsHITiyLJD9gJ9QAoaXtDy9lTROAL-lhrlv-Z2X5sGNMK0zm8fyAsCdFNjQfSuuopqI8mN4Sx76vFvBNkS2pAanKTKCCsfb_dfj8SWZprFsMVTuvNv/s16000/svsvsv.png"
    ]
  },
  {
    id: 2,
    name: "Alana Fidler",
    date: "August 27, 2024",
    avatar: "https://tributecenteronline.s3-accelerate.amazonaws.com/Obituaries/27678868/Thumbnail.jpg",
    like: "38",
    reviews: "Works really good, I had a tooth pulled and this helped me have a temporary tooth I can eat and drink with it and I can remove it to keep it clean",
    images: [
      "https://m.media-amazon.com/images/I/71HVpi4OQAL._SY88.jpg",
      "https://m.media-amazon.com/images/I/710TESCMtoL._SY88.jpg"
    ]
  },
  {
    id: 3,
    name: "Mary Downs-Young",
    date: "July 17, 2024",
    avatar: "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
    like: "32",
    reviews: "Don't miss out on this amazing product! These Aimery Fake Teeth have truly boosted my confidence. I had stained and broken teeth that made me hesitant to smile or talk in social gatherings. But with these fake teeth,I can confidently show off a natural-looking smile.The inner surface imprint is so well-designed that even my curious tongue can't tell the difference. These temporary veneers have become my go-to for parties!"
  },
  {
    id: 4,
    name: "Rocky J",
    date: "July 21, 2024",
    avatar: "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
    like: "24",
    reviews: "I used these temporary fake teeth for a job interview and they worked wonders. They made me feel more confident and helped me nail the interview!",
    images: [
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgJ0d8SoS4Re0y17JC61cOUT_hOf31XmiZRs8eHhlQ0HVRFLMwpCtv57oNZJDGETAO0iXTYKHjlW3-DXDoG5q7hKQ7NwaCT-gBy4qaheRfe4SG-FVGCwVNL1cvZ1IEGOEqW0dHvYy7yLOLmVKPvHpX3RPiT9NiMMZd6appHEZnhkDnoLVYhyphenhyphenFrEcptqeUcp/s16000/svsvsvsv.png"
    ]
  },
  {
    id: 5,
    name: "Elias Lopez",
    date: "August 9, 2024",
    avatar: "https://pbs.twimg.com/profile_images/427715655769788416/EO-2PDmC_400x400.jpeg",
    like: "19",
    reviews: "Ok I never wright a review. This will be my first. This product is a lifesaver until i get teeth implants . This is the best way to use these if you want them tight on . 1. First get a big glass of water with cubed ice on standby. 2. instead of the gel thats inside the teeth use InstaMorph Thermoplastic Beads , those are the strongest. 3. Once you boil and melt InstaMorph put it in the inside of the teeth. 4. Mold it to your mouth then drink the cold glass of water and swirl it around the inside of your mouth until everything gets hard fast. Perfect your done",
    images: ["https://m.media-amazon.com/images/I/51mmdfx+2CL._SY250_.jpg"]
  },
  {
    id: 6,
    name: "Reginald Miller",
    date: "August 14, 2024",
    avatar: "https://m.media-amazon.com/images/S/amazon-avatars-global/cf6437e9-d0b8-4c24-a263-c4d2027e7e8f._CR0%2C0%2C500%2C500_SX460_.jpg",
    like: "15",
    reviews: "Perfect Fit. My dentures broke so I was limited to soft foods for the next few weeks, but these got me back into the burger habit in no time! I got what I wanted and overall I'm very happy with this. I'm so glad I bought these."
  },
  {
    id: 7,
    name: "lynn C",
    date: "August 14, 2024",
    avatar: "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
    like: "12",
    reviews: "This denture repair kit has made my life better! The materials are top notch and ensure that my new dentures will last. Not only does it fit perfectly, but it looks great too!"
  },
  {
    id: 8,
    name: "Connor Shurley",
    date: "May 24, 2024",
    avatar: "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
    like: "10",
    reviews: "I was able to quickly and temporarily fix my tooth before going to the dentist. I patiently adjusted this denture and it looks fine when I speak. This purchasing experience is quite good. I am amazed at how well these dentures work. It's easy to use and they're great and look great, great quality."
  },
  {
    id: 9,
    name: "Mike Marson",
    date: "August 27, 2024",
    avatar: "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg",
    like: "8",
    reviews: "used to make temp dental appliance for missing front teeth. This is not an easy application but that is not the fault of the product. The PRODUCT IS PERFECT. If you are willing to take the plunge, like I did, you will be well rewarded by saving +$2000. By the way it took me two attempts to get it right, so I was glad two sets of teeth were part of the package."
  },
  {
    id: 10,
    name: "Michael Porraro",
    date: "August 14, 2023",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW_UOYIhA1_J_Ben8twZcDfwEtrcSC3SnPjg&s",
    like: "5",
    reviews: "This denture repair kit has made my life better! The materials are top notch and ensure that my new dentures will last. Not only does it fit perfectly, but it looks great too!"
  }
];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DescriptionProduct",
  __ssrInlineRender: true,
  setup(__props) {
    const buttons = [
      {
        title: "Description"
      },
      {
        title: "Additional Info"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeadlessTabGroup = me;
      const _component_HeadlessTabList = pe;
      const _component_HeadlessTab = xe;
      const _component_HeadlessTabPanels = Ie;
      const _component_HeadlessTabPanel = ye;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border border-1 dark:border-slate-700 rounded py-3 px-3" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_HeadlessTabGroup, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_HeadlessTabList, { class: "lg:space-x-8 md:space-x-4 space-x-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(buttons, (item, i2) => {
                    _push3(ssrRenderComponent(_component_HeadlessTab, {
                      as: "template",
                      key: i2
                    }, {
                      default: withCtx(({ selected }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<button class="${ssrRenderClass([[
                            selected ? "text-slate-950 dark:text-slate-300 before:w-full" : "text-slate-500 before:w-0 dark:text-slate-500"
                          ], "text-lg lg:text-xl font-medium mb-7 capitalize ring-0 focus:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-slate-900 dark:before:bg-slate-300 before:-translate-x-1/2"])}"${_scopeId3}>${ssrInterpolate(item.title)}</button>`);
                        } else {
                          return [
                            createVNode("button", {
                              class: [[
                                selected ? "text-slate-950 dark:text-slate-300 before:w-full" : "text-slate-500 before:w-0 dark:text-slate-500"
                              ], "text-lg lg:text-xl font-medium mb-7 capitalize ring-0 focus:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-slate-900 dark:before:bg-slate-300 before:-translate-x-1/2"]
                            }, toDisplayString(item.title), 3)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                  _push3(ssrRenderComponent(_component_HeadlessTabPanels, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_HeadlessTabPanel, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-slate-950 dark:text-slate-300 font-normal"${_scopeId4}><p${_scopeId4}>${ssrInterpolate(unref(productStore).description)}</p><p class="mt-3 font-bold"${_scopeId4}>Feature :</p><ul class="mt-1 list-disc ml-5"${_scopeId4}><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> Clear Upper and Lower-4 Implants </li><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> Clear acrylic Upper and Lower jaw base allows view of implants </li><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> 4 generic implants with removable superior overdenture by locators connection </li><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> Good for explaining the overdenture functioning </li><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> For demonstration purpose use. </li></ul><p class="mt-3 font-bold"${_scopeId4}>Specification :</p><ul class="mt-1 list-none"${_scopeId4}><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> Material: lithium disilicate ceramic </li><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> Size: as picture show </li><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> Color: as picture show </li></ul><p class="mt-3 font-bold"${_scopeId4}>Note :</p><ul class="mt-1 list-decimal ml-5"${_scopeId4}><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> Due to the different monitor and light effect, the actual color of the item might be slightly different from the color showed on the pictures. Thank you! </li><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> Please allow slight measuring deviation due to manual measurement. </li></ul></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-slate-950 dark:text-slate-300 font-normal" }, [
                                  createVNode("p", null, toDisplayString(unref(productStore).description), 1),
                                  createVNode("p", { class: "mt-3 font-bold" }, "Feature :"),
                                  createVNode("ul", { class: "mt-1 list-disc ml-5" }, [
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Clear Upper and Lower-4 Implants "),
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Clear acrylic Upper and Lower jaw base allows view of implants "),
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " 4 generic implants with removable superior overdenture by locators connection "),
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Good for explaining the overdenture functioning "),
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " For demonstration purpose use. ")
                                  ]),
                                  createVNode("p", { class: "mt-3 font-bold" }, "Specification :"),
                                  createVNode("ul", { class: "mt-1 list-none" }, [
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Material: lithium disilicate ceramic "),
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Size: as picture show "),
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Color: as picture show ")
                                  ]),
                                  createVNode("p", { class: "mt-3 font-bold" }, "Note :"),
                                  createVNode("ul", { class: "mt-1 list-decimal ml-5" }, [
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Due to the different monitor and light effect, the actual color of the item might be slightly different from the color showed on the pictures. Thank you! "),
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Please allow slight measuring deviation due to manual measurement. ")
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_HeadlessTabPanel, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-slate-950 dark:text-slate-300 font-normal"${_scopeId4}><p class="mt-3 font-bold"${_scopeId4}>Advantage :</p><ul class="mt-1 list-disc ml-5"${_scopeId4}><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> Dental veneer lasts up to 15 years. </li><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> Its longevity depends on the care and attention you give to all your teeth </li><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> Dental veneer is highly durable </li><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> It comes in thin layer </li><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> It prevents the need for drilling the teeth </li><li class="text-slate-950 dark:text-slate-300"${_scopeId4}> Looks natural, like your own teeth. </li></ul></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-slate-950 dark:text-slate-300 font-normal" }, [
                                  createVNode("p", { class: "mt-3 font-bold" }, "Advantage :"),
                                  createVNode("ul", { class: "mt-1 list-disc ml-5" }, [
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Dental veneer lasts up to 15 years. "),
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Its longevity depends on the care and attention you give to all your teeth "),
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Dental veneer is highly durable "),
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " It comes in thin layer "),
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " It prevents the need for drilling the teeth "),
                                    createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Looks natural, like your own teeth. ")
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_HeadlessTabPanel, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-slate-950 dark:text-slate-300 font-normal" }, [
                                createVNode("p", null, toDisplayString(unref(productStore).description), 1),
                                createVNode("p", { class: "mt-3 font-bold" }, "Feature :"),
                                createVNode("ul", { class: "mt-1 list-disc ml-5" }, [
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Clear Upper and Lower-4 Implants "),
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Clear acrylic Upper and Lower jaw base allows view of implants "),
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " 4 generic implants with removable superior overdenture by locators connection "),
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Good for explaining the overdenture functioning "),
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " For demonstration purpose use. ")
                                ]),
                                createVNode("p", { class: "mt-3 font-bold" }, "Specification :"),
                                createVNode("ul", { class: "mt-1 list-none" }, [
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Material: lithium disilicate ceramic "),
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Size: as picture show "),
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Color: as picture show ")
                                ]),
                                createVNode("p", { class: "mt-3 font-bold" }, "Note :"),
                                createVNode("ul", { class: "mt-1 list-decimal ml-5" }, [
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Due to the different monitor and light effect, the actual color of the item might be slightly different from the color showed on the pictures. Thank you! "),
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Please allow slight measuring deviation due to manual measurement. ")
                                ])
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_HeadlessTabPanel, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-slate-950 dark:text-slate-300 font-normal" }, [
                                createVNode("p", { class: "mt-3 font-bold" }, "Advantage :"),
                                createVNode("ul", { class: "mt-1 list-disc ml-5" }, [
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Dental veneer lasts up to 15 years. "),
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Its longevity depends on the care and attention you give to all your teeth "),
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Dental veneer is highly durable "),
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " It comes in thin layer "),
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " It prevents the need for drilling the teeth "),
                                  createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Looks natural, like your own teeth. ")
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
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList(buttons, (item, i2) => {
                      return createVNode(_component_HeadlessTab, {
                        as: "template",
                        key: i2
                      }, {
                        default: withCtx(({ selected }) => [
                          createVNode("button", {
                            class: [[
                              selected ? "text-slate-950 dark:text-slate-300 before:w-full" : "text-slate-500 before:w-0 dark:text-slate-500"
                            ], "text-lg lg:text-xl font-medium mb-7 capitalize ring-0 focus:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-slate-900 dark:before:bg-slate-300 before:-translate-x-1/2"]
                          }, toDisplayString(item.title), 3)
                        ]),
                        _: 2
                      }, 1024);
                    }), 64)),
                    createVNode(_component_HeadlessTabPanels, null, {
                      default: withCtx(() => [
                        createVNode(_component_HeadlessTabPanel, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-slate-950 dark:text-slate-300 font-normal" }, [
                              createVNode("p", null, toDisplayString(unref(productStore).description), 1),
                              createVNode("p", { class: "mt-3 font-bold" }, "Feature :"),
                              createVNode("ul", { class: "mt-1 list-disc ml-5" }, [
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Clear Upper and Lower-4 Implants "),
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Clear acrylic Upper and Lower jaw base allows view of implants "),
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " 4 generic implants with removable superior overdenture by locators connection "),
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Good for explaining the overdenture functioning "),
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " For demonstration purpose use. ")
                              ]),
                              createVNode("p", { class: "mt-3 font-bold" }, "Specification :"),
                              createVNode("ul", { class: "mt-1 list-none" }, [
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Material: lithium disilicate ceramic "),
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Size: as picture show "),
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Color: as picture show ")
                              ]),
                              createVNode("p", { class: "mt-3 font-bold" }, "Note :"),
                              createVNode("ul", { class: "mt-1 list-decimal ml-5" }, [
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Due to the different monitor and light effect, the actual color of the item might be slightly different from the color showed on the pictures. Thank you! "),
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Please allow slight measuring deviation due to manual measurement. ")
                              ])
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_HeadlessTabPanel, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-slate-950 dark:text-slate-300 font-normal" }, [
                              createVNode("p", { class: "mt-3 font-bold" }, "Advantage :"),
                              createVNode("ul", { class: "mt-1 list-disc ml-5" }, [
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Dental veneer lasts up to 15 years. "),
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Its longevity depends on the care and attention you give to all your teeth "),
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Dental veneer is highly durable "),
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " It comes in thin layer "),
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " It prevents the need for drilling the teeth "),
                                createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Looks natural, like your own teeth. ")
                              ])
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_HeadlessTabList, { class: "lg:space-x-8 md:space-x-4 space-x-0" }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList(buttons, (item, i2) => {
                    return createVNode(_component_HeadlessTab, {
                      as: "template",
                      key: i2
                    }, {
                      default: withCtx(({ selected }) => [
                        createVNode("button", {
                          class: [[
                            selected ? "text-slate-950 dark:text-slate-300 before:w-full" : "text-slate-500 before:w-0 dark:text-slate-500"
                          ], "text-lg lg:text-xl font-medium mb-7 capitalize ring-0 focus:ring-0 focus:outline-none px-2 transition duration-150 before:transition-all before:duration-150 relative before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-slate-900 dark:before:bg-slate-300 before:-translate-x-1/2"]
                        }, toDisplayString(item.title), 3)
                      ]),
                      _: 2
                    }, 1024);
                  }), 64)),
                  createVNode(_component_HeadlessTabPanels, null, {
                    default: withCtx(() => [
                      createVNode(_component_HeadlessTabPanel, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-slate-950 dark:text-slate-300 font-normal" }, [
                            createVNode("p", null, toDisplayString(unref(productStore).description), 1),
                            createVNode("p", { class: "mt-3 font-bold" }, "Feature :"),
                            createVNode("ul", { class: "mt-1 list-disc ml-5" }, [
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Clear Upper and Lower-4 Implants "),
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Clear acrylic Upper and Lower jaw base allows view of implants "),
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " 4 generic implants with removable superior overdenture by locators connection "),
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Good for explaining the overdenture functioning "),
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " For demonstration purpose use. ")
                            ]),
                            createVNode("p", { class: "mt-3 font-bold" }, "Specification :"),
                            createVNode("ul", { class: "mt-1 list-none" }, [
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Material: lithium disilicate ceramic "),
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Size: as picture show "),
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Color: as picture show ")
                            ]),
                            createVNode("p", { class: "mt-3 font-bold" }, "Note :"),
                            createVNode("ul", { class: "mt-1 list-decimal ml-5" }, [
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Due to the different monitor and light effect, the actual color of the item might be slightly different from the color showed on the pictures. Thank you! "),
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Please allow slight measuring deviation due to manual measurement. ")
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_HeadlessTabPanel, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-slate-950 dark:text-slate-300 font-normal" }, [
                            createVNode("p", { class: "mt-3 font-bold" }, "Advantage :"),
                            createVNode("ul", { class: "mt-1 list-disc ml-5" }, [
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Dental veneer lasts up to 15 years. "),
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Its longevity depends on the care and attention you give to all your teeth "),
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Dental veneer is highly durable "),
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " It comes in thin layer "),
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " It prevents the need for drilling the teeth "),
                              createVNode("li", { class: "text-slate-950 dark:text-slate-300" }, " Looks natural, like your own teeth. ")
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DescriptionProduct.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ReviewProduct",
  __ssrInlineRender: true,
  props: {
    reviews: {
      type: Object,
      required: true
    },
    createReview: {
      type: Boolean
    }
  },
  emits: ["openAlert", "closeCreateReview"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const successSend = ref(false);
    const scheme = Yup.object().shape({
      messages: Yup.string().required("This field is required.").test(
        "len",
        "Messages must contain between 15 - 300 characters",
        (val) => {
          if (val === void 0) {
            return true;
          }
          return val.length === 0 || val.length >= 20 && val.length <= 300;
        }
      ),
      rating: Yup.number().required("This field is required.")
    });
    const { handleSubmit } = useForm({
      validationSchema: scheme
    });
    const { value: messages, errorMessage: messagesError } = useField("messages");
    const { value: rating, errorMessage: ratingError } = useField("rating");
    handleSubmit(async (value) => {
      successSend.value = true;
      setTimeout(() => {
        successSend.value = false;
        closeCreateReview();
      }, 2e3);
    });
    function closeCreateReview() {
      emit("closeCreateReview");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_4;
      const _component_NuxtImg = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "border border-1 dark:border-slate-700 rounded py-3 px-4 mt-3" }, _attrs))}><h6 class="text-slate-900 dark:text-slate-300 pb-6 text-lg lg:text-xl md:text-xl"> Reviews &amp; Ratings </h6><div class="space-y-12">`);
      if (unref(successSend)) {
        _push(`<div class="relative w-full py-5"><div class="flex items-center justify-center"><h1 class="text-xl font-bold text-gray-900 dark:text-gray-50"> Thank You </h1></div><div class="flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "line-md:emoji-smile-filled",
          class: "text-gray-900 dark:text-gray-50"
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.createReview) {
        _push(`<div class="${ssrRenderClass([unref(successSend) ? "hidden" : "block", "relative w-full py-5"])}"><form><div class="relative w-full space-y-3"><label for="message" class="text-sm text-gray-900 dark:text-gray-50 font-semibold">Message *</label><textarea${ssrRenderAttr("rows", 6)} name="messages" class="w-full inline-flex py-2 px-3 text-sm text-gray-900 dark:text-gray-50 bg-gray-50 dark:bg-gray-700 hover:outline-none focus:outline-none hover:ring-0 focus:ring-0 border border-gray-400 dark:border-gray-500 rounded-md">${ssrInterpolate(unref(messages))}</textarea>`);
        if (unref(messagesError)) {
          _push(`<div class="text-xs text-red-500 italic mt-1 font-semibold">${ssrInterpolate(unref(messagesError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex flex-col w-full space-y-1 items-center justify-center mt-2"><label for="rating" class="text-sm text-gray-900 dark:text-gray-50 font-semibold">Rate it *</label>`);
        _push(ssrRenderComponent(unref(vue3StarRatings), {
          modelValue: unref(rating),
          "onUpdate:modelValue": ($event) => isRef(rating) ? rating.value = $event : null,
          starSize: 20,
          inactiveColor: "#6d6d6d"
        }, null, _parent));
        if (unref(ratingError)) {
          _push(`<div class="text-xs text-red-500 italic mt-1 font-semibold">${ssrInterpolate(unref(ratingError))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-center justify-center gap-3 mt-3"><button type="submit" class="inline-flex px-12 py-3 text-sm text-gray-50 font-semibold bg-yellow-600 hover:bg-yellow-400 rounded-md"> Submit </button><button type="button" class="inline-flex px-12 py-3 text-sm text-gray-50 hover:text-gray-900 dark:text-gray-900 dark:hover:text-gray-50 font-semibold bg-gray-900 dark:bg-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md"> Cancel </button></div></form></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([unref(successSend) ? "hidden" : "block", "bg-gray-300 dark:bg-slate-700 p-6 rounded-md grid grid-cols-12"])}"><div class="col-span-12 items-center md:col-span-6 flex space-x-3 justify-center md:justify-start rtl:space-x-reverse order-2 md:order-1 mt-3 md:mt-0"><div class="font-medium items-center flex"><p class="text-slate-900 dark:text-slate-300 text-base lg:text-lg"> 4.8 </p><p class="text-slate-900 dark:text-slate-300 text-sm lg:text-base"> /5 </p></div><div class="flex flex-col sm:flex-row sm:items-center md:justify-start text-slate-900 dark:text-slate-300 font-normal text-sm lg:text-base"><div class="flex items-center space-x-1.5">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "line-md:star-filled",
          class: "text-yellow-400"
        }, null, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "line-md:star-filled",
          class: "text-yellow-400"
        }, null, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "line-md:star-filled",
          class: "text-yellow-400"
        }, null, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "line-md:star-filled",
          class: "text-yellow-400"
        }, null, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "line-md:star-filled",
          class: "text-yellow-400"
        }, null, _parent));
        _push(`</div><div class="text-slate-900 dark:text-slate-300">(789 reviews)</div></div></div><div class="col-span-12 md:col-span-6 flex justify-center md:justify-end items-center order-1 md:order-2"><button type="button" class="bg-yellow-500 hover:bg-yellow-400 text-white rounded px-6 py-3 text-sm lg:text-base"> Rate this product </button></div></div>`);
      }
      _push(`<div class="flex flex-col space-x-3 space-y-3 items-center"><!--[-->`);
      ssrRenderList(props.reviews, (item) => {
        _push(`<div class="flex gap-3"><div class="h-14 w-14 rounded-full object-cover bg-white ring-1 overflow-hidden flex-none">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          class: "h-full w-full object-contain",
          src: item.avatar
        }, null, _parent));
        _push(`</div><div><div><div class="text-slate-900 dark:text-slate-300 font-medium text-sm lg:text-base pb-1">${ssrInterpolate(item.name)}</div><div class="text-slate-500 dark:text-slate-400 font-normal text-xs pb-1">${ssrInterpolate(item.date)}</div><div class="flex items-center text-slate-900 dark:text-slate-300 font-normal text-sm lg:text-base space-x-1.5 rtl:space-x-reverse pb-3">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "line-md:star-filled",
          class: "text-yellow-400"
        }, null, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "line-md:star-filled",
          class: "text-yellow-400"
        }, null, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "line-md:star-filled",
          class: "text-yellow-400"
        }, null, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "line-md:star-filled",
          class: "text-yellow-400"
        }, null, _parent));
        _push(ssrRenderComponent(_component_Icon, {
          name: "line-md:star-filled",
          class: "text-yellow-400"
        }, null, _parent));
        _push(`</div><div class="pb-4 text-sm lg:text-base text-slate-500 dark:text-slate-400">${ssrInterpolate(item.reviews)}</div><div class="flex space-x-2 rtl:space-x-reverse pb-3"><p class="font-normal text-sm lg:text-base text-slate-500 dark:text-slate-400"> Info: </p><p class="font-medium text-sm lg:text-base text-[#10B26C]"> Verified Purchase </p></div></div><div class="grid grid-cols-12">`);
        if (item.images) {
          _push(`<div class="col-span-12 mb-3"><div class="flex space-x-2 rtl:space-x-reverse mb-9"><!--[-->`);
          ssrRenderList(item.images, (items, i2) => {
            _push(`<div class="h-[90px] w-[90px] rounded bg-slate-100 p-1 overflow-hidden">`);
            _push(ssrRenderComponent(_component_NuxtImg, {
              class: "h-full w-full object-cover",
              src: items,
              alt: "."
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="col-span-12 flex justify-end dark:text-slate-400 space-x-4 rtl:space-x-reverse"><p class="flex items-center space-x-2 rtl:space-x-reverse"><span class="cursor-pointer">`);
        _push(ssrRenderComponent(_component_Icon, { name: "material-symbols:thumb-up-outline" }, null, _parent));
        _push(`</span><span>${ssrInterpolate(item.like)}</span></p></div></div></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ReviewProduct.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LoginDialog",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      require: true
    }
  },
  emits: ["closeAlert"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const authStore = useAuthStore();
    const { login, getProfile } = useCheckout();
    const getProfileError = ref(null);
    const profile = ref({});
    const emailIsVerified = ref(false);
    const loginError = ref(null);
    const loginSuccess = ref(false);
    const typePassword = ref("password");
    const scheme = Yup.object().shape({
      email: Yup.string().email().required("Email Required"),
      password: Yup.string().required("Password Required").matches(/^(\S+$)/g, "Columns are not allowed to contain spaces")
    });
    const { handleSubmit } = useForm({
      validationSchema: scheme
    });
    const { value: email, errorMessage: emailError } = useField("email");
    const { value: password, errorMessage: passwordError } = useField("password");
    const onSubmit = handleSubmit(async (value) => {
      const { email: email2, password: password2 } = value;
      await loginUser(email2, password2);
    });
    function closeAlert() {
      emit("closeAlert");
    }
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
          closeAlert();
        }, 300);
      }
    }
    function togglePassword() {
      if (typePassword.value === "password") {
        typePassword.value = "text";
      } else {
        typePassword.value = "password";
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeadlessTransitionRoot = Se;
      const _component_HeadlessDialog = Ye;
      const _component_HeadlessTransitionChild = he;
      const _component_HeadlessDialogPanel = Ge;
      const _component_Icon = __nuxt_component_4;
      const _component_NuxtImg = _sfc_main$7;
      const _component_AlertMessageBox = _sfc_main$8;
      const _component_NuxtLink = __nuxt_component_0;
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
                        _push4(ssrRenderComponent(_component_HeadlessDialogPanel, { class: "w-full max-w-md transform overflow-hidden rounded-2xl bg-[#002453] dark:bg-slate-950 p-6 text-left align-middle shadow-xl transition-all border border-gray-500 dark:border-gray-700" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="flex items-end justify-end group cursor-pointer"${_scopeId4}><div class="flex items-center rounded-full border border-gray-300 group group-hover:border-red-600"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_Icon, {
                                name: "mingcute:close-fill",
                                class: "text-gray-300 group-hover:text-red-600"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div></div><div class="flex flex-col items-center py-10"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_NuxtImg, {
                                src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-3Rjv7fjDPf2WbW8KIVU5rN_dsRmAOkc1KZQeVq50sOUpcssKy6bDB0yH3V_nuxEJ6KEb6m3jdkl5gh9IVf2AK1HI8bl9v9y6Zf0TrQtzsML0F7O4PgplMSeMQ4RkQUjQbc40_cgyoaxnIlvpnMxM-1nGVWs9Wc1bMYxqnujKHfL2BG2vsuGwbdFunS7/s16000/logo-footer.png",
                                class: "h-8 w-auto object-fill ml-5"
                              }, null, _parent5, _scopeId4));
                              _push5(`<div class="relative w-full mt-3"${_scopeId4}>`);
                              if (unref(loginError)) {
                                _push5(ssrRenderComponent(_component_AlertMessageBox, {
                                  theme: "danger",
                                  message: unref(loginError).message,
                                  "show-close": true,
                                  onCloseMessage: ($event) => loginError.value = null
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(getProfileError)) {
                                _push5(ssrRenderComponent(_component_AlertMessageBox, {
                                  theme: "danger",
                                  message: unref(getProfileError).message,
                                  "show-close": true,
                                  onCloseMessage: ($event) => getProfileError.value = null
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              if (unref(loginSuccess)) {
                                _push5(ssrRenderComponent(_component_AlertMessageBox, {
                                  theme: "success",
                                  message: "Success Login",
                                  "show-close": true,
                                  onCloseMessage: ($event) => loginSuccess.value = false
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><h1 class="mt-3 text-xl text-gray-50 font-semibold uppercase"${_scopeId4}> Login </h1><form class="relative w-full"${_scopeId4}><div class="relative space-y-1 mt-2"${_scopeId4}><label for="email" class="text-sm text-gray-50 font-semibold"${_scopeId4}>Email Address *</label><input type="text" name="email"${ssrRenderAttr("value", unref(email))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" required${_scopeId4}>`);
                              if (unref(emailError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(emailError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative space-y-1 mt-2"${_scopeId4}><label for="password" class="text-sm text-gray-50 font-semibold"${_scopeId4}>Password *</label><input${ssrRenderAttr("type", unref(typePassword))} name="password"${ssrRenderDynamicModel(unref(typePassword), unref(password), null)} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_Icon, {
                                name: unref(typePassword) === "password" ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline",
                                class: "absolute top-8 right-2 h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-50",
                                onClick: togglePassword
                              }, null, _parent5, _scopeId4));
                              if (unref(passwordError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(passwordError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><button type="submit" class="inline-flex w-full items-center justify-center py-2 bg-orange-600 hover:bg-orange-500 text-sm text-gray-50 font-semibold rounded-sm mt-5"${_scopeId4}> Sign In </button><div class="flex items-center justify-center gap-2 mt-2"${_scopeId4}><input type="checkbox"${_scopeId4}><label for="remember" class="text-sm text-gray-200"${_scopeId4}>Remember Me</label></div></form><div class="flex items-center justify-center gap-2 mt-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_NuxtLink, { to: "/auth/forgot" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="text-sm font-semibold text-orange-500 hover:underline cursor-pointer"${_scopeId5}> Forgot your password? </p>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "text-sm font-semibold text-orange-500 hover:underline cursor-pointer" }, " Forgot your password? ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "flex items-end justify-end group cursor-pointer" }, [
                                  createVNode("div", {
                                    class: "flex items-center rounded-full border border-gray-300 group group-hover:border-red-600",
                                    onClick: closeAlert
                                  }, [
                                    createVNode(_component_Icon, {
                                      name: "mingcute:close-fill",
                                      class: "text-gray-300 group-hover:text-red-600"
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "flex flex-col items-center py-10" }, [
                                  createVNode(_component_NuxtImg, {
                                    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-3Rjv7fjDPf2WbW8KIVU5rN_dsRmAOkc1KZQeVq50sOUpcssKy6bDB0yH3V_nuxEJ6KEb6m3jdkl5gh9IVf2AK1HI8bl9v9y6Zf0TrQtzsML0F7O4PgplMSeMQ4RkQUjQbc40_cgyoaxnIlvpnMxM-1nGVWs9Wc1bMYxqnujKHfL2BG2vsuGwbdFunS7/s16000/logo-footer.png",
                                    class: "h-8 w-auto object-fill ml-5"
                                  }),
                                  createVNode("div", { class: "relative w-full mt-3" }, [
                                    unref(loginError) ? (openBlock(), createBlock(_component_AlertMessageBox, {
                                      key: 0,
                                      theme: "danger",
                                      message: unref(loginError).message,
                                      "show-close": true,
                                      onCloseMessage: ($event) => loginError.value = null
                                    }, null, 8, ["message", "onCloseMessage"])) : createCommentVNode("", true),
                                    unref(getProfileError) ? (openBlock(), createBlock(_component_AlertMessageBox, {
                                      key: 1,
                                      theme: "danger",
                                      message: unref(getProfileError).message,
                                      "show-close": true,
                                      onCloseMessage: ($event) => getProfileError.value = null
                                    }, null, 8, ["message", "onCloseMessage"])) : createCommentVNode("", true),
                                    unref(loginSuccess) ? (openBlock(), createBlock(_component_AlertMessageBox, {
                                      key: 2,
                                      theme: "success",
                                      message: "Success Login",
                                      "show-close": true,
                                      onCloseMessage: ($event) => loginSuccess.value = false
                                    }, null, 8, ["onCloseMessage"])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("h1", { class: "mt-3 text-xl text-gray-50 font-semibold uppercase" }, " Login "),
                                  createVNode("form", {
                                    onSubmit: withModifiers(unref(onSubmit), ["prevent"]),
                                    class: "relative w-full"
                                  }, [
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "email",
                                        class: "text-sm text-gray-50 font-semibold"
                                      }, "Email Address *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "email",
                                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        required: ""
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(email)]
                                      ]),
                                      unref(emailError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(emailError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "password",
                                        class: "text-sm text-gray-50 font-semibold"
                                      }, "Password *"),
                                      withDirectives(createVNode("input", {
                                        type: unref(typePassword),
                                        name: "password",
                                        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
                                      }, null, 8, ["type", "onUpdate:modelValue"]), [
                                        [vModelDynamic, unref(password)]
                                      ]),
                                      createVNode(_component_Icon, {
                                        name: unref(typePassword) === "password" ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline",
                                        class: "absolute top-8 right-2 h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-50",
                                        onClick: togglePassword
                                      }, null, 8, ["name"]),
                                      unref(passwordError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(passwordError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("button", {
                                      type: "submit",
                                      class: "inline-flex w-full items-center justify-center py-2 bg-orange-600 hover:bg-orange-500 text-sm text-gray-50 font-semibold rounded-sm mt-5"
                                    }, " Sign In "),
                                    createVNode("div", { class: "flex items-center justify-center gap-2 mt-2" }, [
                                      createVNode("input", { type: "checkbox" }),
                                      createVNode("label", {
                                        for: "remember",
                                        class: "text-sm text-gray-200"
                                      }, "Remember Me")
                                    ])
                                  ], 40, ["onSubmit"]),
                                  createVNode("div", { class: "flex items-center justify-center gap-2 mt-2" }, [
                                    createVNode(_component_NuxtLink, { to: "/auth/forgot" }, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-sm font-semibold text-orange-500 hover:underline cursor-pointer" }, " Forgot your password? ")
                                      ]),
                                      _: 1
                                    })
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_HeadlessDialogPanel, { class: "w-full max-w-md transform overflow-hidden rounded-2xl bg-[#002453] dark:bg-slate-950 p-6 text-left align-middle shadow-xl transition-all border border-gray-500 dark:border-gray-700" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-end justify-end group cursor-pointer" }, [
                                createVNode("div", {
                                  class: "flex items-center rounded-full border border-gray-300 group group-hover:border-red-600",
                                  onClick: closeAlert
                                }, [
                                  createVNode(_component_Icon, {
                                    name: "mingcute:close-fill",
                                    class: "text-gray-300 group-hover:text-red-600"
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-col items-center py-10" }, [
                                createVNode(_component_NuxtImg, {
                                  src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-3Rjv7fjDPf2WbW8KIVU5rN_dsRmAOkc1KZQeVq50sOUpcssKy6bDB0yH3V_nuxEJ6KEb6m3jdkl5gh9IVf2AK1HI8bl9v9y6Zf0TrQtzsML0F7O4PgplMSeMQ4RkQUjQbc40_cgyoaxnIlvpnMxM-1nGVWs9Wc1bMYxqnujKHfL2BG2vsuGwbdFunS7/s16000/logo-footer.png",
                                  class: "h-8 w-auto object-fill ml-5"
                                }),
                                createVNode("div", { class: "relative w-full mt-3" }, [
                                  unref(loginError) ? (openBlock(), createBlock(_component_AlertMessageBox, {
                                    key: 0,
                                    theme: "danger",
                                    message: unref(loginError).message,
                                    "show-close": true,
                                    onCloseMessage: ($event) => loginError.value = null
                                  }, null, 8, ["message", "onCloseMessage"])) : createCommentVNode("", true),
                                  unref(getProfileError) ? (openBlock(), createBlock(_component_AlertMessageBox, {
                                    key: 1,
                                    theme: "danger",
                                    message: unref(getProfileError).message,
                                    "show-close": true,
                                    onCloseMessage: ($event) => getProfileError.value = null
                                  }, null, 8, ["message", "onCloseMessage"])) : createCommentVNode("", true),
                                  unref(loginSuccess) ? (openBlock(), createBlock(_component_AlertMessageBox, {
                                    key: 2,
                                    theme: "success",
                                    message: "Success Login",
                                    "show-close": true,
                                    onCloseMessage: ($event) => loginSuccess.value = false
                                  }, null, 8, ["onCloseMessage"])) : createCommentVNode("", true)
                                ]),
                                createVNode("h1", { class: "mt-3 text-xl text-gray-50 font-semibold uppercase" }, " Login "),
                                createVNode("form", {
                                  onSubmit: withModifiers(unref(onSubmit), ["prevent"]),
                                  class: "relative w-full"
                                }, [
                                  createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "email",
                                      class: "text-sm text-gray-50 font-semibold"
                                    }, "Email Address *"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      name: "email",
                                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      required: ""
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(email)]
                                    ]),
                                    unref(emailError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(emailError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "password",
                                      class: "text-sm text-gray-50 font-semibold"
                                    }, "Password *"),
                                    withDirectives(createVNode("input", {
                                      type: unref(typePassword),
                                      name: "password",
                                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
                                    }, null, 8, ["type", "onUpdate:modelValue"]), [
                                      [vModelDynamic, unref(password)]
                                    ]),
                                    createVNode(_component_Icon, {
                                      name: unref(typePassword) === "password" ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline",
                                      class: "absolute top-8 right-2 h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-50",
                                      onClick: togglePassword
                                    }, null, 8, ["name"]),
                                    unref(passwordError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(passwordError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("button", {
                                    type: "submit",
                                    class: "inline-flex w-full items-center justify-center py-2 bg-orange-600 hover:bg-orange-500 text-sm text-gray-50 font-semibold rounded-sm mt-5"
                                  }, " Sign In "),
                                  createVNode("div", { class: "flex items-center justify-center gap-2 mt-2" }, [
                                    createVNode("input", { type: "checkbox" }),
                                    createVNode("label", {
                                      for: "remember",
                                      class: "text-sm text-gray-200"
                                    }, "Remember Me")
                                  ])
                                ], 40, ["onSubmit"]),
                                createVNode("div", { class: "flex items-center justify-center gap-2 mt-2" }, [
                                  createVNode(_component_NuxtLink, { to: "/auth/forgot" }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-sm font-semibold text-orange-500 hover:underline cursor-pointer" }, " Forgot your password? ")
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
                            createVNode(_component_HeadlessDialogPanel, { class: "w-full max-w-md transform overflow-hidden rounded-2xl bg-[#002453] dark:bg-slate-950 p-6 text-left align-middle shadow-xl transition-all border border-gray-500 dark:border-gray-700" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-end justify-end group cursor-pointer" }, [
                                  createVNode("div", {
                                    class: "flex items-center rounded-full border border-gray-300 group group-hover:border-red-600",
                                    onClick: closeAlert
                                  }, [
                                    createVNode(_component_Icon, {
                                      name: "mingcute:close-fill",
                                      class: "text-gray-300 group-hover:text-red-600"
                                    })
                                  ])
                                ]),
                                createVNode("div", { class: "flex flex-col items-center py-10" }, [
                                  createVNode(_component_NuxtImg, {
                                    src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-3Rjv7fjDPf2WbW8KIVU5rN_dsRmAOkc1KZQeVq50sOUpcssKy6bDB0yH3V_nuxEJ6KEb6m3jdkl5gh9IVf2AK1HI8bl9v9y6Zf0TrQtzsML0F7O4PgplMSeMQ4RkQUjQbc40_cgyoaxnIlvpnMxM-1nGVWs9Wc1bMYxqnujKHfL2BG2vsuGwbdFunS7/s16000/logo-footer.png",
                                    class: "h-8 w-auto object-fill ml-5"
                                  }),
                                  createVNode("div", { class: "relative w-full mt-3" }, [
                                    unref(loginError) ? (openBlock(), createBlock(_component_AlertMessageBox, {
                                      key: 0,
                                      theme: "danger",
                                      message: unref(loginError).message,
                                      "show-close": true,
                                      onCloseMessage: ($event) => loginError.value = null
                                    }, null, 8, ["message", "onCloseMessage"])) : createCommentVNode("", true),
                                    unref(getProfileError) ? (openBlock(), createBlock(_component_AlertMessageBox, {
                                      key: 1,
                                      theme: "danger",
                                      message: unref(getProfileError).message,
                                      "show-close": true,
                                      onCloseMessage: ($event) => getProfileError.value = null
                                    }, null, 8, ["message", "onCloseMessage"])) : createCommentVNode("", true),
                                    unref(loginSuccess) ? (openBlock(), createBlock(_component_AlertMessageBox, {
                                      key: 2,
                                      theme: "success",
                                      message: "Success Login",
                                      "show-close": true,
                                      onCloseMessage: ($event) => loginSuccess.value = false
                                    }, null, 8, ["onCloseMessage"])) : createCommentVNode("", true)
                                  ]),
                                  createVNode("h1", { class: "mt-3 text-xl text-gray-50 font-semibold uppercase" }, " Login "),
                                  createVNode("form", {
                                    onSubmit: withModifiers(unref(onSubmit), ["prevent"]),
                                    class: "relative w-full"
                                  }, [
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "email",
                                        class: "text-sm text-gray-50 font-semibold"
                                      }, "Email Address *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "email",
                                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        required: ""
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(email)]
                                      ]),
                                      unref(emailError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(emailError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "password",
                                        class: "text-sm text-gray-50 font-semibold"
                                      }, "Password *"),
                                      withDirectives(createVNode("input", {
                                        type: unref(typePassword),
                                        name: "password",
                                        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
                                      }, null, 8, ["type", "onUpdate:modelValue"]), [
                                        [vModelDynamic, unref(password)]
                                      ]),
                                      createVNode(_component_Icon, {
                                        name: unref(typePassword) === "password" ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline",
                                        class: "absolute top-8 right-2 h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-50",
                                        onClick: togglePassword
                                      }, null, 8, ["name"]),
                                      unref(passwordError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(passwordError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("button", {
                                      type: "submit",
                                      class: "inline-flex w-full items-center justify-center py-2 bg-orange-600 hover:bg-orange-500 text-sm text-gray-50 font-semibold rounded-sm mt-5"
                                    }, " Sign In "),
                                    createVNode("div", { class: "flex items-center justify-center gap-2 mt-2" }, [
                                      createVNode("input", { type: "checkbox" }),
                                      createVNode("label", {
                                        for: "remember",
                                        class: "text-sm text-gray-200"
                                      }, "Remember Me")
                                    ])
                                  ], 40, ["onSubmit"]),
                                  createVNode("div", { class: "flex items-center justify-center gap-2 mt-2" }, [
                                    createVNode(_component_NuxtLink, { to: "/auth/forgot" }, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "text-sm font-semibold text-orange-500 hover:underline cursor-pointer" }, " Forgot your password? ")
                                      ]),
                                      _: 1
                                    })
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
                          createVNode(_component_HeadlessDialogPanel, { class: "w-full max-w-md transform overflow-hidden rounded-2xl bg-[#002453] dark:bg-slate-950 p-6 text-left align-middle shadow-xl transition-all border border-gray-500 dark:border-gray-700" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-end justify-end group cursor-pointer" }, [
                                createVNode("div", {
                                  class: "flex items-center rounded-full border border-gray-300 group group-hover:border-red-600",
                                  onClick: closeAlert
                                }, [
                                  createVNode(_component_Icon, {
                                    name: "mingcute:close-fill",
                                    class: "text-gray-300 group-hover:text-red-600"
                                  })
                                ])
                              ]),
                              createVNode("div", { class: "flex flex-col items-center py-10" }, [
                                createVNode(_component_NuxtImg, {
                                  src: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhK-3Rjv7fjDPf2WbW8KIVU5rN_dsRmAOkc1KZQeVq50sOUpcssKy6bDB0yH3V_nuxEJ6KEb6m3jdkl5gh9IVf2AK1HI8bl9v9y6Zf0TrQtzsML0F7O4PgplMSeMQ4RkQUjQbc40_cgyoaxnIlvpnMxM-1nGVWs9Wc1bMYxqnujKHfL2BG2vsuGwbdFunS7/s16000/logo-footer.png",
                                  class: "h-8 w-auto object-fill ml-5"
                                }),
                                createVNode("div", { class: "relative w-full mt-3" }, [
                                  unref(loginError) ? (openBlock(), createBlock(_component_AlertMessageBox, {
                                    key: 0,
                                    theme: "danger",
                                    message: unref(loginError).message,
                                    "show-close": true,
                                    onCloseMessage: ($event) => loginError.value = null
                                  }, null, 8, ["message", "onCloseMessage"])) : createCommentVNode("", true),
                                  unref(getProfileError) ? (openBlock(), createBlock(_component_AlertMessageBox, {
                                    key: 1,
                                    theme: "danger",
                                    message: unref(getProfileError).message,
                                    "show-close": true,
                                    onCloseMessage: ($event) => getProfileError.value = null
                                  }, null, 8, ["message", "onCloseMessage"])) : createCommentVNode("", true),
                                  unref(loginSuccess) ? (openBlock(), createBlock(_component_AlertMessageBox, {
                                    key: 2,
                                    theme: "success",
                                    message: "Success Login",
                                    "show-close": true,
                                    onCloseMessage: ($event) => loginSuccess.value = false
                                  }, null, 8, ["onCloseMessage"])) : createCommentVNode("", true)
                                ]),
                                createVNode("h1", { class: "mt-3 text-xl text-gray-50 font-semibold uppercase" }, " Login "),
                                createVNode("form", {
                                  onSubmit: withModifiers(unref(onSubmit), ["prevent"]),
                                  class: "relative w-full"
                                }, [
                                  createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "email",
                                      class: "text-sm text-gray-50 font-semibold"
                                    }, "Email Address *"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      name: "email",
                                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      required: ""
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(email)]
                                    ]),
                                    unref(emailError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(emailError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "password",
                                      class: "text-sm text-gray-50 font-semibold"
                                    }, "Password *"),
                                    withDirectives(createVNode("input", {
                                      type: unref(typePassword),
                                      name: "password",
                                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm"
                                    }, null, 8, ["type", "onUpdate:modelValue"]), [
                                      [vModelDynamic, unref(password)]
                                    ]),
                                    createVNode(_component_Icon, {
                                      name: unref(typePassword) === "password" ? "ic:outline-remove-red-eye" : "mdi:eye-off-outline",
                                      class: "absolute top-8 right-2 h-6 w-6 cursor-pointer text-gray-900 dark:text-gray-50",
                                      onClick: togglePassword
                                    }, null, 8, ["name"]),
                                    unref(passwordError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(passwordError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("button", {
                                    type: "submit",
                                    class: "inline-flex w-full items-center justify-center py-2 bg-orange-600 hover:bg-orange-500 text-sm text-gray-50 font-semibold rounded-sm mt-5"
                                  }, " Sign In "),
                                  createVNode("div", { class: "flex items-center justify-center gap-2 mt-2" }, [
                                    createVNode("input", { type: "checkbox" }),
                                    createVNode("label", {
                                      for: "remember",
                                      class: "text-sm text-gray-200"
                                    }, "Remember Me")
                                  ])
                                ], 40, ["onSubmit"]),
                                createVNode("div", { class: "flex items-center justify-center gap-2 mt-2" }, [
                                  createVNode(_component_NuxtLink, { to: "/auth/forgot" }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-sm font-semibold text-orange-500 hover:underline cursor-pointer" }, " Forgot your password? ")
                                    ]),
                                    _: 1
                                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LoginDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _imports_0 = publicAssetsURL("/icons/whatsapp.svg");
const _imports_1 = publicAssetsURL("/icons/facebook.svg");
const _imports_2 = publicAssetsURL("/icons/twitter.svg");
const _imports_3 = publicAssetsURL("/icons/linkedin.svg");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const themeStore = useThemeSettings();
    const authStore = useAuthStore();
    const config = useRuntimeConfig();
    const cartStore = useCartStore();
    useNuxtApp();
    const size = ref("S");
    const modalAlert = ref(false);
    const createReview = ref(false);
    config.public.metapixel.ads01;
    function openAlert() {
      if (authStore.isLoggedIn) {
        createReview.value = true;
      } else {
        modalAlert.value = true;
      }
    }
    function closeAlert() {
      modalAlert.value = false;
    }
    const sizes = [
      { code: "S" },
      { code: "M" },
      { code: "L" },
      { code: "XL" },
      { code: "XXL" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingSkeleton = _sfc_main$5;
      const _component_ThumbSlider = _sfc_main$4;
      const _component_ClientOnly = __nuxt_component_5;
      const _component_Icon = __nuxt_component_4;
      const _component_Badge = script;
      const _component_CounterButton = _sfc_main$6;
      const _component_DescriptionProduct = _sfc_main$3;
      const _component_ReviewProduct = _sfc_main$2;
      const _component_LoginDialog = _sfc_main$1;
      if (unref(themeStore).isLoading) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-gray-50 dark:bg-slate-900" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_LoadingSkeleton, { "row-count": 10 }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full bg-gray-100 dark:bg-slate-900 py-2 px-2 lg:px-6 lg:py-6 md:px-6 md:py-6 rounded-lg mt-16 md:mt-16 lg:mt-14" }, _attrs))}><div class="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 w-full lg:space-x-6 md:space-x-6"><div class="col-span-1 lg:col-span-4 md:col-span-4 w-full">`);
        _push(ssrRenderComponent(_component_ThumbSlider, {
          product: unref(productStore).images
        }, null, _parent));
        _push(`</div><div class="col-span-1 lg:col-span-8 md:col-span-8 mt-3 lg:mt-0 md:mt-0"><div class="space-y-1"><h1 class="text-xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100">${ssrInterpolate(unref(productStore).name)}</h1>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`<div class="flex items-center space-x-2 rtl:space-x-reverse"><div class="font-normal text-gray-900 dark:text-slate-300"> Brand: </div><div class="font-bold text-slate-950 dark:text-slate-300 capitalize">${ssrInterpolate(unref(productStore).brand)}</div></div><div class="flex items-center space-x-2 rtl:space-x-reverse"><div class="font-normal text-sm lg:text-base text-slate-900 dark:text-slate-300"> Available: </div><div class="font-bold text-slate-950 dark:text-slate-300"> In Stock </div></div><div class="text-slate-950 dark:text-slate-200">${ssrInterpolate(unref(productStore).shortDesc)}</div></div><div class="flex flex-col space-y-1 py-2 !mt-0"><div class="flex flex-col space-y-3"><div class="flex items-center space-x-2 rtl:space-x-reverse"><div class="font-normal text-slate-900 dark:text-slate-300"> Size: </div><div class="font-semibold text-slate-950 dark:text-slate-300">${ssrInterpolate(unref(size))}</div></div><div class="flex items-center space-x-4 rtl:space-x-reverse mb-4 h-6"><!--[-->`);
        ssrRenderList(sizes, (list, i2) => {
          _push(`<label><input type="radio" name="size"${ssrRenderAttr("value", list.code)} class="hidden h-7 w-7"><div style="${ssrRenderStyle({ backgroundColor: list.code })}" class="${ssrRenderClass([{
            "ring-red-700 ring-2 dark:ring-slate-50 dark:bg-gray-700": list.code === unref(size),
            "ring-slate-300 bg-gray-50 dark:ring-slate-700 dark:bg-gray-900": list.code !== unref(size),
            "ring-1": true,
            "dark:text-slate-300 text-gray-900": true,
            "dark:ring-red-900": list.code === unref(size),
            "ring-offset-2": true,
            flex: true,
            "justify-center": true,
            "items-center": true,
            "ring-offset-white dark:ring-offset-slate-900": true,
            "cursor-pointer": true,
            "dark:ring-offset-transparent": true,
            "rounded-sm": true
          }, "h-7 w-7"])}">${ssrInterpolate(list.code)}</div></label>`);
        });
        _push(`<!--]--></div></div></div><div class="w-full border-t mt-2 mb-1 border-slate-300 dark:border-slate-600"></div><div class="overflow-x-auto"><div class="inline-block max-w-full align-middle"><div class="overflow-hidden"><table class="min-w-full"><tbody class="bg-gray-100 dark:bg-slate-900"><tr><td class="table-td py-1 pl-0 font-normal text-slate-900 dark:text-slate-300"> Price: </td><td class="table-td py-1 px-8 space-x-3 rtl:space-x-reverse"><span class="text-slate-950 dark:text-slate-300 font-bold text-xl lg:text-2xl md:text-2xl"> $${ssrInterpolate(unref(productStore).price)}</span><del class="text-red-600 dark:text-red-400 font-semibold text-sm lg:text-lg md:text-lg">${ssrInterpolate(unref(productStore).oldPrice)}</del>`);
        _push(ssrRenderComponent(_component_Badge, { class: "font-normal text-[10px] bg-blue-600 text-white" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span${_scopeId}>${ssrInterpolate(unref(productStore).percent)}</span>`);
            } else {
              return [
                createVNode("span", null, toDisplayString(unref(productStore).percent), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</td></tr><tr><td class="table-td py-1 pl-0 font-normal text-slate-900 dark:text-slate-300"> Quantity: </td><td class="table-td py-2 px-8">`);
        if (unref(cartStore).items.find(
          (item) => item.sku == unref(productStore).sku
        )) {
          _push(ssrRenderComponent(_component_CounterButton, { product: unref(productStore) }, null, _parent));
        } else {
          _push(`<span><div class="flex space-x-4 rtl:space-x-reverse items-center cursor-not-allowed"><div class="flex-1 h-8 flex border border-1 border-slate-400 delay-150 ease-in-out dark:border-slate-600 divide-x-[1px] rtl:divide-x-reverse text-sm font-normal divide-slate-500 dark:divide-slate-600 rounded cursor-not-allowed"><button type="button" class="flex-none px-2 dark:text-white text-slate-900 hover:bg-slate-900 hover:text-white dark:hover:bg-slate-700 cursor-not-allowed opacity-50">`);
          _push(ssrRenderComponent(_component_Icon, { name: "ic:baseline-minus" }, null, _parent));
          _push(`</button><div class="flex-1 w-[62px] text-center text-slate-500 dark:text-slate-300 flex items-center justify-center cursor-not-allowed"> 0 </div><button type="button" class="flex-none px-2 cursor-not-allowed opacity-50 text-slate-900 hover:bg-slate-900 hover:text-white dark:text-white dark:hover:bg-slate-700 rtl:dark:hover:rounded-l ltr:dark:hover:rounded-r">`);
          _push(ssrRenderComponent(_component_Icon, { name: "ic:baseline-plus" }, null, _parent));
          _push(`</button></div></div></span>`);
        }
        _push(`</td></tr><tr><td class="table-td py-1 pl-0 font-normal lg:text-base text-slate-900 dark:text-slate-300"> Total Price: </td>`);
        if (unref(cartStore).items.find((item) => item.sku === unref(productStore).sku)) {
          _push(`<td class="table-td py-2 px-8 text-slate-950 dark:text-slate-200 font-bold text-xl lg:text-2xl md:text-2xl"> $${ssrInterpolate(unref(cartStore).totalPrice)}</td>`);
        } else {
          _push(`<td class="table-td py-2 px-8 text-slate-900 dark:text-slate-300 font-semibold text-xl lg:text-2xl md:text-2xl"> $${ssrInterpolate(unref(productStore).price)}</td>`);
        }
        _push(`</tr></tbody></table></div></div></div><div class="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse pb-5"><button type="button"${ssrIncludeBooleanAttr(
          unref(cartStore).items.find((item) => item.sku === unref(productStore).sku) ? true : false
        ) ? " disabled" : ""} class="${ssrRenderClass([unref(cartStore).items.find((item) => item.sku === unref(productStore).sku) ? "cursor-not-allowed" : "", "inline-flex bg-green-600 text-sm font-semibold text-gray-50 gap-2 px-10 py-2 items-center justify-center rounded-sm hover:bg-green-800"])}">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:outline-shopping-bag",
          class: "h-5 w-5"
        }, null, _parent));
        _push(` Add To Cart </button><button type="button" class="inline-flex bg-gray-900 dark:bg-gray-50 text-sm font-semibold text-gray-50 dark:text-gray-950 gap-2 px-14 py-2 items-center justify-center rounded-sm hover:bg-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-50">${ssrInterpolate(unref(cartStore).items.length > 0 ? "View Cart" : "Buy Now")}</button></div><div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-3 rtl:space-x-reverse"><p class="font-normal text-slate-950 dark:text-slate-300"> Share to: </p><div class="flex items-center space-x-3 rtl:space-x-reverse"><button type="button" class="border p-2 border-slate-500 rounded h-8 w-8 flex justify-center items-center"><img class="w-full h-full"${ssrRenderAttr("src", _imports_0)}></button><button type="button" class="border p-2 border-slate-500 rounded h-8 w-8 flex justify-center items-center"><img class="w-full h-full"${ssrRenderAttr("src", _imports_1)}></button><button type="button" class="border p-2 border-slate-500 rounded h-8 w-8 flex justify-center items-center"><img class="w-full h-full"${ssrRenderAttr("src", _imports_2)}></button><button type="button" class="border p-2 border-slate-500 rounded h-8 w-8 flex justify-center items-center"><img class="w-full h-full"${ssrRenderAttr("src", _imports_3)}></button></div></div></div></div><div class="space-y-5 mt-5">`);
        _push(ssrRenderComponent(_component_DescriptionProduct, null, null, _parent));
        _push(ssrRenderComponent(_component_ReviewProduct, {
          reviews: unref(reviewStore),
          onOpenAlert: openAlert,
          "create-review": unref(createReview),
          onCloseCreateReview: ($event) => createReview.value = false
        }, null, _parent));
        _push(`</div>`);
        if (unref(modalAlert)) {
          _push(ssrRenderComponent(_component_LoginDialog, {
            "is-open": unref(modalAlert),
            onCloseAlert: closeAlert
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BP_BIX6Q.mjs.map

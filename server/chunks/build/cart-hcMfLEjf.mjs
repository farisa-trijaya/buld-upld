import _sfc_main$8 from './LoadingSkeleton-BGYYkLjL.mjs';
import { _ as __nuxt_component_5 } from './client-only-pjR2XYdd.mjs';
import { useSSRContext, defineComponent, ref, unref, mergeProps, withCtx, createVNode, withModifiers, withDirectives, isRef, vModelText, openBlock, createBlock, toDisplayString, createCommentVNode, createTextVNode, Fragment, renderList, vModelSelect } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderStyle } from 'vue/server-renderer';
import { _ as _sfc_main$9 } from './CounterButton-CHd8TWSH.mjs';
import __nuxt_component_4 from './index-BzxFm_el.mjs';
import { u as useCartStore, S as Se, Y as Ye, h as he, G as Ge } from './dialog-C08sMnSt.mjs';
import * as Yup from 'yup';
import { u as useForm, a as useField } from './vee-validate-DiAzowps.mjs';
import { _ as _sfc_main$a } from './AlertMessageBox-DCW4o88x.mjs';
import { s as script } from './index-BXP26MNa.mjs';
import { b as useNuxtApp, u as useHead, c as useRuntimeConfig } from './server.mjs';
import dayjs from 'dayjs';
import { _ as __nuxt_component_0 } from './nuxt-link-CqfMrQcT.mjs';
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
import './index-BTjgdG92.mjs';
import '@primeuix/utils/dom';
import '@primeuix/utils/uuid';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@primeuix/utils/eventbus';
import '@primeuix/utils';
import 'deep-pick-omit';
import 'vue3-star-ratings';

const _sfc_main$7 = {
  __name: "StepBox",
  __ssrInlineRender: true,
  props: {
    steps: {
      type: Object,
      required: true
    },
    stepNumber: {
      type: Number,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_5;
      _push(`<li${ssrRenderAttrs(mergeProps({
        class: ["flex bg-gray-50 dark:bg-slate-800 items-center justify-center text-center lg:border border-slate-300 dark:border-slate-700 dark:border-b-slate-500 rounded-t lg:border-b-8 rounded-b-lg xl:px-10 xl:py-7 lg:px-3 lg:py-6 transition-all duration-150", {
          " border-b-slate-900 dark:border-b-slate-300 text-slate-900 dark:text-white ": __props.stepNumber === props.steps.step,
          " border-b-slate-300 dark:border-b-slate-500 text-slate-500 ": __props.stepNumber < props.steps.step,
          " border-b-green-500 dark:border-b-green-500  text-green-500 dark:text-green-500 ": __props.stepNumber > props.steps.step
        }]
      }, _attrs))}><div class="flex flex-col items-center justify-center space-y-3">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`<div class="text-base font-medium lg:block hidden">${ssrInterpolate(props.steps.step)}. ${ssrInterpolate(props.steps.title)}</div></div></li>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/step/StepBox.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "CartStep",
  __ssrInlineRender: true,
  setup(__props) {
    const cart = useCartStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CounterButton = _sfc_main$9;
      const _component_Icon = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-800 space-y-7" }, _attrs))}><div class="overflow-x-auto border-0"><div class="inline-block min-w-full align-middle"><div class="md:overflow-auto"><table class="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"><thead class="border-0 border-slate-100 dark:border-slate-800 dark:text-slate-400"><tr><th scope="col" class="table-th md:px-5 px-3 py-3 text-left"> Product </th><th scope="col" class="table-th md:px-5 px-3 py-3 text-left"> Price </th><th scope="col" class="table-th md:px-5 px-3 py-3 text-left"> Quantity </th><th scope="col" class="table-th md:px-5 px-3 py-3 text-left"> Total </th><th scope="col" class="table-th md:px-5 px-3 py-3 text-right"> Remove </th></tr></thead>`);
      if (unref(cart).items.length > 0) {
        _push(`<tbody class="bg-white divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"><!--[-->`);
        ssrRenderList(unref(cart).items, (item, index) => {
          var _a;
          _push(`<tr><td${ssrRenderAttr("item", item)} class="table-td flex items-center space-x-3 rtl:space-x-reverse md:p-5 py-3 px-3 md:px-5"><div class="md:p-4 p-2 flex-none bg-slate-200 rounded md:h-20 md:w-20 w-16 h-16 rtl:ml-3"><img class="w-full h-full object-contain"${ssrRenderAttr("src", (_a = item.images) == null ? void 0 : _a[0])}></div><div><p class="text-slate-900 dark:text-slate-300 md:text-base text-sm font-medium md:py-2 py-1 md:w-[380px] w-[150px] truncate">${ssrInterpolate(item.name)}</p><p class="text-slate-900 dark:text-slate-300 md:text-base text-sm font-medium"><span class="text-slate-500 dark:text-slate-400 font-normal mr-1"> Brand: </span> ${ssrInterpolate(item.brand)}</p></div></td><td class="table-td text-left md:p-5 py-3 px-3 dark:text-slate-300"> $${ssrInterpolate(item.price)}</td><td class="table-td text-left md:p-5 py-3 px-3 dark:text-slate-300"><div class="max-w-[100px]">`);
          _push(ssrRenderComponent(_component_CounterButton, { product: item }, null, _parent));
          _push(`</div></td><td class="table-td text-left md:p-5 py-3 px-3 dark:text-slate-300"> $${ssrInterpolate(item.price * item.quantity)}</td><td class="table-td text-right md:p-5 py-3 px-3 dark:text-slate-300"><button class="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400 bg-slate-100 hover:bg-danger-500 hover:text-white dark:hover:bg-danger-500 dark:hover:text-white">`);
          _push(ssrRenderComponent(_component_Icon, { name: "material-symbols:delete-outline" }, null, _parent));
          _push(`</button></td></tr>`);
        });
        _push(`<!--]--></tbody>`);
      } else {
        _push(`<tbody class="bg-white divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"><tr><td class="table-td text-center h-24 dark:text-slate-300" colSpan="5"> No result&#39;s </td></tr></tbody>`);
      }
      _push(`<tfoot class="mx-6"><tr class="border-t dark:border-slate-700"><td class="table-td px-3 py-3 text-left" colSpan="4"><p class="md:text-base text-sm font-medium text-slate-500 dark:text-slate-400"> Subtotal: </p></td><td class="table-td px-3 py-3 text-right"><p class="md:text-base text-sm font-medium text-slate-900 dark:text-slate-300"> $${ssrInterpolate(unref(cart).totalPrice)}</p></td></tr></tfoot></table></div></div></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/step/CartStep.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const countryFlag = [
  {
    name: "Ascension Island",
    code: "AC",
    emoji: "\u{1F1E6}\u{1F1E8}",
    unicode: "U+1F1E6 U+1F1E8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AC.svg"
  },
  {
    name: "Andorra",
    code: "AD",
    emoji: "\u{1F1E6}\u{1F1E9}",
    unicode: "U+1F1E6 U+1F1E9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AD.svg"
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    emoji: "\u{1F1E6}\u{1F1EA}",
    unicode: "U+1F1E6 U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AE.svg"
  },
  {
    name: "Afghanistan",
    code: "AF",
    emoji: "\u{1F1E6}\u{1F1EB}",
    unicode: "U+1F1E6 U+1F1EB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AF.svg"
  },
  {
    name: "Antigua & Barbuda",
    code: "AG",
    emoji: "\u{1F1E6}\u{1F1EC}",
    unicode: "U+1F1E6 U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AG.svg"
  },
  {
    name: "Anguilla",
    code: "AI",
    emoji: "\u{1F1E6}\u{1F1EE}",
    unicode: "U+1F1E6 U+1F1EE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AI.svg"
  },
  {
    name: "Albania",
    code: "AL",
    emoji: "\u{1F1E6}\u{1F1F1}",
    unicode: "U+1F1E6 U+1F1F1",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AL.svg"
  },
  {
    name: "Armenia",
    code: "AM",
    emoji: "\u{1F1E6}\u{1F1F2}",
    unicode: "U+1F1E6 U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AM.svg"
  },
  {
    name: "Angola",
    code: "AO",
    emoji: "\u{1F1E6}\u{1F1F4}",
    unicode: "U+1F1E6 U+1F1F4",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AO.svg"
  },
  {
    name: "Antarctica",
    code: "AQ",
    emoji: "\u{1F1E6}\u{1F1F6}",
    unicode: "U+1F1E6 U+1F1F6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AQ.svg"
  },
  {
    name: "Argentina",
    code: "AR",
    emoji: "\u{1F1E6}\u{1F1F7}",
    unicode: "U+1F1E6 U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AR.svg"
  },
  {
    name: "American Samoa",
    code: "AS",
    emoji: "\u{1F1E6}\u{1F1F8}",
    unicode: "U+1F1E6 U+1F1F8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AS.svg"
  },
  {
    name: "Austria",
    code: "AT",
    emoji: "\u{1F1E6}\u{1F1F9}",
    unicode: "U+1F1E6 U+1F1F9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AT.svg"
  },
  {
    name: "Australia",
    code: "AU",
    emoji: "\u{1F1E6}\u{1F1FA}",
    unicode: "U+1F1E6 U+1F1FA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AU.svg"
  },
  {
    name: "Aruba",
    code: "AW",
    emoji: "\u{1F1E6}\u{1F1FC}",
    unicode: "U+1F1E6 U+1F1FC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AW.svg"
  },
  {
    name: "\xC5land Islands",
    code: "AX",
    emoji: "\u{1F1E6}\u{1F1FD}",
    unicode: "U+1F1E6 U+1F1FD",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AX.svg"
  },
  {
    name: "Azerbaijan",
    code: "AZ",
    emoji: "\u{1F1E6}\u{1F1FF}",
    unicode: "U+1F1E6 U+1F1FF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/AZ.svg"
  },
  {
    name: "Bosnia & Herzegovina",
    code: "BA",
    emoji: "\u{1F1E7}\u{1F1E6}",
    unicode: "U+1F1E7 U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BA.svg"
  },
  {
    name: "Barbados",
    code: "BB",
    emoji: "\u{1F1E7}\u{1F1E7}",
    unicode: "U+1F1E7 U+1F1E7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BB.svg"
  },
  {
    name: "Bangladesh",
    code: "BD",
    emoji: "\u{1F1E7}\u{1F1E9}",
    unicode: "U+1F1E7 U+1F1E9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BD.svg"
  },
  {
    name: "Belgium",
    code: "BE",
    emoji: "\u{1F1E7}\u{1F1EA}",
    unicode: "U+1F1E7 U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BE.svg"
  },
  {
    name: "Burkina Faso",
    code: "BF",
    emoji: "\u{1F1E7}\u{1F1EB}",
    unicode: "U+1F1E7 U+1F1EB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BF.svg"
  },
  {
    name: "Bulgaria",
    code: "BG",
    emoji: "\u{1F1E7}\u{1F1EC}",
    unicode: "U+1F1E7 U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BG.svg"
  },
  {
    name: "Bahrain",
    code: "BH",
    emoji: "\u{1F1E7}\u{1F1ED}",
    unicode: "U+1F1E7 U+1F1ED",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BH.svg"
  },
  {
    name: "Burundi",
    code: "BI",
    emoji: "\u{1F1E7}\u{1F1EE}",
    unicode: "U+1F1E7 U+1F1EE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BI.svg"
  },
  {
    name: "Benin",
    code: "BJ",
    emoji: "\u{1F1E7}\u{1F1EF}",
    unicode: "U+1F1E7 U+1F1EF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BJ.svg"
  },
  {
    name: "St. Barth\xE9lemy",
    code: "BL",
    emoji: "\u{1F1E7}\u{1F1F1}",
    unicode: "U+1F1E7 U+1F1F1",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BL.svg"
  },
  {
    name: "Bermuda",
    code: "BM",
    emoji: "\u{1F1E7}\u{1F1F2}",
    unicode: "U+1F1E7 U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BM.svg"
  },
  {
    name: "Brunei",
    code: "BN",
    emoji: "\u{1F1E7}\u{1F1F3}",
    unicode: "U+1F1E7 U+1F1F3",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BN.svg"
  },
  {
    name: "Bolivia",
    code: "BO",
    emoji: "\u{1F1E7}\u{1F1F4}",
    unicode: "U+1F1E7 U+1F1F4",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BO.svg"
  },
  {
    name: "Caribbean Netherlands",
    code: "BQ",
    emoji: "\u{1F1E7}\u{1F1F6}",
    unicode: "U+1F1E7 U+1F1F6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BQ.svg"
  },
  {
    name: "Brazil",
    code: "BR",
    emoji: "\u{1F1E7}\u{1F1F7}",
    unicode: "U+1F1E7 U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BR.svg"
  },
  {
    name: "Bahamas",
    code: "BS",
    emoji: "\u{1F1E7}\u{1F1F8}",
    unicode: "U+1F1E7 U+1F1F8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BS.svg"
  },
  {
    name: "Bhutan",
    code: "BT",
    emoji: "\u{1F1E7}\u{1F1F9}",
    unicode: "U+1F1E7 U+1F1F9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BT.svg"
  },
  {
    name: "Bouvet Island",
    code: "BV",
    emoji: "\u{1F1E7}\u{1F1FB}",
    unicode: "U+1F1E7 U+1F1FB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BV.svg"
  },
  {
    name: "Botswana",
    code: "BW",
    emoji: "\u{1F1E7}\u{1F1FC}",
    unicode: "U+1F1E7 U+1F1FC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BW.svg"
  },
  {
    name: "Belarus",
    code: "BY",
    emoji: "\u{1F1E7}\u{1F1FE}",
    unicode: "U+1F1E7 U+1F1FE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BY.svg"
  },
  {
    name: "Belize",
    code: "BZ",
    emoji: "\u{1F1E7}\u{1F1FF}",
    unicode: "U+1F1E7 U+1F1FF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/BZ.svg"
  },
  {
    name: "Canada",
    code: "CA",
    emoji: "\u{1F1E8}\u{1F1E6}",
    unicode: "U+1F1E8 U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CA.svg"
  },
  {
    name: "Cocos (Keeling) Islands",
    code: "CC",
    emoji: "\u{1F1E8}\u{1F1E8}",
    unicode: "U+1F1E8 U+1F1E8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CC.svg"
  },
  {
    name: "Congo - Kinshasa",
    code: "CD",
    emoji: "\u{1F1E8}\u{1F1E9}",
    unicode: "U+1F1E8 U+1F1E9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CD.svg"
  },
  {
    name: "Central African Republic",
    code: "CF",
    emoji: "\u{1F1E8}\u{1F1EB}",
    unicode: "U+1F1E8 U+1F1EB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CF.svg"
  },
  {
    name: "Congo - Brazzaville",
    code: "CG",
    emoji: "\u{1F1E8}\u{1F1EC}",
    unicode: "U+1F1E8 U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CG.svg"
  },
  {
    name: "Switzerland",
    code: "CH",
    emoji: "\u{1F1E8}\u{1F1ED}",
    unicode: "U+1F1E8 U+1F1ED",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CH.svg"
  },
  {
    name: "C\xF4te d\u2019Ivoire",
    code: "CI",
    emoji: "\u{1F1E8}\u{1F1EE}",
    unicode: "U+1F1E8 U+1F1EE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CI.svg"
  },
  {
    name: "Cook Islands",
    code: "CK",
    emoji: "\u{1F1E8}\u{1F1F0}",
    unicode: "U+1F1E8 U+1F1F0",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CK.svg"
  },
  {
    name: "Chile",
    code: "CL",
    emoji: "\u{1F1E8}\u{1F1F1}",
    unicode: "U+1F1E8 U+1F1F1",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CL.svg"
  },
  {
    name: "Cameroon",
    code: "CM",
    emoji: "\u{1F1E8}\u{1F1F2}",
    unicode: "U+1F1E8 U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CM.svg"
  },
  {
    name: "China",
    code: "CN",
    emoji: "\u{1F1E8}\u{1F1F3}",
    unicode: "U+1F1E8 U+1F1F3",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CN.svg"
  },
  {
    name: "Colombia",
    code: "CO",
    emoji: "\u{1F1E8}\u{1F1F4}",
    unicode: "U+1F1E8 U+1F1F4",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CO.svg"
  },
  {
    name: "Clipperton Island",
    code: "CP",
    emoji: "\u{1F1E8}\u{1F1F5}",
    unicode: "U+1F1E8 U+1F1F5",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CP.svg"
  },
  {
    name: "Costa Rica",
    code: "CR",
    emoji: "\u{1F1E8}\u{1F1F7}",
    unicode: "U+1F1E8 U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CR.svg"
  },
  {
    name: "Cuba",
    code: "CU",
    emoji: "\u{1F1E8}\u{1F1FA}",
    unicode: "U+1F1E8 U+1F1FA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CU.svg"
  },
  {
    name: "Cape Verde",
    code: "CV",
    emoji: "\u{1F1E8}\u{1F1FB}",
    unicode: "U+1F1E8 U+1F1FB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CV.svg"
  },
  {
    name: "Cura\xE7ao",
    code: "CW",
    emoji: "\u{1F1E8}\u{1F1FC}",
    unicode: "U+1F1E8 U+1F1FC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CW.svg"
  },
  {
    name: "Christmas Island",
    code: "CX",
    emoji: "\u{1F1E8}\u{1F1FD}",
    unicode: "U+1F1E8 U+1F1FD",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CX.svg"
  },
  {
    name: "Cyprus",
    code: "CY",
    emoji: "\u{1F1E8}\u{1F1FE}",
    unicode: "U+1F1E8 U+1F1FE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CY.svg"
  },
  {
    name: "Czechia",
    code: "CZ",
    emoji: "\u{1F1E8}\u{1F1FF}",
    unicode: "U+1F1E8 U+1F1FF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/CZ.svg"
  },
  {
    name: "Germany",
    code: "DE",
    emoji: "\u{1F1E9}\u{1F1EA}",
    unicode: "U+1F1E9 U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DE.svg"
  },
  {
    name: "Diego Garcia",
    code: "DG",
    emoji: "\u{1F1E9}\u{1F1EC}",
    unicode: "U+1F1E9 U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DG.svg"
  },
  {
    name: "Djibouti",
    code: "DJ",
    emoji: "\u{1F1E9}\u{1F1EF}",
    unicode: "U+1F1E9 U+1F1EF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DJ.svg"
  },
  {
    name: "Denmark",
    code: "DK",
    emoji: "\u{1F1E9}\u{1F1F0}",
    unicode: "U+1F1E9 U+1F1F0",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DK.svg"
  },
  {
    name: "Dominica",
    code: "DM",
    emoji: "\u{1F1E9}\u{1F1F2}",
    unicode: "U+1F1E9 U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DM.svg"
  },
  {
    name: "Dominican Republic",
    code: "DO",
    emoji: "\u{1F1E9}\u{1F1F4}",
    unicode: "U+1F1E9 U+1F1F4",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DO.svg"
  },
  {
    name: "Algeria",
    code: "DZ",
    emoji: "\u{1F1E9}\u{1F1FF}",
    unicode: "U+1F1E9 U+1F1FF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/DZ.svg"
  },
  {
    name: "Ceuta & Melilla",
    code: "EA",
    emoji: "\u{1F1EA}\u{1F1E6}",
    unicode: "U+1F1EA U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EA.svg"
  },
  {
    name: "Ecuador",
    code: "EC",
    emoji: "\u{1F1EA}\u{1F1E8}",
    unicode: "U+1F1EA U+1F1E8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EC.svg"
  },
  {
    name: "Estonia",
    code: "EE",
    emoji: "\u{1F1EA}\u{1F1EA}",
    unicode: "U+1F1EA U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EE.svg"
  },
  {
    name: "Egypt",
    code: "EG",
    emoji: "\u{1F1EA}\u{1F1EC}",
    unicode: "U+1F1EA U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EG.svg"
  },
  {
    name: "Western Sahara",
    code: "EH",
    emoji: "\u{1F1EA}\u{1F1ED}",
    unicode: "U+1F1EA U+1F1ED",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EH.svg"
  },
  {
    name: "Eritrea",
    code: "ER",
    emoji: "\u{1F1EA}\u{1F1F7}",
    unicode: "U+1F1EA U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ER.svg"
  },
  {
    name: "Spain",
    code: "ES",
    emoji: "\u{1F1EA}\u{1F1F8}",
    unicode: "U+1F1EA U+1F1F8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ES.svg"
  },
  {
    name: "Ethiopia",
    code: "ET",
    emoji: "\u{1F1EA}\u{1F1F9}",
    unicode: "U+1F1EA U+1F1F9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ET.svg"
  },
  {
    name: "European Union",
    code: "EU",
    emoji: "\u{1F1EA}\u{1F1FA}",
    unicode: "U+1F1EA U+1F1FA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/EU.svg"
  },
  {
    name: "Finland",
    code: "FI",
    emoji: "\u{1F1EB}\u{1F1EE}",
    unicode: "U+1F1EB U+1F1EE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FI.svg"
  },
  {
    name: "Fiji",
    code: "FJ",
    emoji: "\u{1F1EB}\u{1F1EF}",
    unicode: "U+1F1EB U+1F1EF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FJ.svg"
  },
  {
    name: "Falkland Islands",
    code: "FK",
    emoji: "\u{1F1EB}\u{1F1F0}",
    unicode: "U+1F1EB U+1F1F0",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FK.svg"
  },
  {
    name: "Micronesia",
    code: "FM",
    emoji: "\u{1F1EB}\u{1F1F2}",
    unicode: "U+1F1EB U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FM.svg"
  },
  {
    name: "Faroe Islands",
    code: "FO",
    emoji: "\u{1F1EB}\u{1F1F4}",
    unicode: "U+1F1EB U+1F1F4",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FO.svg"
  },
  {
    name: "France",
    code: "FR",
    emoji: "\u{1F1EB}\u{1F1F7}",
    unicode: "U+1F1EB U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/FR.svg"
  },
  {
    name: "Gabon",
    code: "GA",
    emoji: "\u{1F1EC}\u{1F1E6}",
    unicode: "U+1F1EC U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GA.svg"
  },
  {
    name: "United Kingdom",
    code: "GB",
    emoji: "\u{1F1EC}\u{1F1E7}",
    unicode: "U+1F1EC U+1F1E7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GB.svg"
  },
  {
    name: "Grenada",
    code: "GD",
    emoji: "\u{1F1EC}\u{1F1E9}",
    unicode: "U+1F1EC U+1F1E9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GD.svg"
  },
  {
    name: "Georgia",
    code: "GE",
    emoji: "\u{1F1EC}\u{1F1EA}",
    unicode: "U+1F1EC U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GE.svg"
  },
  {
    name: "French Guiana",
    code: "GF",
    emoji: "\u{1F1EC}\u{1F1EB}",
    unicode: "U+1F1EC U+1F1EB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GF.svg"
  },
  {
    name: "Guernsey",
    code: "GG",
    emoji: "\u{1F1EC}\u{1F1EC}",
    unicode: "U+1F1EC U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GG.svg"
  },
  {
    name: "Ghana",
    code: "GH",
    emoji: "\u{1F1EC}\u{1F1ED}",
    unicode: "U+1F1EC U+1F1ED",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GH.svg"
  },
  {
    name: "Gibraltar",
    code: "GI",
    emoji: "\u{1F1EC}\u{1F1EE}",
    unicode: "U+1F1EC U+1F1EE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GI.svg"
  },
  {
    name: "Greenland",
    code: "GL",
    emoji: "\u{1F1EC}\u{1F1F1}",
    unicode: "U+1F1EC U+1F1F1",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GL.svg"
  },
  {
    name: "Gambia",
    code: "GM",
    emoji: "\u{1F1EC}\u{1F1F2}",
    unicode: "U+1F1EC U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GM.svg"
  },
  {
    name: "Guinea",
    code: "GN",
    emoji: "\u{1F1EC}\u{1F1F3}",
    unicode: "U+1F1EC U+1F1F3",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GN.svg"
  },
  {
    name: "Guadeloupe",
    code: "GP",
    emoji: "\u{1F1EC}\u{1F1F5}",
    unicode: "U+1F1EC U+1F1F5",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GP.svg"
  },
  {
    name: "Equatorial Guinea",
    code: "GQ",
    emoji: "\u{1F1EC}\u{1F1F6}",
    unicode: "U+1F1EC U+1F1F6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GQ.svg"
  },
  {
    name: "Greece",
    code: "GR",
    emoji: "\u{1F1EC}\u{1F1F7}",
    unicode: "U+1F1EC U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GR.svg"
  },
  {
    name: "South Georgia & South Sandwich Islands",
    code: "GS",
    emoji: "\u{1F1EC}\u{1F1F8}",
    unicode: "U+1F1EC U+1F1F8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GS.svg"
  },
  {
    name: "Guatemala",
    code: "GT",
    emoji: "\u{1F1EC}\u{1F1F9}",
    unicode: "U+1F1EC U+1F1F9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GT.svg"
  },
  {
    name: "Guam",
    code: "GU",
    emoji: "\u{1F1EC}\u{1F1FA}",
    unicode: "U+1F1EC U+1F1FA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GU.svg"
  },
  {
    name: "Guinea-Bissau",
    code: "GW",
    emoji: "\u{1F1EC}\u{1F1FC}",
    unicode: "U+1F1EC U+1F1FC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GW.svg"
  },
  {
    name: "Guyana",
    code: "GY",
    emoji: "\u{1F1EC}\u{1F1FE}",
    unicode: "U+1F1EC U+1F1FE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/GY.svg"
  },
  {
    name: "Hong Kong SAR China",
    code: "HK",
    emoji: "\u{1F1ED}\u{1F1F0}",
    unicode: "U+1F1ED U+1F1F0",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HK.svg"
  },
  {
    name: "Heard & McDonald Islands",
    code: "HM",
    emoji: "\u{1F1ED}\u{1F1F2}",
    unicode: "U+1F1ED U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HM.svg"
  },
  {
    name: "Honduras",
    code: "HN",
    emoji: "\u{1F1ED}\u{1F1F3}",
    unicode: "U+1F1ED U+1F1F3",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HN.svg"
  },
  {
    name: "Croatia",
    code: "HR",
    emoji: "\u{1F1ED}\u{1F1F7}",
    unicode: "U+1F1ED U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HR.svg"
  },
  {
    name: "Haiti",
    code: "HT",
    emoji: "\u{1F1ED}\u{1F1F9}",
    unicode: "U+1F1ED U+1F1F9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HT.svg"
  },
  {
    name: "Hungary",
    code: "HU",
    emoji: "\u{1F1ED}\u{1F1FA}",
    unicode: "U+1F1ED U+1F1FA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/HU.svg"
  },
  {
    name: "Canary Islands",
    code: "IC",
    emoji: "\u{1F1EE}\u{1F1E8}",
    unicode: "U+1F1EE U+1F1E8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IC.svg"
  },
  {
    name: "Indonesia",
    code: "ID",
    emoji: "\u{1F1EE}\u{1F1E9}",
    unicode: "U+1F1EE U+1F1E9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ID.svg"
  },
  {
    name: "Ireland",
    code: "IE",
    emoji: "\u{1F1EE}\u{1F1EA}",
    unicode: "U+1F1EE U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IE.svg"
  },
  {
    name: "Israel",
    code: "IL",
    emoji: "\u{1F1EE}\u{1F1F1}",
    unicode: "U+1F1EE U+1F1F1",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IL.svg"
  },
  {
    name: "Isle of Man",
    code: "IM",
    emoji: "\u{1F1EE}\u{1F1F2}",
    unicode: "U+1F1EE U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IM.svg"
  },
  {
    name: "India",
    code: "IN",
    emoji: "\u{1F1EE}\u{1F1F3}",
    unicode: "U+1F1EE U+1F1F3",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IN.svg"
  },
  {
    name: "British Indian Ocean Territory",
    code: "IO",
    emoji: "\u{1F1EE}\u{1F1F4}",
    unicode: "U+1F1EE U+1F1F4",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IO.svg"
  },
  {
    name: "Iraq",
    code: "IQ",
    emoji: "\u{1F1EE}\u{1F1F6}",
    unicode: "U+1F1EE U+1F1F6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IQ.svg"
  },
  {
    name: "Iran",
    code: "IR",
    emoji: "\u{1F1EE}\u{1F1F7}",
    unicode: "U+1F1EE U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IR.svg"
  },
  {
    name: "Iceland",
    code: "IS",
    emoji: "\u{1F1EE}\u{1F1F8}",
    unicode: "U+1F1EE U+1F1F8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IS.svg"
  },
  {
    name: "Italy",
    code: "IT",
    emoji: "\u{1F1EE}\u{1F1F9}",
    unicode: "U+1F1EE U+1F1F9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/IT.svg"
  },
  {
    name: "Jersey",
    code: "JE",
    emoji: "\u{1F1EF}\u{1F1EA}",
    unicode: "U+1F1EF U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JE.svg"
  },
  {
    name: "Jamaica",
    code: "JM",
    emoji: "\u{1F1EF}\u{1F1F2}",
    unicode: "U+1F1EF U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JM.svg"
  },
  {
    name: "Jordan",
    code: "JO",
    emoji: "\u{1F1EF}\u{1F1F4}",
    unicode: "U+1F1EF U+1F1F4",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JO.svg"
  },
  {
    name: "Japan",
    code: "JP",
    emoji: "\u{1F1EF}\u{1F1F5}",
    unicode: "U+1F1EF U+1F1F5",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/JP.svg"
  },
  {
    name: "Kenya",
    code: "KE",
    emoji: "\u{1F1F0}\u{1F1EA}",
    unicode: "U+1F1F0 U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KE.svg"
  },
  {
    name: "Kyrgyzstan",
    code: "KG",
    emoji: "\u{1F1F0}\u{1F1EC}",
    unicode: "U+1F1F0 U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KG.svg"
  },
  {
    name: "Cambodia",
    code: "KH",
    emoji: "\u{1F1F0}\u{1F1ED}",
    unicode: "U+1F1F0 U+1F1ED",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KH.svg"
  },
  {
    name: "Kiribati",
    code: "KI",
    emoji: "\u{1F1F0}\u{1F1EE}",
    unicode: "U+1F1F0 U+1F1EE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KI.svg"
  },
  {
    name: "Comoros",
    code: "KM",
    emoji: "\u{1F1F0}\u{1F1F2}",
    unicode: "U+1F1F0 U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KM.svg"
  },
  {
    name: "St. Kitts & Nevis",
    code: "KN",
    emoji: "\u{1F1F0}\u{1F1F3}",
    unicode: "U+1F1F0 U+1F1F3",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KN.svg"
  },
  {
    name: "North Korea",
    code: "KP",
    emoji: "\u{1F1F0}\u{1F1F5}",
    unicode: "U+1F1F0 U+1F1F5",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KP.svg"
  },
  {
    name: "South Korea",
    code: "KR",
    emoji: "\u{1F1F0}\u{1F1F7}",
    unicode: "U+1F1F0 U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KR.svg"
  },
  {
    name: "Kuwait",
    code: "KW",
    emoji: "\u{1F1F0}\u{1F1FC}",
    unicode: "U+1F1F0 U+1F1FC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KW.svg"
  },
  {
    name: "Cayman Islands",
    code: "KY",
    emoji: "\u{1F1F0}\u{1F1FE}",
    unicode: "U+1F1F0 U+1F1FE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KY.svg"
  },
  {
    name: "Kazakhstan",
    code: "KZ",
    emoji: "\u{1F1F0}\u{1F1FF}",
    unicode: "U+1F1F0 U+1F1FF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/KZ.svg"
  },
  {
    name: "Laos",
    code: "LA",
    emoji: "\u{1F1F1}\u{1F1E6}",
    unicode: "U+1F1F1 U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LA.svg"
  },
  {
    name: "Lebanon",
    code: "LB",
    emoji: "\u{1F1F1}\u{1F1E7}",
    unicode: "U+1F1F1 U+1F1E7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LB.svg"
  },
  {
    name: "St. Lucia",
    code: "LC",
    emoji: "\u{1F1F1}\u{1F1E8}",
    unicode: "U+1F1F1 U+1F1E8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LC.svg"
  },
  {
    name: "Liechtenstein",
    code: "LI",
    emoji: "\u{1F1F1}\u{1F1EE}",
    unicode: "U+1F1F1 U+1F1EE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LI.svg"
  },
  {
    name: "Sri Lanka",
    code: "LK",
    emoji: "\u{1F1F1}\u{1F1F0}",
    unicode: "U+1F1F1 U+1F1F0",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LK.svg"
  },
  {
    name: "Liberia",
    code: "LR",
    emoji: "\u{1F1F1}\u{1F1F7}",
    unicode: "U+1F1F1 U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LR.svg"
  },
  {
    name: "Lesotho",
    code: "LS",
    emoji: "\u{1F1F1}\u{1F1F8}",
    unicode: "U+1F1F1 U+1F1F8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LS.svg"
  },
  {
    name: "Lithuania",
    code: "LT",
    emoji: "\u{1F1F1}\u{1F1F9}",
    unicode: "U+1F1F1 U+1F1F9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LT.svg"
  },
  {
    name: "Luxembourg",
    code: "LU",
    emoji: "\u{1F1F1}\u{1F1FA}",
    unicode: "U+1F1F1 U+1F1FA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LU.svg"
  },
  {
    name: "Latvia",
    code: "LV",
    emoji: "\u{1F1F1}\u{1F1FB}",
    unicode: "U+1F1F1 U+1F1FB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LV.svg"
  },
  {
    name: "Libya",
    code: "LY",
    emoji: "\u{1F1F1}\u{1F1FE}",
    unicode: "U+1F1F1 U+1F1FE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/LY.svg"
  },
  {
    name: "Morocco",
    code: "MA",
    emoji: "\u{1F1F2}\u{1F1E6}",
    unicode: "U+1F1F2 U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MA.svg"
  },
  {
    name: "Monaco",
    code: "MC",
    emoji: "\u{1F1F2}\u{1F1E8}",
    unicode: "U+1F1F2 U+1F1E8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MC.svg"
  },
  {
    name: "Moldova",
    code: "MD",
    emoji: "\u{1F1F2}\u{1F1E9}",
    unicode: "U+1F1F2 U+1F1E9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MD.svg"
  },
  {
    name: "Montenegro",
    code: "ME",
    emoji: "\u{1F1F2}\u{1F1EA}",
    unicode: "U+1F1F2 U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ME.svg"
  },
  {
    name: "St. Martin",
    code: "MF",
    emoji: "\u{1F1F2}\u{1F1EB}",
    unicode: "U+1F1F2 U+1F1EB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MF.svg"
  },
  {
    name: "Madagascar",
    code: "MG",
    emoji: "\u{1F1F2}\u{1F1EC}",
    unicode: "U+1F1F2 U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MG.svg"
  },
  {
    name: "Marshall Islands",
    code: "MH",
    emoji: "\u{1F1F2}\u{1F1ED}",
    unicode: "U+1F1F2 U+1F1ED",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MH.svg"
  },
  {
    name: "North Macedonia",
    code: "MK",
    emoji: "\u{1F1F2}\u{1F1F0}",
    unicode: "U+1F1F2 U+1F1F0",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MK.svg"
  },
  {
    name: "Mali",
    code: "ML",
    emoji: "\u{1F1F2}\u{1F1F1}",
    unicode: "U+1F1F2 U+1F1F1",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ML.svg"
  },
  {
    name: "Myanmar (Burma)",
    code: "MM",
    emoji: "\u{1F1F2}\u{1F1F2}",
    unicode: "U+1F1F2 U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MM.svg"
  },
  {
    name: "Mongolia",
    code: "MN",
    emoji: "\u{1F1F2}\u{1F1F3}",
    unicode: "U+1F1F2 U+1F1F3",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MN.svg"
  },
  {
    name: "Macao SAR China",
    code: "MO",
    emoji: "\u{1F1F2}\u{1F1F4}",
    unicode: "U+1F1F2 U+1F1F4",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MO.svg"
  },
  {
    name: "Northern Mariana Islands",
    code: "MP",
    emoji: "\u{1F1F2}\u{1F1F5}",
    unicode: "U+1F1F2 U+1F1F5",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MP.svg"
  },
  {
    name: "Martinique",
    code: "MQ",
    emoji: "\u{1F1F2}\u{1F1F6}",
    unicode: "U+1F1F2 U+1F1F6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MQ.svg"
  },
  {
    name: "Mauritania",
    code: "MR",
    emoji: "\u{1F1F2}\u{1F1F7}",
    unicode: "U+1F1F2 U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MR.svg"
  },
  {
    name: "Montserrat",
    code: "MS",
    emoji: "\u{1F1F2}\u{1F1F8}",
    unicode: "U+1F1F2 U+1F1F8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MS.svg"
  },
  {
    name: "Malta",
    code: "MT",
    emoji: "\u{1F1F2}\u{1F1F9}",
    unicode: "U+1F1F2 U+1F1F9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MT.svg"
  },
  {
    name: "Mauritius",
    code: "MU",
    emoji: "\u{1F1F2}\u{1F1FA}",
    unicode: "U+1F1F2 U+1F1FA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MU.svg"
  },
  {
    name: "Maldives",
    code: "MV",
    emoji: "\u{1F1F2}\u{1F1FB}",
    unicode: "U+1F1F2 U+1F1FB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MV.svg"
  },
  {
    name: "Malawi",
    code: "MW",
    emoji: "\u{1F1F2}\u{1F1FC}",
    unicode: "U+1F1F2 U+1F1FC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MW.svg"
  },
  {
    name: "Mexico",
    code: "MX",
    emoji: "\u{1F1F2}\u{1F1FD}",
    unicode: "U+1F1F2 U+1F1FD",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MX.svg"
  },
  {
    name: "Malaysia",
    code: "MY",
    emoji: "\u{1F1F2}\u{1F1FE}",
    unicode: "U+1F1F2 U+1F1FE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MY.svg"
  },
  {
    name: "Mozambique",
    code: "MZ",
    emoji: "\u{1F1F2}\u{1F1FF}",
    unicode: "U+1F1F2 U+1F1FF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/MZ.svg"
  },
  {
    name: "Namibia",
    code: "NA",
    emoji: "\u{1F1F3}\u{1F1E6}",
    unicode: "U+1F1F3 U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NA.svg"
  },
  {
    name: "New Caledonia",
    code: "NC",
    emoji: "\u{1F1F3}\u{1F1E8}",
    unicode: "U+1F1F3 U+1F1E8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NC.svg"
  },
  {
    name: "Niger",
    code: "NE",
    emoji: "\u{1F1F3}\u{1F1EA}",
    unicode: "U+1F1F3 U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NE.svg"
  },
  {
    name: "Norfolk Island",
    code: "NF",
    emoji: "\u{1F1F3}\u{1F1EB}",
    unicode: "U+1F1F3 U+1F1EB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NF.svg"
  },
  {
    name: "Nigeria",
    code: "NG",
    emoji: "\u{1F1F3}\u{1F1EC}",
    unicode: "U+1F1F3 U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NG.svg"
  },
  {
    name: "Nicaragua",
    code: "NI",
    emoji: "\u{1F1F3}\u{1F1EE}",
    unicode: "U+1F1F3 U+1F1EE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NI.svg"
  },
  {
    name: "Netherlands",
    code: "NL",
    emoji: "\u{1F1F3}\u{1F1F1}",
    unicode: "U+1F1F3 U+1F1F1",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NL.svg"
  },
  {
    name: "Norway",
    code: "NO",
    emoji: "\u{1F1F3}\u{1F1F4}",
    unicode: "U+1F1F3 U+1F1F4",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NO.svg"
  },
  {
    name: "Nepal",
    code: "NP",
    emoji: "\u{1F1F3}\u{1F1F5}",
    unicode: "U+1F1F3 U+1F1F5",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NP.svg"
  },
  {
    name: "Nauru",
    code: "NR",
    emoji: "\u{1F1F3}\u{1F1F7}",
    unicode: "U+1F1F3 U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NR.svg"
  },
  {
    name: "Niue",
    code: "NU",
    emoji: "\u{1F1F3}\u{1F1FA}",
    unicode: "U+1F1F3 U+1F1FA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NU.svg"
  },
  {
    name: "New Zealand",
    code: "NZ",
    emoji: "\u{1F1F3}\u{1F1FF}",
    unicode: "U+1F1F3 U+1F1FF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/NZ.svg"
  },
  {
    name: "Oman",
    code: "OM",
    emoji: "\u{1F1F4}\u{1F1F2}",
    unicode: "U+1F1F4 U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/OM.svg"
  },
  {
    name: "Panama",
    code: "PA",
    emoji: "\u{1F1F5}\u{1F1E6}",
    unicode: "U+1F1F5 U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PA.svg"
  },
  {
    name: "Peru",
    code: "PE",
    emoji: "\u{1F1F5}\u{1F1EA}",
    unicode: "U+1F1F5 U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PE.svg"
  },
  {
    name: "French Polynesia",
    code: "PF",
    emoji: "\u{1F1F5}\u{1F1EB}",
    unicode: "U+1F1F5 U+1F1EB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PF.svg"
  },
  {
    name: "Papua New Guinea",
    code: "PG",
    emoji: "\u{1F1F5}\u{1F1EC}",
    unicode: "U+1F1F5 U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PG.svg"
  },
  {
    name: "Philippines",
    code: "PH",
    emoji: "\u{1F1F5}\u{1F1ED}",
    unicode: "U+1F1F5 U+1F1ED",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PH.svg"
  },
  {
    name: "Pakistan",
    code: "PK",
    emoji: "\u{1F1F5}\u{1F1F0}",
    unicode: "U+1F1F5 U+1F1F0",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PK.svg"
  },
  {
    name: "Poland",
    code: "PL",
    emoji: "\u{1F1F5}\u{1F1F1}",
    unicode: "U+1F1F5 U+1F1F1",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PL.svg"
  },
  {
    name: "St. Pierre & Miquelon",
    code: "PM",
    emoji: "\u{1F1F5}\u{1F1F2}",
    unicode: "U+1F1F5 U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PM.svg"
  },
  {
    name: "Pitcairn Islands",
    code: "PN",
    emoji: "\u{1F1F5}\u{1F1F3}",
    unicode: "U+1F1F5 U+1F1F3",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PN.svg"
  },
  {
    name: "Puerto Rico",
    code: "PR",
    emoji: "\u{1F1F5}\u{1F1F7}",
    unicode: "U+1F1F5 U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PR.svg"
  },
  {
    name: "Palestinian Territories",
    code: "PS",
    emoji: "\u{1F1F5}\u{1F1F8}",
    unicode: "U+1F1F5 U+1F1F8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PS.svg"
  },
  {
    name: "Portugal",
    code: "PT",
    emoji: "\u{1F1F5}\u{1F1F9}",
    unicode: "U+1F1F5 U+1F1F9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PT.svg"
  },
  {
    name: "Palau",
    code: "PW",
    emoji: "\u{1F1F5}\u{1F1FC}",
    unicode: "U+1F1F5 U+1F1FC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PW.svg"
  },
  {
    name: "Paraguay",
    code: "PY",
    emoji: "\u{1F1F5}\u{1F1FE}",
    unicode: "U+1F1F5 U+1F1FE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/PY.svg"
  },
  {
    name: "Qatar",
    code: "QA",
    emoji: "\u{1F1F6}\u{1F1E6}",
    unicode: "U+1F1F6 U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/QA.svg"
  },
  {
    name: "R\xE9union",
    code: "RE",
    emoji: "\u{1F1F7}\u{1F1EA}",
    unicode: "U+1F1F7 U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RE.svg"
  },
  {
    name: "Romania",
    code: "RO",
    emoji: "\u{1F1F7}\u{1F1F4}",
    unicode: "U+1F1F7 U+1F1F4",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RO.svg"
  },
  {
    name: "Serbia",
    code: "RS",
    emoji: "\u{1F1F7}\u{1F1F8}",
    unicode: "U+1F1F7 U+1F1F8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RS.svg"
  },
  {
    name: "Russia",
    code: "RU",
    emoji: "\u{1F1F7}\u{1F1FA}",
    unicode: "U+1F1F7 U+1F1FA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RU.svg"
  },
  {
    name: "Rwanda",
    code: "RW",
    emoji: "\u{1F1F7}\u{1F1FC}",
    unicode: "U+1F1F7 U+1F1FC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/RW.svg"
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    emoji: "\u{1F1F8}\u{1F1E6}",
    unicode: "U+1F1F8 U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SA.svg"
  },
  {
    name: "Solomon Islands",
    code: "SB",
    emoji: "\u{1F1F8}\u{1F1E7}",
    unicode: "U+1F1F8 U+1F1E7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SB.svg"
  },
  {
    name: "Seychelles",
    code: "SC",
    emoji: "\u{1F1F8}\u{1F1E8}",
    unicode: "U+1F1F8 U+1F1E8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SC.svg"
  },
  {
    name: "Sudan",
    code: "SD",
    emoji: "\u{1F1F8}\u{1F1E9}",
    unicode: "U+1F1F8 U+1F1E9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SD.svg"
  },
  {
    name: "Sweden",
    code: "SE",
    emoji: "\u{1F1F8}\u{1F1EA}",
    unicode: "U+1F1F8 U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SE.svg"
  },
  {
    name: "Singapore",
    code: "SG",
    emoji: "\u{1F1F8}\u{1F1EC}",
    unicode: "U+1F1F8 U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SG.svg"
  },
  {
    name: "St. Helena",
    code: "SH",
    emoji: "\u{1F1F8}\u{1F1ED}",
    unicode: "U+1F1F8 U+1F1ED",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SH.svg"
  },
  {
    name: "Slovenia",
    code: "SI",
    emoji: "\u{1F1F8}\u{1F1EE}",
    unicode: "U+1F1F8 U+1F1EE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SI.svg"
  },
  {
    name: "Svalbard & Jan Mayen",
    code: "SJ",
    emoji: "\u{1F1F8}\u{1F1EF}",
    unicode: "U+1F1F8 U+1F1EF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SJ.svg"
  },
  {
    name: "Slovakia",
    code: "SK",
    emoji: "\u{1F1F8}\u{1F1F0}",
    unicode: "U+1F1F8 U+1F1F0",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SK.svg"
  },
  {
    name: "Sierra Leone",
    code: "SL",
    emoji: "\u{1F1F8}\u{1F1F1}",
    unicode: "U+1F1F8 U+1F1F1",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SL.svg"
  },
  {
    name: "San Marino",
    code: "SM",
    emoji: "\u{1F1F8}\u{1F1F2}",
    unicode: "U+1F1F8 U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SM.svg"
  },
  {
    name: "Senegal",
    code: "SN",
    emoji: "\u{1F1F8}\u{1F1F3}",
    unicode: "U+1F1F8 U+1F1F3",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SN.svg"
  },
  {
    name: "Somalia",
    code: "SO",
    emoji: "\u{1F1F8}\u{1F1F4}",
    unicode: "U+1F1F8 U+1F1F4",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SO.svg"
  },
  {
    name: "Suriname",
    code: "SR",
    emoji: "\u{1F1F8}\u{1F1F7}",
    unicode: "U+1F1F8 U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SR.svg"
  },
  {
    name: "South Sudan",
    code: "SS",
    emoji: "\u{1F1F8}\u{1F1F8}",
    unicode: "U+1F1F8 U+1F1F8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SS.svg"
  },
  {
    name: "S\xE3o Tom\xE9 & Pr\xEDncipe",
    code: "ST",
    emoji: "\u{1F1F8}\u{1F1F9}",
    unicode: "U+1F1F8 U+1F1F9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ST.svg"
  },
  {
    name: "El Salvador",
    code: "SV",
    emoji: "\u{1F1F8}\u{1F1FB}",
    unicode: "U+1F1F8 U+1F1FB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SV.svg"
  },
  {
    name: "Sint Maarten",
    code: "SX",
    emoji: "\u{1F1F8}\u{1F1FD}",
    unicode: "U+1F1F8 U+1F1FD",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SX.svg"
  },
  {
    name: "Syria",
    code: "SY",
    emoji: "\u{1F1F8}\u{1F1FE}",
    unicode: "U+1F1F8 U+1F1FE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SY.svg"
  },
  {
    name: "Eswatini",
    code: "SZ",
    emoji: "\u{1F1F8}\u{1F1FF}",
    unicode: "U+1F1F8 U+1F1FF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SZ.svg"
  },
  {
    name: "Tristan da Cunha",
    code: "TA",
    emoji: "\u{1F1F9}\u{1F1E6}",
    unicode: "U+1F1F9 U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TA.svg"
  },
  {
    name: "Turks & Caicos Islands",
    code: "TC",
    emoji: "\u{1F1F9}\u{1F1E8}",
    unicode: "U+1F1F9 U+1F1E8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TC.svg"
  },
  {
    name: "Chad",
    code: "TD",
    emoji: "\u{1F1F9}\u{1F1E9}",
    unicode: "U+1F1F9 U+1F1E9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TD.svg"
  },
  {
    name: "French Southern Territories",
    code: "TF",
    emoji: "\u{1F1F9}\u{1F1EB}",
    unicode: "U+1F1F9 U+1F1EB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TF.svg"
  },
  {
    name: "Togo",
    code: "TG",
    emoji: "\u{1F1F9}\u{1F1EC}",
    unicode: "U+1F1F9 U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TG.svg"
  },
  {
    name: "Thailand",
    code: "TH",
    emoji: "\u{1F1F9}\u{1F1ED}",
    unicode: "U+1F1F9 U+1F1ED",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TH.svg"
  },
  {
    name: "Tajikistan",
    code: "TJ",
    emoji: "\u{1F1F9}\u{1F1EF}",
    unicode: "U+1F1F9 U+1F1EF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TJ.svg"
  },
  {
    name: "Tokelau",
    code: "TK",
    emoji: "\u{1F1F9}\u{1F1F0}",
    unicode: "U+1F1F9 U+1F1F0",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TK.svg"
  },
  {
    name: "Timor-Leste",
    code: "TL",
    emoji: "\u{1F1F9}\u{1F1F1}",
    unicode: "U+1F1F9 U+1F1F1",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TL.svg"
  },
  {
    name: "Turkmenistan",
    code: "TM",
    emoji: "\u{1F1F9}\u{1F1F2}",
    unicode: "U+1F1F9 U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TM.svg"
  },
  {
    name: "Tunisia",
    code: "TN",
    emoji: "\u{1F1F9}\u{1F1F3}",
    unicode: "U+1F1F9 U+1F1F3",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TN.svg"
  },
  {
    name: "Tonga",
    code: "TO",
    emoji: "\u{1F1F9}\u{1F1F4}",
    unicode: "U+1F1F9 U+1F1F4",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TO.svg"
  },
  {
    name: "Turkey",
    code: "TR",
    emoji: "\u{1F1F9}\u{1F1F7}",
    unicode: "U+1F1F9 U+1F1F7",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TR.svg"
  },
  {
    name: "Trinidad & Tobago",
    code: "TT",
    emoji: "\u{1F1F9}\u{1F1F9}",
    unicode: "U+1F1F9 U+1F1F9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TT.svg"
  },
  {
    name: "Tuvalu",
    code: "TV",
    emoji: "\u{1F1F9}\u{1F1FB}",
    unicode: "U+1F1F9 U+1F1FB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TV.svg"
  },
  {
    name: "Taiwan",
    code: "TW",
    emoji: "\u{1F1F9}\u{1F1FC}",
    unicode: "U+1F1F9 U+1F1FC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TW.svg"
  },
  {
    name: "Tanzania",
    code: "TZ",
    emoji: "\u{1F1F9}\u{1F1FF}",
    unicode: "U+1F1F9 U+1F1FF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/TZ.svg"
  },
  {
    name: "Ukraine",
    code: "UA",
    emoji: "\u{1F1FA}\u{1F1E6}",
    unicode: "U+1F1FA U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UA.svg"
  },
  {
    name: "Uganda",
    code: "UG",
    emoji: "\u{1F1FA}\u{1F1EC}",
    unicode: "U+1F1FA U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UG.svg"
  },
  {
    name: "U.S. Outlying Islands",
    code: "UM",
    emoji: "\u{1F1FA}\u{1F1F2}",
    unicode: "U+1F1FA U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UM.svg"
  },
  {
    name: "United Nations",
    code: "UN",
    emoji: "\u{1F1FA}\u{1F1F3}",
    unicode: "U+1F1FA U+1F1F3",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UN.svg"
  },
  {
    name: "United States",
    code: "US",
    emoji: "\u{1F1FA}\u{1F1F8}",
    unicode: "U+1F1FA U+1F1F8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/US.svg"
  },
  {
    name: "Uruguay",
    code: "UY",
    emoji: "\u{1F1FA}\u{1F1FE}",
    unicode: "U+1F1FA U+1F1FE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UY.svg"
  },
  {
    name: "Uzbekistan",
    code: "UZ",
    emoji: "\u{1F1FA}\u{1F1FF}",
    unicode: "U+1F1FA U+1F1FF",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/UZ.svg"
  },
  {
    name: "Vatican City",
    code: "VA",
    emoji: "\u{1F1FB}\u{1F1E6}",
    unicode: "U+1F1FB U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VA.svg"
  },
  {
    name: "St. Vincent & Grenadines",
    code: "VC",
    emoji: "\u{1F1FB}\u{1F1E8}",
    unicode: "U+1F1FB U+1F1E8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VC.svg"
  },
  {
    name: "Venezuela",
    code: "VE",
    emoji: "\u{1F1FB}\u{1F1EA}",
    unicode: "U+1F1FB U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VE.svg"
  },
  {
    name: "British Virgin Islands",
    code: "VG",
    emoji: "\u{1F1FB}\u{1F1EC}",
    unicode: "U+1F1FB U+1F1EC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VG.svg"
  },
  {
    name: "U.S. Virgin Islands",
    code: "VI",
    emoji: "\u{1F1FB}\u{1F1EE}",
    unicode: "U+1F1FB U+1F1EE",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VI.svg"
  },
  {
    name: "Vietnam",
    code: "VN",
    emoji: "\u{1F1FB}\u{1F1F3}",
    unicode: "U+1F1FB U+1F1F3",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VN.svg"
  },
  {
    name: "Vanuatu",
    code: "VU",
    emoji: "\u{1F1FB}\u{1F1FA}",
    unicode: "U+1F1FB U+1F1FA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/VU.svg"
  },
  {
    name: "Wallis & Futuna",
    code: "WF",
    emoji: "\u{1F1FC}\u{1F1EB}",
    unicode: "U+1F1FC U+1F1EB",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WF.svg"
  },
  {
    name: "Samoa",
    code: "WS",
    emoji: "\u{1F1FC}\u{1F1F8}",
    unicode: "U+1F1FC U+1F1F8",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WS.svg"
  },
  {
    name: "Kosovo",
    code: "XK",
    emoji: "\u{1F1FD}\u{1F1F0}",
    unicode: "U+1F1FD U+1F1F0",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/XK.svg"
  },
  {
    name: "Yemen",
    code: "YE",
    emoji: "\u{1F1FE}\u{1F1EA}",
    unicode: "U+1F1FE U+1F1EA",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YE.svg"
  },
  {
    name: "Mayotte",
    code: "YT",
    emoji: "\u{1F1FE}\u{1F1F9}",
    unicode: "U+1F1FE U+1F1F9",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/YT.svg"
  },
  {
    name: "South Africa",
    code: "ZA",
    emoji: "\u{1F1FF}\u{1F1E6}",
    unicode: "U+1F1FF U+1F1E6",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZA.svg"
  },
  {
    name: "Zambia",
    code: "ZM",
    emoji: "\u{1F1FF}\u{1F1F2}",
    unicode: "U+1F1FF U+1F1F2",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZM.svg"
  },
  {
    name: "Zimbabwe",
    code: "ZW",
    emoji: "\u{1F1FF}\u{1F1FC}",
    unicode: "U+1F1FF U+1F1FC",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ZW.svg"
  },
  {
    name: "England",
    code: "ENGLAND",
    emoji: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}",
    unicode: "U+1F3F4 U+E0067 U+E0062 U+E0065 U+E006E U+E0067 U+E007F",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/ENGLAND.svg"
  },
  {
    name: "Scotland",
    code: "SCOTLAND",
    emoji: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}",
    unicode: "U+1F3F4 U+E0067 U+E0062 U+E0073 U+E0063 U+E0074 U+E007F",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/SCOTLAND.svg"
  },
  {
    name: "Wales",
    code: "WALES",
    emoji: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0077}\u{E006C}\u{E0073}\u{E007F}",
    unicode: "U+1F3F4 U+E0067 U+E0062 U+E0077 U+E006C U+E0073 U+E007F",
    image: "https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/images/WALES.svg"
  }
];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AddShippingInfo",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ["onClose"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const cart = useCartStore();
    const scheme = Yup.object().shape({
      full_name: Yup.string().required("This field is required").min(3, "Please enter the correct name"),
      email: Yup.string().email().required("This field is required"),
      phone: Yup.string().required("This field is required").matches(/^[0-9]+$/, "Please enter the correct phone number."),
      country: Yup.string().required("This field is required"),
      state: Yup.string().required("This field is required"),
      city: Yup.string().required("This field is required"),
      address_1: Yup.string().required("This field is required.").test(
        "len",
        "Address must contain between 10 - 300 characters",
        (val) => {
          if (val === void 0) {
            return true;
          }
          return val.length === 0 || val.length >= 10 && val.length <= 300;
        }
      ),
      postal_code: Yup.string().matches(/^\S*$/, "Whitespace is not allowed").required("This field is required")
    });
    const { handleSubmit } = useForm({
      validationSchema: scheme
    });
    const { value: full_name, errorMessage: fullNameError } = useField("full_name");
    const { value: email, errorMessage: emailError } = useField("email");
    const { value: phone, errorMessage: phoneError } = useField("phone");
    const { value: address_1, errorMessage: address1Error } = useField("address_1");
    const { value: address_2 } = useField("address_2");
    const { value: state, errorMessage: stateError } = useField("state");
    const { value: city, errorMessage: cityError } = useField("city");
    const { value: country, errorMessage: countryError } = useField("country");
    const { value: postal_code, errorMessage: PostalCodeError } = useField("postal_code");
    const onSubmit = handleSubmit(async (value) => {
      cart.addShippingInfo(value);
      onClose();
    });
    function onClose() {
      emit("onClose");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeadlessTransitionRoot = Se;
      const _component_HeadlessDialog = Ye;
      const _component_HeadlessTransitionChild = he;
      const _component_HeadlessDialogPanel = Ge;
      _push(ssrRenderComponent(_component_HeadlessTransitionRoot, mergeProps({
        appear: "",
        show: props.isOpen,
        as: "template"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_HeadlessDialog, {
              as: "div",
              onClose,
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
                              _push5(`<div class="relative w-full items-center py-10"${_scopeId4}><form${_scopeId4}><div class="relative w-full space-y-1 mt-2"${_scopeId4}><label for="full_name" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Full Name *</label><input type="text" name="full_name"${ssrRenderAttr("value", unref(full_name))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="Full Name"${_scopeId4}>`);
                              if (unref(fullNameError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(fullNameError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative w-full space-y-1 mt-2"${_scopeId4}><label for="email" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Email *</label><input type="email" name="email"${ssrRenderAttr("value", unref(email))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="Email"${_scopeId4}>`);
                              if (unref(emailError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(emailError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative w-full space-y-1 mt-2"${_scopeId4}><label for="phone" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Phone *</label><input type="text" name="phone"${ssrRenderAttr("value", unref(phone))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="Phone and Country Code"${_scopeId4}>`);
                              if (unref(phoneError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(phoneError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative w-full space-y-1 mt-2"${_scopeId4}><label for="address_1" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Address Line 1 *</label><textarea${ssrRenderAttr("rows", 1)} name="address_1" class="inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="Address Line 1"${_scopeId4}>${ssrInterpolate(unref(address_1))}</textarea>`);
                              if (unref(address1Error)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(address1Error))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative w-full space-y-1 mt-2"${_scopeId4}><label for="address_2" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Address Line 2 <i class="font-normal"${_scopeId4}>(option)</i></label><textarea${ssrRenderAttr("rows", 1)} name="address_2" class="inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="Address Line 2 (option)"${_scopeId4}>${ssrInterpolate(unref(address_2))}</textarea></div><div class="grid grid-cols-2 gap-2"${_scopeId4}><div class="relative space-y-1 mt-2"${_scopeId4}><label for="country" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Country *</label><select name="country" class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm placeholder:text-gray-900 dark:placeholder:text-gray-50" required${_scopeId4}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(country)) ? ssrLooseContain(unref(country), "") : ssrLooseEqual(unref(country), "")) ? " selected" : ""}${_scopeId4}>- Select Country -</option><!--[-->`);
                              ssrRenderList(unref(countryFlag), (item) => {
                                _push5(`<option${ssrRenderAttr("value", item.code)}${_scopeId4}>${ssrInterpolate(item.name)}</option>`);
                              });
                              _push5(`<!--]--></select>`);
                              if (unref(countryError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(countryError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative space-y-1 mt-2"${_scopeId4}><label for="state" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>State *</label><input type="text" name="state"${ssrRenderAttr("value", unref(state))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="State"${_scopeId4}>`);
                              if (unref(stateError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(stateError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div></div><div class="grid grid-cols-2 gap-2"${_scopeId4}><div class="relative space-y-1 mt-2"${_scopeId4}><label for="city" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>City *</label><input type="text" name="city"${ssrRenderAttr("value", unref(city))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="City"${_scopeId4}>`);
                              if (unref(cityError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(cityError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative space-y-1 mt-2"${_scopeId4}><label for="postal_code" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Postal Code *</label><input type="text" name="postal_code"${ssrRenderAttr("value", unref(postal_code))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="Postal Code"${_scopeId4}>`);
                              if (unref(PostalCodeError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(PostalCodeError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div></div><div class="flex items-center justify-center gap-2 mt-5"${_scopeId4}><button type="submit" class="inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"${_scopeId4}> Submit </button><button type="button" class="inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md"${_scopeId4}> Close </button></div></form></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "relative w-full items-center py-10" }, [
                                  createVNode("form", {
                                    onSubmit: withModifiers(unref(onSubmit), ["prevent"])
                                  }, [
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "full_name",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Full Name *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "full_name",
                                        "onUpdate:modelValue": ($event) => isRef(full_name) ? full_name.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Full Name"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(full_name)]
                                      ]),
                                      unref(fullNameError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(fullNameError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "email",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Email *"),
                                      withDirectives(createVNode("input", {
                                        type: "email",
                                        name: "email",
                                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Email"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(email)]
                                      ]),
                                      unref(emailError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(emailError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "phone",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Phone *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "phone",
                                        "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Phone and Country Code"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(phone)]
                                      ]),
                                      unref(phoneError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(phoneError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "address_1",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Address Line 1 *"),
                                      withDirectives(createVNode("textarea", {
                                        rows: 1,
                                        name: "address_1",
                                        "onUpdate:modelValue": ($event) => isRef(address_1) ? address_1.value = $event : null,
                                        class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Address Line 1"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(address_1)]
                                      ]),
                                      unref(address1Error) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(address1Error)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "address_2",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, [
                                        createTextVNode("Address Line 2 "),
                                        createVNode("i", { class: "font-normal" }, "(option)")
                                      ]),
                                      withDirectives(createVNode("textarea", {
                                        rows: 1,
                                        name: "address_2",
                                        "onUpdate:modelValue": ($event) => isRef(address_2) ? address_2.value = $event : null,
                                        class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Address Line 2 (option)"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(address_2)]
                                      ])
                                    ]),
                                    createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "country",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "Country *"),
                                        withDirectives(createVNode("select", {
                                          name: "country",
                                          "onUpdate:modelValue": ($event) => isRef(country) ? country.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm placeholder:text-gray-900 dark:placeholder:text-gray-50",
                                          required: ""
                                        }, [
                                          createVNode("option", {
                                            value: "",
                                            disabled: ""
                                          }, "- Select Country -"),
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(countryFlag), (item) => {
                                            return openBlock(), createBlock("option", {
                                              key: item.code,
                                              value: item.code
                                            }, toDisplayString(item.name), 9, ["value"]);
                                          }), 128))
                                        ], 8, ["onUpdate:modelValue"]), [
                                          [vModelSelect, unref(country)]
                                        ]),
                                        unref(countryError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(countryError)), 1)) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "state",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "State *"),
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          name: "state",
                                          "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                          placeholder: "State"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(state)]
                                        ]),
                                        unref(stateError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(stateError)), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "city",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "City *"),
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          name: "city",
                                          "onUpdate:modelValue": ($event) => isRef(city) ? city.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                          placeholder: "City"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(city)]
                                        ]),
                                        unref(cityError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(cityError)), 1)) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "postal_code",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "Postal Code *"),
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          name: "postal_code",
                                          "onUpdate:modelValue": ($event) => isRef(postal_code) ? postal_code.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                          placeholder: "Postal Code"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(postal_code)]
                                        ]),
                                        unref(PostalCodeError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(PostalCodeError)), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-center gap-2 mt-5" }, [
                                      createVNode("button", {
                                        type: "submit",
                                        class: "inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"
                                      }, " Submit "),
                                      createVNode("button", {
                                        type: "button",
                                        class: "inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md",
                                        onClick: onClose
                                      }, " Close ")
                                    ])
                                  ], 40, ["onSubmit"])
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
                              createVNode("div", { class: "relative w-full items-center py-10" }, [
                                createVNode("form", {
                                  onSubmit: withModifiers(unref(onSubmit), ["prevent"])
                                }, [
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "full_name",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Full Name *"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      name: "full_name",
                                      "onUpdate:modelValue": ($event) => isRef(full_name) ? full_name.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Full Name"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(full_name)]
                                    ]),
                                    unref(fullNameError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(fullNameError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "email",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Email *"),
                                    withDirectives(createVNode("input", {
                                      type: "email",
                                      name: "email",
                                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Email"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(email)]
                                    ]),
                                    unref(emailError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(emailError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "phone",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Phone *"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      name: "phone",
                                      "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Phone and Country Code"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(phone)]
                                    ]),
                                    unref(phoneError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(phoneError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "address_1",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Address Line 1 *"),
                                    withDirectives(createVNode("textarea", {
                                      rows: 1,
                                      name: "address_1",
                                      "onUpdate:modelValue": ($event) => isRef(address_1) ? address_1.value = $event : null,
                                      class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Address Line 1"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(address_1)]
                                    ]),
                                    unref(address1Error) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(address1Error)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "address_2",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, [
                                      createTextVNode("Address Line 2 "),
                                      createVNode("i", { class: "font-normal" }, "(option)")
                                    ]),
                                    withDirectives(createVNode("textarea", {
                                      rows: 1,
                                      name: "address_2",
                                      "onUpdate:modelValue": ($event) => isRef(address_2) ? address_2.value = $event : null,
                                      class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Address Line 2 (option)"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(address_2)]
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "country",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Country *"),
                                      withDirectives(createVNode("select", {
                                        name: "country",
                                        "onUpdate:modelValue": ($event) => isRef(country) ? country.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm placeholder:text-gray-900 dark:placeholder:text-gray-50",
                                        required: ""
                                      }, [
                                        createVNode("option", {
                                          value: "",
                                          disabled: ""
                                        }, "- Select Country -"),
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(countryFlag), (item) => {
                                          return openBlock(), createBlock("option", {
                                            key: item.code,
                                            value: item.code
                                          }, toDisplayString(item.name), 9, ["value"]);
                                        }), 128))
                                      ], 8, ["onUpdate:modelValue"]), [
                                        [vModelSelect, unref(country)]
                                      ]),
                                      unref(countryError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(countryError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "state",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "State *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "state",
                                        "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "State"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(state)]
                                      ]),
                                      unref(stateError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(stateError)), 1)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "city",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "City *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "city",
                                        "onUpdate:modelValue": ($event) => isRef(city) ? city.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "City"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(city)]
                                      ]),
                                      unref(cityError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(cityError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "postal_code",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Postal Code *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "postal_code",
                                        "onUpdate:modelValue": ($event) => isRef(postal_code) ? postal_code.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Postal Code"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(postal_code)]
                                      ]),
                                      unref(PostalCodeError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(PostalCodeError)), 1)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex items-center justify-center gap-2 mt-5" }, [
                                    createVNode("button", {
                                      type: "submit",
                                      class: "inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"
                                    }, " Submit "),
                                    createVNode("button", {
                                      type: "button",
                                      class: "inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md",
                                      onClick: onClose
                                    }, " Close ")
                                  ])
                                ], 40, ["onSubmit"])
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
                                createVNode("div", { class: "relative w-full items-center py-10" }, [
                                  createVNode("form", {
                                    onSubmit: withModifiers(unref(onSubmit), ["prevent"])
                                  }, [
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "full_name",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Full Name *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "full_name",
                                        "onUpdate:modelValue": ($event) => isRef(full_name) ? full_name.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Full Name"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(full_name)]
                                      ]),
                                      unref(fullNameError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(fullNameError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "email",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Email *"),
                                      withDirectives(createVNode("input", {
                                        type: "email",
                                        name: "email",
                                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Email"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(email)]
                                      ]),
                                      unref(emailError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(emailError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "phone",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Phone *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "phone",
                                        "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Phone and Country Code"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(phone)]
                                      ]),
                                      unref(phoneError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(phoneError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "address_1",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Address Line 1 *"),
                                      withDirectives(createVNode("textarea", {
                                        rows: 1,
                                        name: "address_1",
                                        "onUpdate:modelValue": ($event) => isRef(address_1) ? address_1.value = $event : null,
                                        class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Address Line 1"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(address_1)]
                                      ]),
                                      unref(address1Error) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(address1Error)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "address_2",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, [
                                        createTextVNode("Address Line 2 "),
                                        createVNode("i", { class: "font-normal" }, "(option)")
                                      ]),
                                      withDirectives(createVNode("textarea", {
                                        rows: 1,
                                        name: "address_2",
                                        "onUpdate:modelValue": ($event) => isRef(address_2) ? address_2.value = $event : null,
                                        class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Address Line 2 (option)"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(address_2)]
                                      ])
                                    ]),
                                    createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "country",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "Country *"),
                                        withDirectives(createVNode("select", {
                                          name: "country",
                                          "onUpdate:modelValue": ($event) => isRef(country) ? country.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm placeholder:text-gray-900 dark:placeholder:text-gray-50",
                                          required: ""
                                        }, [
                                          createVNode("option", {
                                            value: "",
                                            disabled: ""
                                          }, "- Select Country -"),
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(countryFlag), (item) => {
                                            return openBlock(), createBlock("option", {
                                              key: item.code,
                                              value: item.code
                                            }, toDisplayString(item.name), 9, ["value"]);
                                          }), 128))
                                        ], 8, ["onUpdate:modelValue"]), [
                                          [vModelSelect, unref(country)]
                                        ]),
                                        unref(countryError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(countryError)), 1)) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "state",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "State *"),
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          name: "state",
                                          "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                          placeholder: "State"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(state)]
                                        ]),
                                        unref(stateError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(stateError)), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "city",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "City *"),
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          name: "city",
                                          "onUpdate:modelValue": ($event) => isRef(city) ? city.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                          placeholder: "City"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(city)]
                                        ]),
                                        unref(cityError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(cityError)), 1)) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "postal_code",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "Postal Code *"),
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          name: "postal_code",
                                          "onUpdate:modelValue": ($event) => isRef(postal_code) ? postal_code.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                          placeholder: "Postal Code"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(postal_code)]
                                        ]),
                                        unref(PostalCodeError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(PostalCodeError)), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-center gap-2 mt-5" }, [
                                      createVNode("button", {
                                        type: "submit",
                                        class: "inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"
                                      }, " Submit "),
                                      createVNode("button", {
                                        type: "button",
                                        class: "inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md",
                                        onClick: onClose
                                      }, " Close ")
                                    ])
                                  ], 40, ["onSubmit"])
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
                onClose,
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
                              createVNode("div", { class: "relative w-full items-center py-10" }, [
                                createVNode("form", {
                                  onSubmit: withModifiers(unref(onSubmit), ["prevent"])
                                }, [
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "full_name",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Full Name *"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      name: "full_name",
                                      "onUpdate:modelValue": ($event) => isRef(full_name) ? full_name.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Full Name"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(full_name)]
                                    ]),
                                    unref(fullNameError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(fullNameError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "email",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Email *"),
                                    withDirectives(createVNode("input", {
                                      type: "email",
                                      name: "email",
                                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Email"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(email)]
                                    ]),
                                    unref(emailError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(emailError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "phone",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Phone *"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      name: "phone",
                                      "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Phone and Country Code"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(phone)]
                                    ]),
                                    unref(phoneError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(phoneError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "address_1",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Address Line 1 *"),
                                    withDirectives(createVNode("textarea", {
                                      rows: 1,
                                      name: "address_1",
                                      "onUpdate:modelValue": ($event) => isRef(address_1) ? address_1.value = $event : null,
                                      class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Address Line 1"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(address_1)]
                                    ]),
                                    unref(address1Error) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(address1Error)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "address_2",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, [
                                      createTextVNode("Address Line 2 "),
                                      createVNode("i", { class: "font-normal" }, "(option)")
                                    ]),
                                    withDirectives(createVNode("textarea", {
                                      rows: 1,
                                      name: "address_2",
                                      "onUpdate:modelValue": ($event) => isRef(address_2) ? address_2.value = $event : null,
                                      class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Address Line 2 (option)"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(address_2)]
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "country",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Country *"),
                                      withDirectives(createVNode("select", {
                                        name: "country",
                                        "onUpdate:modelValue": ($event) => isRef(country) ? country.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm placeholder:text-gray-900 dark:placeholder:text-gray-50",
                                        required: ""
                                      }, [
                                        createVNode("option", {
                                          value: "",
                                          disabled: ""
                                        }, "- Select Country -"),
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(countryFlag), (item) => {
                                          return openBlock(), createBlock("option", {
                                            key: item.code,
                                            value: item.code
                                          }, toDisplayString(item.name), 9, ["value"]);
                                        }), 128))
                                      ], 8, ["onUpdate:modelValue"]), [
                                        [vModelSelect, unref(country)]
                                      ]),
                                      unref(countryError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(countryError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "state",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "State *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "state",
                                        "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "State"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(state)]
                                      ]),
                                      unref(stateError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(stateError)), 1)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "city",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "City *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "city",
                                        "onUpdate:modelValue": ($event) => isRef(city) ? city.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "City"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(city)]
                                      ]),
                                      unref(cityError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(cityError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "postal_code",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Postal Code *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "postal_code",
                                        "onUpdate:modelValue": ($event) => isRef(postal_code) ? postal_code.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Postal Code"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(postal_code)]
                                      ]),
                                      unref(PostalCodeError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(PostalCodeError)), 1)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex items-center justify-center gap-2 mt-5" }, [
                                    createVNode("button", {
                                      type: "submit",
                                      class: "inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"
                                    }, " Submit "),
                                    createVNode("button", {
                                      type: "button",
                                      class: "inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md",
                                      onClick: onClose
                                    }, " Close ")
                                  ])
                                ], 40, ["onSubmit"])
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AddShippingInfo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "EditShippingInfo",
  __ssrInlineRender: true,
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  emits: ["onClose"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const props = __props;
    const cart = useCartStore();
    const scheme = Yup.object().shape({
      full_name: Yup.string().required("This field is required").min(3, "Please enter the correct name"),
      email: Yup.string().email().required("This field is required"),
      phone: Yup.string().required("This field is required").matches(/^[0-9]+$/, "Please enter the correct phone number."),
      country: Yup.string().required("This field is required"),
      state: Yup.string().required("This field is required"),
      city: Yup.string().required("This field is required"),
      address_1: Yup.string().required("This field is required.").test(
        "len",
        "Address must contain between 10 - 300 characters",
        (val) => {
          if (val === void 0) {
            return true;
          }
          return val.length === 0 || val.length >= 10 && val.length <= 300;
        }
      ),
      postal_code: Yup.string().matches(/^\S*$/, "Whitespace is not allowed").required("This field is required")
    });
    const shippingData = {
      full_name: props.data.full_name,
      email: props.data.email,
      phone: props.data.phone,
      address_1: props.data.address_1,
      address_2: props.data.address_2,
      state: props.data.state,
      city: props.data.city,
      country: props.data.country,
      postal_code: props.data.postal_code
    };
    const { handleSubmit } = useForm({
      validationSchema: scheme,
      initialValues: shippingData
    });
    const { value: full_name, errorMessage: fullNameError } = useField("full_name");
    const { value: email, errorMessage: emailError } = useField("email");
    const { value: phone, errorMessage: phoneError } = useField("phone");
    const { value: address_1, errorMessage: address1Error } = useField("address_1");
    const { value: address_2 } = useField("address_2");
    const { value: state, errorMessage: stateError } = useField("state");
    const { value: city, errorMessage: cityError } = useField("city");
    const { value: country, errorMessage: countryError } = useField("country");
    const { value: postal_code, errorMessage: PostalCodeError } = useField("postal_code");
    const onSubmit = handleSubmit(async (value) => {
      cart.editShippingInfo(props.data.id, value);
      onClose();
    });
    function onClose() {
      emit("onClose");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_HeadlessTransitionRoot = Se;
      const _component_HeadlessDialog = Ye;
      const _component_HeadlessTransitionChild = he;
      const _component_HeadlessDialogPanel = Ge;
      _push(ssrRenderComponent(_component_HeadlessTransitionRoot, mergeProps({
        appear: "",
        show: props.isOpen,
        as: "template"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_HeadlessDialog, {
              as: "div",
              onClose,
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
                              _push5(`<div class="relative w-full items-center py-10"${_scopeId4}><form${_scopeId4}><div class="relative w-full space-y-1 mt-2"${_scopeId4}><label for="full_name" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Full Name *</label><input type="text" name="full_name"${ssrRenderAttr("value", unref(full_name))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="Full Name"${_scopeId4}>`);
                              if (unref(fullNameError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(fullNameError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative w-full space-y-1 mt-2"${_scopeId4}><label for="email" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Email *</label><input type="email" name="email"${ssrRenderAttr("value", unref(email))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="Email"${_scopeId4}>`);
                              if (unref(emailError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(emailError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative w-full space-y-1 mt-2"${_scopeId4}><label for="phone" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Phone *</label><input type="text" name="phone"${ssrRenderAttr("value", unref(phone))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="Phone and Country Code"${_scopeId4}>`);
                              if (unref(phoneError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(phoneError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative w-full space-y-1 mt-2"${_scopeId4}><label for="address_1" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Address Line 1 *</label><textarea${ssrRenderAttr("rows", 1)} name="address_1" class="inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="Address Line 1"${_scopeId4}>${ssrInterpolate(unref(address_1))}</textarea>`);
                              if (unref(address1Error)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(address1Error))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative w-full space-y-1 mt-2"${_scopeId4}><label for="address_2" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Address Line 2 <i class="font-normal"${_scopeId4}>(option)</i></label><textarea${ssrRenderAttr("rows", 1)} name="address_2" class="inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="Address Line 2 (option)"${_scopeId4}>${ssrInterpolate(unref(address_2))}</textarea></div><div class="grid grid-cols-2 gap-2"${_scopeId4}><div class="relative space-y-1 mt-2"${_scopeId4}><label for="country" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Country *</label><select name="country" class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm placeholder:text-gray-900 dark:placeholder:text-gray-50" required${_scopeId4}><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(unref(country)) ? ssrLooseContain(unref(country), "") : ssrLooseEqual(unref(country), "")) ? " selected" : ""}${_scopeId4}>- Select Country -</option><!--[-->`);
                              ssrRenderList(unref(countryFlag), (item) => {
                                _push5(`<option${ssrRenderAttr("value", item.code)}${_scopeId4}>${ssrInterpolate(item.name)}</option>`);
                              });
                              _push5(`<!--]--></select>`);
                              if (unref(countryError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(countryError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative space-y-1 mt-2"${_scopeId4}><label for="state" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>State *</label><input type="text" name="state"${ssrRenderAttr("value", unref(state))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="State"${_scopeId4}>`);
                              if (unref(stateError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(stateError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div></div><div class="grid grid-cols-2 gap-2"${_scopeId4}><div class="relative space-y-1 mt-2"${_scopeId4}><label for="city" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>City *</label><input type="text" name="city"${ssrRenderAttr("value", unref(city))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="City"${_scopeId4}>`);
                              if (unref(cityError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(cityError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div><div class="relative space-y-1 mt-2"${_scopeId4}><label for="postal_code" class="text-sm text-gray-900 dark:text-gray-50 font-semibold"${_scopeId4}>Postal Code *</label><input type="text" name="postal_code"${ssrRenderAttr("value", unref(postal_code))} class="inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm" placeholder="Postal Code"${_scopeId4}>`);
                              if (unref(PostalCodeError)) {
                                _push5(`<div class="text-xs text-red-500 italic mt-1 font-semibold"${_scopeId4}>${ssrInterpolate(unref(PostalCodeError))}</div>`);
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(`</div></div><div class="flex items-center justify-center gap-2 mt-5"${_scopeId4}><button type="submit" class="inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"${_scopeId4}> Submit </button><button type="button" class="inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md"${_scopeId4}> Close </button></div></form></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "relative w-full items-center py-10" }, [
                                  createVNode("form", {
                                    onSubmit: withModifiers(unref(onSubmit), ["prevent"])
                                  }, [
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "full_name",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Full Name *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "full_name",
                                        "onUpdate:modelValue": ($event) => isRef(full_name) ? full_name.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Full Name"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(full_name)]
                                      ]),
                                      unref(fullNameError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(fullNameError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "email",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Email *"),
                                      withDirectives(createVNode("input", {
                                        type: "email",
                                        name: "email",
                                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Email"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(email)]
                                      ]),
                                      unref(emailError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(emailError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "phone",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Phone *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "phone",
                                        "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Phone and Country Code"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(phone)]
                                      ]),
                                      unref(phoneError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(phoneError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "address_1",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Address Line 1 *"),
                                      withDirectives(createVNode("textarea", {
                                        rows: 1,
                                        name: "address_1",
                                        "onUpdate:modelValue": ($event) => isRef(address_1) ? address_1.value = $event : null,
                                        class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Address Line 1"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(address_1)]
                                      ]),
                                      unref(address1Error) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(address1Error)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "address_2",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, [
                                        createTextVNode("Address Line 2 "),
                                        createVNode("i", { class: "font-normal" }, "(option)")
                                      ]),
                                      withDirectives(createVNode("textarea", {
                                        rows: 1,
                                        name: "address_2",
                                        "onUpdate:modelValue": ($event) => isRef(address_2) ? address_2.value = $event : null,
                                        class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Address Line 2 (option)"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(address_2)]
                                      ])
                                    ]),
                                    createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "country",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "Country *"),
                                        withDirectives(createVNode("select", {
                                          name: "country",
                                          "onUpdate:modelValue": ($event) => isRef(country) ? country.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm placeholder:text-gray-900 dark:placeholder:text-gray-50",
                                          required: ""
                                        }, [
                                          createVNode("option", {
                                            value: "",
                                            disabled: ""
                                          }, "- Select Country -"),
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(countryFlag), (item) => {
                                            return openBlock(), createBlock("option", {
                                              key: item.code,
                                              value: item.code
                                            }, toDisplayString(item.name), 9, ["value"]);
                                          }), 128))
                                        ], 8, ["onUpdate:modelValue"]), [
                                          [vModelSelect, unref(country)]
                                        ]),
                                        unref(countryError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(countryError)), 1)) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "state",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "State *"),
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          name: "state",
                                          "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                          placeholder: "State"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(state)]
                                        ]),
                                        unref(stateError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(stateError)), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "city",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "City *"),
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          name: "city",
                                          "onUpdate:modelValue": ($event) => isRef(city) ? city.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                          placeholder: "City"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(city)]
                                        ]),
                                        unref(cityError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(cityError)), 1)) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "postal_code",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "Postal Code *"),
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          name: "postal_code",
                                          "onUpdate:modelValue": ($event) => isRef(postal_code) ? postal_code.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                          placeholder: "Postal Code"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(postal_code)]
                                        ]),
                                        unref(PostalCodeError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(PostalCodeError)), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-center gap-2 mt-5" }, [
                                      createVNode("button", {
                                        type: "submit",
                                        class: "inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"
                                      }, " Submit "),
                                      createVNode("button", {
                                        type: "button",
                                        class: "inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md",
                                        onClick: onClose
                                      }, " Close ")
                                    ])
                                  ], 40, ["onSubmit"])
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
                              createVNode("div", { class: "relative w-full items-center py-10" }, [
                                createVNode("form", {
                                  onSubmit: withModifiers(unref(onSubmit), ["prevent"])
                                }, [
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "full_name",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Full Name *"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      name: "full_name",
                                      "onUpdate:modelValue": ($event) => isRef(full_name) ? full_name.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Full Name"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(full_name)]
                                    ]),
                                    unref(fullNameError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(fullNameError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "email",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Email *"),
                                    withDirectives(createVNode("input", {
                                      type: "email",
                                      name: "email",
                                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Email"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(email)]
                                    ]),
                                    unref(emailError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(emailError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "phone",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Phone *"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      name: "phone",
                                      "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Phone and Country Code"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(phone)]
                                    ]),
                                    unref(phoneError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(phoneError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "address_1",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Address Line 1 *"),
                                    withDirectives(createVNode("textarea", {
                                      rows: 1,
                                      name: "address_1",
                                      "onUpdate:modelValue": ($event) => isRef(address_1) ? address_1.value = $event : null,
                                      class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Address Line 1"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(address_1)]
                                    ]),
                                    unref(address1Error) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(address1Error)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "address_2",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, [
                                      createTextVNode("Address Line 2 "),
                                      createVNode("i", { class: "font-normal" }, "(option)")
                                    ]),
                                    withDirectives(createVNode("textarea", {
                                      rows: 1,
                                      name: "address_2",
                                      "onUpdate:modelValue": ($event) => isRef(address_2) ? address_2.value = $event : null,
                                      class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Address Line 2 (option)"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(address_2)]
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "country",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Country *"),
                                      withDirectives(createVNode("select", {
                                        name: "country",
                                        "onUpdate:modelValue": ($event) => isRef(country) ? country.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm placeholder:text-gray-900 dark:placeholder:text-gray-50",
                                        required: ""
                                      }, [
                                        createVNode("option", {
                                          value: "",
                                          disabled: ""
                                        }, "- Select Country -"),
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(countryFlag), (item) => {
                                          return openBlock(), createBlock("option", {
                                            key: item.code,
                                            value: item.code
                                          }, toDisplayString(item.name), 9, ["value"]);
                                        }), 128))
                                      ], 8, ["onUpdate:modelValue"]), [
                                        [vModelSelect, unref(country)]
                                      ]),
                                      unref(countryError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(countryError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "state",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "State *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "state",
                                        "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "State"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(state)]
                                      ]),
                                      unref(stateError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(stateError)), 1)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "city",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "City *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "city",
                                        "onUpdate:modelValue": ($event) => isRef(city) ? city.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "City"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(city)]
                                      ]),
                                      unref(cityError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(cityError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "postal_code",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Postal Code *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "postal_code",
                                        "onUpdate:modelValue": ($event) => isRef(postal_code) ? postal_code.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Postal Code"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(postal_code)]
                                      ]),
                                      unref(PostalCodeError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(PostalCodeError)), 1)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex items-center justify-center gap-2 mt-5" }, [
                                    createVNode("button", {
                                      type: "submit",
                                      class: "inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"
                                    }, " Submit "),
                                    createVNode("button", {
                                      type: "button",
                                      class: "inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md",
                                      onClick: onClose
                                    }, " Close ")
                                  ])
                                ], 40, ["onSubmit"])
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
                                createVNode("div", { class: "relative w-full items-center py-10" }, [
                                  createVNode("form", {
                                    onSubmit: withModifiers(unref(onSubmit), ["prevent"])
                                  }, [
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "full_name",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Full Name *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "full_name",
                                        "onUpdate:modelValue": ($event) => isRef(full_name) ? full_name.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Full Name"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(full_name)]
                                      ]),
                                      unref(fullNameError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(fullNameError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "email",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Email *"),
                                      withDirectives(createVNode("input", {
                                        type: "email",
                                        name: "email",
                                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Email"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(email)]
                                      ]),
                                      unref(emailError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(emailError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "phone",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Phone *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "phone",
                                        "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Phone and Country Code"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(phone)]
                                      ]),
                                      unref(phoneError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(phoneError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "address_1",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Address Line 1 *"),
                                      withDirectives(createVNode("textarea", {
                                        rows: 1,
                                        name: "address_1",
                                        "onUpdate:modelValue": ($event) => isRef(address_1) ? address_1.value = $event : null,
                                        class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Address Line 1"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(address_1)]
                                      ]),
                                      unref(address1Error) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(address1Error)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "address_2",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, [
                                        createTextVNode("Address Line 2 "),
                                        createVNode("i", { class: "font-normal" }, "(option)")
                                      ]),
                                      withDirectives(createVNode("textarea", {
                                        rows: 1,
                                        name: "address_2",
                                        "onUpdate:modelValue": ($event) => isRef(address_2) ? address_2.value = $event : null,
                                        class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Address Line 2 (option)"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(address_2)]
                                      ])
                                    ]),
                                    createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "country",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "Country *"),
                                        withDirectives(createVNode("select", {
                                          name: "country",
                                          "onUpdate:modelValue": ($event) => isRef(country) ? country.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm placeholder:text-gray-900 dark:placeholder:text-gray-50",
                                          required: ""
                                        }, [
                                          createVNode("option", {
                                            value: "",
                                            disabled: ""
                                          }, "- Select Country -"),
                                          (openBlock(true), createBlock(Fragment, null, renderList(unref(countryFlag), (item) => {
                                            return openBlock(), createBlock("option", {
                                              key: item.code,
                                              value: item.code
                                            }, toDisplayString(item.name), 9, ["value"]);
                                          }), 128))
                                        ], 8, ["onUpdate:modelValue"]), [
                                          [vModelSelect, unref(country)]
                                        ]),
                                        unref(countryError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(countryError)), 1)) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "state",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "State *"),
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          name: "state",
                                          "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                          placeholder: "State"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(state)]
                                        ]),
                                        unref(stateError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(stateError)), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "city",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "City *"),
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          name: "city",
                                          "onUpdate:modelValue": ($event) => isRef(city) ? city.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                          placeholder: "City"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(city)]
                                        ]),
                                        unref(cityError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(cityError)), 1)) : createCommentVNode("", true)
                                      ]),
                                      createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                        createVNode("label", {
                                          for: "postal_code",
                                          class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                        }, "Postal Code *"),
                                        withDirectives(createVNode("input", {
                                          type: "text",
                                          name: "postal_code",
                                          "onUpdate:modelValue": ($event) => isRef(postal_code) ? postal_code.value = $event : null,
                                          class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                          placeholder: "Postal Code"
                                        }, null, 8, ["onUpdate:modelValue"]), [
                                          [vModelText, unref(postal_code)]
                                        ]),
                                        unref(PostalCodeError) ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "text-xs text-red-500 italic mt-1 font-semibold"
                                        }, toDisplayString(unref(PostalCodeError)), 1)) : createCommentVNode("", true)
                                      ])
                                    ]),
                                    createVNode("div", { class: "flex items-center justify-center gap-2 mt-5" }, [
                                      createVNode("button", {
                                        type: "submit",
                                        class: "inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"
                                      }, " Submit "),
                                      createVNode("button", {
                                        type: "button",
                                        class: "inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md",
                                        onClick: onClose
                                      }, " Close ")
                                    ])
                                  ], 40, ["onSubmit"])
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
                onClose,
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
                              createVNode("div", { class: "relative w-full items-center py-10" }, [
                                createVNode("form", {
                                  onSubmit: withModifiers(unref(onSubmit), ["prevent"])
                                }, [
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "full_name",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Full Name *"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      name: "full_name",
                                      "onUpdate:modelValue": ($event) => isRef(full_name) ? full_name.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Full Name"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(full_name)]
                                    ]),
                                    unref(fullNameError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(fullNameError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "email",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Email *"),
                                    withDirectives(createVNode("input", {
                                      type: "email",
                                      name: "email",
                                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Email"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(email)]
                                    ]),
                                    unref(emailError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(emailError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "phone",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Phone *"),
                                    withDirectives(createVNode("input", {
                                      type: "text",
                                      name: "phone",
                                      "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                                      class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Phone and Country Code"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(phone)]
                                    ]),
                                    unref(phoneError) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(phoneError)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "address_1",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, "Address Line 1 *"),
                                    withDirectives(createVNode("textarea", {
                                      rows: 1,
                                      name: "address_1",
                                      "onUpdate:modelValue": ($event) => isRef(address_1) ? address_1.value = $event : null,
                                      class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Address Line 1"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(address_1)]
                                    ]),
                                    unref(address1Error) ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "text-xs text-red-500 italic mt-1 font-semibold"
                                    }, toDisplayString(unref(address1Error)), 1)) : createCommentVNode("", true)
                                  ]),
                                  createVNode("div", { class: "relative w-full space-y-1 mt-2" }, [
                                    createVNode("label", {
                                      for: "address_2",
                                      class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                    }, [
                                      createTextVNode("Address Line 2 "),
                                      createVNode("i", { class: "font-normal" }, "(option)")
                                    ]),
                                    withDirectives(createVNode("textarea", {
                                      rows: 1,
                                      name: "address_2",
                                      "onUpdate:modelValue": ($event) => isRef(address_2) ? address_2.value = $event : null,
                                      class: "inline-flex w-full text-sm text-gray-900 dark:text-gray-50 px-3 py-2 border border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                      placeholder: "Address Line 2 (option)"
                                    }, null, 8, ["onUpdate:modelValue"]), [
                                      [vModelText, unref(address_2)]
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "country",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Country *"),
                                      withDirectives(createVNode("select", {
                                        name: "country",
                                        "onUpdate:modelValue": ($event) => isRef(country) ? country.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm placeholder:text-gray-900 dark:placeholder:text-gray-50",
                                        required: ""
                                      }, [
                                        createVNode("option", {
                                          value: "",
                                          disabled: ""
                                        }, "- Select Country -"),
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(countryFlag), (item) => {
                                          return openBlock(), createBlock("option", {
                                            key: item.code,
                                            value: item.code
                                          }, toDisplayString(item.name), 9, ["value"]);
                                        }), 128))
                                      ], 8, ["onUpdate:modelValue"]), [
                                        [vModelSelect, unref(country)]
                                      ]),
                                      unref(countryError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(countryError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "state",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "State *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "state",
                                        "onUpdate:modelValue": ($event) => isRef(state) ? state.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "State"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(state)]
                                      ]),
                                      unref(stateError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(stateError)), 1)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createVNode("div", { class: "grid grid-cols-2 gap-2" }, [
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "city",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "City *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "city",
                                        "onUpdate:modelValue": ($event) => isRef(city) ? city.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "City"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(city)]
                                      ]),
                                      unref(cityError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(cityError)), 1)) : createCommentVNode("", true)
                                    ]),
                                    createVNode("div", { class: "relative space-y-1 mt-2" }, [
                                      createVNode("label", {
                                        for: "postal_code",
                                        class: "text-sm text-gray-900 dark:text-gray-50 font-semibold"
                                      }, "Postal Code *"),
                                      withDirectives(createVNode("input", {
                                        type: "text",
                                        name: "postal_code",
                                        "onUpdate:modelValue": ($event) => isRef(postal_code) ? postal_code.value = $event : null,
                                        class: "inline-flex w-full h-10 text-sm text-gray-900 dark:text-gray-50 px-3 border border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700 hover:outline-none focus:ring-0 focus:outline-none hover:ring-0 rounded-sm",
                                        placeholder: "Postal Code"
                                      }, null, 8, ["onUpdate:modelValue"]), [
                                        [vModelText, unref(postal_code)]
                                      ]),
                                      unref(PostalCodeError) ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "text-xs text-red-500 italic mt-1 font-semibold"
                                      }, toDisplayString(unref(PostalCodeError)), 1)) : createCommentVNode("", true)
                                    ])
                                  ]),
                                  createVNode("div", { class: "flex items-center justify-center gap-2 mt-5" }, [
                                    createVNode("button", {
                                      type: "submit",
                                      class: "inline-flex bg-orange-600 hover:bg-orange-400 text-sm text-gray-50 font-semibold px-5 py-3"
                                    }, " Submit "),
                                    createVNode("button", {
                                      type: "button",
                                      class: "inline-flex bg-gray-900 dark:bg-gray-50 hover:bg-gray-200 dark:hover:bg-gray-800 text-sm text-gray-50 dark:text-gray-900 hover:text-gray-900 dark:hover:text-gray-100 font-semibold px-5 py-3 rounded-md",
                                      onClick: onClose
                                    }, " Close ")
                                  ])
                                ], 40, ["onSubmit"])
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/step/EditShippingInfo.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ShippingInfo",
  __ssrInlineRender: true,
  setup(__props) {
    const cartStore = useCartStore();
    const openModal = ref(false);
    const openEditModal = ref(false);
    const dataShipping = ref();
    const closeAddShipping = () => {
      openModal.value = false;
    };
    const openEditShipping = (data) => {
      openEditModal.value = true;
      dataShipping.value = data;
    };
    const closeEditShipping = () => {
      openEditModal.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_4;
      const _component_AddShippingInfo = _sfc_main$5;
      const _component_StepEditShippingInfo = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="bg-white dark:bg-slate-800"><div class="rounded p-5 space-y-5">`);
      if (unref(cartStore).shippingInfo.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(unref(cartStore).shippingInfo, (items) => {
          _push(`<div class="flex items-center gap-2 w-full"><div class="flex flex-col items-center space-y-4">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "material-symbols:edit-square-outline",
            class: "text-gray-900 dark:text-gray-100 h-4 w-4 font-bold cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-500",
            onClick: ($event) => openEditShipping(items)
          }, null, _parent));
          _push(ssrRenderComponent(_component_Icon, {
            name: "material-symbols:delete-forever-outline",
            class: "text-red-600 dark:text-red-500 h-4 w-4 font-bold cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-200",
            onClick: ($event) => unref(cartStore).removeShippingInfo(items.id)
          }, null, _parent));
          _push(`</div><label class="flex w-full items-start gap-3 border dark:border-slate-700 rounded p-5"><div class="flex flex-start -mt-1 space-x-3 md:space-x-5 rtl:space-x-reverse"><div class="w-max md:min-w-[110px] md:text-base text-xs text-slate-500 dark:text-slate-400 space-y-1.5"><p>Full Name:</p><p>Address:</p><p>Email:</p><p>Phone:</p><p>City:</p><p>State:</p><p>Country:</p><p>Postal Code:</p></div><div class="md:text-base text-xs text-slate-900 dark:text-slate-300 space-y-1.5"><p>${ssrInterpolate(items.full_name)}</p><p>${ssrInterpolate(items.address_1 + ` ${items.address_2 !== void 0 ? items.address_2 : ""}`)}</p><p>${ssrInterpolate(items.email)}</p><p>${ssrInterpolate(items.phone)}</p><p>${ssrInterpolate(items.city)}</p><p>${ssrInterpolate(items.state)}</p><p>${ssrInterpolate(items.country)}</p><p>${ssrInterpolate(items.postal_code)}</p></div></div></label></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<button class="w-full flex flex-col justify-center items-center font-normal text-slate-800 dark:text-slate-300 p-5 space-y-3 border dark:border-slate-700 rounded bg-slate-100 dark:bg-slate-800">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "ic:round-plus",
          class: "h-6 w-6"
        }, null, _parent));
        _push(`<span>Add New Address</span></button>`);
      }
      _push(`</div></div>`);
      _push(ssrRenderComponent(_component_AddShippingInfo, {
        "is-open": unref(openModal),
        onOnClose: closeAddShipping
      }, null, _parent));
      if (unref(openEditModal)) {
        _push(ssrRenderComponent(_component_StepEditShippingInfo, {
          "is-open": unref(openEditModal),
          onOnClose: closeEditShipping,
          data: unref(dataShipping)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/step/ShippingInfo.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Payment",
  __ssrInlineRender: true,
  emits: ["orderComplete", "orderFailed"],
  setup(__props, { emit: __emit }) {
    const cart = useCartStore();
    const config = useRuntimeConfig();
    const errorPayment = ref(false);
    useNuxtApp();
    config.public.metaPixel;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AlertMessageBox = _sfc_main$a;
      const _component_CheckBox = script;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-auto rounded-sm" }, _attrs))}>`);
      if (unref(errorPayment)) {
        _push(ssrRenderComponent(_component_AlertMessageBox, {
          theme: "danger",
          message: "Failed to process payment, Please try again",
          "show-close": true,
          onCloseMessage: ($event) => errorPayment.value = false
        }, null, _parent));
      } else {
        _push(`<div class="grid grid-cols-12 gap-5"><div class="lg:col-span-5 col-span-12"><h3 class="text-slate-950 dark:text-slate-300 font-medium text-base pb-3"> Summary </h3><div class="card border dark:border-slate-700 rounded-sm p-4"><div><ul class="divide-y gap-8 divide-slate-300 dark:divide-slate-600 pb-8"><li class="text-xs pb-3"><div class="flex justify-between"><p>Product</p><p>Total</p></div></li><!--[-->`);
        ssrRenderList(unref(cart).items, (item, index) => {
          _push(`<li class="text-xs text-slate-950 dark:text-slate-300 py-2"><div class="flex justify-between gap-3 pb-1"><p class="text-sm line-clamp-2">${ssrInterpolate(item.name)}</p><p class="text-slate-950 dark:text-slate-300 font-medium"> x${ssrInterpolate(item.quantity)}</p></div></li>`);
        });
        _push(`<!--]--><li class="text-xs py-2 space-y-2"><div class="flex justify-between gap-3"><p class="text-slate-950 dark:text-slate-300 font-medium"> Total </p><p class="text-slate-950 dark:text-slate-300 font-medium"> $${ssrInterpolate(unref(cart).totalPrice)}</p></div><div class="flex justify-between gap-3"><p class="text-slate-950 dark:text-slate-300 font-medium"> Tax </p><p class="text-slate-950 dark:text-slate-300 font-medium"> $${ssrInterpolate(unref(cart).taxTotal)}</p></div><div class="flex justify-between gap-3"><p class="text-slate-950 dark:text-slate-300 font-medium"> Shipping Costs </p><p class="text-slate-950 dark:text-slate-300 font-medium"> $${ssrInterpolate(unref(cart).shippingTotal)}</p></div></li><li class="text-xs py-2"><div class="flex justify-between gap-3"><p class="text-slate-950 dark:text-slate-300 font-medium"> Total </p><p class="text-slate-950 dark:text-slate-300 font-medium"> $${ssrInterpolate(unref(cart).grandTotal)}</p></div></li></ul></div></div></div><div class="lg:col-span-7 col-span-12"><h3 class="text-slate-900 dark:text-slate-300 font-medium text-base pb-3"> Select a Payment Option </h3><div class="card border dark:border-slate-700 rounded-sm p-5" style="${ssrRenderStyle({
          backgroundColor: "#fff"
        })}"><div id="paypal-checkout"></div></div><div class="flex items-center text-base text-gray-500 mt-3 gap-4 px-2">`);
        _push(ssrRenderComponent(_component_CheckBox, {
          active: "",
          checked: ""
        }, null, _parent));
        _push(`<p class="text-slate-900 dark:text-slate-300 font-medium"> I agree to the terms and conditions, Return Policy &amp; Privacy Policy </p></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/step/Payment.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "InvoiceCart",
  __ssrInlineRender: true,
  props: {
    orderId: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    useCartStore();
    const orderData = ref(null);
    ref(null);
    function getDateNow(date) {
      return dayjs(date).format("dddd, MMMM D, YYYY h:mm A");
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6" }, _attrs))}><div class="text-center mb-8"><h4 class="text-slate-900 dark:text-slate-300 text-2xl font-medium pb-4"> Thank You for Your Order! </h4><p class="text-slate-900 dark:text-slate-300 text-base font-normal"> A copy or your order summary has been sent to <span class="dark:text-slate-400 text-base font-medium ml-1 cursor-pointer">${ssrInterpolate((_a = unref(orderData)) == null ? void 0 : _a.email)}</span></p></div><div class="py-12 text-center lg:text-2xl text-xl font-normal text-slate-900 dark:text-slate-300"> Order Code: <span class="lg:text-2xl text-xl font-medium">${ssrInterpolate((_b = unref(orderData)) == null ? void 0 : _b.transaction.orderID)}</span></div><div class="border dark:border-slate-700 p-3 lg:p-6 rounded"><p class="text-slate-900 dark:text-slate-300 text-base font-medium pb-3 border-b dark:border-slate-700 mb-4"> Order Summary </p><div class="grid grid-cols-12 md:space-x-3 lg:space-x-5 space-y-3 md:space-y-0 overflow-auto"><div class="flex-none col-span-12 md:col-span-6"><div class="flex space-x-1 md:space-x-3 rtl:space-x-reverse"><div class="font-medium md:text-sm text-xs text-slate-900 dark:text-slate-300 space-y-3 min-w-[110px]"><p>Order Date:</p><p>Name:</p><p>Email:</p><p>Shipping address:</p></div><div class="font-normal md:text-sm text-xs text-slate-900 dark:text-slate-300 space-y-3 min-w-[110px]"><p>${ssrInterpolate(getDateNow((_c = unref(orderData)) == null ? void 0 : _c.transaction.date_created))}</p><p>${ssrInterpolate((_d = unref(orderData)) == null ? void 0 : _d.transaction.name)}</p><p>${ssrInterpolate((_e = unref(orderData)) == null ? void 0 : _e.email)}</p><p>${ssrInterpolate((_f = unref(orderData)) == null ? void 0 : _f.transaction.address_1)}</p></div></div></div><div class="flex-none col-span-12 md:col-span-6"><div class="flex space-x-1 md:space-x-3 rtl:space-x-reverse"><div class="font-medium md:text-sm text-xs text-slate-900 dark:text-slate-300 space-y-3 min-w-[110px]"><p>Order Status:</p><p>Total order amount:</p><p>Shipping:</p><p>Payment method:</p></div><div class="font-normal md:text-sm text-xs text-slate-900 dark:text-slate-300 space-y-3 min-w-[110px]"><p>${ssrInterpolate(((_h = (_g = unref(orderData)) == null ? void 0 : _g.transaction) == null ? void 0 : _h.status) ? "Completed" : "Pending")}</p><p>$${ssrInterpolate((_j = (_i = unref(orderData)) == null ? void 0 : _i.transaction) == null ? void 0 : _j.amount)}</p><p>Flat shipping rate</p><p>${ssrInterpolate((_l = (_k = unref(orderData)) == null ? void 0 : _k.transaction) == null ? void 0 : _l.paymentSource)}</p></div></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/step/InvoiceCart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const themeStore = useThemeSettings();
    const cart = useCartStore();
    useNuxtApp();
    const config = useRuntimeConfig();
    config.public.metaPixel;
    const stepNumber = ref(1);
    ref(null);
    const completeTransaction = ref(false);
    ref(false);
    const orderID = ref("");
    useHead({
      title: "Cart"
    });
    function onOrderComplete(orderId) {
      completeTransaction.value = true;
      stepNumber.value = 4;
      orderID.value = orderId;
    }
    const stepsArray = [
      {
        step: 1,
        icon: "ic:sharp-shopping-cart",
        title: "My Cart"
      },
      {
        step: 2,
        icon: "solar:delivery-linear",
        title: "Shipping Info"
      },
      {
        step: 3,
        icon: "ic:baseline-payment",
        title: "Payment"
      },
      {
        step: 4,
        icon: "ic:outline-check-circle-outline",
        title: "Confirmation"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingSkeleton = _sfc_main$8;
      const _component_StepBox = _sfc_main$7;
      const _component_StepCartStep = _sfc_main$6;
      const _component_StepShippingInfo = _sfc_main$3;
      const _component_StepPayment = _sfc_main$2;
      const _component_StepInvoiceCart = _sfc_main$1;
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(themeStore).isLoading) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-gray-50 dark:bg-slate-900" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_LoadingSkeleton, { "row-count": 10 }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: [
            "w-full h-full bg-gray-100 dark:bg-slate-900 py-2 px-2 lg:px-6 lg:py-6 md:px-6 md:py-6 rounded-lg mt-16 md:mt-16 lg:mt-14",
            unref(stepNumber) == 2 ? "h-screen lg:h-full md:h-full" : unref(stepNumber) == 1 ? "h-screen lg:h-full md:h-full" : ""
          ]
        }, _attrs))}><div class="grid grid-cols-5 gap-5"><!--[-->`);
        ssrRenderList(stepsArray, (steps, i) => {
          _push(ssrRenderComponent(_component_StepBox, {
            key: i,
            steps,
            stepNumber: unref(stepNumber)
          }, null, _parent));
        });
        _push(`<!--]--></div><div class="mt-8">`);
        if (unref(stepNumber) == 1) {
          _push(ssrRenderComponent(_component_StepCartStep, null, null, _parent));
        } else {
          _push(`<!---->`);
        }
        if (unref(stepNumber) == 2) {
          _push(ssrRenderComponent(_component_StepShippingInfo, null, null, _parent));
        } else if (unref(stepNumber) == 3) {
          _push(ssrRenderComponent(_component_StepPayment, { onOrderComplete }, null, _parent));
        } else if (unref(stepNumber) == 4 || unref(completeTransaction)) {
          _push(ssrRenderComponent(_component_StepInvoiceCart, { "order-id": unref(orderID) }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="flex flex-col md:flex-row md:justify-between md:px-6 py-5 md:py-10 md:mt-8 space-x-0 md:space-x-6"><div class="flex"><div class="flex flex-col items-center md:flex-row md:justify-end md:space-x-5 space-y-3 md:space-y-0 mx-auto w-full md:w-max">`);
        if (unref(stepNumber) < 4) {
          _push(`<!--[-->`);
          if (unref(stepNumber) <= 3) {
            _push(`<!--[-->`);
            if (unref(stepNumber) > 1 && unref(stepNumber) <= 3) {
              _push(`<button${ssrIncludeBooleanAttr(unref(stepNumber) === 1) ? " disabled" : ""} type="button" class="inline-flex px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold disabled:cursor-not-allowed disabled:opacity-50 rounded-md"><span> Go Back </span></button>`);
            } else {
              _push(`<!---->`);
            }
            if (unref(stepNumber) <= 2 && unref(cart).items.length > 0) {
              _push(`<button${ssrIncludeBooleanAttr(
                unref(cart).items.length == 0 || unref(stepNumber) === 3 || unref(stepNumber) === 2 && unref(cart).shippingInfo.length === 0
              ) ? " disabled" : ""} type="button" class="inline-flex px-5 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-700 text-sm text-white dark:text-gray-900 dark:hover:text-white font-semibold disabled:cursor-not-allowed disabled:opacity-50 rounded-md"><span>${ssrInterpolate(unref(stepNumber) === 1 ? "Continue Shipping Info" : unref(stepNumber) === 2 ? "Continue Payment" : "")}</span></button>`);
            } else {
              _push(`<!---->`);
            }
            if (unref(stepNumber) === 1 && unref(cart).items.length === 0) {
              _push(`<button${ssrIncludeBooleanAttr(unref(cart).items.length > 0) ? " disabled" : ""} type="button" class="inline-flex px-5 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold disabled:cursor-not-allowed disabled:opacity-50 rounded-md"><span> Add To Cart </span></button>`);
            } else {
              _push(`<!---->`);
            }
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button type="button" class="inline-flex px-5 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-700 text-sm text-white dark:text-gray-900 dark:hover:text-white font-semibold disabled:cursor-not-allowed disabled:opacity-50 rounded-md"${_scopeId}><span${_scopeId}> Shop More </span></button>`);
              } else {
                return [
                  createVNode("button", {
                    type: "button",
                    class: "inline-flex px-5 py-3 bg-gray-800 hover:bg-gray-900 dark:bg-gray-200 dark:hover:bg-gray-700 text-sm text-white dark:text-gray-900 dark:hover:text-white font-semibold disabled:cursor-not-allowed disabled:opacity-50 rounded-md"
                  }, [
                    createVNode("span", null, " Shop More ")
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
        }
        _push(`</div></div></div></div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=cart-hcMfLEjf.mjs.map

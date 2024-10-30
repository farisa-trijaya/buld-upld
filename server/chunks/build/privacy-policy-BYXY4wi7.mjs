import _sfc_main$1 from './LoadingSkeleton-BGYYkLjL.mjs';
import { defineComponent, unref, mergeProps, useSSRContext } from 'vue';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "privacy-policy",
  __ssrInlineRender: true,
  setup(__props) {
    const themeStore = useThemeSettings();
    useHead({
      title: "Privacy Policy"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LoadingSkeleton = _sfc_main$1;
      if (unref(themeStore).isLoading) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-gray-50 dark:bg-slate-900" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_LoadingSkeleton, { "row-count": 10 }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full h-full bg-gray-100 dark:bg-slate-900 pb-2 lg:pb-6 md:pb-6 rounded-lg mt-16 md:mt-16 lg:mt-14" }, _attrs))}><div class="flex w-full h-16 text-center items-center justify-center m-auto" style="${ssrRenderStyle({ "background-image": "url(https://dentestore.com/images/banner.jpg)", "padding": "90px 0 110px 0", "background-attachment": "fixed", "background-size": "100%", "position": "relative" })}"><h1 class="text-3xl text-gray-50 font-semibold uppercase"> PRIVACY POLICY </h1></div><div class="flex flex-col w-full px-5 py-5 text-start space-y-3"><div class="relative w-full items-center space-y-3"><h4 class="text-sm text-black dark:text-gray-50 font-bold"> INTRODUCTION: </h4><p class="text-sm text-black dark:text-gray-50"> INTRODUCTION: Our Privacy Policy describes the ways in which we collect, store, use and protect your personal information and it is very important for you to check this Privacy Policy. This is DENTESTORE.COM\u2019s (&quot;DENTESTORE.COM&quot;) online Privacy Policy (&quot;Policy&quot;). This policy applies only to activities DENTESTORE.COM engages in on its website and does not apply to DENTESTORE.COM activities that are &quot;offline&quot; or unrelated to the website. DENTESTORE.COM collects certain anonymous data on the usage of the website. This information does not personally identify users, by itself or in combination with other information, and is gathered to improve the performance of the website. The anonymous data collected by the DENTESTORE.COM website can include information such as the type of browser you are using, and the length of the visit to the website. You may also be asked to provide personally identifiable information on the DENTESTORE.COM website, which may include your name, address, telephone number and e-mail address. This information can be gathered when feedback or e-mails are sent to DENTESTORE.COM, when you register for services, or make purchases via the website. In all such cases you have the option of providing us with personally identifiable information. </p></div><div class="relative w-full items-center space-y-3"><h4 class="text-sm text-black dark:text-gray-50 font-bold"> USE AND DISCLOSURE OF INFORMATION: </h4><p class="text-sm text-black dark:text-gray-50"> Except as otherwise stated below, we do not sell, trade or rent your personally identifiable information collected on the site to others. The information collected by our site is used to process orders, to keep you informed about your order status, to notify you of products or special offers that may be of interest to you, and for statistical purposes for improving our site. We will disclose your Delivery information to third parties for order tracking purposes or process your check or money order, as appropriate, fill your order, improve the functionality of our site, perform statistical and data analyses deliver your order and deliver promotional emails to you from us. For example, we must release your mailing address information to the delivery service to deliver products that you ordered. </p></div><div class="relative w-full items-center space-y-3"><h4 class="text-sm text-black dark:text-gray-50 font-bold uppercase"> Credit/debit cards\u2019 </h4><p class="text-sm text-black dark:text-gray-50"> All credit/debit cards\u2019 details and personally identifiable information will NOT be stored, sold, shared, rented or leased to any third parties. </p></div><div class="relative w-full items-center space-y-3"><h4 class="text-sm text-black dark:text-gray-50 font-bold">COOKIES:</h4><p class="text-sm text-black dark:text-gray-50"> Cookies are small bits of data cached in a user\u2019s browser. DENTESTORE.COM utilizes cookies to determine whether you have visited the home page in the past. However, no other user information is gathered. </p></div><div class="relative w-full items-center space-y-3"><p class="text-sm text-black dark:text-gray-50"> DENTESTORE.COM may use non-personal &quot;aggregated data&quot; to enhance the operation of our website, or analyse interest in the areas of our website. Additionally, if you provide DENTESTORE.COM with content for publishing or feedback, we may publish your user name or other identifying data with your permission. </p></div><div class="relative w-full items-center space-y-3"><p class="text-sm text-black dark:text-gray-50"> DENTESTORE.COM may also disclose personally identifiable information in order to respond to a subpoena, court order or other such request. DENTESTORE.COM may also provide such personally identifiable information in response to a law enforcement agencies request or as otherwise required by law. Your personally identifiable information may be provided to a party if DENTESTORE.COM files for bankruptcy, or there is a transfer of the assets or ownership of DENTESTORE.COM in connection with proposed or consummated corporate reorganizations, such as mergers or acquisitions. </p></div><div class="relative w-full items-center space-y-3"><h4 class="text-sm text-black dark:text-gray-50 font-bold"> SECURITY: </h4><p class="text-sm text-black dark:text-gray-50"> DENTESTORE.COM takes appropriate steps to ensure data privacy and security including through various hardware and software methodologies. However, DENTESTORE.COM cannot guarantee the security of any information that is disclosed online. </p></div><div class="relative w-full items-center space-y-3"><h4 class="text-sm text-black dark:text-gray-50 font-bold"> OTHER WEBSITES: </h4><p class="text-sm text-black dark:text-gray-50"> DENTESTORE.COM is not responsible for the privacy policies of websites to which it links. If you provide any information to such third parties different rules regarding the collection and use of your personal information may apply. We strongly suggest you check such third party\u2019s privacy policies before providing any data to them. We are not responsible for the policies or practices of third parties. Please be aware that our sites may contain links to other sites on the Internet that are owned and operated by third parties. The information practices of those Websites linked to our site is not covered by this Policy. These other sites may send their own cookies or clear GIFs to users, collect data or solicit personally identifiable information. We cannot control this collection of information. You should contact these entities directly if you have any questions about their use of the information that they collect. </p></div><div class="relative w-full items-center space-y-3"><p class="text-sm text-black dark:text-gray-50"> ix. Some of the advertisements you see on the Site are selected and delivered by third parties, such as ad networks, advertising agencies, advertisers, and audience segment providers. These third parties may collect information about you and your online activities, either on the Site or on other websites, through cookies, web beacons, and other technologies to understand your interests and deliver to you advertisements that are tailored to your interests. Please remember that we do not have access to, or control over, the information these third parties may collect. The information practices of these third parties are not covered by this Privacy Policy. </p></div><div class="relative w-full items-center space-y-3"><h4 class="text-sm text-black dark:text-gray-50 font-bold">MINORS:</h4><p class="text-sm text-black dark:text-gray-50"> DENTESTORE.COM does not knowingly collect personal information from minors under the age of 18. Minors are not permitted to use the DENTESTORE.COM website or services, and DENTESTORE.COM requests that minors under the age of 18 not submit any personal information to the website. Since information regarding minors under the age of 18 is not collected, DENTESTORE.COM does not knowingly distribute personal information regarding minors under the age of 18. </p></div><div class="relative w-full items-center space-y-3"><h4 class="text-sm text-black dark:text-gray-50 font-bold"> CORRECTIONS AND UPDATES: </h4><p class="text-sm text-black dark:text-gray-50"> xi. CORRECTIONS AND UPDATES: If you wish to modify or update any information DENTESTORE.COM has received, please contact customers@dentestore.com. </p></div><div class="relative w-full items-center space-y-3"><h4 class="text-sm text-black dark:text-gray-50 font-bold"> MODIFICATIONS OF THE PRIVACY POLICY: </h4><p class="text-sm text-black dark:text-gray-50"> DENTESTORE.COM\u2019s Policies and Terms &amp; Conditions may be changed or updated occasionally to meet the requirements and standards. Therefore the Customers\u2019 are encouraged to frequently visit these sections in order to be updated about the changes on the website. Modifications will be effective on the day they are posted. </p></div></div></div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacy-policy.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=privacy-policy-BYXY4wi7.mjs.map

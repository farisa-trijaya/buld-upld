import { p as defineNuxtRouteMiddleware, b as useNuxtApp, q as callWithNuxt, n as navigateTo } from './server.mjs';
import { u as useAuthStore } from './authStore-B9R4yTW5.mjs';
import 'vue';
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
import 'vue/server-renderer';
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
import './useCheckout-hgERupd8.mjs';

const dashboard = defineNuxtRouteMiddleware(async (to, from) => {
  const nuxtApp = useNuxtApp();
  const authStore = useAuthStore(nuxtApp.$pinia);
  if (!authStore.isLoggedIn) {
    return callWithNuxt(nuxtApp, navigateTo, ["/"]);
  }
  if (to.path !== from.path && false) {
    (void 0).scrollTo(0, 0);
  }
});

export { dashboard as default };
//# sourceMappingURL=dashboard-Bq6RAgBi.mjs.map

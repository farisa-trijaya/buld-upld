import { p as defineNuxtRouteMiddleware, b as useNuxtApp } from './server.mjs';
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

const guest = defineNuxtRouteMiddleware(async (to, from) => {
  useNuxtApp().hook("page:finish", () => {
    if (history.state.scroll) {
      setTimeout(() => (void 0).scrollTo(history.state.scroll), 0);
    } else {
      setTimeout(() => (void 0).scrollTo(0, 0), 0);
    }
  });
});

export { guest as default };
//# sourceMappingURL=guest-CqrHjyKq.mjs.map

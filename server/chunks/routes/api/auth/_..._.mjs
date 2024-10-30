import { d as defineEventHandler } from '../../../runtime.mjs';
import { a as authController } from '../../../_/auth.controller.mjs';
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

const _____ = defineEventHandler(async (event) => {
  return authController(event);
});

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map

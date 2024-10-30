import { d as defineEventHandler } from '../../runtime.mjs';
import { u as usersController } from '../../_/users.controller.mjs';
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
import '../../_/permissions.helpers.mjs';
import 'path';
import 'fs';

const index = defineEventHandler(async (event) => {
  return usersController(event);
});

export { index as default };
//# sourceMappingURL=index4.mjs.map

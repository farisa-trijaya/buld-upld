import { B as getQuery, k as createError, H as H3Error, z as useBase, A as createRouter, d as defineEventHandler, v as validateCsrfToken } from '../runtime.mjs';
import { c as canAccessAdmin } from './permissions.helpers.mjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function getAllRefreshTokens(event) {
  let refreshTokens = [];
  let error = null;
  const queryParams = getQuery(event);
  let skip = queryParams.skip;
  let take = queryParams.take;
  await prisma.refresh_tokens.findMany({
    skip: Number.isInteger(skip) ? parseInt(skip) : 0,
    take: Number.isInteger(take) ? parseInt(take) : 100
  }).then(async (result) => {
    refreshTokens = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error retrieving refresh tokens");
    return createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  return refreshTokens;
}
async function destroyRefreshToken(event) {
  var _a;
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  if (!id) {
    console.log("Refresh token id is missing for delete");
    return createError({
      statusCode: 400,
      statusMessage: "Refresh token id is missing for delete"
    });
  }
  let token = null;
  let error = null;
  await prisma.refresh_tokens.delete({
    where: {
      id: parseInt(id)
    }
  }).then(async (result) => {
    token = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error deleting refresh token");
    return createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  if (token)
    return true;
  else {
    console.log("Should not return false here");
    return false;
  }
}
async function destroyRefreshTokens(event) {
  let tokens = null;
  let error = null;
  await prisma.refresh_tokens.deleteMany({
    where: {
      id: {
        gt: 0
      }
    }
  }).then(async (result) => {
    tokens = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error deleting refresh tokens");
    return createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  if (tokens) {
    console.log(tokens);
    return true;
  } else {
    console.log("We should not return false here");
    return false;
  }
}

async function index(event) {
  const response = {};
  const errorOrTokens = await getAllRefreshTokens(event);
  if (errorOrTokens instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrTokens;
    return response;
  }
  const tokens = errorOrTokens;
  response.status = "success";
  response.data = tokens;
  return response;
}
async function destroy(event) {
  const response = {};
  const errorOrBoolean = await destroyRefreshToken(event);
  if (errorOrBoolean instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrBoolean;
    return response;
  }
  if (errorOrBoolean === false) {
    response.status = "fail";
    return response;
  } else {
    response.status = "success";
    return response;
  }
}
async function destroyAll(event) {
  const response = {};
  const errorOrBoolean = await destroyRefreshTokens();
  if (errorOrBoolean instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrBoolean;
    return response;
  }
  if (errorOrBoolean === false) {
    response.status = "fail";
    return response;
  } else {
    response.status = "success";
    return response;
  }
}

const userNotFoundError = createError({
  statusCode: 401,
  statusMessage: "Unauthorized. User not found."
});
const forbiddenError = createError({
  statusCode: 403,
  statusMessage: "Forbidden"
});
const csrfTokenError = createError({
  statusCode: 403,
  statusMessage: "Missing or invalid csrf token"
});
const router = createRouter();
router.get(
  "/",
  defineEventHandler(async (event) => {
    if (!event.context.user)
      throw userNotFoundError;
    if (!canAccessAdmin(event.context.user))
      throw forbiddenError;
    return await index(event);
  })
);
router.delete(
  "/:id",
  defineEventHandler(async (event) => {
    const tokenOrError = await validateCsrfToken(event);
    if (tokenOrError instanceof H3Error)
      throw csrfTokenError;
    if (!event.context.user)
      throw userNotFoundError;
    if (!canAccessAdmin(event.context.user))
      throw forbiddenError;
    return await destroy(event);
  })
);
router.delete(
  "/",
  defineEventHandler(async (event) => {
    const tokenOrError = await validateCsrfToken(event);
    if (tokenOrError instanceof H3Error)
      throw csrfTokenError;
    if (!event.context.user)
      throw userNotFoundError;
    if (!canAccessAdmin(event.context.user))
      throw forbiddenError;
    return await destroyAll();
  })
);
const refreshTokenController = useBase("/api/refresh-tokens", router.handler);

export { refreshTokenController as r };
//# sourceMappingURL=refreshToken.controller.mjs.map

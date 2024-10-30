import { i as isAuthenticated$1, H as H3Error, g as getClientPlatform, a as deleteCookie, l as loginUser, s as setHeader, b as setCookie, r as readBody, c as refreshTokens, e as logoutUser, f as getProfile, h as getCookie, j as getUserSession, k as createError, v as validateCsrfToken, u as updateProfile, m as deleteAccount, n as verifyEmailVerificationToken, o as updateEmailVerifiedTrue, p as resetPassword, q as verifyPasswordResetToken, t as getTokenPayload, w as addOneTimeToken, x as generateNewPassword, y as verifyUserEmail, z as useBase, A as createRouter, d as defineEventHandler } from '../runtime.mjs';
import jwt from 'jsonwebtoken';
import dayjs from 'dayjs';

async function isAuthenticated(event) {
  const authenticated = await isAuthenticated$1(event);
  const response = {};
  if (authenticated instanceof H3Error) {
    response.status = "fail";
    response.error = authenticated;
  }
  if (authenticated === false) {
    response.status = "fail";
  }
  if (authenticated === true) {
    response.status = "success";
  }
  return response;
}
async function login(event) {
  const response = {};
  const errorOrPlatform = getClientPlatform(event);
  if (errorOrPlatform instanceof H3Error) {
    deleteCookie(event, "iam-access-token");
    deleteCookie(event, "iam-refresh-token");
    deleteCookie(event, "iam-sid");
    response.status = "fail";
    response.error = errorOrPlatform;
    return response;
  }
  const platform = errorOrPlatform;
  const errorOrTokens = await loginUser(event);
  if (errorOrTokens instanceof H3Error) {
    deleteCookie(event, "iam-access-token");
    deleteCookie(event, "iam-refresh-token");
    deleteCookie(event, "iam-sid");
    response.status = "fail";
    response.error = errorOrTokens;
    return response;
  }
  const tokens = errorOrTokens;
  if (platform === "app") {
    setHeader(event, "iam-access-token", "Bearer " + tokens.accessToken);
    setHeader(event, "iam-refresh-token", "Bearer " + tokens.refreshToken);
    if (tokens.sid)
      setHeader(event, "iam-sid", tokens.sid);
  }
  if (platform === "browser") {
    setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
      httpOnly: true,
      secure: true
    });
    setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: dayjs().add(14, "day").toDate()
    });
    if (tokens.sid)
      setCookie(event, "iam-sid", tokens.sid);
  }
  if (platform === "browser-dev") {
    setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
      // Access tokens themselves expire in 15 mins
      expires: dayjs().add(1, "day").toDate()
    });
    setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
      expires: dayjs().add(1, "day").toDate()
    });
    if (tokens.sid)
      setCookie(event, "iam-sid", tokens.sid);
  }
  const body = await readBody(event);
  response.status = "success";
  response.data = {
    email: body.email
  };
  return response;
}
async function refresh(event) {
  const response = {};
  const errorOrPlatform = getClientPlatform(event);
  if (errorOrPlatform instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrPlatform;
    return response;
  }
  const platform = errorOrPlatform;
  const errorOrTokens = await refreshTokens(event);
  if (errorOrTokens instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrTokens;
    return response;
  }
  const tokens = errorOrTokens;
  if (platform === "app") {
    setHeader(event, "iam-access-token", "Bearer " + tokens.accessToken);
    setHeader(event, "iam-refresh-token", "Bearer " + tokens.refreshToken);
    if (tokens.sid)
      setHeader(event, "iam-sid", tokens.sid);
  }
  if (platform === "browser") {
    setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
      httpOnly: true,
      secure: true
    });
    setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
      httpOnly: true,
      secure: true,
      expires: dayjs().add(14, "day").toDate()
    });
    if (tokens.sid)
      setCookie(event, "iam-sid", tokens.sid);
  }
  if (platform === "browser-dev") {
    setCookie(event, "iam-access-token", "Bearer " + tokens.accessToken, {
      // Access tokens themselves expire in 15 mins
      expires: dayjs().add(1, "day").toDate()
    });
    setCookie(event, "iam-refresh-token", "Bearer " + tokens.refreshToken, {
      expires: dayjs().add(1, "day").toDate()
    });
    if (tokens.sid)
      setCookie(event, "iam-sid", tokens.sid);
  }
  response.status = "success";
  return response;
}
async function logout(event) {
  const response = {};
  const errorOrTrue = await logoutUser(event);
  if (errorOrTrue instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrTrue;
    return response;
  }
  response.status = "success";
  return response;
}
async function profile(event) {
  const response = {};
  let sessionOrError = {};
  const profileOrError = await getProfile(event);
  if (profileOrError instanceof H3Error) {
    response.status = "fail";
    response.error = profileOrError;
    return response;
  }
  const profile2 = profileOrError;
  const sessionId = getCookie(event, "iam-sid");
  if (sessionId)
    sessionOrError = await getUserSession(sessionId);
  if (sessionOrError instanceof H3Error) {
    console.log("Error getting user session");
    response.status = "fail";
    response.error = response.error = createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  const session = sessionOrError;
  profile2.csrf_token = session.csrf_token;
  response.status = "success";
  response.data = profile2;
  return response;
}
async function update(event) {
  const response = {};
  const csrfTokenError = await validateCsrfToken(event);
  if (csrfTokenError instanceof H3Error) {
    console.log("Csrf token error");
    response.status = "fail";
    response.error = createError({
      statusCode: 403,
      statusMessage: "Missing or invalid csrf token"
    });
    return response;
  }
  const profileOrError = await updateProfile(event);
  if (profileOrError instanceof H3Error) {
    response.status = "fail";
    response.error = profileOrError;
    return response;
  }
  const profile2 = profileOrError;
  response.status = "success";
  response.data = profile2;
  return response;
}
async function destroy(event) {
  const response = {};
  const csrfTokenError = await validateCsrfToken(event);
  if (csrfTokenError instanceof H3Error) {
    console.log("Csrf token error");
    response.status = "fail";
    response.error = createError({
      statusCode: 403,
      statusMessage: "Missing or invalid csrf token"
    });
    return response;
  }
  const deleteOrError = await deleteAccount(event);
  if (deleteOrError instanceof H3Error) {
    response.status = "fail";
    response.error = deleteOrError;
    return response;
  }
  const userDeleted = deleteOrError;
  if (userDeleted === false) {
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Error deleting user account"
    });
    return response;
  }
  response.status = "success";
  return response;
}
async function verifyEmailToken(event) {
  const response = {};
  const body = await readBody(event);
  const token = body.token;
  if (!token) {
    response.status = "fail";
    response.error = createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
    return response;
  }
  const jwtPayloadOrError = verifyEmailVerificationToken(token);
  if (jwtPayloadOrError instanceof jwt.TokenExpiredError) {
    console.log("Expired email verification reset token");
    response.status = "fail";
    response.error = createError({
      statusCode: 401,
      statusMessage: "Link has expired"
    });
    return response;
  }
  if (jwtPayloadOrError instanceof H3Error) {
    console.log("Other error with email reset token");
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
    return response;
  }
  const jwtPayload = jwtPayloadOrError;
  const updateError = await updateEmailVerifiedTrue(
    jwtPayload.email
  );
  if (updateError) {
    console.log("Error updating verified email to true");
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
    return response;
  }
  response.status = "success";
  response.data = {
    email: jwtPayload.email
  };
  return response;
}
async function reset(event) {
  const response = {};
  deleteCookie(event, "iam-access-token");
  deleteCookie(event, "iam-refresh-token");
  deleteCookie(event, "iam-sid");
  const errorOrReset = await resetPassword(event);
  if (errorOrReset instanceof H3Error) {
    console.log("Error: Failed to reset user password");
  }
  response.status = "success";
  return response;
}
async function verifyReset(event) {
  const response = {};
  deleteCookie(event, "iam-access-token");
  deleteCookie(event, "iam-refresh-token");
  deleteCookie(event, "iam-sid");
  const body = await readBody(event);
  const token = body.token;
  if (!token) {
    response.status = "fail";
    response.error = createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
    return response;
  }
  const userOrError = verifyPasswordResetToken(token);
  if (userOrError instanceof jwt.TokenExpiredError) {
    console.log("Expired password reset token");
    response.status = "fail";
    response.error = createError({
      statusCode: 401,
      statusMessage: "Link has expired"
    });
    return response;
  }
  if (userOrError instanceof H3Error) {
    console.log("Other error with password reset token");
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
    return response;
  }
  const errorOrTokenPayload = getTokenPayload(token, "reset");
  if (errorOrTokenPayload instanceof H3Error) {
    console.log("Get token payload error");
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
    return response;
  }
  const tokenPayload = errorOrTokenPayload;
  if (!tokenPayload.jti) {
    console.log("Token payload has no id (jwt.jti)");
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
    return response;
  }
  if (tokenPayload.jti !== await addOneTimeToken(tokenPayload.jti, /* @__PURE__ */ new Date())) {
    console.log("Adding one time token failed. Token is probably already used");
    response.status = "fail";
    response.error = createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
    return response;
  }
  const user = userOrError;
  const errorOrPassword = await generateNewPassword(user.uuid);
  if (errorOrPassword instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrPassword;
    return response;
  }
  const password = errorOrPassword;
  response.status = "success";
  response.data = {
    pass: password
  };
  return response;
}
async function verifyEmail(event) {
  const response = {};
  const errorOrReset = await verifyUserEmail(event);
  if (errorOrReset instanceof H3Error) {
    console.log(errorOrReset.message);
    response.status = "fail";
    response.error = createError({
      statusCode: 403,
      statusMessage: errorOrReset.message
    });
    return response;
  }
  response.status = "success";
  response.data = errorOrReset;
  return response;
}

const router = createRouter();
router.post(
  "/verify-email-token",
  defineEventHandler(async (event) => {
    return await verifyEmailToken(event);
  })
);
router.get(
  "/is-authenticated",
  defineEventHandler(async (event) => {
    return await isAuthenticated(event);
  })
);
router.get(
  "/profile",
  defineEventHandler(async (event) => {
    return await profile(event);
  })
);
router.post(
  "/login",
  defineEventHandler(async (event) => {
    return await login(event);
  })
);
router.post(
  "/refresh",
  defineEventHandler(async (event) => {
    return await refresh(event);
  })
);
router.post(
  "/logout",
  defineEventHandler(async (event) => {
    return await logout(event);
  })
);
router.put(
  "/update",
  defineEventHandler(async (event) => {
    return await update(event);
  })
);
router.delete(
  "/delete",
  defineEventHandler(async (event) => {
    return await destroy(event);
  })
);
router.post(
  "/reset",
  defineEventHandler(async (event) => {
    return await reset(event);
  })
);
router.post(
  "/verify-reset",
  defineEventHandler(async (event) => {
    return await verifyReset(event);
  })
);
router.post(
  "/verify-email",
  defineEventHandler(async (event) => {
    return await verifyEmail(event);
  })
);
const authController = useBase("/api/auth", router.handler);

export { authController as a };
//# sourceMappingURL=auth.controller.mjs.map

import { O as readMultipartFormData, k as createError, B as getQuery, P as validateUserUpdate, H as H3Error, r as readBody, Q as validateUserDelete, M as requestUserToken, R as validateUploadAvatar, S as validateChangePasswordBody, G as hashPassword, h as getCookie, j as getUserSession, z as useBase, A as createRouter, d as defineEventHandler, T as isOwner, v as validateCsrfToken } from '../runtime.mjs';
import { h as hasPermission, c as canAccessAdmin } from './permissions.helpers.mjs';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

async function saveFile(event, imagePath) {
  const body = await readMultipartFormData(event);
  const files = body == null ? void 0 : body[0];
  const size = files.data.length;
  if (size > 1e6) {
    return createError({
      statusCode: 500,
      statusMessage: "File size must be less than 1mb"
    });
  }
  const ext = path.extname(String(files.filename)).toLowerCase();
  const fileName = Math.random().toString(32).substring(2, 2 + 32) + ext;
  const filePath = path.join(process.cwd(), `${imagePath}`, fileName);
  try {
    fs.writeFileSync(filePath, files.data);
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: "Error save file"
    });
  }
  return fileName;
}
async function deleteFile(imagePath, fileName) {
  const filePath = path.join(process.cwd(), `${imagePath}`, fileName);
  try {
    fs.unlinkSync(filePath);
  } catch (error) {
    return createError({
      statusCode: 400,
      statusMessage: "Error change exiting file"
    });
  }
}

const prisma = new PrismaClient();
async function getAllUsers(event) {
  let users = [];
  let error = null;
  const queryParams = getQuery(event);
  let skip = queryParams.skip;
  let take = queryParams.take;
  await prisma.users.findMany({
    skip: Number.isInteger(skip) ? parseInt(skip) : 0,
    take: Number.isInteger(take) ? parseInt(take) : 100
  }).then(async (result) => {
    users = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error retrieving users");
    return createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  return users;
}
async function showUser(event) {
  var _a;
  const uuid = (_a = event.context.params) == null ? void 0 : _a.uuid;
  if (!uuid) {
    console.log("Missing user uuid");
    return createError({
      statusCode: 400,
      statusMessage: "Missing user uuid"
    });
  }
  let error = null;
  let user = {};
  await prisma.users.findUnique({
    where: {
      uuid
    }
  }).then(async (result) => {
    user = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error getting one user");
    return createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  if (user && "email" in user === false) {
    return createError({
      statusCode: 404,
      statusMessage: "User not found"
    });
  }
  if (user === null)
    return createError({
      statusCode: 404,
      statusMessage: "User not found"
    });
  return user;
}
async function updateUser(event) {
  var _a;
  const errorOrVoid = await validateUserUpdate(event);
  if (errorOrVoid instanceof H3Error)
    return errorOrVoid;
  const body = await readBody(event);
  const uuid = (_a = event.context.params) == null ? void 0 : _a.uuid;
  if (!uuid) {
    console.log("Missing user uuid");
    return createError({
      statusCode: 400,
      statusMessage: "Missing user uuid"
    });
  }
  let user = {};
  let error = null;
  delete body.uuid;
  delete body.id;
  delete body.csrf_token;
  await prisma.users.update({
    where: {
      uuid
    },
    data: body
  }).then(async (response) => {
    user = response;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error)
    return createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
  return user;
}
async function destroyUser(event) {
  var _a;
  console.log("Got in destroyUser");
  const errorOrVoid = await validateUserDelete(event);
  if (errorOrVoid instanceof H3Error)
    return errorOrVoid;
  const uuid = (_a = event.context.params) == null ? void 0 : _a.uuid;
  if (!uuid) {
    console.log("Missing user uuid");
    return createError({
      statusCode: 400,
      statusMessage: "Missing user uuid"
    });
  }
  let user = {};
  let error = null;
  await prisma.users.delete({
    where: {
      uuid
    }
  }).then(async (result) => {
    user = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    console.log("Error deleting user");
    return createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  if (user)
    return true;
  else
    return false;
}
async function uploadAvatar$1(event) {
  const validateUserToken = await requestUserToken(event);
  if (validateUserToken instanceof H3Error)
    return validateUserToken;
  const users = validateUserToken;
  const validUpload = await validateUploadAvatar(event);
  if (validUpload instanceof H3Error)
    return validUpload;
  let findUser = {};
  let errorFindUser = null;
  await prisma.users.findUnique({
    where: {
      uuid: users.uuid
    }
  }).then(async (response) => {
    findUser = response;
  }).catch(async (err) => {
    errorFindUser = err;
  });
  if (errorFindUser) {
    return createError({
      statusCode: 500,
      statusMessage: "Forbidden"
    });
  }
  const existUser = findUser;
  if (findUser && existUser.avatar !== null) {
    const deleteFile$1 = await deleteFile(
      "public/users",
      String(existUser.avatar)
    );
    if (deleteFile$1 instanceof H3Error)
      return deleteFile$1;
  }
  const saveFIle = await saveFile(event, "public/users");
  if (saveFIle instanceof H3Error)
    return saveFIle;
  let updateUser2 = {};
  let errorUpdateUser = null;
  await prisma.users.update({
    where: {
      uuid: existUser.uuid
    },
    data: {
      avatar: saveFIle
    }
  }).then(async (response) => {
    updateUser2 = response;
  }).catch(async (err) => {
    errorUpdateUser = err;
  });
  if (errorUpdateUser) {
    return createError({
      statusCode: 500,
      statusMessage: "Error Updating Images"
    });
  }
  const data = updateUser2;
  data.password = "[hidden]";
  return data;
}
async function changePassword(event) {
  const requestAccessToken = await requestUserToken(event);
  if (requestAccessToken instanceof H3Error)
    return requestAccessToken;
  const token = requestAccessToken;
  const body = await readBody(event);
  const validatePassword = await validateChangePasswordBody(
    event,
    token
  );
  if (validatePassword instanceof H3Error)
    return validatePassword;
  const hasPasswordOrError = await hashPassword(body.password);
  if (hasPasswordOrError instanceof H3Error)
    return hasPasswordOrError;
  let users = {};
  let updateError = null;
  await prisma.users.update({
    where: {
      uuid: token.uuid
    },
    data: {
      password: hasPasswordOrError
    }
  }).then(async (response) => {
    users = response;
  }).catch((error) => {
    updateError = error;
  });
  if (updateError) {
    createError({
      status: 403,
      statusMessage: "Error updating password"
    });
  }
  const data = users;
  data.password = "[hidden]";
  return data;
}

async function index(event) {
  const response = {};
  const errorOrUsers = await getAllUsers(event);
  let sessionOrError = {};
  if (errorOrUsers instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrUsers;
    return response;
  }
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
  const users = errorOrUsers;
  response.status = "success";
  response.data = {
    users,
    csrf_token: session.csrf_token
  };
  return response;
}
async function create(event) {
  const response = {};
  response.status = "fail";
  response.error = createError({
    statusCode: 422,
    statusMessage: "All users must be created from authn/register endpoint"
  });
  return response;
}
async function show(event) {
  const response = {};
  const errorOrUser = await showUser(event);
  if (errorOrUser instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrUser;
    return response;
  }
  const user = errorOrUser;
  response.status = "success";
  response.data = user;
  return response;
}
async function permission(event) {
  var _a;
  const response = {};
  const user = event.context.user;
  const permission2 = (_a = event.context.params) == null ? void 0 : _a.permission;
  if (!user) {
    console.log("Failed to get user for permission check.");
    response.status = "fail";
    response.error = createError({
      statusCode: 401,
      statusMessage: "Failed to get user."
    });
    return response;
  }
  if (!permission2) {
    console.log("No permission given to check if user has permission");
    response.status = "fail";
    response.error = createError({
      statusCode: 400,
      statusMessage: "No permission given"
    });
    return response;
  }
  const userHasPermission = hasPermission(user, permission2);
  if (!userHasPermission) {
    console.log(`User: ${user.uuid} does NOT have permission: ${permission2}`);
    response.status = "fail";
    response.error = createError({
      statusCode: 401,
      statusMessage: `User: ${user.uuid} does NOT have permission: ${permission2}`
    });
    return response;
  } else {
    response.status = "success";
    response.data = `User: ${user.uuid} has permission: ${permission2}`;
    return response;
  }
}
async function update(event) {
  const response = {};
  const errorOrUser = await updateUser(event);
  if (errorOrUser instanceof H3Error) {
    response.status = "fail";
    response.error = errorOrUser;
    return response;
  }
  const user = errorOrUser;
  response.status = "success";
  response.data = user;
  return response;
}
async function destroy(event) {
  const response = {};
  const errorOrBoolean = await destroyUser(event);
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
async function uploadAvatar(event) {
  let response = {};
  const uploadOrError = await uploadAvatar$1(event);
  if (uploadOrError instanceof H3Error) {
    response.status = "fail";
    response.error = uploadOrError;
    return response;
  }
  const files = uploadOrError;
  response.status = "success";
  response.data = files.avatar;
  return response;
}
async function changePasswordService(event) {
  let response = {};
  const changePassword$1 = await changePassword(event);
  if (changePassword$1 instanceof H3Error) {
    response.status = "fail";
    response.error = changePassword$1;
    return response;
  }
  const data = changePassword$1;
  response.status = "success";
  response.data = data;
  return response;
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
router.post(
  "/",
  defineEventHandler(async (event) => {
    return await create();
  })
);
router.get(
  "/:uuid",
  defineEventHandler(async (event) => {
    var _a;
    if (!event.context.user)
      throw userNotFoundError;
    const uuid = (_a = event.context.params) == null ? void 0 : _a.uuid;
    if (uuid) {
      if (event.context.user.uuid && !canAccessAdmin(event.context.user) && !isOwner(event.context.user.uuid, uuid))
        throw forbiddenError;
    }
    return await show(event);
  })
);
router.get(
  "/:uuid/permission/:permission",
  defineEventHandler(async (event) => {
    if (!event.context.user)
      throw userNotFoundError;
    if (!canAccessAdmin(event.context.user))
      throw forbiddenError;
    return await permission(event);
  })
);
router.put(
  "/:uuid",
  defineEventHandler(async (event) => {
    var _a;
    const tokenOrError = await validateCsrfToken(event);
    if (tokenOrError instanceof H3Error)
      throw csrfTokenError;
    if (!event.context.user)
      throw userNotFoundError;
    const uuid = (_a = event.context.params) == null ? void 0 : _a.uuid;
    if (uuid) {
      if (event.context.user.uuid && !canAccessAdmin(event.context.user) && !isOwner(event.context.user.uuid, uuid))
        throw forbiddenError;
    }
    return await update(event);
  })
);
router.delete(
  "/:uuid",
  defineEventHandler(async (event) => {
    var _a;
    const tokenOrError = await validateCsrfToken(event);
    if (tokenOrError instanceof H3Error)
      throw csrfTokenError;
    if (!event.context.user)
      throw userNotFoundError;
    const uuid = (_a = event.context.params) == null ? void 0 : _a.uuid;
    if (uuid) {
      if (event.context.user.uuid && !canAccessAdmin(event.context.user) && !isOwner(event.context.user.uuid, uuid))
        throw forbiddenError;
    }
    return await destroy(event);
  })
);
router.put(
  "/upload-avatar",
  defineEventHandler(async (event) => {
    return await uploadAvatar(event);
  })
);
router.put(
  "/change-password",
  defineEventHandler(async (event) => {
    return await changePasswordService(event);
  })
);
const usersController = useBase("/api/users", router.handler);

export { usersController as u };
//# sourceMappingURL=users.controller.mjs.map

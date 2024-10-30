import { C as useRuntimeConfig, D as validateNewUser, H as H3Error, E as validateNewTransaction, r as readBody, F as generatePassword, G as hashPassword, k as createError, I as getUserByEmail, J as makeUuid, K as sendExitingUserTransaction, L as sendVerifyTransactionEmail, M as requestUserToken, B as getQuery, h as getCookie, j as getUserSession, z as useBase, A as createRouter, d as defineEventHandler, i as isAuthenticated, N as getUserFromAccessToken } from '../runtime.mjs';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { c as canAccessAdmin } from './permissions.helpers.mjs';

const config = useRuntimeConfig();
const prisma = new PrismaClient();
async function createNewTransaction(event) {
  const validationUserError = await validateNewUser(event);
  if (validationUserError instanceof H3Error)
    return validationUserError;
  const validationTransactionError = await validateNewTransaction(event);
  if (validationTransactionError instanceof H3Error)
    return validationTransactionError;
  const body = await readBody(event);
  const generatePassword$1 = await generatePassword();
  const hashedPasswordOrError = await hashPassword(
    generatePassword$1
  );
  if (hashedPasswordOrError instanceof H3Error) {
    console.log("Error hashing password");
    return createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
  }
  const hashedPassword = hashedPasswordOrError;
  let user = {};
  let registrationError = null;
  let password = null;
  let isExist = true;
  const existUser = await getUserByEmail(body.user.email);
  if (existUser === null) {
    await prisma.users.create({
      data: {
        uuid: makeUuid(),
        password: hashedPassword,
        verified_purchase: true,
        ...body.user
      }
    }).then(async (response) => {
      user = response;
    }).catch(async (e) => {
      console.error(e);
      registrationError = e;
    });
    isExist = false;
    password = generatePassword$1;
  } else {
    user = existUser;
    password = "Use previous Password";
    isExist = true;
  }
  if (registrationError)
    throw createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
  const newUser = user;
  let transaction = {};
  let createTransactionError = null;
  await prisma.transactions.create({
    data: {
      user_id: newUser.id,
      status: true,
      ...body.transaction
    }
  }).then(async (response) => {
    transaction = response;
  }).catch(async (err) => {
    console.log(err);
    createTransactionError = err;
  });
  if (createTransactionError)
    throw createError({
      statusCode: 500,
      statusMessage: "Server error"
    });
  const newTransaction = transaction;
  const verifyUser = {
    email: newUser.email
  };
  const emailVerifyToken = jwt.sign(verifyUser, config.iamVerifyTokenSecret, {
    expiresIn: "24h",
    issuer: "NuxtIam",
    jwtid: makeUuid()
  });
  let errorOrSent = null;
  if (isExist) {
    errorOrSent = await sendExitingUserTransaction(
      newUser,
      newTransaction,
      password
    );
  } else {
    errorOrSent = await sendVerifyTransactionEmail(
      newUser,
      newTransaction,
      emailVerifyToken,
      password
    );
  }
  if (errorOrSent instanceof H3Error)
    return errorOrSent;
  return newTransaction;
}
async function getTransactionByOrderID(event) {
  var _a;
  const orderID = (_a = event.context.params) == null ? void 0 : _a.orderID;
  if (!orderID) {
    return createError({
      statusCode: 400,
      statusMessage: "orderID not supplied"
    });
  }
  let transaction = {};
  let errorFindTransaction = null;
  await prisma.transactions.findUnique({
    where: {
      orderID
    }
  }).then(async (result) => {
    transaction = result;
  }).catch(async (err) => {
    errorFindTransaction = err;
  });
  if (errorFindTransaction) {
    return createError({
      statusCode: 500,
      statusMessage: "Error getting one transaction"
    });
  }
  let errorFIndUser = null;
  let user = {};
  await prisma.users.findFirst({
    where: {
      id: transaction.user_id
    }
  }).then(async (response) => {
    user = response;
  }).catch(async (err) => {
    errorFIndUser = err;
  });
  if (errorFIndUser) {
    return createError({
      statusCode: 500,
      statusMessage: "Error getting user"
    });
  }
  const data = {
    email: user == null ? void 0 : user.email,
    transaction
  };
  return data;
}
async function getAllTransactionByUser(event) {
  const validateUserToken = await requestUserToken(event);
  if (validateUserToken instanceof H3Error)
    return validateUserToken;
  const users = validateUserToken;
  let transaction = {};
  let errorFindTransaction = null;
  await prisma.transactions.findMany({
    where: {
      user_id: users.id
    }
  }).then(async (response) => {
    transaction = response;
  }).catch(async (err) => {
    errorFindTransaction = err;
  });
  if (errorFindTransaction) {
    return createError({
      statusCode: 500,
      statusMessage: "Error getting one transaction"
    });
  }
  const data = transaction;
  return data;
}
async function getAllTransaction(event) {
  let transaction = [];
  let error = null;
  const queryParams = getQuery(event);
  let skip = queryParams.skip;
  let take = queryParams.take;
  let search = queryParams.search;
  console.log(parseInt(search));
  await prisma.transactions.findMany({
    skip: parseInt(skip),
    take: parseInt(take),
    where: {
      orderID: {
        contains: search
      }
    },
    orderBy: {
      name: "asc"
    }
  }).then(async (result) => {
    transaction = result;
  }).catch(async (e) => {
    console.error(e);
    error = e;
  });
  if (error) {
    return createError({
      statusCode: 500,
      statusMessage: "Error fetching data transaction"
    });
  }
  const data = transaction;
  return data;
}

async function createNewTransactionService(event) {
  let response = {};
  const transactionError = await createNewTransaction(
    event
  );
  if (transactionError instanceof H3Error) {
    response.status = "fail";
    response.error = transactionError;
    return response;
  }
  const data = transactionError;
  response.status = "success";
  response.data = {
    data
  };
  return response;
}
async function getTransactionByOrderIDService(event) {
  let response = {};
  const findOrderOrError = await getTransactionByOrderID(
    event
  );
  if (findOrderOrError instanceof H3Error) {
    response.status = "fail";
    response.error = findOrderOrError;
    return response;
  }
  const data = findOrderOrError;
  response.status = "success";
  response.data = {
    data
  };
  return response;
}
async function getAllTransactionUserService(event) {
  let response = {};
  const transaction = await getAllTransactionByUser(event);
  if (transaction instanceof H3Error) {
    response.status = "fail";
    response.error = transaction;
    return response;
  }
  const data = transaction;
  response.status = "success";
  response.data = data;
  return response;
}
async function getAllTransactionService(event) {
  let response = {};
  let sessionOrError = {};
  const getTransaction = await getAllTransaction(event);
  if (getTransaction instanceof H3Error) {
    response.status = "fail", response.error = getTransaction;
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
  const data = getTransaction;
  response.status = "success";
  response.data = {
    data,
    csrf_token: session.csrf_token
  };
  return response;
}

const router = createRouter();
const userNotFoundError = createError({
  statusCode: 401,
  statusMessage: "Unauthorized. User not found."
});
const forbiddenError = createError({
  statusCode: 403,
  statusMessage: "Forbidden"
});
createError({
  statusCode: 403,
  statusMessage: "Missing or invalid csrf token"
});
router.post(
  "/create",
  defineEventHandler(async (event) => {
    return await createNewTransactionService(event);
  })
);
router.get(
  "/:orderID",
  defineEventHandler(async (event) => {
    return await getTransactionByOrderIDService(event);
  })
);
router.get(
  "/all",
  defineEventHandler(async (event) => {
    const authenticated = await isAuthenticated(event);
    if (authenticated instanceof H3Error)
      throw forbiddenError;
    if (authenticated === false)
      throw forbiddenError;
    const userOrNull = await getUserFromAccessToken(event);
    if (userOrNull === null) {
      throw createError({
        statusCode: 401,
        statusMessage: "Unauthorized. Missing access token."
      });
    }
    event.context.user = userOrNull;
    if (!event.context.user)
      throw userNotFoundError;
    if (!canAccessAdmin(event.context.user))
      throw forbiddenError;
    return await getAllTransactionService(event);
  })
);
router.get(
  "/user-all",
  defineEventHandler(async (event) => {
    return await getAllTransactionUserService(event);
  })
);
const transactionController = useBase("/api/transaction", router.handler);

export { transactionController as t };
//# sourceMappingURL=transaction.controller.mjs.map

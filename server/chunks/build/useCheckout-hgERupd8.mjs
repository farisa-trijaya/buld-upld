function useCheckout() {
  return {
    createTransaction,
    verifyEmailToken,
    isAuthenticated,
    login,
    logout,
    updateProfile,
    getProfile,
    refresh,
    deleteAccount,
    resetPassword,
    verifyReset,
    verifyEmail,
    getTransactionByOrderID,
    getAllTransactionUser,
    uploadAvatar,
    changePassword
  };
}
async function createTransaction(user, transaction) {
  const response = await $fetch("/api/transaction/create", {
    method: "POST",
    headers: {
      "client-platform": "browser"
    },
    body: { user, transaction }
  });
  return response;
}
async function verifyEmailToken(token) {
  const response = await $fetch("/api/auth/verify-email-token", {
    method: "POST",
    headers: {
      "client-platform": "browser"
    },
    body: {
      token
    }
  });
  return response;
}
async function isAuthenticated() {
  const { status } = await $fetch("/api/auth/is-authenticated", {
    headers: {
      "client-platform": "browser"
    }
  });
  return status === "success";
}
async function login(email, password) {
  const response = await $fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "client-platform": "browser"
    },
    body: {
      email,
      password
    }
  });
  return response;
}
async function logout() {
  const response = await $fetch("/api/auth/logout", {
    method: "POST",
    headers: {
      "client-platform": "browser"
    }
  });
  return response;
}
async function updateProfile(user) {
  const response = await $fetch("/api/auth/update", {
    method: "PUT",
    headers: {
      "client-platform": "browser"
    },
    body: user
  });
  return response;
}
async function getProfile() {
  const response = await $fetch("/api/auth/profile", {
    headers: {
      "client-platform": "browser"
    }
  });
  return response;
}
async function refresh() {
  const response = await $fetch("/api/auth/refresh", {
    method: "POST",
    headers: {
      "client-platform": "browser"
    }
  });
  return response;
}
async function deleteAccount(uuid, csrfToken) {
  const response = await $fetch("/api/auth/delete", {
    method: "DELETE",
    headers: {
      "client-platform": "browser"
    },
    body: {
      uuid,
      csrf_token: csrfToken
    }
  });
  return response;
}
async function resetPassword(email) {
  const response = await $fetch("/api/auth/reset", {
    method: "POST",
    headers: {
      "client-platform": "browser"
    },
    body: {
      email
    }
  });
  return response;
}
async function verifyReset(token) {
  const response = await $fetch("/api/auth/verify-reset", {
    method: "POST",
    headers: {
      "client-platform": "browser"
    },
    body: {
      token
    }
  });
  return response;
}
async function verifyEmail(email) {
  const response = await $fetch("/api/auth/verify-email", {
    method: "POST",
    headers: {
      "client-platform": "browser"
    },
    body: {
      email
    }
  });
  return response;
}
async function getTransactionByOrderID(orderID) {
  const response = await $fetch(`/api/transaction/${orderID}`, {
    method: "GET",
    headers: {
      "client-platform": "browser"
    }
  });
  return response;
}
async function getAllTransactionUser() {
  const response = await $fetch("/api/transaction/user-all", {
    method: "GET",
    headers: {
      "client-platform": "browser"
    }
  });
  return response;
}
async function uploadAvatar(file) {
  const body = new FormData();
  body.append("file", file, file.name);
  const response = await $fetch("/api/users/upload-avatar", {
    method: "PUT",
    headers: {
      "client-platform": "browser"
    },
    body
  });
  return response;
}
async function changePassword(data) {
  const response = await $fetch("/api/users/change-password", {
    method: "PUT",
    headers: {
      "client-platform": "browser"
    },
    body: data
  });
  return response;
}

export { useCheckout as u };
//# sourceMappingURL=useCheckout-hgERupd8.mjs.map

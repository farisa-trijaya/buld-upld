function canAccessAdmin(user) {
  if (user.role === "SUPER_ADMIN" && user.email_verified)
    return true;
  return false;
}
function hasPermission(user, permission) {
  const permissions = {
    "can-access-admin": canAccessAdmin(user)
  };
  if (permission in permissions === false) {
    console.log(`No such permission as "${permission}"`);
    return false;
  } else {
    return permissions[permission];
  }
}

export { canAccessAdmin as c, hasPermission as h };
//# sourceMappingURL=permissions.helpers.mjs.map

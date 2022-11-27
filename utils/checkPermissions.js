import { UnauthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  // can setup admin functionality here
  // if (requestUser.role === 'admin') return

  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnauthenticatedError(
    "You are not authorized to access this route."
  );
};

export default checkPermissions;

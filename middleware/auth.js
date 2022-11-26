import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid.");
  }

  // Grab token from authHeader
  const token = authHeader.split(" ")[1];

  try {
    // verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);

    // attach user to payload object
    req.user = { userId: payload.userId };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid.");
  }
};

export default auth;

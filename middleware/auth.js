import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  console.log(req.cookies);

  // const authHeader = req.headers.authorization;

  // if (!authHeader || !authHeader.startsWith("Bearer")) {
  //   throw new UnauthenticatedError("Authentication Invalid.");
  // }

  // // Grab token from authHeader
  // const token = authHeader.split(" ")[1];

  // Set up cookies for auth
  const token = req.cookies.token;

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid.");
  }

  try {
    // verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload);

    const testUser = payload.userId === "6385518d17be59403471e861";

    // attach user to payload object
    req.user = { userId: payload.userId, testUser };

    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid.");
  }
};

export default auth;

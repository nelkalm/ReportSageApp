import express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit";

import { register, login, updateUser } from "../controllers/authController.js";

import authenticateUser from "../middleware/auth.js";
import testUser from "../middleware/testUser.js";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message:
    "Too many requestions from this IP address. Please try again after 15 minutes.",
});

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.route("/update").patch(authenticateUser, testUser, updateUser);

export default router;

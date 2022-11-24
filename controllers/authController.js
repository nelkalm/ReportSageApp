import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

// Set up next() to pass error handling to the error-handler middleware
const register = async (req, res) => {
  const { firstName, lastName, email, password, programType } = req.body;

  if (!firstName || !lastName || !email || !password || !programType) {
    throw new BadRequestError("Please provide all values.");
  }

  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use.");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    programType,
  });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      programType: user.programType,
    },
    token,
    programType: user.programType,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values.");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials.");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials.");
  }

  const token = user.createJWT();
  user.password = undefined;

  res
    .status(StatusCodes.OK)
    .json({ user, token, programType: user.programType });
};

const updateUser = async (req, res) => {
  res.send("update user");
};

export { register, login, updateUser };

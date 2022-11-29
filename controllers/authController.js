import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import attachCookies from "../utils/attachCookies.js";

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

  attachCookies({ res, token });

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      programType: user.programType,
    },
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

  // Initiate cookie to store JWT token
  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({ user, programType: user.programType });
};

const updateUser = async (req, res) => {
  const { email, firstName, lastName, programType } = req.body;

  if (!firstName || !lastName || !email || !programType) {
    throw new BadRequestError("Please provide all values.");
  }

  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.firstName = firstName;
  user.lastName = lastName;
  user.programType = programType;

  await user.save();

  const token = user.createJWT();

  attachCookies({ res, token });

  res.status(StatusCodes.OK).json({ user, programType: user.programType });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, programType: user.programType });
};

export { register, login, updateUser, getCurrentUser };

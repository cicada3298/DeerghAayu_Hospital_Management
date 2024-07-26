import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";

export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    adhaarNo,
    dob,
    gender,
    password,
    role,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !adhaarNo ||
    !dob ||
    !gender ||
    !password ||
    !role
  ) {
    return next(new ErrorHandler("Please fill full form!", 400));
  }
  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already registered", 400));
  }
  user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    adhaarNo,
    dob,
    gender,
    password,
    role,
  });
  generateToken(user,"Registered successfullly",200,res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, confirmPassword, role } = req.body;
  if (!email || !password || !confirmPassword || !role) {
    return next(new ErrorHandler("Please provide all the details!", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and Confirm Password do not match!", 400)
    );
  }
  let user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Incorrect credentials!", 400));
  }
  const isPasswordMatched = await user.comparePasswords(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Incorrect credentials!", 400));
  }
  if (role !== user.role) {
    return next(new ErrorHandler("User with this role not found!", 400));
  }
  generateToken(user,"Logged In successfully",200,res);
});

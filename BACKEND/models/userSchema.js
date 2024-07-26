import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain 3 characters"],
  },
  lastName: {
    type: String,
    required: false,
    minLength: [3, "Last Name should contain at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [10, "Phone number must contain exactly 11 digits"],
    maxLength: [10, "Phone number must contain exactly 11 digits"],
  },
  adhaarNo: {
    type: String,
    required: true,
    minLength: [12, "Adhaar number must contain exactly 12 digits"],
    maxLength: [12, "Adhaar number must contain exactly 12 digits"],
  },
  dob: {
    type: Date,
    required: [true, "DOB is required"],
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Transgender", "Prefer not to say"],
  },
  password: {
    type: String,
    required: [true, "Password Is Required!"],
    minLength: [8, "Password Must Contain At Least 8 Characters!"],
    select: false,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      "Password must be a combination of lowercase, uppercase letter and digits!",
    ],
  },
  role: {
    type: String,
    required: true,
    enum: ["Patient", "Admin", "Doctor"],
  },
  Department: {
    type: String,
  },
  docAvatar: {
    public_id: String,
    url: String,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePasswords = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

export const User = mongoose.model("User", userSchema);

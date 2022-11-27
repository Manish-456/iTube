import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user)
      return next(createError(400, "User with this email already exists"));
    if (req.body.confirmPassword !== req.body.password) {
      return next(createError(403, "Password does not match"));
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).json("user has been created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) return next(createError(400, "Invalid Password"));

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET
    );
    const { password, ...others } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

// todo
export const googleAuth = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(user._doc);
  } else {
    const newUser = new User({
      ...req.body,
      fromGoogle: true,
    });

    try {
      const savedUser = await newUser.save();
      const newToken = jwt.sign(
        {
          id: savedUser._id,
        },
        process.env.JWT_SECRET
      );

      res
        .cookie("access_token", newToken, {
          httpOnly: true,
        })
        .json(savedUser);
    } catch (err) {
      next(err);
    }
  }
};

export const logOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token").send("logged out successfully");
  } catch (error) {
    next(error);
  }
};

import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility_class.js";
import { TryCatch } from "../middleware/error.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    // throw Error("mere throw vala error");
    // return next(new ErrorHandler("mera error hai bhai", 400));
    const { name, dob, _id, email, gender, photo } = req.body;
    // if (!_id || !name || !email || !gender || !dob)
    if (!_id || !name || !email || !gender)
      return next(new ErrorHandler("Please fill all user details", 400));
    let user = await User.findById(_id);
    if (user)
      return res.status(200).json({
        sucess: true,
        message: `Welcome ${user.name}`,
      });

    user = await User.create({
      _id,
      name,
      dob: new Date(dob),
      email,
      gender,
      photo,
    });

    return res.status(201).json({
      success: true,
      message: `Welcome ${user.name} `,
    });
  }
);
export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});
  return res.status(200).json({
    sucess: true,
    users,
  });
});
export const getUserById = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user)
    return next(new ErrorHandler("Invalid ID or User does not exits", 400));
  return res.status(200).json({
    sucess: true,
    user,
  });
});
export const deleteUserById = TryCatch(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user)
    return next(new ErrorHandler("Invalid ID or User does not exits", 400));

  await user.deleteOne();

  return res.status(200).json({
    sucess: true,
    message: "User deleted Successfuly",
  });
});

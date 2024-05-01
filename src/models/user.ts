import mongoose, { Schema } from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string;
  photo: string;
  name: string;
  email: string;
  gender: "male" | "female";
  dob: Date;
  role: "admin" | "user";
  createdAt: Date;
  updatedAt: Date;
  age: number;
}
const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: [true, "Please Enter UID"],
    },
    photo: {
      type: String,
      required: [true, "Please Add Photo "],
    },
    name: {
      type: String,
      required: [true, "Please Enter Name"],
    },

    email: {
      type: String,
      required: [true, "Please Enter EmailID"],
      unique: [true, "EmailID Already Exist"],
      validate: validator.default.isEmail,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please Select Gender"],
      default: "male",
    },
    dob: {
      type: Date,
      required: [true, "Please Enter DateOfBirth"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
schema.virtual("age").get(function (this: { dob: Date }) {
  const today = new Date();
  const dob = this.dob;
  let age = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  {
    return age;
  }
});
export const User = mongoose.model<IUser>("Users", schema);

import express from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserById,
  newUser,
} from "../controller/user.js";
import { adminOnly } from "../middleware/auth.js";

const app = express.Router();
// route - /api/v1/user/new
app.post("/new", newUser);
// Route - /api/v1/user/all
app.get("/all", adminOnly, getAllUsers);

// app.get("/:id", getUserById);
// app.delete("/:id", deleteUserById);

// Route - /api/v1/user/dynamicID
app.route("/:id").get(getUserById).delete(adminOnly, deleteUserById);

export default app;

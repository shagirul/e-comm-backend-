import express from "express";
import { adminOnly } from "../middleware/auth.js";
import {
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getAllProducts,
  getSingleProduct,
  getlatestProducts,
  newProduct,
  updateProduct,
} from "../controller/product.js";
import { singleUpload } from "../middleware/multer.js";
import uploadToStorageMiddleware from "../middleware/uploadToStorage.js";

const app = express.Router();

//To Create New Product  - /api/v1/product/new
// app.post("/new", adminOnly, singleUpload, newProduct);
app.post(
  "/new",
  adminOnly,
  singleUpload,
  uploadToStorageMiddleware,
  newProduct
);

//To get all Products with filters  - /api/v1/product/all
app.get("/all", getAllProducts);

//To get last 10 Products  - /api/v1/product/latest
app.get("/latest", getlatestProducts);

//To get all unique Categories  - /api/v1/product/categories
app.get("/categories", getAllCategories);

//To get all Products   - /api/v1/product/admin-products
app.get("/admin-products", adminOnly, getAdminProducts);

// To get, update, delete Product
app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, uploadToStorageMiddleware, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;

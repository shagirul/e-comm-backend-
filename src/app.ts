import express from "express";
import UserRoutes from "./routes/user.js";
import ProductRoutes from "./routes/product.js";
import OrderRoutes from "./routes/order.js";
import PaymentRoutes from "./routes/payment.js";
import DashBoardRoutes from "./routes/stats.js";
import { connectDB } from "./utils/feature.js";
import { errorMiddleWare } from "./middleware/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";
import Stripe from "stripe";
import cors from "cors";

config({
  path: "./.env",
});

const PORT = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";

connectDB(mongoURI);
export const stripe = new Stripe(stripeKey);
export const myCache = new NodeCache();

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// app.get("/", (req, res) => {
//   res.send("API Working With /API/v1");
// });

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/product", ProductRoutes);
app.use("/api/v1/order", OrderRoutes);
app.use("/api/v1/payment", PaymentRoutes);
app.use("/api/v1/dashboard", DashBoardRoutes);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleWare);

app.listen(PORT, () => {
  console.log(`server is working on port http://localhost:${PORT}`);
});

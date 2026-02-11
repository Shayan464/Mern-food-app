import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./config/routes/foodRoute.js";
import userRouter from "./config/routes/userRoute.js";
import dotenv from "dotenv";
import cartRouter from "./config/routes/CartRoute.js";
import orderRouter from "./config/routes/orderRoute.js";

// Load environment variables
dotenv.config();
console.log("🔑 JWT Secret Loaded:", process.env.JWT_SECRET ? "Yes" : "No");

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to DB
connectDB();

// Routes
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use('/api/cart',cartRouter)
app.use("/api/orders",orderRouter)

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`✅ Server Started on http://localhost:${port}`);
  console.log(`🔑 JWT Secret Loaded: ${process.env.JWT_SECRET ? "Yes" : "No"}`);
});


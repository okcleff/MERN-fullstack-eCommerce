import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import productRoutes from "./routes/productRoutes";
import { notFound, errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get("/", (_, res) => res.send("API is running..."));

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
});

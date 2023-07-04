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

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.get("/", (_, res) => res.send("API is running..."));

app.use("/api/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
});

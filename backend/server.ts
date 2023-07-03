import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";

import { PRODUCTS } from "./data/products";
dotenv.config();

connectDB();

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.get("/", (_, res) => res.send("API is running..."));

app.get("/api/products", (_, res) => res.json(PRODUCTS));

app.get("/api/products/:productsId", (req, res) => {
  const product = PRODUCTS.find((p) => p._id === req.params.productsId);
  res.json(product);
});

app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
});

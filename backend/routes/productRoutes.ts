import express from "express";
import checkObjectId from "../middleware/checkObjectId";
import { getProducts, getProductById } from "../controllers/productController";

const router = express.Router();

router.route("/").get(getProducts);

router.route("/:id").get(checkObjectId, getProductById);

export default router;

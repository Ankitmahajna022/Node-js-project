import express from "express";
import { getProduct, addProduct, updateProduct, deleteProduct } from "../controllers/fashionControllers.js";

const router = express.Router(); 

router.post("/", addProduct);
router.get("/", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;

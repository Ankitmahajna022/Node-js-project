import express from "express"
import {getProducts,createProducts,updatedProdutcs,deletedProdutcs} from "../controllers/productController.js"
import { upload } from "../middleware/upload.js"

const router=express.Router()

router.get("/",getProducts)
router.post("/",upload.single("image"),createProducts)
router.put("/:id",upload.single("image"),updatedProdutcs)
router.delete("/:id",deletedProdutcs)

export default router 


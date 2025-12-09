import express from "express";
import {getAllProducts,getAllProductById,searchByBrand,searchByName,searchMultipleFields,getByCategory,priceRangeFilter,sortProducts,paginateProducts,ratingFilter,advancedFilter} from "../controllers/productControllers.js"

const router=express.Router()

router.get("/", getAllProducts);
router.get("/id/:id", getAllProductById);
router.get("/search/name", searchByName);
router.get("/search/brand", searchByBrand);
router.get("/search/multi", searchMultipleFields);
router.get("/category", getByCategory);
router.get("/price", priceRangeFilter);
router.get("/rating", ratingFilter);
router.get("/sort", sortProducts);
router.get("/pagination", paginateProducts);
router.get("/filter", advancedFilter);

export default router
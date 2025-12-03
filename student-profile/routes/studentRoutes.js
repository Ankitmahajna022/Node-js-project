import express from 'express'
import { addStudent,getStudents,getStudent,updateImage,deleteImage } from '../controllers/studentControllrs.js'
import { uploadWithUrl } from '../middleware/upload.js'
import e from 'express'


const router=express.Router()

router.get("/",getStudents)
router.get("/:id",getStudent)
router.post("/add",addStudent)
router.put("/update-image/:id",updateImage)
router.delete("/delete-image/:id",deleteImage)


export default router

import express from "express"
import { deleteStudent, getStudent, getStudentById, studentCreate, updatedStudent } from "../controllers/studentControllers.js"

const router=express.Router()

router.get("/",getStudent)
router.get("/:id",getStudentById)
router.post("/",studentCreate)
router.put("/:id",updatedStudent)
router.delete("/:id",deleteStudent)

export default router
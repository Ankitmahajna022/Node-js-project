import { Student } from "../models/sutdentModel.js"
import fs from "fs"

export const addStudent = async (req, res) => {
    try {
        const student = new Student({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        profileImage: req.file?.filename || null,
        path: req.file?.path || null,
        filePathUrl: req.file?.filePathUrl || null
    })

    await student.save()
    res.status(201).json({ message: "Student Added Successfully", student });
    } catch (error) {
        res.status(500).json({error: err.message})
    }
}

export const getStudents=async(req,res)=>{
    const students= await Student.find();
    res.json(students)
}

export const getStudent=async(req,res)=>{
    const student=await Student.fidById(req.body.params.id)

    if(!student)return res.status(404).json({message:"student not found..!"})
    res.json(student)
}

export const updateImage=async(req,res)=>{
    try {
        const student=await Student.fidById(req.body.params.id)
        if(!student)return res.status(404).json({message:"student not found..!"})
        
        if(student.path && fs.existsSync(student.path)){
            fs.unlinkSync(student.params)
        }
        student.profileImage = req.file.filename;
        student.path = req.file.path;
        student.filePathUrl = req.file.filePathUrl; 
        await student.save()

        student.json({message: "Profile Image Updated",student})
    } catch (error) {
        student.status(500).json({error:err.message})
    }
}


export const deleteImage=async(req,res)=>{
    try {
        const student=await Student.fidById(req.body.params)
        if(!student)return res.status(404).json({message:"student not found..!"})

        if (student.path && fs.existsSync(student.path)) {
            fs.unlinkSync(student.path);
        }

        student.profileImage = null;
        student.path = null;
        student.filePathUrl = null;
        await student.save()
        student.json({message: "Profile Image Deleted",student})      
    } catch (error) {
        student.status(500).json({error:err.message})
    }
}
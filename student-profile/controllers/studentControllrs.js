import { Student } from "../models/sutdentModel.js";
import fs from "fs";

export const addStudent = async (req, res) => {
  try {
    const filePathUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    const student = await Student.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      profileImage: req.file?.filename || null,
      path: req.file?.path || null,
      filePathUrl,
    });

    res.status(201).json({ message: "Student Added Successfully", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ message: "Student not found!" });

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateImage = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ message: "Student not found!" });

    if (student.path && fs.existsSync(student.path)) {
      fs.unlinkSync(student.path);
    }

    student.profileImage = req.file.filename;
    student.path = req.file.path;
    student.filePathUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/${req.file.filename}`;

    await student.save();
    res.json({ message: "Profile Image Updated", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student)
      return res.status(404).json({ message: "Student not found!" });

    if (student.path && fs.existsSync(student.path)) {
      fs.unlinkSync(student.path);
    }

    student.profileImage = null;
    student.path = null;
    student.filePathUrl = null;
    await student.save();

    res.json({ message: "Profile Image Deleted", student });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

import Student from "../models/studentModel.js"


export const studentCreate = async (req, res) => {
    try {

        const student = await Student.create(req.body)
        res.json(student)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getStudent = async (req, res) => {
    try {
        const student = await Student.find()
        res.json(student)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)

        res.json(student)
    } catch (error) {
        res.json({ message: error.message })
    }
}

export const updatedStudent=async(req,res)=>{
  try {
    const student=await Student.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )

    res.json(student)
  } catch (error) {
     res.json({ message: error.message })
  }
}

export const deleteStudent=async(req,res)=>{
  try {
    await Student.findByIdAndDelete(req.params.id)

    res.json({message:"Deleted ....!"})
  } catch (error) {
     res.json({ message: error.message })
  }
}
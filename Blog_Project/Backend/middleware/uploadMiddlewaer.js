import  multer from "multer"

const storage=multer.diskStorage({
    disconnect:(res,file,cb)=>{
        cb(null,"backend/uploads/blogs")
    },
    filename:(res,file,cb)=>{
        cb(null,Data.now(),"-" + file.originalname)
    }
})

 export const upload=multer({storage})
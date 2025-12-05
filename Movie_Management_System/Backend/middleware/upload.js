import multer from "multer"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"


const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

const uploadsDir = path.resolve(__dirname, "../uploads");

if(!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir,{recursive:true})
}

const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,uploadsDir)
    },
    filename:(req,res,cb)=>{

        const ext=path.extname(res.originalname)
        const uniqueName=res.fieldname+"-"+Date.now()+ext
        cb(null,uniqueName)
    }
})

const fileFilter=(req,res,cb)=>{
    const allowed=/jpeg|jpg|png|gif/
    const ext=path.extname(res.originalname).toLowerCase;

    if(allowed.test(ext))
    {
        cb(null,true)
    }
    else
    {
        cb(new Error("Only images are allowed (jpeg, jpg, png, gif)"));
    }
}

export  const upload=multer({
    storage,
    fileFilter,
    limits:{fieldSize:5*1024*1024}
})
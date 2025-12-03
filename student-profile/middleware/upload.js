import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename=fileURLToPath(import.meta.url)
const __diraname=path.dirname(__filename)
const upoladPath=path.join(__diraname,".." ,"upoads")


const storage=multer.diskStorage({
    destination:(req,res,cb)=>{
        cb(null,upoladPath)
    },
    filename:(req,res,cb)=>{
         cb(null, Date.now() + path.extname(file.originalname));
    }
})

const upload=multer({ storage }).single("profileImage")

export const uploadWithUrl = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) return res.status(400).json({ error: err.message });

        if (req.file) {
            req.file.filePathUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        next();
    });
};
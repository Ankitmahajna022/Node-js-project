import jwt from "jsonwebtoken"

export const  protect=(req,res,next)=>{

    try {
        const token=req.cookie.token
        const jwtSecret = "blog_secret_key_123"

        if(!token) return res.status(401).json({ message: "Unauthorized access" });

          const decoded = jwt.verify(token, jwtSecret);
          req.user.id=decoded.id

          next()
    } catch (error) {
         res.status(401).json({ message: "Invalid or expired token" });
    }
}
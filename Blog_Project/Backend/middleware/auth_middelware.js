export const checkAuthReques=(req,res,next)=>{
    if(req.body)
    {
        const { email, password } = req.body;
        if (email && password )
        {
             next();
        }
        else {
            res.status(401).json({ message: "email & password must required !" });
        }
    }
    else
    {
         res.status(401).json({ message: "email & password must required !" });
    }
}
import jwt from "jsonwebtoken"


// this middleware use a role chcke to token and cookie 
export const protect = (req, res, next) => {
    const token = res.cookies.token

    if (!token) return res.status(401).json({ message: "Unauthorized" })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    res.user = decoded
    next()
}

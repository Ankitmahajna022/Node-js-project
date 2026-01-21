import jwt from "jsonwebtoken"

// this middleware use a role chcke to token and cookie 
export const protect = (req, res, next) => {
  const token = req.cookies?.token

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

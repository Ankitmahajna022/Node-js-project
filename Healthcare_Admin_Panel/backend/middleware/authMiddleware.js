export const protect = async (req, res, next) => {
  try {
    // check if cookies exist
    if (!req.cookies || !req.cookies.token) {
      return res.status(401).json({ message: "Not authorized, token missing" })
    }

    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const user = await Auth.findById(decoded.id).select("-password")
    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    req.user = user
    next()

  } catch (error) {
    return res.status(401).json({ message: "Invalid token" })
  }
}

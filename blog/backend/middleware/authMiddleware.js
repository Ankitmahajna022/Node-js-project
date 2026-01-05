import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: "Unauthorized: Login first" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Invalid token" });

    req.user = user;
    next();
  });
};

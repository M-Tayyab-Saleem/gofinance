import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, Login again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.body.userId = decoded.id;
    } else {
      return res.status(401).json({ message: "Unauthorized, Login again" });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, Login again" });
  }
};

export default userAuth;



import jwt from "jsonwebtoken";

const isAutenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // 'await' ki zaroorat nahi hai, jwt.verify synchronous hota hai
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        message: "Invalid Token",
        success: false,
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log("Authentication error:", error);
    return res.status(401).json({
      message: "User not authenticated",
      success: false,
    });
  }
};

export default isAutenticated;
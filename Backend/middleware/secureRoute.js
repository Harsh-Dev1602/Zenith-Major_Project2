import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Admin from "../models/admin.model.js";

const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.Zenith_key;
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }
    const decoded = jwt.verify(token,process.env.JWT_KEY);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password") || await Admin.findById(decoded.userId).select("-password"); // current loggedin user
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default secureRoute;
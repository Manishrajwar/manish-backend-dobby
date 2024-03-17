const jwt = require("jsonwebtoken");
require("dotenv").config();

// auth
exports.auth = async (req, res, next) => {
  try {
    //  extract token
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");
    // if token missing , then return response
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token is missing",
      });
    }

    // verify the token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (error) {
      console.log(`error in auth middleware `, error);
      return res.status(401).json({
        success: false,
        message: `token in invalid`,
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: `something went wrong while validating the token`,
    });
  }
};


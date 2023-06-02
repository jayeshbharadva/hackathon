const jwt = require("jsonwebtoken");

const validateToken = async function(req, res, next) {
  let token;
  let authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    
    if (token === undefined) {
      return res.status(404).json({
        msg: "Token is undefined",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      
      if (decoded.role === "Student") {
        res.user = decoded;
        next();
      } else {
        console.log("You are not authorized to access this URL");
        return res.status(403).json({
          msg: "You are not authorized to access this URL",
        });
      }
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        console.log("Token has expired");
        return res.status(401).json({
          msg: "Token has expired",
        });
      } else {
        console.log(err);
        return res.status(500).json({
          msg: "Internal Server Error",
        });
      }
    }
  } else {
    return res.status(401).json({
      msg: "Authorization header not found",
    });
  }
};

module.exports = validateToken;

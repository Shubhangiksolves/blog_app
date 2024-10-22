const { getUserJwt } = require("./JwtAuth");

const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.token?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = getUserJwt(token);
  if (!user) {
    return res.status(403).json({ message: "Invalid token" });
  }
  req.user = user;
  next();
};

module.exports = authenticate;
const { CONSTANTS } = require("../constants/constant");
const { getUserJwt } = require("../services/JwtAuth");

const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.token?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: CONSTANTS.MIDDLEWARE.UNAUTHORIZED_USER});
  }
  const user = getUserJwt(token);
  if (!user) {
    return res.status(403).json({ message: CONSTANTS.MIDDLEWARE.INVALID_TOKEN });
  }
  req.user = user;
  next();
};

module.exports = authenticate;
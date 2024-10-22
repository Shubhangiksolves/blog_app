const { getUserJwt } = require('./JwtAuth');

const authenticate = (req, res, next) => {
  const token = req.cookies.token || req.headers.token?.split(' ')[1]; // Token can be in cookies or Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = getUserJwt(token);

  if (!user) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  req.user = user; // Set the authenticated user in the request object
  next(); // Proceed to the next middleware/route handler
};

module.exports = authenticate;

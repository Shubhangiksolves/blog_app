const router = require("express");
const controller = require("../controllers/UserController");
const authenticate = require("../services/Auth");

const route = router();

route.get("/protected-route", authenticate, (req, res) => {
  res.status(200).json({ message: "Access granted", user: req.user });
});
route.post("/signup", controller.createUser);
route.post("/login", controller.loginUser);

module.exports = route;

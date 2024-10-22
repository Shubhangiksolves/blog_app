const router = require("express");
const controller = require("../controllers/UserController");

const route = router();

route.post("/signup", controller.createUser);
route.post("/login", controller.loginUser);

module.exports = route;

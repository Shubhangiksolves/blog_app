const router = require("express");
const controller = require("../controllers/UserController");
const { CONSTANTS } = require("../constants/constant");

const route = router();

route.post(CONSTANTS.API_CONFIG.SIGNUP_USER, controller.createUser);
route.post(CONSTANTS.API_CONFIG.LOGIN_USER, controller.loginUser);
route.get(CONSTANTS.API_CONFIG.GET_USERS, controller.getAllUsers)

module.exports = route;

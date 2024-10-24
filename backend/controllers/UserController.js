const { CONSTANTS } = require("../constants/constant");
const knex = require("../db/knex");
const { setUserJwt } = require("../services/JwtAuth");

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await knex("users").where({ email }).first();
    if (existingUser && email) {
      return res.status(400).json({ message: CONSTANTS.API_MSGS.EMAIL_WARNING });
    } else if (!name || !email || !password) {
      return res.status(400).json({ message: CONSTANTS.API_MSGS.REQUIRED_FIELDS });
    }
    await knex("users").insert({ name, email, password, role });
    return res.status(201).json({ message: CONSTANTS.API_MSGS.USER_CREATED });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: CONSTANTS.API_MSGS.SERVER_ERROR });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await knex("users").where({ email, password }).first();
    if (!student) {
      return res.status(400).json({ message: CONSTANTS.API_MSGS.INVALID_EMAIL_PASS });
    } else {
      const token = setUserJwt(student);
      res.cookie("token", token);
      return res.status(200).json({ message: CONSTANTS.API_MSGS.LOGIN_SUCCESS, token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: CONSTANTS.API_MSGS.SERVER_ERROR });
  }
};

const getAllUsers = async (req, res) => {
  try{
    const users = await knex.select().from("users");
    res.status(201).json(users);  
  }
  catch(error){
    console.error(error);
    return res.status(500).json({ message: CONSTANTS.API_MSGS.CANNOT_GET_USERS});
  }
}

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
};

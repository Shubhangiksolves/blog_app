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
const searchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    const users = await knex("users")
      .where("name", "like", `%${query}%`)
      .orWhere("email", "like", `%${query}%`);
    if (users.length === 0) {
      return res.status(404).json({ message: CONSTANTS.API_MSGS.NO_USER });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: CONSTANTS.API_MSGS.SERVER_ERROR });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  console.log("idd--", userId);
  
  try {
    const user = await knex("users").where({ id: userId }).first();
    if (!user) {
      return res.status(404).json({ message: CONSTANTS.API_MSGS.NO_USER });
    }
    await knex("users").where({ id: userId }).del();
    return res.status(200).json({ message: CONSTANTS.API_MSGS.USER_DELETED });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: CONSTANTS.API_MSGS.SERVER_ERROR });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  searchUsers,
  deleteUser,
};

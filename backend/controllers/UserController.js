const knex = require("../db/knex");
const { setUserJwt } = require("../services/JwtAuth");

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await knex("users").where({ email }).first();
    if (existingUser && email) {
      return res.status(400).json({ message: "Email already exists" });
    } else if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await knex("users").insert({ name, email, password, role });
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await knex("users").where({ email, password }).first();
    if (!student) {
      return res.status(400).json({ message: "Invalid email or password" });
    } else {
      const token = setUserJwt(student);
      res.cookie("token", token);
      return res.status(200).json({ message: "Login successful", token });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  loginUser,
};

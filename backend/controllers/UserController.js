const knex = require("../db/knex");
const { setUserJwt } = require("../services/JwtAuth");

const createUser = async(req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await knex('users').where({ email }).first();

        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Insert new user
        await knex('users').insert({ name, email, password, role });
        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const loginUser = async(req, res) => {
    const { email, password} = req.body;
    const student = await knex('users').where({ email, password }).first();
    if(!student){
        return res.status(400).json({ message: "Invalid email or password" })
    }
   else {    
    const token = setUserJwt(student);
    res.cookie('token', token);
    return res.status(200).json({ message: "Login successful", token });
}
} 

module.exports = {
    createUser,
    loginUser
}
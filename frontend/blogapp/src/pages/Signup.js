import React, {useState} from "react";
import axios from "axios";
import { InputField } from "../components/shared/InputField";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const handleSignUp = async(e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8000/signup",
                {
                    name,
                    email,
                    password,
                    role,
                },
                {
                    headers: {
                        "Content-Type": "application/json", // Use JSON for data submission
                    },
                }
            );
            setName('');
            setEmail('');
            setPassword('');
            setRole('');
            console.log(res); 
            return res;
        } catch (error) {
            console.error("Error during sign up:", error);
        }
    }
    
  return (
    <div className="d-flex align-items-center justify-content-center w-100">
      <form class="row g-3 w-50" onSubmit={handleSignUp}>
        <div class="col-12">
          <InputField
            type="text"
            name="username"
            placeholder="Enter full name"
            label="Name"
            value={name}
            onInputChange={(e) => setName(e.target.value)}
          />
        </div>
        <div class="col-12">
          <InputField
            type="email"
            name="email"
            placeholder="Enter email"
            label="Email"
            onInputChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div class="col-12">
          <InputField
            type="password"
            name="password"
            placeholder="Enter password"
            label="Password"
            onInputChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div class="col-12">
          <label for="inputRole" class="form-label">
            Role
          </label>
          <select value={role} id="inputRole" class="form-select" onChange = {(e) => setRole(e.target.value)}>
            <option selected>Choose Role</option>
            <option>Admin</option>
            <option>Public User</option>
          </select>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

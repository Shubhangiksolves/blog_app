import React, {useState} from "react";
import axios from "axios";
import { InputField } from "../components/shared/InputField";
import { useNavigate } from "react-router-dom";
import Notification from "../components/shared/Notification";

const Login = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [notification, setNotification] = useState({
    type: "",
    message: "",
  })
const navigate = useNavigate(); // For navigation after login

const triggerNotification = (type, message) => {
    setNotification({ type, message });
  };

const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("http://localhost:8000/login", { email, password });
        localStorage.setItem("token", response.data.token);
        console.log(response.data.message);
        triggerNotification("success", response.data.message);
        setTimeout(() => {
            navigate('/');
            window.location.reload();
        }, 1000);
    } catch (error) {
        console.error("Login error:", error.response.data);
        triggerNotification("error",  error.response.data.message);
    }
};

  return (
    <div className="d-flex align-items-center justify-content-center w-100">
    <form class="row g-3 w-50" onSubmit={handleLogin}>
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
        <button type="submit" class="btn btn-primary">
          Log in
        </button>
      </div>
    </form>
    <Notification
          type={notification.type}
          message={notification.message}
          autoClose={1000}
        />
  </div>
  )
}

export default Login
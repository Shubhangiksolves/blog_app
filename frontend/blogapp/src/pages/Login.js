import React, { useState } from "react";
import axios from "axios";
import { InputField } from "../components/shared/InputField";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../components/shared/Notification";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({
    id: null,
    type: "",
    message: "",
  });
  const navigate = useNavigate();

  const triggerNotification = (type, message) => {
    setNotification({
      id: new Date().getTime(),
      type,
      message,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
      localStorage.setItem("token", response?.data?.token);
      triggerNotification("success", response?.data?.message);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Login error:", error?.response?.data);
      triggerNotification("error", error?.response?.data?.message);
    }
  };

  return (
    <div className="d-flex p-2 flex-column align-items-center justify-content-center w-100">
      <div className="d-flex w-50 flex-column align-items-start gap-3 justify-content-center">
        <form class="row g-3 w-100" onSubmit={handleLogin}>
          <div class="col-12">
            <InputField
              type="email"
              name="email"
              placeholder="Enter email"
              label="Email"
              onInputChange={(e) => setEmail(e.target.value)}
              value={email}
              required
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
              required
            />
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">
              Log In
            </button>
          </div>
        </form>
        <div className="d-flex flex-column gap-2 align-items-start justify-content-center float-left">
          <h1>Don't have an account, wanna create ??</h1>
          <Link to={"/signup"}>
            {" "}
            <a className="underline">Create Account</a>
          </Link>
        </div>{" "}
      </div>
      {notification && (
        <Notification
          key={notification.id}
          type={notification.type}
          message={notification.message}
          autoClose={1000}
        />
      )}
    </div>
  );
};

export default Login;
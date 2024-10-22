import React, { useState } from "react";
import axios from "axios";
import { InputField } from "../components/shared/InputField";
import { useNavigate } from "react-router-dom";
import Notification from "../components/shared/Notification";
import { Popup } from "../components/common/Popup";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const triggerNotification = (type, message) => {
    setNotification({ type, message });
  };

  const handleSignUp = async (e) => {
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
            "Content-Type": "application/json",
          },
        }
      );
      setName("");
      setEmail("");
      setPassword("");
      setRole("");
      triggerNotification("success", res.data.message);
      setShowPopup(true);
      return res;
    } catch (error) {
      console.error("Error during sign up:", error.response.data.message);
      triggerNotification("error", error.response.data.message);
    }
  };

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
            required
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
          <label for="inputRole" class="form-label">
            Role
          </label>
          <select
            value={role}
            id="inputRole"
            class="form-select"
            onChange={(e) => setRole(e.target.value)}
          >
            <option selected>Choose Role</option>
            <option value={"admin"}>Admin</option>
            <option value={"public"}>Public User</option>
          </select>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
      <Notification
        type={notification.type}
        message={notification.message}
        autoClose={500}
      />
      {showPopup && (
        <Popup openPopup={showPopup} setOpnenPopup={setShowPopup}>
          <div className="d-flex flex-column align-items-start justify-content-center p-2 gap-3">
            <h1 className="fw-bond">Wanna redirect to Login Page ?</h1>
            <div className="d-flex align-items-start ">
              <button
                className="btn btn-primary me-3"
                onClick={() => {
                  setShowPopup(false);
                  navigate("/login");
                }}
              >
                Redirect
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowPopup(false)}
              >
                No, Thanks
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import axios from "axios";
import { InputField } from "../components/shared/InputField";
import { useNavigate } from "react-router-dom";
import Notification from "../components/shared/Notification";
import { Popup } from "../components/common/Popup";
import { CONSTANTS } from "../constants/Constants";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("public");
  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const roleOptions = {CHOOSE : 'Choose role', ADMIN : 'Admin', USER : 'User'}
  const navigate = useNavigate();

  const triggerNotification = (type, message) => {
    setNotification({ type, message });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:8000${CONSTANTS.API_CONFIG.SIGNUP}`,
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
      triggerNotification(CONSTANTS.TOAST_TYPE.SUCCESS, res.data.message);
      setShowPopup(true);
      return res;
    } catch (error) {
      console.error(error.response.data.message);
      triggerNotification(CONSTANTS.TOAST_TYPE.ERROR, error.response.data.message);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center w-100">
      <form class="row g-3 w-50" onSubmit={handleSignUp}>
        <div class="col-12">
          <InputField
            type="text"
            name="username"
            placeholder={CONSTANTS.PLACEHOLDERS.ENTER_NAME}
            label={CONSTANTS.FORM_LABELS.NAME}
            value={name}
            onInputChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div class="col-12">
          <InputField
            type="email"
            name="email"
            placeholder={CONSTANTS.PLACEHOLDERS.ENTER_EMAIL}
            label={CONSTANTS.FORM_LABELS.EMAIL}
            onInputChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div class="col-12">
          <InputField
            type="password"
            name="password"
            placeholder={CONSTANTS.PLACEHOLDERS.ENTER_PASSWORD}
            label={CONSTANTS.FORM_LABELS.PASSWORD}
            onInputChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>
        <div class="col-12">
          <label for="inputRole" class="form-label">
            {CONSTANTS.FORM_LABELS.ROLE}
          </label>
          <select
            value={role}
            id="inputRole"
            class="form-select"
            onChange={(e) => setRole(e.target.value)}
          >
            <option selected>{roleOptions.CHOOSE}</option>
            <option value={"admin"}>{roleOptions.ADMIN}</option>
            <option value={"public"}>{roleOptions.USER}</option>
          </select>
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            {CONSTANTS.BUTTON.SIGNIN}
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
            <h6 className="fw-bond">{CONSTANTS.TEXT.LOGIN_REDIRECT}</h6>
            <div className="d-flex align-items-start ">
              <button
                className="btn btn-primary me-3"
                onClick={() => {
                  setShowPopup(false);
                  navigate(CONSTANTS.ROUTES.SIGNUP);
                }}
              >
                {CONSTANTS.BUTTON.REDIRECT}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setShowPopup(false)}
              >
                {CONSTANTS.BUTTON.NO_THANK}
              </button>
            </div>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Signup;

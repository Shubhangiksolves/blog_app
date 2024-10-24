import React, { useState } from "react";
import axios from "axios";
import { InputField } from "../components/shared/InputField";
import { Link, useNavigate } from "react-router-dom";
import Notification from "../components/shared/Notification";
import { CONSTANTS } from "../constants/Constants";

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
      const response = await axios.post(`http://localhost:8000${CONSTANTS.API_CONFIG.LOGIN}`, {
        email,
        password,
      });
      localStorage.setItem("token", response?.data?.token);
      triggerNotification(CONSTANTS.TOAST_TYPE.SUCCESS, response?.data?.message);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error(error?.response?.data);
      triggerNotification(CONSTANTS.TOAST_TYPE.ERROR, error?.response?.data?.message);
    }
  };

  return (
    <div className="d-flex p-2 flex-column align-items-center justify-content-center w-100">
      <div className="d-flex w-50 flex-column align-items-start gap-5 justify-content-center">
        <form class="row w-100" onSubmit={handleLogin}>
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
            <button type="submit" class="btn btn-primary">
              {CONSTANTS.BUTTON.LOGIN}
            </button>
          </div>
        </form>
        <div className="d-flex flex-column gap-2 align-items-start justify-content-center float-left">
          <h6>{CONSTANTS.TEXT.NO_ACCOUNT}</h6>
          <Link to={"/signup"}>
            {" "}
            <a className="underline">{CONSTANTS.TEXT.CREATE_ACCOUNT}</a>
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
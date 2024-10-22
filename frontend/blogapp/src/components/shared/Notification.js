import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {  Bounce, Slide, Zoom, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = ({ type, message, autoClose }) => {
  useEffect(() => {
    if (message) {
      switch (type) {
        case "warning":
          toast.warning(message, {autoClose: autoClose});
          break;
        case "success":
          toast.success(message, {autoClose: autoClose});
          break;
        case "info":
          toast.info(message, {autoClose: autoClose});
          break;
        case "error":
          toast.error(message || "Runtime error", {autoClose: autoClose});
          break;
        default:
          toast(message, {autoClose: autoClose});
          break;
      }
    }
  }, [type, message]);

  return <ToastContainer transition={Slide}/>;
}

Notification.propTypes = {
  type: PropTypes.oneOf(["success", "warning", "info", "error"]).isRequired,
  message: PropTypes.string.isRequired,
};

export default Notification;
import React from "react";
import "../../assets/css/popup.css";

export const Popup = ({ openPopup, setOpnenPopup, children }) => {
  return (
    <div
      className={`popup-position modal fade ${openPopup ? "show" : ""}`}
      aria-hidden={!openPopup}
      tabIndex={-1}
      style={{ display: openPopup ? "block" : "none" }}
    >
      <div className="modal-dialog w-100">
        <div className="modal-content d-flex flex-row align-items-start justify-content-between p-4 ">
          <div>{children}</div>
          <button className="btn btn-secondary" onClick={() => setOpnenPopup(false)}>X</button>
        </div>
      </div>
    </div>
  );
};

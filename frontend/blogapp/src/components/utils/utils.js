import React from "react";
import { Popup } from "../common/Popup";
import { CONSTANTS } from "../../constants/Constants";

export const ConfirmDelPopup = ({showDelPopup, onDelete, setShowDelPopup}) => {
  return (
    <>
      {showDelPopup && (
        <Popup openPopup={showDelPopup} setOpnenPopup={setShowDelPopup}>
          <div className="d-flex flex-column align-items-start justify-content-center p-2 gap-3">
            <h6 className="fw-bond">{CONSTANTS.TEXT.DEL_USER}</h6>
            <div className="d-flex align-items-start ">
              <button
                className="btn btn-danger me-3"
                onClick={() => {
                    setShowDelPopup(false);
                    onDelete();
                }}
              >
                {CONSTANTS.BUTTON.DELETE}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setShowDelPopup(false)}
              >
                {CONSTANTS.BUTTON.CANCEL}
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};

export const triggerNotification = (type, message, setNotification) => {
    setNotification({
      id: new Date().getTime(),
      type,
      message,
    });
  };
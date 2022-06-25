import React from "react";

const ImagePopup = (props) => {
  return (
    <div
      className={`popup popup_openimg ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <div className="popup__photo">
          <img
            src={props.card.link}
            alt={props.card.name}
            className="popup__image"
          />
          <p className="popup__subtitle">{props.card.name}</p>
          <button
            onClick={props.onClose}
            type="button"
            className="popup__close popup__close_openimg"
            aria-label="закрыть"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;

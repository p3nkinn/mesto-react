import React from "react";
import PopupWithForm from "./PopupWithForm";

const ProfilePopup = (props) => {
  return (
    <PopupWithForm 
      classPopup = "popup popup_profile"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      popupTitle = 'Редактировать профиль'
      formName = "editProfile"
      formClass = "popup__form popup__form_profile"
      children = {
        <>
        <label className="popup__input-error">
        <input id="name-input" name="username" type="text" required className="popup__input popup__input_type_username" />
        <span className="name-input-error popup__error popup__error_visible"></span>
        </label>
        <label className="popup__input-error">
        <input id="job-input" name="userjob" type="text" required className="popup__input popup__input_type_userjob" />
        <span className="job-input-error popup__error popup__error_visible"></span>
        </label>
        </>
      }
      textBtn = 'Сохранить'
      classBtn = "popup__close popup__close_profile"
    />
  )
    
}

export default ProfilePopup
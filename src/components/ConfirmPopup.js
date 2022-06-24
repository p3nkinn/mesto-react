import React from "react";
import PopupWithForm from "./PopupWithForm";

const ConfirmPopup = (props) => {
  return (
    <PopupWithForm 
    classPopup = "popup popup_confirm"
    isOpen = {props.isOpen}
    popupTitle = "Вы уверены?"
    formName = "delCard"
    formClass = "popup__form popup__form_confirm"
    textBtn = "Да"  
    classBtn = "popup__close popup__close_profile" 
  />
  )
    
}

export default ConfirmPopup


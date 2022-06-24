import React from "react";

const PopupWithForm = (props) => {
    return (
        <div className={`${props.classPopup} ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className="popup__container">
          <form name={props.formName}  action="#" className={props.formClass}>
          <h2 className="popup__title">{props.popupTitle}</h2>
          {props.children}
          <button type="submit" className="popup__button">{props.textBtn}</button>
          <button type="button" onClick={props.onClose} className={`popup__close popup__close_${props.classBtn}`} aria-label="закрыть"></button>
        </form>
        </div>
 
    </div> 
    )        
}

export default PopupWithForm;
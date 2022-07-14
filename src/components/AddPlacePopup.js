import React from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({isOpen, onClose, onUpdateCard}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateCard({
            
        })
    }

    return (
        <PopupWithForm
        onSubmit={handleSubmit}
        classPopup="newplaces"
        isOpen={isOpen}
        onClose={onClose}
        popupTitle="Новое место"
        formName="newPlace"
        formClass="popup__form popup__new-form"
        children={
          <>
            <label className="popup__input-error">
              <input
                id="title-input"
                name="name"
                placeholder="Название"
                required
                type="text"
                className="popup__input popup__input_type_title"
              />
              <span className="title-input-error popup__error popup__error_visible"></span>
            </label>
            <label className="popup__input-error">
              <input
                id="link-input"
                name="link"
                placeholder="Ссылка на картинку"
                required
                type="url"
                className="popup__input popup__input_type_link"
              />
              <span className="link-input-error popup__error popup__error_visible"></span>
            </label>
          </>
        }
        textBtn="Создать"
        classBtn="popup__close popup__close_newplaces"
      />
    )
}

export default AddPlacePopup;
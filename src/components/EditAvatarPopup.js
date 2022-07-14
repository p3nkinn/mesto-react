import React from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({isOpen, onClose, onUpdateAvatar}) => {
    const avatarRef = React.useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar({
          avatar: avatarRef.current.value
        });
      }
    return (
        <PopupWithForm
        classPopup="avatar"
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
        popupTitle="Обновить аватар"
        formName="newAvatar"
        formClass="popup__form popup__new-avatar"
        children={
          <>
            <label className="popup__input-error">
              <input
                id="link-avatar"
                ref={avatarRef}
                name="link"
                placeholder="Ссылка на картинку"
                required
                type="url"
                className="popup__input popup__input_type_link"
              />
              <span className="link-avatar-error popup__error popup__error_visible"></span>
            </label>
          </>
        }
        textBtn="Сохранить"
        classBtn="popup__close popup__close_newavatar"
      />
    )
    
}

export default EditAvatarPopup
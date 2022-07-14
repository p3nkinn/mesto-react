import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";
const EditProfilePopup = ({isOpen, onClose}) => {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

    const handleNameChange = (e) => {
        setName(e.target.value);
      }
    
      const handleDescrChange = (e) => {
        setDescription(e.target.value);
      }
       
    return (
        <PopupWithForm
        isOpen={isOpen}
        onClose={onClose}
        classPopup="profile"
        popupTitle="Редактировать профиль"
        formName="editProfile"
        formClass="popup__form popup__form_profile"
        children={
          <>
            <label className="popup__input-error">
              <input
                id="name-input"
                name="username"
                type="text"
                value={name ? name : ''}
                onChange={handleNameChange}
                required
                className="popup__input popup__input_type_username"
              />
              <span className="name-input-error popup__error popup__error_visible"></span>
            </label>
            <label className="popup__input-error">
              <input
                id="job-input"
                name="userjob"
                type="text"
                value={description ? description : ''}
                onChange={handleDescrChange}
                required
                className="popup__input popup__input_type_userjob"
              />
              <span className="job-input-error popup__error popup__error_visible"></span>
            </label>
          </>
        }
        textBtn="Сохранить"
        classBtn="popup__close popup__close_profile"
      />
    )
    
}

export default EditProfilePopup;
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsImagePopupOpen(false);
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        classPopup="newplaces"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
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
      <PopupWithForm
        classPopup="profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
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
      <PopupWithForm
        classPopup="avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        popupTitle="Обновить аватар"
        formName="newAvatar"
        formClass="popup__form popup__new-avatar"
        children={
          <>
            <label className="popup__input-error">
              <input
                id="link-avatar"
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
      <PopupWithForm
      classPopup="confirm"
      popupTitle="Вы уверены?"
      formName="delCard"
      formClass="popup__form popup__form_confirm"
      textBtn="Да"
      classBtn="popup__close popup__close_profile"
      />
      <ImagePopup
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        card={selectedCard}
      />
    </div>
  );
};

export default App;

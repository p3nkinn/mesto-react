import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { api } from "../utils/Api";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getProfileInfo()
  .then(userData => {
    setCurrentUser( userData );
  })
  .catch((err) => `${err}`);
  }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then(initialCards => {
        setCards(initialCards);
      })
      .catch((err) => `${err}`);
  }, []);
  
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

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
}

  const handleCardDelete = (card) => {
    api.deleteCard(card._id)
    .then(() => {
      const newCard = cards.filter(currentCard => currentCard !== card);
      setCards(newCard);
    });
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
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
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
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
      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { api } from "../utils/Api";
import { renderLoading } from "../utils/renderLoading";

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
    })
    .catch(err => {
      console.log(`${err}`);
    })
  }

  const handleUpdateUser = (userData) => {
    renderLoading(".popup_profile", true);
    api.setProfileInfo(userData)
    .then((userData) => {
      setCurrentUser(userData)
      closeAllPopups()
    })
    .catch(err => {
      console.log(`${err}`);
    })
    .finally(() => {
      renderLoading(".popup_profile", false, 'Сохранить');
    })
  }

  const handleUpdateAvatar = (userData) => {
    renderLoading(".popup_avatar", true);
    api.addNewAvatar(userData)
    .then(userData => {
      setCurrentUser(userData)
      closeAllPopups()
    })
    .catch(err => {
      console.log(`${err}`);
    })
    .finally(() => {
      renderLoading(".popup_avatar", false, 'Сохранить');
    })
  }

  const handleAddPlaceSubmit = (userData) => {
    renderLoading(".popup_newplaces", true);
    api.addNewCard(userData)
    .then(userData => {
      setCards([userData, ...cards])
      closeAllPopups()
    })
    .catch(err => {
      console.log(`${err}`);
    })
    .finally(() => {
      renderLoading(".popup_newplaces", false, 'Создать');
    })
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

      <AddPlacePopup onUpdateCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
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
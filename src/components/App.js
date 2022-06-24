import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import ProfilePopup from './ProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';



const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  
const handleEditAvatarClick = () => {
  setIsEditAvatarPopupOpen(true)
  }
  
const handleEditProfileClick = () => {
  setIsEditProfilePopupOpen(true)
  }
  
  
const handleAddPlaceClick = () => {
  setIsAddPlacePopupOpen(true)
  }

const handleCardClick = (card) => {
  setSelectedCard(card)
  setIsImagePopupOpen(true)

}

const closeAllPopups = () =>{
  setIsEditAvatarPopupOpen(false)
  setIsAddPlacePopupOpen(false)
  setIsEditProfilePopupOpen(false)
  setIsImagePopupOpen(false)
}

 
  return (
    <div className="page">
      <Header />
  <main className="main-content">
      <Main 
      onEditProfile = {handleEditProfileClick}
      onAddPlace = {handleAddPlaceClick}
      onEditAvatar = {handleEditAvatarClick}
      onCardClick = {handleCardClick}
      />
  </main>
    <footer className="footer">
      <Footer />
    </footer>
    <ProfilePopup
    isOpen={isEditProfilePopupOpen}
    onClose={closeAllPopups}
    />
    <AddPlacePopup 
    isOpen={isAddPlacePopupOpen}
    onClose={closeAllPopups}
    />
    <EditAvatarPopup 
    isOpen={isEditAvatarPopupOpen}
    onClose={closeAllPopups}
    />
    <ImagePopup 
    isOpen={isImagePopupOpen}
    onClose={closeAllPopups}
    card={selectedCard}
    />
  </div>
  
  );
  
}


export default App;

import React from "react";
import Card from "./Card";
import { api } from "../utils/Api";

const Main = (props) => {
  const [userName, setUserName] = React.useState();
  const [userDescription, setUserDescription] = React.useState();
  const [userAvatar, setUserAvatar] = React.useState();
  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getProfileInfo()])
      .then(([initialCards, userData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(initialCards);
      })
      .catch((err) => `${err}`);
  }, []);

  return (
    <main className="main-content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__item">
            <div onClick={props.onEditAvatar} className="profile__redaction">
              <img
                className="profile__image"
                src={`${userAvatar}`}
                alt="Аватар пользователя"
              />
            </div>
            <div className="profile__info">
              <h1 className="profile__title">{userName}</h1>
              <p className="profile__subtitle">{userDescription}</p>
              <button
                onClick={props.onEditProfile}
                type="button"
                className="profile__edit-button"
                aria-label="редактировать"
              ></button>
            </div>
          </div>
          <button
            onClick={props.onAddPlace}
            type="button"
            className="profile__add-button"
            aria-label="добавить"
          ></button>
        </div>
      </section>
      <div className="elements">
        <ul className="elements__list">
          {cards.map((cardItems) => (
            <Card
              onCardClick={props.onCardClick}
              card={cardItems}
              key={cardItems._id}
            ></Card>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Main;

import React from "react";

const Card = ({card, onCardClick}) => {
  const handleClick = () => {
    onCardClick(card)
  };
  return (
    <li className="elements__item">
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className="elements__image"
      />
      <div className="elements__description">
        <h3 className="elements__title">{card.name}</h3>
        <div className="elements__hearts">
          <button
            type="button"
            className="elements__likes"
            aria-label="лайк"
          ></button>
          <span className="elements__likes_count">
            {card.likes.length}
          </span>
        </div>
      </div>
      <button
        type="button"
        className="elements__remove"
        aria-label="удалить"
      ></button>
    </li>
  );
};

export default Card;

import React from "react";

const Card = (props) => {
  const handleClick = () => {
    props.onCardClick(props.card);
  };
  return (
    <li className="elements__item">
      <img
        onClick={handleClick}
        src={props.card.link}
        alt={props.card.name}
        className="elements__image"
      />
      <div className="elements__description">
        <h3 className="elements__title">{props.card.name}</h3>
        <div className="elements__hearts">
          <button
            type="button"
            className="elements__likes"
            aria-label="лайк"
          ></button>
          <span className="elements__likes_count">
            {props.card.likes.length}
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

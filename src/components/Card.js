import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function Card(props) {
  const user = React.useContext(CurrentUserContext);
  //jsx карточек
  function handleClick() {
    props.onCardClick(props.card);
  }
//лайк
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  //Удаление карточки
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
//Проверка владельца карточки
  const isOwn = props.card.owner._id === user._id;
// удаление кнопки, в зависимости от владельца и наоборот
  const cardDeleteButtonClassName = (
    `element__trash-button ${isOwn ? 'element__trash-button' : 'element__trash-button_hidden'}`
  );
//Проверка владельца лайка
  const isLiked = props.card.likes.some(i => i._id === user._id);
// Удаление активного лайка,при проверки владельца и наоборот
  const cardLikeButtonClassName = (
    `element__button ${isLiked ? 'element__button_active' : 'element__button'}`
)

  return (
    <article className="element">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" aria-label="element__trash-button"/>
      <img className="element__image" src={props.link} alt={props.name} onClick={handleClick}/>
      <div className="element__description">
        <h2 className="element__text">{props.name}</h2>
        <button onClick={handleLikeClick} aria-label="element__button" type="button" className={cardLikeButtonClassName}/>
        <p className="element__button-likes-counter">{props.likes}</p>
      </div>
    </article>
  )
}

export default Card

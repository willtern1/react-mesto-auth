import React from "react";
import Card from "./Card";

//основной jxs
function Main(props) {

  return (
    <main className="content">

      <section aria-label="profile" className="profile">
        <div className="profile__avatar-container" onClick={props.refreshAvatar}/>
        <img className="profile__image" src={props.currentUser.avatar} alt={props.currentUser.name}/>
        <div className="profile__info">
          <h1 className="profile__name">{props.currentUser.name}</h1>
          <p className="profile__job">{props.currentUser.about}</p>
          <button aria-label="profile__edit-button" type="button" className="profile__edit-button"
                  onClick={props.editProfilePopup}>
          </button>
        </div>
        <button aria-label="profile__add-card-button" type="button" className="profile__add-card-button"
                onClick={props.addCardPopup}/>
      </section>

      <section aria-label="elements" className="elements">
        {props.cards.map((card) => (              // отрисовка каждой карточки с пропсами
          <Card
            key={card._id}
            onCardClick={props.onCardClick}
            card={card}
            link={card.link}
            name={card.name}
            likes={card.likes.length}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            openDeleteConfirmPopup={props.openDeleteConfirmPopup}
            handleSelectedCard={props.handleSelectedCard}
            handleDelCardSet={props.handleDelCardSet}
          />
        ))}
      </section>

    </main>
  )
}

export default Main;

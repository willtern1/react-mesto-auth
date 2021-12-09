import '../index.css'
import {Routes, Route, Link} from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import React from "react";
import api from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);       //Хуки
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([])

  //лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.putLikeCard(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)))
      }).catch((err) => alert(`Ошибченко лайка : ${err.status}`))
    } else {
      api.deleteLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c)))
      }).catch((err) => alert(`Ошибченко лайка : ${err.status}`))
    }
  }

//удаление карточки
  function handleCardDelete(card) {
    api.deleteCard(card).then(() =>
      setCards((list) => list.filter((c) => c._id !== card._id))
    ).catch((err) => {
      alert(`Ошибка удаления карточки : ${err.status}`)
    })
  }

// хук с  промисами  которые пихаются в переменные
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardsInfo()]).then(([profileInfo, cards]) => {
      setCurrentUser(profileInfo)
      setCards(cards)
    }).catch((err) => {
      alert(`Ошибка загрузки данных :  ${err.status}`)
    })
  }, [])


//Функции состояния  для открытия попчанских
  function openProfilePopup() {
    setIsEditProfilePopupOpen(true)
  }

  function openCardAddPopup() {
    setIsAddPlacePopupOpen(true)
  }

  function openAvatarPopup() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }

//функция закрытия попчанских
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setSelectedCard({name: '', link: ''})
  }

//обновоения инфо профиля в CurrentUser
  function handleUpdateUser(data) {
    Promise.resolve(api.pathUserData(data)).then((profileInfo) => {
      setCurrentUser(profileInfo)
      closeAllPopups()
    }).catch((err) => {
      alert(`Ошибка загрузки данных :  ${err.status}`)
      openProfilePopup()
    })
  }

//обновоения ататара профиля в CurrentUser
  function handleUpdateAvatar(data) {
    Promise.resolve(api.patchAvatar(data)).then((avatar) => {
      setCurrentUser(avatar)
      closeAllPopups()
    }).catch((err) => {
      alert(`Ошибка обновления аватара : ${err.status}`)
      openAvatarPopup()
    })
  }

//обновление карточек
  function handleUpdateCard(data) {
    Promise.resolve(api.postCardData(data)).then((card) => {
      setCards([card, ...cards]);
      closeAllPopups()
    }).catch((err) => {
      alert(`Ошибка добавления карточки  ${err.status}`)
      openCardAddPopup()
    })
  }

  React.useEffect(() => {
    document.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        closeAllPopups()
      }
    })
  }, [])

  React.useEffect(() => {
    document.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) {
        closeAllPopups()
      }
    })
  }, [])

//jsx
  return (
    <div className='App' style={{width: '100%'}}>
      <button className="body__music-icon " type="button"/>
      <div className="page">
        <audio className="audio" src="../sound/The_Mole_320kbps.mp3" type="audio/mpeg" loop/>
        <CurrentUserContext.Provider value={currentUser}>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateCard={handleUpdateCard}/>
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          >
          </ImagePopup>
          <Header
            linkText={"Регистрация"}
          />
          <Routes>
            <Route path="/" element={
              <Main
                editProfilePopup={openProfilePopup}
                addCardPopup={openCardAddPopup} // Пропсы для открытия попчанских в мейне
                refreshAvatar={openAvatarPopup}
                onCardClick={handleCardClick}
                cards={cards}
                currentUser={currentUser}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />} />
            <Route path="/sign-up" element={<Register/>}/>
            <Route path="/sign-in" element={<Login/>}/>
          </Routes>
          <Footer/>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;

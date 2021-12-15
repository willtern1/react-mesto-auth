import '../index.css'
import {Routes, Route, useNavigate, useLocation, Link} from "react-router-dom";
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
import ProtectedRoute from "./ProtectRoute";
import * as auth from "../utils/auth"
import InfoTooltip from "./InfoTooltip";
import Music from "./Music";


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);       //Хуки
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isRegisterPopup, setRegisterPopup] = React.useState(false)
  const [registerPopupSubtitle, setRegisterPopupSubtitle] = React.useState('')
  const [infoToolTipTitle, setInfoToolTipTitle] = React.useState('')
  const [infoToolTipClass, setInfoToolTipClass] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [headerEmail, setHeaderEmail] = React.useState('')
  const navigate = useNavigate();
  const {pathname} = useLocation();
  const registerPath = '/sign-in' === pathname;
  const authorizationPath = '/sign-up' === pathname;
  const mainPath = '/' === pathname;


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

  function openRegisterPopup() {
    setRegisterPopup(true)
  }

//функция закрытия попчанских
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setRegisterPopup(false)
    setSelectedCard({name: '', link: ''})
  }

//обновоения инфо профиля в CurrentUser
  function handleUpdateUser(data) {
    Promise.resolve(api.pathUserData(data)).then((profileInfo) => {
      setCurrentUser(profileInfo)
      closeAllPopups()
    }).catch((err) => {
      alert(`Ошибка загрузки данных :  ${err.status}`)
    })
  }

//обновоения ататара профиля в CurrentUser
  function handleUpdateAvatar(data) {
    Promise.resolve(api.patchAvatar(data)).then((avatar) => {
      setCurrentUser(avatar)
      closeAllPopups()
    }).catch((err) => {
      alert(`Ошибка обновления аватара : ${err.status}`)
    })
  }

//обновление карточек
  function handleUpdateCard(data) {
    Promise.resolve(api.postCardData(data)).then((card) => {
      setCards([card, ...cards]);
      closeAllPopups()
    }).catch((err) => {
      alert(`Ошибка добавления карточки  ${err.status}`)
    })
  }

  React.useEffect(() => {
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
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


  function handleSubmitAuthorize(email, password) {
    auth.authorize(email, password).then((res) => {
        setLoggedIn(true)
        setHeaderEmail(email)
        localStorage.setItem('jwt', res.token)
    }).catch(() => {
      setInfoToolTipClass(true)
      setInfoToolTipTitle('ACCESS DENIED')
      setRegisterPopupSubtitle('Неверный Email или Пароль')
      openRegisterPopup()
    })
  }

  function zzTop() {
    navigate('/sing-in')
  }

  function handleSubmitRegister(email, password) {
    auth.register(email, password).then(() => {
        setInfoToolTipClass(false)
        setRegisterPopupSubtitle('Вы успешно зарегистрировались!')
        setInfoToolTipTitle('ACCESS GRANTED')
        setTimeout(closeAllPopups, 2000)
        setTimeout(zzTop, 2200)
    }).catch(() => {
      setInfoToolTipClass(true)
      setRegisterPopupSubtitle('Что-то пошло не так! Попробуйте ещё раз.')
      setInfoToolTipTitle('ACCESS DENIED')
    }).finally(() => {
      openRegisterPopup()
    })
  }

  React.useEffect(() => {
    if (loggedIn === true) {
      navigate('/')
    }
  }, [loggedIn, navigate])

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      auth.checkToken(jwt).then((res) => {
        if (res) {
          setLoggedIn(true)
          setHeaderEmail(res.data.email)

        }
      }).catch(err => alert(err))
    }
  }, [])

  function singOut(e) {
    e.preventDefault()
    setLoggedIn(false)
    localStorage.removeItem("jwt")
  }

  function textChange() {
    if (registerPath) {
      return <Link className={"header__list-link"} to="/sign-up">Регистрация</Link>
    } else if (authorizationPath) {
      return <Link className={"header__list-link"} to="/sign-in">Войти</Link>
    } else if (mainPath) {
      return <Link className={"header__list-link"} onClick={singOut} to="/sign-in">Выйти</Link>
    }
  }

//jsx
  return (
    <div className='App' style={{width: '100%'}}>
      <Music/>
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onUpdateCard={handleUpdateCard}/>
          <InfoTooltip isOpen={isRegisterPopup} onClose={closeAllPopups}
                       registerPopupSubtitle={registerPopupSubtitle} infoToolTipTitle={infoToolTipTitle}
                       infoToolTipClass={infoToolTipClass}/>
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          >
          </ImagePopup>
          <Header
            loggedIn={loggedIn}
            headerEmail={headerEmail}
            textChange={textChange}
          />
          <Routes>
            <Route path={'/'} element={<ProtectedRoute
              loggedIn={loggedIn}
              editProfilePopup={openProfilePopup}
              addCardPopup={openCardAddPopup} // Пропсы для открытия попчанских в мейне
              refreshAvatar={openAvatarPopup}
              onCardClick={handleCardClick}
              cards={cards}
              currentUser={currentUser}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              component={Main}
            />}/>
            <Route path={'*'} element={<ProtectedRoute/>}/>
            <Route path="/sign-up" element={<Register handleSubmitRegister={handleSubmitRegister}/>}/>
            <Route path="/sign-in" element={<Login handleSubmitAuthorize={handleSubmitAuthorize}/>}/>
          </Routes>
          {loggedIn ? <Footer/> : ''}
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }
_responseCheck(res) {
    if (res.ok) {
      return res.json();
    }
    return  Promise.reject(alert(`ААААААААААААШИБКА: ${res.status}`))
}

//Добываем юзер данные из ссылки
getUserInfo() {
    return fetch(
      `${this._url}/users/me`,
      {method: 'GET',
        headers: this._headers}
    ).then((res) => {
      return this._responseCheck(res)
    })
}
//Добываем карточки из ссылки
getCardsInfo() {
    return fetch(
      `${this._url}/cards`,
      {method: 'GET',
        headers: this._headers}
    ).then((res) => {
      return this._responseCheck(res)
    })
}

//изменения профиля
pathUserData(data) {
    return fetch(
      `${this._url}/users/me`,
      {method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          about: data.about
        })}
      ).then((res) => {
        return this._responseCheck(res)
    })
}

//отправка новой карточки
postCardData(data) {
    return fetch(
      `${this._url}/cards`,
      {method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })}
      ).then((res) => {
        return this._responseCheck(res)
    })
}

//удаление карточки
  deleteCard(data) {
    return fetch(
      `${this._url}/cards/${data._id}`,
      {method: 'DELETE',
      headers: this._headers,}
      ).then((res) => {
        return this._responseCheck(res)
    })
}
// отправка лайк
putLikeCard(id) {
    return fetch(
      `${this._url}/cards/likes/${id}`,
      {method: 'PUT',
      headers: this._headers}
    ).then((res) => {
      return this._responseCheck(res)
    })
}
// удаление лайка
deleteLike(id) {
  return fetch(
    `${this._url}/cards/likes/${id}`,
    {method: 'DELETE',
      headers: this._headers}
  ).then((res) => {
    return this._responseCheck(res)
  })
}

patchAvatar(data) {
    return fetch(
      `${this._url}/users/me/avatar`,
      {method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })}).then((res) => {
        return this._responseCheck(res)
    })
}
}

const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-29",
  headers: {
    authorization: "10765781-c34f-49ea-91c2-5a34ebcb851f",
    "content-type": "application/json"
  }
})

export  default  api;

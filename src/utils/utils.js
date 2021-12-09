export default function renderLoading(loading, popup) {
  if (loading === true) {
    if(popup.querySelector('.popup__button').textContent === 'Создать') {
      popup.querySelector('.popup__button').textContent = 'Создание...'
    } else  {
      popup.querySelector('.popup__button').textContent = 'Сохранение...'
    }
  } else {
  if (popup.querySelector('.popup__button').textContent === 'Создание...') {
    popup.querySelector('.popup__button').textContent ='Создать'
    } else {
    popup.querySelector('.popup__button').textContent = 'Сохранить'
  }
  }
}

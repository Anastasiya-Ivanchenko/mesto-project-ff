// @todo: Темплейт карточки
const containerCard = document.querySelector('.places__list');

// @todo: Функция создания карточки
initialCards.forEach(function (element)  {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardButtonDelete = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;

  cardButtonDelete.addEventListener('click', deleteCard);

  // @todo: Вывести карточки на страницу
  containerCard.append(cardElement);
});

// @todo: Функция удаления карточки
  function deleteCard() {
    const cardButtonDelete = document.querySelector('.card__delete-button');

    const containerDelete = cardButtonDelete.closest('.card');
    containerDelete.remove();
  }
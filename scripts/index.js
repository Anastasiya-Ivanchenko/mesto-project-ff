
// ПРОШУ ПРОЩЕНИЯ, НЕ ЗАПУШИЛА ИЗМЕНЕНИЯ...


// @todo: Темплейт карточки
const containerCard = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(elementName, elementLink, deleteCardFunction) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardButtonDelete = cardElement.querySelector('.card__delete-button');

  cardImage.src = elementLink;
  cardImage.alt = elementName;
  cardTitle.textContent = elementName;

  cardButtonDelete.addEventListener('click', deleteCardFunction);

  // @todo: Вывести карточки на страницу
  return cardElement;
}
initialCards.forEach((element) => {
  const card = createCard(element.name, element.link, deleteCard);
  containerCard.append(card);
});

// @todo: Функция удаления карточки
  function deleteCard(event) {
    const containerDelete = event.target.closest('.card');
    containerDelete.remove();
  }
import { cardTemplate } from "../scripts/index.js";

export function createCard(
    elementName,
    elementLink,
    deleteCardFunction,
    openImage,
    likeCardFunction
  ) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImage = cardElement.querySelector(".card__image");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardButtonDelete = cardElement.querySelector(".card__delete-button");
    const cardLikeButton = cardElement.querySelector(".card__like-button");
  
    cardImage.src = elementLink;
    cardImage.alt = elementName;
    cardTitle.textContent = elementName;
  
    cardButtonDelete.addEventListener("click", deleteCardFunction);
    cardImage.addEventListener("click", () => {
      openImage(elementLink, elementName);
    });

  
    // Обработчик лайка
    cardLikeButton.addEventListener("click", likeCardFunction);
  
    // @todo: Вывести карточки на страницу
    return cardElement;
  }
  
  // @todo: Функция удаления карточки
  export function deleteCard(event) {
    const containerDelete = event.target.closest(".card");
    containerDelete.remove();
  }
  
  // Функция обработки лайка
  export function likeCard(event) {
    event.target.classList.toggle("card__like-button_is-active");
  }

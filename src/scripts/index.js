import "../pages/index.css"; // добавили главный файл стилей
import "../components/cards.js";
import "../components/modal.js";

import initialCards from "../components/cards.js";
import { openModal, openImage } from "../components/modal.js";
import { createCard, deleteCard, likeCard } from "../components/cards.js";

// @todo: Темплейт карточки

const containerCard = document.querySelector(".places__list");

// export в cards.js
export const cardTemplate = document.querySelector("#card-template").content;

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editForm = document.querySelector(".popup_type_edit");
const popupNewCards = document.querySelector(".popup_type_new-card");

// export в modal.js
export const popupImage = document.querySelector(".popup_type_image"); 
export const imagePopup = popupImage.querySelector(".popup__image");
export const imageCaption = popupImage.querySelector(".popup__caption");

const newCardForm = popupNewCards.querySelector('.popup__form');
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const newCardLinkInput = newCardForm.querySelector('.popup__input_type_url');

const formElement = document.querySelector(".popup__form");// Воспользуйтесь методом querySelector()

const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_description");// Воспользуйтесь инструментом .querySelector()

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

initialCards.forEach((element) => {
  const card = createCard(element.name, element.link, deleteCard, openImage, likeCard);
  containerCard.append(card);
});

// Здесь остается @todo: Открытие модального окна "Редактирование профиля"
editButton.addEventListener("click", (evt) => {
  // @todo: Редактирование профиля
  openModal(editForm);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

// Здесь остается @todo: Открытие модального окна "Новое место"
addButton.addEventListener("click", () => openModal(popupNewCards)); 

//Здесь остается @todo: Закрытие модального окна по кнопке ESC
document.addEventListener('keydown', (evt) => {
  if (evt.key === "Escape") {
    const popupIsOpened = document.querySelector(".popup_is-opened");
    if (popupIsOpened) {
      closeModal(popupIsOpened);
    }
  }
});

//Здесь остается @todo: Закрытие модального окна по клику на крестик
function closeModal(popup) {

  popup.classList.remove("popup_is-opened");
};

//Здесь остается @todo: Закрытие модального окна по клику вне окна
function addCloseByOverlayClick(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) { // Проверяем, кликнули ли по самому попапу
      closeModal(popup);
    }
  });
}
//Здесь остается Добавляем обработчик для каждого попапа
addCloseByOverlayClick(editForm);
addCloseByOverlayClick(popupNewCards);
addCloseByOverlayClick(popupImage);

// Здесь остается @todo: Закрытие модального окна по клику на крестик
const closeButtons = document.querySelectorAll(".popup__close");


closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Находим ближайший попап к кнопке
    const popup = button.closest(".popup");
    closeModal(popup);
  });
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
          // Так мы можем определить свою логику отправки.
           // О том, как это делать, расскажем позже.

// Получите значение полей jobInput и nameInput из свойства value
const nameValue = nameInput.value; // Сохраняем значение поля имени
const jobValue = jobInput.value; // Сохраняем значение поля профессии

// Используйте свойство textContent
profileTitle.textContent = nameValue; // Используем сохраненное значение имени
profileDescription.textContent = jobValue; // Используем сохраненное значение профессии

// Очистите значения полей формы методом reset()
evt.target.reset();

// Закроем попап
    const popup = evt.target.closest('.popup');
    closeModal(popup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

// Обработчик отправки формы добавления новой карточки
newCardForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  // @todo: Добавление карточки
  const newCard = createCard(
    newCardNameInput.value,
    newCardLinkInput.value,
    deleteCard,
    openImage,
    likeCard 
  );
  containerCard.prepend(newCard);
  newCardForm.reset();
  closeModal(popupNewCards);
});


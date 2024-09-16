import "../pages/index.css"; // добавили главный файл стилей
import "../components/cards.js";
import "../components/modal.js";
import "../components/card.js";
import "../components/validation.js";

import initialCards from "../components/cards.js";
import { openModal, closeModal, addCloseByOverlayClick } from "../components/modal.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";
import { enableValidation, clearValidation } from "../components/validation.js";
// @todo: Темплейт карточки

const containerCard = document.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileForm = document.forms["edit-profile"];
const newFormCard = document.forms["new-place"];
const editPopup = document.querySelector(".popup_type_edit");
const popupNewCards = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const imagePopup = popupImage.querySelector(".popup__image");
const imageCaption = popupImage.querySelector(".popup__caption");
const newCardNameInput = newFormCard.querySelector(".popup__input_type_card-name");
const newCardLinkInput = newFormCard.querySelector(".popup__input_type_url");
const nameInput = document.querySelector(".popup__input_type_name"); 
const jobInput = document.querySelector(".popup__input_type_description"); 
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

initialCards.forEach((element) => {
  const card = createCard(
    element.name,
    element.link,
    deleteCard,
    openImage,
    likeCard
  );
  containerCard.append(card);
});

// @todo: Открытие модального окна "Редактирование профиля"
editButton.addEventListener("click", (evt) => {
  // @todo: Редактирование профиля
  clearValidation(profileForm, validationConfig);

  openModal(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  });

//@todo: Открытие модального окна "Новое место"
addButton.addEventListener("click", () => {
   openModal(popupNewCards);
  });

function openImage(link, name) {
  // @todo: Открыть изображение
  imagePopup.src = link;
  imageCaption.alt = name;
  imageCaption.textContent = name;

  openModal(popupImage);
};

 // @todo: Закрытие модального окна по клику на крестик
 const closeButtons = document.querySelectorAll(".popup__close");

 closeButtons.forEach((button) => {
   button.addEventListener("click", () => {
     // Находим ближайший попап к кнопке
     const popup = button.closest(".popup");
     closeModal(popup);
   });
 });

//Добавляем обработчик для каждого попапа
addCloseByOverlayClick(editPopup);
addCloseByOverlayClick(popupNewCards);
addCloseByOverlayClick(popupImage);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
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
  const popup = evt.target.closest(".popup");
  closeModal(popup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Обработчик отправки формы добавления новой карточки
newFormCard.addEventListener("submit", (evt) => {
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
  newFormCard.reset();
  clearValidation(newFormCard, validationConfig);
  closeModal(popupNewCards);
});

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

window.addEventListener('load', function () {
  enableValidation(validationConfig);
});
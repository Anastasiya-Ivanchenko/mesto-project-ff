import "../pages/index.css"; // добавили главный файл стилей
import "../components/cards.js";
import "../components/modal.js";
import "../components/card.js";

import initialCards from "../components/cards.js";
import { openModal, closeModal, addCloseByOverlayClick, closeByEscape } from "../components/modal.js";
import { createCard, deleteCard, likeCard } from "../components/card.js";

// @todo: Темплейт карточки

const containerCard = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const editPopup = document.querySelector(".popup_type_edit");
const popupNewCards = document.querySelector(".popup_type_new-card");

// export в modal.js
export const popupImage = document.querySelector(".popup_type_image");
export const imagePopup = popupImage.querySelector(".popup__image");
export const imageCaption = popupImage.querySelector(".popup__caption");

const newCardForm = popupNewCards.querySelector(".popup__form");
const newCardNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const newCardLinkInput = newCardForm.querySelector(".popup__input_type_url");

const formElement = editPopup.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()

const nameInput = document.querySelector(".popup__input_type_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_type_description"); // Воспользуйтесь инструментом .querySelector()

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
  openModal(editPopup);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

//@todo: Открытие модального окна "Новое место"
addButton.addEventListener("click", () => openModal(popupNewCards));

function openImage(link, name) {
  // @todo: Открыть изображение
  imagePopup.src = link;
  imageCaption.alt = name;
  imageCaption.textContent = name;

  popupImage.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeByEscape);
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
formElement.addEventListener("submit", handleProfileFormSubmit);

// Обработчик отправки формы добавления новой карточки
newCardForm.addEventListener("submit", (evt) => {
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

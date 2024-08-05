//  @todo: Открытие модального окна
export function openModal(popup) {
  popup.classList.add("popup_is-opened");
};

//@todo: Закрытие модального окна по клику на крестик
export function closeModal(popup) {
    popup.classList.remove("popup_is-opened");
  };
  
  // @todo: Закрытие модального окна по клику вне окна
  export function addCloseByOverlayClick(popup) {
    popup.addEventListener("click", (evt) => {
      if (evt.target === popup) {
        // Проверяем, кликнули ли по самому попапу
        closeModal(popup);
      }
    });
  };

  //@todo: Закрытие модального окна по кнопке ESC
document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      const popupIsOpened = document.querySelector(".popup_is-opened");
      if (popupIsOpened) {
        closeModal(popupIsOpened);
      }
    }
  });

  // @todo: Закрытие модального окна по клику на крестик
const closeButtons = document.querySelectorAll(".popup__close");

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Находим ближайший попап к кнопке
    const popup = button.closest(".popup");
    closeModal(popup);
  });
});
//  @todo: Открытие модального окна
export function openModal(popup) {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", closeByEscape);
};

//@todo: Закрытие модального окна по клику на крестик
export function closeModal(popup) {
    popup.classList.remove("popup_is-opened");

    document.removeEventListener("keydown", closeByEscape);
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

// @todo : Закрытие модального окна по Escape
   function closeByEscape(event) {
    if(event.key === 'Escape') {
       closeModal(document.querySelector('.popup_is-opened'));
    }
}
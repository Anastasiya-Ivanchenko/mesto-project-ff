import { popupImage, imageCaption, imagePopup } from "../scripts/index.js";

export function openModal(popup) {
    // @todo: Редактирование профиля
    popup.classList.add("popup_is-opened");
  }
  
  export function openImage(link, name) {
    // @todo: Открыть изображение
    imagePopup.src = link;
    imageCaption.alt = name;
    imageCaption.textContent = name;
  
    popupImage.classList.add("popup_is-opened");
  }
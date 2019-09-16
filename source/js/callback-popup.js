'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var callbackPopupElement = document.querySelector('.callback-popup');

  if (callbackPopupElement) {
    var openCallbackPopup = function () {
      callbackPopupElement.classList.add('callback-popup--open');
      window.addEventListener('keydown', closeCallbackPopupOnESC);
      document.querySelector('body').classList.add('body-noscroll');
    };

    var closeCallbackPopup = function () {
      callbackPopupElement.classList.remove('callback-popup--open');
      window.removeEventListener('keydown', closeCallbackPopupOnESC);
      document.querySelector('body').classList.remove('body-noscroll');
    };

    var closeCallbackPopupOnESC = function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeCallbackPopup();
      }
    };

    // закрытие по click на overlay
    callbackPopupElement.addEventListener('click', function (evt) {
      if (evt.target === callbackPopupElement) {
        closeCallbackPopup();
      }
    });

    var openButtonElement = document.querySelector('.header__callback');
    var closeButtonElement = callbackPopupElement.querySelector('.callback-popup__close');
    openButtonElement.addEventListener('click', openCallbackPopup);
    closeButtonElement.addEventListener('click', closeCallbackPopup);

    var callbackForm = callbackPopupElement.querySelector('.callback-popup__form');
    var nameField = callbackForm.querySelector('.callback-popup__name');
    var phoneField = callbackForm.querySelector('.callback-popup__phone');
    var questionField = callbackForm.querySelector('.callback-popup__question');

    var isStorageSupport = true;
    try {
      var storage = JSON.parse(localStorage.getItem('smartdevice-callback'));
      nameField.value = storage.name;
      phoneField.value = storage.phone;
      questionField.value = storage.question;
    } catch (err) {
      isStorageSupport = false;
    }

    var submitCallbackForm = function () {
      if (isStorageSupport) {
        localStorage.setItem('smartdevice-callback', JSON.stringify({
          name: nameField.value,
          phone: phoneField.value,
          question: questionField.value,
        }));
      }
    };

    callbackForm.addEventListener('submit', submitCallbackForm);
  }
})();

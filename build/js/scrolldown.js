'use strict';

(function () {
  window.addEventListener('load', function () {
    document.querySelector('.main-screen__scrolldown').addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector('#section-advantages').scrollIntoView({behavior: 'smooth'});
    });
  });
})();

'use strict';
// модуль, который управляет карточками объявлений и метками: добавляет на страницу нужную карточку, отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;

(function () {
  var map = document.querySelector('.map');
  var mapPinsList = document.querySelector('.map__pins');

  var changePinsAndCards = function (pins, cards, index) {
    for (var j = 0; j < pins.length; j++) {
      pins[j].classList.remove('map__pin--active');
    }

    pins[index].classList.add('map__pin--active');

    for (j = 0; j < cards.length; j++) {
      cards[j].classList.add('hidden');
    }

    cards[index - 1].classList.remove('hidden');
  };

  var showCards = function () {
    var mapCards = map.querySelectorAll('.map__card');
    var mapButtons = mapPinsList.querySelectorAll('button');

    mapButtons.forEach(function (item, i) {
      if (i !== 0) {
        item.addEventListener('mousedown', function (evt) {
          window.util.ifLeftMouseEventDoAction(evt, function () {
            changePinsAndCards(mapButtons, mapCards, i);
          });
        });

        item.addEventListener('keydown', function (evt) {
          window.util.ifEnterEventDoAction(evt, function () {
            changePinsAndCards(mapButtons, mapCards, i);
          });
        });
      }
    });
  };

  var closeCards = function () {
    var mapCards = map.querySelectorAll('.map__card');
    var mapButtons = mapPinsList.querySelectorAll('button');
    mapCards.forEach(function (item) {
      item.querySelector('.popup__close').addEventListener('mousedown', function (evt) {
        window.util.ifLeftMouseEventDoAction(evt, function () {

          for (var i = 0; i < mapButtons.length; i++) {
            mapButtons[i].classList.remove('map__pin--active');
          }

          item.classList.add('hidden');
        });
      });

      item.querySelector('.popup__close').addEventListener('keydown', function (evt) {
        window.util.ifEnterEventDoAction(evt, function () {

          for (var i = 0; i < mapButtons.length; i++) {
            mapButtons[i].classList.remove('map__pin--active');
          }

          item.classList.add('hidden');
        });
      });
    });

  };

  var removeCards = function () {
    var mapCards = map.querySelectorAll('.map__card');

    mapCards.forEach(function (item) {
      item.remove();
    });
  };

  var onDocumentEscPress = function (evt) {
    var mapCards = map.querySelectorAll('.map__card');
    var mapButtons = mapPinsList.querySelectorAll('button');
    window.util.ifEscEventDoAction(evt, function () {

      for (var i = 0; i < mapButtons.length; i++) {
        mapButtons[i].classList.remove('map__pin--active');
      }

      mapCards.forEach(function (item) {
        item.classList.add('hidden');
      });
    });
  };
  document.addEventListener('keydown', onDocumentEscPress);

  window.map = {
    showCards: showCards,
    closeCards: closeCards,
    removeCards: removeCards
  };
})();

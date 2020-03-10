'use strict';
// модуль, который создаёт карточки похожих объявлений

(function () {
  var map = document.querySelector('.map');
  var mapCardTemplate = document.querySelector('#card').content;
  var mapCardTemplatePhotos = mapCardTemplate.querySelector('.popup__photos');
  // var mapCardTemplateFeatures = mapCardTemplate.querySelector('.popup__features');

  var renderCards = function (offers) {
    var fragmentCards = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var cardElement = mapCardTemplate.cloneNode(true);

      cardElement.querySelector('.popup__avatar').src = offers[i].author.avatar;
      cardElement.querySelector('.popup__title').textContent = offers[i].offer.title;
      cardElement.querySelector('.popup__text--address').textContent = offers[i].offer.address;
      cardElement.querySelector('.popup__text--price').innerHTML = offers[i].offer.price + '&#x20bd;' + '<span>/ночь</span>';

      var getOfferType = function (type) {
        var selectedType;
        switch (type) {
          case 'palace':
            selectedType = cardElement.querySelector('.popup__type').textContent = 'Дворец';
            break;
          case 'flat':
            selectedType = cardElement.querySelector('.popup__type').textContent = 'Квартира';
            break;
          case 'house':
            selectedType = cardElement.querySelector('.popup__type').textContent = 'Дом';
            break;
          case 'bungalo':
            selectedType = cardElement.querySelector('.popup__type').textContent = 'Бунгало';
            break;
        }
        return selectedType;
      };
      getOfferType(offers[i].offer.type);

      cardElement.querySelector('.popup__text--capacity').textContent = offers[i].offer.rooms + ' комната(ы) для ' + offers[i].offer.guests + ' гостя(ей)';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers[i].offer.checkin + ', выезд до ' + offers[i].offer.checkout;
      cardElement.querySelector('.popup__description').textContent = offers[i].offer.description;

      var removeElementIfIncluded = function (arrayElement, className) {
        if (!(offers[i].offer.features.includes(arrayElement))) {
          cardElement.querySelector(className).remove();
        }
      };

      removeElementIfIncluded('wifi', '.popup__feature--wifi');
      removeElementIfIncluded('dishwasher', '.popup__feature--dishwasher');
      removeElementIfIncluded('parking', '.popup__feature--parking');
      removeElementIfIncluded('washer', '.popup__feature--washer');
      removeElementIfIncluded('elevator', '.popup__feature--elevator');
      removeElementIfIncluded('conditioner', '.popup__feature--conditioner');

      var photoElement = mapCardTemplatePhotos.querySelector('.popup__photo').cloneNode(true);

      for (var j = 0/* 1*/; j < offers[i].offer.photos.length; j++) {
        // console.log(i + ': number of offer, ' + offers[i].offer.photos.length + ': array length, ' + j + ': number of photo');
        photoElement.src = offers[i].offer.photos[j];
        mapCardTemplatePhotos.appendChild(photoElement);
      } // вставляется непонятное количество картинок, и нужно как-то избавиться от первого фото без ссылки

      fragmentCards.appendChild(cardElement);
    }

    map.appendChild(fragmentCards);

    // скрытие карточек
    var mapCards = map.querySelectorAll('.map__card');
    mapCards.forEach(function (item) {
      item.classList.add('hidden');
    });
  };

  // далее отображение карточки
  var showCards = function () {
    var mapCards = map.querySelectorAll('.map__card');
    var mapPinsList = document.querySelector('.map__pins');
    var mapButtons = mapPinsList.querySelectorAll('button');
    /*
    var setAttr = function () {
      mapButtons.forEach(function (button) {
        button.classList.remove('map__pin--active');
      });

      item.classList.add('map__pin--active');

      mapCards.forEach(function (card) {
        card.classList.add('hidden');
      });

      mapCards[i - 1].classList.remove('hidden');
    }
    */
    mapButtons.forEach(function (item, i) { // не знаю, как избавиться от вложенности
      if (i !== 0) {
        item.addEventListener('mousedown', function (evt) {
          window.util.ifLeftMouseEventDoAction(evt, function () {
            /*
            for (i = 0; i < mapButtons.length; i++) {
              mapButtons[i].classList.remove('map__pin--active');
              // mapCards[i].classList.add('hidden');
            }
            */
            /*
            for (var i = 0; i < mapCards.length; i++) {
              mapCards[i].classList.add('hidden');
            }
            */

            mapButtons.forEach(function (button) {
              button.classList.remove('map__pin--active');
            });

            item.classList.add('map__pin--active');

            mapCards.forEach(function (card) {
              card.classList.add('hidden');
            });

            mapCards[i - 1].classList.remove('hidden');
          });
        });

        item.addEventListener('keydown', function (evt) {
          window.util.ifEnterEventDoAction(evt, function () {
            mapButtons.forEach(function (button) {
              button.classList.remove('map__pin--active');
            });

            item.classList.add('map__pin--active');

            mapCards.forEach(function (card) {
              card.classList.add('hidden');
            });
            mapCards[i - 1].classList.remove('hidden');
          });
        });
      }
    });
  };

  var closeCards = function () {
    var mapCards = map.querySelectorAll('.map__card');
    var mapPinsList = document.querySelector('.map__pins');
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

    var onPopupEscPress = function (evt) {
      window.util.ifEscEventDoAction(evt, function () {

        for (var i = 0; i < mapButtons.length; i++) {
          mapButtons[i].classList.remove('map__pin--active');
        }

        mapCards.forEach(function (item) {
          item.classList.add('hidden');
        });
      });
    };
    document.addEventListener('keydown', onPopupEscPress);

  };


  window.cards = {
    renderCards: renderCards,
    showCards: showCards,
    closeCards: closeCards
  };
})();

'use strict';
// модуль, который создаёт карточки похожих объявлений

(function () {
  var map = document.querySelector('.map');
  var mapPinsList = document.querySelector('.map__pins');
  var mapCardTemplate = document.querySelector('#card').content;
  var mapCardTemplatePhotos = mapCardTemplate.querySelector('.popup__photos');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  // var mapCardTemplateFeatures = mapCardTemplate.querySelector('.popup__features');

  var removeElementIfIncluded = function (array, arrayElement, element, className) {
    if (!(array.includes(arrayElement))) {
      element.querySelector(className).remove();
    }
  };

  var getOfferType = function (type, element) {
    var selectedType;
    switch (type) {
      case 'palace':
        selectedType = element.querySelector('.popup__type').textContent = 'Дворец';
        break;
      case 'flat':
        selectedType = element.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'house':
        selectedType = element.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'bungalo':
        selectedType = element.querySelector('.popup__type').textContent = 'Бунгало';
        break;
    }
    return selectedType;
  };

  var insertPhotos = function (photosArray, placeToInsert) {
    // console.log(photosArray.length);
    if (photosArray.length !== 0) {
      for (var j = 0/* 1*/; j < photosArray.length; j++) {
        var photoElement = mapCardTemplate.querySelector('.popup__photo').cloneNode(true);
        // console.log(i + ': number of offer, ' + offers[i].offer.photos.length + ': array length, ' + j + ': number of photo');
        // console.log(element);
        // console.log(photosArray[j]);
        photoElement.src = photosArray[j];
        // console.log(photoElement);
        placeToInsert.appendChild(photoElement);
      } // вставляется непонятное количество картинок
    } else {
      return;
    }
  };

  var renderCards = function (offers) {
    var fragmentCards = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      var cardElement = mapCardTemplate.cloneNode(true);
      // var photoElement = cardElement.querySelector('.popup__photo').cloneNode(true);

      cardElement.querySelector('.popup__avatar').src = offers[i].author.avatar;
      cardElement.querySelector('.popup__title').textContent = offers[i].offer.title;
      cardElement.querySelector('.popup__text--address').textContent = offers[i].offer.address;
      cardElement.querySelector('.popup__text--price').innerHTML = offers[i].offer.price + '&#x20bd;' + '<span>/ночь</span>';
      cardElement.querySelector('.popup__text--capacity').textContent = offers[i].offer.rooms + ' комната(ы) для ' + offers[i].offer.guests + ' гостя(ей)';
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers[i].offer.checkin + ', выезд до ' + offers[i].offer.checkout;
      cardElement.querySelector('.popup__description').textContent = offers[i].offer.description;

      getOfferType(offers[i].offer.type, cardElement);

      removeElementIfIncluded(offers[i].offer.features, 'wifi', cardElement, '.popup__feature--wifi');
      removeElementIfIncluded(offers[i].offer.features, 'dishwasher', cardElement, '.popup__feature--dishwasher');
      removeElementIfIncluded(offers[i].offer.features, 'parking', cardElement, '.popup__feature--parking');
      removeElementIfIncluded(offers[i].offer.features, 'washer', cardElement, '.popup__feature--washer');
      removeElementIfIncluded(offers[i].offer.features, 'elevator', cardElement, '.popup__feature--elevator');
      removeElementIfIncluded(offers[i].offer.features, 'conditioner', cardElement, '.popup__feature--conditioner');

      insertPhotos(offers[i].offer.photos, mapCardTemplatePhotos);

      fragmentCards.appendChild(cardElement);
    }

    map.insertBefore(fragmentCards, mapFiltersContainer);
    /*
    map.querySelectorAll('.map__card').forEach(function (item) {
      item.querySelector('.popup__photos').querySelector('.popup__photo').remove();
    });
    */
    window.map.renderPin(offers);

    // скрытие карточек
    var mapCards = map.querySelectorAll('.map__card');
    mapCards.forEach(function (item) {
      item.classList.add('hidden');
    });

  };

  // далее отображение карточки

  var changePinsAndCards = function (pins, cards, index) {
    for (var j = 1; j < pins.length; j++) {
      pins[j].classList.remove('map__pin--active');
    }

    pins[index].classList.add('map__pin--active');

    for (j = 1; j < cards.length; j++) {
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

  window.cards = {
    renderCards: renderCards,
    showCards: showCards,
    closeCards: closeCards,
    removeCards: removeCards
  };
})();

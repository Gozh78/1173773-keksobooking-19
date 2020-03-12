'use strict';
// модуль, который создаёт карточки похожих объявлений

(function () {
  var map = document.querySelector('.map');
  var mapPinsList = document.querySelector('.map__pins');
  var mapCardTemplate = document.querySelector('#card').content;
  var mapFiltersContainer = map.querySelector('.map__filters-container');

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

  var setCapacity = function (numberOfRooms, numberOfGuests, element) {
    if (numberOfRooms === 1 && numberOfGuests === 1) {
      element.querySelector('.popup__text--capacity').textContent = numberOfRooms + ' комната для ' + numberOfGuests + ' гостя';
    } else if (numberOfRooms === 1) {
      element.querySelector('.popup__text--capacity').textContent = numberOfRooms + ' комната для ' + numberOfGuests + ' гостей';
    } else {
      element.querySelector('.popup__text--capacity').textContent = numberOfRooms + ' комнаты для ' + numberOfGuests + ' гостей';
    }
  };

  var makePhotoElements = function (photosArray) {
    var fragmentPhotos = document.createDocumentFragment();

    if (photosArray.length !== 0) {
      for (var j = 0/* 1*/; j < photosArray.length; j++) {
        var photoElement = mapCardTemplate.querySelector('.popup__photo').cloneNode(true);
        photoElement.src = photosArray[j];
        fragmentPhotos.appendChild(photoElement);
      }
    } else {
      return fragmentPhotos;
    }
    return fragmentPhotos;
  };

  var renderCards = function (offers) {
    var fragmentCards = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      var cardElement = mapCardTemplate.cloneNode(true);

      cardElement.querySelector('.popup__avatar').src = offers[i].author.avatar;
      cardElement.querySelector('.popup__title').textContent = offers[i].offer.title;
      cardElement.querySelector('.popup__text--address').textContent = offers[i].offer.address;
      cardElement.querySelector('.popup__text--price').innerHTML = offers[i].offer.price + '&#x20bd;' + '<span>/ночь</span>';

      setCapacity(offers[i].offer.rooms, offers[i].offer.guests, cardElement);

      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offers[i].offer.checkin + ', выезд до ' + offers[i].offer.checkout;
      cardElement.querySelector('.popup__description').textContent = offers[i].offer.description;

      getOfferType(offers[i].offer.type, cardElement);

      removeElementIfIncluded(offers[i].offer.features, 'wifi', cardElement, '.popup__feature--wifi');
      removeElementIfIncluded(offers[i].offer.features, 'dishwasher', cardElement, '.popup__feature--dishwasher');
      removeElementIfIncluded(offers[i].offer.features, 'parking', cardElement, '.popup__feature--parking');
      removeElementIfIncluded(offers[i].offer.features, 'washer', cardElement, '.popup__feature--washer');
      removeElementIfIncluded(offers[i].offer.features, 'elevator', cardElement, '.popup__feature--elevator');
      removeElementIfIncluded(offers[i].offer.features, 'conditioner', cardElement, '.popup__feature--conditioner');

      cardElement.querySelector('.popup__photos').appendChild(makePhotoElements(offers[i].offer.photos));

      fragmentCards.appendChild(cardElement);
    }

    map.insertBefore(fragmentCards, mapFiltersContainer);

    map.querySelectorAll('.map__card').forEach(function (item) {
      item.querySelector('.popup__photos').querySelector('.popup__photo').remove();
    });

    window.map.renderPin(offers);

    // скрытие карточек
    var mapCards = map.querySelectorAll('.map__card');
    mapCards.forEach(function (item) {
      item.classList.add('hidden');
    });

  };

  // далее отображение карточки

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

  window.cards = {
    renderCards: renderCards,
    showCards: showCards,
    closeCards: closeCards,
    removeCards: removeCards
  };
})();

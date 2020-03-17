'use strict';
// модуль, который создаёт карточки похожих объявлений

(function () {
  var map = document.querySelector('.map');
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
      for (var j = 0; j < photosArray.length; j++) {
        var photoElement = mapCardTemplate.querySelector('.popup__photo').cloneNode(true);
        photoElement.src = photosArray[j];
        fragmentPhotos.appendChild(photoElement);
      }
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

    window.pin.renderPin(offers);

    // скрытие карточек
    var mapCards = map.querySelectorAll('.map__card');
    mapCards.forEach(function (item) {
      item.classList.add('hidden');
    });

  };

  window.cards = {
    renderCards: renderCards
  };
})();

'use strict';
// модуль, который работает с формой объявления

(function () {
  var mapPinsList = document.querySelector('.map__pins');

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapFilters = mapFiltersContainer.querySelector('.map__filters');
  var filterHousingType = mapFilters.querySelector('#housing-type');
  var mapFiltersSelect = mapFiltersContainer.querySelectorAll('select');
  var mapFiltersFieldset = mapFiltersContainer.querySelector('fieldset');

  var addressInput = adForm.querySelector('#address');

  var adFromPriceInput = adForm.querySelector('#price');

  var adFormType = adForm.querySelector('#type');
  // var adFormTypeOptions = adFormType.options;

  var adFormTime = adForm.querySelector('.ad-form__element--time');
  var adFormTimeIn = adFormTime.querySelector('#timein');
  var adFormTimeOut = adFormTime.querySelector('#timeout');

  var adFormRoomNumber = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var adFormCapacitieOptions = adFormCapacity.options;

  var mapPinMain = mapPinsList.querySelector('.map__pin--main');
  var adFormElementSubmit = adForm.querySelector('.ad-form__element--submit');
  var adFormReset = adFormElementSubmit.querySelector('.ad-form__reset');

  var successTemplate = document.querySelector('#success').content;
  var errorTemplate = document.querySelector('#error').content;
  var main = document.querySelector('main');

  var map = document.querySelector('.map');

  var offersServer = [];

  // Неактивное состояние

  var setDisabledAttribute = function (arr) {
    if (Object.keys(arr).length === 0) {
      arr.setAttribute('disabled', 'disabled');
    } else {
      for (var i = 0; i < arr.length; i++) {
        arr[i].setAttribute('disabled', 'disabled');
      }
    }
  };

  var removeDisabledAttribute = function (arr) {
    if (Object.keys(arr).length === 0) {
      arr.removeAttribute('disabled');
    } else {
      for (var i = 0; i < arr.length; i++) {
        arr[i].removeAttribute('disabled');
      }
    }
  };

  var setAddressValue = function (offerAddressX, offerAddressY) {
    addressInput.value = Math.floor(offerAddressX) + ', ' + Math.floor(offerAddressY);
  };
  setDisabledAttribute(adFormFieldsets);
  setDisabledAttribute(mapFiltersSelect);
  setDisabledAttribute(mapFiltersFieldset);
  setAddressValue(window.data.MAIN_PIN_LEFT_TOP_COORDINATE_X + window.data.PIN_HALF_WIDTH,
      window.data.MAIN_PIN_LEFT_TOP_COORDINATE_Y + window.data.PIN_HALF_WIDTH);

  // Активное состояние

  var getFiveRandomElements = function (array) {
    var dataCopy = [];
    if (array) {
      dataCopy = array;
    } else {
      dataCopy = offersServer.slice();
    }

    var initialDataLength = dataCopy.length;
    var dataFiveElements = [];
    var numberOffers;

    if (dataCopy.length < window.data.MAX_NUMBER_OF_OFFERS) {
      numberOffers = dataCopy.length;
    } else {
      numberOffers = window.data.MAX_NUMBER_OF_OFFERS;
    }

    for (var i = 0; i < numberOffers; i++) {
      var randomNumber = window.util.randomInteger(0, initialDataLength - 1);
      dataFiveElements[i] = dataCopy[randomNumber];
      dataCopy.splice(randomNumber, 1);
      initialDataLength = initialDataLength - 1;
    }
    return dataFiveElements;
  };

  var setPageActive = function () {
    var mapButtons = mapPinsList.querySelectorAll('button');
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    for (var i = 1; i < mapButtons.length; i++) {
      mapButtons[i].remove();
    }

    var onLoadSuccess = function (data) {
      offersServer = data;

      window.cards.renderCards(getFiveRandomElements());
      window.map.showCards();
      window.map.closeCards();

      filterHousingType.addEventListener('change', function () {
        var typeFilteredOffers;
        if (filterHousingType.value === 'palace') {
          typeFilteredOffers = offersServer.filter(function (oneOffer) {
            return oneOffer.offer.type === 'palace';
          });
        } else if (filterHousingType.value === 'flat') {
          typeFilteredOffers = offersServer.filter(function (oneOffer) {
            return oneOffer.offer.type === 'flat';
          });
        } else if (filterHousingType.value === 'house') {
          typeFilteredOffers = offersServer.filter(function (oneOffer) {
            return oneOffer.offer.type === 'house';
          });
        } else if (filterHousingType.value === 'bungalo') {
          typeFilteredOffers = offersServer.filter(function (oneOffer) {
            return oneOffer.offer.type === 'bungalo';
          });
        } else if (filterHousingType.value === 'any') {
          typeFilteredOffers = getFiveRandomElements();
        }

        mapButtons = mapPinsList.querySelectorAll('button');
        for (i = 1; i < mapButtons.length; i++) {
          mapButtons[i].remove();
        }

        window.map.removeCards();

        window.cards.renderCards(getFiveRandomElements(typeFilteredOffers));
        window.map.closeCards();
        window.map.showCards();

      });

      removeDisabledAttribute(adFormFieldsets);
      removeDisabledAttribute(mapFiltersSelect);
      removeDisabledAttribute(mapFiltersFieldset);
    };

    window.backend.load(onLoadSuccess, window.backend.onLoadError);
  };

  mapFilters.addEventListener('change', function () {
    var mapCards = map.querySelectorAll('.map__card');
    var mapButtons = mapPinsList.querySelectorAll('button');

    for (var i = 0; i < mapButtons.length; i++) {
      mapButtons[i].classList.remove('map__pin--active');
    }

    mapCards.forEach(function (item) {
      item.classList.add('hidden');
    });
  });

  mapPinMain.addEventListener('mousedown', function (evt) {
    window.util.ifLeftMouseEventDoAction(evt, setPageActive, setAddressValue(window.data.MAIN_PIN_LEFT_TOP_COORDINATE_X +
        window.data.PIN_HALF_WIDTH, window.data.MAIN_PIN_LEFT_TOP_COORDINATE_Y + window.data.PIN_WIDTH + window.data.PIN_PEAK_HEIGHT));
  }, {once: true});

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.ifEnterEventDoAction(evt, setPageActive, setAddressValue(window.data.MAIN_PIN_LEFT_TOP_COORDINATE_X +
        window.data.PIN_HALF_WIDTH, window.data.MAIN_PIN_LEFT_TOP_COORDINATE_Y + window.data.PIN_WIDTH + window.data.PIN_PEAK_HEIGHT));
  }, {once: true});

  var resetForm = function () {
    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    var mapButtons = mapPinsList.querySelectorAll('button');
    for (var i = 1; i < mapButtons.length; i++) {
      mapButtons[i].remove();
    }

    mapPinMain.style = 'left: ' + window.data.MAIN_PIN_LEFT_TOP_COORDINATE_X + 'px; top:' + window.data.MAIN_PIN_LEFT_TOP_COORDINATE_Y + 'px;';

    mapFilters.reset();
    adForm.reset();
    adFormCapacitieOptions[2].selected = 'true';
    adFromPriceInput.min = '1000';
    adFromPriceInput.placeholder = '1000';

    window.map.removeCards();

    setDisabledAttribute(adFormFieldsets);
    setDisabledAttribute(mapFiltersSelect);
    setDisabledAttribute(mapFiltersFieldset);

    setAddressValue(window.data.MAIN_PIN_LEFT_TOP_COORDINATE_X + window.data.PIN_HALF_WIDTH,
        window.data.MAIN_PIN_LEFT_TOP_COORDINATE_Y + window.data.PIN_HALF_WIDTH);

    mapPinMain.addEventListener('mousedown', function (evt) {
      window.util.ifLeftMouseEventDoAction(evt, setPageActive, setAddressValue(window.data.MAIN_PIN_LEFT_TOP_COORDINATE_X +
          window.data.PIN_HALF_WIDTH, window.data.MAIN_PIN_LEFT_TOP_COORDINATE_Y + window.data.PIN_WIDTH + window.data.PIN_PEAK_HEIGHT));
    }, {once: true});
  };

  adFormReset.addEventListener('mousedown', function (evt) {
    window.util.ifLeftMouseEventDoAction(evt, resetForm);
  });

  adFormReset.addEventListener('keydown', function (evt) {
    window.util.ifEnterEventDoAction(evt, resetForm);
  });

  // Валидация
  // Количество комнат/Количество мест
  adFormCapacitieOptions[0].setAttribute('disabled', 'disabled');
  adFormCapacitieOptions[1].setAttribute('disabled', 'disabled');
  adFormCapacitieOptions[3].setAttribute('disabled', 'disabled');
  adFormCapacitieOptions[2].selected = 'true';

  adFormRoomNumber.addEventListener('change', function () {
    if (adFormRoomNumber.selectedIndex === 0) {
      adFormCapacitieOptions[2].selected = 'true';
      adFormCapacitieOptions[2].removeAttribute('disabled');
      adFormCapacitieOptions[0].setAttribute('disabled', 'disabled');
      adFormCapacitieOptions[1].setAttribute('disabled', 'disabled');
      adFormCapacitieOptions[3].setAttribute('disabled', 'disabled');
    } else if (adFormRoomNumber.selectedIndex === 1) {
      adFormCapacitieOptions[1].selected = 'true';
      adFormCapacitieOptions[1].removeAttribute('disabled');
      adFormCapacitieOptions[2].removeAttribute('disabled');
      adFormCapacitieOptions[0].setAttribute('disabled', 'disabled');
      adFormCapacitieOptions[3].setAttribute('disabled', 'disabled');
    } else if (adFormRoomNumber.selectedIndex === 2) {
      adFormCapacitieOptions[0].selected = 'false';
      adFormCapacitieOptions[0].removeAttribute('disabled');
      adFormCapacitieOptions[1].removeAttribute('disabled');
      adFormCapacitieOptions[2].removeAttribute('disabled');
      adFormCapacitieOptions[3].setAttribute('disabled', 'disabled');
    } else if (adFormRoomNumber.selectedIndex === 3) {
      adFormCapacitieOptions[3].selected = 'true';
      adFormCapacitieOptions[3].removeAttribute('disabled');
      adFormCapacitieOptions[0].setAttribute('disabled', 'disabled');
      adFormCapacitieOptions[1].setAttribute('disabled', 'disabled');
      adFormCapacitieOptions[2].setAttribute('disabled', 'disabled');
    }
  });

  // Минимальная цена
  adFromPriceInput.min = '1000';
  adFromPriceInput.placeholder = '1000';
  adFormType.addEventListener('change', function () {
    if (adFormType.value === 'bungalo') {
      adFromPriceInput.min = '0';
      adFromPriceInput.placeholder = '0';
    }
    if (adFormType.value === 'flat') {
      adFromPriceInput.min = '1000';
      adFromPriceInput.placeholder = '1000';
    }
    if (adFormType.value === 'house') {
      adFromPriceInput.min = '5000';
      adFromPriceInput.placeholder = '5000';
    }
    if (adFormType.value === 'palace') {
      adFromPriceInput.min = '10000';
      adFromPriceInput.placeholder = '10000';
    }
  });

  // Время заезда/выезда
  var onTimeChange = function (time1, time2) {
    if (time1.value === '12:00') {
      time2.value = '12:00';
    }
    if (time1.value === '13:00') {
      time2.value = '13:00';
    }
    if (time1.value === '14:00') {
      time2.value = '14:00';
    }
  };

  adFormTimeIn.addEventListener('change', function () {
    onTimeChange(adFormTimeIn, adFormTimeOut);
  });
  adFormTimeOut.addEventListener('change', function () {
    onTimeChange(adFormTimeOut, adFormTimeIn);
  });

  // Отправка формы
  var onSendSuccess = function () {
    var successMessage = successTemplate.cloneNode(true);

    main.appendChild(successMessage);

    var successBlock = main.querySelector('.success');

    resetForm();

    document.addEventListener('keydown', function (evt) {
      window.util.ifEscEventDoAction(evt, function () {
        successBlock.remove();
      });
    });

    document.addEventListener('click', function () {
      successBlock.remove();
    });
  };

  var onSendError = function () {
    var errorMessage = errorTemplate.cloneNode(true);

    main.appendChild(errorMessage);

    var errorBlock = main.querySelector('.error');
    var errorButton = errorBlock.querySelector('.error__button');

    errorButton.addEventListener('mousedown', function (evt) {
      window.util.ifLeftMouseEventDoAction(evt, function () {
        errorBlock.remove();
      });
    });

    document.addEventListener('keydown', function (evt) {
      window.util.ifEscEventDoAction(evt, function () {
        errorBlock.remove();
      });
    });

    document.addEventListener('click', function () {
      errorBlock.remove();
    });
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(adForm), onSendSuccess, onSendError);
  });

  window.form = {
    setAddressValue: setAddressValue
  };
})();

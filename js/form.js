'use strict';
// модуль, который работает с формой объявления

(function () {
  var mapPinsList = document.querySelector('.map__pins');

  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');

  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var mapFilters = mapFiltersContainer.querySelector('.map__filters');

  var mapFiltersSelect = mapFiltersContainer.querySelectorAll('select');
  var mapFiltersFieldset = mapFiltersContainer.querySelector('fieldset');

  var addressInput = adForm.querySelector('#address');

  var adFromPriceInput = adForm.querySelector('#price');

  var adFormType = adForm.querySelector('#type');

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

  var avatarPreview = adForm.querySelector('.ad-form-header__preview img');

  var offersServer = [];

  // Неактивное состояние

  var setDisabledAttribute = function (arr) {
    if (Object.keys(arr).length !== 0) {
      arr.forEach(function (item) {
        if (Object.keys(item).length === 0) {
          item.setAttribute('disabled', 'disabled');
        } else {
          item.forEach(function (element) {
            element.setAttribute('disabled', 'disabled');
          });
        }
      });
    } else {
      if (Object.keys(arr).length === 0) {
        arr.setAttribute('disabled', 'disabled');
      } else {
        arr.forEach(function (element) {
          element.setAttribute('disabled', 'disabled');
        });
      }
    }
  };

  var removeDisabledAttribute = function (arr) {
    if (Object.keys(arr).length !== 0) {
      arr.forEach(function (item) {
        if (Object.keys(item).length === 0) {
          item.removeAttribute('disabled');
        } else {
          item.forEach(function (element) {
            element.removeAttribute('disabled', 'disabled');
          });
        }
      });
    } else {
      if (Object.keys(arr).length === 0) {
        arr.removeAttribute('disabled');
      } else {
        arr.forEach(function (element) {
          element.removeAttribute('disabled', 'disabled');
        });
      }
    }
  };

  var setAddressValue = function (offerAddressX, offerAddressY) {
    addressInput.value = Math.floor(offerAddressX) + ', ' + Math.floor(offerAddressY);
  };

  setDisabledAttribute([adFormFieldsets, mapFiltersSelect, mapFiltersFieldset]);
  setAddressValue(window.data.MAIN_PIN_LEFT_TOP_COORDINATE_X + window.data.PIN_HALF_WIDTH,
      window.data.MAIN_PIN_LEFT_TOP_COORDINATE_Y + window.data.PIN_HALF_WIDTH);

  // Активное состояние

  var getRandomOffers = function (offersAmount, array) {
    var dataCopy = [];
    dataCopy = array ? array : offersServer.slice();

    var initialDataLength = dataCopy.length;
    var dataFiveElements = [];

    var numberOffers;
    numberOffers = (dataCopy.length < offersAmount) ? dataCopy.length : offersAmount;

    for (var i = 0; i < numberOffers; i++) {
      var randomNumber = window.util.getRandomInteger(0, initialDataLength - 1);
      dataFiveElements[i] = dataCopy[randomNumber];
      dataCopy.splice(randomNumber, 1);
      initialDataLength = initialDataLength - 1;
    }
    return dataFiveElements;
  };

  var setPageActive = function () {
    mapPinMain.removeEventListener('mousedown', onMainPinMouseDown);
    mapPinMain.removeEventListener('keydown', onMainPinKeyDown);

    var mapButtons = mapPinsList.querySelectorAll('button');
    document.querySelector('.map').classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    for (var i = 1; i < mapButtons.length; i++) {
      mapButtons[i].remove();
    }

    var onLoadSuccess = function (data) {
      offersServer = data;

      window.cards.renderElement(getRandomOffers(window.data.MAX_NUMBER_OF_OFFERS));
      window.map.showCards();
      window.map.closeCards();

      mapFilters.addEventListener('change', function () {
        var mapCards = map.querySelectorAll('.map__card');
        mapButtons = mapPinsList.querySelectorAll('button');

        mapButtons.forEach(function (item) {
          item.classList.remove('map__pin--active');
        });

        mapCards.forEach(function (item) {
          item.classList.add('hidden');
        });

        var filterOffersWithDelay = window.debounce(function () {
          for (i = 1; i < mapButtons.length; i++) {
            mapButtons[i].remove();
          }

          window.map.removeCards();
          window.cards.renderElement(getRandomOffers(window.data.MAX_NUMBER_OF_OFFERS, window.mapFilter.onFilterChange(offersServer)));
          window.map.closeCards();
          window.map.showCards();
        });

        filterOffersWithDelay();

      });

      removeDisabledAttribute([adFormFieldsets, mapFiltersSelect, mapFiltersFieldset]);
    };

    window.backend.load(onLoadSuccess, window.backend.onLoadError);
  };

  var onMainPinMouseDown = function (evt) {
    window.util.ifLeftMouseEventDoAction(evt, setPageActive);
  };

  var onMainPinKeyDown = function (evt) {
    window.util.ifEnterEventDoAction(evt, setPageActive);
  };

  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
  mapPinMain.addEventListener('keydown', onMainPinKeyDown);

  var onFormReset = function () {
    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    var mapButtons = mapPinsList.querySelectorAll('button');
    for (var i = 1; i < mapButtons.length; i++) {
      mapButtons[i].remove();
    }

    mapPinMain.style = 'left: ' + window.data.MAIN_PIN_LEFT_TOP_COORDINATE_X + 'px; top:' + window.data.MAIN_PIN_LEFT_TOP_COORDINATE_Y + 'px;';

    mapFilters.reset();
    adForm.reset();

    avatarPreview.src = window.data.AVATAR_SRC;

    var housePhotoPreviews = adForm.querySelectorAll('.ad-form__photo');
    for (i = 0; i < housePhotoPreviews.length - 1; i++) {
      housePhotoPreviews[i].remove();
    }

    adFormCapacitieOptions[2].selected = 'true';
    adFromPriceInput.min = '1000';
    adFromPriceInput.placeholder = '1000';

    window.map.removeCards();

    setDisabledAttribute([adFormFieldsets, mapFiltersSelect, mapFiltersFieldset]);

    setAddressValue(window.data.MAIN_PIN_LEFT_TOP_COORDINATE_X + window.data.PIN_HALF_WIDTH,
        window.data.MAIN_PIN_LEFT_TOP_COORDINATE_Y + window.data.PIN_HALF_WIDTH);

    mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
    mapPinMain.addEventListener('keydown', onMainPinKeyDown);
  };

  adFormReset.addEventListener('mousedown', function (evt) {
    window.util.ifLeftMouseEventDoAction(evt, onFormReset);
  });

  adFormReset.addEventListener('keydown', function (evt) {
    window.util.ifEnterEventDoAction(evt, onFormReset);
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

    onFormReset();

    var onDocumentEscapePress = function (evt) {
      window.util.ifEscEventDoAction(evt, function () {
        successBlock.remove();
      });
      document.removeEventListener('keydown', onDocumentEscapePress);
      document.removeEventListener('click', onDocumentClick);
    };

    var onDocumentClick = function () {
      successBlock.remove();
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentEscapePress);
    };

    document.addEventListener('keydown', onDocumentEscapePress);

    document.addEventListener('click', onDocumentClick);
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
    var formData = new FormData(adForm);

    formData.append(adForm.querySelector('#address').name, adForm.querySelector('#address').value);

    window.backend.send(formData, onSendSuccess, onSendError);
  });

  window.form = {
    setAddressValue: setAddressValue
  };
})();

'use strict';

var NUMBER_OF_OFFERS = 8;
var priceMin = 0;
var priceMax = 10000;
var roomsMin = 1;
var roomsMax = 100;
var guestsMin = 1;
var guestsMax = 100;
var MAP_MIN_COORDINATE_X = 0;
var MAP_MAX_COORDINATE_X = 1200;
var MAP_MIN_COORDINATE_Y = 130;
var MAP_MAX_COORDINATE_Y = 630;
var PIN_WIDTH = 65;
var PIN_HALF_WIDTH = PIN_WIDTH / 2;
var PIN_PEAK_HEIGHT = 20;
var MAIN_PIN_LEFT_TOP_COORDINATE_X = 570;
var MAIN_PIN_LEFT_TOP_COORDINATE_Y = 375;
/* var positionPinMinX = 31;
var positionPinMaxX = 1169;
var positionPinMinY = 130;
var positionPinMaxY = 630;
*/

var randomInteger = function (min, max) {
  // случайное число от min до max включительно
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};

var mapPinsList = document.querySelector('.map__pins');
var mapPinsTemplate = document.querySelector('#pin').content;


var offerTitleArray = [];
var offerDescriptionArray = [];
var offerTypesArray = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckArray = ['12:00', '13:00', '14:00'];
var offerFeaturesArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerPhotosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var makeOffer = function (offersNumber, avatarNumber,
    offerPrice, offerType, offerRooms, offerGuests, offerCheckIn,
    offerCheckOut, offerFeatures, offerPhotos, locationX, locationY) {

  var offerObject = {
    author: {},
    offer: {},
    location: {}
  };
  var features = [];
  var photos = [];

  for (var i = 0; i < offersNumber; i++) {
    var preIndex = i + 1;
    offerTitleArray[i] = 'Объект' + preIndex;
    offerDescriptionArray[i] = 'Описание' + preIndex;
  }

  for (i = 0; i < offerFeatures; i++) {
    features[i] = offerFeaturesArray[randomInteger(0, offerFeatures - 1)];
  }


  for (i = 0; i < offerPhotos; i++) {
    photos[i] = offerPhotosArray[randomInteger(0, offerPhotos)];
  }

  offerObject.author.avatar = 'img/avatars/user0' + avatarNumber + '.png';
  offerObject.offer.title = offerTitleArray[randomInteger(0, offersNumber - 1)];
  offerObject.offer.address = locationX + ', ' + locationY;
  offerObject.offer.price = offerPrice + ' Р/ночь';
  offerObject.offer.type = offerTypesArray[offerType];
  offerObject.offer.rooms = offerRooms;
  offerObject.offer.guests = offerGuests;
  offerObject.offer.checkin = offerCheckArray[offerCheckIn];
  offerObject.offer.checkout = offerCheckArray[offerCheckOut];
  offerObject.offer.features = features;
  offerObject.offer.description = offerDescriptionArray[randomInteger(0, offersNumber - 1)];
  offerObject.offer.photos = photos;
  offerObject.location.x = locationX;
  offerObject.location.y = locationY;

  return offerObject;
};

var makeOffersArray = function (offersNumber) {
  var offersArray = [];
  for (var i = 0; i < offersNumber; i++) {
    offersArray[i] = makeOffer(offersNumber, i + 1, randomInteger(priceMin, priceMax), randomInteger(0, offerTypesArray.length - 1),
        randomInteger(roomsMin, roomsMax), randomInteger(guestsMin, guestsMax), randomInteger(0, offerCheckArray.length - 1),
        randomInteger(0, offerCheckArray.length - 1), randomInteger(1, offerFeaturesArray.length), randomInteger(1, offerPhotosArray.length),
        randomInteger(MAP_MIN_COORDINATE_X + PIN_WIDTH, MAP_MAX_COORDINATE_X - PIN_WIDTH), randomInteger(MAP_MIN_COORDINATE_Y + PIN_WIDTH, MAP_MAX_COORDINATE_Y - PIN_WIDTH));
  }
  return offersArray;
};

var renderPin = function (oneOffer) {
  var fragmentPins = document.createDocumentFragment();
  for (var i = 0; i < NUMBER_OF_OFFERS; i++) {
    var pinElement = mapPinsTemplate.cloneNode(true);

    pinElement.querySelector('.map__pin').style = 'left: ' + oneOffer[i].location.x + 'px; top:' + oneOffer[i].location.y + 'px;';
    pinElement.querySelector('img').src = oneOffer[i].author.avatar;
    pinElement.querySelector('img').alt = oneOffer[i].offer.title;

    fragmentPins.appendChild(pinElement);
  }
  return fragmentPins;
};

// mapPinsList.appendChild(renderPin(makeOffersArray(NUMBER_OF_OFFERS)));

// Неактивное состояние

var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var mapFiltersSelect = mapFiltersContainer.querySelectorAll('select');
var mapFiltersFieldset = mapFiltersContainer.querySelector('fieldset');
var addressInput = adForm.querySelector('#address');
var adFormRoomNumber = adForm.querySelector('#room_number');
var adFormRoomNumberOptions = adFormRoomNumber.options;
var adFormCapacity = adForm.querySelector('#capacity');
var adFormCapacitieOptions = adFormCapacity.options;

var setDisabledAttribute = function (array) {
  /* if (!Array.isArray(array)) {
    array.setAttribute('disabled', 'disabled');
  } else {}*/
  // Какое должно быть условие для того, чтобы функция заработала не только с массивами?
  for (var i = 0; i < array.length; i++) {
    array[i].setAttribute('disabled', 'disabled');
  }
}

var removeDisabledAttribute = function (array) {
  for (var i = 0; i < array.length; i++) {
    array[i].removeAttribute('disabled');
  }
}

var setAddressValue = function (offerAddressX, offerAddressY) {
  addressInput.value = offerAddressX + ', ' + offerAddressY;
}

setDisabledAttribute(adFormFieldsets);
setDisabledAttribute(mapFiltersSelect);
// setDisabledAttribute(mapFiltersFieldset);
mapFiltersFieldset.setAttribute('disabled', 'disabled');
setAddressValue(MAIN_PIN_LEFT_TOP_COORDINATE_X + PIN_HALF_WIDTH, MAIN_PIN_LEFT_TOP_COORDINATE_Y + PIN_HALF_WIDTH);

// Активное состояние

var mapPinMain = mapPinsList.querySelector('.map__pin--main');
var mapPinMainDead = mapPinMain;
var LEFT_MOUSE_BUTON_RETURN = 0;
var ENTER_KEY = 'Enter';

var setPageActive = function () {
  document.querySelector('.map').classList.remove('map--faded');
  mapPinsList.appendChild(renderPin(makeOffersArray(NUMBER_OF_OFFERS)));
  removeDisabledAttribute(adFormFieldsets);
  removeDisabledAttribute(mapFiltersSelect);
  mapFiltersFieldset.removeAttribute('disabled', 'disabled');
};

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_MOUSE_BUTON_RETURN) {
    setPageActive();
    setAddressValue(MAIN_PIN_LEFT_TOP_COORDINATE_X + PIN_HALF_WIDTH, MAIN_PIN_LEFT_TOP_COORDINATE_Y + PIN_WIDTH + PIN_PEAK_HEIGHT);
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    setPageActive();
    setAddressValue(MAIN_PIN_LEFT_TOP_COORDINATE_X + PIN_HALF_WIDTH, MAIN_PIN_LEFT_TOP_COORDINATE_Y + PIN_WIDTH + PIN_PEAK_HEIGHT);
  }
});

var adFormElementSubmit = adForm.querySelector('.ad-form__element--submit');
var adFormReset = adFormElementSubmit.querySelector('.ad-form__reset');

var resetForm = function () {
  document.querySelector('.map').classList.add('map--faded'); // работает

  var mapButtons = mapPinsList.querySelectorAll('button'); // не работает
  for (var i = 1; i < mapButtons.length; i++) {
    mapButtons[i].remove();
  }
  /*
  for (var i = 0; i < numberOfOffers; i++) {
    fragmentPins.appendChild(renderPin(makeOffersArray(numberOfOffers)));
  }
  */
  setDisabledAttribute(adFormFieldsets); // не работает
  setDisabledAttribute(mapFiltersSelect); // не работает
  mapFiltersFieldset.setAttribute('disabled', 'disabled'); // не работает
  setAddressValue(MAIN_PIN_LEFT_TOP_COORDINATE_X + PIN_HALF_WIDTH, MAIN_PIN_LEFT_TOP_COORDINATE_Y + PIN_HALF_WIDTH); // не работает, проверить, что не так
};

adFormReset.addEventListener('mousedown', function (evt) {
  if (evt.button === LEFT_MOUSE_BUTON_RETURN) {
    resetForm();
  }
});

adFormReset.addEventListener('keydown', function () {
    if (evt.key === ENTER_KEY) {
      resetForm();
    }
});

// сначала тоже должно быть
adFormCapacitieOptions[0].setAttribute('disabled', 'disabled');
adFormCapacitieOptions[1].setAttribute('disabled', 'disabled');
adFormCapacitieOptions[3].setAttribute('disabled', 'disabled');
adFormRoomNumber.addEventListener('change', function () {
  var index = adFormRoomNumber.selectedIndex;
  console.log(index);
  if (adFormRoomNumber.selectedIndex === 0) {
    adFormCapacitieOptions[2].removeAttribute('disabled');
    adFormCapacitieOptions[0].setAttribute('disabled', 'disabled');
    adFormCapacitieOptions[1].setAttribute('disabled', 'disabled');
    adFormCapacitieOptions[3].setAttribute('disabled', 'disabled');
  } else if (adFormRoomNumber.selectedIndex === 1) {
    adFormCapacitieOptions[1].removeAttribute('disabled');
    adFormCapacitieOptions[2].removeAttribute('disabled');
    adFormCapacitieOptions[0].setAttribute('disabled', 'disabled');
    adFormCapacitieOptions[3].setAttribute('disabled', 'disabled');
  } else if (adFormRoomNumber.selectedIndex === 2) {
    adFormCapacitieOptions[0].removeAttribute('disabled');
    adFormCapacitieOptions[1].removeAttribute('disabled');
    adFormCapacitieOptions[2].removeAttribute('disabled');
    adFormCapacitieOptions[3].setAttribute('disabled', 'disabled');
  } else if (adFormRoomNumber.selectedIndex === 3) {
    adFormCapacitieOptions[3].removeAttribute('disabled');
    adFormCapacitieOptions[0].setAttribute('disabled', 'disabled');
    adFormCapacitieOptions[1].setAttribute('disabled', 'disabled');
    adFormCapacitieOptions[2].setAttribute('disabled', 'disabled');
  }
});

/*
adFormRoomNumber.addEventListener('invalid', function (evt) {
  if (adFormRoomNumber.selectedIndex === 2/*&& !adFormCapacitieOptions[2].selected*///) {
  /*  adFormRoomNumber.setCustomValidity('1 комната - для 1 гостя');
  }
});
*/
/*
adFormRoomNumber.addEventListener('invalid', function (evt) {

});
*/
/*
console.log(adFormRoomNumberOptions[0].selected);
adFormRoomNumber.addEventListener('invalid', function (evt) {

  if (adFormRoomNumberOptions[0].selected && !adFormCapacitieOptions[2].selected) {
    adFormRoomNumber.setCustomValidity('1 комната - для 1 гостя');
    console.log('1 guest!');
  }
  /*
  if (adFormRoomNumber.selectedIndex) {

  }*/
  /*
  if (adFormRoomNumbersOption[0] !== adFormCapacitiesOption[2]) {
    adFormRoomNumber.setCustomValidity('1 комната - для 1 гостя');
  }*/
/*});*/
/*
var roomsCapacityValidator = function (rooms, capacity) {
  for (var i = 0; i < rooms.length; i++) {
    if (rooms[i].value !=== 1 && rooms.value !=== 1) {

    }
  }
}
*/

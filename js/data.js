'use strict';
// модуль, который создаёт данные;

(function () {
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
      features[i] = offerFeaturesArray[window.util.randomInteger(0, offerFeatures - 1)];
    }


    for (i = 0; i < offerPhotos; i++) {
      photos[i] = offerPhotosArray[window.util.randomInteger(0, offerPhotos)];
    }

    offerObject.author.avatar = 'img/avatars/user0' + avatarNumber + '.png';
    offerObject.offer.title = offerTitleArray[window.util.randomInteger(0, offersNumber - 1)];
    offerObject.offer.address = locationX + ', ' + locationY;
    offerObject.offer.price = offerPrice + ' Р/ночь';
    offerObject.offer.type = offerTypesArray[offerType];
    offerObject.offer.rooms = offerRooms;
    offerObject.offer.guests = offerGuests;
    offerObject.offer.checkin = offerCheckArray[offerCheckIn];
    offerObject.offer.checkout = offerCheckArray[offerCheckOut];
    offerObject.offer.features = features;
    offerObject.offer.description = offerDescriptionArray[window.util.randomInteger(0, offersNumber - 1)];
    offerObject.offer.photos = photos;
    offerObject.location.x = locationX;
    offerObject.location.y = locationY;

    return offerObject;
  };

  var makeOffersArray = function (offersNumber) {
    var offersArray = [];
    for (var i = 0; i < offersNumber; i++) {
      offersArray[i] = makeOffer(offersNumber, i + 1, window.util.randomInteger(priceMin, priceMax), window.util.randomInteger(0, offerTypesArray.length - 1),
          window.util.randomInteger(roomsMin, roomsMax), window.util.randomInteger(guestsMin, guestsMax), window.util.randomInteger(0, offerCheckArray.length - 1),
          window.util.randomInteger(0, offerCheckArray.length - 1), window.util.randomInteger(1, offerFeaturesArray.length), window.util.randomInteger(1, offerPhotosArray.length),
          window.util.randomInteger(MAP_MIN_COORDINATE_X + PIN_HALF_WIDTH, MAP_MAX_COORDINATE_X - PIN_WIDTH), window.util.randomInteger(MAP_MIN_COORDINATE_Y, MAP_MAX_COORDINATE_Y));
    }
    return offersArray;
  };

  window.data = {
    NUMBER_OF_OFFERS: NUMBER_OF_OFFERS,
    priceMin: priceMin,
    priceMax: priceMax,
    roomsMin: roomsMin,
    roomsMax: roomsMax,
    guestsMin: guestsMin,
    guestsMax: guestsMax,
    MAP_MIN_COORDINATE_X: MAP_MIN_COORDINATE_X,
    MAP_MAX_COORDINATE_X: MAP_MAX_COORDINATE_X,
    MAP_MIN_COORDINATE_Y: MAP_MIN_COORDINATE_Y,
    MAP_MAX_COORDINATE_Y: MAP_MAX_COORDINATE_Y,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HALF_WIDTH: PIN_HALF_WIDTH,
    PIN_PEAK_HEIGHT: PIN_PEAK_HEIGHT,
    MAIN_PIN_LEFT_TOP_COORDINATE_X: MAIN_PIN_LEFT_TOP_COORDINATE_X,
    MAIN_PIN_LEFT_TOP_COORDINATE_Y: MAIN_PIN_LEFT_TOP_COORDINATE_Y,
    makeOffersArray: makeOffersArray
  };
})();

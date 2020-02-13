'use strict';

/* {
        "author": {
        "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
        },
    "offer": {
    "title": строка, заголовок предложения
    "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
    "price": число, стоимость
    "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo
    "rooms": число, количество комнат
    "guests": число, количество гостей, которое можно разместить
    "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
    "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
    "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
    "description": строка с описанием,
    "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },

    "location": {
    "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
    "y": случайное число, координата y метки на карте от 130 до 630.
    }
}*/
// var avatarTemplate = '';
// var offerFeaturesArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var offerTypesArray = ['palace', 'flat', 'house', 'bungalo'];
// var offerTitleArray = ['Объект1', 'Объект2', 'Объект3', 'Объект4', 'Объект5', 'Объект6', 'Объект7', 'Объект8'];

var randomInteger = function (min, max) {
  // случайное число от min до (max+1)
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};
/*
var createRandomParameters = function () {

}
*/
var mapPinsList = document.querySelector('.map__pins');
var mapPinsTemplate = document.querySelector('#pin').content;

var renderOffer = function (offersNumber, avatarNumber,
    offerPrice, offerType, offerRooms, offerGuests, offerCheckIn,
    offerCheckOut, offerFeatures, offerPhotos, locationX, locationY) {
  var offerObject = {
    author: {},
    offer: {},
    location: {}
  };
  var offerTitleArray = [];
  var offerDescriptionArray = [];
  for (i = 0; i < offersNumber; i++) {
    var preIndex = i + 1;
    offerTitleArray[i] = 'Объект' + preIndex;
    offerDescriptionArray[i] = 'Описание' + preIndex;
  }

  var offerTypesArray = ['palace', 'flat', 'house', 'bungalo'];
  var offerCheckArray = ['12:00', '13:00', '14:00'];
  var offerFeaturesArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var features = [];
  for (var i = 0; i < offerFeatures; i++) {
    features[i] = offerFeaturesArray[randomInteger(1, offerFeatures)];
  }

  var offerPhotosArray = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  /* var photos = [];
  for (i = 0; i < offerPhotos; i++) {
    photos[i] = offerPhotosArray[randomInteger(0, offerPhotos)];
  }*/


  offerObject.author.avatar = 'img/avatars/user0' + avatarNumber + '.png';
  offerObject.offer.title = offerTitleArray[randomInteger(0, 7)];
  offerObject.offer.address = locationX + ', ' + locationY;
  offerObject.offer.price = offerPrice + ' Р/ночь';
  offerObject.offer.type = offerTypesArray[offerType];
  offerObject.offer.rooms = offerRooms;
  offerObject.offer.guests = offerGuests;
  offerObject.offer.checkin = offerCheckArray[offerCheckIn];
  offerObject.offer.checkout = offerCheckArray[offerCheckOut];
  offerObject.offer.features = features;
  offerObject.offer.description = offerDescriptionArray[randomInteger(0, 7)];
  offerObject.offer.photos = offerPhotosArray[randomInteger(0, offerPhotos)];
  offerObject.location.x = locationX;
  offerObject.location.y = locationY;

  return offerObject;
};

var renderOffersArray = function (offersNumber) {
  var offersArray = [];
  for (var i = 0; i < offersNumber; i++) {
    offersArray[i] = renderOffer(offersNumber, i + 1, randomInteger(0, 10000), randomInteger(0, 3), randomInteger(1, 100),
        randomInteger(1, 100), randomInteger(0, 2), randomInteger(0, 2), randomInteger(1, 6), randomInteger(1, 3), randomInteger(31, 1169), randomInteger(130, 630));
  }

  return offersArray;
};

var renderPin = function (oneOffer) {
  var pinElement = mapPinsTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin').style = 'left: ' + oneOffer[i].location.x + 'px; top:' + oneOffer[i].location.y + 'px;';
  pinElement.querySelector('img').src = oneOffer[i].offer.photos;
  pinElement.querySelector('img').alt = oneOffer[i].offer.title;

  return pinElement;
};

var fragmentPins = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  fragmentPins.appendChild(renderPin(renderOffersArray(8)));
}

mapPinsList.appendChild(fragmentPins);
/*
var offers = [
  {
    author: {
      avatar: ''строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
    },

    offer: {
      title: строка, заголовок предложения
      address: строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350",
      price: число, стоимость,
      type: строка с одним из четырёх фиксированных значений: palace, flat, house или bungalo,
      rooms: число, количество комнат,
      guests: число, количество гостей, которое можно разместить,
      checkin: строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      checkout: строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      features: массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      description: строка с описанием,
      photos: массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
    },

    location: {
      x: случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      y: случайное число, координата y метки на карте от 130 до 630.
    }
  },


]
*/
document.querySelector('.map').classList.remove('map--faded');

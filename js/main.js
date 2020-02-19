'use strict';
// var avatarTemplate = '';
// var offerFeaturesArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var offerTypesArray = ['palace', 'flat', 'house', 'bungalo'];
// var offerTitleArray = ['Объект1', 'Объект2', 'Объект3', 'Объект4', 'Объект5', 'Объект6', 'Объект7', 'Объект8'];
var NUMBER_OF_OFFERS = 8;
var priceMin = 0;
var priceMax = 10000;
var roomsMin = 1;
var roomsMax = 100;
var guestsMin = 1;
var guestsMax = 100;
var positionPinMinX = 31;
var positionPinMaxX = 1169;
var positionPinMinY = 130;
var positionPinMaxY = 630;

var randomInteger = function (min, max) {
  // случайное число от min до max включительно
  var random = min + Math.random() * (max + 1 - min);
  return Math.floor(random);
};
/*
var createRandomParameters = function () {

}
*/
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
  offerObject.offer.photos = photos;// offerPhotosArray[randomInteger(0, offerPhotos - 1)];
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
        randomInteger(positionPinMinX, positionPinMaxX), randomInteger(positionPinMinY, positionPinMaxY));
    // console.log(offersArray[i]);
  }
  // console.log(offersArray);
  return offersArray;
};

var renderPin = function (oneOffer) {
   var arrayOfData = [];
   for (var i = 0; i < NUMBER_OF_OFFERS; i++) {
    var pinElement = mapPinsTemplate.cloneNode(true);

    pinElement.querySelector('.map__pin').style = 'left: ' + oneOffer[i].location.x + 'px; top:' + oneOffer[i].location.y + 'px;';
    pinElement.querySelector('img').src = oneOffer[i].author.avatar;
    pinElement.querySelector('img').alt = oneOffer[i].offer.title;

    arrayOfData.push(pinElement);
    // arrayOfData[i] = pinElement;
  }
  // console.log(arrayOfData);
  // return pinElement;
  return arrayOfData;
};

// console.log(renderPin(makeOffersArray(NUMBER_OF_OFFERS)));
var fragmentPins = document.createDocumentFragment();
// for (var i = 0; i < NUMBER_OF_OFFERS; i++) {
// console.log(renderPin(makeOffersArray(NUMBER_OF_OFFERS)));
// fragmentPins.appendChild(renderPin(makeOffersArray(NUMBER_OF_OFFERS)));
// mapPinsList.appendChild(fragmentPins);
// }

 // for (var i = 0; i < NUMBER_OF_OFFERS; i++) {
makeOffersArray(NUMBER_OF_OFFERS);
  fragmentPins.appendChild(renderPin(makeOffersArray(NUMBER_OF_OFFERS)));
 //}
mapPinsList.appendChild(fragmentPins);
// var allPins = renderPin(makeOffersArray(8));
// console.log(allPins);
/* for (var i = 0; i < NUMBER_OF_OFFERS; i++) {
  fragmentPins.appendChild(allPins);
}
*/
// mapPinsList.appendChild(fragmentPins);

document.querySelector('.map').classList.remove('map--faded');

/* var renderPin = function (oneOffer) {
  var pinElement = mapPinsTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin').style = 'left: ' + oneOffer.location.x + 'px; top:' + oneOffer.location.y + 'px;';
  pinElement.querySelector('img').src = oneOffer.author.avatar;
  pinElement.querySelector('img').alt = oneOffery.offer.title;

  return pinElement;
};

var fragmentPins = document.createDocumentFragment();

var makeFragment = function (allOffers) {
  for (var i = 0; i < allOffers; i++) {
    fragmentPins.appendChild(renderPin(makeOffersArray(allOffers)));
  }
  return fragmentPins;
}

mapPinsList.appendChild(makeFragment(8));
*/
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

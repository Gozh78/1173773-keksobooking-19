'use strict';
// модуль, который управляет карточками объявлений и метками: добавляет на страницу нужную карточку, отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;

(function () {
  var mapPinsTemplate = document.querySelector('#pin').content;
  var renderPin = function (oneOffer) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < window.data.NUMBER_OF_OFFERS; i++) {
      var pinElement = mapPinsTemplate.cloneNode(true);

      pinElement.querySelector('.map__pin').style = 'left: ' + oneOffer[i].location.x + 'px; top:' + oneOffer[i].location.y + 'px;';
      pinElement.querySelector('img').src = oneOffer[i].author.avatar;
      pinElement.querySelector('img').alt = oneOffer[i].offer.title;

      fragmentPins.appendChild(pinElement);
    }
    return fragmentPins;
  };

  window.map = {
    renderPin: renderPin
  };
})();

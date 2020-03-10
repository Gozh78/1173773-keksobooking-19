'use strict';
// модуль, который управляет карточками объявлений и метками: добавляет на страницу нужную карточку, отрисовывает метки и осуществляет взаимодействие карточки и метки на карте;

(function () {
  var mapPinsList = document.querySelector('.map__pins');
  var mapPinsTemplate = document.querySelector('#pin').content;

  var renderPin = function (offers) {
    // создаёт пины
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < offers.length; i++) {
      var pinElement = mapPinsTemplate.cloneNode(true);

      pinElement.querySelector('.map__pin').style = 'left: ' + offers[i].location.x + 'px; top:' + offers[i].location.y + 'px;';
      pinElement.querySelector('img').src = offers[i].author.avatar;
      pinElement.querySelector('img').alt = offers[i].offer.title;

      fragmentPins.appendChild(pinElement);
    }

    mapPinsList.appendChild(fragmentPins);

    window.cards.renderCards(offers);
  };

  window.map = {
    renderPin: renderPin
  };
})();

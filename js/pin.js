'use strict';
// модуль, который отвечает за создание метки на карте;

(function () {
  var mapPinsList = document.querySelector('.map__pins');
  var mapPinsTemplate = document.querySelector('#pin').content;

  var renderElement = function (offers) {
    var fragmentPins = document.createDocumentFragment();
    offers.forEach(function (item) {
      var pinElement = mapPinsTemplate.cloneNode(true);

      pinElement.querySelector('.map__pin').style = 'left: ' + (item.location.x - window.data.PIN_HALF_WIDTH) + 'px; top:' + (item.location.y - window.data.PIN_WIDTH - window.data.PIN_PEAK_HEIGHT) + 'px;';
      pinElement.querySelector('img').src = item.author.avatar;
      pinElement.querySelector('img').alt = item.offer.title;

      fragmentPins.appendChild(pinElement);
    });

    mapPinsList.appendChild(fragmentPins);

  };

  window.pin = {
    renderElement: renderElement
  };
})();
